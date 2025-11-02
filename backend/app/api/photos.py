"""
==========================================
SOCIAL MEDIA POSTER - PHOTO API ENDPOINTS
==========================================
Bestandslocatie: app/api/photos.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/api/photos.py

FastAPI routes voor photo management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ WORKSPACE ISOLATION: Users zien alleen photos van hun workspace
✅ USER DRIVE: Elk gebruiker gebruikt zijn eigen Google Drive
✅ Single & multiple photo upload
✅ Photo metadata extraction
✅ Gallery endpoints
✅ FIXED: Correcte workspace-based ownership verification
"""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from uuid import UUID
import os
import tempfile
from pathlib import Path
from PIL import Image
import io

from ..core.database import get_db
from ..models.photo import Photo
from ..models.event import Event  # ✅ ADDED: For cascade delete
from ..models.user import User
from ..models.workspace import Workspace
from ..schemas.photo import (
    PhotoResponse,
    PhotoUpdate,
    PhotoListResponse,
    PhotoSummary,
    PhotoUploadResponse,
    MultiplePhotoUploadResponse
)
from .dependencies import get_current_user, get_current_workspace  # ✅ FIXED: Import workspace dependency
from ..services.drive_service import get_drive_service  # ✅ Drive service

router = APIRouter(prefix="/photos", tags=["photos"])


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

async def cascade_delete_event_photos(
    event_id: UUID,
    workspace_id: UUID,
    google_access_token: str,
    db: Session
) -> dict:
    """
    CASCADE DELETE: Delete all photos for an event from Google Drive and database
    
    Called when an event is being deleted to cleanup all associated photos.
    
    Returns:
        dict with success/failure counts
    """
    results = {
        'total': 0,
        'drive_deleted': 0,
        'db_deleted': 0,
        'drive_failed': 0,
        'errors': []
    }
    
    # Get all photos for this event
    photos = db.query(Photo).filter(
        Photo.event_id == event_id,
        Photo.workspace_id == workspace_id
    ).all()
    
    results['total'] = len(photos)
    
    if results['total'] == 0:
        print(f"   ℹ️ No photos to delete for event")
        return results
    
    print(f"\n🗑️ CASCADE DELETE: Deleting {results['total']} photos from event...")
    
    # Initialize Drive service
    try:
        drive_service = get_drive_service(google_access_token)
    except Exception as e:
        print(f"   ❌ Could not initialize Drive service: {e}")
        results['errors'].append(f"Drive service init failed: {str(e)}")
        # Continue anyway - we can still delete from database
        drive_service = None
    
    # Delete each photo
    for photo in photos:
        try:
            # Delete from Google Drive first
            if photo.google_drive_file_id and drive_service:
                try:
                    await drive_service.delete_file(photo.google_drive_file_id)
                    results['drive_deleted'] += 1
                    print(f"   ✅ Drive: {photo.filename}")
                except Exception as e:
                    results['drive_failed'] += 1
                    results['errors'].append(f"{photo.filename}: Drive delete failed - {str(e)}")
                    print(f"   ⚠️ Drive failed: {photo.filename} - {e}")
            
            # Delete from database
            db.delete(photo)
            results['db_deleted'] += 1
            
        except Exception as e:
            results['errors'].append(f"{photo.filename}: {str(e)}")
            print(f"   ❌ Error: {photo.filename} - {e}")
    
    # Commit database deletions
    try:
        db.commit()
        print(f"   ✅ Database: {results['db_deleted']}/{results['total']} photos deleted")
    except Exception as e:
        db.rollback()
        print(f"   ❌ Database commit failed: {e}")
        results['errors'].append(f"Database commit failed: {str(e)}")
    
    print(f"✅ CASCADE DELETE COMPLETE:")
    print(f"   Drive: {results['drive_deleted']} deleted, {results['drive_failed']} failed")
    print(f"   Database: {results['db_deleted']} deleted")
    
    return results


def extract_image_metadata(file_content: bytes, filename: str) -> dict:
    """
    Extract metadata from image file
    
    Args:
        file_content: Image file bytes
        filename: Original filename
        
    Returns:
        Dict with width, height, mime_type
    """
    try:
        image = Image.open(io.BytesIO(file_content))
        
        return {
            'width': image.width,
            'height': image.height,
            'mime_type': f"image/{image.format.lower()}" if image.format else None
        }
    except Exception as e:
        print(f"⚠️ Could not extract image metadata: {e}")
        return {
            'width': None,
            'height': None,
            'mime_type': None
        }


