"""
Authentication Dependencies
File Location: app/api/dependencies.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/api/dependencies.py

FastAPI dependencies for authentication and authorization
Used to protect routes and extract current user from JWT tokens
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from ..core.database import get_db
from ..core.jwt_utils import verify_token, extract_user_id_from_token
from ..models.user import User


# ============================================================================
# SECURITY SCHEME
# ============================================================================

# HTTP Bearer token security scheme (for Swagger UI)
security = HTTPBearer()


# ============================================================================
# TOKEN EXTRACTION
# ============================================================================

async def get_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> str:
    """
    Extract JWT token from Authorization header
    
    Expected header format:
    Authorization: Bearer <token>
    
    Args:
        credentials: HTTP Authorization credentials
        
    Returns:
        JWT token string
        
    Raises:
        HTTPException: If token is missing or invalid format
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No authorization credentials provided",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return token


# ============================================================================
# CURRENT USER DEPENDENCY
# ============================================================================

async def get_current_user(
    token: str = Depends(get_token),
    db: Session = Depends(get_db)
) -> User:
    """
    Get current authenticated user from JWT token
    
    This is the main dependency for protecting routes.
    Add this to any endpoint that requires authentication:
    
    @router.get("/protected")
    async def protected_route(current_user: User = Depends(get_current_user)):
        return {"user": current_user.email}
    
    Args:
        token: JWT access token from Authorization header
        db: Database session
        
    Returns:
        User object
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    # Verify and decode token
    try:
        payload = verify_token(token, token_type="access")
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Token verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Extract user_id from token
    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        user_id = UUID(user_id_str)
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID in token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Get user from database
    user = db.query(User).filter(User.user_id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Check subscription status (optional - can be removed if not using subscriptions yet)
    if user.subscription_status in ['expired', 'suspended']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Account subscription is {user.subscription_status}"
        )
    
    return user


# ============================================================================
# OPTIONAL AUTHENTICATION
# ============================================================================

async def get_current_user_optional(
    token: Optional[str] = Depends(get_token),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Get current user if authenticated, None otherwise
    
    Use this for endpoints that work both with and without authentication:
    
    @router.get("/public-or-private")
    async def flexible_route(current_user: Optional[User] = Depends(get_current_user_optional)):
        if current_user:
            return {"message": f"Hello {current_user.email}"}
        else:
            return {"message": "Hello anonymous user"}
    
    Args:
        token: JWT access token (optional)
        db: Database session
        
    Returns:
        User object if authenticated, None otherwise
    """
    if not token:
        return None
    
    try:
        return await get_current_user(token, db)
    except HTTPException:
        return None


# ============================================================================
# ADMIN-ONLY DEPENDENCY
# ============================================================================

async def get_current_admin_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Get current user and verify they are an admin
    
    Use this for admin-only endpoints:
    
    @router.get("/admin/users")
    async def list_all_users(admin: User = Depends(get_current_admin_user)):
        return {"message": "Admin access granted"}
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User object (if admin)
        
    Raises:
        HTTPException: If user is not an admin
    """
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    
    return current_user


# ============================================================================
# ACTIVE SUBSCRIPTION DEPENDENCY
# ============================================================================

async def require_active_subscription(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Verify user has an active subscription
    
    Use this for premium features:
    
    @router.post("/premium/feature")
    async def premium_feature(user: User = Depends(require_active_subscription)):
        return {"message": "Premium feature access"}
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User object (if subscription active)
        
    Raises:
        HTTPException: If subscription is not active
    """
    valid_statuses = ['trial', 'active']
    
    if current_user.subscription_status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f"Active subscription required. Current status: {current_user.subscription_status}"
        )
    
    # Check if subscription expired
    if current_user.subscription_expires_at:
        from datetime import datetime, timezone
        if datetime.now(timezone.utc) > current_user.subscription_expires_at:
            raise HTTPException(
                status_code=status.HTTP_402_PAYMENT_REQUIRED,
                detail="Subscription expired. Please renew."
            )
    
    return current_user


