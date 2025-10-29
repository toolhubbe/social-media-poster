"""add app_config table

Revision ID: add_app_config_table
Revises: (previous migration)
Create Date: 2025-10-28 21:00:00

File Location: alembic/versions/004_add_app_config_table.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/alembic/versions/004_add_app_config_table.py
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '004_add_app_config_table'
down_revision = None  # Update this to your previous migration
branch_labels = None
depends_on = None


def upgrade():
    """Create app_config table"""
    
    # Create app_config table
    op.create_table(
        'app_config',
        sa.Column('config_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('key', sa.String(length=255), nullable=False),
        sa.Column('value', sa.Text(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('config_id'),
        sa.UniqueConstraint('key')
    )
    
    # Create index on key column for faster lookups
    op.create_index('ix_app_config_key', 'app_config', ['key'])
    
    # Insert initial configuration values
    op.execute("""
        INSERT INTO app_config (config_id, key, value, description, created_at, updated_at)
        VALUES (
            gen_random_uuid(),
            'drive_folder_id',
            '',
            'Google Drive main folder ID for SOCIAL_MEDIA_POSTER',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )
    """)
    
    op.execute("""
        INSERT INTO app_config (config_id, key, value, description, created_at, updated_at)
        VALUES (
            gen_random_uuid(),
            'drive_folder_name',
            'SOCIAL_MEDIA_POSTER',
            'Name of the main Google Drive folder',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )
    """)
    
    op.execute("""
        INSERT INTO app_config (config_id, key, value, description, created_at, updated_at)
        VALUES (
            gen_random_uuid(),
            'drive_setup_complete',
            'false',
            'Whether Google Drive setup has been completed',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )
    """)
    
    print("✅ app_config table created successfully")
    print("✅ Initial configuration values inserted")


def downgrade():
    """Drop app_config table"""
    
    # Drop index
    op.drop_index('ix_app_config_key', table_name='app_config')
    
    # Drop table
    op.drop_table('app_config')
    
    print("✅ app_config table dropped")
