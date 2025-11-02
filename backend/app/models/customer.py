"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER MODEL
==========================================
Bestandslocatie: backend/app/models/customer.py
Full Path: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/backend/app/models/customer.py

SQLAlchemy model voor customers tabel
✅ UPDATED: Workspace support + Address fields + Notes
"""

from sqlalchemy import Column, String, Integer, DateTime, Text, func, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from ..core.database import Base


class Customer(Base):
    """
    Customer model - represents a client/company in the system
    Een folder per klant wordt aangemaakt op Google Drive
    
    ✅ WORKSPACE SUPPORT:
    - Each customer belongs to one workspace
    - Users can only see customers in their workspace
    - Complete data isolation between users
    
    ✅ ADDRESS FIELDS:
    - Full Belgian/Dutch address support
    - Street, house number, postal code, city, country
    """
    __tablename__ = "customers"
    
    # Primary Key
    customer_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # ✅ Workspace (data isolation)
    workspace_id = Column(
        UUID(as_uuid=True),
        ForeignKey('workspaces.workspace_id', ondelete='CASCADE'),
        nullable=True,  # Nullable for migration compatibility
        index=True
    )
    
    # ✅ Created by user
    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey('users.user_id'),
        nullable=True,
        index=True
    )
    
    # Basic Info
    email = Column(String(255), nullable=False, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    company_name = Column(String(255))
    phone = Column(String(50))
    
    # ✅ Address Fields (Added in migration 005)
    street = Column(String(255), nullable=True)
    house_number = Column(String(20), nullable=True)
    house_number_addition = Column(String(10), nullable=True)
    postal_code = Column(String(20), nullable=True)
    city = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True, server_default='Nederland')
    
    # ✅ Notes field
    notes = Column(Text, nullable=True)
    
    # Google Drive Integration
    google_drive_folder_id = Column(String(255))
    google_sheet_row_number = Column(Integer)
    
    # Status (gebruikt string status i.p.v. boolean archived)
    # Mogelijke waarden: "active", "archived", "inactive", "deleted"
    status = Column(String(50), default="active", index=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by_name = Column(String(100), default="system")  # Legacy field
    
    # ✅ RELATIONSHIPS
    
    # Workspace this customer belongs to
    workspace = relationship("Workspace", back_populates="customers")
    
    # User who created this customer
    creator = relationship("User", foreign_keys=[created_by])
    
    # Events for this customer (one-to-many)
    events = relationship(
        "Event",
        back_populates="customer",
        cascade="all, delete-orphan",
        lazy="select"
    )
    
    def __repr__(self):
        return f"<Customer(id={self.customer_id}, email={self.email}, company={self.company_name})>"
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            "customer_id": str(self.customer_id),
            "workspace_id": str(self.workspace_id) if self.workspace_id else None,
            "created_by": str(self.created_by) if self.created_by else None,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "full_name": self.full_name,  # Computed property
            "company_name": self.company_name,
            "phone": self.phone,
            "street": self.street,
            "house_number": self.house_number,
            "house_number_addition": self.house_number_addition,
            "postal_code": self.postal_code,
            "city": self.city,
            "country": self.country,
            "notes": self.notes,
            "google_drive_folder_id": self.google_drive_folder_id,
            "google_sheet_row_number": self.google_sheet_row_number,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "created_by_name": self.created_by_name
        }
    
    @property
    def full_name(self):
        """Get full name of customer"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.first_name or self.last_name or ""
    
    @property
    def display_name(self):
        """Get best display name (company or full name)"""
        return self.company_name or self.full_name or self.email
    
    @property
    def full_address(self):
        """Get formatted full address"""
        parts = []
        
        # Street and number
        street_part = self.street or ""
        if self.house_number:
            street_part += f" {self.house_number}"
            if self.house_number_addition:
                street_part += f" {self.house_number_addition}"
        if street_part:
            parts.append(street_part)
        
        # Postal code and city
        location_part = ""
        if self.postal_code:
            location_part = self.postal_code
        if self.city:
            location_part += f" {self.city}" if location_part else self.city
        if location_part:
            parts.append(location_part)
        
        # Country
        if self.country and self.country.lower() != "nederland":
            parts.append(self.country)
        
        return ", ".join(parts) if parts else ""
    
    @property
    def is_active(self):
        """Check if customer is active"""
        return self.status == "active"
    
    @property
    def archived(self):
        """Check if customer is archived (backwards compatibility)"""
        return self.status == "archived"
    
    @property
    def event_count(self):
        """Get total number of events for this customer"""
        return len(self.events) if self.events else 0
