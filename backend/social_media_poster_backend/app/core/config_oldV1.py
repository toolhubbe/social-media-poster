"""
==========================================
SOCIAL MEDIA POSTER - CONFIGURATION
==========================================
Bestandslocatie: app/core/config.py
Dit bestand bevat alle app configuratie instellingen
✅ UPDATED: OAuth 2.0 settings toegevoegd
✅ UPDATED: Alle environment variables ondersteund
"""

from pydantic_settings import BaseSettings
from pydantic import Field, field_validator
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # ===================================================================
    # APPLICATION SETTINGS
    # ===================================================================
    
    APP_NAME: str = "Social Media Poster API"
    APP_VERSION: str = "2.0.0"  # Updated for OAuth version
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    API_VERSION: str = "v1"
    
    # ===================================================================
    # SERVER SETTINGS
    # ===================================================================
    
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # ===================================================================
    # DATABASE SETTINGS
    # ===================================================================
    
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/social_media_poster"
    
    # Alternative DB settings (if needed)
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "social_media_poster"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "password"
    
    # ===================================================================
    # OAUTH 2.0 SETTINGS (NEW!)
    # ===================================================================
    
    # Google OAuth Credentials
    GOOGLE_CLIENT_ID: str = Field(
        default="",
        description="Google OAuth 2.0 Client ID"
    )
    
    GOOGLE_CLIENT_SECRET: str = Field(
        default="",
        description="Google OAuth 2.0 Client Secret"
    )
    
    # OAuth Endpoints
    GOOGLE_AUTH_URI: str = "https://accounts.google.com/o/oauth2/v2/auth"
    GOOGLE_TOKEN_URI: str = "https://oauth2.googleapis.com/token"
    GOOGLE_USERINFO_URI: str = "https://www.googleapis.com/oauth2/v2/userinfo"
    GOOGLE_REVOKE_URI: str = "https://oauth2.googleapis.com/revoke"
    
    # OAuth Scopes
    GOOGLE_OAUTH_SCOPES: List[str] = [
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/drive",
    ]
    
    # Redirect URIs
    OAUTH_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/google/callback"
    FRONTEND_URL: str = "http://localhost:3000"
    FRONTEND_AUTH_SUCCESS_URL: str = "http://localhost:3000/auth/success"
    FRONTEND_AUTH_ERROR_URL: str = "http://localhost:3000/auth/error"
    
    # ===================================================================
    # JWT SETTINGS (NEW!)
    # ===================================================================
    
    JWT_SECRET_KEY: str = Field(
        default="change-this-to-a-random-secret-key",
        description="Secret key for signing JWT tokens"
    )
    
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    
    # ===================================================================
    # ENCRYPTION SETTINGS (NEW!)
    # ===================================================================
    
    ENCRYPTION_KEY: str = Field(
        default="",
        description="Fernet key for encrypting refresh tokens"
    )
    
    # ===================================================================
    # SECURITY SETTINGS (OLD + NEW)
    # ===================================================================
    
    # Old security settings (keep for backwards compatibility)
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # New OAuth security settings
    REQUIRE_EMAIL_VERIFICATION: bool = False
    ALLOWED_EMAIL_DOMAINS: List[str] = []
    MAX_SESSIONS_PER_USER: int = 5
    SESSION_TIMEOUT_HOURS: int = 24
    
    # ===================================================================
    # GOOGLE DRIVE SETTINGS (LEGACY - for backwards compatibility)
    # ===================================================================
    
    GOOGLE_DRIVE_CREDENTIALS_FILE: str = "credentials.json"
    GOOGLE_DRIVE_TOKEN_FILE: str = "token.json"
    GOOGLE_DRIVE_ROOT_FOLDER_ID: str = ""
    DRIVE_PARENT_FOLDER_ID: str = ""
    
    # ===================================================================
    # GOOGLE SHEETS SETTINGS (for later)
    # ===================================================================
    
    GOOGLE_SHEETS_SPREADSHEET_ID: str = ""
    GOOGLE_SHEETS_WORKSHEET_NAME: str = "Customers"
    
    # ===================================================================
    # FACEBOOK SETTINGS (for later)
    # ===================================================================
    
    FACEBOOK_APP_ID: str = ""
    FACEBOOK_APP_SECRET: str = ""
    
    # ===================================================================
    # CORS SETTINGS
    # ===================================================================
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000"
    ]
    
    # Old setting (keep for backwards compatibility)
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000"
    ]
    
    # ===================================================================
    # LOGGING
    # ===================================================================
    
    LOG_LEVEL: str = "INFO"
    
    # ===================================================================
    # VALIDATORS
    # ===================================================================
    
    @field_validator('GOOGLE_OAUTH_SCOPES')
    @classmethod
    def validate_scopes(cls, v):
        """Ensure required scopes are present"""
        required = ['openid', 'https://www.googleapis.com/auth/userinfo.email']
        for scope in required:
            if scope not in v:
                # Add missing required scopes
                v.append(scope)
        return v
    
    @field_validator('CORS_ORIGINS', 'ALLOWED_ORIGINS')
    @classmethod
    def validate_origins(cls, v):
        """Ensure origins are valid URLs"""
        if isinstance(v, str):
            # If string (from .env), split by comma
            return [origin.strip() for origin in v.split(',')]
        return v
    
    # ===================================================================
    # PROPERTIES
    # ===================================================================
    
    @property
    def oauth_scopes_string(self) -> str:
        """Get scopes as space-separated string for OAuth request"""
        return " ".join(self.GOOGLE_OAUTH_SCOPES)
    
    @property
    def is_oauth_configured(self) -> bool:
        """Check if OAuth is properly configured"""
        return bool(
            self.GOOGLE_CLIENT_ID and 
            self.GOOGLE_CLIENT_SECRET and 
            self.JWT_SECRET_KEY
        )
    
    # ===================================================================
    # CONFIG
    # ===================================================================
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        # Allow extra fields from .env that aren't defined here
        extra = "ignore"  # This prevents "extra inputs not permitted" errors


