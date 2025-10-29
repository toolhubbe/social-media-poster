"""
JWT Token Utilities
File Location: app/core/jwt_utils.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/core/jwt_utils.py

JWT token creation, verification, and refresh for OAuth 2.0 authentication
"""

from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from fastapi import HTTPException, status
import hashlib

from .oauth_config import oauth_settings


# ============================================================================
# TOKEN CREATION
# ============================================================================

def create_access_token(
    data: Dict[str, Any],
    expires_delta: Optional[timedelta] = None
) -> str:
    """
    Create a JWT access token
    
    Args:
        data: Payload data to encode in token (should include user_id, email)
        expires_delta: Custom expiration time (default: from settings)
        
    Returns:
        Encoded JWT token string
    """
    to_encode = data.copy()
    
    # Set expiration
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=oauth_settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    # Add standard JWT claims
    to_encode.update({
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "token_type": "access"
    })
    
    # Encode token
    encoded_jwt = jwt.encode(
        to_encode,
        oauth_settings.JWT_SECRET_KEY,
        algorithm=oauth_settings.JWT_ALGORITHM
    )
    
    return encoded_jwt


def create_refresh_token(data: Dict[str, Any]) -> str:
    """
    Create a JWT refresh token
    
    Args:
        data: Payload data (usually just user_id)
        
    Returns:
        Encoded JWT refresh token string
    """
    to_encode = data.copy()
    
    # Set expiration (longer than access token)
    expire = datetime.now(timezone.utc) + timedelta(
        days=oauth_settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS
    )
    
    # Add standard JWT claims
    to_encode.update({
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "token_type": "refresh"
    })
    
    # Encode token
    encoded_jwt = jwt.encode(
        to_encode,
        oauth_settings.JWT_SECRET_KEY,
        algorithm=oauth_settings.JWT_ALGORITHM
    )
    
    return encoded_jwt


def create_token_pair(user_id: str, email: str) -> Dict[str, Any]:
    """
    Create both access and refresh tokens
    
    Args:
        user_id: User's UUID
        email: User's email
        
    Returns:
        Dict with access_token, refresh_token, expires_in
    """
    # Create access token
    access_token_data = {
        "sub": str(user_id),  # Subject (standard JWT claim)
        "email": email
    }
    access_token = create_access_token(access_token_data)
    
    # Create refresh token
    refresh_token_data = {
        "sub": str(user_id)
    }
    refresh_token = create_refresh_token(refresh_token_data)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": oauth_settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60  # seconds
    }


# ============================================================================
# TOKEN VERIFICATION
# ============================================================================

