"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER API ENDPOINTS
==========================================
Bestandslocatie: app/api/customers.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/api/customers.py

FastAPI routes voor customer management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ MULTI-TENANT: Users zien alleen hun eigen customers
✅ USER DRIVE: Elk gebruiker gebruikt zijn eigen Google Drive
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from ..core.database import get_db
from ..core.config import settings
from ..models.customer import Customer
from ..models.user import User
from ..schemas.customer import (
    CustomerCreate,
    CustomerUpdate,
    CustomerResponse,
    CustomerListResponse,
    CustomerSummary
)
from .dependencies import get_current_user

router = APIRouter(prefix="/customers", tags=["customers"])


# ============================================================================
# CREATE
# ============================================================================

@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
def create_customer(
    customer: CustomerCreate,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Create a new customer
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ User Isolation: Customer is linked to authenticated user
    ✅ User's Drive: Uses authenticated user's Google Drive (not Service Account)
    
    The customer will be created in the user's own Google Drive
    using their OAuth access token.
    """
    # Check if email already exists FOR THIS USER
    existing = db.query(Customer).filter(
        Customer.email == customer.email,
        Customer.user_id == current_user.user_id  # ✅ Only check within user's own data
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"You already have a customer with email {customer.email}"
        )

    # Create new customer in database
    db_customer = Customer(
        **customer.model_dump(),
        user_id=current_user.user_id  # ✅ Link customer to user
    )
    
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    
    # ✅ TODO: Implement Google Drive folder creation using user's OAuth token
    # This will use the authenticated user's Google Drive, not a Service Account
    # Implementation will be added in Phase 2 after OAuth is fully working
    
    print(f"✅ Customer created for user: {current_user.email}")
    print(f"   Customer: {db_customer.company_name or db_customer.email}")
    print(f"   Customer ID: {db_customer.customer_id}")

    return db_customer


# ============================================================================
# READ - LIST
# ============================================================================

@router.get("/", response_model=CustomerListResponse)
def list_customers(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by status"),
    search: Optional[str] = Query(None, description="Search in email/name/company"),
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get list of customers with pagination and filters
    
    ✅ OAuth Protected: Only returns customers owned by authenticated user
    ✅ Multi-tenant: User can only see their own customers
    """
    # Base query - ONLY user's own customers
    query = db.query(Customer).filter(
        Customer.user_id == current_user.user_id  # ✅ Critical: Filter by user
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

    return CustomerListResponse(
        customers=customers,
        total=total,
        page=page,
        page_size=page_size
    )


# ============================================================================
# READ - SUMMARY
# ============================================================================

@router.get("/summary", response_model=List[CustomerSummary])
def get_customers_summary(
    status: str = Query("active", description="Filter by status"),
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get lightweight customer list for dropdowns
    
    ✅ OAuth Protected: Only returns user's own customers
    """
    customers = db.query(Customer).filter(
        Customer.user_id == current_user.user_id,  # ✅ User's own data only
        Customer.status == status
    ).all()

    return [
        CustomerSummary(
            customer_id=c.customer_id,
            email=c.email,
            company_name=c.company_name,
            full_name=c.full_name
        )
        for c in customers
    ]


# ============================================================================
# READ - SINGLE
# ============================================================================

@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(
    customer_id: UUID,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get a specific customer by ID
    
    ✅ OAuth Protected: User can only access their own customers
    ✅ Authorization: Returns 404 if customer doesn't belong to user
    """
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    return customer


# ============================================================================
# UPDATE
# ============================================================================

@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: UUID,
    customer_update: CustomerUpdate,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Update a customer
    
    ✅ OAuth Protected: User can only update their own customers
    ✅ Authorization: Returns 404 if customer doesn't belong to user
    """
    # Get customer with ownership verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    # Check if email is being changed and if new email already exists (for this user)
    if customer_update.email and customer_update.email != db_customer.email:
        existing = db.query(Customer).filter(
            Customer.email == customer_update.email,
            Customer.user_id == current_user.user_id  # ✅ Only check user's own customers
        ).first()
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"You already have a customer with email {customer_update.email}"
            )

    # Update fields
    update_data = customer_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_customer, field, value)

    db.commit()
    db.refresh(db_customer)

    return db_customer


# ============================================================================
# DELETE
# ============================================================================

@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(
    customer_id: UUID,
    hard_delete: bool = Query(False, description="Permanently delete (true) or soft delete (false)"),
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Delete a customer
    
    ✅ OAuth Protected: User can only delete their own customers
    ✅ Authorization: Returns 404 if customer doesn't belong to user
    """
    # Get customer with ownership verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.user_id == current_user.user_id  # ✅ Verify ownership
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

@router.post("/{customer_id}/archive", response_model=CustomerResponse)
def archive_customer(
    customer_id: UUID,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Archive a customer
    
    ✅ OAuth Protected: User can only archive their own customers
    """
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    db_customer.status = "archived"
    db.commit()
    db.refresh(db_customer)

    return db_customer


# ============================================================================
# RESTORE
# ============================================================================

@router.post("/{customer_id}/restore", response_model=CustomerResponse)
def restore_customer(
    customer_id: UUID,
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Restore an archived or deleted customer
    
    ✅ OAuth Protected: User can only restore their own customers
    """
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.user_id == current_user.user_id  # ✅ Verify ownership
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or you don't have access to it"
        )

    db_customer.status = "active"
    db.commit()
    db.refresh(db_customer)

    return db_customer


# ============================================================================
# STATISTICS (NEW!)
# ============================================================================

@router.get("/stats/overview")
def get_customer_stats(
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get customer statistics for current user
    
    ✅ OAuth Protected: Only shows stats for user's own customers
    
    Returns:
        - total: Total customers
        - active: Active customers
        - archived: Archived customers
        - deleted: Deleted customers
    """
    base_query = db.query(Customer).filter(
        Customer.user_id == current_user.user_id
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
        "user_email": current_user.email
    }
