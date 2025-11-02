"""
==========================================
SOCIAL MEDIA POSTER - EVENT API ENDPOINTS  
==========================================
Bestandslocatie: backend/app/api/events.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/api/events.py

FastAPI routes voor event management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ WORKSPACE ISOLATION: Users zien alleen events van hun workspace
✅ AUTO DRIVE FOLDERS: Automatic Google Drive folder creation BEFORE database save
✅ NESTED STRUCTURE: Events/[customer]/[event] folder hierarchy
✅ ATOMIC OPERATIONS: Drive folder + Database as single transaction
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from typing import Optional, List
from uuid import UUID
from datetime import datetime
import math

from ..core.database import get_db
from ..models.event import Event
from ..models.customer import Customer
from ..models.user import User
from ..models.workspace import Workspace
from ..schemas.event import (
    EventCreate,
    EventUpdate,
    EventResponse,
    EventSummary,
    EventListResponse,
    EventArchiveRequest
)
from .dependencies import get_current_user, get_current_workspace
from ..services.drive_service import DriveService, sanitize_folder_name

# Router instance
router = APIRouter(
    prefix="/events",
    tags=["events"],
    responses={404: {"description": "Not found"}},
)


# ============================================================================
# CREATE
# ============================================================================

@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(
    event: EventCreate,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Create a new event with automatic Google Drive folder in nested structure
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ Workspace Isolated: Event is linked to workspace
    ✅ Ownership Verification: Checks if customer belongs to workspace
    ✅ Auto Drive Folder: Creates nested folder structure (if Drive setup complete)
    ✅ ATOMIC: Drive folder is created FIRST, then database record
    
    Workflow:
    1. Validate customer exists in workspace
    2. Create Google Drive nested folder structure:
       - Check/create customer subfolder in Events folder
       - Create event folder inside customer subfolder
       - Get event folder_id
    3. Create event in database WITH folder_id
    4. If either step fails → Full rollback, no incomplete data
    
    The event folder is created in: [Workspace]/Events/[customer]/[event_name]/
    Folder names are normalized: lowercase, spaces → underscores
    """
    
    # Verify customer exists AND belongs to this workspace
    customer = db.query(Customer).filter(
        Customer.customer_id == event.customer_id,
        Customer.workspace_id == workspace.workspace_id  # ✅ Verify customer in workspace
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
        )
    
    # Check customer status
    if customer.status == "archived":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create event for archived customer"
        )
    
    # Auto-generate folder_name if not provided (normalized)
    if not event.folder_name:
        folder_name = sanitize_folder_name(event.event_name)
    else:
        folder_name = sanitize_folder_name(event.folder_name)
    
    # Variable to store folder_id
    google_drive_folder_id = None
    
    # ✨ STEP 1: Create Google Drive nested folder structure FIRST (if Drive setup complete)
    if workspace.drive_setup_complete and workspace.drive_events_folder_id:
        try:
            print(f"\n📁 Creating nested Google Drive folders for event: {folder_name}")
            
            # Initialize Drive service with user's OAuth token
            drive_service = DriveService(current_user.google_access_token)
            
            # Determine customer folder name (normalized)
            if customer.company_name:
                customer_folder_name = sanitize_folder_name(customer.company_name)
            elif customer.first_name and customer.last_name:
                customer_folder_name = sanitize_folder_name(f"{customer.first_name}_{customer.last_name}")
            else:
                customer_folder_name = sanitize_folder_name(customer.email.split('@')[0])
            
            print(f"   Customer subfolder: {customer_folder_name}")
            
            # Check if customer subfolder already exists in Events folder
            customer_events_folder = await drive_service.find_folder_by_name(
                folder_name=customer_folder_name,
                parent_id=workspace.drive_events_folder_id
            )
            
            if not customer_events_folder:
                # Create customer subfolder in Events folder
                print(f"   Creating customer subfolder: {customer_folder_name}")
                customer_events_folder = await drive_service.create_folder(
                    folder_name=customer_folder_name,
                    parent_id=workspace.drive_events_folder_id
                )
            else:
                print(f"   Using existing customer subfolder: {customer_folder_name}")
            
            # Create event folder inside customer's events folder
            print(f"   Creating event folder: {folder_name}")
            event_folder_result = await drive_service.create_folder(
                folder_name=folder_name,
                parent_id=customer_events_folder['id']
            )
            
            google_drive_folder_id = event_folder_result['id']
            
            print(f"✅ Event folder created successfully!")
            print(f"   Path: Events/{customer_folder_name}/{folder_name}")
            print(f"   Folder ID: {event_folder_result['id']}")
            print(f"   Folder Link: {event_folder_result.get('webViewLink', 'N/A')}")
            
        except HTTPException as e:
            # If Drive folder creation fails, abort event creation
            print(f"❌ Failed to create Drive folder: {e.detail}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create Google Drive folder: {e.detail}. Event not created."
            )
        except Exception as e:
            print(f"❌ Unexpected error creating Drive folder: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create Google Drive folder: {str(e)}. Event not created."
            )
    else:
        print(f"ℹ️  Drive setup not complete - event will be created without Drive folder")
    
    # ✅ STEP 2: Create event in database WITH folder_id
    try:
        db_event = Event(
            customer_id=event.customer_id,
            workspace_id=workspace.workspace_id,  # ✅ Link to workspace
            created_by=current_user.user_id,  # ✅ Track creator
            event_name=event.event_name,
            event_type=event.event_type,
            event_date=event.event_date,
            location_city=event.location_city,
            location_venue=event.location_venue,
            description=event.description,
            folder_name=folder_name,
            status=event.status or 'draft',
            google_drive_folder_id=google_drive_folder_id  # ✅ Set folder_id from Drive creation
        )
        
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        
        print(f"\n✅ Event created in workspace: {workspace.name}")
        print(f"   User: {current_user.email}")
        print(f"   Event: {event.event_name}")
        print(f"   Customer: {customer.company_name or customer.email}")
        print(f"   Event ID: {db_event.event_id}")
        print(f"   Drive Folder ID: {db_event.google_drive_folder_id or 'Not created'}")
        
        return db_event
        
    except Exception as e:
        print(f"❌ Failed to create event in database: {str(e)}")
        # TODO: Optionally delete the Drive folder if database creation fails
        # For now, we keep the folder (orphaned but can be cleaned up later)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create event: {str(e)}"
        )


