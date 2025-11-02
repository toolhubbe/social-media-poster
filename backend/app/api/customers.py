"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER API ENDPOINTS
==========================================
Bestandslocatie: backend/app/api/customers.py
Full Path: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/backend/app/api/customers.py

FastAPI routes voor customer management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ MULTI-TENANT: Users zien alleen customers in hun workspace
✅ WORKSPACE: Gebruikt workspace_id voor data isolatie
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from ..core.database import get_db
from ..core.config import settings
from ..models.customer import Customer
from ..models.user import User
from .dependencies import get_current_user

router = APIRouter(prefix="/customers", tags=["customers"])


# ============================================================================
# CREATE
# ============================================================================

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_customer(
    customer_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new customer in the user's current workspace
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ Workspace Isolation: Customer is linked to user's current workspace
    ✅ User's Drive: Uses authenticated user's Google Drive
    """
    # Verify user has a current workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace selected. Please select a workspace first."
        )
    
    # Check if email already exists in this workspace
    existing = db.query(Customer).filter(
        Customer.email == customer_data.get('email'),
        Customer.workspace_id == current_user.current_workspace_id
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"A customer with email {customer_data.get('email')} already exists in this workspace"
        )

    # Parse name fields - support both full_name and first_name/last_name
    first_name = customer_data.get('first_name', '')
    last_name = customer_data.get('last_name', '')
    
    # If full_name is provided, split it
    if customer_data.get('full_name') and not (first_name or last_name):
        full_name = customer_data.get('full_name', '').strip()
        name_parts = full_name.split(' ', 1)
        first_name = name_parts[0] if len(name_parts) > 0 else ''
        last_name = name_parts[1] if len(name_parts) > 1 else ''

    # Parse address - support both single address field and separate fields
    street = customer_data.get('street', '')
    house_number = customer_data.get('house_number', '')
    house_number_addition = customer_data.get('house_number_addition', '')
    postal_code = customer_data.get('postal_code', '')
    city = customer_data.get('city', '')
    country = customer_data.get('country', '')
    
    # If address is provided as single string, just put it in street for now
    if customer_data.get('address') and not street:
        street = customer_data.get('address', '')

    # Create new customer in database
    db_customer = Customer(
        workspace_id=current_user.current_workspace_id,
        created_by=current_user.user_id,
        email=customer_data.get('email'),
        first_name=first_name,
        last_name=last_name,
        company_name=customer_data.get('company_name', ''),
        phone=customer_data.get('phone', ''),
        street=street,
        house_number=house_number,
        house_number_addition=house_number_addition,
        postal_code=postal_code,
        city=city,
        country=country,
        notes=customer_data.get('notes', ''),
        status=customer_data.get('status', 'active')
    )
    
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    
    print(f"✅ Customer created in workspace: {current_user.current_workspace_id}")
    print(f"   Customer: {db_customer.company_name or db_customer.full_name}")
    print(f"   Customer ID: {db_customer.customer_id}")

    return db_customer.to_dict()


# ============================================================================
# READ - LIST
# ============================================================================

@router.get("/")
def list_customers(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by status"),
    search: Optional[str] = Query(None, description="Search in email/name/company"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get list of customers with pagination and filters
    
    ✅ OAuth Protected: Only returns customers in user's current workspace
    ✅ Multi-tenant: Complete workspace isolation
    """
    # Verify workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace selected"
        )
    
    # Base query - ONLY workspace's customers
    query = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id
    )

    # Apply filters
    if status:
        query = query.filter(Customer.status == status)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Customer.email.ilike(search_term)) |
            (Customer.first_name.ilike(search_term)) |
            (Customer.last_name.ilike(search_term)) |
            (Customer.company_name.ilike(search_term))
        )

    # Get total count
    total = query.count()

    # Apply pagination
    offset = (page - 1) * page_size
    customers = query.offset(offset).limit(page_size).all()

    return {
        "customers": [c.to_dict() for c in customers],
        "total": total,
        "page": page,
        "page_size": page_size
    }


# ============================================================================
# READ - SUMMARY
# ============================================================================