def verify_token(token: str, token_type: str = "access") -> Dict[str, Any]:
    """
    Verify and decode a JWT token
    
    Args:
        token: JWT token string
        token_type: Expected token type ('access' or 'refresh')
        
    Returns:
        Decoded token payload
        
    Raises:
        HTTPException: If token is invalid, expired, or wrong type
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode token
        payload = jwt.decode(
            token,
            oauth_settings.JWT_SECRET_KEY,
            algorithms=[oauth_settings.JWT_ALGORITHM]
        )
        
        # Verify token type
        if payload.get("token_type") != token_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token type. Expected {token_type}"
            )
        
        # Verify expiration (jose library does this automatically, but we can add custom logic)
        exp = payload.get("exp")
        if exp:
            exp_datetime = datetime.fromtimestamp(exp, tz=timezone.utc)
            if datetime.now(timezone.utc) >= exp_datetime:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token has expired"
                )
        
        # Verify required claims
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        
        return payload
        
    except JWTError as e:
        print(f"JWT Error: {e}")
        raise credentials_exception


def decode_token_no_verify(token: str) -> Optional[Dict[str, Any]]:
    """
    Decode token without verification (for debugging/logging only!)
    
    ⚠️ WARNING: Never use this for authentication!
    Only use for debugging, logging, or extracting non-sensitive info
    
    Args:
        token: JWT token string
        
    Returns:
        Decoded payload or None if invalid
    """
    try:
        # Decode without verification
        payload = jwt.decode(
            token,
            options={"verify_signature": False, "verify_exp": False}
        )
        return payload
    except Exception as e:
        print(f"Error decoding token: {e}")
        return None


# ============================================================================
# TOKEN HASHING
# ============================================================================

def hash_token(token: str) -> str:
    """
    Create a hash of a token for storage
    
    Used for:
    - Storing token hashes in database (never store raw tokens!)
    - Comparing tokens securely
    
    Args:
        token: Token string to hash
        
    Returns:
        SHA-256 hash of the token
    """
    return hashlib.sha256(token.encode()).hexdigest()


def verify_token_hash(token: str, token_hash: str) -> bool:
    """
    Verify a token matches a stored hash
    
    Args:
        token: Raw token string
        token_hash: Stored hash to compare against
        
    Returns:
        True if token matches hash
    """
    return hash_token(token) == token_hash


# ============================================================================
# TOKEN EXTRACTION
# ============================================================================

def extract_user_id_from_token(token: str) -> str:
    """
    Extract user_id from token without full verification
    
    Use this when you need the user_id quickly and will verify later
    
    Args:
        token: JWT token string
        
    Returns:
        User ID string
        
    Raises:
        HTTPException: If token is invalid
    """
    payload = verify_token(token, token_type="access")
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID not found in token"
        )
    
    return user_id


def extract_email_from_token(token: str) -> str:
    """
    Extract email from token
    
    Args:
        token: JWT token string
        
    Returns:
        Email string
        
    Raises:
        HTTPException: If token is invalid or email not in token
    """
    payload = verify_token(token, token_type="access")
    email = payload.get("email")
    
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not found in token"
        )
    
    return email


# ============================================================================
# TOKEN ENCRYPTION (for storing refresh tokens in database)
# ============================================================================

def encrypt_refresh_token(token: str) -> str:
    """
    Encrypt a refresh token for secure storage
    
    Uses Fernet symmetric encryption with key from settings
    
    Args:
        token: Raw refresh token string
        
    Returns:
        Encrypted token string
    """
    if not oauth_settings.ENCRYPTION_KEY:
        # If no encryption key, store as-is (NOT RECOMMENDED FOR PRODUCTION!)
        print("⚠️  Warning: No encryption key set. Refresh tokens stored unencrypted!")
        return token
    
    try:
        from cryptography.fernet import Fernet
        
        fernet = Fernet(oauth_settings.ENCRYPTION_KEY.encode())
        encrypted = fernet.encrypt(token.encode())
        return encrypted.decode()
        
    except Exception as e:
        print(f"❌ Error encrypting token: {e}")
        # Fallback to unencrypted (not ideal!)
        return token


def decrypt_refresh_token(encrypted_token: str) -> str:
    """
    Decrypt a stored refresh token
    
    Args:
        encrypted_token: Encrypted token string
        
    Returns:
        Decrypted token string
    """
    if not oauth_settings.ENCRYPTION_KEY:
        # If no encryption key, assume token is unencrypted
        return encrypted_token
    
    try:
        from cryptography.fernet import Fernet
        
        fernet = Fernet(oauth_settings.ENCRYPTION_KEY.encode())
        decrypted = fernet.decrypt(encrypted_token.encode())
        return decrypted.decode()
        
    except Exception as e:
        print(f"❌ Error decrypting token: {e}")
        # Try returning as-is (might be unencrypted)
        return encrypted_token


# ============================================================================
# TOKEN VALIDATION HELPERS
# ============================================================================

def is_token_expired(token: str) -> bool:
    """
    Check if a token is expired without raising an exception
    
    Args:
        token: JWT token string
        
    Returns:
        True if expired, False if valid
    """
    try:
        verify_token(token)
        return False
    except HTTPException as e:
        if "expired" in str(e.detail).lower():
            return True
        return False


def get_token_expiration(token: str) -> Optional[datetime]:
    """
    Get expiration datetime from token
    
    Args:
        token: JWT token string
        
    Returns:
        Expiration datetime or None
    """
    try:
        payload = decode_token_no_verify(token)
        if payload and "exp" in payload:
            return datetime.fromtimestamp(payload["exp"], tz=timezone.utc)
        return None
    except:
        return None


def get_token_issued_at(token: str) -> Optional[datetime]:
    """
    Get issued-at datetime from token
    
    Args:
        token: JWT token string
        
    Returns:
        Issued-at datetime or None
    """
    try:
        payload = decode_token_no_verify(token)
        if payload and "iat" in payload:
            return datetime.fromtimestamp(payload["iat"], tz=timezone.utc)
        return None
    except:
        return None


# ============================================================================
# TESTING / DEBUGGING HELPERS
# ============================================================================

def create_test_token(user_id: str, email: str, expires_minutes: int = 60) -> str:
    """
    Create a test token with custom expiration (for testing only!)
    
    Args:
        user_id: User ID
        email: User email
        expires_minutes: Expiration in minutes
        
    Returns:
        JWT token string
    """
    data = {"sub": user_id, "email": email}
    expires_delta = timedelta(minutes=expires_minutes)
    return create_access_token(data, expires_delta)


def print_token_info(token: str):
    """
    Print token information (for debugging)
    
    Args:
        token: JWT token string
    """
    payload = decode_token_no_verify(token)
    
    if not payload:
        print("❌ Invalid token")
        return
    
    print("\n" + "="*60)
    print("🔐 TOKEN INFORMATION")
    print("="*60)
    
    print(f"\nUser ID: {payload.get('sub')}")
    print(f"Email: {payload.get('email')}")
    print(f"Token Type: {payload.get('token_type')}")
    
    if 'iat' in payload:
        iat = datetime.fromtimestamp(payload['iat'], tz=timezone.utc)
        print(f"Issued At: {iat.isoformat()}")
    
    if 'exp' in payload:
        exp = datetime.fromtimestamp(payload['exp'], tz=timezone.utc)
        print(f"Expires At: {exp.isoformat()}")
        
        now = datetime.now(timezone.utc)
        if now >= exp:
            print("Status: ❌ EXPIRED")
        else:
            remaining = exp - now
            print(f"Status: ✅ VALID (expires in {remaining})")
    
    print("\n" + "="*60 + "\n")


# ============================================================================
# USAGE EXAMPLE
# ============================================================================

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🔐 JWT UTILITIES TEST")
    print("="*60 + "\n")
    
    # Create test tokens
    user_id = "123e4567-e89b-12d3-a456-426614174000"
    email = "test@example.com"
    
    print("1. Creating token pair...")
    tokens = create_token_pair(user_id, email)
    
    print(f"\n   Access Token: {tokens['access_token'][:50]}...")
    print(f"   Refresh Token: {tokens['refresh_token'][:50]}...")
    print(f"   Expires In: {tokens['expires_in']} seconds")
    
    print("\n2. Verifying access token...")
    try:
        payload = verify_token(tokens['access_token'], token_type="access")
        print(f"   ✅ Token valid!")
        print(f"   User ID: {payload['sub']}")
        print(f"   Email: {payload['email']}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    print("\n3. Token information:")
    print_token_info(tokens['access_token'])
    
    print("="*60 + "\n")
