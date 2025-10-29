"""
==========================================
SOCIAL MEDIA POSTER - CONFIGURATION
==========================================
Bestandslocatie: app/core/config.py
Dit bestand bevat alle app configuratie instellingen
✅ UPDATED: DRIVE_PARENT_FOLDER_ID toegevoegd
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Application
    APP_NAME: str = "Social Media Poster API"
    APP_VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/social_media_poster"
    
    # Alternative DB settings (if needed)
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "social_media_poster"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "password"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Google Drive
    GOOGLE_DRIVE_CREDENTIALS_FILE: str = "credentials.json"
    GOOGLE_DRIVE_TOKEN_FILE: str = "token.json"
    GOOGLE_DRIVE_ROOT_FOLDER_ID: str = ""
    
    # Google Drive Parent Folder (main folder for all customer folders)
    DRIVE_PARENT_FOLDER_ID: str = ""
    
    # Google Sheets
    GOOGLE_SHEETS_SPREADSHEET_ID: str = ""
    GOOGLE_SHEETS_WORKSHEET_NAME: str = "Customers"
    
    # Facebook (for later)
    FACEBOOK_APP_ID: str = ""
    FACEBOOK_APP_SECRET: str = ""
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000"
    ]
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()


# Helper functions
def get_database_url() -> str:
    """Get the complete database URL"""
    return settings.DATABASE_URL


def get_api_prefix() -> str:
    """Get the API prefix"""
    return settings.API_V1_PREFIX


def is_debug_mode() -> bool:
    """Check if app is in debug mode"""
    return settings.DEBUG
