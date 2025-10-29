"""
==========================================
SOCIAL MEDIA POSTER - MAIN APPLICATION
==========================================
Bestandslocatie: social_media_poster_backend/app/main.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/main.py

FastAPI main application entry point
✅ UPDATED: OAuth 2.0 authentication toegevoegd
✅ Auth router en middleware geïntegreerd
✅ UPDATED: Google Drive integration toegevoegd
"""

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from .core.config import settings
from .core.oauth_config import oauth_settings  # ✅ OAuth settings
from .core.database import get_db, check_db_connection, get_db_info
from .api import customers, events, photos, auth, drive  # ✅ NEW: Drive router toegevoegd
from .schemas.customer import HealthCheck

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version="2.1.0",  # ✅ UPDATED: Google Drive version
    description="API for Social Media Poster - Manage customers, events, photos, and automated posts with OAuth 2.0 authentication and Google Drive integration",
    debug=settings.DEBUG
)

# ✅ Configure CORS with OAuth settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=oauth_settings.CORS_ORIGINS,  # Use OAuth CORS settings
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers (auth router first!)
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)      # ✅ Auth endpoints
app.include_router(drive.router, prefix=settings.API_V1_PREFIX)     # ✅ NEW: Drive endpoints
app.include_router(customers.router, prefix=settings.API_V1_PREFIX)
app.include_router(events.router, prefix=settings.API_V1_PREFIX)
app.include_router(photos.router, prefix=settings.API_V1_PREFIX)


# Root endpoint
@app.get("/")
def read_root():
    """API information"""
    return {
        "message": "Welcome to Social Media Poster API with OAuth 2.0 & Google Drive",
        "version": "2.1.0",
        "authentication": "OAuth 2.0 / Google",
        "features": ["OAuth 2.0", "Google Drive Integration"],  # ✅ NEW
        "docs_url": "/docs",
        "redoc_url": "/redoc",
        "health_url": "/health",
        "auth_health_url": f"{settings.API_V1_PREFIX}/auth/health",
        "endpoints": {
            "auth": f"{settings.API_V1_PREFIX}/auth",
            "drive": f"{settings.API_V1_PREFIX}/drive",  # ✅ NEW
            "customers": f"{settings.API_V1_PREFIX}/customers",
            "events": f"{settings.API_V1_PREFIX}/events",
            "photos": f"{settings.API_V1_PREFIX}/photos"
        }
    }


# Health check endpoint
@app.get("/health", response_model=HealthCheck)
def health_check(db: Session = Depends(get_db)):
    """Health check endpoint - verify API and database are working"""
    db_connected = check_db_connection()
    
    return HealthCheck(
        status="healthy" if db_connected else "unhealthy",
        message="API is running" if db_connected else "Database connection failed",
        database_connected=db_connected,
        timestamp=datetime.now()
    )


# ✅ OAuth health check endpoint
@app.get("/auth-health")
def auth_health_check():
    """
    Check if OAuth 2.0 is properly configured
    
    Returns configuration status without exposing secrets
    """
    try:
        oauth_config_valid = (
            bool(oauth_settings.GOOGLE_CLIENT_ID) and
            bool(oauth_settings.GOOGLE_CLIENT_SECRET) and
            bool(oauth_settings.JWT_SECRET_KEY)
        )
        
        return {
            "status": "healthy" if oauth_config_valid else "unhealthy",
            "oauth_configured": oauth_config_valid,
            "google_client_id_set": bool(oauth_settings.GOOGLE_CLIENT_ID),
            "google_client_secret_set": bool(oauth_settings.GOOGLE_CLIENT_SECRET),
            "jwt_secret_set": bool(oauth_settings.JWT_SECRET_KEY),
            "encryption_key_set": bool(oauth_settings.ENCRYPTION_KEY),
            "redirect_uri": oauth_settings.OAUTH_REDIRECT_URI,
            "frontend_url": oauth_settings.FRONTEND_URL,
            "cors_origins": oauth_settings.CORS_ORIGINS
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "message": "OAuth configuration validation failed"
        }


# Database info endpoint (for debugging)
@app.get("/db-info")
def database_info():
    """Get database connection information (useful for debugging)"""
    return get_db_info()


# Startup event
@app.on_event("startup")
async def startup_event():
    """Actions to perform on application startup"""
    print(f"\n{'='*60}")
    print(f"🚀 Starting {settings.APP_NAME} v2.1.0 (OAuth + Drive)")
    print(f"{'='*60}")
    print(f"📊 Debug mode: {settings.DEBUG}")
    print(f"🗄️  Database: {settings.DATABASE_URL.split('@')[-1]}")
    print(f"🌐 CORS enabled for: {oauth_settings.CORS_ORIGINS}")
    print(f"\n🔐 OAuth 2.0 Configuration:")
    print(f"   Client ID: {'✅ Set' if oauth_settings.GOOGLE_CLIENT_ID else '❌ Missing'}")
    print(f"   Client Secret: {'✅ Set' if oauth_settings.GOOGLE_CLIENT_SECRET else '❌ Missing'}")
    print(f"   JWT Secret: {'✅ Set' if oauth_settings.JWT_SECRET_KEY else '❌ Missing'}")
    print(f"   Encryption Key: {'✅ Set' if oauth_settings.ENCRYPTION_KEY else '❌ Missing'}")
    print(f"   Redirect URI: {oauth_settings.OAUTH_REDIRECT_URI}")
    print(f"\n📁 Google Drive Integration:")
    print(f"   Scopes: drive.file, drive.metadata.readonly")
    print(f"   Dynamic Folder Creation: Enabled")
    print(f"\n🔌 API Endpoints:")
    print(f"   - Auth: {settings.API_V1_PREFIX}/auth")
    print(f"   - Drive: {settings.API_V1_PREFIX}/drive")  # ✅ NEW
    print(f"   - Customers: {settings.API_V1_PREFIX}/customers")
    print(f"   - Events: {settings.API_V1_PREFIX}/events")
    print(f"   - Photos: {settings.API_V1_PREFIX}/photos")
    
    # Check database connection
    print(f"\n🔌 Checking database connection...")
    if check_db_connection():
        print("✅ Database connection successful")
    else:
        print("❌ Database connection failed - check your settings")
    
    # Check OAuth configuration
    print(f"\n🔍 Checking OAuth configuration...")
    try:
        oauth_config_valid = (
            bool(oauth_settings.GOOGLE_CLIENT_ID) and
            bool(oauth_settings.GOOGLE_CLIENT_SECRET) and
            bool(oauth_settings.JWT_SECRET_KEY)
        )
        
        if oauth_config_valid:
            print("✅ OAuth 2.0 configuration valid")
        else:
            print("⚠️  OAuth 2.0 configuration incomplete - check .env file")
            print("   Required: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET_KEY")
    except Exception as e:
        print(f"❌ OAuth configuration validation failed: {e}")
    
    print(f"\n{'='*60}")
    print(f"✅ Server ready!")
    print(f"📚 API Docs: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"🔐 Auth Health: http://{settings.HOST}:{settings.PORT}/auth-health")
    print(f"📁 Drive Setup: {settings.API_V1_PREFIX}/drive/setup")  # ✅ NEW
    print(f"{'='*60}\n")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Actions to perform on application shutdown"""
    print("\n👋 Shutting down Social Media Poster API (OAuth + Drive version)")


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
