"""
User Pydantic Schemas for OAuth 2.0 Authentication
File Location: app/schemas/user.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/schemas/user.py

Pydantic models for request validation and response serialization
"""

from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime
from uuid import UUID


# ============================================================================
# BASE SCHEMAS
# ============================================================================

class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    full_name: Optional[str] = None
    given_name: Optional[str] = None
    family_name: Optional[str] = None
    picture_url: Optional[str] = None
    locale: Optional[str] = "en"


# ============================================================================
# REQUEST SCHEMAS (Input)
# ============================================================================

class UserUpdate(BaseModel):
    """Schema for updating user profile (user-editable fields only)"""
    full_name: Optional[str] = Field(None, max_length=255)
    given_name: Optional[str] = Field(None, max_length=100)
    family_name: Optional[str] = Field(None, max_length=100)
    locale: Optional[str] = Field(None, max_length=10)
    
    @field_validator('locale')
    @classmethod
    def validate_locale(cls, v):
        """Validate locale format (e.g., 'en', 'nl', 'fr')"""
        if v and len(v) > 10:
            raise ValueError('Locale must be 10 characters or less')
        return v


# ============================================================================
# RESPONSE SCHEMAS (Output)
# ============================================================================

class UserResponse(UserBase):
    """
    Full user response for authenticated user (their own profile)
    Includes sensitive info like subscription status
    """
    user_id: UUID
    email_verified: bool
    is_active: bool
    is_superuser: bool
    subscription_status: str
    subscription_expires_at: Optional[datetime] = None
    created_at: datetime
    last_login_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True  # Enables ORM mode


class UserPublicResponse(BaseModel):
    """
    Public user profile (visible to other users)
    Limited info for privacy
    """
    user_id: UUID
    full_name: Optional[str] = None
    picture_url: Optional[str] = None
    
    class Config:
        from_attributes = True


class UserListResponse(BaseModel):
    """Response for listing users (admin only)"""
    users: list[UserPublicResponse]
    total: int
    page: int
    page_size: int


# ============================================================================
# AUTHENTICATION SCHEMAS
# ============================================================================

class TokenResponse(BaseModel):
    """Response after successful OAuth login"""
    access_token: str  # JWT token
    token_type: str = "bearer"
    expires_in: int  # Seconds until expiration
    user: UserResponse


class TokenRefreshRequest(BaseModel):
    """Request to refresh an expired token"""
    refresh_token: Optional[str] = None  # Optional, can also use existing refresh token


class TokenRefreshResponse(BaseModel):
    """Response after token refresh"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class GoogleAuthCallbackData(BaseModel):
    """Data received from Google OAuth callback"""
    code: str
    state: Optional[str] = None
    scope: Optional[str] = None
    
    @field_validator('code')
    @classmethod
    def validate_code(cls, v):
        """Validate authorization code is not empty"""
        if not v or len(v) < 10:
            raise ValueError('Invalid authorization code')
        return v


class GoogleUserInfo(BaseModel):
    """User info returned from Google after OAuth"""
    sub: str  # Google's unique user ID (subject)
    email: EmailStr
    email_verified: bool
    name: Optional[str] = None
    given_name: Optional[str] = None
    family_name: Optional[str] = None
    picture: Optional[str] = None
    locale: Optional[str] = "en"


class GoogleTokenResponse(BaseModel):
    """Token response from Google OAuth"""
    access_token: str
    refresh_token: Optional[str] = None
    expires_in: int
    scope: str
    token_type: str
    id_token: Optional[str] = None


# ============================================================================
# JWT PAYLOAD SCHEMAS
# ============================================================================

class JWTPayload(BaseModel):
    """JWT token payload structure"""
    sub: str  # Subject (user_id)
    email: str
    exp: datetime  # Expiration
    iat: datetime  # Issued at
    token_type: str = "access"


class JWTRefreshPayload(BaseModel):
    """JWT refresh token payload"""
    sub: str
    exp: datetime
    iat: datetime
    token_type: str = "refresh"


# ============================================================================
# SESSION SCHEMAS
# ============================================================================

class SessionCreate(BaseModel):
    """Create a new OAuth session"""
    user_id: UUID
    access_token_hash: str
    refresh_token_hash: Optional[str] = None
    expires_at: datetime
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None


class SessionResponse(BaseModel):
    """OAuth session response"""
    session_id: UUID
    user_id: UUID
    created_at: datetime
    expires_at: datetime
    last_used_at: datetime
    is_revoked: bool
    ip_address: Optional[str] = None
    
    class Config:
        from_attributes = True


class SessionListResponse(BaseModel):
    """List of user's active sessions"""
    sessions: list[SessionResponse]
    total: int


