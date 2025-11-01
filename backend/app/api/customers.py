"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER API ENDPOINTS
==========================================
Bestandslocatie: backend/app/api/customers.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/api/customers.py

FastAPI routes voor customer management
✅ OAUTH 2.0: Alle endpoints beveiligd met JWT authenticatie
✅ WORKSPACE-BASED: Customers behoren tot workspace (multi-tenant)
✅ USER DRIVE: Elk gebruiker gebruikt zijn eigen Google Drive
✅ AUTO FOLDER CREATION: Maakt automatisch Google Drive folder aan per customer
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
from .dependencies import get_current_user
from ..services.drive_service import DriveService, sanitize_folder_name

router = APIRouter(prefix="/customers", tags=["customers"])


# ============================================================================
# CREATE
# ============================================================================

@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
async def create_customer(
    customer: CustomerCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new customer with automatic Google Drive folder creation
    
    ✅ OAuth Protected: Requires valid JWT token
    ✅ Workspace Isolation: Customer linked to user's workspace
    ✅ Auto Drive Folder: Creates folder in workspace's customers subfolder
    
    Process:
    1. Verify user has workspace set up
    2. Check customer email uniqueness in workspace
    3. Create Google Drive folder in workspace/customers/
    4. Save customer with Drive folder ID
    """
    
    # ============================================================================
    # STEP 1: Verify workspace setup
    # ============================================================================
    
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No workspace found. Please complete workspace setup first."
        )
    
    workspace = db.query(Workspace).filter(
        Workspace.workspace_id == current_user.current_workspace_id
    ).first()
    
    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace not found"
        )
    
    if not workspace.drive_setup_complete:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google Drive setup not complete. Please complete Drive setup first."
        )
    
    if not workspace.drive_customers_folder_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Customers folder not found in Drive. Please contact support."
        )
    
    # ============================================================================
    # STEP 2: Check email uniqueness (within workspace)
    # ============================================================================
    
    existing = db.query(Customer).filter(
        Customer.email == customer.email,
        Customer.workspace_id == workspace.workspace_id
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"A customer with email {customer.email} already exists in your workspace"
        )
    
    # ============================================================================
    # STEP 3: Create Google Drive folder
    # ============================================================================
    
    # Check if user has valid access token
    if not current_user.google_access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication required. Please re-authenticate."
        )
    
    # Generate folder name
    if customer.company_name:
        folder_name = sanitize_folder_name(customer.company_name)
    elif customer.first_name or customer.last_name:
        name_parts = [customer.first_name, customer.last_name]
        folder_name = sanitize_folder_name(" ".join([n for n in name_parts if n]))
    else:
        # Use email prefix as fallback
        folder_name = sanitize_folder_name(customer.email.split('@')[0])
    
    # Create Drive service with user's OAuth token
    drive_service = DriveService(current_user.google_access_token)
    
    try:
        # Create customer folder in workspace's customers subfolder
        folder_info = await drive_service.create_folder(
            folder_name=folder_name,
            parent_id=workspace.drive_customers_folder_id
        )
        
        customer_drive_folder_id = folder_info['id']
        
        print(f"✅ Created Drive folder for customer: {folder_name}")
        print(f"   Folder ID: {customer_drive_folder_id}")
        print(f"   Link: {folder_info.get('webViewLink', 'N/A')}")
        
    except HTTPException as e:
        # Drive API error - still create customer but log error
        print(f"⚠️ Failed to create Drive folder: {e.detail}")
        customer_drive_folder_id = None
        # Don't fail customer creation if Drive fails
        # User can manually create folder later
    except Exception as e:
        print(f"⚠️ Unexpected error creating Drive folder: {str(e)}")
        customer_drive_folder_id = None
    
    # ============================================================================
    # STEP 4: Create customer in database
    # ============================================================================
    
    db_customer = Customer(
        **customer.model_dump(),
        workspace_id=workspace.workspace_id,  # ✅ Link to workspace
        created_by=current_user.user_id,      # ✅ Track who created it
        google_drive_folder_id=customer_drive_folder_id  # ✅ Store Drive folder ID
    )
    
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    
    # ============================================================================
    # STEP 5: Log success
    # ============================================================================
    
    print(f"✅ Customer created successfully!")
    print(f"   User: {current_user.email}")
    print(f"   Workspace: {workspace.name}")
    print(f"   Customer: {db_customer.company_name or db_customer.email}")
    print(f"   Customer ID: {db_customer.customer_id}")
    print(f"   Drive Folder: {'✅ Created' if customer_drive_folder_id else '⚠️ Not created'}")
    
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get list of customers with pagination and filters
    
    ✅ OAuth Protected: Only returns customers in user's workspace
    ✅ Workspace Isolation: User only sees their workspace's customers
    """
    
    # Verify workspace
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get lightweight customer list for dropdowns
    
    ✅ OAuth Protected: Only returns workspace's customers
    """
    
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
        )
    
    customers = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id,
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific customer by ID
    
    ✅ OAuth Protected: User can only access workspace's customers
    ✅ Authorization: Returns 404 if customer not in workspace
    """
    
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
        )
    
    customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a customer
    
    ✅ OAuth Protected: User can only update workspace's customers
    ✅ Authorization: Returns 404 if customer not in workspace
    """
    
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
        )
    
    # Get customer with workspace verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
    ).first()

    if not db_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found or not in your workspace"
        )

    # Check if email is being changed and if new email already exists
    if customer_update.email and customer_update.email != db_customer.email:
        existing = db.query(Customer).filter(
            Customer.email == customer_update.email,
            Customer.workspace_id == current_user.current_workspace_id
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a customer
    
    ✅ OAuth Protected: User can only delete workspace's customers
    ✅ Authorization: Returns 404 if customer not in workspace
    
    Note: Does NOT delete Google Drive folder (for safety)
    """
    
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
        )
    
    # Get customer with workspace verification
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Archive a customer
    
    ✅ OAuth Protected: User can only archive workspace's customers
    """
    
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
        )
    
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Restore an archived or deleted customer
    
    ✅ OAuth Protected: User can only restore workspace's customers
    """
    
    if not current_user.current_workspace_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
        )
    
    db_customer = db.query(Customer).filter(
        Customer.customer_id == customer_id,
        Customer.workspace_id == current_user.current_workspace_id
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
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active workspace"
        )
    
    base_query = db.query(Customer).filter(
        Customer.workspace_id == current_user.current_workspace_id
    )
    
    total = base_query.count()
    active = base_query.filter(Customer.status == "active").count()
    archived = base_query.filter(Customer.status == "archived").count()
    deleted = base_query.filter(Customer.status == "deleted").count()
    
    # Count customers with Drive folders
    with_drive_folder = base_query.filter(
        Customer.google_drive_folder_id.isnot(None)
    ).count()
    
    return {
        "total": total,
        "active": active,
        "archived": archived,
        "deleted": deleted,
        "with_drive_folder": with_drive_folder,
        "workspace_id": str(current_user.current_workspace_id),
        "user_email": current_user.email
    }
