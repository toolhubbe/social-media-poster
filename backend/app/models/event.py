"""
Event Model - Database model voor events tabel
Bestandslocatie: social_media_poster_backend/app/models/event.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/models/event.py

✅ UPDATED: Photos relationship toegevoegd
"""

from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from ..core.database import Base


class Event(Base):
    """
    Event model - represents an event for a customer
    One customer can have multiple events
    """
    __tablename__ = "events"
    
    # Primary Key
    event_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Foreign Key to Customer
    customer_id = Column(
        UUID(as_uuid=True), 
        ForeignKey('customers.customer_id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    
    # Event Information
    event_name = Column(String(255), nullable=False)
    event_type = Column(String(100))  # birthday, corporate, wedding, etc.
    event_date = Column(DateTime, nullable=True)
    location_city = Column(String(100))
    location_venue = Column(String(255))
    description = Column(Text)
    
    # Google Drive Integration
    folder_name = Column(String(255))
    google_drive_folder_id = Column(String(255))
    
    # Status Management
    status = Column(
        String(50), 
        default='draft',
        nullable=False
    )  # draft, active, completed, cancelled, archived
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    archived = Column(Boolean, default=False)
    
    # Relationships
    customer = relationship("Customer", back_populates="events")
    
    # ✅ NIEUWE RELATIE: Photos
    # Een event kan meerdere photos hebben (one-to-many)
    photos = relationship(
        "Photo",
        back_populates="event",
        cascade="all, delete-orphan",  # Als event wordt verwijderd, ook photos verwijderen
        lazy="select",  # Photos worden alleen geladen als je ze opvraagt
        order_by="Photo.display_order"  # Standaard sortering op display_order
    )
    
    def __repr__(self):
        return f"<Event {self.event_name} (Customer: {self.customer_id})>"
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        return {
            'event_id': str(self.event_id),
            'customer_id': str(self.customer_id),
            'event_name': self.event_name,
            'event_type': self.event_type,
            'event_date': self.event_date.isoformat() if self.event_date else None,
            'location_city': self.location_city,
            'location_venue': self.location_venue,
            'description': self.description,
            'folder_name': self.folder_name,
            'google_drive_folder_id': self.google_drive_folder_id,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'archived': self.archived
        }
    
    # ✅ NIEUWE PROPERTY: Photo count
    @property
    def photo_count(self):
        """Get total number of photos for this event"""
        return len(self.photos) if self.photos else 0
