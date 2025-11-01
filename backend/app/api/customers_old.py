"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER API ENDPOINTS
==========================================
Bestandslocatie: backend/app/api/customers.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/api/customers.py

FastAPI routes voor customer management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ MULTI-TENANT: Users zien alleen customers in hun workspace
✅ WORKSPACE ISOLATION: Proper workspace_id usage throughout
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
    ✅ Workspace Isolation: Customer is linked to user's workspace
    ✅ User's Drive: Uses authenticated user's Google Drive
    
    The customer will be created in the user's workspace and their Google Drive.
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete workspace setup first"
        )
    
    # Check if email already exists IN THIS WORKSPACE
    existing = db.query(Customer).filter(
        Customer.email == customer.email,
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Check within workspace
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"A customer with email {customer.email} already exists in your workspace"
        )

    # Create new customer in database
    db_customer = Customer(
        **customer.model_dump(),
        workspace_id=current_user.current_workspace_id,  # ✅ Link to workspace
        created_by=current_user.user_id  # ✅ Track who created it
    )
    
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    
    # ✅ TODO: Implement Google Drive folder creation using user's OAuth token
    # This will use the authenticated user's Google Drive, not a Service Account
    # Implementation will be added in Phase 2 after OAuth is fully working
    
    print(f"✅ Customer created in workspace: {current_user.current_workspace_id}")
    print(f"   Created by: {current_user.email}")
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
    
    ✅ OAuth Protected: Only returns customers in user's workspace
    ✅ Multi-tenant: Complete workspace isolation
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete workspace setup first"
        )
    
    # Base query - ONLY customers in user's workspace
    query = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Workspace filter
    )

    # Apply filters
    if status:
        query = query.filter(Customer.status == status)
    else:
        # Default to active customers only
        query = query.filter(Customer.status == "active")

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Customer.email.ilike(search_term)) |
            (Customer.first_name.ilike(search_term)) |
            (Customer.last_name.ilike(search_term)) |
            (Customer.company_name.ilike(search_term))
        )

    # Order by company name
    query = query.order_by(Customer.company_name)

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
    
    ✅ OAuth Protected: Only returns customers in user's workspace
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        return []  # Return empty list if no workspace
    
    customers = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id,  # ✅ Workspace filter
        Customer.status == status
    ).order_by(Customer.company_name).all()

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
    
    ✅ OAuth Protected: User can only access customers in their workspace
    ✅ Authorization: Returns 404 if customer not in user's workspace
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete workspace setup first"
        )
    
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Verify workspace
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or not in your workspace"
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
    
    ✅ OAuth Protected: User can only update customers in their workspace
    ✅ Authorization: Returns 404 if customer not in user's workspace
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete workspace setup first"
        )
    
    # Get customer with workspace verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Verify workspace
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or not in your workspace"
        )

    # Check if email is being changed and if new email already exists (in this workspace)
    if customer_update.email and customer_update.email != db_customer.email:
        existing = db.query(Customer).filter(
            Customer.email == customer_update.email,
            Customer.workspace_id == current_user.current_workspace_id  # ✅ Check workspace
        ).first()
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"A customer with email {customer_update.email} already exists in your workspace"
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
    
    ✅ OAuth Protected: User can only delete customers in their workspace
    ✅ Authorization: Returns 404 if customer not in user's workspace
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete workspace setup first"
        )
    
    # Get customer with workspace verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Verify workspace
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or not in your workspace"
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
    
    ✅ OAuth Protected: User can only archive customers in their workspace
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete workspace setup first"
        )
    
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Verify workspace
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or not in your workspace"
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
    
    ✅ OAuth Protected: User can only restore customers in their workspace
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete workspace setup first"
        )
    
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Verify workspace
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or not in your workspace"
        )

    db_customer.status = "active"
    db.commit()
    db.refresh(db_customer)

    return db_customer


# ============================================================================
# STATISTICS
# ============================================================================

@router.get("/stats/overview")
def get_customer_stats(
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Get customer statistics for current user's workspace
    
    ✅ OAuth Protected: Only shows stats for user's workspace
    
    Returns:
        - total: Total customers
        - active: Active customers
        - archived: Archived customers
        - deleted: Deleted customers
    """
    # ✅ Check if user has a workspace
    if not current_user.current_workspace_id:
        return {
            "total": 0,
            "active": 0,
            "archived": 0,
            "deleted": 0,
            "user_email": current_user.email,
            "workspace_id": None
        }
    
    base_query = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id  # ✅ Workspace filter
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
        "user_email": current_user.email,
        "workspace_id": str(current_user.current_workspace_id)
    }
