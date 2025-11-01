"""
==========================================
SOCIAL MEDIA POSTER - WORKSPACE SCHEMAS
==========================================
Bestandslocatie: backend/app/schemas/workspace.py

Pydantic schemas for workspace CRUD operations
Personal workspaces for multi-tenant architecture
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from uuid import UUID


class WorkspaceBase(BaseModel):
    """Base workspace schema with common fields"""
    name: str = Field(..., min_length=1, max_length=255, description="Workspace name")
    description: Optional[str] = Field(None, description="Workspace description")
    type: str = Field(default='personal', description="Workspace type (personal only for MVP)")

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        """Validate workspace name"""
        if not v or not v.strip():
            raise ValueError('Workspace name cannot be empty')
        return v.strip()

    @field_validator('type')
    @classmethod
    def validate_type(cls, v: str) -> str:
        """Validate workspace type"""
        valid_types = ['personal']  # Only personal for MVP
        if v not in valid_types:
            raise ValueError(f'Type must be one of: {", ".join(valid_types)}')
        return v


class WorkspaceCreate(WorkspaceBase):
    """Schema for creating a new workspace"""
    pass


class WorkspaceUpdate(BaseModel):
    """Schema for updating a workspace"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    drive_folder_id: Optional[str] = None
    drive_folder_name: Optional[str] = None
    drive_setup_complete: Optional[bool] = None

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and (not v or not v.strip()):
            raise ValueError('Workspace name cannot be empty')
        return v.strip() if v else None


class WorkspaceResponse(WorkspaceBase):
    """Schema for workspace response"""
    workspace_id: UUID
    owner_user_id: UUID
    drive_folder_id: Optional[str] = None
    drive_folder_name: Optional[str] = None
    drive_setup_complete: bool = False
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class WorkspaceListResponse(BaseModel):
    """Schema for list of workspaces"""
    workspaces: list[WorkspaceResponse]
    total: int


class WorkspaceSummary(BaseModel):
    """Lightweight workspace info for dropdowns"""
    workspace_id: UUID
    name: str
    type: str
    drive_setup_complete: bool

    class Config:
        from_attributes = True


class WorkspaceDriveSetup(BaseModel):
    """Schema for setting up Google Drive for workspace"""
    drive_folder_id: str = Field(..., description="Google Drive folder ID")
    drive_folder_name: str = Field(default="SOCIAL_MEDIA_POSTER", description="Folder name")


class WorkspaceDriveSetupResponse(BaseModel):
    """Response after Drive setup"""
    workspace_id: UUID
    drive_folder_id: str
    drive_folder_name: str
    drive_setup_complete: bool
    message: str = "Drive setup completed successfully"


class WorkspaceStats(BaseModel):
    """Statistics for a workspace"""
    workspace_id: UUID
    customer_count: int = 0
    event_count: int = 0
    photo_count: int = 0
    post_count: int = 0
    
    class Config:
        from_attributes = True
