"""
OAuth 2.0 Authentication Endpoints
File Location: app/api/auth.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/api/auth.py

Google OAuth 2.0 authentication flow endpoints:
- Login (redirect to Google)
- Callback (handle Google response)
- Refresh (get new access token)
- Logout (revoke tokens)
- User info
"""

from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from typing import Optional
import httpx
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode

from ..core.database import get_db
from ..core.oauth_config import oauth_settings
from ..core.jwt_utils import (
    create_token_pair,
    verify_token,
    encrypt_refresh_token,
    hash_token
)
from ..models.user import User, OAuthSession, AuditLog
from ..schemas.user import (
    TokenResponse,
    TokenRefreshResponse,
    UserResponse,
    MessageResponse
)
from .dependencies import get_current_user


router = APIRouter(prefix="/auth", tags=["authentication"])


# ============================================================================
# OAUTH FLOW - Step 1: Initiate Login
# ============================================================================

@router.get("/google/login")
async def google_login(request: Request):
    """
    Initiate Google OAuth 2.0 login flow
    
    Redirects user to Google's consent screen
    
    Flow:
    1. User clicks "Login with Google" button
    2. Frontend redirects to this endpoint
    3. This endpoint redirects to Google
    4. User logs in at Google and grants permissions
    5. Google redirects back to /auth/google/callback
    """
    # Build authorization URL
    params = {
        "client_id": oauth_settings.GOOGLE_CLIENT_ID,
        "redirect_uri": oauth_settings.OAUTH_REDIRECT_URI,
        "response_type": "code",
        "scope": oauth_settings.oauth_scopes_string,
        "access_type": "offline",  # Request refresh token
        "prompt": "consent",  # Force consent screen to always get refresh token
        "state": oauth_settings._generate_state()  # CSRF protection
    }
    
    auth_url = f"{oauth_settings.GOOGLE_AUTH_URI}?{urlencode(params)}"
    
    print(f"\n🔐 Initiating OAuth login...")
    print(f"   Redirect URI: {oauth_settings.OAUTH_REDIRECT_URI}")
    print(f"   Scopes: {oauth_settings.oauth_scopes_string}")
    
    return RedirectResponse(url=auth_url)


# ============================================================================
# OAUTH FLOW - Step 2: Handle Callback
# ============================================================================

