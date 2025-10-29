# 🏗️ SOCIAL MEDIA POSTER - WORKSPACE ARCHITECTUUR PLAN

**Document:** Multi-Tenant & Collaborative Workspace Implementatie  
**Datum:** 28 Oktober 2025  
**Versie:** 1.0  
**Bestandslocatie:** `C:/Users/DASAP/Documents/social_media_poster/WORKSPACE_ARCHITECTURE_PLAN.md`

---

## 📋 EXECUTIVE SUMMARY

Dit document beschrijft de architectuur voor een **hybride workspace systeem** dat zowel:
- **Solo gebruikers** (eigen private Drive)
- **Team collaboration** (gedeelde workspace)
- **Hybrid gebruik** (beide tegelijk)

ondersteunt in de Social Media Poster applicatie.

---

## 🎯 DE 3 GEBRUIKSSCENARIO'S

### **SCENARIO 1: Solo Gebruiker** 👤

**Use Case:** Freelance fotograaf die alleen werkt

```
Piet uit Genk
└─ Personal Workspace
   └─ SOCIAL_MEDIA_POSTER/ (op Piet's Google Drive)
      ├─ Bakkerij_Jansen/
      ├─ Café_De_Zwaan/
      └─ Restaurant_Lekker/
```

**Kenmerken:**
- ✅ Eigen Google Drive folder
- ✅ Volledige privacy
- ✅ Geen data delen met anderen
- ✅ Eigen klanten en events

---

### **SCENARIO 2: Team/Collaborative** 👥

**Use Case:** Studio met meerdere fotografen die samenwerken

```
Studio ABC (Jan, Marie, Tom)
└─ Team Workspace "Studio ABC"
   └─ SOCIAL_MEDIA_POSTER_StudioABC/ (gedeelde Drive)
      ├─ Klant_A/ (Jan werkt hieraan)
      ├─ Klant_B/ (Marie werkt hieraan)
      └─ Klant_C/ (Tom werkt hieraan)
```

**Kenmerken:**
- ✅ Gedeelde workspace
- ✅ Alle team members zien alle klanten
- ✅ Collaborative workflow
- ✅ Centrale data storage

---

### **SCENARIO 3: Hybrid** 👤👥

**Use Case:** Fotograaf die zowel solo als in teams werkt

```
Lisa
├─ Personal Workspace
│  └─ SOCIAL_MEDIA_POSTER_Personal/ (Lisa's Drive)
│     ├─ Eigen_Klant_1/
│     └─ Eigen_Klant_2/
│
└─ Team Workspaces
   ├─ Agency ABC (Lisa + John + Sarah)
   │  └─ SOCIAL_MEDIA_POSTER_AgencyABC/
   │     └─ Klant_X/
   │
   └─ Studio XYZ (Lisa + Tom + Anna + Bob)
      └─ SOCIAL_MEDIA_POSTER_StudioXYZ/
         └─ Klant_Y/
```

**Kenmerken:**
- ✅ Meerdere workspaces tegelijk
- ✅ Workspace selector in UI
- ✅ Data gescheiden per workspace
- ✅ Maximale flexibiliteit

---

## 🗄️ DATABASE ARCHITECTUUR

### **Schema Wijzigingen**

