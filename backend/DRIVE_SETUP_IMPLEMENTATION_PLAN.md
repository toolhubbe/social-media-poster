# 🚀 GOOGLE DRIVE SETUP - IMPLEMENTATION PLAN

**Datum:** 28 Oktober 2025  
**Status:** OAuth werkt volledig ✅ - Nu Drive Setup implementeren  
**File Location:** DRIVE_SETUP_IMPLEMENTATION_PLAN.md

---

## ✅ HUIDIGE STATUS

### **Wat Werkt:**
- ✅ Backend FastAPI draait op `http://localhost:8000`
- ✅ Frontend React draait op `http://localhost:3000`
- ✅ Google OAuth 2.0 login volledig werkend
- ✅ JWT tokens worden gegenereerd
- ✅ User wordt opgeslagen in database
- ✅ Dashboard toont user info

### **Database Status:**
- ✅ PostgreSQL draait
- ✅ Users table werkt
- ✅ OAuth sessions table werkt
- ✅ Audit logs werken

---

## 🎯 WAT WE NU GAAN BOUWEN

### **Doel:**
Na succesvolle OAuth login moet de admin een **eenmalige setup flow** doorlopen om de hoofdfolder op Google Drive aan te maken.

### **User Flow:**
```
1. Admin logt in via Google OAuth ✅ (DONE)
   ↓
2. Backend checkt: "Bestaat SOCIAL_MEDIA_POSTER folder al?"
   ↓
3a. JA → Ga naar Dashboard
   ↓
3b. NEE → Redirect naar /drive-setup pagina
   ↓
4. Setup pagina toont modal met uitleg en bevestiging
   ↓
5. Admin klikt "Create Folder & Continue"
   ↓
6. Backend maakt folder aan + deelt met admins
   ↓
7. Folder ID wordt opgeslagen in database
   ↓
8. Redirect naar Dashboard ✅
```

---

## 📁 GOOGLE DRIVE STRUCTUUR

```
📁 SOCIAL_MEDIA_POSTER (hoofdfolder - root level)
   │
   ├── 📁 Customer_1_JohnDoe
   │   ├── 📁 Event_Birthday_2025
   │   │   └── 📸 photos
   │   └── 📁 Event_Wedding_2025
   │       └── 📸 photos
   │
   └── 📁 Customer_2_JaneSmith
       └── 📁 Event_Anniversary_2025
           └── 📸 photos
```

### **Permissions:**
- **Owner:** De admin die de folder aanmaakt (via OAuth)
- **Shared with:** 
  - `toolhubbe@gmail.com` (writer access)
  - `dpelssers@gmail.com` (writer access)

---

## 🏗️ TE BOUWEN BESTANDEN

### **Backend (5 bestanden):**

#### **1. Drive Service - `app/services/drive_service.py`**
```python
# Functies:
- create_main_folder(access_token, folder_name)
- share_folder_with_users(folder_id, emails, role='writer')
- check_folder_exists(access_token, folder_name)
- get_folder_id_by_name(access_token, folder_name)
```

#### **2. Drive API Endpoints - `app/api/drive.py`**
```python
# Endpoints:
GET  /api/v1/drive/status
  → Check if main folder exists
  → Return: {setup_complete: bool, folder_id: str|null}

POST /api/v1/drive/setup
  → Create SOCIAL_MEDIA_POSTER folder
  → Share with admins
  → Save folder_id in database
  → Return: {success: bool, folder_id: str}

GET  /api/v1/drive/folder-info
  → Get info about main folder
  → Return: {name, id, webViewLink, owners, shared_with}
```

#### **3. Config Model - `app/models/config.py`**
```python
# Database table: app_config
class AppConfig(Base):
    __tablename__ = "app_config"
    
    config_id = Column(UUID, primary_key=True)
    key = Column(String, unique=True, nullable=False)
    value = Column(String, nullable=False)
    description = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

# Keys:
- 'drive_folder_id' → UUID van SOCIAL_MEDIA_POSTER folder
- 'drive_folder_name' → 'SOCIAL_MEDIA_POSTER'
```

#### **4. Database Migration - `alembic/versions/XXX_add_config_table.py`**
```python
# Create app_config table
# Add indexes
```

#### **5. Update Main - `app/main.py`**
```python
# Add drive router
app.include_router(drive.router, prefix="/api/v1")
```

---

### **Frontend (3 bestanden):**

#### **6. Drive Setup Page - `src/pages/DriveSetup.jsx`**
```jsx
// Features:
- Mooi design met uitleg
- Toon wat er gaat gebeuren
- "Create Folder & Continue" button
- Loading state tijdens creation
- Error handling
- Success message + redirect
```