# ============================================================================
# AUDIT LOG SCHEMAS
# ============================================================================

class AuditLogResponse(BaseModel):
    """Audit log entry response"""
    log_id: UUID
    user_id: Optional[UUID] = None
    action: str
    entity_type: Optional[str] = None
    entity_id: Optional[UUID] = None
    details: Optional[str] = None
    ip_address: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class AuditLogListResponse(BaseModel):
    """List of audit logs"""
    logs: list[AuditLogResponse]
    total: int
    page: int
    page_size: int


# ============================================================================
# DRIVE FOLDER SCHEMAS
# ============================================================================

class UserDriveFolderCreate(BaseModel):
    """Create user's main Drive folder"""
    parent_folder_id: str
    parent_folder_name: str = "Social_Media_Poster"


class UserDriveFolderResponse(BaseModel):
    """User's Drive folder response"""
    id: UUID
    user_id: UUID
    parent_folder_id: str
    parent_folder_name: str
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================================================
# ERROR SCHEMAS
# ============================================================================

class AuthErrorResponse(BaseModel):
    """Authentication error response"""
    error: str
    error_description: str
    error_uri: Optional[str] = None


class ValidationErrorResponse(BaseModel):
    """Validation error response"""
    detail: list[dict]


# ============================================================================
# SUBSCRIPTION SCHEMAS (For future billing implementation)
# ============================================================================

class SubscriptionStatus(BaseModel):
    """User's subscription status"""
    status: str  # trial, active, canceled, expired, suspended
    expires_at: Optional[datetime] = None
    trial_ends_at: Optional[datetime] = None
    plan_name: Optional[str] = None
    features: list[str] = []


class SubscriptionUpdateRequest(BaseModel):
    """Update subscription status (admin only)"""
    status: str = Field(..., pattern="^(trial|active|canceled|expired|suspended)$")
    expires_at: Optional[datetime] = None
    
    @field_validator('status')
    @classmethod
    def validate_status(cls, v):
        """Validate subscription status"""
        valid_statuses = ['trial', 'active', 'canceled', 'expired', 'suspended']
        if v not in valid_statuses:
            raise ValueError(f'Status must be one of: {", ".join(valid_statuses)}')
        return v


# ============================================================================
# UTILITY SCHEMAS
# ============================================================================

class HealthCheckResponse(BaseModel):
    """Health check response"""
    status: str
    database: str
    oauth_configured: bool
    version: str


class MessageResponse(BaseModel):
    """Generic message response"""
    message: str
    success: bool = True


# ============================================================================
# EXAMPLES (for OpenAPI/Swagger docs)
# ============================================================================

USER_RESPONSE_EXAMPLE = {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "email_verified": True,
    "full_name": "John Doe",
    "given_name": "John",
    "family_name": "Doe",
    "picture_url": "https://lh3.googleusercontent.com/a/default-user",
    "locale": "en",
    "is_active": True,
    "is_superuser": False,
    "subscription_status": "active",
    "subscription_expires_at": "2025-12-31T23:59:59Z",
    "created_at": "2025-01-01T00:00:00Z",
    "last_login_at": "2025-10-28T10:30:00Z"
}

TOKEN_RESPONSE_EXAMPLE = {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": USER_RESPONSE_EXAMPLE
}