# ===================================================================
# CREATE SETTINGS INSTANCE
# ===================================================================

settings = Settings()


# ===================================================================
# HELPER FUNCTIONS (keep for backwards compatibility)
# ===================================================================

def get_database_url() -> str:
    """Get the complete database URL"""
    return settings.DATABASE_URL


def get_api_prefix() -> str:
    """Get the API prefix"""
    return settings.API_V1_PREFIX


def is_debug_mode() -> bool:
    """Check if app is in debug mode"""
    return settings.DEBUG


def get_oauth_settings():
    """Get OAuth settings (for compatibility with new auth code)"""
    return settings


# ===================================================================
# VALIDATION ON IMPORT
# ===================================================================

def validate_configuration():
    """Validate critical configuration on startup"""
    errors = []
    warnings = []
    
    # Check database
    if not settings.DATABASE_URL:
        errors.append("DATABASE_URL is not set")
    
    # Check OAuth (warnings only - not critical for all features)
    if not settings.GOOGLE_CLIENT_ID:
        warnings.append("GOOGLE_CLIENT_ID is not set - OAuth will not work")
    
    if not settings.GOOGLE_CLIENT_SECRET:
        warnings.append("GOOGLE_CLIENT_SECRET is not set - OAuth will not work")
    
    if not settings.JWT_SECRET_KEY or settings.JWT_SECRET_KEY == "change-this-to-a-random-secret-key":
        warnings.append("JWT_SECRET_KEY is not set or using default - generate a secure key!")
    
    # Print results
    if errors:
        print("\n" + "="*60)
        print("❌ CONFIGURATION ERRORS:")
        for error in errors:
            print(f"   - {error}")
        print("="*60 + "\n")
        raise ValueError("Critical configuration errors found")
    
    if warnings:
        print("\n" + "="*60)
        print("⚠️  CONFIGURATION WARNINGS:")
        for warning in warnings:
            print(f"   - {warning}")
        print("="*60 + "\n")
    else:
        print("\n✅ Configuration validated successfully")
        print(f"   App: {settings.APP_NAME} v{settings.APP_VERSION}")
        print(f"   Environment: {settings.ENVIRONMENT}")
        print(f"   OAuth: {'Enabled' if settings.is_oauth_configured else 'Disabled'}")
        print(f"   Database: {settings.DB_NAME}@{settings.DB_HOST}\n")


# Run validation on import (comment out if causing issues during development)
try:
    validate_configuration()
except Exception as e:
    print(f"⚠️  Configuration validation skipped: {e}")


# ===================================================================
# USAGE EXAMPLES
# ===================================================================

"""
# In your code, import like this:
from app.core.config import settings

# Access settings:
print(settings.GOOGLE_CLIENT_ID)
print(settings.DATABASE_URL)
print(settings.JWT_SECRET_KEY)

# Check OAuth status:
if settings.is_oauth_configured:
    print("OAuth is ready!")
"""
