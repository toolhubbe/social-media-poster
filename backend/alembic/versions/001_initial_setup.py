"""Initial database setup - Create all tables

Revision ID: 001_initial_setup
Revises: None
Create Date: 2025-11-01 13:00:00

File Location: alembic/versions/001_initial_setup.py
Full Path: backend/alembic/versions/001_initial_setup.py

This migration creates ALL tables for the Social Media Poster application:
- users (with OAuth 2.0 support)
- user_drive_folders
- oauth_sessions
- audit_logs
- customers
- events
- photos
- app_config

âš ï¸ IMPORTANT: This is a complete reset migration. 
   Run this AFTER dropping all existing tables and resetting alembic_version.
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import uuid

# revision identifiers, used by Alembic.
revision = '001_initial_setup'
down_revision = None  # This is the first migration
branch_labels = None
depends_on = None


def upgrade():
    """Create all tables"""
    
    print("🚀 Starting initial database setup...")
    
    # ============================================================
    # 1. CREATE USERS TABLE
    # ============================================================
    print("📝 Creating users table...")
    op.create_table(
        'users',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('google_user_id', sa.String(255), nullable=False, unique=True),
        sa.Column('email', sa.String(255), nullable=False, unique=True),
        sa.Column('email_verified', sa.Boolean(), default=False),
        sa.Column('full_name', sa.String(255)),
        sa.Column('given_name', sa.String(100)),
        sa.Column('family_name', sa.String(100)),
        sa.Column('picture_url', sa.Text()),
        sa.Column('locale', sa.String(10), default='en'),
        sa.Column('google_refresh_token', sa.Text()),
        sa.Column('google_access_token', sa.Text()),
        sa.Column('token_expires_at', sa.DateTime(timezone=True)),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('is_superuser', sa.Boolean(), default=False),
        sa.Column('subscription_status', sa.String(50), default='trial'),
        sa.Column('subscription_expires_at', sa.DateTime(timezone=True)),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('last_login_at', sa.DateTime(timezone=True)),
        sa.PrimaryKeyConstraint('user_id')
    )
    
    # Create indexes for users table
    op.create_index('ix_users_google_user_id', 'users', ['google_user_id'])
    op.create_index('ix_users_email', 'users', ['email'])
    op.create_index('ix_users_is_active', 'users', ['is_active'])
    op.create_index('ix_users_subscription_status', 'users', ['subscription_status'])
    
    print("✅ Users table created with all indexes")
    
    # ============================================================
    # 2. CREATE USER_DRIVE_FOLDERS TABLE
    # ============================================================
    print("📝 Creating user_drive_folders table...")
    op.create_table(
        'user_drive_folders',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False, unique=True),
        sa.Column('parent_folder_id', sa.String(255), nullable=False),
        sa.Column('parent_folder_name', sa.String(255), default='Social_Media_Poster'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    
    op.create_index('ix_user_drive_folders_user_id', 'user_drive_folders', ['user_id'])
    print("✅ User drive folders table created")
    
    # ============================================================
    # 3. CREATE OAUTH_SESSIONS TABLE
    # ============================================================
    print("📝 Creating oauth_sessions table...")
    op.create_table(
        'oauth_sessions',
        sa.Column('session_id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('access_token_hash', sa.String(255), nullable=False, unique=True),
        sa.Column('refresh_token_hash', sa.String(255)),
        sa.Column('ip_address', sa.String(45)),
        sa.Column('user_agent', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('last_used_at', sa.DateTime(timezone=True)),
        sa.Column('is_revoked', sa.Boolean(), default=False),
        sa.Column('revoked_at', sa.DateTime(timezone=True)),
        sa.Column('revoked_reason', sa.String(255)),
        sa.PrimaryKeyConstraint('session_id')
    )
    
    op.create_index('ix_oauth_sessions_user_id', 'oauth_sessions', ['user_id'])
    op.create_index('ix_oauth_sessions_access_token_hash', 'oauth_sessions', ['access_token_hash'])
    op.create_index('ix_oauth_sessions_expires_at', 'oauth_sessions', ['expires_at'])
    print("✅ OAuth sessions table created")
    
    # ============================================================
    # 4. CREATE AUDIT_LOGS TABLE
    # ============================================================
    print("📝 Creating audit_logs table...")
    op.create_table(
        'audit_logs',
        sa.Column('log_id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('user_id', postgresql.UUID(as_uuid=True)),
        sa.Column('action', sa.String(100), nullable=False),
        sa.Column('entity_type', sa.String(50)),
        sa.Column('entity_id', postgresql.UUID(as_uuid=True)),
        sa.Column('details', sa.Text()),
        sa.Column('ip_address', sa.String(45)),
        sa.Column('user_agent', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('log_id')
    )
    
    op.create_index('ix_audit_logs_user_id', 'audit_logs', ['user_id'])
    op.create_index('ix_audit_logs_action', 'audit_logs', ['action'])
    op.create_index('ix_audit_logs_entity_type', 'audit_logs', ['entity_type'])
    op.create_index('ix_audit_logs_created_at', 'audit_logs', ['created_at'])
    print("✅ Audit logs table created")
    
    # ============================================================
    # 5. CREATE CUSTOMERS TABLE
    # ============================================================
    print("📝 Creating customers table...")
    op.create_table(
        'customers',
        sa.Column('customer_id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('email', sa.String(255), nullable=False, unique=True),
        sa.Column('first_name', sa.String(100)),
        sa.Column('last_name', sa.String(100)),
        sa.Column('company_name', sa.String(255)),
        sa.Column('phone', sa.String(50)),
        sa.Column('google_drive_folder_id', sa.String(255)),
        sa.Column('google_sheet_row_number', sa.Integer()),
        sa.Column('status', sa.String(50), default='active'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
        sa.Column('created_by', sa.String(100), default='system'),
        sa.PrimaryKeyConstraint('customer_id')
    )
    
    op.create_index('ix_customers_email', 'customers', ['email'])
    op.create_index('ix_customers_status', 'customers', ['status'])
    print("✅ Customers table created")
    
    # ============================================================
    # 6. CREATE EVENTS TABLE
    # ============================================================
    print("📝 Creating events table...")
    op.create_table(
        'events',
        sa.Column('event_id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('customer_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('event_name', sa.String(255), nullable=False),
        sa.Column('event_type', sa.String(100)),
        sa.Column('event_date', sa.DateTime()),
        sa.Column('location_city', sa.String(100)),
        sa.Column('location_venue', sa.String(255)),
        sa.Column('description', sa.Text()),
        sa.Column('folder_name', sa.String(255)),
        sa.Column('google_drive_folder_id', sa.String(255)),
        sa.Column('status', sa.String(50), default='draft', nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('archived', sa.Boolean(), default=False),
        sa.PrimaryKeyConstraint('event_id'),
        sa.ForeignKeyConstraint(['customer_id'], ['customers.customer_id'], ondelete='CASCADE')
    )
    
    op.create_index('ix_events_event_id', 'events', ['event_id'])
    op.create_index('ix_events_customer_id', 'events', ['customer_id'])
    print("✅ Events table created")
    
    # ============================================================
    # 7. CREATE PHOTOS TABLE
    # ============================================================
    print("📝 Creating photos table...")
    op.create_table(
        'photos',
        sa.Column('photo_id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('event_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('filename', sa.String(255), nullable=False),
        sa.Column('original_filename', sa.String(255), nullable=False),
        sa.Column('file_size', sa.Integer()),
        sa.Column('mime_type', sa.String(100)),
        sa.Column('width', sa.Integer()),
        sa.Column('height', sa.Integer()),
        sa.Column('google_drive_file_id', sa.String(255), unique=True),
        sa.Column('google_drive_url', sa.Text()),
        sa.Column('thumbnail_url', sa.Text()),
        sa.Column('description', sa.Text()),
        sa.Column('display_order', sa.Integer(), default=0),
        sa.Column('is_featured', sa.Boolean(), default=False),
        sa.Column('uploaded_at', sa.DateTime(), nullable=False),
        sa.Column('uploaded_by', sa.String(100)),
        sa.Column('status', sa.String(50), default='active', nullable=False),
        sa.Column('archived', sa.Boolean(), default=False),
        sa.PrimaryKeyConstraint('photo_id'),
        sa.ForeignKeyConstraint(['event_id'], ['events.event_id'], ondelete='CASCADE')
    )
    
    op.create_index('ix_photos_photo_id', 'photos', ['photo_id'])
    op.create_index('ix_photos_event_id', 'photos', ['event_id'])
    print("✅ Photos table created")
    
    # ============================================================
    # 8. CREATE APP_CONFIG TABLE
    # ============================================================
    print("📝 Creating app_config table...")
    op.create_table(
        'app_config',
        sa.Column('config_id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('key', sa.String(255), nullable=False, unique=True),
        sa.Column('value', sa.Text(), nullable=False),
        sa.Column('description', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('config_id')
    )
    
    op.create_index('ix_app_config_key', 'app_config', ['key'])
    print("✅ App config table created")
    
    # Insert initial configuration values
    print("📝 Inserting initial configuration values...")
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
    
    print("✅ Initial configuration values inserted")
    print("\n" + "="*60)
    print("🎉 DATABASE SETUP COMPLETE!")
    print("="*60)
    print("\nCreated tables:")
    print("  ✅ users")
    print("  ✅ user_drive_folders")
    print("  ✅ oauth_sessions")
    print("  ✅ audit_logs")
    print("  ✅ customers")
    print("  ✅ events")
    print("  ✅ photos")
    print("  ✅ app_config")
    print("="*60)


def downgrade():
    """Drop all tables"""
    
    print("⚠️  Dropping all tables...")
    
    # Drop tables in reverse order (respect foreign keys)
    op.drop_table('app_config')
    op.drop_table('photos')
    op.drop_table('events')
    op.drop_table('customers')
    op.drop_table('audit_logs')
    op.drop_table('oauth_sessions')
    op.drop_table('user_drive_folders')
    op.drop_table('users')
    
    print("✅ All tables dropped")