@router.get("/google/callback")
async def google_callback(
    code: str,
    state: Optional[str] = None,
    error: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """
    Handle Google OAuth 2.0 callback
    
    This endpoint receives the authorization code from Google
    and exchanges it for access/refresh tokens
    
    Flow:
    1. Google redirects here with authorization code
    2. Exchange code for tokens
    3. Get user info from Google
    4. Create or update user in database
    5. Create JWT tokens
    6. Redirect to frontend with tokens
    """
    
    # Check for errors from Google
    if error:
        print(f"❌ OAuth error from Google: {error}")
        error_url = f"{oauth_settings.FRONTEND_AUTH_ERROR_URL}?error={error}"
        return RedirectResponse(url=error_url)
    
    try:
        print(f"\n✅ OAuth callback received")
        print(f"   Authorization code: {code[:20]}...")
        
        # ================================================================
        # STEP 1: Exchange authorization code for tokens
        # ================================================================
        
        async with httpx.AsyncClient() as client:
            token_response = await client.post(
                oauth_settings.GOOGLE_TOKEN_URI,
                data={
                    "code": code,
                    "client_id": oauth_settings.GOOGLE_CLIENT_ID,
                    "client_secret": oauth_settings.GOOGLE_CLIENT_SECRET,
                    "redirect_uri": oauth_settings.OAUTH_REDIRECT_URI,
                    "grant_type": "authorization_code"
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )
            
            if token_response.status_code != 200:
                print(f"❌ Token exchange failed: {token_response.text}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to exchange authorization code for tokens"
                )
            
            token_data = token_response.json()
            google_access_token = token_data.get("access_token")
            google_refresh_token = token_data.get("refresh_token")  # May be None on subsequent logins
            token_expires_in = token_data.get("expires_in", 3600)
            
            print(f"✅ Tokens received from Google")
            print(f"   Access token: {google_access_token[:20]}...")
            print(f"   Refresh token: {'Yes' if google_refresh_token else 'No (using existing)'}")
            
            # ================================================================
            # STEP 2: Get user info from Google
            # ================================================================
            
            userinfo_response = await client.get(
                oauth_settings.GOOGLE_USERINFO_URI,
                headers={"Authorization": f"Bearer {google_access_token}"}
            )
            
            if userinfo_response.status_code != 200:
                print(f"❌ Failed to get user info: {userinfo_response.text}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to get user information from Google"
                )
            
            user_info = userinfo_response.json()
            
            google_user_id = user_info.get("sub")  # Google's unique user ID
            email = user_info.get("email")
            email_verified = user_info.get("email_verified", False)
            full_name = user_info.get("name")
            given_name = user_info.get("given_name")
            family_name = user_info.get("family_name")
            picture_url = user_info.get("picture")
            locale = user_info.get("locale", "en")
            
            print(f"✅ User info received:")
            print(f"   Email: {email}")
            print(f"   Name: {full_name}")
            print(f"   Google ID: {google_user_id}")
        
        # ================================================================
        # STEP 3: Create or update user in database
        # ================================================================
        
        # Check if user exists
        user = db.query(User).filter(User.google_user_id == google_user_id).first()
        
        if user:
            # Update existing user
            print(f"✅ User exists, updating...")
            
            user.email = email
            user.email_verified = email_verified
            user.full_name = full_name
            user.given_name = given_name
            user.family_name = family_name
            user.picture_url = picture_url
            user.locale = locale
            
            # Update tokens
            user.update_tokens(
                access_token=google_access_token,
                refresh_token=google_refresh_token if google_refresh_token else user.google_refresh_token,
                expires_in=token_expires_in
            )
            user.update_last_login()
            
        else:
            # Create new user
            print(f"✅ New user, creating account...")
            
            user = User(
                google_user_id=google_user_id,
                email=email,
                email_verified=email_verified,
                full_name=full_name,
                given_name=given_name,
                family_name=family_name,
                picture_url=picture_url,
                locale=locale,
                is_active=True,
                subscription_status='trial'
            )
            
            # Set tokens
            user.update_tokens(
                access_token=google_access_token,
                refresh_token=google_refresh_token,
                expires_in=token_expires_in
            )
            user.update_last_login()
            
            db.add(user)
        
        db.commit()
        db.refresh(user)
        
        print(f"✅ User saved to database: {user.user_id}")
        
        # ================================================================
        # STEP 4: Create JWT tokens for our app
        # ================================================================
        
        jwt_tokens = create_token_pair(str(user.user_id), user.email)
        
        # Create session record
        session = OAuthSession(
            user_id=user.user_id,
            access_token_hash=hash_token(jwt_tokens['access_token']),
            refresh_token_hash=hash_token(jwt_tokens['refresh_token']) if jwt_tokens.get('refresh_token') else None,
            expires_at=datetime.now(timezone.utc) + timedelta(hours=oauth_settings.SESSION_TIMEOUT_HOURS),
            ip_address=request.client.host if request and request.client else None,
            user_agent=request.headers.get("user-agent") if request else None
        )
        db.add(session)
        
        # Log the login
        AuditLog.log(
            db=db,
            user_id=user.user_id,
            action="user_login",
            entity_type="user",
            entity_id=user.user_id,
            details={"method": "google_oauth", "email": user.email},
            ip_address=request.client.host if request and request.client else None,
            user_agent=request.headers.get("user-agent") if request else None
        )
        
        db.commit()
        
        print(f"✅ JWT tokens created")
        print(f"   Session ID: {session.session_id}")
        
        # ================================================================
        # STEP 5: Redirect to frontend with tokens
        # ================================================================
        
        # Encode tokens for URL
        redirect_params = {
            "access_token": jwt_tokens['access_token'],
            "token_type": jwt_tokens['token_type'],
            "expires_in": jwt_tokens['expires_in']
        }
        
        if jwt_tokens.get('refresh_token'):
            redirect_params['refresh_token'] = jwt_tokens['refresh_token']
        
        success_url = f"{oauth_settings.FRONTEND_AUTH_SUCCESS_URL}?{urlencode(redirect_params)}"
        
        print(f"✅ Redirecting to frontend...")
        return RedirectResponse(url=success_url)
        
    except Exception as e:
        print(f"❌ OAuth callback error: {e}")
        import traceback
        traceback.print_exc()
        
        error_url = f"{oauth_settings.FRONTEND_AUTH_ERROR_URL}?error=authentication_failed"
        return RedirectResponse(url=error_url)


# ============================================================================
# TOKEN REFRESH
# ============================================================================

@router.post("/refresh", response_model=TokenRefreshResponse)
async def refresh_access_token(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Refresh an expired access token using Google's refresh token
    
    Flow:
    1. Client detects access token is expired
    2. Client calls this endpoint with current (expired) JWT
    3. We use Google's refresh token to get new Google access token
    4. We create new JWT access token
    5. Client uses new JWT for future requests
    """
    try:
        print(f"\n🔄 Refreshing token for user: {current_user.email}")
        
        # Check if user has a refresh token
        if not current_user.google_refresh_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No refresh token available. Please login again."
            )
        
        # Use Google's refresh token to get new access token
        async with httpx.AsyncClient() as client:
            response = await client.post(
                oauth_settings.GOOGLE_TOKEN_URI,
                data={
                    "client_id": oauth_settings.GOOGLE_CLIENT_ID,
                    "client_secret": oauth_settings.GOOGLE_CLIENT_SECRET,
                    "refresh_token": current_user.google_refresh_token,
                    "grant_type": "refresh_token"
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )
            
            if response.status_code != 200:
                print(f"❌ Token refresh failed: {response.text}")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Failed to refresh token. Please login again."
                )
            
            token_data = response.json()
            new_google_access_token = token_data.get("access_token")
            expires_in = token_data.get("expires_in", 3600)
            
            # Update user's Google access token
            current_user.update_tokens(
                access_token=new_google_access_token,
                expires_in=expires_in
            )
            db.commit()
            
            print(f"✅ Google access token refreshed")
        
        # Create new JWT access token
        jwt_tokens = create_token_pair(str(current_user.user_id), current_user.email)
        
        print(f"✅ New JWT tokens created")
        
        return TokenRefreshResponse(
            access_token=jwt_tokens['access_token'],
            token_type=jwt_tokens['token_type'],
            expires_in=jwt_tokens['expires_in']
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Token refresh error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to refresh token"
        )


# ============================================================================
# LOGOUT
# ============================================================================

@router.post("/logout", response_model=MessageResponse)
async def logout(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Logout user and revoke tokens
    
    Steps:
    1. Revoke OAuth sessions in our database
    2. Optionally revoke Google tokens (commented out - can enable if needed)
    3. Client should delete stored JWT tokens
    """
    try:
        print(f"\n👋 Logging out user: {current_user.email}")
        
        # Revoke all active sessions for this user
        active_sessions = db.query(OAuthSession).filter(
            OAuthSession.user_id == current_user.user_id,
            OAuthSession.is_revoked == False
        ).all()
        
        for session in active_sessions:
            session.revoke(reason="user_logout")
        
        # Log the logout
        AuditLog.log(
            db=db,
            user_id=current_user.user_id,
            action="user_logout",
            entity_type="user",
            entity_id=current_user.user_id
        )
        
        db.commit()
        
        print(f"✅ Revoked {len(active_sessions)} active sessions")
        
        # Optional: Revoke Google tokens
        # Uncomment if you want to fully revoke Google access
        """
        if current_user.google_access_token:
            async with httpx.AsyncClient() as client:
                await client.post(
                    oauth_settings.GOOGLE_REVOKE_URI,
                    params={"token": current_user.google_access_token}
                )
        """
        
        return MessageResponse(
            message="Logged out successfully",
            success=True
        )
        
    except Exception as e:
        print(f"❌ Logout error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to logout"
        )


# ============================================================================
# USER INFO
# ============================================================================

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Get current authenticated user's information
    
    This endpoint returns the user's profile data
    Requires valid JWT token in Authorization header
    """
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_current_user_info(
    user_update: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update current user's profile information
    
    Only allows updating certain fields:
    - full_name
    - given_name
    - family_name
    - locale
    """
    allowed_fields = {'full_name', 'given_name', 'family_name', 'locale'}
    
    for field, value in user_update.items():
        if field in allowed_fields:
            setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user


# ============================================================================
# HEALTH CHECK
# ============================================================================

@router.get("/health")
async def auth_health_check():
    """Check if OAuth configuration is valid"""
    try:
        has_client_id = bool(oauth_settings.GOOGLE_CLIENT_ID)
        has_client_secret = bool(oauth_settings.GOOGLE_CLIENT_SECRET)
        has_jwt_secret = bool(oauth_settings.JWT_SECRET_KEY)
        
        return {
            "status": "healthy" if (has_client_id and has_client_secret and has_jwt_secret) else "unhealthy",
            "oauth_configured": has_client_id and has_client_secret,
            "jwt_configured": has_jwt_secret,
            "redirect_uri": oauth_settings.OAUTH_REDIRECT_URI
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }
