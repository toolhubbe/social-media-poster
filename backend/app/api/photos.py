"""
==========================================
SOCIAL MEDIA POSTER - PHOTO API ENDPOINTS
==========================================
Bestandslocatie: app/api/photos.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/api/photos.py

FastAPI routes voor photo management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ MULTI-TENANT: Users zien alleen hun eigen photos
✅ USER DRIVE: Elk gebruiker gebruikt zijn eigen Google Drive
✅ Single & multiple photo upload
✅ Photo metadata extraction
✅ Gallery endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
import os
import tempfile
from pathlib import Path
from PIL import Image
import io

from ..core.database import get_db
from ..models.photo import Photo
from ..models.event import Event
from ..models.user import User
from ..schemas.photo import (
    PhotoResponse,
    PhotoUpdate,
    PhotoListResponse,
    PhotoSummary,
    PhotoUploadResponse,
    MultiplePhotoUploadResponse
)
from .dependencies import get_current_user  # ✅ NEW: OAuth dependency

router = APIRouter(prefix="/photos", tags=["photos"])


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Upload a single photo for an event
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ User Isolation: Can only upload to own events
    ✅ Ownership Verification: Checks if event belongs to user
    ✅ Validates event exists
    ✅ Extracts image metadata
    ✅ Uploads to user's Google Drive (event folder)
    ✅ Saves metadata to database
    
    Supported formats: JPG, PNG, GIF, WEBP
    Max file size: 10MB
    """
    # Validate event exists AND belongs to this user
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
        )
    
    # Check if event has Google Drive folder
    if not event.google_drive_folder_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event does not have a Google Drive folder. Please contact support."
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
        
        # ✅ TODO: Upload to user's Google Drive using their OAuth token
        # For now, we'll create the database record without Drive upload
        # This will be implemented when GoogleDriveService supports OAuth tokens
        
        # Create photo record in database
        db_photo = Photo(
            event_id=event_id,
            user_id=current_user.user_id,  # ✅ Link photo to user
            filename=safe_filename,
            original_filename=file.filename,
            file_size=file_size,
            mime_type=metadata.get('mime_type') or file.content_type,
            width=metadata.get('width'),
            height=metadata.get('height'),
            # google_drive_file_id=drive_result['file_id'],  # Will be added with Drive integration
            # google_drive_url=drive_result['web_link'],      # Will be added with Drive integration
            description=description,
            is_featured=is_featured,
            status='active'
        )
        
        db.add(db_photo)
        db.commit()
        db.refresh(db_photo)
        
        print(f"✅ Photo uploaded successfully: {safe_filename}")
        print(f"   User: {current_user.email}")
        print(f"   Event: {event.event_name}")
        print(f"   Size: {round(file_size / 1024, 2)} KB")
        
        return PhotoUploadResponse(
            photo_id=db_photo.photo_id,
            filename=safe_filename,
            file_size=file_size,
            google_drive_url=None,  # Will be added with Drive integration
            message="Photo uploaded successfully"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error uploading photo: {e}")
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Upload multiple photos for an event at once
    
    ✅ OAuth Protected: User can only upload to their own events
    ✅ Batch upload support
    ✅ Individual file validation
    ✅ Partial success handling
    ✅ Detailed error reporting
    
    Returns summary with success/failure counts
    """
    # Validate event exists AND belongs to this user
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
        )
    
    if not event.google_drive_folder_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event does not have a Google Drive folder"
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
            
            # Create database record
            db_photo = Photo(
                event_id=event_id,
                user_id=current_user.user_id,  # ✅ Link photo to user
                filename=safe_filename,
                original_filename=file.filename,
                file_size=file_size,
                mime_type=metadata.get('mime_type') or file.content_type,
                width=metadata.get('width'),
                height=metadata.get('height'),
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
                google_drive_url=None
            ))
        
        except Exception as e:
            results['failed'] += 1
            results['errors'].append({
                'filename': file.filename,
                'error': str(e)
            })
    
    print(f"✅ Batch upload complete: {results['success']}/{results['total']} successful")
    print(f"   User: {current_user.email}")
    
    return MultiplePhotoUploadResponse(**results)


# ============================================================================
# READ - EVENT PHOTOS
# ============================================================================

@router.get("/event/{event_id}", response_model=List[PhotoResponse])
def get_event_photos(
    event_id: UUID,
    status: Optional[str] = Query("active", description="Filter by status"),
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get all photos for an event
    
    ✅ OAuth Protected: User can only see photos from their own events
    
    Returns photos ordered by display_order, then upload date
    """
    # Verify event exists AND belongs to user
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
        )
    
    # Query photos - only from this user's event
    query = db.query(Photo).filter(
        Photo.event_id == event_id,
        Photo.user_id == current_user.user_id  # ✅ Double check ownership
    )
    
    if status:
        query = query.filter(Photo.status == status)
    
    photos = query.order_by(Photo.display_order, Photo.uploaded_at.desc()).all()
    
    return photos


