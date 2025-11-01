"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER MODEL
==========================================
Bestandslocatie: backend/app/models/customer.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/models/customer.py

SQLAlchemy model voor customers tabel
✅ UPDATED: Workspace support - customers belong to a user's workspace
✅ FIXED: Removed created_by_name column (doesn't exist in database)
"""

from sqlalchemy import Column, String, Integer, DateTime, func, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from ..core.database import Base


class Customer(Base):
    """
    Customer model - represents a client/company in the system
    Each customer has a folder created in Google Drive
    
    ✅ WORKSPACE SUPPORT:
    - Each customer belongs to one workspace
    - Users can only see customers in their workspace
    - Complete data isolation between users
    """
    __tablename__ = "customers"
    
    # Primary Key
    customer_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # ✅ Workspace (data isolation) - Each customer belongs to a workspace
    workspace_id = Column(
        UUID(as_uuid=True),
        ForeignKey('workspaces.workspace_id', ondelete='CASCADE'),
        nullable=False,  # Required for data isolation
        index=True
    )
    
    # ✅ Created by user - Track who created this customer
    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey('users.user_id'),
        nullable=True,
        index=True
    )
    
    # Basic Info
    email = Column(String(255), unique=True, nullable=False, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    company_name = Column(String(255))
    phone = Column(String(50))
    
    # Google Drive Integration
    google_drive_folder_id = Column(String(255))
    google_sheet_row_number = Column(Integer)
    
    # Status (gebruikt string status i.p.v. boolean archived)
    # Mogelijke waarden: "active", "archived", "inactive", etc.
    status = Column(String(50), default="active", index=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
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
            "company_name": self.company_name,
            "phone": self.phone,
            "google_drive_folder_id": self.google_drive_folder_id,
            "google_sheet_row_number": self.google_sheet_row_number,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "created_by_user_name": self.creator.full_name if self.creator else "System"
        }
    
    @property
    def full_name(self):
        """Get full name of customer"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.first_name or self.last_name or "Unknown"
    
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
    
    @property
    def created_by_user_name(self):
        """Get name of user who created this customer"""
        if self.creator:
            return self.creator.full_name
        return "System"
