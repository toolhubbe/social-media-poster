"""add workspaces table

Revision ID: 002_add_workspaces
Revises: 001_initial_setup
Create Date: 2025-11-01

This migration adds the workspaces table and related fields for personal workspace implementation.
Each user gets their own workspace with their own Google Drive folder.
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers
revision = '002_add_workspaces'
down_revision = '001_initial_setup'
branch_labels = None
depends_on = None


def upgrade():
    print("\n🚀 Adding workspaces support...")
    
    # Create workspaces table
    print("📦 Creating workspaces table...")
    op.create_table(
        'workspaces',
        sa.Column('workspace_id', postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('gen_random_uuid()')),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('type', sa.String(20), nullable=False, server_default='personal'),
        sa.Column('description', sa.Text, nullable=True),
        sa.Column('owner_user_id', postgresql.UUID(as_uuid=True), nullable=False),
        
        # Google Drive integration
        sa.Column('drive_folder_id', sa.String(255), nullable=True),
        sa.Column('drive_folder_name', sa.String(255), nullable=True),
        sa.Column('drive_setup_complete', sa.Boolean, server_default='false'),
        
        # Timestamps
        sa.Column('created_at', sa.DateTime, server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime, server_default=sa.func.now()),
        
        # Foreign key
        sa.ForeignKeyConstraint(['owner_user_id'], ['users.user_id'], ondelete='CASCADE'),
        
        # Constraint: 1 personal workspace per user
        sa.UniqueConstraint('owner_user_id', 'type', name='uq_workspace_owner_type')
    )
    
    # Create indexes for performance
    op.create_index('idx_workspaces_owner', 'workspaces', ['owner_user_id'])
    op.create_index('idx_workspaces_type', 'workspaces', ['type'])
    print("✅ Workspaces table created")
    
    # Add workspace columns to users table
    print("📦 Adding workspace columns to users table...")
    op.add_column('users', sa.Column('current_workspace_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('users', sa.Column('default_workspace_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('users', sa.Column('onboarding_completed', sa.Boolean, server_default='false'))
    op.add_column('users', sa.Column('onboarding_step', sa.Integer, server_default='0'))
    
    # Add foreign keys for user workspace references
    op.create_foreign_key('fk_users_current_workspace', 'users', 'workspaces', ['current_workspace_id'], ['workspace_id'])
    op.create_foreign_key('fk_users_default_workspace', 'users', 'workspaces', ['default_workspace_id'], ['workspace_id'])
    op.create_index('idx_users_current_workspace', 'users', ['current_workspace_id'])
    print("✅ Users table updated")
    
    # Add workspace_id and created_by to customers table
    print("📦 Adding workspace support to customers table...")
    op.add_column('customers', sa.Column('workspace_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('customers', sa.Column('created_by_user_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key('fk_customers_workspace', 'customers', 'workspaces', ['workspace_id'], ['workspace_id'], ondelete='CASCADE')
    op.create_foreign_key('fk_customers_created_by', 'customers', 'users', ['created_by_user_id'], ['user_id'])
    op.create_index('idx_customers_workspace', 'customers', ['workspace_id'])
    op.create_index('idx_customers_created_by', 'customers', ['created_by_user_id'])
    print("✅ Customers table updated")
    
    # Add workspace_id and created_by to events table
    print("📦 Adding workspace support to events table...")
    op.add_column('events', sa.Column('workspace_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('events', sa.Column('created_by_user_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key('fk_events_workspace', 'events', 'workspaces', ['workspace_id'], ['workspace_id'], ondelete='CASCADE')
    op.create_foreign_key('fk_events_created_by', 'events', 'users', ['created_by_user_id'], ['user_id'])
    op.create_index('idx_events_workspace', 'events', ['workspace_id'])
    op.create_index('idx_events_created_by', 'events', ['created_by_user_id'])
    print("✅ Events table updated")
    
    # Add workspace_id and created_by to photos table
    print("📦 Adding workspace support to photos table...")
    op.add_column('photos', sa.Column('workspace_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('photos', sa.Column('created_by_user_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key('fk_photos_workspace', 'photos', 'workspaces', ['workspace_id'], ['workspace_id'], ondelete='CASCADE')
    op.create_foreign_key('fk_photos_created_by', 'photos', 'users', ['created_by_user_id'], ['user_id'])
    op.create_index('idx_photos_workspace', 'photos', ['workspace_id'])
    op.create_index('idx_photos_created_by', 'photos', ['created_by_user_id'])
    print("✅ Photos table updated")
    
    print("\n✅ Workspaces migration complete!")


def downgrade():
    print("\n⚠️ Removing workspaces support...")
    
    # Remove workspace columns from photos
    op.drop_index('idx_photos_created_by', 'photos')
    op.drop_index('idx_photos_workspace', 'photos')
    op.drop_constraint('fk_photos_created_by', 'photos', type_='foreignkey')
    op.drop_constraint('fk_photos_workspace', 'photos', type_='foreignkey')
    op.drop_column('photos', 'created_by_user_id')
    op.drop_column('photos', 'workspace_id')
    
    # Remove workspace columns from events
    op.drop_index('idx_events_created_by', 'events')
    op.drop_index('idx_events_workspace', 'events')
    op.drop_constraint('fk_events_created_by', 'events', type_='foreignkey')
    op.drop_constraint('fk_events_workspace', 'events', type_='foreignkey')
    op.drop_column('events', 'created_by_user_id')
    op.drop_column('events', 'workspace_id')
    
    # Remove workspace columns from customers
    op.drop_index('idx_customers_created_by', 'customers')
    op.drop_index('idx_customers_workspace', 'customers')
    op.drop_constraint('fk_customers_created_by', 'customers', type_='foreignkey')
    op.drop_constraint('fk_customers_workspace', 'customers', type_='foreignkey')
    op.drop_column('customers', 'created_by_user_id')
    op.drop_column('customers', 'workspace_id')
    
    # Remove workspace columns from users
    op.drop_index('idx_users_current_workspace', 'users')
    op.drop_constraint('fk_users_default_workspace', 'users', type_='foreignkey')
    op.drop_constraint('fk_users_current_workspace', 'users', type_='foreignkey')
    op.drop_column('users', 'onboarding_step')
    op.drop_column('users', 'onboarding_completed')
    op.drop_column('users', 'default_workspace_id')
    op.drop_column('users', 'current_workspace_id')
    
    # Drop workspaces table
    op.drop_index('idx_workspaces_type', 'workspaces')
    op.drop_index('idx_workspaces_owner', 'workspaces')
    op.drop_table('workspaces')
    
    print("✅ Workspaces support removed")
