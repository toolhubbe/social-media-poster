"""
==========================================
SOCIAL MEDIA POSTER - WORKSPACE SERVICE
==========================================
Bestandslocatie: backend/app/services/workspace_service.py
Full Path: backend/app/services/workspace_service.py

Business logic for workspace management
Auto-creates personal workspaces for users
"""

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import Optional, List
from uuid import UUID
import logging

from ..models.workspace import Workspace
from ..models.user import User
from ..schemas.workspace import WorkspaceCreate, WorkspaceUpdate

logger = logging.getLogger(__name__)


class WorkspaceService:
    """
    Service for workspace CRUD operations
    
    Key features:
    - Auto-create personal workspace on user registration
    - Workspace CRUD operations
    - Drive setup management
    - Workspace statistics
    """
    
    @staticmethod
    def create_personal_workspace(
        db: Session,
        user_id: UUID,
        name: Optional[str] = None
    ) -> Workspace:
        """
        Create a personal workspace for a user
        
        This is called automatically when a user registers.
        Each user gets exactly ONE personal workspace.
        
        Args:
            db: Database session
            user_id: User's UUID
            name: Optional custom name (defaults to "{user.full_name}'s Workspace")
            
        Returns:
            Workspace: The created workspace
            
        Raises:
            IntegrityError: If user already has a personal workspace
        """
        logger.info(f"Creating personal workspace for user {user_id}")
        
        # Check if user already has a personal workspace
        existing = db.query(Workspace).filter(
            Workspace.owner_user_id == user_id,
            Workspace.type == 'personal'
        ).first()
        
        if existing:
            logger.info(f"User {user_id} already has a personal workspace: {existing.workspace_id}")
            return existing
        
        # Get user to generate default name
        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            raise ValueError(f"User {user_id} not found")
        
        # Generate default workspace name
        if not name:
            if user.full_name:
                name = f"{user.full_name}'s Workspace"
            elif user.given_name:
                name = f"{user.given_name}'s Workspace"
            else:
                name = "My Workspace"
        
        # Create workspace
        workspace = Workspace(
            name=name,
            type='personal',
            owner_user_id=user_id,
            description=f"Personal workspace for {user.email}",
            drive_setup_complete=False
        )
        
        try:
            db.add(workspace)
            db.commit()
            db.refresh(workspace)
            
            # Set as user's current workspace
            user.current_workspace_id = workspace.workspace_id
            user.default_workspace_id = workspace.workspace_id
            db.commit()
            
            logger.info(f"Created personal workspace {workspace.workspace_id} for user {user_id}")
            return workspace
            
        except IntegrityError as e:
            db.rollback()
            logger.error(f"Failed to create workspace for user {user_id}: {str(e)}")
            raise
    
    @staticmethod
    def get_workspace(db: Session, workspace_id: UUID) -> Optional[Workspace]:
        """Get workspace by ID"""
        return db.query(Workspace).filter(Workspace.workspace_id == workspace_id).first()
    
    @staticmethod
    def get_user_workspaces(db: Session, user_id: UUID) -> List[Workspace]:
        """Get all workspaces owned by a user"""
        return db.query(Workspace).filter(Workspace.owner_user_id == user_id).all()
    
    @staticmethod
    def get_user_personal_workspace(db: Session, user_id: UUID) -> Optional[Workspace]:
        """Get user's personal workspace"""
        return db.query(Workspace).filter(
            Workspace.owner_user_id == user_id,
            Workspace.type == 'personal'
        ).first()
    
    @staticmethod
    def update_workspace(
        db: Session,
        workspace_id: UUID,
        update_data: WorkspaceUpdate
    ) -> Optional[Workspace]:
        """
        Update workspace
        
        Args:
            db: Database session
            workspace_id: Workspace UUID
            update_data: Update data
            
        Returns:
            Updated workspace or None if not found
        """
        workspace = db.query(Workspace).filter(Workspace.workspace_id == workspace_id).first()
        if not workspace:
            return None
        
        # Update fields
        update_dict = update_data.model_dump(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(workspace, field, value)
        
        db.commit()
        db.refresh(workspace)
        
        logger.info(f"Updated workspace {workspace_id}")
        return workspace
    
    @staticmethod
    def setup_drive_for_workspace(
        db: Session,
        workspace_id: UUID,
        drive_folder_id: str,
        drive_folder_name: str
    ) -> Optional[Workspace]:
        """
        Mark workspace Drive as set up
        
        Args:
            db: Database session
            workspace_id: Workspace UUID
            drive_folder_id: Google Drive folder ID
            drive_folder_name: Folder name
            
        Returns:
            Updated workspace or None if not found
        """
        workspace = db.query(Workspace).filter(Workspace.workspace_id == workspace_id).first()
        if not workspace:
            return None
        
        workspace.drive_folder_id = drive_folder_id
        workspace.drive_folder_name = drive_folder_name
        workspace.drive_setup_complete = True
        
        db.commit()
        db.refresh(workspace)
        
        logger.info(f"Drive setup complete for workspace {workspace_id}: {drive_folder_id}")
        return workspace
    
    @staticmethod
    def delete_workspace(db: Session, workspace_id: UUID) -> bool:
        """
        Delete workspace
        
        WARNING: This will cascade delete all customers, events, photos, and posts!
        
        Args:
            db: Database session
            workspace_id: Workspace UUID
            
        Returns:
            True if deleted, False if not found
        """
        workspace = db.query(Workspace).filter(Workspace.workspace_id == workspace_id).first()
        if not workspace:
            return False
        
        db.delete(workspace)
        db.commit()
        
        logger.warning(f"Deleted workspace {workspace_id} and all associated data")
        return True
    
    @staticmethod
    def get_workspace_stats(db: Session, workspace_id: UUID) -> dict:
        """
        Get statistics for a workspace
        
        Args:
            db: Database session
            workspace_id: Workspace UUID
            
        Returns:
            Dict with counts of customers, events, photos, posts
        """
        workspace = db.query(Workspace).filter(Workspace.workspace_id == workspace_id).first()
        if not workspace:
            return None
        
        return {
            "workspace_id": workspace_id,
            "customer_count": workspace.customer_count,
            "event_count": workspace.event_count,
            "photo_count": workspace.photo_count,
            "post_count": workspace.post_count
        }
    
    @staticmethod
    def verify_workspace_access(
        db: Session,
        workspace_id: UUID,
        user_id: UUID
    ) -> bool:
        """
        Verify that a user has access to a workspace
        
        For personal workspaces: User must be the owner
        For team workspaces (future): User must be owner or member
        
        Args:
            db: Database session
            workspace_id: Workspace UUID
            user_id: User UUID
            
        Returns:
            True if user has access, False otherwise
        """
        workspace = db.query(Workspace).filter(Workspace.workspace_id == workspace_id).first()
        if not workspace:
            return False
        
        # For personal workspaces: Must be owner
        if workspace.type == 'personal':
            return workspace.owner_user_id == user_id
        
        # For future team workspaces: Check membership
        # TODO: Implement team workspace membership check
        return False
    
    @staticmethod
    def set_user_current_workspace(
        db: Session,
        user_id: UUID,
        workspace_id: UUID
    ) -> bool:
        """
        Set user's current active workspace
        
        Args:
            db: Database session
            user_id: User UUID
            workspace_id: Workspace UUID
            
        Returns:
            True if successful, False if user doesn't have access
        """
        # Verify access
        if not WorkspaceService.verify_workspace_access(db, workspace_id, user_id):
            logger.warning(f"User {user_id} denied access to workspace {workspace_id}")
            return False
        
        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            return False
        
        user.current_workspace_id = workspace_id
        db.commit()
        
        logger.info(f"Set current workspace for user {user_id} to {workspace_id}")
        return True
