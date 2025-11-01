"""
==========================================
SOCIAL MEDIA POSTER - WORKSPACE MODEL
==========================================
Bestandslocatie: backend/app/models/workspace.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/models/workspace.py

SQLAlchemy model voor workspaces tabel
Personal workspaces voor multi-tenant architectuur
"""

from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timezone
from ..core.database import Base


class Workspace(Base):
    """
    Workspace model - represents a user's personal workspace
    
    Each user has their own workspace with:
    - Own Google Drive folder structure
    - Own customers, events, photos, posts
    - Complete data isolation from other users
    
    Google Drive Structure:
    - drive_folder_id: Main workspace folder
    - drive_customers_folder_id: Customers subfolder
    - drive_events_folder_id: Events subfolder
    
    Future: Can be extended to support team workspaces
    """
    __tablename__ = "workspaces"
    
    # Primary Key
    workspace_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Workspace Info
    name = Column(String(255), nullable=False)
    type = Column(String(20), nullable=False, default='personal')  # 'personal' only for MVP
    description = Column(Text, nullable=True)
    
    # Owner (for personal workspaces, this is the user)
    owner_user_id = Column(
        UUID(as_uuid=True),
        ForeignKey('users.user_id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    
    # ============================================================================
    # GOOGLE DRIVE INTEGRATION - ✨ UPDATED
    # ============================================================================
    
    # Main workspace folder in Google Drive
    drive_folder_id = Column(String(255), nullable=True, index=True)
    drive_folder_name = Column(String(255), nullable=True)
    
    # Subfolders in Google Drive (organized structure)
    drive_customers_folder_id = Column(String(255), nullable=True)  # ✨ NEW: Customers subfolder
    drive_events_folder_id = Column(String(255), nullable=True)     # ✨ NEW: Events subfolder
    
    # Setup status
    drive_setup_complete = Column(Boolean, default=False)
    
    # ============================================================================
    # TIMESTAMPS
    # ============================================================================
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )
    
    # ============================================================================
    # RELATIONSHIPS
    # ============================================================================
    
    # Owner relationship
    owner = relationship("User", foreign_keys=[owner_user_id], back_populates="owned_workspaces")
    
    # Data relationships (one workspace -> many resources)
    customers = relationship(
        "Customer",
        back_populates="workspace",
        cascade="all, delete-orphan",
        lazy="select"
    )
    
    events = relationship(
        "Event",
        back_populates="workspace",
        cascade="all, delete-orphan",
        lazy="select"
    )
    
    photos = relationship(
        "Photo",
        back_populates="workspace",
        cascade="all, delete-orphan",
        lazy="select"
    )
    
    posts = relationship(
        "Post",
        back_populates="workspace",
        cascade="all, delete-orphan",
        lazy="select"
    )
    
    # ============================================================================
    # METHODS
    # ============================================================================
    
    def __repr__(self):
        return f"<Workspace(id={self.workspace_id}, name={self.name}, type={self.type})>"
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            "workspace_id": str(self.workspace_id),
            "name": self.name,
            "type": self.type,
            "description": self.description,
            "owner_user_id": str(self.owner_user_id),
            "drive_folder_id": self.drive_folder_id,
            "drive_folder_name": self.drive_folder_name,
            "drive_customers_folder_id": self.drive_customers_folder_id,  # ✨ NEW
            "drive_events_folder_id": self.drive_events_folder_id,        # ✨ NEW
            "drive_setup_complete": self.drive_setup_complete,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
    
    # ============================================================================
    # PROPERTIES - Google Drive
    # ============================================================================
    
    @property
    def is_drive_setup(self):
        """Check if Google Drive is set up for this workspace"""
        return self.drive_setup_complete and self.drive_folder_id is not None
    
    @property
    def has_drive_structure(self):
        """Check if complete Drive folder structure exists"""
        return (
            self.drive_setup_complete and
            self.drive_folder_id is not None and
            self.drive_customers_folder_id is not None and
            self.drive_events_folder_id is not None
        )
    
    @property
    def google_drive_folder_id(self):
        """Alias for drive_folder_id (for consistency with API)"""
        return self.drive_folder_id
    
    @google_drive_folder_id.setter
    def google_drive_folder_id(self, value):
        """Setter for google_drive_folder_id alias"""
        self.drive_folder_id = value
    
    # ============================================================================
    # PROPERTIES - Workspace Type
    # ============================================================================
    
    @property
    def is_personal(self):
        """Check if this is a personal workspace"""
        return self.type == 'personal'
    
    @property
    def is_team(self):
        """Check if this is a team workspace (future feature)"""
        return self.type == 'team'
    
    # ============================================================================
    # PROPERTIES - Resource Counts (lazy loaded)
    # ============================================================================
    
    @property
    def customer_count(self):
        """Get total number of customers in this workspace"""
        return len(self.customers) if self.customers else 0
    
    @property
    def event_count(self):
        """Get total number of events in this workspace"""
        return len(self.events) if self.events else 0
    
    @property
    def photo_count(self):
        """Get total number of photos in this workspace"""
        return len(self.photos) if self.photos else 0
    
    @property
    def post_count(self):
        """Get total number of posts in this workspace"""
        return len(self.posts) if self.posts else 0
    
    @property
    def total_resource_count(self):
        """Get total number of all resources in workspace"""
        return (
            self.customer_count +
            self.event_count +
            self.photo_count +
            self.post_count
        )
    
    # ============================================================================
    # HELPER METHODS
    # ============================================================================
    
    def get_drive_folder_link(self):
        """Get Google Drive link for main workspace folder"""
        if self.drive_folder_id:
            return f"https://drive.google.com/drive/folders/{self.drive_folder_id}"
        return None
    
    def get_customers_folder_link(self):
        """Get Google Drive link for customers folder"""
        if self.drive_customers_folder_id:
            return f"https://drive.google.com/drive/folders/{self.drive_customers_folder_id}"
        return None
    
    def get_events_folder_link(self):
        """Get Google Drive link for events folder"""
        if self.drive_events_folder_id:
            return f"https://drive.google.com/drive/folders/{self.drive_events_folder_id}"
        return None
    
    def get_all_drive_links(self):
        """Get all Google Drive folder links"""
        return {
            "workspace": self.get_drive_folder_link(),
            "customers": self.get_customers_folder_link(),
            "events": self.get_events_folder_link()
        }
