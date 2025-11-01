"""
Models Package
File Location: backend/app/models/__init__.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/models/__init__.py

Centralized imports for all SQLAlchemy models.
Import order matters for foreign key relationships!
"""

# ============================================================================
# IMPORT ORDER IS CRITICAL!
# ============================================================================
# 1. Base models without dependencies
# 2. Models with foreign keys come AFTER their referenced tables

# Step 1: User models (no dependencies)
from .user import User, OAuthSession, AuditLog

# Step 2: Workspace (depends on User)
from .workspace import Workspace

# Step 3: Business models (depend on Workspace and User)
from .customer import Customer
from .event import Event
from .photo import Photo

# Step 4: Social Media & Posts (depend on Workspace and User)
from .social_media import SocialMediaAccount
from .post import Post

# Step 5: Config (if exists, usually no dependencies)
try:
    from .config import AppConfig
    HAS_CONFIG = True
except ImportError:
    HAS_CONFIG = False

# ============================================================================
# EXPORT ALL MODELS
# ============================================================================

if HAS_CONFIG:
    __all__ = [
        # User & Auth
        'User',
        'OAuthSession',
        'AuditLog',
        
        # Workspace
        'Workspace',
        
        # Business Models
        'Customer',
        'Event',
        'Photo',
        
        # Social Media & Posts
        'SocialMediaAccount',
        'Post',
        
        # Config
        'AppConfig',
    ]
else:
    __all__ = [
        # User & Auth
        'User',
        'OAuthSession',
        'AuditLog',
        
        # Workspace
        'Workspace',
        
        # Business Models
        'Customer',
        'Event',
        'Photo',
        
        # Social Media & Posts
        'SocialMediaAccount',
        'Post',
    ]