# ============================================================================
# READ - LIST
# ============================================================================

@router.get("/", response_model=EventListResponse)
def list_events(
    skip: int = Query(0, ge=0, description="Number of events to skip"),
    limit: int = Query(10, ge=1, le=100, description="Maximum events per page"),
    customer_id: Optional[UUID] = Query(None, description="Filter by customer_id"),
    status: Optional[str] = Query(None, description="Filter by status"),
    event_type: Optional[str] = Query(None, description="Filter by event type"),
    search: Optional[str] = Query(None, description="Search in event name and description"),
    include_archived: bool = Query(False, description="Include archived events"),
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get list of events with pagination and filtering
    
    ✅ OAuth Protected: Only returns events from user's workspace
    ✅ Workspace Isolation: User can only see events in their workspace
    """
    
    # Base query - ONLY workspace's events
    query = db.query(Event).filter(
        Event.workspace_id == workspace.workspace_id  # ✅ Critical: Filter by workspace
    )
    
    # Filters
    if not include_archived:
        query = query.filter(Event.archived == False)
    
    if customer_id:
        # Verify customer belongs to workspace
        customer = db.query(Customer).filter(
            Customer.customer_id == customer_id,
            Customer.workspace_id == workspace.workspace_id
        ).first()
        
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found in your workspace"
            )
        
        query = query.filter(Event.customer_id == customer_id)
    
    if status:
        query = query.filter(Event.status == status)
    
    if event_type:
        query = query.filter(Event.event_type == event_type)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Event.event_name.ilike(search_term),
                Event.description.ilike(search_term),
                Event.location_city.ilike(search_term),
                Event.location_venue.ilike(search_term)
            )
        )
    
    # Get total count before pagination
    total = query.count()
    
    # Apply pagination
    events = query.order_by(Event.event_date.desc()).offset(skip).limit(limit).all()
    
    # Calculate page number and total pages
    page = (skip // limit) + 1 if limit > 0 else 1
    pages = math.ceil(total / limit) if limit > 0 else 0
    
    return EventListResponse(
        items=events,
        total=total,
        page=page,
        page_size=limit,
        pages=pages
    )


# ============================================================================
# READ - SINGLE
# ============================================================================

@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get a specific event by ID
    
    ✅ OAuth Protected: User can only access events in their workspace
    """
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Verify workspace
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    return event


# ============================================================================
# READ - SUMMARY
# ============================================================================

@router.get("/customer/{customer_id}/summary", response_model=List[EventSummary])
def get_customer_events_summary(
    customer_id: UUID,
    status: str = Query("active", description="Filter by status"),
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get lightweight event list for dropdowns
    
    ✅ OAuth Protected: Only returns workspace's events
    ✅ Verifies customer in workspace
    """
    # Verify customer belongs to workspace
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == workspace.workspace_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
        )
    
    events = db.query(Event).filter(
        Event.customer_id == customer_id,
        Event.workspace_id == workspace.workspace_id,  # ✅ Workspace filter
        Event.status == status
    ).all()
    
    return [
        EventSummary(
            event_id=e.event_id,
            event_name=e.event_name,
            event_date=e.event_date,
            status=e.status
        )
        for e in events
    ]


# ============================================================================
# UPDATE
# ============================================================================

@router.put("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: UUID,
    event_update: EventUpdate,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Update an event
    
    ✅ OAuth Protected: User can only update events in their workspace
    """
    # Get event with workspace verification
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Verify workspace
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    # Update fields
    update_data = event_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_event, field, value)
    
    db.commit()
    db.refresh(db_event)
    
    return db_event


# ============================================================================
# DELETE
# ============================================================================

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: UUID,
    hard_delete: bool = Query(False, description="Permanently delete (true) or soft delete (false)"),
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Delete an event
    
    ✅ OAuth Protected: User can only delete events in their workspace
    """
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Verify workspace
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    if hard_delete:
        db.delete(db_event)
    else:
        db_event.archived = True
    
    db.commit()
    return None


# ============================================================================
# ARCHIVE
# ============================================================================

@router.post("/{event_id}/archive", response_model=EventResponse)
def archive_event(
    event_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Archive an event
    
    ✅ OAuth Protected: User can only archive events in their workspace
    """
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Verify workspace
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    db_event.archived = True
    db.commit()
    db.refresh(db_event)
    
    return db_event


# ============================================================================
# RESTORE
# ============================================================================

@router.post("/{event_id}/restore", response_model=EventResponse)
def restore_event(
    event_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Restore an archived event
    
    ✅ OAuth Protected: User can only restore events in their workspace
    """
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Verify workspace
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    db_event.archived = False
    db.commit()
    db.refresh(db_event)
    
    return db_event


# ============================================================================
# UTILITY ENDPOINTS
# ============================================================================

@router.get("/customer/{customer_id}/list")
def list_customer_events(
    customer_id: UUID,
    include_archived: bool = Query(False, description="Include archived events"),
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get all events for a customer (without pagination)
    
    ✅ OAuth Protected: Verifies customer in workspace
    
    Perfect for dropdowns and overview pages
    """
    # Verify customer belongs to workspace
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == workspace.workspace_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
        )
    
    # Query events
    query = db.query(Event).filter(
        Event.customer_id == customer_id,
        Event.workspace_id == workspace.workspace_id  # ✅ Workspace filter
    )
    
    if not include_archived:
        query = query.filter(Event.archived == False)
    
    events = query.order_by(Event.event_date.desc()).all()
    
    return {
        "customer_info": {
            "customer_id": str(customer.customer_id),
            "company_name": customer.company_name,
            "email": customer.email
        },
        "events": events,
        "total_count": len(events)
    }


@router.get("/{event_id}/with-customer")
def get_event_with_customer_details(
    event_id: UUID,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get event WITH full customer information
    
    ✅ OAuth Protected: Verifies ownership of both event and customer
    
    Perfect for detail pages where you need both event and customer info
    """
    # Get event with workspace verification
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.workspace_id == workspace.workspace_id
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found in your workspace"
        )
    
    # Get customer (already verified via workspace check)
    customer = db.query(Customer).filter(
        Customer.customer_id == event.customer_id
    ).first()
    
    return {
        "event": {
            "event_id": str(event.event_id),
            "event_name": event.event_name,
            "event_type": event.event_type,
            "event_date": event.event_date,
            "location_city": event.location_city,
            "location_venue": event.location_venue,
            "description": event.description,
            "status": event.status,
            "folder_name": event.folder_name,
            "google_drive_folder_id": event.google_drive_folder_id,
            "created_at": event.created_at,
            "updated_at": event.updated_at
        },
        "customer": {
            "customer_id": str(customer.customer_id),
            "company_name": customer.company_name,
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "email": customer.email,
            "phone": customer.phone,
            "google_drive_folder_id": customer.google_drive_folder_id
        }
    }


# ============================================================================
# STATISTICS
# ============================================================================

@router.get("/stats/overview")
def get_event_stats(
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get event statistics for current workspace
    
    ✅ OAuth Protected: Only shows stats for workspace's events
    """
    base_query = db.query(Event).filter(
        Event.workspace_id == workspace.workspace_id  # ✅ Workspace filter
    )
    
    total = base_query.count()
    draft = base_query.filter(Event.status == "draft").count()
    active = base_query.filter(Event.status == "active").count()
    completed = base_query.filter(Event.status == "completed").count()
    archived = base_query.filter(Event.archived == True).count()
    
    return {
        "total": total,
        "draft": draft,
        "active": active,
        "completed": completed,
        "archived": archived,
        "workspace_id": str(workspace.workspace_id),
        "workspace_name": workspace.name,
        "user_email": current_user.email
    }
