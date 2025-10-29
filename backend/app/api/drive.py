"""
==========================================
GOOGLE DRIVE API ENDPOINTS
==========================================
Bestandslocatie: social_media_poster_backend/app/api/drive.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/api/drive.py

Google Drive integration endpoints:
- Setup (initialize main folder structure)
- Status (check setup completion)
- Verify folder (check if folder exists)
- Configuration management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
import os

from ..core.database import get_db
from ..services.google_drive import GoogleDriveService
from ..models.config import AppConfig
from ..models.user import AuditLog
from .dependencies import get_current_user
from ..models.user import User


router = APIRouter(prefix="/drive", tags=["google-drive"])


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_drive_service() -> GoogleDriveService:
    """
    Get initialized GoogleDriveService instance
    
    Raises HTTPException if service account credentials are not configured
    """
    try:
        return GoogleDriveService()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Google Drive service not available: {str(e)}"
        )


def get_config_value(db: Session, key: str) -> Optional[str]:
    """Get configuration value from database"""
    config = db.query(AppConfig).filter(AppConfig.key == key).first()
    return config.value if config else None


def update_config_value(db: Session, key: str, value: str):
    """Update configuration value in database"""
    config = db.query(AppConfig).filter(AppConfig.key == key).first()
    if config:
        config.value = value
        db.commit()
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Configuration key '{key}' not found"
        )


# ============================================================================
# DRIVE SETUP - Initial Configuration
# ============================================================================

@router.post("/setup")
async def setup_drive_structure(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Setup initial Google Drive folder structure
    
    This endpoint:
    1. Creates main "SOCIAL_MEDIA_POSTER" folder in Drive
    2. Shares folder with admin users
    3. Saves folder ID to configuration
    4. Marks setup as complete
    
    Should be called once during initial application setup
    Returns folder ID and web link
    """
    try:
        print(f"\n📁 Setting up Google Drive structure...")
        print(f"   Initiated by: {current_user.email}")
        
        # Check if setup already complete
        setup_complete = get_config_value(db, "drive_setup_complete")
        if setup_complete == "true":
            folder_id = get_config_value(db, "drive_folder_id")
            folder_name = get_config_value(db, "drive_folder_name")
            
            print(f"⚠️  Setup already complete")
            print(f"   Folder: {folder_name}")
            print(f"   ID: {folder_id}")
            
            return {
                "message": "Drive setup already complete",
                "already_setup": True,
                "folder_id": folder_id,
                "folder_name": folder_name,
                "folder_link": f"https://drive.google.com/drive/folders/{folder_id}"
            }
        
        # Get Drive service
        drive_service = get_drive_service()
        
        # Get folder name from config (default: SOCIAL_MEDIA_POSTER)
        folder_name = get_config_value(db, "drive_folder_name") or "SOCIAL_MEDIA_POSTER"
        
        print(f"   Creating folder: {folder_name}")
        
        # Create main folder
        folder_id = drive_service.create_folder(
            folder_name=folder_name,
            parent_folder_id=None  # Create in root
        )
        
        print(f"✅ Folder created")
        print(f"   ID: {folder_id}")
        
        # Share with admin users
        admin_emails = [
            "toolhubbe@gmail.com",
            "dpelssers@gmail.com"
        ]
        
        print(f"   Sharing with admins...")
        drive_service.share_folder_with_users(folder_id, admin_emails)
        print(f"✅ Shared with {len(admin_emails)} users")
        
        # Update configuration
        update_config_value(db, "drive_folder_id", folder_id)
        update_config_value(db, "drive_setup_complete", "true")
        
        # Log the setup
        AuditLog.log(
            db=db,
            user_id=current_user.user_id,
            action="drive_setup_complete",
            entity_type="configuration",
            entity_id=None,  # No entity_id for Drive setup
            details={
                "folder_name": folder_name,
                "folder_id": folder_id,
                "shared_with": admin_emails
            }
        )
        
        db.commit()
        
        print(f"✅ Drive setup complete!")
        
        return {
            "message": "Drive setup completed successfully",
            "folder_id": folder_id,
            "folder_name": folder_name,
            "folder_link": f"https://drive.google.com/drive/folders/{folder_id}",
            "shared_with": admin_emails,
            "setup_complete": True
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Drive setup error: {e}")
        import traceback
        traceback.print_exc()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to setup Drive structure: {str(e)}"
        )


# ============================================================================
# DRIVE STATUS - Check Configuration
# ============================================================================

