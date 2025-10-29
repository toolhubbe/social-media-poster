"""
App Configuration Model
File Location: app/models/config.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/models/config.py

Stores application-wide configuration values
"""

from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime, timezone

from ..core.database import Base


class AppConfig(Base):
    """
    Application Configuration
    
    Stores key-value pairs for app settings like:
    - drive_folder_id: Main Google Drive folder ID
    - drive_folder_name: Name of main folder
    - app_version: Current app version
    - maintenance_mode: Enable/disable maintenance
    """
    __tablename__ = "app_config"
    
    config_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    key = Column(String(255), unique=True, nullable=False, index=True)
    value = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f"<AppConfig {self.key}={self.value[:50]}>"
    
    @staticmethod
    def get_value(db, key: str, default=None):
        """Get config value by key"""
        config = db.query(AppConfig).filter_by(key=key).first()
        return config.value if config else default
    
    @staticmethod
    def set_value(db, key: str, value: str, description: str = None):
        """Set or update config value"""
        config = db.query(AppConfig).filter_by(key=key).first()
        
        if config:
            config.value = value
            config.updated_at = datetime.now(timezone.utc)
            if description:
                config.description = description
        else:
            config = AppConfig(
                key=key,
                value=value,
                description=description
            )
            db.add(config)
        
        db.commit()
        return config
    
    @staticmethod
    def delete_key(db, key: str):
        """Delete config by key"""
        config = db.query(AppConfig).filter_by(key=key).first()
        if config:
            db.delete(config)
            db.commit()
            return True
        return False
