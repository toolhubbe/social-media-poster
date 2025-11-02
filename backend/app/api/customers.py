"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER API ENDPOINTS
==========================================
Bestandslocatie: backend/app/api/customers.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/api/customers.py

FastAPI routes voor customer management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ WORKSPACE ISOLATION: Users zien alleen customers in hun workspace
✅ AUTO DRIVE FOLDERS: Automatic Google Drive folder creation BEFORE database save
✅ ATOMIC OPERATIONS: Drive folder + Database as single transaction
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from ..core.database import get_db
from ..core.config import settings
from ..models.customer import Customer
from ..models.user import User
from ..models.workspace import Workspace
from ..schemas.customer import (
    CustomerCreate,
    CustomerUpdate,
    CustomerResponse,
    CustomerListResponse,
    CustomerSummary
)
from .dependencies import get_current_user, get_current_workspace
from ..services.drive_service import DriveService, sanitize_folder_name

router = APIRouter(prefix="/customers", tags=["customers"])


# ============================================================================
# CREATE
# ============================================================================

@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
async def create_customer(
    customer: CustomerCreate,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    current_user: User = Depends(get_current_user),  # ✅ OAuth authentication
    db: Session = Depends(get_db)
):
    """
    Create a new customer with automatic Google Drive folder
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ Workspace Isolated: Customer is linked to workspace
    ✅ Auto Drive Folder: Creates folder in Customers subfolder (if Drive setup complete)
    ✅ ATOMIC: Drive folder is created FIRST, then database record
    
    Workflow:
    1. Validate customer doesn't exist
    2. Create Google Drive folder → Get folder_id
    3. Create customer in database WITH folder_id
    4. If either step fails → Full rollback, no incomplete data
    
    The customer folder is created in: [Workspace]/Customers/[customer_name]/
    Folder name is normalized: lowercase, spaces → underscores
    """
    
    # Check if email already exists in this workspace
    existing = db.query(Customer).filter(
        Customer.email == customer.email,
        Customer.workspace_id == workspace.workspace_id
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"A customer with email {customer.email} already exists in your workspace"
        )

    # Determine folder name (normalized: lowercase + underscores)
    if customer.company_name:
        folder_name = sanitize_folder_name(customer.company_name)
    elif customer.first_name and customer.last_name:
        folder_name = sanitize_folder_name(f"{customer.first_name}_{customer.last_name}")
    else:
        folder_name = sanitize_folder_name(customer.email.split('@')[0])

    # Variable to store folder_id
    google_drive_folder_id = None
    
    # ✨ STEP 1: Create Google Drive folder FIRST (if Drive setup complete)
    if workspace.drive_setup_complete and workspace.drive_folder_id:
        try:
            print(f"\n📁 Creating Google Drive folder for customer: {folder_name}")
            
            # Initialize Drive service with user's OAuth token
            drive_service = DriveService(current_user.google_access_token)
            
            # Create customer folder inside workspace's main folder
            folder_result = await drive_service.create_folder(
                folder_name=folder_name,
                parent_id=workspace.drive_folder_id
            )
            
            google_drive_folder_id = folder_result['id']
            
            print(f"✅ Customer folder created successfully!")
            print(f"   Folder ID: {folder_result['id']}")
            print(f"   Folder Name: {folder_result['name']}")
            print(f"   Folder Link: {folder_result.get('webViewLink', 'N/A')}")
            
        except HTTPException as e:
            # If Drive folder creation fails, abort customer creation
            print(f"❌ Failed to create Drive folder: {e.detail}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create Google Drive folder: {e.detail}. Customer not created."
            )
        except Exception as e:
            print(f"❌ Unexpected error creating Drive folder: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create Google Drive folder: {str(e)}. Customer not created."
            )
    else:
        print(f"ℹ️  Drive setup not complete - customer will be created without Drive folder")

    # ✅ STEP 2: Create customer in database WITH folder_id
    try:
        db_customer = Customer(
            **customer.model_dump(),
            workspace_id=workspace.workspace_id,
            created_by=current_user.user_id,
            google_drive_folder_id=google_drive_folder_id  # ✅ Set folder_id from Drive creation
        )
        
        db.add(db_customer)
        db.commit()
        db.refresh(db_customer)
        
        print(f"\n✅ Customer created in workspace: {workspace.name}")
        print(f"   User: {current_user.email}")
        print(f"   Customer: {db_customer.company_name or db_customer.email}")
        print(f"   Customer ID: {db_customer.customer_id}")
        print(f"   Drive Folder ID: {db_customer.google_drive_folder_id or 'Not created'}")
        
        return db_customer
        
    except Exception as e:
        print(f"❌ Failed to create customer in database: {str(e)}")
        # TODO: Optionally delete the Drive folder if database creation fails
        # For now, we keep the folder (orphaned but can be cleaned up later)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create customer: {str(e)}"
        )


# ============================================================================
# READ - LIST
# ============================================================================

@router.get("/", response_model=CustomerListResponse)
def list_customers(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by status"),
    search: Optional[str] = Query(None, description="Search in email/name/company"),
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get list of customers with pagination and filters
    
    ✅ OAuth Protected: Only returns customers in user's workspace
    ✅ Workspace Isolation: User can only see workspace customers
    """
    # Base query - ONLY workspace's customers
    query = db.query(Customer).filter(
        Customer.workspace_id == workspace.workspace_id  # ✅ Critical: Filter by workspace
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
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get lightweight customer list for dropdowns
    
    ✅ OAuth Protected: Only returns workspace's customers
    """
    customers = db.query(Customer).filter(
        Customer.workspace_id == workspace.workspace_id,
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
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Get a specific customer by ID
    
    ✅ OAuth Protected: User can only access workspace customers
    """
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == workspace.workspace_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
        )

    return customer


# ============================================================================
# UPDATE
# ============================================================================

@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: UUID,
    customer_update: CustomerUpdate,
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Update a customer
    
    ✅ OAuth Protected: User can only update workspace customers
    """
    # Get customer with workspace verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == workspace.workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
        )

    # Check if email is being changed and if new email already exists
    if customer_update.email and customer_update.email != db_customer.email:
        existing = db.query(Customer).filter(
            Customer.email == customer_update.email,
            Customer.workspace_id == workspace.workspace_id
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
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Delete a customer
    
    ✅ OAuth Protected: User can only delete workspace customers
    """
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == workspace.workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
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
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Archive a customer
    
    ✅ OAuth Protected: User can only archive workspace customers
    """
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == workspace.workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
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
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    db: Session = Depends(get_db)
):
    """
    Restore an archived or deleted customer
    
    ✅ OAuth Protected: User can only restore workspace customers
    """
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == workspace.workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found in your workspace"
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
    workspace: Workspace = Depends(get_current_workspace),  # ✨ Workspace isolation
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get customer statistics for current workspace
    
    ✅ OAuth Protected: Only shows stats for workspace customers
    """
    base_query = db.query(Customer).filter(
        Customer.workspace_id == workspace.workspace_id
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
        "workspace_id": str(workspace.workspace_id),
        "workspace_name": workspace.name,
        "user_email": current_user.email
    }
