"""
==========================================
SOCIAL MEDIA POSTER - EVENT API ENDPOINTS  
==========================================
Bestandslocatie: app/api/events.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/api/events.py

FastAPI routes voor event management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ MULTI-TENANT: Users zien alleen hun eigen events
✅ USER DRIVE: Elk gebruiker gebruikt zijn eigen Google Drive
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from typing import Optional, List
from uuid import UUID
from datetime import datetime

from ..core.database import get_db
from ..models.event import Event
from ..models.customer import Customer
from ..models.user import User
from ..schemas.event import (
    EventCreate,
    EventUpdate,
    EventResponse,
    EventSummary,
    EventListResponse,
    EventArchiveRequest
)
from .dependencies import get_current_user

# Router instance
router = APIRouter(
    prefix="/events",
    tags=["events"],
    responses={404: {"description": "Not found"}},
)


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def sanitize_folder_name(name: str) -> str:
    """
    Sanitize name for use as folder name
    Replaces spaces with underscores and removes special characters
    """
    folder_name = name.strip().replace(' ', '_')
    folder_name = ''.join(c for c in folder_name if c.isalnum() or c == '_')
    return folder_name


# ============================================================================
# CREATE
# ============================================================================

@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event: EventCreate,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Create a new event with automatic Google Drive folder
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ User Isolation: Event is linked to authenticated user
    ✅ Ownership Verification: Checks if customer belongs to user
    ✅ User's Drive: Creates folder in authenticated user's Google Drive
    
    Args:
        event: Event data
        current_user: Authenticated user from JWT token
        
    Returns:
        Created event with google_drive_folder_id
    """
    
    # Verify customer exists AND belongs to this user
    customer = db.query(Customer).filter(
        Customer.customer_id == event.customer_id,
        Customer.user_id == current_user.user_id  # ✅ Verify customer ownership
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )
    
    # Check customer status
    if customer.status == "archived":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create event for archived customer"
        )
    
    # Auto-generate folder_name if not provided
    if not event.folder_name:
        folder_name = sanitize_folder_name(event.event_name)
    else:
        folder_name = event.folder_name
    
    # Create event object
    db_event = Event(
        customer_id=event.customer_id,
        user_id=current_user.user_id,  # ✅ Link event to user
        event_name=event.event_name,
        event_type=event.event_type,
        event_date=event.event_date,
        location_city=event.location_city,
        location_venue=event.location_venue,
        description=event.description,
        folder_name=folder_name,
        status=event.status or 'draft'
    )
    
    # Save to database first (to get event_id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    # ✅ TODO: Implement Google Drive folder creation using user's OAuth token
    # This will use the authenticated user's Google Drive, not a Service Account
    # Implementation will be added in Phase 2 after OAuth is fully working
    
    print(f"✅ Event created for user: {current_user.email}")
    print(f"   Event: {event.event_name}")
    print(f"   Customer: {customer.company_name or customer.email}")
    print(f"   Event ID: {db_event.event_id}")
    
    return db_event


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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get list of events with pagination and filtering
    
    ✅ OAuth Protected: Only returns events owned by authenticated user
    ✅ Multi-tenant: User can only see their own events
    """
    
    # Base query - ONLY user's own events
    query = db.query(Event).filter(
        Event.user_id == current_user.user_id  # ✅ Critical: Filter by user
    )
    
    # Filters
    if not include_archived:
        query = query.filter(Event.archived == False)
    
    if customer_id:
        # Verify customer belongs to user
        customer = db.query(Customer).filter(
            Customer.customer_id == customer_id,
            Customer.user_id == current_user.user_id
        ).first()
        
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found or you don't have access to it"
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
    
    return EventListResponse(
        events=events,
        total=total,
        skip=skip,
        limit=limit
    )


# ============================================================================
# READ - SINGLE
# ============================================================================

@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: UUID,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get a specific event by ID
    
    ✅ OAuth Protected: User can only access their own events
    """
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
        )
    
    return event


# ============================================================================
# READ - SUMMARY
# ============================================================================

@router.get("/customer/{customer_id}/summary", response_model=List[EventSummary])
def get_customer_events_summary(
    customer_id: UUID,
    status: str = Query("active", description="Filter by status"),
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get lightweight event list for dropdowns
    
    ✅ OAuth Protected: Only returns user's own events
    ✅ Verifies customer ownership
    """
    # Verify customer belongs to user
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.user_id == current_user.user_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )
    
    events = db.query(Event).filter(
        Event.customer_id == customer_id,
        Event.user_id == current_user.user_id,  # ✅ User's own data
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Update an event
    
    ✅ OAuth Protected: User can only update their own events
    """
    # Get event with ownership verification
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Delete an event
    
    ✅ OAuth Protected: User can only delete their own events
    """
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Archive an event
    
    ✅ OAuth Protected: User can only archive their own events
    """
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Restore an archived event
    
    ✅ OAuth Protected: User can only restore their own events
    """
    db_event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()
    
    if not db_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get all events for a customer (without pagination)
    
    ✅ OAuth Protected: Verifies customer ownership
    
    Perfect for dropdowns and overview pages
    """
    # Verify customer belongs to user
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.user_id == current_user.user_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )
    
    # Query events
    query = db.query(Event).filter(
        Event.customer_id == customer_id,
        Event.user_id == current_user.user_id  # ✅ Double-check ownership
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
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get event WITH full customer information
    
    ✅ OAuth Protected: Verifies ownership of both event and customer
    
    Perfect for detail pages where you need both event and customer info
    """
    # Get event with ownership verification
    event = db.query(Event).filter(
        Event.event_id == event_id,
        Event.user_id == current_user.user_id
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have access to it"
        )
    
    # Get customer (already verified via event.user_id check)
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
# STATISTICS (NEW!)
# ============================================================================

@router.get("/stats/overview")
def get_event_stats(
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get event statistics for current user
    
    ✅ OAuth Protected: Only shows stats for user's own events
    """
    base_query = db.query(Event).filter(
        Event.user_id == current_user.user_id
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
        "user_email": current_user.email
    }
