"""
==========================================
SOCIAL MEDIA POSTER - DATABASE CONNECTION
==========================================
Bestandslocatie: app/core/database.py

Dit bestand bevat database connectie en session management
"""

from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
from .config import settings

# Create SQLAlchemy engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10
)

# Create SessionLocal class
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Create Base class for models
Base = declarative_base()


# Dependency to get DB session
def get_db() -> Generator[Session, None, None]:
    """
    Database session dependency.
    
    Usage in FastAPI endpoints:
        @app.get("/customers")
        def get_customers(db: Session = Depends(get_db)):
            return db.query(Customer).all()
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Database utility functions
def init_db() -> None:
    """
    Initialize database - create all tables.
    This is useful for development.
    In production, use Alembic migrations instead.
    """
    Base.metadata.create_all(bind=engine)


def check_db_connection() -> bool:
    """
    Check if database connection is working.
    Returns True if connection successful, False otherwise.
    """
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False


def get_db_info() -> dict:
    """
    Get database connection information.
    Useful for health checks and debugging.
    """
    return {
        "database_url": settings.DATABASE_URL.split("@")[-1],
        "pool_size": engine.pool.size(),
        "checked_out_connections": engine.pool.checkedout(),
        "overflow": engine.pool.overflow(),
        "is_connected": check_db_connection()
    }
