"""
==========================================
SOCIAL MEDIA POSTER - SOCIAL MEDIA ACCOUNT SCHEMAS
==========================================
Bestandslocatie: backend/app/schemas/social_media.py

Pydantic schemas for social media account OAuth connections
Supports Facebook, Instagram, LinkedIn, TikTok
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class SocialMediaAccountBase(BaseModel):
    """Base social media account schema"""
    platform: str = Field(..., description="Platform name (facebook, instagram, linkedin, tiktok)")
    platform_username: Optional[str] = Field(None, description="Username on platform")
    platform_name: Optional[str] = Field(None, description="Display name on platform")
    page_name: Optional[str] = Field(None, description="Page/Business account name")

    @field_validator('platform')
    @classmethod
    def validate_platform(cls, v: str) -> str:
        """Validate platform type"""
        valid_platforms = ['facebook', 'instagram', 'linkedin', 'tiktok']
        if v.lower() not in valid_platforms:
            raise ValueError(f'Platform must be one of: {", ".join(valid_platforms)}')
        return v.lower()


class SocialMediaAccountCreate(SocialMediaAccountBase):
    """Schema for creating a new social media account connection"""
    platform_user_id: str = Field(..., description="User ID on the platform")
    page_id: Optional[str] = Field(None, description="Page/Business account ID")
    page_category: Optional[str] = None
    access_token: str = Field(..., description="OAuth access token")
    refresh_token: Optional[str] = None
    token_expires_at: Optional[datetime] = None
    scopes: Optional[List[str]] = None


class SocialMediaAccountUpdate(BaseModel):
    """Schema for updating social media account"""
    platform_username: Optional[str] = None
    platform_name: Optional[str] = None
    page_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_default: Optional[bool] = None


class SocialMediaAccountResponse(SocialMediaAccountBase):
    """Schema for social media account response (WITHOUT tokens!)"""
    account_id: UUID
    user_id: UUID
    platform_user_id: Optional[str] = None
    page_id: Optional[str] = None
    page_category: Optional[str] = None
    token_expires_at: Optional[datetime] = None
    scopes: Optional[List[str]] = None
    is_active: bool = True
    is_default: bool = False
    last_used_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SocialMediaAccountListResponse(BaseModel):
    """Schema for list of social media accounts"""
    accounts: List[SocialMediaAccountResponse]
    total: int


class SocialMediaAccountSummary(BaseModel):
    """Lightweight account info for dropdowns"""
    account_id: UUID
    platform: str
    page_name: Optional[str] = None
    is_active: bool
    is_default: bool

    class Config:
        from_attributes = True


class TokenRefreshRequest(BaseModel):
    """Request to refresh an expired token"""
    account_id: UUID


class TokenRefreshResponse(BaseModel):
    """Response after token refresh"""
    account_id: UUID
    token_expires_at: datetime
    message: str = "Token refreshed successfully"


class FacebookPageInfo(BaseModel):
    """Facebook Page information from OAuth"""
    page_id: str
    page_name: str
    page_category: Optional[str] = None
    page_access_token: str
    page_token_expires_at: Optional[datetime] = None


class InstagramBusinessInfo(BaseModel):
    """Instagram Business account information"""
    instagram_business_id: str
    username: str
    name: Optional[str] = None
    profile_picture_url: Optional[str] = None


class PlatformConnectionRequest(BaseModel):
    """Generic platform OAuth connection request"""
    code: str = Field(..., description="OAuth authorization code")
    state: Optional[str] = None
    redirect_uri: str = Field(..., description="Redirect URI used in OAuth flow")


class PlatformConnectionResponse(BaseModel):
    """Response after connecting a platform"""
    account_id: UUID
    platform: str
    page_name: Optional[str] = None
    message: str = "Platform connected successfully"


class DisconnectRequest(BaseModel):
    """Request to disconnect a social media account"""
    confirm: bool = Field(True, description="Confirmation to disconnect")


class DisconnectResponse(BaseModel):
    """Response after disconnecting account"""
    account_id: UUID
    platform: str
    message: str = "Account disconnected successfully"