@router.get("/summary")
def get_customers_summary(
    status: str = Query("active", description="Filter by status"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get lightweight customer list for dropdowns
    
    ✅ OAuth Protected: Only returns customers from current workspace
    """
    if not current_user.current_workspace_id:
        return []
    
    customers = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id,
        Customer.status == status
    ).all()

    return [
        {
            "customer_id": str(c.customer_id),
            "email": c.email,
            "company_name": c.company_name,
            "full_name": c.full_name
        }
        for c in customers
    ]


# ============================================================================
# READ - SINGLE
# ============================================================================

@router.get("/{customer_id}")
def get_customer(
    customer_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific customer by ID
    
    ✅ OAuth Protected: User can only access customers in their workspace
    ✅ Authorization: Returns 404 if customer doesn't belong to workspace
    """
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace selected"
        )
    
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    return customer.to_dict()


# ============================================================================
# UPDATE
# ============================================================================

@router.put("/{customer_id}")
def update_customer(
    customer_id: UUID,
    customer_update: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a customer
    
    ✅ OAuth Protected: User can only update customers in their workspace
    ✅ Authorization: Returns 404 if customer doesn't belong to workspace
    """
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace selected"
        )
    
    # Get customer with workspace verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    # Check if email is being changed and if new email already exists
    new_email = customer_update.get('email')
    if new_email and new_email != db_customer.email:
        existing = db.query(Customer).filter(
            Customer.email == new_email,
            Customer.workspace_id == current_user.current_workspace_id
        ).first()
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"A customer with email {new_email} already exists in this workspace"
            )

    # Update fields
    allowed_fields = [
        'email', 'first_name', 'last_name', 'company_name', 'phone',
        'street', 'house_number', 'house_number_addition', 'postal_code',
        'city', 'country', 'notes', 'status'
    ]
    
    for field in allowed_fields:
        if field in customer_update:
            setattr(db_customer, field, customer_update[field])

    db.commit()
    db.refresh(db_customer)

    return db_customer.to_dict()


# ============================================================================
# DELETE
# ============================================================================

@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(
    customer_id: UUID,
    hard_delete: bool = Query(False, description="Permanently delete (true) or soft delete (false)"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a customer
    
    ✅ OAuth Protected: User can only delete customers in their workspace
    ✅ Authorization: Returns 404 if customer doesn't belong to workspace
    """
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace selected"
        )
    
    # Get customer with workspace verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    if hard_delete:
        db.delete(db_customer)
    else:
        db_customer.status = "deleted"

    db.commit()
    return None


# ============================================================================
# ARCHIVE
# ============================================================================

@router.post("/{customer_id}/archive")
def archive_customer(
    customer_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Archive a customer
    
    ✅ OAuth Protected: User can only archive customers in their workspace
    """
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace selected"
        )
    
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    db_customer.status = "archived"
    db.commit()
    db.refresh(db_customer)

    return db_customer.to_dict()


# ============================================================================
# RESTORE
# ============================================================================

@router.post("/{customer_id}/restore")
def restore_customer(
    customer_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Restore an archived or deleted customer
    
    ✅ OAuth Protected: User can only restore customers in their workspace
    """
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace selected"
        )
    
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    db_customer.status = "active"
    db.commit()
    db.refresh(db_customer)

    return db_customer.to_dict()


# ============================================================================
# STATISTICS
# ============================================================================

@router.get("/stats/overview")
def get_customer_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get customer statistics for current workspace
    
    ✅ OAuth Protected: Only shows stats for workspace's customers
    
    Returns:
        - total: Total customers
        - active: Active customers
        - archived: Archived customers
        - deleted: Deleted customers
    """
    if not current_user.current_workspace_id:
        return {
            "total": 0,
            "active": 0,
            "archived": 0,
            "deleted": 0,
            "workspace_id": None,
            "user_email": current_user.email
        }
    
    base_query = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id
    )
    
    total = base_query.count()
    active = base_query.filter(Customer.status == "active").count()
    archived = base_query.filter(Customer.status == "archived").count()
    deleted = base_query.filter(Customer.status == "deleted").count()
    
    return {
        "total": total,
        "active": active,
        "archived": archived,
        "deleted": deleted,
        "workspace_id": str(current_user.current_workspace_id),
        "user_email": current_user.email
    }
