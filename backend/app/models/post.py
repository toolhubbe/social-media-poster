"""
==========================================
SOCIAL MEDIA POSTER - POST MODEL
==========================================
Bestandslocatie: backend/app/models/post.py
Full Path: backend/app/models/post.py

SQLAlchemy model voor posts tabel
Manages social media posts with scheduling and multi-platform support
"""

from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timezone
from ..core.database import Base


class Post(Base):
    """
    Post model - represents a social media post
    
    Features:
    - Link to workspace (user's own content)
    - Link to event (optional)
    - Link to social media account (where to post)
    - Scheduling support
    - Multi-platform posting
    - Post status tracking
    """
    __tablename__ = "posts"
    
    # Primary Key
    post_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Workspace (data isolation)
    workspace_id = Column(
        UUID(as_uuid=True),
        ForeignKey('workspaces.workspace_id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    
    # Created by user
    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey('users.user_id'),
        nullable=True,
        index=True
    )
    
    # Social Media Account (where to post)
    social_media_account_id = Column(
        UUID(as_uuid=True),
        ForeignKey('social_media_accounts.account_id'),
        nullable=True,
        index=True
    )
    
    # Optional: Link to event
    event_id = Column(
        UUID(as_uuid=True),
        ForeignKey('events.event_id', ondelete='SET NULL'),
        nullable=True,
        index=True
    )
    
    # Post Content
    content = Column(Text, nullable=False)  # Post text/caption
    media_urls = Column(Text, nullable=True)  # JSON array of media URLs
    media_type = Column(String(50), nullable=True)  # 'image', 'video', 'carousel', 'text'
    
    # Hashtags & Mentions
    hashtags = Column(Text, nullable=True)  # Comma-separated or JSON
    mentions = Column(Text, nullable=True)  # Comma-separated or JSON
    
    # Scheduling
    scheduled_for = Column(DateTime(timezone=True), nullable=True)  # When to post
    posted_at = Column(DateTime(timezone=True), nullable=True)  # When actually posted
    
    # Status
    status = Column(
        String(50),
        nullable=False,
        default='draft',
        index=True
    )  # draft, scheduled, posting, posted, failed, canceled
    
    # Platform Info (after posting)
    platform_post_id = Column(String(255), nullable=True)  # ID on the platform
    platform_post_url = Column(Text, nullable=True)  # URL to view post
    
    # Analytics (future)
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    shares_count = Column(Integer, default=0)
    reach = Column(Integer, default=0)
    
    # Error Handling
    error_message = Column(Text, nullable=True)  # If posting failed
    retry_count = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )
    
    # Relationships
    workspace = relationship("Workspace", back_populates="posts")
    creator = relationship("User", foreign_keys=[created_by])
    social_media_account = relationship("SocialMediaAccount", back_populates="posts")
    event = relationship("Event", back_populates="posts")
    
    def __repr__(self):
        return f"<Post(id={self.post_id}, status={self.status}, workspace={self.workspace_id})>"
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            "post_id": str(self.post_id),
            "workspace_id": str(self.workspace_id),
            "created_by": str(self.created_by) if self.created_by else None,
            "social_media_account_id": str(self.social_media_account_id) if self.social_media_account_id else None,
            "event_id": str(self.event_id) if self.event_id else None,
            "content": self.content,
            "media_urls": self.media_urls,
            "media_type": self.media_type,
            "hashtags": self.hashtags,
            "mentions": self.mentions,
            "scheduled_for": self.scheduled_for.isoformat() if self.scheduled_for else None,
            "posted_at": self.posted_at.isoformat() if self.posted_at else None,
            "status": self.status,
            "platform_post_id": self.platform_post_id,
            "platform_post_url": self.platform_post_url,
            "likes_count": self.likes_count,
            "comments_count": self.comments_count,
            "shares_count": self.shares_count,
            "reach": self.reach,
            "error_message": self.error_message,
            "retry_count": self.retry_count,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
    
    @property
    def is_scheduled(self) -> bool:
        """Check if post is scheduled for future"""
        return self.status == 'scheduled' and self.scheduled_for is not None
    
    @property
    def is_posted(self) -> bool:
        """Check if post has been successfully posted"""
        return self.status == 'posted' and self.posted_at is not None
    
    @property
    def is_failed(self) -> bool:
        """Check if post failed"""
        return self.status == 'failed'
    
    @property
    def can_retry(self) -> bool:
        """Check if post can be retried (failed and retry count < 3)"""
        return self.is_failed and self.retry_count < 3
    
    @property
    def is_ready_to_post(self) -> bool:
        """Check if post is ready to be posted (scheduled time passed)"""
        if not self.is_scheduled:
            return False
        return datetime.now(timezone.utc) >= self.scheduled_for
    
    def mark_as_posted(self, platform_post_id: str = None, platform_post_url: str = None):
        """Mark post as successfully posted"""
        self.status = 'posted'
        self.posted_at = datetime.now(timezone.utc)
        if platform_post_id:
            self.platform_post_id = platform_post_id
        if platform_post_url:
            self.platform_post_url = platform_post_url
        self.error_message = None
        self.updated_at = datetime.now(timezone.utc)
    
    def mark_as_failed(self, error_message: str):
        """Mark post as failed"""
        self.status = 'failed'
        self.error_message = error_message
        self.retry_count += 1
        self.updated_at = datetime.now(timezone.utc)
    
    def schedule(self, scheduled_for: datetime):
        """Schedule post for future"""
        self.scheduled_for = scheduled_for
        self.status = 'scheduled'
        self.updated_at = datetime.now(timezone.utc)
