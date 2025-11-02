"""
Google Drive Service
File Location: backend/app/services/drive_service.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/services/drive_service.py

Handles all Google Drive API operations using user's OAuth token:
- Folder creation
- Folder sharing
- Permission management
- Folder search
- ✅ NEW: File uploads (single & multiple)
- ✅ NEW: File deletion

✅ USER OAUTH: All operations use user's Google OAuth access token
✅ NO SERVICE ACCOUNT: Direct integration with user's personal Drive
✅ LOWERCASE FOLDERS: All folder names are normalized to lowercase with underscores
"""

import httpx
from typing import List, Dict, Optional, Tuple
from fastapi import HTTPException, status
import mimetypes


class DriveService:
    """
    Google Drive API Service
    
    Uses user's OAuth access token for all Drive operations.
    Each user operates on their own Google Drive.
    """
    
    DRIVE_API_BASE = "https://www.googleapis.com/drive/v3"
    UPLOAD_API_BASE = "https://www.googleapis.com/upload/drive/v3"
    
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
    
    # ========================================================================
    # FOLDER OPERATIONS (EXISTING)
    # ========================================================================
    
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
    
    # ========================================================================
    # FILE UPLOAD OPERATIONS (NEW! ✅)
    # ========================================================================
    
    async def upload_file(
        self,
        file_content: bytes,
        filename: str,
        mime_type: str,
        parent_folder_id: str
    ) -> Dict:
        """
        Upload a single file to Google Drive
        
        ✅ NEW: Multipart upload for photos
        
        Args:
            file_content: File content as bytes
            filename: Name for the file in Drive
            mime_type: MIME type (e.g., 'image/jpeg')
            parent_folder_id: ID of parent folder
        
        Returns:
            Dict with file info: {id, name, webViewLink, thumbnailLink}
        
        Raises:
            HTTPException if upload fails
        
        Example:
            >>> result = await drive_service.upload_file(
            ...     file_content=image_bytes,
            ...     filename="photo.jpg",
            ...     mime_type="image/jpeg",
            ...     parent_folder_id="1a2b3c4d5e"
            ... )
            >>> print(result['webViewLink'])
        """
        try:
            print(f"📤 Uploading file: {filename} ({len(file_content)} bytes)")
            
            # Metadata for the file
            metadata = {
                "name": filename,
                "parents": [parent_folder_id]
            }
            
            # Create multipart request
            # Part 1: Metadata (JSON)
            # Part 2: File content (binary)
            boundary = "===============7330845974216740156=="
            
            body_parts = [
                f"--{boundary}",
                "Content-Type: application/json; charset=UTF-8",
                "",
                str(metadata).replace("'", '"'),  # JSON requires double quotes
                f"--{boundary}",
                f"Content-Type: {mime_type}",
                "",
            ]
            
            # Join text parts
            body_text = "\r\n".join(body_parts) + "\r\n"
            
            # Combine with file content
            body_bytes = body_text.encode('utf-8') + file_content + f"\r\n--{boundary}--".encode('utf-8')
            
            # Upload headers
            upload_headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": f"multipart/related; boundary={boundary}",
                "Content-Length": str(len(body_bytes))
            }
            
            # Use longer timeout for uploads (2 minutes)
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    f"{self.UPLOAD_API_BASE}/files?uploadType=multipart",
                    headers=upload_headers,
                    content=body_bytes,
                    params={
                        "fields": "id,name,webViewLink,thumbnailLink,mimeType,size,createdTime"
                    }
                )
                
                if response.status_code == 200:
                    file_data = response.json()
                    print(f"✅ File uploaded: {file_data['name']} (ID: {file_data['id']})")
                    return file_data
                else:
                    error_msg = response.text
                    print(f"❌ Upload failed: {error_msg}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Failed to upload file: {error_msg}"
                    )
        
        except httpx.TimeoutException:
            print(f"❌ Upload timeout for {filename}")
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail=f"Upload timed out for {filename}"
            )
        except httpx.HTTPError as e:
            print(f"❌ HTTP error uploading {filename}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error communicating with Google Drive: {str(e)}"
            )
        except HTTPException:
            raise
        except Exception as e:
            print(f"❌ Unexpected error uploading {filename}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unexpected error: {str(e)}"
            )
    
    async def upload_multiple_files(
        self,
        files: List[Tuple[bytes, str, str]],
        parent_folder_id: str
    ) -> List[Dict]:
        """
        Upload multiple files to Google Drive
        
        ✅ NEW: Batch photo upload with individual error handling
        
        Args:
            files: List of tuples (file_content, filename, mime_type)
            parent_folder_id: ID of parent folder
        
        Returns:
            List of upload results (success or error for each file)
        
        Example:
            >>> files = [
            ...     (photo1_bytes, "photo1.jpg", "image/jpeg"),
            ...     (photo2_bytes, "photo2.jpg", "image/jpeg"),
            ... ]
            >>> results = await drive_service.upload_multiple_files(
            ...     files=files,
            ...     parent_folder_id="1a2b3c4d5e"
            ... )
        """
        results = []
        
        print(f"📤 Starting batch upload of {len(files)} files...")
        
        for idx, (file_content, filename, mime_type) in enumerate(files, 1):
            try:
                print(f"   [{idx}/{len(files)}] Uploading {filename}...")
                
                file_data = await self.upload_file(
                    file_content=file_content,
                    filename=filename,
                    mime_type=mime_type,
                    parent_folder_id=parent_folder_id
                )
                
                results.append({
                    "success": True,
                    "filename": filename,
                    "file_data": file_data
                })
                
            except HTTPException as e:
                print(f"   ❌ Failed to upload {filename}: {e.detail}")
                results.append({
                    "success": False,
                    "filename": filename,
                    "error": e.detail
                })
            except Exception as e:
                print(f"   ❌ Unexpected error for {filename}: {e}")
                results.append({
                    "success": False,
                    "filename": filename,
                    "error": str(e)
                })
        
        successful = sum(1 for r in results if r["success"])
        print(f"✅ Batch upload complete: {successful}/{len(files)} successful")
        
        return results
    
    async def delete_file(self, file_id: str) -> bool:
        """
        Delete a file from Google Drive
        
        ✅ NEW: Permanent deletion from Drive
        
        Args:
            file_id: ID of file to delete
        
        Returns:
            True if deleted successfully, False otherwise
        
        Note:
            This permanently deletes the file from Drive.
            Use with caution!
        """
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.delete(
                    f"{self.DRIVE_API_BASE}/files/{file_id}",
                    headers=self.headers
                )
                
                if response.status_code == 204:
                    print(f"✅ File deleted: {file_id}")
                    return True
                else:
                    print(f"⚠️ Failed to delete file {file_id}: {response.text}")
                    return False
        
        except Exception as e:
            print(f"❌ Error deleting file {file_id}: {e}")
            return False
    
    async def get_file_info(self, file_id: str) -> Optional[Dict]:
        """
        Get detailed info about a file
        
        Args:
            file_id: ID of file
        
        Returns:
            File info dict or None if not found
        """
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{self.DRIVE_API_BASE}/files/{file_id}",
                    headers=self.headers,
                    params={
                        "fields": "id,name,mimeType,size,webViewLink,thumbnailLink,createdTime,modifiedTime"
                    }
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    return None
        
        except Exception as e:
            print(f"❌ Error getting file info: {e}")
            return None


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
    
    ✅ NORMALIZED: Lowercase, spaces → underscores, no special chars
    
    Args:
        name: Original name (e.g. "Dasap Consulting BV")
    
    Returns:
        Sanitized name (e.g. "dasap_consulting_bv")
    
    Example:
        >>> sanitize_folder_name("John's Wedding 2024!")
        'johns_wedding_2024'
        >>> sanitize_folder_name("DASAP Consulting BV")
        'dasap_consulting_bv'
    """
    # Remove leading/trailing whitespace
    name = name.strip()
    
    # Replace spaces with underscores
    name = name.replace(' ', '_')
    
    # Convert to lowercase ✅ NEW
    name = name.lower()
    
    # Remove special characters (keep only alphanumeric and underscore)
    name = ''.join(c for c in name if c.isalnum() or c == '_')
    
    # Ensure it's not empty
    if not name:
        name = "untitled"
    
    return name


def get_mime_type(filename: str) -> str:
    """
    Get MIME type from filename
    
    Args:
        filename: Filename with extension
    
    Returns:
        MIME type string (defaults to 'application/octet-stream' if unknown)
    
    Example:
        >>> get_mime_type("photo.jpg")
        'image/jpeg'
        >>> get_mime_type("document.pdf")
        'application/pdf'
    """
    mime_type, _ = mimetypes.guess_type(filename)
    return mime_type or 'application/octet-stream'
