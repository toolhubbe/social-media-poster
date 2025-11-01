"""
==========================================
SOCIAL MEDIA POSTER - POST SCHEMAS
==========================================
Bestandslocatie: backend/app/schemas/post.py

Pydantic schemas for social media posts with scheduling
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class PostBase(BaseModel):
    """Base post schema with common fields"""
    content: str = Field(..., min_length=1, description="Post content/caption")
    media_type: Optional[str] = Field(None, description="Media type (image, video, carousel, text)")
    hashtags: Optional[str] = Field(None, description="Hashtags (comma-separated or JSON)")
    mentions: Optional[str] = Field(None, description="Mentions (comma-separated or JSON)")

    @field_validator('content')
    @classmethod
    def validate_content(cls, v: str) -> str:
        """Validate post content"""
        if not v or not v.strip():
            raise ValueError('Post content cannot be empty')
        if len(v) > 5000:
            raise ValueError('Post content cannot exceed 5000 characters')
        return v.strip()

    @field_validator('media_type')
    @classmethod
    def validate_media_type(cls, v: Optional[str]) -> Optional[str]:
        """Validate media type"""
        if v is not None:
            valid_types = ['image', 'video', 'carousel', 'text']
            if v.lower() not in valid_types:
                raise ValueError(f'Media type must be one of: {", ".join(valid_types)}')
            return v.lower()
        return v


class PostCreate(PostBase):
    """Schema for creating a new post"""
    event_id: Optional[UUID] = Field(None, description="Optional: Link to event")
    social_media_account_id: Optional[UUID] = Field(None, description="Social media account to post to")
    media_urls: Optional[str] = Field(None, description="JSON array of media URLs")
    scheduled_for: Optional[datetime] = Field(None, description="When to post (leave empty for draft)")


class PostUpdate(BaseModel):
    """Schema for updating a post"""
    content: Optional[str] = Field(None, min_length=1)
    media_urls: Optional[str] = None
    media_type: Optional[str] = None
    hashtags: Optional[str] = None
    mentions: Optional[str] = None
    social_media_account_id: Optional[UUID] = None
    scheduled_for: Optional[datetime] = None
    status: Optional[str] = None

    @field_validator('content')
    @classmethod
    def validate_content(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and (not v or not v.strip()):
            raise ValueError('Post content cannot be empty')
        if v and len(v) > 5000:
            raise ValueError('Post content cannot exceed 5000 characters')
        return v.strip() if v else None

    @field_validator('status')
    @classmethod
    def validate_status(cls, v: Optional[str]) -> Optional[str]:
        """Validate post status"""
        if v is not None:
            valid_statuses = ['draft', 'scheduled', 'posting', 'posted', 'failed', 'canceled']
            if v not in valid_statuses:
                raise ValueError(f'Status must be one of: {", ".join(valid_statuses)}')
        return v


class PostResponse(PostBase):
    """Schema for post response"""
    post_id: UUID
    workspace_id: UUID
    created_by: Optional[UUID] = None
    event_id: Optional[UUID] = None
    social_media_account_id: Optional[UUID] = None
    media_urls: Optional[str] = None
    scheduled_for: Optional[datetime] = None
    posted_at: Optional[datetime] = None
    status: str
    platform_post_id: Optional[str] = None
    platform_post_url: Optional[str] = None
    
    # Analytics
    likes_count: int = 0
    comments_count: int = 0
    shares_count: int = 0
    reach: int = 0
    
    # Error handling
    error_message: Optional[str] = None
    retry_count: int = 0
    
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PostListResponse(BaseModel):
    """Schema for paginated post list"""
    posts: List[PostResponse]
    total: int
    page: int
    page_size: int


class PostSummary(BaseModel):
    """Lightweight post info for lists"""
    post_id: UUID
    content: str
    status: str
    scheduled_for: Optional[datetime] = None
    posted_at: Optional[datetime] = None
    social_media_account_id: Optional[UUID] = None

    class Config:
        from_attributes = True


class PostScheduleRequest(BaseModel):
    """Request to schedule a post"""
    scheduled_for: datetime = Field(..., description="When to post")

    @field_validator('scheduled_for')
    @classmethod
    def validate_scheduled_time(cls, v: datetime) -> datetime:
        """Validate scheduled time is in the future"""
        if v <= datetime.utcnow():
            raise ValueError('Scheduled time must be in the future')
        return v


class PostScheduleResponse(BaseModel):
    """Response after scheduling a post"""
    post_id: UUID
    scheduled_for: datetime
    status: str = "scheduled"
    message: str = "Post scheduled successfully"


class PostPublishRequest(BaseModel):
    """Request to publish a post immediately"""
    confirm: bool = Field(True, description="Confirmation to publish")


class PostPublishResponse(BaseModel):
    """Response after publishing a post"""
    post_id: UUID
    platform_post_id: Optional[str] = None
    platform_post_url: Optional[str] = None
    posted_at: datetime
    status: str = "posted"
    message: str = "Post published successfully"


class PostCancelRequest(BaseModel):
    """Request to cancel a scheduled post"""
    confirm: bool = Field(True, description="Confirmation to cancel")


class PostCancelResponse(BaseModel):
    """Response after canceling a post"""
    post_id: UUID
    status: str = "canceled"
    message: str = "Post canceled successfully"


class PostAnalyticsUpdate(BaseModel):
    """Update analytics for a post (from platform API)"""
    likes_count: Optional[int] = None
    comments_count: Optional[int] = None
    shares_count: Optional[int] = None
    reach: Optional[int] = None


class PostAnalyticsResponse(BaseModel):
    """Analytics data for a post"""
    post_id: UUID
    likes_count: int
    comments_count: int
    shares_count: int
    reach: int
    engagement_rate: float = 0.0
    last_updated: datetime

    @property
    def total_engagement(self) -> int:
        """Calculate total engagement"""
        return self.likes_count + self.comments_count + self.shares_count


class BulkPostCreate(BaseModel):
    """Create multiple posts at once"""
    posts: List[PostCreate] = Field(..., max_length=10, description="Max 10 posts at once")


class BulkPostResponse(BaseModel):
    """Response after bulk post creation"""
    success: int
    failed: int
    total: int
    posts: List[PostResponse]
    errors: Optional[List[dict]] = None
