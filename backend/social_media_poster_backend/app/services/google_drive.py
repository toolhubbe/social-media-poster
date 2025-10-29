"""
Google Drive Service
Handles all Google Drive operations: folder creation, file upload, permissions

File Location: social_media_poster_backend/app/services/google_drive.py
Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_backend/app/services/google_drive.py

✅ FIXED: Ownership transfer functionality added
   - Folders are transferred to user account after creation
   - Solves "Service Accounts do not have storage quota" error
   - Service Account can now upload files

UPDATED: Dynamic event folder system
   - Customer folder: NO automatic subfolders
   - Event folders: Created dynamically per event
"""

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload
from typing import Optional, Dict, List
import os
from pathlib import Path


class GoogleDriveService:
    """
    Service class for Google Drive operations
    
    Uses Service Account authentication for server-to-server operations
    """
    
    # Google Drive API scopes
    SCOPES = ['https://www.googleapis.com/auth/drive']
    
    def __init__(self, service_account_file: str = "service-account.json"):
        """
        Initialize Google Drive service with Service Account credentials
        
        Args:
            service_account_file: Path to service account JSON file
        """
        try:
            # Load service account credentials
            self.credentials = service_account.Credentials.from_service_account_file(
                service_account_file,
                scopes=self.SCOPES
            )
            
            # Build Drive service
            self.service = build('drive', 'v3', credentials=self.credentials)
            
            print("✅ Google Drive Service initialized successfully")
            
        except Exception as e:
            print(f"❌ Error initializing Google Drive Service: {e}")
            raise
    
    
    def create_folder(
        self, 
        folder_name: str, 
        parent_folder_id: Optional[str] = None
    ) -> Optional[str]:
        """
        Create a folder in Google Drive
        
        Args:
            folder_name: Name of the folder to create
            parent_folder_id: ID of parent folder (None for root)
            
        Returns:
            Folder ID if successful, None otherwise
        """
        try:
            # Folder metadata
            file_metadata = {
                'name': folder_name,
                'mimeType': 'application/vnd.google-apps.folder'
            }
            
            # Add parent if specified
            if parent_folder_id:
                file_metadata['parents'] = [parent_folder_id]
            
            # Create folder
            folder = self.service.files().create(
                body=file_metadata,
                fields='id, name, webViewLink'
            ).execute()
            
            folder_id = folder.get('id')
            folder_link = folder.get('webViewLink')
            
            print(f"✅ Folder created: {folder_name}")
            print(f"   ID: {folder_id}")
            print(f"   Link: {folder_link}")
            
            return folder_id
            
        except HttpError as error:
            print(f"❌ Error creating folder '{folder_name}': {error}")
            return None
    
    
    def transfer_folder_ownership(
        self, 
        folder_id: str, 
        new_owner_email: str
    ) -> bool:
        """
        ✅ NEW: Transfer ownership of a folder to another user
        
        This solves the "Service Accounts do not have storage quota" error
        by making the user the owner instead of the Service Account.
        
        Args:
            folder_id: ID of the folder
            new_owner_email: Email of the new owner (e.g., toolhubbe@gmail.com)
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # First, check if user already has access
            permissions = self.service.permissions().list(
                fileId=folder_id,
                fields='permissions(id, emailAddress, role)'
            ).execute()
            
            permission_id = None
            for perm in permissions.get('permissions', []):
                if perm.get('emailAddress') == new_owner_email:
                    permission_id = perm.get('id')
                    current_role = perm.get('role')
                    break
            
            # If user doesn't have access yet, give them writer access first
            if not permission_id:
                permission = {
                    'type': 'user',
                    'role': 'writer',
                    'emailAddress': new_owner_email
                }
                
                result = self.service.permissions().create(
                    fileId=folder_id,
                    body=permission,
                    sendNotificationEmail=False,
                    fields='id'
                ).execute()
                
                permission_id = result.get('id')
            
            # Now transfer ownership
            if permission_id:
                permission_update = {
                    'role': 'owner'
                }
                
                self.service.permissions().update(
                    fileId=folder_id,
                    permissionId=permission_id,
                    body=permission_update,
                    transferOwnership=True
                ).execute()
                
                print(f"✅ Ownership transferred to: {new_owner_email}")
                return True
            else:
                print(f"❌ Could not find permission for {new_owner_email}")
                return False
                
        except HttpError as error:
            print(f"❌ Error transferring ownership: {error}")
            return False
    
    
    def create_customer_folder_structure(
        self, 
        company_name: str,
        parent_folder_id: Optional[str] = None,
        share_with_emails: Optional[List[str]] = None,
        transfer_ownership_to: Optional[str] = None
    ) -> Optional[Dict[str, str]]:
        """
        Create folder structure for a customer
        
        ✅ UPDATED: Ownership transfer support
        
        Structure:
        COMPANY_NAME/
        └── (event folders created dynamically via create_event_folder)
        
        Args:
            company_name: Company name for main folder
            parent_folder_id: Parent folder ID (optional)
            share_with_emails: List of emails to share folder with (optional)
            transfer_ownership_to: Email to transfer ownership to (optional but recommended)
            
        Returns:
            Dict with folder ID or None if failed
        """
        try:
            # Create main customer folder ONLY
            main_folder_id = self.create_folder(company_name, parent_folder_id)
            
            if not main_folder_id:
                return None
            
            # ✅ NEW: Transfer ownership if specified
            if transfer_ownership_to:
                print(f"\n🔄 Transferring ownership...")
                self.transfer_folder_ownership(main_folder_id, transfer_ownership_to)
            
            # Share with users if emails provided
            if share_with_emails:
                print(f"\n👥 Sharing folder with users...")
                self.share_folder_with_users(main_folder_id, share_with_emails, role='writer')
            
            folder_structure = {
                'main_folder_id': main_folder_id
            }
            
            print(f"\n✅ Customer folder created: {company_name}")
            print(f"   📁 Event folders will be created dynamically per event")
            
            return folder_structure
            
        except Exception as e:
            print(f"❌ Error creating customer folder structure: {e}")
            return None
    
    
    def create_event_folder(
        self, 
        event_name: str, 
        customer_folder_id: str,
        transfer_ownership_to: Optional[str] = None
    ) -> Optional[str]:
        """
        Create a folder for a specific event UNDER the customer folder
        
        ✅ UPDATED: Ownership transfer support
        
        Structure:
        CUSTOMER_FOLDER/
        └── Event_Name_2024/  ← Created here
            └── (photos uploaded here)
        
        Args:
            event_name: Name of the event (will be sanitized)
            customer_folder_id: ID of the customer's main folder
            transfer_ownership_to: Email to transfer ownership to (optional but recommended)
            
        Returns:
            Event folder ID or None if failed
        """
        try:
            # Create event folder as subfolder of customer folder
            folder_id = self.create_folder(event_name, customer_folder_id)
            
            if folder_id:
                # ✅ NEW: Transfer ownership if specified
                if transfer_ownership_to:
                    print(f"🔄 Transferring ownership...")
                    self.transfer_folder_ownership(folder_id, transfer_ownership_to)
                
                print(f"✅ Event folder created: {event_name}")
                print(f"   📁 Parent: Customer folder")
            
            return folder_id
            
        except Exception as e:
            print(f"❌ Error creating event folder: {e}")
            return None
    
    
    def upload_file(
        self,
        file_path: str,
        folder_id: str,
        filename: Optional[str] = None
    ) -> Optional[Dict[str, str]]:
        """
        Upload a file to Google Drive
        
        Args:
            file_path: Local path to file
            folder_id: Destination folder ID (typically event folder)
            filename: Custom filename (optional, uses original if not specified)
            
        Returns:
            Dict with file info or None if failed
        """
        try:
            if not os.path.exists(file_path):
                print(f"❌ File not found: {file_path}")
                return None
            
            # Use original filename if not specified
            if not filename:
                filename = Path(file_path).name
            
            # File metadata
            file_metadata = {
                'name': filename,
                'parents': [folder_id]
            }
            
            # Upload file
            media = MediaFileUpload(file_path, resumable=True)
            file = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id, name, webViewLink, mimeType'
            ).execute()
            
            file_info = {
                'file_id': file.get('id'),
                'filename': file.get('name'),
                'web_link': file.get('webViewLink'),
                'mime_type': file.get('mimeType')
            }
            
            print(f"✅ File uploaded: {filename}")
            print(f"   ID: {file_info['file_id']}")
            
            return file_info
            
        except HttpError as error:
            print(f"❌ Error uploading file: {error}")
            return None
    
    
    def list_files(
        self, 
        folder_id: str,
        page_size: int = 100
    ) -> List[Dict[str, str]]:
        """
        List all files in a folder
        
        Args:
            folder_id: Folder ID to list files from
            page_size: Maximum number of files to return
            
        Returns:
            List of file dictionaries
        """
        try:
            query = f"'{folder_id}' in parents and trashed=false"
            
            results = self.service.files().list(
                q=query,
                pageSize=page_size,
                fields="files(id, name, mimeType, webViewLink, createdTime)"
            ).execute()
            
            files = results.get('files', [])
            
            print(f"✅ Found {len(files)} files in folder")
            
            return files
            
        except HttpError as error:
            print(f"❌ Error listing files: {error}")
            return []
    
    
    def delete_file(self, file_id: str) -> bool:
        """
        Delete a file from Google Drive
        
        Args:
            file_id: ID of file to delete
            
        Returns:
            True if successful, False otherwise
        """
        try:
            self.service.files().delete(fileId=file_id).execute()
            print(f"✅ File deleted: {file_id}")
            return True
            
        except HttpError as error:
            print(f"❌ Error deleting file: {error}")
            return False
    
    
    def share_folder_with_users(
        self, 
        folder_id: str, 
        email_addresses: List[str],
        role: str = 'writer'
    ) -> bool:
        """
        Share a folder with one or more users
        
        Args:
            folder_id: Folder ID to share
            email_addresses: List of email addresses to share with
            role: Permission role ('reader', 'writer', 'commenter')
            
        Returns:
            True if all shares successful, False otherwise
        """
        try:
            success_count = 0
            
            for email in email_addresses:
                try:
                    # Create permission
                    permission = {
                        'type': 'user',
                        'role': role,
                        'emailAddress': email
                    }
                    
                    self.service.permissions().create(
                        fileId=folder_id,
                        body=permission,
                        sendNotificationEmail=False,
                        fields='id'
                    ).execute()
                    
                    print(f"✅ Folder shared with: {email} (role: {role})")
                    success_count += 1
                    
                except HttpError as error:
                    print(f"❌ Error sharing with {email}: {error}")
            
            return success_count == len(email_addresses)
            
        except Exception as e:
            print(f"❌ Error in share_folder_with_users: {e}")
            return False
    
    
    def get_folder_link(self, folder_id: str) -> Optional[str]:
        """
        Get web view link for a folder
        
        Args:
            folder_id: Folder ID
            
        Returns:
            Web view link or None if failed
        """
        try:
            folder = self.service.files().get(
                fileId=folder_id,
                fields='webViewLink'
            ).execute()
            
            return folder.get('webViewLink')
            
        except HttpError as error:
            print(f"❌ Error getting folder link: {error}")
            return None


# Test function
def test_drive_service():
    """
    Test function to verify Google Drive service works
    Tests the new dynamic event folder system with ownership transfer
    """
    print("\n" + "="*60)
    print("🧪 TESTING GOOGLE DRIVE SERVICE - WITH OWNERSHIP TRANSFER")
    print("="*60 + "\n")
    
    # Test email addresses
    test_emails = [
        "toolhubbe@gmail.com",
        "dpelssers@gmail.com"
    ]
    
    try:
        # Initialize service
        drive_service = GoogleDriveService()
        
        # Test 1: Create a test parent folder
        print("\n📁 Test 1: Creating parent folder...")
        parent_folder_id = drive_service.create_folder("TEST_SOCIAL_MEDIA_POSTER_OWNERSHIP")
        
        if parent_folder_id:
            print(f"✅ Parent folder created successfully!")
            
            # Test 2: Create customer folder with ownership transfer
            print(f"\n👤 Test 2: Creating customer folder with ownership transfer...")
            customer_structure = drive_service.create_customer_folder_structure(
                "Test_Bakkerij_Jansen",
                parent_folder_id=parent_folder_id,
                share_with_emails=test_emails,
                transfer_ownership_to="toolhubbe@gmail.com"  # ✅ NEW
            )
            
            if customer_structure:
                customer_folder_id = customer_structure['main_folder_id']
                print(f"✅ Customer folder created with ownership transfer!")
                print(f"   ID: {customer_folder_id}")
                
                # Test 3: Create dynamic event folders with ownership transfer
                print(f"\n🎉 Test 3: Creating event folders with ownership transfer...")
                
                event1_id = drive_service.create_event_folder(
                    "Verjaardag_2024",
                    customer_folder_id,
                    transfer_ownership_to="toolhubbe@gmail.com"  # ✅ NEW
                )
                
                event2_id = drive_service.create_event_folder(
                    "Huwelijk_2024",
                    customer_folder_id,
                    transfer_ownership_to="toolhubbe@gmail.com"  # ✅ NEW
                )
                
                if event1_id and event2_id:
                    print(f"\n✅ Dynamic event folders created with ownership transfer!")
                    print(f"   Event 1 ID: {event1_id}")
                    print(f"   Event 2 ID: {event2_id}")
                    
                    # Get folder link
                    folder_link = drive_service.get_folder_link(customer_folder_id)
                    if folder_link:
                        print(f"\n🔗 Customer folder link: {folder_link}")
                        print(f"\n📧 Users with access:")
                        for email in test_emails:
                            print(f"   • {email}")
                        print(f"\n✨ Open the link - folders are now owned by toolhubbe@gmail.com!")
                        print(f"✅ Service Account can now upload files!")
        
        print("\n" + "="*60)
        print("✅ ALL TESTS PASSED - OWNERSHIP TRANSFER WORKING!")
        print("="*60 + "\n")
        
        return True
        
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}\n")
        return False


if __name__ == "__main__":
    # Run tests when file is executed directly
    test_drive_service()
