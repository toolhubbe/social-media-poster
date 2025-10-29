"""
==========================================
SOCIAL MEDIA POSTER - PHOTO SCHEMAS
==========================================
Bestandslocatie: app/schemas/photo.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/schemas/photo.py

Pydantic schemas for photo validation and responses
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class PhotoBase(BaseModel):
    """Base photo schema with common fields"""
    description: Optional[str] = None
    display_order: int = 0
    is_featured: bool = False


class PhotoCreate(PhotoBase):
    """Schema for creating a new photo"""
    event_id: UUID
    # File info will be extracted from upload


class PhotoUpdate(BaseModel):
    """Schema for updating photo metadata"""
    description: Optional[str] = None
    display_order: Optional[int] = None
    is_featured: Optional[bool] = None
    status: Optional[str] = None


class PhotoResponse(PhotoBase):
    """Schema for photo response"""
    photo_id: UUID
    event_id: UUID
    filename: str
    original_filename: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None
    google_drive_file_id: Optional[str] = None
    google_drive_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    uploaded_at: datetime
    uploaded_by: Optional[str] = None
    status: str
    archived: bool
    
    model_config = ConfigDict(from_attributes=True)


class PhotoListResponse(BaseModel):
    """Schema for paginated photo list"""
    photos: List[PhotoResponse]
    total: int
    page: int
    page_size: int


class PhotoSummary(BaseModel):
    """Lightweight photo info for galleries"""
    photo_id: UUID
    filename: str
    google_drive_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    is_featured: bool
    display_order: int
    
    model_config = ConfigDict(from_attributes=True)


class PhotoUploadResponse(BaseModel):
    """Response after successful photo upload"""
    photo_id: UUID
    filename: str
    file_size: int
    google_drive_url: str
    message: str = "Photo uploaded successfully"


class MultiplePhotoUploadResponse(BaseModel):
    """Response after multiple photo upload"""
    success: int
    failed: int
    total: int
    photos: List[PhotoUploadResponse]
    errors: Optional[List[dict]] = None


class PhotoMetadata(BaseModel):
    """Photo metadata extraction result"""
    filename: str
    file_size: int
    mime_type: str
    width: Optional[int] = None
    height: Optional[int] = None