def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename for safe storage
    Removes special characters, keeps extension
    """
    name = Path(filename).stem
    ext = Path(filename).suffix
    
    # Replace spaces and special chars with underscore
    safe_name = "".join(c if c.isalnum() or c in ('-', '_') else '_' for c in name)
    
    return f"{safe_name}{ext}"


# ============================================================================
# CREATE - SINGLE UPLOAD
# ============================================================================

@router.post("/event/{event_id}/upload", response_model=PhotoUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_photo(
    event_id: UUID,
    file: UploadFile = File(...),
    description: Optional[str] = None,
    is_featured: bool = False,
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Upload a single photo for an event
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ Workspace Isolated: Photo is linked to workspace
    ✅ Ownership Verification: Checks if event belongs to workspace
    ✅ Validates event exists
    ✅ Extracts image metadata
    ✅ Uploads to user's Google Drive (event folder)
    ✅ Saves metadata to database
    
    Supported formats: JPG, PNG, GIF, WEBP
    Max file size: 10MB
    """
    # ✅ FIXED: Validate event exists AND belongs to this workspace
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    # Check if event has Google Drive folder
    if not event.google_drive_folder_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event does not have a Google Drive folder. Please contact support."
        )
    
    # Check if user has Google access token
    if not current_user.google_access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google Drive access token not found. Please re-authenticate."
        )
    
    # Validate file type
    allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        file_size = len(file_content)
        
        # Check file size (10MB limit)
        max_size = 10 * 1024 * 1024  # 10MB
        if file_size > max_size:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File too large. Maximum size: {max_size / (1024*1024)}MB"
            )
        
        # Extract image metadata
        metadata = extract_image_metadata(file_content, file.filename)
        
        # Sanitize filename
        safe_filename = sanitize_filename(file.filename)
        
        # ✅ Upload to user's Google Drive
        print(f"📤 Uploading to Google Drive...")
        drive_service = get_drive_service(current_user.google_access_token)
        
        drive_result = await drive_service.upload_file(
            file_content=file_content,
            filename=safe_filename,
            mime_type=metadata.get('mime_type') or file.content_type,
            parent_folder_id=event.google_drive_folder_id
        )
        
        print(f"✅ Drive upload successful!")
        print(f"   Drive File ID: {drive_result['id']}")
        print(f"   Drive URL: {drive_result['webViewLink']}")
        
        # ✅ FIXED: Create photo record with workspace_id and created_by
        db_photo = Photo(
            event_id=event_id,
            workspace_id=workspace.workspace_id,  # ✅ Link to workspace
            created_by=current_user.user_id,  # ✅ Link to user
            filename=safe_filename,
            original_filename=file.filename,
            file_size=file_size,
            mime_type=metadata.get('mime_type') or file.content_type,
            width=metadata.get('width'),
            height=metadata.get('height'),
            google_drive_file_id=drive_result['id'],
            google_drive_url=drive_result['webViewLink'],
            thumbnail_url=drive_result.get('thumbnailLink'),
            description=description,
            is_featured=is_featured,
            status='active'
        )
        
        db.add(db_photo)
        db.commit()
        db.refresh(db_photo)
        
        print(f"✅ Photo uploaded successfully: {safe_filename}")
        print(f"   User: {current_user.email}")
        print(f"   Workspace: {workspace.name}")
        print(f"   Event: {event.event_name}")
        print(f"   Size: {round(file_size / 1024, 2)} KB")
        print(f"   Database ID: {db_photo.photo_id}")
        
        return PhotoUploadResponse(
            photo_id=db_photo.photo_id,
            filename=safe_filename,
            file_size=file_size,
            google_drive_url=drive_result['webViewLink'],
            message="Photo uploaded successfully to Google Drive"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error uploading photo: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading photo: {str(e)}"
        )


# ============================================================================
# CREATE - MULTIPLE UPLOAD
# ============================================================================

