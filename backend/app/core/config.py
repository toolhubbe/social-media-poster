"""
==========================================
SOCIAL MEDIA POSTER - CONFIGURATION
==========================================
Bestandslocatie: app/core/config.py
Dit bestand bevat alle app configuratie instellingen
✅ UPDATED: OAuth 2.0 settings toegevoegd
✅ FIXED: List fields now handle empty .env values
"""

from pydantic_settings import BaseSettings
from pydantic import Field, field_validator
from typing import List, Optional


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
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    
    # OAuth Endpoints
    GOOGLE_AUTH_URI: str = "https://accounts.google.com/o/oauth2/v2/auth"
    GOOGLE_TOKEN_URI: str = "https://oauth2.googleapis.com/token"
    GOOGLE_USERINFO_URI: str = "https://www.googleapis.com/oauth2/v2/userinfo"
    GOOGLE_REVOKE_URI: str = "https://oauth2.googleapis.com/revoke"
    
    # OAuth Scopes (stored as comma-separated string in .env)
    GOOGLE_OAUTH_SCOPES: str = "openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile,https://www.googleapis.com/auth/drive"
    
    # Redirect URIs
    OAUTH_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/google/callback"
    FRONTEND_URL: str = "http://localhost:3000"
    FRONTEND_AUTH_SUCCESS_URL: str = "http://localhost:3000/auth/success"
    FRONTEND_AUTH_ERROR_URL: str = "http://localhost:3000/auth/error"
    
    # ===================================================================
    # JWT SETTINGS (NEW!)
    # ===================================================================
    
    JWT_SECRET_KEY: str = "change-this-to-a-random-secret-key"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    
    # ===================================================================
    # ENCRYPTION SETTINGS (NEW!)
    # ===================================================================
    
    ENCRYPTION_KEY: str = ""
    
    # ===================================================================
    # SECURITY SETTINGS (OLD + NEW)
    # ===================================================================
    
    # Old security settings (keep for backwards compatibility)
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # New OAuth security settings (stored as comma-separated string in .env)
    REQUIRE_EMAIL_VERIFICATION: bool = False
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
    # CORS SETTINGS (stored as comma-separated string in .env)
    # ===================================================================
    
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:8000"
    
    # Old setting (keep for backwards compatibility)
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:8000"
    
    # ===================================================================
    # LOGGING
    # ===================================================================
    
    LOG_LEVEL: str = "INFO"
    
    # ===================================================================
    # HELPER PROPERTIES
    # ===================================================================
    
    @property
    def oauth_scopes_list(self) -> List[str]:
        """Get OAuth scopes as a list"""
        if isinstance(self.GOOGLE_OAUTH_SCOPES, str):
            return [s.strip() for s in self.GOOGLE_OAUTH_SCOPES.split(',') if s.strip()]
        return self.GOOGLE_OAUTH_SCOPES
    
    @property
    def oauth_scopes_string(self) -> str:
        """Get scopes as space-separated string for OAuth request"""
        return " ".join(self.oauth_scopes_list)
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Get CORS origins as a list"""
        if isinstance(self.CORS_ORIGINS, str):
            return [o.strip() for o in self.CORS_ORIGINS.split(',') if o.strip()]
        return self.CORS_ORIGINS
    
    @property
    def allowed_origins_list(self) -> List[str]:
        """Get allowed origins as a list"""
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [o.strip() for o in self.ALLOWED_ORIGINS.split(',') if o.strip()]
        return self.ALLOWED_ORIGINS
    
    @property
    def is_oauth_configured(self) -> bool:
        """Check if OAuth is properly configured"""
        return bool(
            self.GOOGLE_CLIENT_ID and 
            self.GOOGLE_CLIENT_SECRET and 
            self.JWT_SECRET_KEY and
            self.JWT_SECRET_KEY != "change-this-to-a-random-secret-key"
        )
    
    # ===================================================================
    # CONFIG
    # ===================================================================
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"  # Allow extra fields from .env


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


# Run validation on import
try:
    validate_configuration()
except Exception as e:
    print(f"⚠️  Configuration validation skipped: {e}")