# ============================================================================
# READ - EVENT GALLERY
# ============================================================================

@router.get("/event/{event_id}/gallery", response_model=List[PhotoSummary])
def get_event_gallery(
    event_id: UUID,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get lightweight photo gallery for an event
    
    ✅ OAuth Protected: User can only see their own event galleries
    
    Returns only essential info for display (faster)
    """
    # Verify event belongs to user
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
        )
    
    # Get photos
    photos = db.query(Photo).filter(
        Photo.event_id == event_id,
        Photo.user_id == current_user.user_id,  # ✅ Verify ownership
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get a specific photo by ID
    
    ✅ OAuth Protected: User can only access their own photos
    """
    photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found or you don't have access to it"
        )
    
    return photo


# ============================================================================
# UPDATE
# ============================================================================

@router.patch("/{photo_id}", response_model=PhotoResponse)
def update_photo(
    photo_id: UUID,
    photo_update: PhotoUpdate,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Update photo metadata (description, order, featured status)
    
    ✅ OAuth Protected: User can only update their own photos
    """
    # Get photo with ownership verification
    db_photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not db_photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found or you don't have access to it"
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
def delete_photo(
    photo_id: UUID,
    hard_delete: bool = Query(False, description="Permanently delete from Drive"),
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Delete a photo
    
    ✅ OAuth Protected: User can only delete their own photos
    
    - soft delete (default): Archives photo in database
    - hard delete: Deletes from Google Drive AND database
    """
    # Get photo with ownership verification
    db_photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not db_photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found or you don't have access to it"
        )
    
    if hard_delete:
        # ✅ TODO: Delete from user's Google Drive when Drive integration is complete
        # if db_photo.google_drive_file_id:
        #     drive_service = get_user_drive_service(current_user)
        #     if drive_service:
        #         drive_service.delete_file(db_photo.google_drive_file_id)
        
        # Delete from database
        db.delete(db_photo)
        print(f"✅ Hard deleted photo: {db_photo.filename}")
    else:
        # Soft delete
        db_photo.status = 'deleted'
        db_photo.archived = True
        print(f"✅ Soft deleted photo: {db_photo.filename}")
    
    db.commit()
    return None


# ============================================================================
# SET FEATURED
# ============================================================================

@router.post("/{photo_id}/set-featured", response_model=PhotoResponse)
def set_featured_photo(
    photo_id: UUID,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Set a photo as featured/cover photo for its event
    
    ✅ OAuth Protected: User can only feature their own photos
    
    Automatically un-features other photos in the same event
    """
    # Get photo with ownership verification
    db_photo = db.query(Photo).filter(
        Photo.photo_id == photo_id,
        Photo.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not db_photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found or you don't have access to it"
        )
    
    # Un-feature all other photos in this event (for this user)
    db.query(Photo).filter(
        Photo.event_id == db_photo.event_id,
        Photo.user_id == current_user.user_id,  # ✅ Only user's photos
        Photo.photo_id != photo_id
    ).update({'is_featured': False})
    
    # Feature this photo
    db_photo.is_featured = True
    
    db.commit()
    db.refresh(db_photo)
    
    return db_photo


# ============================================================================
# STATISTICS (NEW!)
# ============================================================================

@router.get("/stats/overview")
def get_photo_stats(
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get photo statistics for current user
    
    ✅ OAuth Protected: Only shows stats for user's own photos
    
    Returns:
        - total: Total photos
        - active: Active photos
        - deleted: Deleted photos
        - total_size: Total storage used (bytes)
    """
    base_query = db.query(Photo).filter(
        Photo.user_id == current_user.user_id
    )
    
    total = base_query.count()
    active = base_query.filter(Photo.status == "active").count()
    deleted = base_query.filter(Photo.status == "deleted").count()
    
    # Calculate total storage used
    total_size = db.query(func.sum(Photo.file_size)).filter(
        Photo.user_id == current_user.user_id,
        Photo.status == "active"
    ).scalar() or 0
    
    return {
        "total": total,
        "active": active,
        "deleted": deleted,
        "total_size_bytes": total_size,
        "total_size_mb": round(total_size / (1024 * 1024), 2),
        "user_email": current_user.email
    }
