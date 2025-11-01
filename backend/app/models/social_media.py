"""
==========================================
SOCIAL MEDIA POSTER - SOCIAL MEDIA ACCOUNT MODEL
==========================================
Bestandslocatie: backend/app/models/social_media.py
Full Path: backend/app/models/social_media.py

SQLAlchemy model voor social_media_accounts tabel
Manages OAuth connections to Facebook, Instagram, LinkedIn, etc.
Multiple users can connect to the same social media page with their own tokens.
"""

from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey, ARRAY
from sqlalchemy.dialects.postgresql import UUID, ARRAY as PG_ARRAY
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timezone
from ..core.database import Base


class SocialMediaAccount(Base):
    """
    SocialMediaAccount model - represents a user's connection to a social media platform
    
    Supports:
    - Facebook Pages
    - Instagram Business Accounts
    - LinkedIn Pages
    - TikTok Business Accounts (future)
    
    Key Features:
    - Multiple users can connect to same page (each with their own token)
    - Each user posts from their own workspace to shared pages
    - Perfect for small businesses/studios with multiple photographers
    """
    __tablename__ = "social_media_accounts"
    
    # Primary Key
    account_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # User who connected this account
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey('users.user_id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    
    # Platform Information
    platform = Column(String(50), nullable=False, index=True)  # 'facebook', 'instagram', 'linkedin', 'tiktok'
    platform_user_id = Column(String(255), nullable=True)  # User's ID on the platform
    platform_username = Column(String(255), nullable=True)  # Username on platform
    platform_name = Column(String(255), nullable=True)  # Display name on platform
    
    # For Pages/Business Accounts
    page_id = Column(String(255), nullable=True, index=True)  # Facebook Page ID, Instagram Business ID, etc.
    page_name = Column(String(255), nullable=True)  # Page name
    page_category = Column(String(100), nullable=True)  # Page category
    
    # OAuth Tokens
    # ⚠️ CRITICAL: These should be encrypted in production!
    # Use SQLAlchemy-Utils encrypted type or encrypt before storing
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text, nullable=True)
    token_expires_at = Column(DateTime(timezone=True), nullable=True)
    scopes = Column(PG_ARRAY(Text), nullable=True)  # Array of OAuth permissions
    
    # Status
    is_active = Column(Boolean, default=True, index=True)  # Account active/inactive
    is_default = Column(Boolean, default=False)  # Default account for this user
    last_used_at = Column(DateTime(timezone=True), nullable=True)  # Last time used for posting
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )
    
    # Relationships
    user = relationship("User", back_populates="social_media_accounts")
    
    posts = relationship(
        "Post",
        back_populates="social_media_account",
        cascade="all, delete-orphan",
        lazy="select"
    )
    
    def __repr__(self):
        return f"<SocialMediaAccount(platform={self.platform}, page={self.page_name}, user={self.user_id})>"
    
    def to_dict(self, include_tokens=False):
        """
        Convert model to dictionary
        
        Args:
            include_tokens: If True, include access tokens (use with caution!)
        """
        result = {
            "account_id": str(self.account_id),
            "user_id": str(self.user_id),
            "platform": self.platform,
            "platform_user_id": self.platform_user_id,
            "platform_username": self.platform_username,
            "platform_name": self.platform_name,
            "page_id": self.page_id,
            "page_name": self.page_name,
            "page_category": self.page_category,
            "token_expires_at": self.token_expires_at.isoformat() if self.token_expires_at else None,
            "scopes": self.scopes,
            "is_active": self.is_active,
            "is_default": self.is_default,
            "last_used_at": self.last_used_at.isoformat() if self.last_used_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
        
        # Only include tokens if explicitly requested (for internal use only!)
        if include_tokens:
            result["access_token"] = self.access_token
            result["refresh_token"] = self.refresh_token
        
        return result
    
    @property
    def is_token_expired(self) -> bool:
        """Check if the access token is expired"""
        if not self.token_expires_at:
            return False  # Some tokens don't expire (long-lived)
        return datetime.now(timezone.utc) >= self.token_expires_at
    
    @property
    def needs_token_refresh(self) -> bool:
        """Check if token needs to be refreshed (expires within 7 days)"""
        if not self.token_expires_at:
            return False
        from datetime import timedelta
        threshold = datetime.now(timezone.utc) + timedelta(days=7)
        return self.token_expires_at <= threshold
    
    @property
    def display_name(self) -> str:
        """Get a nice display name for this account"""
        if self.page_name:
            return f"{self.page_name} ({self.platform.title()})"
        elif self.platform_name:
            return f"{self.platform_name} ({self.platform.title()})"
        else:
            return f"{self.platform.title()} Account"
    
    def update_tokens(
        self,
        access_token: str,
        refresh_token: str = None,
        expires_in: int = None,
        scopes: list = None
    ):
        """
        Update OAuth tokens
        
        Args:
            access_token: New access token
            refresh_token: New refresh token (optional)
            expires_in: Token lifetime in seconds (optional)
            scopes: List of OAuth scopes (optional)
        """
        from datetime import timedelta
        
        self.access_token = access_token
        if refresh_token:
            self.refresh_token = refresh_token
        if expires_in:
            self.token_expires_at = datetime.now(timezone.utc) + timedelta(seconds=expires_in)
        if scopes:
            self.scopes = scopes
        self.updated_at = datetime.now(timezone.utc)
    
    def mark_as_used(self):
        """Update last_used_at timestamp"""
        self.last_used_at = datetime.now(timezone.utc)
        self.updated_at = datetime.now(timezone.utc)
    
    def deactivate(self):
        """Deactivate this account"""
        self.is_active = False
        self.updated_at = datetime.now(timezone.utc)
    
    def activate(self):
        """Activate this account"""
        self.is_active = True
        self.updated_at = datetime.now(timezone.utc)
