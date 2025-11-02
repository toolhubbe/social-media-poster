"""Fix all created_by columns across customers, events, and photos tables

Revision ID: 007_fix_created_by_columns
Revises: 006_add_created_by
Create Date: 2025-11-02 15:30:00.000000

File Location: backend/alembic/versions/007_fix_created_by_columns.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/alembic/versions/007_fix_created_by_columns.py

This migration fixes the created_by column inconsistencies:

CUSTOMERS:
- Renames created_by → created_by_name (String for legacy support)
- Renames created_by_user_id → created_by (UUID with FK to users)

EVENTS:
- Removes duplicate created_by_user_id column
- Keeps created_by (UUID) as is

PHOTOS:
- Renames created_by_user_id → created_by (UUID with FK to users)
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '007_fix_created_by_columns'
down_revision = '006_add_created_by'
branch_labels = None
depends_on = None


def upgrade():
    """
    Fix created_by columns to match SQLAlchemy models
    """
    print("\n" + "="*80)
    print("🔧 MIGRATION 007: Fixing created_by columns")
    print("="*80)
    
    # ============================================================================
    # 1. FIX CUSTOMERS TABLE
    # ============================================================================
    print("\n📦 Fixing CUSTOMERS table...")
    
    # Step 1: Rename created_by → created_by_name
    print("   1️⃣  Renaming created_by → created_by_name...")
    op.alter_column('customers', 'created_by', new_column_name='created_by_name')
    print("      ✅ created_by → created_by_name")
    
    # Step 2: Drop FK constraint on created_by_user_id
    print("   2️⃣  Dropping FK constraint on created_by_user_id...")
    try:
        op.drop_constraint('fk_customers_created_by', 'customers', type_='foreignkey')
        print("      ✅ FK constraint dropped")
    except Exception as e:
        print(f"      ⚠️  FK constraint not found or already dropped: {e}")
    
    # Step 3: Drop index on created_by_user_id
    print("   3️⃣  Dropping index on created_by_user_id...")
    try:
        op.drop_index('idx_customers_created_by', 'customers')
        print("      ✅ Index dropped")
    except Exception as e:
        print(f"      ⚠️  Index not found or already dropped: {e}")
    
    # Step 4: Rename created_by_user_id → created_by
    print("   4️⃣  Renaming created_by_user_id → created_by...")
    op.alter_column('customers', 'created_by_user_id', new_column_name='created_by')
    print("      ✅ created_by_user_id → created_by")
    
    # Step 5: Add FK constraint on new created_by
    print("   5️⃣  Adding FK constraint on created_by...")
    op.create_foreign_key(
        'fk_customers_created_by',
        'customers',
        'users',
        ['created_by'],
        ['user_id']
    )
    print("      ✅ FK constraint added")
    
    # Step 6: Add index on created_by
    print("   6️⃣  Adding index on created_by...")
    op.create_index('idx_customers_created_by', 'customers', ['created_by'])
    print("      ✅ Index added")
    
    print("✅ CUSTOMERS table fixed!")
    
    # ============================================================================
    # 2. FIX EVENTS TABLE
    # ============================================================================
    print("\n📦 Fixing EVENTS table...")
    
    # Drop duplicate created_by_user_id column
    print("   1️⃣  Dropping duplicate created_by_user_id column...")
    
    # First drop FK constraint
    try:
        op.drop_constraint('fk_events_created_by', 'events', type_='foreignkey')
        print("      ✅ FK constraint on created_by_user_id dropped")
    except Exception as e:
        print(f"      ⚠️  FK constraint not found: {e}")
    
    # Drop index
    try:
        op.drop_index('idx_events_created_by', 'events')
        print("      ✅ Index on created_by_user_id dropped")
    except Exception as e:
        print(f"      ⚠️  Index not found: {e}")
    
    # Drop the column
    op.drop_column('events', 'created_by_user_id')
    print("      ✅ created_by_user_id column dropped")
    
    print("✅ EVENTS table fixed!")
    
    # ============================================================================
    # 3. FIX PHOTOS TABLE
    # ============================================================================
    print("\n📦 Fixing PHOTOS table...")
    
    # Step 1: Drop FK constraint on created_by_user_id
    print("   1️⃣  Dropping FK constraint on created_by_user_id...")
    try:
        op.drop_constraint('fk_photos_created_by', 'photos', type_='foreignkey')
        print("      ✅ FK constraint dropped")
    except Exception as e:
        print(f"      ⚠️  FK constraint not found: {e}")
    
    # Step 2: Drop index on created_by_user_id
    print("   2️⃣  Dropping index on created_by_user_id...")
    try:
        op.drop_index('idx_photos_created_by', 'photos')
        print("      ✅ Index dropped")
    except Exception as e:
        print(f"      ⚠️  Index not found: {e}")
    
    # Step 3: Rename created_by_user_id → created_by
    print("   3️⃣  Renaming created_by_user_id → created_by...")
    op.alter_column('photos', 'created_by_user_id', new_column_name='created_by')
    print("      ✅ created_by_user_id → created_by")
    
    # Step 4: Add FK constraint on new created_by
    print("   4️⃣  Adding FK constraint on created_by...")
    op.create_foreign_key(
        'fk_photos_created_by',
        'photos',
        'users',
        ['created_by'],
        ['user_id']
    )
    print("      ✅ FK constraint added")
    
    # Step 5: Add index on created_by
    print("   5️⃣  Adding index on created_by...")
    op.create_index('idx_photos_created_by', 'photos', ['created_by'])
    print("      ✅ Index added")
    
    print("✅ PHOTOS table fixed!")
    
    # ============================================================================
    # SUMMARY
    # ============================================================================
    print("\n" + "="*80)
    print("🎉 MIGRATION 007 COMPLETE!")
    print("="*80)
    print("\n✅ Summary of changes:")
    print("   CUSTOMERS:")
    print("     - created_by → created_by_name (String)")
    print("     - created_by_user_id → created_by (UUID with FK)")
    print("   EVENTS:")
    print("     - Removed duplicate created_by_user_id column")
    print("     - created_by remains (UUID with FK)")
    print("   PHOTOS:")
    print("     - created_by_user_id → created_by (UUID with FK)")
    print("\n🔗 All tables now have consistent created_by columns!")
    print("="*80 + "\n")


def downgrade():
    """
    Reverse all changes (for rollback)
    """
    print("\n" + "="*80)
    print("⚠️  ROLLING BACK MIGRATION 007")
    print("="*80)
    
    # ============================================================================
    # 1. ROLLBACK PHOTOS TABLE
    # ============================================================================
    print("\n📦 Rolling back PHOTOS table...")
    
    # Drop FK and index
    op.drop_index('idx_photos_created_by', 'photos')
    op.drop_constraint('fk_photos_created_by', 'photos', type_='foreignkey')
    
    # Rename back
    op.alter_column('photos', 'created_by', new_column_name='created_by_user_id')
    
    # Recreate old FK and index
    op.create_foreign_key(
        'fk_photos_created_by',
        'photos',
        'users',
        ['created_by_user_id'],
        ['user_id']
    )
    op.create_index('idx_photos_created_by', 'photos', ['created_by_user_id'])
    
    print("✅ PHOTOS table rolled back")
    
    # ============================================================================
    # 2. ROLLBACK EVENTS TABLE
    # ============================================================================
    print("\n📦 Rolling back EVENTS table...")
    
    # Recreate created_by_user_id column
    op.add_column('events', sa.Column('created_by_user_id', postgresql.UUID(as_uuid=True), nullable=True))
    
    # Add FK and index
    op.create_foreign_key(
        'fk_events_created_by',
        'events',
        'users',
        ['created_by_user_id'],
        ['user_id']
    )
    op.create_index('idx_events_created_by', 'events', ['created_by_user_id'])
    
    print("✅ EVENTS table rolled back")
    
    # ============================================================================
    # 3. ROLLBACK CUSTOMERS TABLE
    # ============================================================================
    print("\n📦 Rolling back CUSTOMERS table...")
    
    # Drop FK and index on created_by
    op.drop_index('idx_customers_created_by', 'customers')
    op.drop_constraint('fk_customers_created_by', 'customers', type_='foreignkey')
    
    # Rename back
    op.alter_column('customers', 'created_by', new_column_name='created_by_user_id')
    op.alter_column('customers', 'created_by_name', new_column_name='created_by')
    
    # Recreate old FK and index
    op.create_foreign_key(
        'fk_customers_created_by',
        'customers',
        'users',
        ['created_by_user_id'],
        ['user_id']
    )
    op.create_index('idx_customers_created_by', 'customers', ['created_by_user_id'])
    
    print("✅ CUSTOMERS table rolled back")
    
    print("\n" + "="*80)
    print("✅ ROLLBACK COMPLETE")
    print("="*80 + "\n")