```sql
-- ========================================
-- NIEUWE TABELLEN
-- ========================================

-- Workspaces: Container voor data
CREATE TABLE workspaces (
    workspace_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,  -- 'personal' or 'team'
    description TEXT,
    drive_folder_id VARCHAR(255),
    drive_folder_name VARCHAR(255),
    owner_user_id UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Workspace Members: Wie heeft toegang
CREATE TABLE workspace_members (
    workspace_id UUID REFERENCES workspaces(workspace_id),
    user_id UUID REFERENCES users(user_id),
    role VARCHAR(20) NOT NULL,  -- 'owner', 'admin', 'member'
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (workspace_id, user_id)
);

-- Workspace Invites: Uitnodigingen
CREATE TABLE workspace_invites (
    invite_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(workspace_id),
    inviter_user_id UUID REFERENCES users(user_id),
    invitee_email VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'member',
    status VARCHAR(20) DEFAULT 'pending',  -- 'pending', 'accepted', 'declined'
    token VARCHAR(255) UNIQUE,  -- Voor invite link
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    accepted_at TIMESTAMP
);

-- ========================================
-- BESTAANDE TABELLEN UPDATEN
-- ========================================

-- Customers: Link naar workspace
ALTER TABLE customers ADD COLUMN workspace_id UUID REFERENCES workspaces(workspace_id);
ALTER TABLE customers ADD COLUMN created_by UUID REFERENCES users(user_id);

-- Events: Link naar workspace
ALTER TABLE events ADD COLUMN workspace_id UUID REFERENCES workspaces(workspace_id);
ALTER TABLE events ADD COLUMN created_by UUID REFERENCES users(user_id);

-- Posts: Link naar workspace
ALTER TABLE posts ADD COLUMN workspace_id UUID REFERENCES workspaces(workspace_id);
ALTER TABLE posts ADD COLUMN created_by UUID REFERENCES users(user_id);

-- Photos: Link naar workspace
ALTER TABLE photos ADD COLUMN workspace_id UUID REFERENCES workspaces(workspace_id);
ALTER TABLE photos ADD COLUMN created_by UUID REFERENCES users(user_id);

-- Users: Workspace preferences
ALTER TABLE users ADD COLUMN has_personal_workspace BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN current_workspace_id UUID REFERENCES workspaces(workspace_id);
ALTER TABLE users ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE;
```

### **Indexen voor Performance**

```sql
CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);
CREATE INDEX idx_workspace_members_workspace ON workspace_members(workspace_id);
CREATE INDEX idx_customers_workspace ON customers(workspace_id);
CREATE INDEX idx_events_workspace ON events(workspace_id);
CREATE INDEX idx_posts_workspace ON posts(workspace_id);
CREATE INDEX idx_workspace_invites_email ON workspace_invites(invitee_email);
CREATE INDEX idx_workspace_invites_token ON workspace_invites(token);
```

---

## 🎨 OPLOSSINGEN VOOR PERSONAL WORKSPACE CREATIE

### **OPTIE 1: Altijd Automatisch** (Simpelst)

**Hoe het werkt:**
```
ELKE user krijgt automatisch een personal workspace bij registratie

User registreert
↓
Systeem maakt automatisch:
1. Personal Workspace "[Name]'s Workspace"
2. Folder op user's Drive: SOCIAL_MEDIA_POSTER_Personal/
3. Workspace member entry (user = owner)
```

**Pro's:**
- ✅ Eenvoudig - geen extra logica
- ✅ Consistent - elke user zelfde ervaring
- ✅ Direct klaar om te werken

**Con's:**
- ❌ Onnodige folder als user alleen in teams werkt
- ❌ Meer Drive storage gebruikt

**Implementatie:**
```python
def create_user(email, name):
    # Create user
    user = User.create(email=email, name=name)
    
    # Auto-create personal workspace
    workspace = Workspace.create(
        name=f"{name}'s Workspace",
        type='personal',
        owner_user_id=user.user_id
    )
    
    # Create Drive folder
    folder_id = create_drive_folder(
        user_credentials=user.oauth_tokens,
        folder_name="SOCIAL_MEDIA_POSTER_Personal"
    )
    
    workspace.drive_folder_id = folder_id
    
    return user, workspace
```

---

### **OPTIE 2: Opt-In met Keuze** (Flexibel) ⭐ AANBEVOLEN

**Hoe het werkt:**
```
Bij eerste login: check of user pending invites heeft

User registreert
↓
Heeft pending team invites?
├─ JA → Show onboarding:
│         "Join team X?"
│         "Also create personal workspace? [Yes/No]"
│
└─ NEE → Auto-create personal workspace
          (Solo user)
```

**Onboarding Screen:**
```
┌─────────────────────────────────────────┐
│ Welcome Marie! 👋                        │
├─────────────────────────────────────────┤
│ You've been invited to join:            │
│                                          │
│ 👥 Studio ABC                           │
│    by Jan Janssen                       │
│    3 members • 12 customers             │
│                                          │
│    [Accept Invite] [Decline]            │
│                                          │
├─────────────────────────────────────────┤
│ Do you also want a personal workspace   │
│ for your own projects?                  │
│                                          │
│ [✓ Yes, create personal workspace]      │
│ [  No, only use team workspaces]        │
│                                          │
│ You can always add this later           │
└─────────────────────────────────────────┘
```

**Pro's:**
- ✅ User choice - maximum controle
- ✅ Geen onnodige folders
- ✅ Duidelijke onboarding

**Con's:**
- ❌ Extra onboarding stap
- ❌ Iets complexere logica

**Implementatie:**
```python
def handle_first_login(user):
    # Check pending invites
    pending_invites = WorkspaceInvite.get_pending(user.email)
    
    if pending_invites:
        # Has team invites - give choice
        return {
            'show_onboarding': True,
            'invites': pending_invites,
            'offer_personal_choice': True
        }
    else:
        # No invites - auto create personal
        create_personal_workspace(user)
        return {
            'show_onboarding': False,
            'personal_created': True
        }

def complete_onboarding(user, choices):
    # Accept team invites
    for invite in choices['accepted_invites']:
        accept_workspace_invite(invite, user)
    
    # Create personal if requested
    if choices['create_personal']:
        create_personal_workspace(user)
```

---

### **OPTIE 3: Lazy Creation** (Just-in-Time)

**Hoe het werkt:**
```
Personal workspace wordt PAS aangemaakt als user het nodig heeft

User werkt alleen in team workspaces
↓
Later: User wil customer aanmaken voor eigen project
↓
Systeem vraagt: "Where to create?"
├─ Team Workspace A
├─ Team Workspace B
└─ ➕ Create Personal Workspace
```

**Pro's:**
- ✅ Meest efficient - alleen wat nodig is
- ✅ Geen onnodige storage
- ✅ Flexibel

**Con's:**
- ❌ Workspace selector bij elke actie
- ❌ Kan verwarrend zijn

---

### **OPTIE 4: Role-Based** (Enterprise)

**Hoe het werkt:**
```
Users hebben account type setting

Administrator stelt in:
├─ Freelancers → Can create personal
└─ Employees → Team only
```

**Pro's:**
- ✅ Centraal beheer
- ✅ Perfect voor agencies met employees

**Con's:**
- ❌ Minder user autonomie
- ❌ Meer admin overhead

---

## 🏆 AANBEVOLEN AANPAK: HYBRID OPTIE 2 + 3

### **Combinatie van Opt-In en Lazy Creation**

**Logica:**
1. **Bij registratie/eerste login:**
   - Heeft pending invites? → Geef keuze
   - Geen invites? → Auto personal workspace

2. **Later in app:**
   - User zonder personal workspace kan alsnog aanmaken
   - "Create Personal Workspace" button in settings

**Code Flow:**
```python
class UserOnboarding:
    def handle_first_login(self, user):
        invites = self.get_pending_invites(user.email)
        
        if invites:
            return self.show_onboarding_with_choice(user, invites)
        else:
            return self.auto_create_personal(user)
    
    def show_onboarding_with_choice(self, user, invites):
        return {
            'screen': 'onboarding',
            'invites': invites,
            'offer_personal': True
        }
    
    def auto_create_personal(self, user):
        workspace = self.create_personal_workspace(user)
        return {
            'screen': 'dashboard',
            'workspace': workspace
        }
```

---

## 🎨 USER INTERFACE FLOWS

### **Flow 1: Solo Freelancer (Piet)**

```
Stap 1: Piet registreert via Google OAuth
Stap 2: Geen pending invites gedetecteerd
Stap 3: Systeem maakt automatisch:
        - Personal Workspace "Piet's Workspace"
        - Drive folder: SOCIAL_MEDIA_POSTER_Personal/
Stap 4: Piet komt op dashboard
Stap 5: Piet kan direct klanten aanmaken
```

**UI:**
```
┌─────────────────────────────────────┐
│ Dashboard                           │
├─────────────────────────────────────┤
│ 📁 Current: Piet's Workspace        │
│                                     │
│ Customers: 0                        │
│ Events: 0                           │
│                                     │
│ [+ Add Customer]                    │
└─────────────────────────────────────┘
```

---

### **Flow 2: Team Member (Marie)**

