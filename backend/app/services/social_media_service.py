"""
==========================================
SOCIAL MEDIA POSTER - SOCIAL MEDIA SERVICE
==========================================
Bestandslocatie: backend/app/services/social_media_service.py

Business logic for social media account OAuth connections
Manages tokens, refreshes, and platform integrations
"""

from sqlalchemy.orm import Session
from typing import Optional, List
from uuid import UUID
from datetime import datetime, timedelta
import logging

from ..models.social_media import SocialMediaAccount
from ..schemas.social_media import (
    SocialMediaAccountCreate,
    SocialMediaAccountUpdate
)

logger = logging.getLogger(__name__)


class SocialMediaService:
    """
    Service for social media account management
    
    Features:
    - OAuth connection management
    - Token refresh
    - Multi-platform support (Facebook, Instagram, LinkedIn, TikTok)
    - Default account management
    """
    
    @staticmethod
    def create_account(
        db: Session,
        user_id: UUID,
        account_data: SocialMediaAccountCreate
    ) -> SocialMediaAccount:
        """
        Create a new social media account connection
        
        Args:
            db: Database session
            user_id: User's UUID
            account_data: Account creation data
            
        Returns:
            Created social media account
        """
        logger.info(f"Creating {account_data.platform} account for user {user_id}")
        
        # Check if this is user's first account for this platform
        existing_count = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.user_id == user_id,
            SocialMediaAccount.platform == account_data.platform
        ).count()
        
        # Create account
        account = SocialMediaAccount(
            user_id=user_id,
            platform=account_data.platform,
            platform_user_id=account_data.platform_user_id,
            platform_username=account_data.platform_username,
            platform_name=account_data.platform_name,
            page_id=account_data.page_id,
            page_name=account_data.page_name,
            page_category=account_data.page_category,
            access_token=account_data.access_token,
            refresh_token=account_data.refresh_token,
            token_expires_at=account_data.token_expires_at,
            scopes=account_data.scopes,
            is_active=True,
            is_default=(existing_count == 0)  # First account is default
        )
        
        db.add(account)
        db.commit()
        db.refresh(account)
        
        logger.info(f"Created account {account.account_id} for {account_data.platform}")
        return account
    
    @staticmethod
    def get_account(db: Session, account_id: UUID) -> Optional[SocialMediaAccount]:
        """Get social media account by ID"""
        return db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id
        ).first()
    
    @staticmethod
    def get_user_accounts(
        db: Session,
        user_id: UUID,
        platform: Optional[str] = None,
        active_only: bool = True
    ) -> List[SocialMediaAccount]:
        """
        Get all social media accounts for a user
        
        Args:
            db: Database session
            user_id: User UUID
            platform: Optional filter by platform
            active_only: Only return active accounts
            
        Returns:
            List of social media accounts
        """
        query = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.user_id == user_id
        )
        
        if platform:
            query = query.filter(SocialMediaAccount.platform == platform)
        
        if active_only:
            query = query.filter(SocialMediaAccount.is_active == True)
        
        return query.all()
    
    @staticmethod
    def get_default_account(
        db: Session,
        user_id: UUID,
        platform: str
    ) -> Optional[SocialMediaAccount]:
        """Get user's default account for a platform"""
        return db.query(SocialMediaAccount).filter(
            SocialMediaAccount.user_id == user_id,
            SocialMediaAccount.platform == platform,
            SocialMediaAccount.is_default == True,
            SocialMediaAccount.is_active == True
        ).first()
    
    @staticmethod
    def update_account(
        db: Session,
        account_id: UUID,
        update_data: SocialMediaAccountUpdate
    ) -> Optional[SocialMediaAccount]:
        """Update social media account"""
        account = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id
        ).first()
        
        if not account:
            return None
        
        # Update fields
        update_dict = update_data.model_dump(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(account, field, value)
        
        db.commit()
        db.refresh(account)
        
        logger.info(f"Updated account {account_id}")
        return account
    
    @staticmethod
    def set_default_account(
        db: Session,
        account_id: UUID,
        user_id: UUID
    ) -> bool:
        """
        Set an account as default for its platform
        
        Unsets other accounts for the same platform
        """
        account = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id,
            SocialMediaAccount.user_id == user_id
        ).first()
        
        if not account:
            return False
        
        # Unset other defaults for this platform
        db.query(SocialMediaAccount).filter(
            SocialMediaAccount.user_id == user_id,
            SocialMediaAccount.platform == account.platform,
            SocialMediaAccount.account_id != account_id
        ).update({"is_default": False})
        
        # Set this as default
        account.is_default = True
        db.commit()
        
        logger.info(f"Set account {account_id} as default for {account.platform}")
        return True
    
    @staticmethod
    def refresh_token(
        db: Session,
        account_id: UUID,
        new_access_token: str,
        expires_in: int = 3600
    ) -> Optional[SocialMediaAccount]:
        """
        Refresh access token for an account
        
        Args:
            db: Database session
            account_id: Account UUID
            new_access_token: New access token
            expires_in: Token lifetime in seconds
            
        Returns:
            Updated account or None
        """
        account = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id
        ).first()
        
        if not account:
            return None
        
        account.update_tokens(
            access_token=new_access_token,
            expires_in=expires_in
        )
        
        db.commit()
        db.refresh(account)
        
        logger.info(f"Refreshed token for account {account_id}")
        return account
    
    @staticmethod
    def mark_account_used(db: Session, account_id: UUID) -> bool:
        """Update last_used_at timestamp"""
        account = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id
        ).first()
        
        if not account:
            return False
        
        account.mark_as_used()
        db.commit()
        
        return True
    
    @staticmethod
    def deactivate_account(db: Session, account_id: UUID) -> bool:
        """Deactivate (soft delete) an account"""
        account = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id
        ).first()
        
        if not account:
            return False
        
        account.deactivate()
        db.commit()
        
        logger.info(f"Deactivated account {account_id}")
        return True
    
    @staticmethod
    def delete_account(db: Session, account_id: UUID) -> bool:
        """Permanently delete an account"""
        account = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id
        ).first()
        
        if not account:
            return False
        
        db.delete(account)
        db.commit()
        
        logger.warning(f"Deleted account {account_id}")
        return True
    
    @staticmethod
    def get_expiring_tokens(
        db: Session,
        days_threshold: int = 7
    ) -> List[SocialMediaAccount]:
        """
        Get accounts with tokens expiring soon
        
        Useful for automated token refresh
        
        Args:
            db: Database session
            days_threshold: Number of days before expiration
            
        Returns:
            List of accounts with expiring tokens
        """
        threshold_date = datetime.utcnow() + timedelta(days=days_threshold)
        
        return db.query(SocialMediaAccount).filter(
            SocialMediaAccount.token_expires_at != None,
            SocialMediaAccount.token_expires_at <= threshold_date,
            SocialMediaAccount.is_active == True
        ).all()
    
    @staticmethod
    def verify_account_access(
        db: Session,
        account_id: UUID,
        user_id: UUID
    ) -> bool:
        """Verify that a user owns an account"""
        account = db.query(SocialMediaAccount).filter(
            SocialMediaAccount.account_id == account_id,
            SocialMediaAccount.user_id == user_id
        ).first()
        
        return account is not None
