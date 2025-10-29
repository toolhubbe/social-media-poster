"""
OAuth 2.0 Configuration
File Location: app/core/oauth_config.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/core/oauth_config.py

Google OAuth 2.0 configuration and settings

✅ FIX APPLIED: Added extra='ignore' to allow other environment variables
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
from typing import List
import os


class OAuthSettings(BaseSettings):
    """
    OAuth 2.0 Configuration Settings
    
    Get these from Google Cloud Console:
    https://console.cloud.google.com/apis/credentials
    
    ✅ This class now ignores non-OAuth environment variables
    """
    
    # ===================================================================
    # GOOGLE OAUTH CREDENTIALS
    # ===================================================================
    
    GOOGLE_CLIENT_ID: str = Field(
        ...,
        description="Google OAuth 2.0 Client ID"
    )
    
    GOOGLE_CLIENT_SECRET: str = Field(
        ...,
        description="Google OAuth 2.0 Client Secret"
    )
    
    # ===================================================================
    # OAUTH ENDPOINTS
    # ===================================================================
    
    GOOGLE_AUTH_URI: str = Field(
        default="https://accounts.google.com/o/oauth2/v2/auth",
        description="Google OAuth 2.0 authorization endpoint"
    )
    
    GOOGLE_TOKEN_URI: str = Field(
        default="https://oauth2.googleapis.com/token",
        description="Google OAuth 2.0 token endpoint"
    )
    
    GOOGLE_USERINFO_URI: str = Field(
        default="https://www.googleapis.com/oauth2/v2/userinfo",
        description="Google OAuth 2.0 user info endpoint"
    )
    
    GOOGLE_REVOKE_URI: str = Field(
        default="https://oauth2.googleapis.com/revoke",
        description="Google OAuth 2.0 token revocation endpoint"
    )
    
    # ===================================================================
    # OAUTH SCOPES
    # ===================================================================
    
    GOOGLE_OAUTH_SCOPES: List[str] = Field(
        default=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive",  # Full Drive access
        ],
        description="Required OAuth 2.0 scopes"
    )
    
    # ===================================================================
    # REDIRECT URIs
    # ===================================================================
    
    OAUTH_REDIRECT_URI: str = Field(
        default="http://localhost:8000/api/v1/auth/google/callback",
        description="OAuth callback URL (must match Google Cloud Console)"
    )
    
    FRONTEND_URL: str = Field(
        default="http://localhost:3000",
        description="Frontend URL for redirects after auth"
    )
    
    FRONTEND_AUTH_SUCCESS_URL: str = Field(
        default="http://localhost:3000/auth/success",
        description="Frontend URL for successful auth redirects"
    )
    
    FRONTEND_AUTH_ERROR_URL: str = Field(
        default="http://localhost:3000/auth/error",
        description="Frontend URL for failed auth redirects"
    )
    
    # ===================================================================
    # JWT SETTINGS
    # ===================================================================
    
    JWT_SECRET_KEY: str = Field(
        ...,
        description="Secret key for signing JWT tokens (keep this secret!)"
    )
    
    JWT_ALGORITHM: str = Field(
        default="HS256",
        description="Algorithm for JWT signing"
    )
    
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(
        default=60,  # 1 hour
        description="JWT access token lifetime in minutes"
    )
    
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = Field(
        default=30,  # 30 days
        description="JWT refresh token lifetime in days"
    )
    
    # ===================================================================
    # SECURITY SETTINGS
    # ===================================================================
    
    ENCRYPTION_KEY: str = Field(
        default=None,
        description="Key for encrypting refresh tokens in database (Fernet key)"
    )
    
    REQUIRE_EMAIL_VERIFICATION: bool = Field(
        default=False,
        description="Require email verification before allowing access"
    )
    
    ALLOWED_EMAIL_DOMAINS: List[str] = Field(
        default=[],
        description="Restrict signups to specific email domains (empty = allow all)"
    )
    
    MAX_SESSIONS_PER_USER: int = Field(
        default=5,
        description="Maximum concurrent sessions per user"
    )
    
    SESSION_TIMEOUT_HOURS: int = Field(
        default=24,
        description="Hours before a session expires"
    )
    
    # ===================================================================
    # CORS SETTINGS
    # ===================================================================
    
    CORS_ORIGINS: List[str] = Field(
        default=[
            "http://localhost:3000",  # React dev server
            "http://localhost:8000",  # FastAPI dev server
        ],
        description="Allowed CORS origins"
    )
    
    # ===================================================================
    # VALIDATION
    # ===================================================================
    
    @field_validator('GOOGLE_OAUTH_SCOPES')
    @classmethod
    def validate_scopes(cls, v):
        """Ensure required scopes are present"""
        required = ['openid', 'https://www.googleapis.com/auth/userinfo.email']
        for scope in required:
            if scope not in v:
                raise ValueError(f'Required scope missing: {scope}')
        return v
    
    @field_validator('OAUTH_REDIRECT_URI')
    @classmethod
    def validate_redirect_uri(cls, v):
        """Validate redirect URI format"""
        if not v.startswith(('http://', 'https://')):
            raise ValueError('Redirect URI must start with http:// or https://')
        return v
    
    @field_validator('JWT_ALGORITHM')
    @classmethod
    def validate_algorithm(cls, v):
        """Validate JWT algorithm"""
        allowed = ['HS256', 'HS384', 'HS512', 'RS256']
        if v not in allowed:
            raise ValueError(f'JWT algorithm must be one of: {", ".join(allowed)}')
        return v
    
    # ===================================================================
    # PYDANTIC V2 CONFIGURATION
    # ===================================================================
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra='ignore',  # ✅ KEY FIX: Ignore non-OAuth environment variables
    )
    
    # ===================================================================
    # HELPERS
    # ===================================================================
    
    @property
    def oauth_scopes_string(self) -> str:
        """Get scopes as space-separated string for OAuth request"""
        return " ".join(self.GOOGLE_OAUTH_SCOPES)
    
    @property
    def google_auth_url(self) -> str:
        """Build Google OAuth authorization URL"""
        from urllib.parse import urlencode
        
        params = {
            "client_id": self.GOOGLE_CLIENT_ID,
            "redirect_uri": self.OAUTH_REDIRECT_URI,
            "response_type": "code",
            "scope": self.oauth_scopes_string,
            "access_type": "offline",  # Request refresh token
            "prompt": "consent",  # Force consent screen to get refresh token
            "state": self._generate_state()
        }
        
        return f"{self.GOOGLE_AUTH_URI}?{urlencode(params)}"
    
    def _generate_state(self) -> str:
        """Generate random state parameter for CSRF protection"""
        import secrets
        return secrets.token_urlsafe(32)


# ===================================================================
# SINGLETON INSTANCE
# ===================================================================

# Create a singleton instance
oauth_settings = OAuthSettings()


# ===================================================================
# HELPER FUNCTIONS
# ===================================================================

def get_oauth_settings() -> OAuthSettings:
    """Get OAuth settings instance"""
    return oauth_settings


def generate_jwt_secret_key() -> str:
    """
    Generate a secure random JWT secret key
    Run this once and put the result in your .env file
    """
    import secrets
    return secrets.token_urlsafe(64)


def generate_encryption_key() -> str:
    """
    Generate a Fernet encryption key for encrypting refresh tokens
    Run this once and put the result in your .env file
    """
    from cryptography.fernet import Fernet
    return Fernet.generate_key().decode()


# ===================================================================
# VALIDATION ON IMPORT
# ===================================================================

def validate_oauth_config():
    """Validate OAuth configuration on startup"""
    try:
        settings = get_oauth_settings()
        
        # Check required settings
        if not settings.GOOGLE_CLIENT_ID:
            raise ValueError("GOOGLE_CLIENT_ID is not set in environment")
        
        if not settings.GOOGLE_CLIENT_SECRET:
            raise ValueError("GOOGLE_CLIENT_SECRET is not set in environment")
        
        if not settings.JWT_SECRET_KEY:
            raise ValueError("JWT_SECRET_KEY is not set in environment")
        
        # Validate redirect URI matches frontend
        if not settings.OAUTH_REDIRECT_URI.startswith(('http://localhost', 'https://')):
            print("⚠️  Warning: OAUTH_REDIRECT_URI should use localhost or HTTPS in production")
        
        print("✅ OAuth configuration validated successfully")
        print(f"   Client ID: {settings.GOOGLE_CLIENT_ID[:20]}...")
        print(f"   Redirect URI: {settings.OAUTH_REDIRECT_URI}")
        print(f"   Scopes: {len(settings.GOOGLE_OAUTH_SCOPES)} configured")
        
        return True
        
    except Exception as e:
        print(f"❌ OAuth configuration validation failed: {e}")
        print("\n💡 Quick setup:")
        print("   1. Copy .env.example to .env")
        print("   2. Get credentials from Google Cloud Console")
        print("   3. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET_KEY")
        return False


# ===================================================================
# USAGE EXAMPLES
# ===================================================================

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🔧 OAUTH CONFIGURATION UTILITY")
    print("="*60 + "\n")
    
    print("1. Generate JWT Secret Key:")
    print(f"   JWT_SECRET_KEY={generate_jwt_secret_key()}\n")
    
    print("2. Generate Encryption Key:")
    print(f"   ENCRYPTION_KEY={generate_encryption_key()}\n")
    
    print("3. Validate Current Configuration:")
    validate_oauth_config()
    
    print("\n" + "="*60)
    print("📋 Add these to your .env file!")
    print("="*60 + "\n")
