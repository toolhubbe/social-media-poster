"""
User Model for OAuth 2.0 Authentication
File Location: app/models/user.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/models/user.py

Multi-tenant SaaS user model with Google OAuth 2.0 integration
Each user has their own Google Drive and can manage their own customers/events/photos
"""

from sqlalchemy import Column, String, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid

from ..core.database import Base


class User(Base):
    """
    User model for OAuth 2.0 authenticated users
    
    Each user:
    - Authenticates via Google OAuth 2.0
    - Has their own Google Drive storage
    - Can create customers, events, photos, posts
    - Has their own subscription/billing
    """
    
    __tablename__ = "users"
    
    # Primary Key
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Google OAuth Info
    google_user_id = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    email_verified = Column(Boolean, default=False)
    
    # User Profile
    full_name = Column(String(255))
    given_name = Column(String(100))
    family_name = Column(String(100))
    picture_url = Column(Text)  # Google profile picture
    locale = Column(String(10), default='en')  # Language preference
    
    # OAuth Tokens
    # ⚠️ CRITICAL: These should be encrypted in production!
    google_refresh_token = Column(Text)  # Long-lived refresh token
    google_access_token = Column(Text)   # Short-lived access token
    token_expires_at = Column(DateTime(timezone=True))  # When access token expires
    
    # Account Status
    is_active = Column(Boolean, default=True, index=True)
    is_superuser = Column(Boolean, default=False)
    subscription_status = Column(
        String(50), 
        default='trial',
        index=True
    )  # trial, active, canceled, expired, suspended
    subscription_expires_at = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )
    last_login_at = Column(DateTime(timezone=True))
    
    # Relationships (define these after creating the relationship columns in other models)
    # customers = relationship("Customer", back_populates="user", cascade="all, delete-orphan")
    # events = relationship("Event", back_populates="user", cascade="all, delete-orphan")
    # photos = relationship("Photo", back_populates="user", cascade="all, delete-orphan")
    # posts = relationship("Post", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User {self.email} (Google ID: {self.google_user_id})>"
    
    @property
    def is_token_expired(self) -> bool:
        """Check if the access token is expired"""
        if not self.token_expires_at:
            return True
        return datetime.now(timezone.utc) >= self.token_expires_at
    
    @property
    def needs_token_refresh(self) -> bool:
        """Check if token needs to be refreshed (expires within 5 minutes)"""
        if not self.token_expires_at:
            return True
        from datetime import timedelta
        threshold = datetime.now(timezone.utc) + timedelta(minutes=5)
        return self.token_expires_at <= threshold
    
    def update_tokens(
        self,
        access_token: str,
        refresh_token: str = None,
        expires_in: int = 3600
    ):
        """
        Update OAuth tokens
        
        Args:
            access_token: New access token from Google
            refresh_token: New refresh token (optional, usually only provided on first auth)
            expires_in: Token lifetime in seconds (default 3600 = 1 hour)
        """
        from datetime import timedelta
        
        self.google_access_token = access_token
        if refresh_token:
            self.google_refresh_token = refresh_token
        self.token_expires_at = datetime.now(timezone.utc) + timedelta(seconds=expires_in)
        self.updated_at = datetime.now(timezone.utc)
    
    def update_last_login(self):
        """Update last login timestamp"""
        self.last_login_at = datetime.now(timezone.utc)
        self.updated_at = datetime.now(timezone.utc)
    
    def to_dict(self) -> dict:
        """Convert user to dictionary (safe for API responses - no tokens!)"""
        return {
            "user_id": str(self.user_id),
            "email": self.email,
            "email_verified": self.email_verified,
            "full_name": self.full_name,
            "given_name": self.given_name,
            "family_name": self.family_name,
            "picture_url": self.picture_url,
            "locale": self.locale,
            "is_active": self.is_active,
            "is_superuser": self.is_superuser,
            "subscription_status": self.subscription_status,
            "subscription_expires_at": self.subscription_expires_at.isoformat() if self.subscription_expires_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "last_login_at": self.last_login_at.isoformat() if self.last_login_at else None
        }


class UserDriveFolder(Base):
    """
    Tracks each user's main Google Drive folder
    
    Each user gets their own "Social_Media_Poster" folder in their Drive
    where all customers/events/photos are organized
    """
    
    __tablename__ = "user_drive_folders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), unique=True, nullable=False, index=True)
    
    # Google Drive Info
    parent_folder_id = Column(String(255), nullable=False)  # Folder ID in user's Drive
    parent_folder_name = Column(String(255), default='Social_Media_Poster')
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )
    
    def __repr__(self):
        return f"<UserDriveFolder user_id={self.user_id} folder_id={self.parent_folder_id}>"


class OAuthSession(Base):
    """
    Tracks active OAuth sessions for security
    
    Optional but recommended for production:
    - Track active sessions
    - Revoke sessions on logout
    - Security auditing
    - Detect suspicious activity
    """
    
    __tablename__ = "oauth_sessions"
    
    session_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    
    # Session Info (store hashes, not actual tokens!)
    access_token_hash = Column(String(255), unique=True, nullable=False, index=True)
    refresh_token_hash = Column(String(255))
    
    # Security
    ip_address = Column(String(45))  # Supports IPv6
    user_agent = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    expires_at = Column(DateTime(timezone=True), nullable=False, index=True)
    last_used_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    
    # Status
    is_revoked = Column(Boolean, default=False)
    revoked_at = Column(DateTime(timezone=True))
    revoked_reason = Column(String(255))
    
    def revoke(self, reason: str = None):
        """Revoke this session"""
        self.is_revoked = True
        self.revoked_at = datetime.now(timezone.utc)
        self.revoked_reason = reason
    
    def __repr__(self):
        return f"<OAuthSession user_id={self.user_id} expires_at={self.expires_at}>"


class AuditLog(Base):
    """
    Audit log for security and debugging
    
    Tracks important user actions:
    - Customer/Event/Photo creation/deletion
    - OAuth logins/logouts
    - Permission changes
    - Suspicious activity
    """
    
    __tablename__ = "audit_logs"
    
    log_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), index=True)  # Nullable for system actions
    
    # Action Info
    action = Column(String(100), nullable=False, index=True)  # e.g., 'customer_created'
    entity_type = Column(String(50), index=True)  # e.g., 'customer', 'event'
    entity_id = Column(UUID(as_uuid=True))
    
    # Details (JSON for flexible logging)
    details = Column(Text)  # Store as JSON string
    
    # Request Info
    ip_address = Column(String(45))
    user_agent = Column(Text)
    
    # Timestamp
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    
    @classmethod
    def log(cls, db, user_id, action, entity_type=None, entity_id=None, details=None, ip_address=None, user_agent=None):
        """Helper method to create audit log entry"""
        import json
        
        log = cls(
            user_id=user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            details=json.dumps(details) if details else None,
            ip_address=ip_address,
            user_agent=user_agent
        )
        db.add(log)
        db.commit()
        return log
    
    def __repr__(self):
        return f"<AuditLog action={self.action} user_id={self.user_id} at={self.created_at}>"