# ============================================================================
# EMAIL VERIFIED DEPENDENCY
# ============================================================================

async def require_email_verified(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Verify user's email is verified
    
    Use this for features that require email verification:
    
    @router.post("/post-to-facebook")
    async def post_to_facebook(user: User = Depends(require_email_verified)):
        return {"message": "Posting to Facebook..."}
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User object (if email verified)
        
    Raises:
        HTTPException: If email not verified
    """
    if not current_user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email verification required. Please verify your email."
        )
    
    return current_user


# ============================================================================
# COMBINED DEPENDENCIES
# ============================================================================

async def get_verified_active_user(
    current_user: User = Depends(require_email_verified)
) -> User:
    """
    Get user with verified email and active subscription
    
    Combines email verification and subscription checks
    """
    return await require_active_subscription(current_user)


# ============================================================================
# RATE LIMITING DEPENDENCY (Optional - for future implementation)
# ============================================================================

class RateLimiter:
    """
    Simple rate limiter dependency
    
    TODO: Implement with Redis for production
    Currently just a placeholder
    """
    
    def __init__(self, times: int, seconds: int):
        self.times = times
        self.seconds = seconds
    
    async def __call__(self, current_user: User = Depends(get_current_user)):
        # TODO: Implement rate limiting logic
        # For now, just pass through
        return current_user


# ============================================================================
# USAGE EXAMPLES
# ============================================================================

"""
EXAMPLE 1: Basic Authentication
--------------------------------
from fastapi import APIRouter, Depends
from ..api.dependencies import get_current_user

router = APIRouter()

@router.get("/customers")
async def list_customers(current_user: User = Depends(get_current_user)):
    # Only authenticated users can access this
    return {"customers": [...]}


EXAMPLE 2: Admin-Only Route
----------------------------
@router.delete("/users/{user_id}")
async def delete_user(
    user_id: str,
    admin: User = Depends(get_current_admin_user)
):
    # Only admins can delete users
    return {"message": "User deleted"}


EXAMPLE 3: Optional Authentication
-----------------------------------
@router.get("/public-stats")
async def get_stats(current_user: Optional[User] = Depends(get_current_user_optional)):
    if current_user:
        # Return detailed stats for authenticated users
        return {"stats": "detailed"}
    else:
        # Return basic stats for anonymous users
        return {"stats": "basic"}


EXAMPLE 4: Premium Feature
---------------------------
@router.post("/ai/generate-content")
async def generate_content(
    user: User = Depends(require_active_subscription)
):
    # Only users with active subscription can use AI features
    return {"content": "AI generated content"}


EXAMPLE 5: Multiple Requirements
---------------------------------
@router.post("/facebook/post")
async def post_to_facebook(
    user: User = Depends(get_verified_active_user)
):
    # Requires: authenticated + email verified + active subscription
    return {"message": "Posted to Facebook"}
"""


# ============================================================================
# DEPENDENCY INJECTION HELPERS
# ============================================================================

def get_user_from_token_sync(token: str, db: Session) -> Optional[User]:
    """
    Synchronous version of get_current_user for use outside FastAPI routes
    
    Use in background tasks or utility functions
    
    Args:
        token: JWT access token
        db: Database session
        
    Returns:
        User object or None
    """
    try:
        payload = verify_token(token, token_type="access")
        user_id_str = payload.get("sub")
        
        if not user_id_str:
            return None
        
        user_id = UUID(user_id_str)
        user = db.query(User).filter(User.user_id == user_id).first()
        
        if user and user.is_active:
            return user
            
    except Exception as e:
        print(f"Error getting user from token: {e}")
    
    return None


def verify_user_owns_resource(user: User, resource_user_id: UUID) -> bool:
    """
    Helper to verify a user owns a specific resource
    
    Use for authorization checks:
    
    if not verify_user_owns_resource(current_user, customer.user_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    Args:
        user: Current user
        resource_user_id: User ID that owns the resource
        
    Returns:
        True if user owns resource or is admin
    """
    return user.user_id == resource_user_id or user.is_superuser
