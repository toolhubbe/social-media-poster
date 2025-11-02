"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER SCHEMAS
==========================================
Bestandslocatie: backend/app/schemas/customer.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/schemas/customer.py

Pydantic schemas voor request/response validation
✅ FIXED: Added missing created_by_name field to CustomerResponse
✅ EXISTING: Address fields (street, house_number, postal_code, city, country)
✅ EXISTING: Notes field
"""

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime
from uuid import UUID


class CustomerBase(BaseModel):
    """Base customer schema with common fields"""
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company_name: Optional[str] = None
    phone: Optional[str] = None
    
    # ✨ NEW: Address fields
    street: Optional[str] = None
    house_number: Optional[str] = None
    house_number_addition: Optional[str] = None
    postal_code: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = "Nederland"  # Default to Nederland
    
    # ✨ NEW: Notes field
    notes: Optional[str] = None


class CustomerCreate(CustomerBase):
    """Schema for creating a new customer"""
    
    @validator('company_name', 'first_name', 'last_name')
    def not_empty(cls, v):
        if v is not None and len(v.strip()) == 0:
            raise ValueError('Field cannot be empty string')
        return v
    
    @validator('street', 'city', 'postal_code')
    def not_empty_address(cls, v):
        """Validate address fields are not empty strings"""
        if v is not None and len(v.strip()) == 0:
            raise ValueError('Address field cannot be empty string')
        return v
    
    @validator('house_number')
    def validate_house_number(cls, v):
        """Validate house number if provided"""
        if v is not None:
            v = v.strip()
            if len(v) == 0:
                raise ValueError('House number cannot be empty string')
        return v


class CustomerUpdate(BaseModel):
    """Schema for updating a customer - all fields optional"""
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company_name: Optional[str] = None
    phone: Optional[str] = None
    
    # ✨ NEW: Address fields (all optional for update)
    street: Optional[str] = None
    house_number: Optional[str] = None
    house_number_addition: Optional[str] = None
    postal_code: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    
    # ✨ NEW: Notes field
    notes: Optional[str] = None
    
    status: Optional[str] = None
    
    @validator('status')
    def validate_status(cls, v):
        if v is not None:
            allowed_statuses = ['active', 'archived', 'deleted']
            if v not in allowed_statuses:
                raise ValueError(f'Status must be one of: {allowed_statuses}')
        return v


class CustomerResponse(CustomerBase):
    """Schema for customer response
    ✅ FIXED: Added missing created_by_name field to match database model"""
    customer_id: UUID
    workspace_id: UUID  # ✅ Required - customer always belongs to workspace
    created_by: Optional[UUID] = None  # ✅ User who created this customer (UUID)
    created_by_name: str  # ✅ ADDED: Legacy string field from database
    google_drive_folder_id: Optional[str] = None
    google_sheet_row_number: Optional[int] = None
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class CustomerListResponse(BaseModel):
    """Schema for list of customers with pagination"""
    customers: list[CustomerResponse]
    total: int
    page: int
    page_size: int
    
    class Config:
        from_attributes = True


class CustomerSummary(BaseModel):
    """Lightweight customer summary for dropdowns"""
    customer_id: UUID
    email: str
    company_name: Optional[str] = None
    full_name: str
    
    class Config:
        from_attributes = True


class CustomerDetailResponse(CustomerResponse):
    """Extended customer response with computed fields"""
    full_name: str
    display_name: str
    full_address: Optional[str] = None
    has_complete_address: bool
    event_count: int
    created_by_user_name: str
    
    class Config:
        from_attributes = True


# Health check schema
class HealthCheck(BaseModel):
    """Health check response"""
    status: str
    message: str
    database_connected: bool
    timestamp: datetime
