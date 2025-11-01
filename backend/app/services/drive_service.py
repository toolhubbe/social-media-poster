"""
Google Drive Service
File Location: backend/app/services/drive_service.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/backend/app/services/drive_service.py

Handles all Google Drive API operations using user's OAuth token:
- Folder creation
- Folder sharing
- Permission management
- Folder search

✅ USER OAUTH: All operations use user's Google OAuth access token
✅ NO SERVICE ACCOUNT: Direct integration with user's personal Drive
"""

import httpx
from typing import List, Dict, Optional, Tuple
from fastapi import HTTPException, status


class DriveService:
    """
    Google Drive API Service
    
    Uses user's OAuth access token for all Drive operations.
    Each user operates on their own Google Drive.
    """
    
    DRIVE_API_BASE = "https://www.googleapis.com/drive/v3"
    
    def __init__(self, access_token: str):
        """
        Initialize Drive service with OAuth access token
        
        Args:
            access_token: Google OAuth access token from authenticated user
        """
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
    
    async def create_folder(
        self, 
        folder_name: str, 
        parent_id: Optional[str] = None
    ) -> Dict:
        """
        Create a new folder in Google Drive
        
        Args:
            folder_name: Name of the folder to create
            parent_id: Optional parent folder ID (None = root)
        
        Returns:
            Dict with folder info: {id, name, webViewLink}
        
        Raises:
            HTTPException if creation fails
        """
        try:
            metadata = {
                "name": folder_name,
                "mimeType": "application/vnd.google-apps.folder"
            }
            
            # Add parent if specified
            if parent_id:
                metadata["parents"] = [parent_id]
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.DRIVE_API_BASE}/files",
                    headers=self.headers,
                    json=metadata,
                    params={"fields": "id,name,webViewLink,parents"}
                )
                
                if response.status_code == 200:
                    folder_data = response.json()
                    print(f"✅ Folder created: {folder_data['name']} (ID: {folder_data['id']})")
                    return folder_data
                else:
                    error_msg = response.text
                    print(f"❌ Failed to create folder: {error_msg}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Failed to create folder: {error_msg}"
                    )
        
        except httpx.TimeoutException:
            print(f"❌ Timeout creating folder")
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Request to Google Drive timed out"
            )
        except httpx.HTTPError as e:
            print(f"❌ HTTP error creating folder: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error communicating with Google Drive: {str(e)}"
            )
        except HTTPException:
            raise
        except Exception as e:
            print(f"❌ Unexpected error creating folder: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unexpected error: {str(e)}"
            )
    
    async def share_folder(
        self,
        folder_id: str,
        email: str,
        role: str = "writer",
        send_notification: bool = True
    ) -> Dict:
        """
        Share a folder with a user
        
        Args:
            folder_id: ID of the folder to share
            email: Email address of user to share with
            role: Permission role (reader, writer, commenter, owner)
            send_notification: Whether to send email notification
        
        Returns:
            Dict with permission info
        
        Note:
            Does not raise exceptions on failure, returns error dict instead
        """
        try:
            permission_data = {
                "type": "user",
                "role": role,
                "emailAddress": email
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.DRIVE_API_BASE}/files/{folder_id}/permissions",
                    headers=self.headers,
                    json=permission_data,
                    params={
                        "sendNotificationEmail": str(send_notification).lower(),
                        "fields": "id,type,emailAddress,role"
                    }
                )
                
                if response.status_code == 200:
                    permission = response.json()
                    print(f"✅ Folder shared with {email} as {role}")
                    return permission
                else:
                    error_msg = response.text
                    print(f"⚠️ Failed to share with {email}: {error_msg}")
                    return {"error": error_msg, "email": email}
        
        except Exception as e:
            print(f"⚠️ Error sharing folder: {e}")
            return {"error": str(e), "email": email}
    
    async def share_with_multiple(
        self,
        folder_id: str,
        emails: List[str],
        role: str = "writer"
    ) -> List[Dict]:
        """
        Share folder with multiple users
        
        Args:
            folder_id: ID of folder to share
            emails: List of email addresses
            role: Permission role for all users
        
        Returns:
            List of permission results
        """
        results = []
        
        for email in emails:
            result = await self.share_folder(
                folder_id=folder_id,
                email=email,
                role=role,
                send_notification=True
            )
            results.append({
                "email": email,
                "success": "error" not in result,
                "details": result
            })
        
        return results
    
    async def find_folder_by_name(
        self,
        folder_name: str,
        parent_id: Optional[str] = None
    ) -> Optional[Dict]:
        """
        Search for a folder by name
        
        Args:
            folder_name: Name of folder to find
            parent_id: Optional parent folder ID to search in
        
        Returns:
            Folder info dict if found, None otherwise
        """
        try:
            # Build query
            query_parts = [
                f"name='{folder_name}'",
                "mimeType='application/vnd.google-apps.folder'",
                "trashed=false"
            ]
            
            if parent_id:
                query_parts.append(f"'{parent_id}' in parents")
            
            query = " and ".join(query_parts)
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{self.DRIVE_API_BASE}/files",
                    headers=self.headers,
                    params={
                        "q": query,
                        "fields": "files(id,name,webViewLink,parents,owners)",
                        "spaces": "drive"
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    files = data.get("files", [])
                    
                    if files:
                        folder = files[0]  # Return first match
                        print(f"✅ Found folder: {folder['name']} (ID: {folder['id']})")
                        return folder
                    else:
                        print(f"ℹ️ Folder '{folder_name}' not found")
                        return None
                else:
                    print(f"⚠️ Search failed: {response.text}")
                    return None
        
        except Exception as e:
            print(f"❌ Error searching for folder: {e}")
            return None
    
    async def get_folder_info(self, folder_id: str) -> Optional[Dict]:
        """
        Get detailed info about a folder
        
        Args:
            folder_id: ID of folder
        
        Returns:
            Folder info dict or None if not found/accessible
        """
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{self.DRIVE_API_BASE}/files/{folder_id}",
                    headers=self.headers,
                    params={
                        "fields": "id,name,webViewLink,parents,owners,permissions,createdTime,modifiedTime"
                    }
                )
                
                if response.status_code == 200:
                    folder_info = response.json()
                    print(f"✅ Got folder info: {folder_info.get('name')}")
                    return folder_info
                else:
                    print(f"⚠️ Folder not found or not accessible: {folder_id}")
                    return None
        
        except Exception as e:
            print(f"❌ Error getting folder info: {e}")
            return None
    
    async def list_files_in_folder(
        self,
        folder_id: str,
        page_size: int = 100
    ) -> List[Dict]:
        """
        List files in a specific folder
        
        Args:
            folder_id: ID of folder to list
            page_size: Maximum files to return (default 100)
        
        Returns:
            List of file info dicts
        """
        try:
            query = f"'{folder_id}' in parents and trashed=false"
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{self.DRIVE_API_BASE}/files",
                    headers=self.headers,
                    params={
                        "q": query,
                        "pageSize": page_size,
                        "fields": "files(id,name,mimeType,webViewLink,createdTime,modifiedTime)",
                        "orderBy": "modifiedTime desc"
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    files = data.get("files", [])
                    print(f"✅ Found {len(files)} files in folder")
                    return files
                else:
                    print(f"⚠️ Failed to list files: {response.text}")
                    return []
        
        except Exception as e:
            print(f"❌ Error listing files: {e}")
            return []
    
    async def create_main_folder_with_sharing(
        self,
        folder_name: str,
        admin_emails: List[str]
    ) -> Tuple[Dict, List[Dict]]:
        """
        Complete setup: Create main folder and share with admins
        
        Args:
            folder_name: Name of main folder
            admin_emails: List of admin email addresses
        
        Returns:
            Tuple of (folder_info, share_results)
        """
        print(f"\n📁 Creating main folder: {folder_name}")
        
        # Check if folder already exists
        existing_folder = await self.find_folder_by_name(folder_name)
        
        if existing_folder:
            print(f"ℹ️ Folder already exists, using existing folder")
            folder_info = existing_folder
        else:
            # Create new folder
            folder_info = await self.create_folder(folder_name)
        
        # Share with admins
        print(f"👥 Sharing with {len(admin_emails)} admin(s)...")
        share_results = await self.share_with_multiple(
            folder_id=folder_info["id"],
            emails=admin_emails,
            role="writer"
        )
        
        # Summary
        successful_shares = sum(1 for r in share_results if r["success"])
        print(f"✅ Setup complete!")
        print(f"   Folder ID: {folder_info['id']}")
        print(f"   Shared with: {successful_shares}/{len(admin_emails)} users")
        
        return folder_info, share_results


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_drive_service(access_token: str) -> DriveService:
    """
    Get a Drive service instance
    
    Args:
        access_token: Google OAuth access token
    
    Returns:
        DriveService instance
    
    Example:
        >>> service = get_drive_service(user.google_access_token)
        >>> folder = await service.create_folder("My Folder")
    """
    return DriveService(access_token)


def sanitize_folder_name(name: str) -> str:
    """
    Sanitize a name for use as a folder name
    
    Removes special characters and replaces spaces with underscores
    
    Args:
        name: Original name
    
    Returns:
        Sanitized name safe for use as folder name
    
    Example:
        >>> sanitize_folder_name("John's Wedding 2024!")
        'Johns_Wedding_2024'
    """
    # Remove leading/trailing whitespace
    name = name.strip()
    
    # Replace spaces with underscores
    name = name.replace(' ', '_')
    
    # Remove special characters (keep only alphanumeric and underscore)
    name = ''.join(c for c in name if c.isalnum() or c == '_')
    
    # Ensure it's not empty
    if not name:
        name = "Untitled"
    
    return name
