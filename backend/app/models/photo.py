"""
==========================================
SOCIAL MEDIA POSTER - PHOTO MODEL
==========================================
Bestandslocatie: app/models/photo.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/models/photo.py

SQLAlchemy model voor photos tabel
Stores photo metadata and Google Drive links for event photos
"""

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from ..core.database import Base


class Photo(Base):
    """
    Photo model - represents a photo uploaded for an event
    Photos are stored in Google Drive, metadata stored in database
    """
    __tablename__ = "photos"
    
    # Primary Key
    photo_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Foreign Key to Event
    event_id = Column(
        UUID(as_uuid=True),
        ForeignKey('events.event_id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    
    # File Information
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)  # Original upload name
    file_size = Column(Integer)  # Size in bytes
    mime_type = Column(String(100))  # image/jpeg, image/png, etc.
    width = Column(Integer)  # Image width in pixels
    height = Column(Integer)  # Image height in pixels
    
    # Google Drive Integration
    google_drive_file_id = Column(String(255), unique=True)
    google_drive_url = Column(Text)  # Web view link
    thumbnail_url = Column(Text)  # Thumbnail link (optional)
    
    # Photo Metadata
    description = Column(Text)  # Optional description
    display_order = Column(Integer, default=0)  # Order for display in gallery
    is_featured = Column(Boolean, default=False)  # Featured/cover photo flag
    
    # Upload Information
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    uploaded_by = Column(String(100))  # User who uploaded (optional for now)
    
    # Status
    status = Column(String(50), default='active', nullable=False)  # active, deleted, processing
    archived = Column(Boolean, default=False)
    
    # Relationships
    event = relationship("Event", back_populates="photos")
    
    def __repr__(self):
        return f"<Photo {self.filename} (Event: {self.event_id})>"
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        return {
            'photo_id': str(self.photo_id),
            'event_id': str(self.event_id),
            'filename': self.filename,
            'original_filename': self.original_filename,
            'file_size': self.file_size,
            'mime_type': self.mime_type,
            'width': self.width,
            'height': self.height,
            'google_drive_file_id': self.google_drive_file_id,
            'google_drive_url': self.google_drive_url,
            'thumbnail_url': self.thumbnail_url,
            'description': self.description,
            'display_order': self.display_order,
            'is_featured': self.is_featured,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None,
            'uploaded_by': self.uploaded_by,
            'status': self.status,
            'archived': self.archived
        }
    
    @property
    def file_size_mb(self):
        """Get file size in megabytes"""
        if self.file_size:
            return round(self.file_size / (1024 * 1024), 2)
        return 0
    
    @property
    def is_image(self):
        """Check if file is an image"""
        if self.mime_type:
            return self.mime_type.startswith('image/')
        return False