@router.post("/event/{event_id}/upload-multiple", response_model=MultiplePhotoUploadResponse)
async def upload_multiple_photos(
    event_id: UUID,
    files: List[UploadFile] = File(...),
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Upload multiple photos for an event at once
    
    ✅ OAuth Protected: User can only upload to workspace events
    ✅ Workspace Isolated: Photos are linked to workspace
    ✅ Batch upload support
    ✅ Individual file validation
    ✅ Partial success handling
    ✅ Detailed error reporting
    ✅ Google Drive batch upload
    
    Returns summary with success/failure counts
    """
    # ✅ FIXED: Validate event exists AND belongs to this workspace
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    if not event.google_drive_folder_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event does not have a Google Drive folder"
        )
    
    # Check if user has Google access token
    if not current_user.google_access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google Drive access token not found. Please re-authenticate."
        )
    
    # Initialize results
    results = {
        'total': len(files),
        'success': 0,
        'failed': 0,
        'photos': [],
        'errors': []
    }
    
    allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    max_size = 10 * 1024 * 1024  # 10MB
    
    # Get Drive service
    drive_service = get_drive_service(current_user.google_access_token)
    
    # Process each file
    for idx, file in enumerate(files):
        try:
            # Validate file type
            if file.content_type not in allowed_types:
                results['failed'] += 1
                results['errors'].append({
                    'filename': file.filename,
                    'error': f"Invalid file type: {file.content_type}"
                })
                continue
            
            # Read file
            file_content = await file.read()
            file_size = len(file_content)
            
            # Check size
            if file_size > max_size:
                results['failed'] += 1
                results['errors'].append({
                    'filename': file.filename,
                    'error': f"File too large: {round(file_size / (1024*1024), 2)}MB"
                })
                continue
            
            # Extract metadata
            metadata = extract_image_metadata(file_content, file.filename)
            
            # Sanitize filename
            safe_filename = sanitize_filename(file.filename)
            
            # ✅ Upload to Google Drive
            print(f"📤 [{idx+1}/{len(files)}] Uploading {safe_filename} to Drive...")
            
            drive_result = await drive_service.upload_file(
                file_content=file_content,
                filename=safe_filename,
                mime_type=metadata.get('mime_type') or file.content_type,
                parent_folder_id=event.google_drive_folder_id
            )
            
            # ✅ FIXED: Create database record with workspace_id and created_by
            db_photo = Photo(
                event_id=event_id,
                workspace_id=workspace.workspace_id,  # ✅ Link to workspace
                created_by=current_user.user_id,  # ✅ Link to user
                filename=safe_filename,
                original_filename=file.filename,
                file_size=file_size,
                mime_type=metadata.get('mime_type') or file.content_type,
                width=metadata.get('width'),
                height=metadata.get('height'),
                google_drive_file_id=drive_result['id'],
                google_drive_url=drive_result['webViewLink'],
                thumbnail_url=drive_result.get('thumbnailLink'),
                display_order=idx,
                status='active'
            )
            
            db.add(db_photo)
            db.commit()
            db.refresh(db_photo)
            
            results['success'] += 1
            results['photos'].append(PhotoUploadResponse(
                photo_id=db_photo.photo_id,
                filename=safe_filename,
                file_size=file_size,
                google_drive_url=drive_result['webViewLink']
            ))
            
            print(f"   ✅ Success: {safe_filename}")
        
        except Exception as e:
            results['failed'] += 1
            results['errors'].append({
                'filename': file.filename,
                'error': str(e)
            })
            print(f"   ❌ Failed: {file.filename} - {str(e)}")
    
    print(f"✅ Batch upload complete: {results['success']}/{results['total']} successful")
    print(f"   User: {current_user.email}")
    print(f"   Workspace: {workspace.name}")
    print(f"   Event: {event.event_name}")
    
    return MultiplePhotoUploadResponse(**results)


# ============================================================================
# READ - EVENT PHOTOS
# ============================================================================

@router.get("/event/{event_id}", response_model=List[PhotoResponse])
def get_event_photos(
    event_id: UUID,
    status_filter: Optional[str] = Query("active", description="Filter by status", alias="status"),
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get all photos for an event
    
    ✅ OAuth Protected: User can only see photos from workspace events
    ✅ Workspace Isolated: Only photos in workspace
    
    Returns photos ordered by display_order, then upload date
    """
    # ✅ FIXED: Verify event exists AND belongs to workspace
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    # ✅ FIXED: Query photos - only from this workspace
    query = db.query(Photo).filter(
        Photo.event_id == event_id,
        Photo.workspace_id == workspace.workspace_id  # ✅ Workspace check
    )
    
    if status_filter:
        query = query.filter(Photo.status == status_filter)
    
    photos = query.order_by(Photo.display_order, Photo.uploaded_at.desc()).all()
    
    return photos


# ============================================================================
# READ - EVENT GALLERY
# ============================================================================

@router.get("/event/{event_id}/gallery", response_model=List[PhotoSummary])
def get_event_gallery(
    event_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get lightweight photo gallery for an event
    
    ✅ OAuth Protected: User can only see workspace event galleries
    ✅ Workspace Isolated: Only photos in workspace
    
    Returns only essential info for display (faster)
    """
    # ✅ FIXED: Verify event belongs to workspace
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    # ✅ FIXED: Get photos from workspace
    photos = db.query(Photo).filter(
        Photo.event_id == event_id,
        Photo.workspace_id == workspace.workspace_id,  # ✅ Workspace check
        Photo.status == 'active',
        Photo.archived == False
    ).order_by(
        Photo.is_featured.desc(),
        Photo.display_order,
        Photo.uploaded_at.desc()
    ).all()
    
    return [PhotoSummary(
        photo_id=p.photo_id,
        filename=p.filename,
        google_drive_url=p.google_drive_url,
        thumbnail_url=p.thumbnail_url,
        is_featured=p.is_featured,
        display_order=p.display_order
    ) for p in photos]


# ============================================================================
# READ - SINGLE PHOTO
# ============================================================================

@router.get("/{photo_id}", response_model=PhotoResponse)
def get_photo(
    photo_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get a specific photo by ID
    
    ✅ OAuth Protected: User can only access workspace photos
    ✅ Workspace Isolated: Only photos in workspace
    """
    # ✅ FIXED: Get photo with workspace verification
    photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found in your workspace"
        )
    
    return photo


# ============================================================================
# UPDATE
# ============================================================================

@router.patch("/{photo_id}", response_model=PhotoResponse)
def update_photo(
    photo_id: UUID,
    photo_update: PhotoUpdate,
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Update photo metadata (description, order, featured status)
    
    ✅ OAuth Protected: User can only update workspace photos
    ✅ Workspace Isolated: Only photos in workspace
    """
    # ✅ FIXED: Get photo with workspace verification
    db_photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not db_photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found in your workspace"
        )
    
    # Update fields
    update_data = photo_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_photo, field, value)
    
    db.commit()
    db.refresh(db_photo)
    
    return db_photo


# ============================================================================
# DELETE
# ============================================================================

@router.delete("/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_photo(
    photo_id: UUID,
    hard_delete: bool = Query(True, description="Permanently delete from Drive (default: True)"),
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Delete a photo permanently
    
    ✅ OAuth Protected: User can only delete workspace photos
    ✅ Workspace Isolated: Only photos in workspace
    ✅ DEFAULT: Permanent delete from Google Drive AND database
    
    Deletion process:
    1. Delete from Google Drive (FIRST)
    2. Delete from database (AFTER Drive success)
    3. If Drive delete fails, log error but continue with database delete
    
    Parameters:
    - hard_delete: Default True - permanently delete from Drive and database
                   Set to False for soft delete (archive only)
    """
    # ✅ FIXED: Get photo with workspace verification
    db_photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not db_photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found in your workspace"
        )
    
    # Store info for logging
    filename = db_photo.filename
    drive_file_id = db_photo.google_drive_file_id
    
    if hard_delete:
        print(f"\n🗑️ PERMANENT DELETE: {filename}")
        
        # ✅ STEP 1: Delete from Google Drive FIRST
        drive_delete_success = False
        if drive_file_id and current_user.google_access_token:
            try:
                print(f"   📤 Deleting from Google Drive: {drive_file_id}")
                drive_service = get_drive_service(current_user.google_access_token)
                await drive_service.delete_file(drive_file_id)
                drive_delete_success = True
                print(f"   ✅ Deleted from Google Drive")
            except Exception as e:
                print(f"   ⚠️ Could not delete from Drive: {e}")
                print(f"   ℹ️ Will continue with database deletion")
                # Don't raise - continue with database delete even if Drive fails
        else:
            print(f"   ⚠️ No Drive file ID or access token - skipping Drive delete")
        
        # ✅ STEP 2: Delete from database AFTER Drive attempt
        try:
            db.delete(db_photo)
            db.commit()
            print(f"   ✅ Deleted from database")
            print(f"✅ Photo permanently deleted: {filename}")
            
            if drive_delete_success:
                print(f"   📊 Status: Drive ✅ | Database ✅")
            else:
                print(f"   📊 Status: Drive ⚠️ (failed/skipped) | Database ✅")
                
        except Exception as e:
            db.rollback()
            print(f"   ❌ Database deletion failed: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete photo from database: {str(e)}"
            )
    else:
        # Soft delete - only update status
        print(f"\n📦 SOFT DELETE (archive): {filename}")
        db_photo.status = 'deleted'
        db_photo.archived = True
        db.commit()
        print(f"   ✅ Photo archived (soft delete)")
    
    return None


# ============================================================================
# SET FEATURED
# ============================================================================

@router.post("/{photo_id}/set-featured", response_model=PhotoResponse)
def set_featured_photo(
    photo_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Set a photo as featured/cover photo for its event
    
    ✅ OAuth Protected: User can only feature workspace photos
    ✅ Workspace Isolated: Only photos in workspace
    
    Automatically un-features other photos in the same event
    """
    # ✅ FIXED: Get photo with workspace verification
    db_photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.workspace_id == workspace.workspace_id  # ✅ Workspace ownership check
    ).first()
    
    if not db_photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found in your workspace"
        )
    
    # ✅ FIXED: Un-feature all other photos in this event (in this workspace)
    db.query(Photo).filter(
        Photo.event_id == db_photo.event_id,
        Photo.workspace_id == workspace.workspace_id,  # ✅ Workspace check
        Photo.photo_id != photo_id
    ).update({'is_featured': False})
    
    # Feature this photo
    db_photo.is_featured = True
    
    db.commit()
    db.refresh(db_photo)
    
    return db_photo


# ============================================================================
# STATISTICS
# ============================================================================

@router.delete("/event/{event_id}/delete-all", status_code=status.HTTP_200_OK)
async def delete_all_event_photos(
    event_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    CASCADE DELETE: Delete all photos for an event
    
    ✅ OAuth Protected: Only workspace photos
    ✅ Workspace Isolated: Only photos in workspace
    
    Used when an event is being deleted to cleanup all associated photos.
    Deletes from Google Drive AND database.
    
    Returns summary of deletion results.
    """
    # Verify event exists and belongs to workspace
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    # Check if user has Google access token
    if not current_user.google_access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google Drive access token not found"
        )
    
    print(f"\n🗑️ BULK DELETE: All photos for event '{event.event_name}'")
    
    # Cascade delete all photos
    results = await cascade_delete_event_photos(
        event_id=event_id,
        workspace_id=workspace.workspace_id,
        google_access_token=current_user.google_access_token,
        db=db
    )
    
    return {
        "message": f"Deleted {results['db_deleted']} photos",
        "total": results['total'],
        "drive_deleted": results['drive_deleted'],
        "drive_failed": results['drive_failed'],
        "db_deleted": results['db_deleted'],
        "errors": results['errors'] if results['errors'] else None
    }


@router.get("/stats/overview")
def get_photo_stats(
    workspace: Workspace = Depends(get_current_workspace),  # ✅ FIXED: Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get photo statistics for current workspace
    
    ✅ OAuth Protected: Only shows stats for workspace photos
    ✅ Workspace Isolated: Only photos in workspace
    
    Returns:
        - total: Total photos
        - active: Active photos
        - deleted: Deleted photos
        - total_size: Total storage used (bytes)
    """
    # ✅ FIXED: Query only workspace photos
    base_query = db.query(Photo).filter(
        Photo.workspace_id == workspace.workspace_id
    )
    
    total = base_query.count()
    active = base_query.filter(Photo.status == "active").count()
    deleted = base_query.filter(Photo.status == "deleted").count()
    
    # Calculate total storage used
    total_size = db.query(func.sum(Photo.file_size)).filter(
        Photo.workspace_id == workspace.workspace_id,
        Photo.status == "active"
    ).scalar() or 0
    
    return {
        "total": total,
        "active": active,
        "deleted": deleted,
        "total_size_bytes": total_size,
        "total_size_mb": round(total_size / (1024 * 1024), 2),
        "workspace_name": workspace.name,
        "user_email": current_user.email
    }
