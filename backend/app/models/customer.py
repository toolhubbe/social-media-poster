"""
==========================================
SOCIAL MEDIA POSTER - CUSTOMER MODEL
==========================================
Bestandslocatie: social_media_poster_backend/app/models/customer.py

SQLAlchemy model voor customers tabel
✅ UPDATED: Event relatie toegevoegd + Compatible met bestaande database (status veld)
"""

from sqlalchemy import Column, String, Integer, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from ..core.database import Base


class Customer(Base):
    """
    Customer model - represents a client/company in the system
    """
    __tablename__ = "customers"
    
    # Primary Key
    customer_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
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
    created_by = Column(String(100), default="system")
    
    # ✅ NIEUWE RELATIE: Events
    # Een customer kan meerdere events hebben (one-to-many)
    events = relationship(
        "Event",
        back_populates="customer",
        cascade="all, delete-orphan",  # Als customer wordt verwijderd, ook events verwijderen
        lazy="select"  # Events worden alleen geladen als je ze opvraagt
    )
    
    def __repr__(self):
        return f"<Customer(id={self.customer_id}, email={self.email}, company={self.company_name})>"
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            "customer_id": str(self.customer_id),
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
            "created_by": self.created_by
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
    
    # ✅ NIEUWE PROPERTY: Check if archived via status
    @property
    def archived(self):
        """Check if customer is archived (backwards compatibility)"""
        return self.status == "archived"
    
    # ✅ NIEUWE PROPERTY: Event count
    @property
    def event_count(self):
        """Get total number of events for this customer"""
        return len(self.events) if self.events else 0
