"""add posts and social media accounts tables

Revision ID: 003_add_posts_social_media
Revises: 002_add_workspaces
Create Date: 2025-11-01

This migration adds:
1. posts table - for social media posts with scheduling
2. social_media_accounts table - for OAuth connections to Facebook, Instagram, etc.
Multiple users can connect to the same social media page with their own tokens.
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers
revision = '003_add_posts_social_media'
down_revision = '002_add_workspaces'
branch_labels = None
depends_on = None


def upgrade():
    print("\n🚀 Adding posts and social media accounts support...")
    
    # ============================================================
    # 1. CREATE POSTS TABLE
    # ============================================================
    print("📦 Creating posts table...")
    op.create_table(
        'posts',
        sa.Column('post_id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('gen_random_uuid()')),
        
        # Workspace (data isolation)
        sa.Column('workspace_id', postgresql.UUID(as_uuid=True), nullable=False),
        
        # Created by user
        sa.Column('created_by', postgresql.UUID(as_uuid=True), nullable=True),
        
        # Optional: Link to event
        sa.Column('event_id', postgresql.UUID(as_uuid=True), nullable=True),
        
        # Post Content
        sa.Column('content', sa.Text, nullable=False),
        sa.Column('media_urls', sa.Text, nullable=True),
        sa.Column('media_type', sa.String(50), nullable=True),
        
        # Hashtags & Mentions
        sa.Column('hashtags', sa.Text, nullable=True),
        sa.Column('mentions', sa.Text, nullable=True),
        
        # Scheduling
        sa.Column('scheduled_for', sa.DateTime(timezone=True), nullable=True),
        sa.Column('posted_at', sa.DateTime(timezone=True), nullable=True),
        
        # Status
        sa.Column('status', sa.String(50), nullable=False, server_default='draft'),
        
        # Platform Info
        sa.Column('platform_post_id', sa.String(255), nullable=True),
        sa.Column('platform_post_url', sa.Text, nullable=True),
        
        # Analytics
        sa.Column('likes_count', sa.Integer, server_default='0'),
        sa.Column('comments_count', sa.Integer, server_default='0'),
        sa.Column('shares_count', sa.Integer, server_default='0'),
        sa.Column('reach', sa.Integer, server_default='0'),
        
        # Error Handling
        sa.Column('error_message', sa.Text, nullable=True),
        sa.Column('retry_count', sa.Integer, server_default='0'),
        
        # Timestamps
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        
        # Foreign keys
        sa.ForeignKeyConstraint(['workspace_id'], ['workspaces.workspace_id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['created_by'], ['users.user_id']),
        sa.ForeignKeyConstraint(['event_id'], ['events.event_id'], ondelete='SET NULL'),
        
        sa.PrimaryKeyConstraint('post_id')
    )
    
    # Create indexes for posts
    op.create_index('idx_posts_post_id', 'posts', ['post_id'])
    op.create_index('idx_posts_workspace', 'posts', ['workspace_id'])
    op.create_index('idx_posts_created_by', 'posts', ['created_by'])
    op.create_index('idx_posts_event', 'posts', ['event_id'])
    op.create_index('idx_posts_status', 'posts', ['status'])
    print("✅ Posts table created")
    
    # ============================================================
    # 2. CREATE SOCIAL_MEDIA_ACCOUNTS TABLE
    # ============================================================
    print("📦 Creating social_media_accounts table...")
    op.create_table(
        'social_media_accounts',
        sa.Column('account_id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('gen_random_uuid()')),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        
        # Platform information
        sa.Column('platform', sa.String(50), nullable=False),
        sa.Column('platform_user_id', sa.String(255), nullable=True),
        sa.Column('platform_username', sa.String(255), nullable=True),
        sa.Column('platform_name', sa.String(255), nullable=True),
        
        # For Pages/Business accounts
        sa.Column('page_id', sa.String(255), nullable=True),
        sa.Column('page_name', sa.String(255), nullable=True),
        sa.Column('page_category', sa.String(100), nullable=True),
        
        # OAuth tokens (should be encrypted in production!)
        sa.Column('access_token', sa.Text, nullable=False),
        sa.Column('refresh_token', sa.Text, nullable=True),
        sa.Column('token_expires_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('scopes', postgresql.ARRAY(sa.Text), nullable=True),
        
        # Status
        sa.Column('is_active', sa.Boolean, server_default='true'),
        sa.Column('is_default', sa.Boolean, server_default='false'),
        sa.Column('last_used_at', sa.DateTime(timezone=True), nullable=True),
        
        # Timestamps
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        
        # Foreign key
        sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE'),
        
        # Constraint: User can only link same page once
        sa.UniqueConstraint('user_id', 'platform', 'page_id', name='uq_user_platform_page')
    )
    
    # Create indexes for social_media_accounts
    op.create_index('idx_social_media_user', 'social_media_accounts', ['user_id'])
    op.create_index('idx_social_media_platform', 'social_media_accounts', ['platform'])
    op.create_index('idx_social_media_active', 'social_media_accounts', ['is_active'])
    print("✅ Social media accounts table created")
    
    # ============================================================
    # 3. ADD SOCIAL_MEDIA_ACCOUNT_ID TO POSTS
    # ============================================================
    print("📦 Linking posts to social media accounts...")
    op.add_column('posts', sa.Column('social_media_account_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key('fk_posts_social_account', 'posts', 'social_media_accounts', ['social_media_account_id'], ['account_id'])
    op.create_index('idx_posts_social_account', 'posts', ['social_media_account_id'])
    print("✅ Posts linked to social media accounts")
    
    print("\n✅ Posts and social media accounts migration complete!")


def downgrade():
    print("\n⚠️ Removing posts and social media accounts support...")
    
    # Remove social_media_account_id from posts
    op.drop_index('idx_posts_social_account', 'posts')
    op.drop_constraint('fk_posts_social_account', 'posts', type_='foreignkey')
    op.drop_column('posts', 'social_media_account_id')
    
    # Drop social_media_accounts table
    op.drop_index('idx_social_media_active', 'social_media_accounts')
    op.drop_index('idx_social_media_platform', 'social_media_accounts')
    op.drop_index('idx_social_media_user', 'social_media_accounts')
    op.drop_table('social_media_accounts')
    
    # Drop posts table
    op.drop_index('idx_posts_status', 'posts')
    op.drop_index('idx_posts_event', 'posts')
    op.drop_index('idx_posts_created_by', 'posts')
    op.drop_index('idx_posts_workspace', 'posts')
    op.drop_index('idx_posts_post_id', 'posts')
    op.drop_table('posts')
    
    print("✅ Posts and social media accounts support removed")