```
Stap 1: Jan nodigt Marie uit voor "Studio ABC"
        Email gestuurd met invite link
        
Stap 2: Marie klikt link → Registreert/logt in

Stap 3: Onboarding screen:
        "Join Studio ABC?"
        "Also create personal workspace?"
        
Stap 4: Marie kiest:
        [✓] Join Studio ABC
        [ ] No personal workspace
        
Stap 5: Marie komt op dashboard
        Ziet alleen Studio ABC workspace
        
Stap 6: Marie maakt klanten aan in Studio ABC
        Zichtbaar voor Jan, Tom, en Marie
```

**UI:**
```
┌─────────────────────────────────────┐
│ Dashboard                           │
├─────────────────────────────────────┤
│ 👥 Current: Studio ABC              │
│    3 members (you, Jan, Tom)        │
│                                     │
│ Customers: 12                       │
│ Events: 24                          │
│                                     │
│ [+ Add Customer]                    │
└─────────────────────────────────────┘
```

---

### **Flow 3: Hybrid User (Lisa)**

```
Stap 1: Lisa registreert (geen invites)
        → Auto personal workspace
        
Stap 2: Later: Lisa wordt uitgenodigd voor "Agency ABC"

Stap 3: Lisa accepteert invite

Stap 4: Lisa ziet nu workspace selector:

┌─────────────────────────────────────┐
│ 📁 Select Workspace: ▼              │
├─────────────────────────────────────┤
│ ● Lisa's Personal                   │
│   5 customers • Solo                │
│                                     │
│ ○ Agency ABC                        │
│   12 customers • 3 members          │
└─────────────────────────────────────┘

Stap 5: Lisa kan switchen tussen workspaces
```

**Workspace Switcher UI:**
```
┌─────────────────────────────────────────┐
│ Current Workspace: Lisa's Personal ▼    │
├─────────────────────────────────────────┤
│                                          │
│ 📁 PERSONAL WORKSPACES                  │
│ ┌──────────────────────────────────┐   │
│ │ Lisa's Personal                   │   │
│ │ 5 customers • 8 events            │   │
│ │ ✓ Currently active                │   │
│ └──────────────────────────────────┘   │
│                                          │
│ 👥 TEAM WORKSPACES                      │
│ ┌──────────────────────────────────┐   │
│ │ Agency ABC                        │   │
│ │ 12 customers • 24 events          │   │
│ │ 3 members • Your role: Member     │   │
│ │ [Switch to this workspace]        │   │
│ └──────────────────────────────────┘   │
│                                          │
│ ┌──────────────────────────────────┐   │
│ │ Studio XYZ                        │   │
│ │ 8 customers • 15 events           │   │
│ │ 5 members • Your role: Admin      │   │
│ │ [Switch to this workspace]        │   │
│ └──────────────────────────────────┘   │
│                                          │
│ [+ Create New Team Workspace]           │
└─────────────────────────────────────────┘
```

---

## 🔐 GOOGLE DRIVE ARCHITECTUUR

### **Voor Personal Workspaces**

```
User's OAuth Tokens gebruikt
↓
Folder aangemaakt op USER'S Google Drive
↓
SOCIAL_MEDIA_POSTER_Personal/
├── Customer1/
│   └── Event1/
└── Customer2/
    └── Event2/
```

**Implementatie:**
```python
def create_personal_workspace_folder(user):
    # Use user's OAuth tokens
    credentials = get_user_credentials(user)
    drive_service = build('drive', 'v3', credentials=credentials)
    
    # Create folder on USER'S Drive
    folder_metadata = {
        'name': 'SOCIAL_MEDIA_POSTER_Personal',
        'mimeType': 'application/vnd.google-apps.folder'
    }
    
    folder = drive_service.files().create(
        body=folder_metadata,
        fields='id'
    ).execute()
    
    return folder['id']
```

---

### **Voor Team Workspaces - 3 Opties**

#### **Optie A: Owner's Drive** (Simpelst)

```
Team "Studio ABC" (owner: Jan)
↓
Folder op JAN'S Google Drive
↓
SOCIAL_MEDIA_POSTER_StudioABC/
↓
Gedeeld met Marie en Tom
```

**Pro's:**
- ✅ Eenvoudig te implementeren
- ✅ Gebruikt user OAuth tokens

**Con's:**
- ❌ Als Jan account weg is, data weg!
- ❌ Jan's storage gebruikt

---

#### **Optie B: Service Account per Workspace** ⭐

```
Team "Studio ABC"
↓
Dedicated Service Account voor dit workspace
↓
service-account-studio-abc@project.iam.gserviceaccount.com
↓
Folder op Service Account Drive
↓
Gedeeld met Jan, Marie, Tom
```

**Pro's:**
- ✅ Data blijft bestaan ongeacht members
- ✅ Professioneel
- ✅ Centraal beheer

**Con's:**
- ❌ Complexer setup
- ❌ Service account limiet (100 per project)
- ❌ Kosten voor extra storage

---

#### **Optie C: Shared Drive** (Google Workspace)

```
Team "Studio ABC"
↓
Google Shared Drive (vereist Workspace)
↓
Alle members hebben native toegang
```

**Pro's:**
- ✅ Beste voor teams
- ✅ Native Google Workspace feature
- ✅ Geen ownership issues

**Con's:**
- ❌ Vereist Google Workspace ($$$)
- ❌ Niet voor gratis Gmail accounts

---

### **Aanbeveling voor Team Workspaces:**

**FASE 1 (MVP):** Optie A - Owner's Drive
- Snel te implementeren
- Gratis
- Goed voor beta/testing

**FASE 2 (Production):** Optie B - Service Account per Workspace
- Professioneel
- Schaalbaar
- Data veiligheid

---

## 🔒 PERMISSIONS & ROLLEN

### **Workspace Roles**

```sql
-- Role types
'owner'   - Volledige controle, kan workspace deleten
'admin'   - Kan members toevoegen/verwijderen, instellingen wijzigen
'member'  - Kan data creëren/bewerken binnen workspace
```

### **Permission Matrix**

| Actie | Owner | Admin | Member |
|-------|-------|-------|--------|
| Create Customer | ✅ | ✅ | ✅ |
| Edit Customer | ✅ | ✅ | ✅ |
| Delete Customer | ✅ | ✅ | ❌ |
| Invite Members | ✅ | ✅ | ❌ |
| Remove Members | ✅ | ✅ | ❌ |
| Change Roles | ✅ | ❌ | ❌ |
| Delete Workspace | ✅ | ❌ | ❌ |
| Workspace Settings | ✅ | ✅ | ❌ |

### **Implementatie:**

```python
class WorkspacePermissions:
    @staticmethod
    def can_delete_customer(user, customer, workspace):
        member = workspace.get_member(user)
        return member.role in ['owner', 'admin']
    
    @staticmethod
    def can_invite_members(user, workspace):
        member = workspace.get_member(user)
        return member.role in ['owner', 'admin']
    
    @staticmethod
    def can_delete_workspace(user, workspace):
        member = workspace.get_member(user)
        return member.role == 'owner'
```

---

## 📊 API ENDPOINTS

### **Workspace Management**

```
GET    /api/v1/workspaces/
       List all workspaces user has access to

POST   /api/v1/workspaces/
       Create new team workspace
       Body: { name, description }

GET    /api/v1/workspaces/{id}
       Get workspace details

PUT    /api/v1/workspaces/{id}
       Update workspace settings

DELETE /api/v1/workspaces/{id}
       Delete workspace (owner only)

POST   /api/v1/workspaces/personal/setup
       Create personal workspace for current user
```

### **Workspace Members**

```
GET    /api/v1/workspaces/{id}/members
       List workspace members

POST   /api/v1/workspaces/{id}/members/invite
       Invite user to workspace
       Body: { email, role }

DELETE /api/v1/workspaces/{id}/members/{user_id}
       Remove member from workspace

PUT    /api/v1/workspaces/{id}/members/{user_id}/role
       Update member role
```

### **Workspace Invites**

```
GET    /api/v1/invites/pending
       Get pending invites for current user

POST   /api/v1/invites/{token}/accept
       Accept workspace invite

POST   /api/v1/invites/{token}/decline
       Decline workspace invite
```

### **Context Switching**

```
POST   /api/v1/user/switch-workspace
       Switch current workspace context
       Body: { workspace_id }

GET    /api/v1/user/current-workspace
       Get current workspace context
```

### **Modified Existing Endpoints**

```
GET    /api/v1/customers/
       Now filtered by current workspace

POST   /api/v1/customers/
       Creates customer in current workspace
       Auto-adds workspace_id and created_by

GET    /api/v1/events/
       Now filtered by current workspace

POST   /api/v1/events/
       Creates event in current workspace
```

---

## ⚙️ BACKEND IMPLEMENTATIE

### **Middleware: Workspace Context**

```python
class WorkspaceContextMiddleware:
    """
    Adds current workspace to request context
    """
    async def __call__(self, request: Request, call_next):
        user = request.state.user  # From auth middleware
        
        # Get user's current workspace
        workspace_id = user.current_workspace_id
        
        if not workspace_id:
            # Get default workspace
            workspace = await self.get_default_workspace(user)
            workspace_id = workspace.workspace_id
        
        # Add to request state
        request.state.workspace_id = workspace_id
        
        response = await call_next(request)
        return response
```

### **Dependency: Get Current Workspace**

```python
async def get_current_workspace(
    request: Request,
    db: Session = Depends(get_db)
) -> Workspace:
    """
    Get current workspace from context
    """
    workspace_id = request.state.workspace_id
    workspace = db.query(Workspace).filter(
        Workspace.workspace_id == workspace_id
    ).first()
    
    if not workspace:
        raise HTTPException(404, "Workspace not found")
    
    return workspace
```

### **Auto-Filtering Queries**

```python
@router.get("/customers/")
def get_customers(
    workspace: Workspace = Depends(get_current_workspace),
    db: Session = Depends(get_db)
):
    """
    Get customers - auto-filtered by workspace
    """
    customers = db.query(Customer).filter(
        Customer.workspace_id == workspace.workspace_id
    ).all()
    
    return customers

@router.post("/customers/")
def create_customer(
    customer_data: CustomerCreate,
    current_user: User = Depends(get_current_user),
    workspace: Workspace = Depends(get_current_workspace),
    db: Session = Depends(get_db)
):
    """
    Create customer - auto-assign to current workspace
    """
    customer = Customer(
        **customer_data.dict(),
        workspace_id=workspace.workspace_id,
        created_by=current_user.user_id
    )
    
    # Create Drive folder using workspace context
    if workspace.type == 'personal':
        credentials = get_user_credentials(current_user)
    else:
        credentials = get_workspace_credentials(workspace)
    
    folder_id = create_customer_folder(
        credentials=credentials,
        parent_folder_id=workspace.drive_folder_id,
        customer_name=customer.company_name
    )
    
    customer.google_drive_folder_id = folder_id
    db.add(customer)
    db.commit()
    
    return customer
```

---

## 🎨 FRONTEND IMPLEMENTATIE

### **Context Provider**

```jsx
// contexts/WorkspaceContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkspaces();
    fetchCurrentWorkspace();
  }, []);

  const fetchWorkspaces = async () => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get('/api/v1/workspaces/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setWorkspaces(response.data);
  };

  const fetchCurrentWorkspace = async () => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get('/api/v1/user/current-workspace', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCurrentWorkspace(response.data);
    setLoading(false);
  };

  const switchWorkspace = async (workspaceId) => {
    const token = localStorage.getItem('access_token');
    await axios.post('/api/v1/user/switch-workspace', 
      { workspace_id: workspaceId },
      { headers: { Authorization: `Bearer ${token}` }}
    );
    await fetchCurrentWorkspace();
    window.location.reload(); // Refresh data
  };

  return (
    <WorkspaceContext.Provider value={{
      workspaces,
      currentWorkspace,
      switchWorkspace,
      loading
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
```

### **Workspace Selector Component**

```jsx
// components/WorkspaceSelector.jsx
import React, { useContext } from 'react';
import { WorkspaceContext } from '../contexts/WorkspaceContext';

const WorkspaceSelector = () => {
  const { workspaces, currentWorkspace, switchWorkspace } = 
    useContext(WorkspaceContext);

  return (
    <div className="workspace-selector">
      <label>Current Workspace:</label>
      <select 
        value={currentWorkspace?.workspace_id}
        onChange={(e) => switchWorkspace(e.target.value)}
      >
        {workspaces.map(ws => (
          <option key={ws.workspace_id} value={ws.workspace_id}>
            {ws.type === 'personal' ? '📁' : '👥'} {ws.name}
          </option>
        ))}
      </select>
    </div>
  );
};
```

### **Onboarding Component**

```jsx
// pages/Onboarding.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Onboarding = () => {
  const [invites, setInvites] = useState([]);
  const [createPersonal, setCreatePersonal] = useState(true);

  useEffect(() => {
    fetchPendingInvites();
  }, []);

  const fetchPendingInvites = async () => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get('/api/v1/invites/pending', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setInvites(response.data);
  };

  const handleComplete = async () => {
    const token = localStorage.getItem('access_token');
    
    // Accept invites
    for (const invite of invites.filter(i => i.accepted)) {
      await axios.post(`/api/v1/invites/${invite.token}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    
    // Create personal workspace if requested
    if (createPersonal) {
      await axios.post('/api/v1/workspaces/personal/setup', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="onboarding">
      <h1>Welcome! 👋</h1>
      
      {invites.length > 0 && (
        <section>
          <h2>Team Invitations</h2>
          {invites.map(invite => (
            <div key={invite.invite_id} className="invite-card">
              <h3>{invite.workspace.name}</h3>
              <p>Invited by {invite.inviter.name}</p>
              <label>
                <input 
                  type="checkbox" 
                  checked={invite.accepted}
                  onChange={(e) => {/* update state */}}
                />
                Accept invitation
              </label>
            </div>
          ))}
        </section>
      )}
      
      <section>
        <h2>Personal Workspace</h2>
        <p>Create your own workspace for personal projects?</p>
        <label>
          <input 
            type="checkbox"
            checked={createPersonal}
            onChange={(e) => setCreatePersonal(e.target.checked)}
          />
          Yes, create personal workspace
        </label>
      </section>
      
      <button onClick={handleComplete}>
        Complete Setup
      </button>
    </div>
  );
};
```

---

## ⏱️ IMPLEMENTATIE TIJDLIJN

### **FASE 1: Foundation (4-5 uur)**

**Database Setup (1 uur)**
- [ ] Create workspace tables
- [ ] Update existing tables with workspace_id
- [ ] Create indexes
- [ ] Migration scripts

**Backend Core (2-3 uur)**
- [ ] Workspace models & schemas
- [ ] Workspace CRUD endpoints
- [ ] Workspace context middleware
- [ ] Auto-filtering queries

**OAuth Drive Integration (1 uur)**
- [ ] Refactor GoogleDriveService voor user credentials
- [ ] Per-workspace Drive folder creation
- [ ] Token refresh logic

---

### **FASE 2: Workspace Management (3-4 uur)**

**Team Workspaces (2 uur)**
- [ ] Workspace creation flow
- [ ] Member management endpoints
- [ ] Invite system backend
- [ ] Role-based permissions

**Personal Workspaces (1-2 uur)**
- [ ] Personal workspace setup endpoint
- [ ] Auto-creation logic
- [ ] Opt-in onboarding flow

---

### **FASE 3: Frontend (3-4 uur)**

**Context & State (1 uur)**
- [ ] WorkspaceContext provider
- [ ] Workspace switching logic
- [ ] Current workspace state

**UI Components (2-3 uur)**
- [ ] Workspace selector
- [ ] Onboarding wizard
- [ ] Workspace settings page
- [ ] Member management UI
- [ ] Invite flow

---

### **FASE 4: Testing & Polish (2-3 uur)**

**Testing (2 uur)**
- [ ] Test solo user flow
- [ ] Test team creation flow
- [ ] Test hybrid user flow
- [ ] Test permissions
- [ ] Test Drive integration

**Polish (1 uur)**
- [ ] Error handling
- [ ] Loading states
- [ ] User feedback
- [ ] Documentation

---

### **TOTAAL: 12-16 uur**

**Sprint verdeling:**
- **Sprint 1 (4-5 uur):** Database + Backend Core
- **Sprint 2 (3-4 uur):** Workspace Management
- **Sprint 3 (3-4 uur):** Frontend
- **Sprint 4 (2-3 uur):** Testing & Polish

---

## 🎯 MVP SCOPE BESLISSING

### **Minimum Viable Product:**

**Include:**
- ✅ Personal workspaces (auto-create)
- ✅ Basic team workspaces
- ✅ Workspace switching
- ✅ Simple invite system (email-based)
- ✅ Owner's Drive voor team workspaces

**Exclude (v2):**
- ⏸️ Advanced role permissions
- ⏸️ Service Account per workspace
- ⏸️ Workspace analytics
- ⏸️ Advanced member management

**Reduced scope: ~8-10 uur**

---

## 🔄 MIGRATION STRATEGIE

### **Voor Bestaande Data:**

Als er al data is (customers, events), hoe migreren naar workspaces?

**Optie A: Auto-assign naar Personal**
```sql
-- For each user with data
-- Create personal workspace
-- Assign all their data to personal workspace

UPDATE customers 
SET workspace_id = (
    SELECT workspace_id 
    FROM workspaces 
    WHERE owner_user_id = customers.created_by 
    AND type = 'personal'
)
WHERE workspace_id IS NULL;
```

**Optie B: Migration Wizard**
- User logt in
- Systeem detecteert data zonder workspace
- Wizard: "We found X customers. Assign to which workspace?"
- User selecteert workspace
- Data gemigreerd

---

## 📋 BESLISSINGEN DIE GENOMEN MOETEN WORDEN

### **1. Personal Workspace Creatie**
- [ ] Optie 1: Altijd automatisch
- [ ] Optie 2: Opt-in met keuze ⭐
- [ ] Optie 3: Lazy creation
- [ ] Optie 4: Role-based

### **2. Team Workspace Drive Locatie**
- [ ] Optie A: Owner's Drive ⭐ (MVP)
- [ ] Optie B: Service Account per workspace (v2)
- [ ] Optie C: Shared Drive (vereist Workspace)

### **3. MVP Scope**
- [ ] Full feature set (12-16 uur)
- [ ] Reduced MVP (8-10 uur) ⭐

### **4. Migration Strategie**
- [ ] Auto-assign naar personal
- [ ] Migration wizard ⭐

---

## 🚀 AANBEVOLEN START PLAN

### **Volgende Sessie:**

1. **Beslissingen maken** (30 min)
   - Welke opties kiezen we?
   - MVP scope definitief?

2. **Database Setup** (1 uur)
   - Tables aanmaken
   - Migrations runnen
   - Indexes toevoegen

3. **Backend Core** (2 uur)
   - Workspace models
   - Basic CRUD endpoints
   - Context middleware

**Totaal sessie: ~3.5 uur** voor foundation

---

## 📞 VRAGEN VOOR BESLUITVORMING

1. **Wat is belangrijker:**
   - Snelheid (simpeler MVP eerst)?
   - Volledigheid (alles meteen)?

2. **Hoeveel users verwacht je:**
   - Solo freelancers?
   - Teams/agencies?
   - Mix?

3. **Drive storage overwegingen:**
   - Owner's Drive OK? (gratis)
   - Of dedicated Service Accounts? (complexer/kosten)

4. **Migration:**
   - Heeft je huidige test data al echte klanten?
   - Of kunnen we clean slate starten?

---

## 📚 REFERENTIES & INSPIRATIE

### **Vergelijkbare Systemen:**

**Notion:**
- Personal workspaces
- Team workspaces
- Easy switching
- Guest access

**Figma:**
- Personal files
- Team projects
- Role-based permissions
- Shareable links

**Trello:**
- Personal boards
- Team boards
- Workspace concept
- Invite system

---

## ✅ BESLISSING CHECKLIST

Vink af wat je wilt:

### **Architecture:**
- [ ] Per-user Drive (geen service account meer)
- [ ] Workspace model (personal + team + hybrid)
- [ ] Opt-in personal workspace creation
- [ ] Owner's Drive voor team workspaces (MVP)

### **Features:**
- [ ] Auto personal workspace voor solo users
- [ ] Team workspace creation
- [ ] Workspace invites (email-based)
- [ ] Workspace switching UI
- [ ] Basic role permissions (owner/admin/member)

### **Scope:**
- [ ] Full feature set (12-16 uur)
- [ ] MVP (8-10 uur)

---

**Document klaar voor review! 🎉**  
**Volgende stap: Beslissingen maken en implementeren!**

---

**Bestandslocatie:** `C:/Users/DASAP/Documents/social_media_poster/WORKSPACE_ARCHITECTURE_PLAN.md`  
**Laatste update:** 28 Oktober 2025, 22:00  
**Versie:** 1.0
