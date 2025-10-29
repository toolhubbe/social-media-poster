"""
Event Schemas - Pydantic models voor API validation en serialization
Bestandslocatie: social_media_poster_backend/app/schemas/event.py
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from uuid import UUID
import re


class EventBase(BaseModel):
    """Base schema met gedeelde velden"""
    event_name: str = Field(..., min_length=1, max_length=255, description="Naam van het event")
    event_type: Optional[str] = Field(None, max_length=100, description="Type event (birthday, corporate, wedding, etc.)")
    event_date: Optional[datetime] = Field(None, description="Datum en tijd van het event")
    location_city: Optional[str] = Field(None, max_length=100, description="Stad waar event plaatsvindt")
    location_venue: Optional[str] = Field(None, max_length=255, description="Locatie/venue naam")
    description: Optional[str] = Field(None, description="Beschrijving van het event")
    folder_name: Optional[str] = Field(None, max_length=255, description="Naam voor Google Drive folder")
    status: Optional[str] = Field('draft', description="Status van het event")

    @field_validator('event_name')
    @classmethod
    def validate_event_name(cls, v: str) -> str:
        """Valideer event naam"""
        if not v or not v.strip():
            raise ValueError('Event name cannot be empty')
        return v.strip()

    @field_validator('status')
    @classmethod
    def validate_status(cls, v: str) -> str:
        """Valideer status"""
        valid_statuses = ['draft', 'active', 'completed', 'cancelled', 'archived']
        if v and v not in valid_statuses:
            raise ValueError(f'Status must be one of: {", ".join(valid_statuses)}')
        return v

    @field_validator('folder_name')
    @classmethod
    def sanitize_folder_name(cls, v: Optional[str]) -> Optional[str]:
        """Sanitize folder name voor gebruik in bestandssysteem"""
        if not v:
            return None
        # Vervang spaties en speciale karakters
        sanitized = re.sub(r'[^\w\s-]', '', v)
        sanitized = re.sub(r'[\s]+', '_', sanitized)
        return sanitized.strip('_')


class EventCreate(EventBase):
    """Schema voor het aanmaken van een nieuw event"""
    customer_id: UUID = Field(..., description="UUID van de customer waar dit event bij hoort")

    class Config:
        json_schema_extra = {
            "example": {
                "customer_id": "123e4567-e89b-12d3-a456-426614174000",
                "event_name": "Summer Festival 2025",
                "event_type": "corporate",
                "event_date": "2025-07-15T14:00:00",
                "location_city": "Amsterdam",
                "location_venue": "RAI Convention Center",
                "description": "Annual summer festival for employees",
                "folder_name": "Summer_Festival_2025",
                "status": "draft"
            }
        }


class EventUpdate(BaseModel):
    """Schema voor het updaten van een bestaand event"""
    event_name: Optional[str] = Field(None, min_length=1, max_length=255)
    event_type: Optional[str] = Field(None, max_length=100)
    event_date: Optional[datetime] = None
    location_city: Optional[str] = Field(None, max_length=100)
    location_venue: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    folder_name: Optional[str] = Field(None, max_length=255)
    status: Optional[str] = None
    google_drive_folder_id: Optional[str] = Field(None, max_length=255)

    @field_validator('event_name')
    @classmethod
    def validate_event_name(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and (not v or not v.strip()):
            raise ValueError('Event name cannot be empty')
        return v.strip() if v else None

    @field_validator('status')
    @classmethod
    def validate_status(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            valid_statuses = ['draft', 'active', 'completed', 'cancelled', 'archived']
            if v not in valid_statuses:
                raise ValueError(f'Status must be one of: {", ".join(valid_statuses)}')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "event_name": "Updated Event Name",
                "status": "active",
                "location_city": "Rotterdam"
            }
        }


class EventResponse(EventBase):
    """Schema voor het returnen van event data"""
    event_id: UUID
    customer_id: UUID
    google_drive_folder_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    archived: bool = False

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "event_id": "123e4567-e89b-12d3-a456-426614174000",
                "customer_id": "987e6543-e21b-12d3-a456-426614174000",
                "event_name": "Summer Festival 2025",
                "event_type": "corporate",
                "event_date": "2025-07-15T14:00:00",
                "location_city": "Amsterdam",
                "location_venue": "RAI Convention Center",
                "description": "Annual summer festival",
                "folder_name": "Summer_Festival_2025",
                "google_drive_folder_id": "abc123xyz789",
                "status": "active",
                "created_at": "2025-10-27T10:00:00",
                "updated_at": "2025-10-27T11:30:00",
                "archived": False
            }
        }


class EventSummary(BaseModel):
    """Lightweight schema voor event lijsten"""
    event_id: UUID
    customer_id: UUID
    event_name: str
    event_type: Optional[str] = None
    event_date: Optional[datetime] = None
    location_city: Optional[str] = None
    status: str

    class Config:
        from_attributes = True


class EventListResponse(BaseModel):
    """Schema voor gepagineerde event lijst"""
    items: list[EventResponse]
    total: int
    page: int
    page_size: int
    pages: int

    class Config:
        json_schema_extra = {
            "example": {
                "items": [
                    {
                        "event_id": "123e4567-e89b-12d3-a456-426614174000",
                        "customer_id": "987e6543-e21b-12d3-a456-426614174000",
                        "event_name": "Summer Festival 2025",
                        "event_type": "corporate",
                        "status": "active"
                    }
                ],
                "total": 1,
                "page": 1,
                "page_size": 10,
                "pages": 1
            }
        }


class EventArchiveRequest(BaseModel):
    """Schema voor archive actie"""
    archived: bool = True

    class Config:
        json_schema_extra = {
            "example": {
                "archived": True
            }
        }
