"""Add Drive subfolder IDs to Workspace

Revision ID: 004_drive_subfolders
Revises: 003_add_posts_social_media
Create Date: 2025-01-11 15:30:00.000000

Adds drive_customers_folder_id and drive_events_folder_id to workspaces table
for Google Drive folder structure per workspace.
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '004_drive_subfolders'
down_revision = '003_add_posts_social_media'
branch_labels = None
depends_on = None


def upgrade():
    """
    Add drive_customers_folder_id and drive_events_folder_id to workspaces table
    
    These columns store the Google Drive folder IDs for:
    - Customers subfolder (where all customer folders are created)
    - Events subfolder (where all event folders are created)
    """
    
    print("\n📁 Adding Drive subfolder columns to workspaces table...")
    
    # Add customers folder ID column
    op.add_column(
        'workspaces',
        sa.Column('drive_customers_folder_id', sa.String(length=255), nullable=True)
    )
    print("   ✅ Added drive_customers_folder_id")
    
    # Add events folder ID column
    op.add_column(
        'workspaces',
        sa.Column('drive_events_folder_id', sa.String(length=255), nullable=True)
    )
    print("   ✅ Added drive_events_folder_id")
    
    print("✅ Migration complete!\n")


def downgrade():
    """
    Remove drive_customers_folder_id and drive_events_folder_id from workspaces table
    """
    
    print("\n🔄 Removing Drive subfolder columns from workspaces table...")
    
    # Remove columns in reverse order
    op.drop_column('workspaces', 'drive_events_folder_id')
    print("   ✅ Removed drive_events_folder_id")
    
    op.drop_column('workspaces', 'drive_customers_folder_id')
    print("   ✅ Removed drive_customers_folder_id")
    
    print("✅ Rollback complete!\n")
