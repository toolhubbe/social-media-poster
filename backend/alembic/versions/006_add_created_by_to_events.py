"""006_add_created_by_to_events

Revision ID: 006_add_created_by
Revises: 005_add_address_fields
Create Date: 2025-11-01

Add created_by column to events table for tracking who created each event

File Location: backend/alembic/versions/006_add_created_by_to_events.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/alembic/versions/006_add_created_by_to_events.py
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '006_add_created_by'
down_revision = '005_add_address_fields'
branch_labels = None
depends_on = None


def upgrade():
    """
    Add created_by column to events table
    
    This column tracks which user created each event.
    It's nullable to allow migration of existing events.
    """
    # Add created_by column to events table
    op.add_column('events', 
        sa.Column('created_by', postgresql.UUID(as_uuid=True), nullable=True)
    )
    
    # Add foreign key constraint
    op.create_foreign_key(
        'fk_events_created_by_users',  # constraint name
        'events',                      # source table
        'users',                       # referenced table
        ['created_by'],                # source column
        ['user_id']                    # referenced column
    )
    
    # Add index for better query performance
    op.create_index(
        'ix_events_created_by',
        'events',
        ['created_by']
    )
    
    print("✅ Added created_by column to events table")


def downgrade():
    """
    Remove created_by column from events table
    """
    # Drop index first
    op.drop_index('ix_events_created_by', table_name='events')
    
    # Drop foreign key constraint
    op.drop_constraint('fk_events_created_by_users', 'events', type_='foreignkey')
    
    # Drop column
    op.drop_column('events', 'created_by')
    
    print("✅ Removed created_by column from events table")