#### **7. Update Auth Callback - `src/pages/AuthCallback.jsx`**
```jsx
// Add after successful login:
1. Check drive setup status: GET /drive/status
2. If not setup → redirect to /drive-setup
3. If setup → redirect to /dashboard
```

#### **8. Update App Routes - `src/App.jsx`**
```jsx
// Add new route:
<Route path="/drive-setup" element={
  <ProtectedRoute>
    <DriveSetup />
  </ProtectedRoute>
} />
```

---

### **Configuration (2 bestanden):**

#### **9. Backend .env Update**
```env
# Add:
DRIVE_MAIN_FOLDER_NAME=SOCIAL_MEDIA_POSTER
DRIVE_ADMIN_EMAILS=toolhubbe@gmail.com,dpelssers@gmail.com
```

#### **10. Frontend .env Update**
```env
# Already exists, no changes needed
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🔧 TECHNISCHE DETAILS

### **Google Drive API:**

#### **Folder Aanmaken:**
```python
POST https://www.googleapis.com/drive/v3/files
Headers: Authorization: Bearer {user_access_token}
Body: {
  "name": "SOCIAL_MEDIA_POSTER",
  "mimeType": "application/vnd.google-apps.folder"
}
Response: {
  "id": "folder_id_here",
  "name": "SOCIAL_MEDIA_POSTER"
}
```

#### **Folder Delen:**
```python
POST https://www.googleapis.com/drive/v3/files/{folderId}/permissions
Body: {
  "type": "user",
  "role": "writer",
  "emailAddress": "toolhubbe@gmail.com"
}
```

#### **Folder Zoeken:**
```python
GET https://www.googleapis.com/drive/v3/files
Params: {
  "q": "name='SOCIAL_MEDIA_POSTER' and mimeType='application/vnd.google-apps.folder'",
  "fields": "files(id, name, webViewLink)"
}
```

---

## 📊 DATABASE SCHEMA

### **Nieuwe Table: app_config**
```sql
CREATE TABLE app_config (
    config_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_config_key ON app_config(key);

-- Insert initial record
INSERT INTO app_config (key, value, description) 
VALUES ('drive_folder_id', '', 'Google Drive main folder ID for SOCIAL_MEDIA_POSTER');
```

---

## 🎨 UI DESIGN SKETCH

### **Drive Setup Page:**
```
┌────────────────────────────────────────────────┐
│   Social Media Poster - Drive Setup            │
│                                                 │
│   📁 One More Step!                            │
│                                                 │
│   To manage your customers' photos, we need    │
│   to create a folder on your Google Drive.     │
│                                                 │
│   ┌─────────────────────────────────────────┐ │
│   │  What will be created:                  │ │
│   │                                         │ │
│   │  📁 SOCIAL_MEDIA_POSTER                 │ │
│   │     └─ All customer folders here        │ │
│   │                                         │ │
│   │  Location: Root of your Google Drive    │ │
│   │                                         │ │
│   │  Shared with:                           │ │
│   │  • toolhubbe@gmail.com (Admin)          │ │
│   │  • dpelssers@gmail.com (Admin)          │ │
│   └─────────────────────────────────────────┘ │
│                                                 │
│   This is a one-time setup. The folder will    │
│   be visible in your Google Drive.              │
│                                                 │
│   [Skip for Now]  [Create Folder & Continue]   │
└────────────────────────────────────────────────┘
```

---

## 🔐 SECURITY CHECKS

### **Backend Validaties:**
1. ✅ Check if user is admin (email in admin list)
2. ✅ Validate OAuth token exists and is valid
3. ✅ Check if folder already exists (prevent duplicates)
4. ✅ Validate Drive API responses
5. ✅ Log all Drive operations in audit_logs

### **Frontend Validaties:**
1. ✅ User moet authenticated zijn
2. ✅ Loading states tijdens API calls
3. ✅ Error messages bij failures
4. ✅ Success confirmation

---

## 🧪 TEST SCENARIO'S

### **Happy Path:**
1. Admin logt in → OAuth success
2. Geen folder bestaat → Redirect naar /drive-setup
3. Admin klikt "Create Folder"
4. Folder wordt aangemaakt
5. Folder wordt gedeeld met beide admins
6. Folder ID opgeslagen in database
7. Redirect naar dashboard ✅

### **Edge Cases:**
1. **Folder bestaat al:** 
   - Backend detecteert dit
   - Gebruik bestaande folder ID
   - Skip creation

2. **Drive API Error:**
   - Toon error message
   - Allow retry
   - Don't redirect

3. **User is niet admin:**
   - Toon error: "Only admins can setup Drive"
   - Redirect naar dashboard

4. **OAuth token expired:**
   - Trigger token refresh
   - Retry operation

---

## 📝 IMPLEMENTATION VOLGORDE

### **Fase 1: Database (15 min)**
1. Create config model
2. Create migration
3. Run migration
4. Test: insert/read config

### **Fase 2: Backend Drive Service (30 min)**
5. Create drive_service.py
6. Implement folder creation
7. Implement folder sharing
8. Implement folder search
9. Test met Postman/curl

### **Fase 3: Backend API (20 min)**
10. Create drive.py endpoints
11. Implement GET /status
12. Implement POST /setup
13. Test endpoints

### **Fase 4: Frontend Setup Page (30 min)**
14. Create DriveSetup.jsx
15. Design UI
16. Implement API calls
17. Add loading/error states

### **Fase 5: Frontend Integration (15 min)**
18. Update AuthCallback.jsx
19. Update App.jsx routes
20. Test complete flow

### **Fase 6: Testing (20 min)**
21. Test happy path
22. Test edge cases
23. Test error scenarios
24. Verify folder in Google Drive

**Total: ~2.5 uur**

---

## 🚨 KRITIEKE AANDACHTSPUNTEN

### **1. OAuth Token Gebruik:**
- Gebruik `current_user.google_access_token` voor Drive API calls
- Check token expiration before gebruik
- Implement token refresh als nodig

### **2. Admin Validatie:**
```python
ADMIN_EMAILS = ["toolhubbe@gmail.com", "dpelssers@gmail.com"]

def is_admin(user: User) -> bool:
    return user.email in ADMIN_EMAILS
```

### **3. Folder ID Opslag:**
```python
# Save in database
config = AppConfig(
    key="drive_folder_id",
    value=folder_id,
    description="Main Google Drive folder"
)
db.add(config)
db.commit()

# Retrieve
config = db.query(AppConfig).filter_by(key="drive_folder_id").first()
folder_id = config.value
```

### **4. Error Handling:**
- Alle Drive API calls in try/except
- Log errors in audit_logs
- Return duidelijke error messages
- Don't expose sensitive info

---

## 🔗 BELANGRIJKE LINKS

### **Google Drive API Documentation:**
- Files API: https://developers.google.com/drive/api/v3/reference/files
- Permissions API: https://developers.google.com/drive/api/v3/reference/permissions
- Python Client: https://googleapis.github.io/google-api-python-client/docs/

### **OAuth Scopes (Already Configured):**
```
https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/userinfo.email
https://www.googleapis.com/auth/userinfo.profile
```

---

## 📦 DEPENDENCIES

### **Backend (already installed):**
```
httpx  # Voor API calls naar Google
```

### **Mogelijk Extra:**
```bash
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

### **Frontend (already installed):**
```
axios  # Voor API calls
react-router-dom  # Voor routing
```

---

## 🎯 VOLGENDE STAPPEN NA DRIVE SETUP

Na deze implementatie kunnen we:

1. **Customer Management** 📝
   - CRUD voor customers
   - Customer folder aanmaken op Drive
   - Share met customer

2. **Event Management** 📅
   - CRUD voor events
   - Event folder aanmaken in customer folder
   - Koppelen aan customer

3. **Photo Upload** 📸
   - Upload naar event folder
   - Thumbnails genereren
   - Metadata opslaan

4. **Post Creation** ✍️
   - Select photos uit event
   - Create social media post
   - Schedule/publish

---

## 💾 SESSION STATE

**Waar we zijn gebleven:**
- OAuth werkt volledig ✅
- Dashboard toont user info ✅
- Nu: Drive setup flow implementeren

**Wat er draait:**
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`
- Database: PostgreSQL lokaal

**Admin Accounts:**
- toolhubbe@gmail.com
- dpelssers@gmail.com

**Test Account:**
- dpelssers@gmail.com (currently logged in)

---

## 📞 CONTACT & NOTES

**Developer:** Claude  
**Date Started:** 28 Oktober 2025  
**Current Phase:** OAuth Complete → Drive Setup Next

**Notes:**
- OAuth callback bug gefixed (google_user_id issue)
- Backend redirect URL aangepast naar /auth/callback
- Frontend route is /auth/callback (niet /auth/success)
- All tokens stored correctly in database

---

## ✅ CHECKLIST

### **Voor We Beginnen:**
- [ ] Backend draait zonder errors
- [ ] Frontend draait zonder errors
- [ ] Kan inloggen via OAuth
- [ ] Database connectie werkt
- [ ] Drive scope is enabled in OAuth

### **Na Implementatie:**
- [ ] Config table exists in database
- [ ] Drive endpoints returnen 200
- [ ] Setup page toont correct
- [ ] Folder wordt aangemaakt in Drive
- [ ] Folder wordt gedeeld met admins
- [ ] Folder ID opgeslagen in database
- [ ] Complete flow werkt end-to-end
- [ ] Error scenarios handled
- [ ] Logging works

---

**🚀 Ready to implement when you are!**
