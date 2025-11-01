"""Add address fields to customers table

Revision ID: 005_add_address_fields
Revises: 004_drive_subfolders
Create Date: 2025-11-01 22:30:00.000000

Adds full address fields and notes to customers table:
- street (straat)
- house_number (huisnummer)
- house_number_addition (toevoeging - A, bis, etc)
- postal_code (postcode)
- city (gemeente/stad)
- country (land - default Nederland)
- notes (algemene notities)
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '005_add_address_fields'
down_revision = '004_drive_subfolders'  # Links naar je laatste migratie
branch_labels = None
depends_on = None


def upgrade():
    """Add address and notes columns to customers table"""
    
    print("=" * 80)
    print("🔧 Adding address fields to customers table...")
    print("=" * 80)
    
    # Add address fields
    op.add_column('customers', sa.Column('street', sa.String(255), nullable=True))
    print("  ✅ Added: street")
    
    op.add_column('customers', sa.Column('house_number', sa.String(20), nullable=True))
    print("  ✅ Added: house_number")
    
    op.add_column('customers', sa.Column('house_number_addition', sa.String(10), nullable=True))
    print("  ✅ Added: house_number_addition")
    
    op.add_column('customers', sa.Column('postal_code', sa.String(20), nullable=True))
    print("  ✅ Added: postal_code")
    
    op.add_column('customers', sa.Column('city', sa.String(100), nullable=True))
    print("  ✅ Added: city")
    
    op.add_column('customers', sa.Column('country', sa.String(100), nullable=True, server_default='Nederland'))
    print("  ✅ Added: country (default: Nederland)")
    
    # Add notes field for general customer notes
    op.add_column('customers', sa.Column('notes', sa.Text, nullable=True))
    print("  ✅ Added: notes")
    
    print("=" * 80)
    print("✅ Migration completed successfully!")
    print("=" * 80)


def downgrade():
    """Remove address and notes columns from customers table"""
    
    print("=" * 80)
    print("🔧 Removing address fields from customers table...")
    print("=" * 80)
    
    # Remove address fields
    op.drop_column('customers', 'street')
    print("  ❌ Removed: street")
    
    op.drop_column('customers', 'house_number')
    print("  ❌ Removed: house_number")
    
    op.drop_column('customers', 'house_number_addition')
    print("  ❌ Removed: house_number_addition")
    
    op.drop_column('customers', 'postal_code')
    print("  ❌ Removed: postal_code")
    
    op.drop_column('customers', 'city')
    print("  ❌ Removed: city")
    
    op.drop_column('customers', 'country')
    print("  ❌ Removed: country")
    
    # Remove notes field
    op.drop_column('customers', 'notes')
    print("  ❌ Removed: notes")
    
    print("=" * 80)
    print("✅ Rollback completed successfully!")
    print("=" * 80)