@router.get("/status")
async def get_drive_status(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Check Google Drive setup status
    
    Returns:
    - Whether setup is complete
    - Folder ID and name if configured
    - Service account status
    - Folder link if available
    """
    try:
        # Get configuration values
        setup_complete = get_config_value(db, "drive_setup_complete") == "true"
        folder_id = get_config_value(db, "drive_folder_id")
        folder_name = get_config_value(db, "drive_folder_name")
        
        # Check if service account credentials exist
        credentials_path = os.path.join(os.getcwd(), "service-account.json")
        credentials_exist = os.path.exists(credentials_path)
        
        # Check if Drive service can be initialized
        service_available = False
        try:
            get_drive_service()
            service_available = True
        except:
            pass
        
        response = {
            "setup_complete": setup_complete,
            "folder_id": folder_id,
            "folder_name": folder_name,
            "credentials_configured": credentials_exist,
            "service_available": service_available,
            "ready_for_use": setup_complete and service_available
        }
        
        # Add folder link if setup complete
        if setup_complete and folder_id:
            response["folder_link"] = f"https://drive.google.com/drive/folders/{folder_id}"
        
        return response
        
    except Exception as e:
        print(f"❌ Error checking Drive status: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to check Drive status: {str(e)}"
        )


# ============================================================================
# VERIFY FOLDER - Check if Folder Exists
# ============================================================================

@router.post("/verify-folder")
async def verify_folder_exists(
    folder_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Verify if a Google Drive folder exists and is accessible
    
    Parameters:
    - folder_id: Google Drive folder ID to verify
    
    Returns:
    - exists: Whether folder exists
    - accessible: Whether service account can access it
    - folder_name: Name of folder if accessible
    """
    try:
        drive_service = get_drive_service()
        
        # Try to get folder metadata
        try:
            # This will raise an exception if folder doesn't exist or isn't accessible
            folder_name = drive_service.service.files().get(
                fileId=folder_id,
                fields='name'
            ).execute().get('name')
            
            return {
                "exists": True,
                "accessible": True,
                "folder_id": folder_id,
                "folder_name": folder_name,
                "folder_link": f"https://drive.google.com/drive/folders/{folder_id}"
            }
            
        except Exception as e:
            error_msg = str(e)
            
            # Parse error to determine if folder doesn't exist or isn't accessible
            if "not found" in error_msg.lower():
                return {
                    "exists": False,
                    "accessible": False,
                    "folder_id": folder_id,
                    "error": "Folder not found"
                }
            else:
                return {
                    "exists": True,  # Might exist
                    "accessible": False,
                    "folder_id": folder_id,
                    "error": "Folder not accessible by service account"
                }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error verifying folder: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to verify folder: {str(e)}"
        )


# ============================================================================
# RESET SETUP - Admin Only (For Development)
# ============================================================================

@router.post("/reset-setup")
async def reset_drive_setup(
    confirm: bool = False,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Reset Drive setup configuration (Does NOT delete folders in Drive)
    
    ⚠️  WARNING: This only resets database configuration.
    Folders in Google Drive will remain. Use this if you need to
    reconfigure without creating duplicate folders.
    
    Parameters:
    - confirm: Must be true to proceed
    
    Admin use only - for development/testing
    """
    if not confirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Must confirm reset by setting confirm=true"
        )
    
    try:
        print(f"\n⚠️  Resetting Drive setup...")
        print(f"   Initiated by: {current_user.email}")
        
        # Get current values for logging
        folder_id = get_config_value(db, "drive_folder_id")
        folder_name = get_config_value(db, "drive_folder_name")
        
        # Reset configuration
        update_config_value(db, "drive_folder_id", "")
        update_config_value(db, "drive_setup_complete", "false")
        
        # Log the reset
        AuditLog.log(
            db=db,
            user_id=current_user.user_id,
            action="drive_setup_reset",
            entity_type="configuration",
            entity_id=None,  # No entity_id for Drive reset
            details={
                "previous_folder_name": folder_name,
                "previous_folder_id": folder_id,
                "warning": "Folders not deleted from Drive"
            }
        )
        
        db.commit()
        
        print(f"✅ Setup reset complete")
        print(f"   Previous folder: {folder_name} ({folder_id})")
        print(f"   ⚠️  Folder still exists in Google Drive!")
        
        return {
            "message": "Drive setup reset successfully",
            "warning": "Folders in Google Drive were NOT deleted",
            "previous_folder_id": folder_id,
            "previous_folder_name": folder_name,
            "can_setup_again": True
        }
        
    except Exception as e:
        print(f"❌ Reset error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to reset setup: {str(e)}"
        )


# ============================================================================
# HEALTH CHECK
# ============================================================================

@router.get("/health")
async def drive_health_check():
    """
    Check if Google Drive integration is healthy
    
    Returns configuration status without requiring authentication
    """
    try:
        # Check if credentials file exists
        credentials_path = os.path.join(os.getcwd(), "service-account.json")
        credentials_exist = os.path.exists(credentials_path)
        
        # Try to initialize service
        service_available = False
        error_message = None
        try:
            get_drive_service()
            service_available = True
        except Exception as e:
            error_message = str(e)
        
        return {
            "status": "healthy" if service_available else "unhealthy",
            "credentials_configured": credentials_exist,
            "service_available": service_available,
            "credentials_path": credentials_path,
            "error": error_message if not service_available else None
        }
        
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }
