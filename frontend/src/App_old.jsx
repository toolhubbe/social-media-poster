/**
 * Main App Component
 * File Location: src/App.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/App.jsx
 * 
 * Main application component with routing
 * ✅ UPDATED: CustomerDetail route added (01-11-2025)
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import AuthError from './pages/AuthError';

// Protected pages
import Dashboard from './pages/Dashboard';
import DriveSetup from './components/DriveSetup';

// ✅ UPDATED: Customer pages
import CustomerList from './pages/customers/CustomerList';
import CustomerCreate from './pages/customers/CustomerCreate';
import CustomerDetail from './pages/customers/CustomerDetail';  // ✨ NEW

// ✅ Event pages
import EventList from './pages/events/EventList';
import EventCreate from './pages/events/EventCreate';
import EventDetail from './pages/events/EventDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ============================================
              PUBLIC ROUTES
              ============================================ */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/error" element={<AuthError />} />
          
          {/* ============================================
              PROTECTED ROUTES - MAIN
              ============================================ */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/drive-setup"
            element={
              <ProtectedRoute>
                <DriveSetup />
              </ProtectedRoute>
            }
          />
          
          {/* ============================================
              PROTECTED ROUTES - CUSTOMERS
              ============================================ */}
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/customers/create"
            element={
              <ProtectedRoute>
                <CustomerCreate />
              </ProtectedRoute>
            }
          />
          
          {/* ✨ NEW: Customer detail route */}
          <Route
            path="/customers/:customerId"
            element={
              <ProtectedRoute>
                <CustomerDetail />
              </ProtectedRoute>
            }
          />
          
          {/* ============================================
              PROTECTED ROUTES - EVENTS
              ============================================ */}
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/events/create"
            element={
              <ProtectedRoute>
                <EventCreate />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/events/:eventId"
            element={
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            }
          />
          
          {/* ============================================
              DEFAULT & 404
              ============================================ */}
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 - Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Simple 404 component
const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.text}>Page not found</p>
        <a href="/dashboard" style={styles.link}>
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '72px',
    fontWeight: '700',
    color: '#202124',
    marginBottom: '16px',
  },
  text: {
    fontSize: '20px',
    color: '#5f6368',
    marginBottom: '24px',
  },
  link: {
    color: '#4285F4',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default App;
