/**
 * Dashboard Page
 * File Location: src/pages/Dashboard.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/Dashboard.jsx
 * 
 * Main dashboard for authenticated users
 * ✅ UPDATED: Drive Setup button added to Quick Actions
 */

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>Social Media Poster</h1>
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user?.name || user?.email}</span>
              <span style={styles.userEmail}>{user?.email}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.welcome}>
          <h2 style={styles.welcomeTitle}>
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h2>
          <p style={styles.welcomeText}>
            Your dashboard is ready. Start managing your social media content.
          </p>
        </div>

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Customers</h3>
              <p style={styles.statValue}>0</p>
              <p style={styles.statLabel}>Total customers</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📅</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Events</h3>
              <p style={styles.statValue}>0</p>
              <p style={styles.statLabel}>Active events</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📸</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Photos</h3>
              <p style={styles.statValue}>0</p>
              <p style={styles.statLabel}>Total photos</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📝</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Posts</h3>
              <p style={styles.statValue}>0</p>
              <p style={styles.statLabel}>Scheduled posts</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.actionsSection}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            {/* ✅ NEW: Drive Setup button */}
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/drive-setup')}
            >
              <span style={styles.actionIcon}>📁</span>
              <span style={styles.actionText}>Drive Setup</span>
            </button>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>➕</span>
              <span style={styles.actionText}>Add Customer</span>
            </button>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>📅</span>
              <span style={styles.actionText}>Create Event</span>
            </button>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>📸</span>
              <span style={styles.actionText}>Upload Photos</span>
            </button>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>✏️</span>
              <span style={styles.actionText}>Create Post</span>
            </button>
          </div>
        </div>

        {/* Success Message */}
        <div style={styles.successBox}>
          <div style={styles.successIcon}>✅</div>
          <div>
            <h4 style={styles.successTitle}>OAuth Authentication Successful!</h4>
            <p style={styles.successText}>
              You're now logged in with Google OAuth 2.0. Your session is secure and your data is protected.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e8eaed',
    padding: '16px 0',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#202124',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#202124',
  },
  userEmail: {
    fontSize: '12px',
    color: '#5f6368',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#202124',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  welcome: {
    marginBottom: '40px',
  },
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#202124',
    marginBottom: '8px',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#5f6368',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  statIcon: {
    fontSize: '40px',
  },
  statInfo: {
    flex: 1,
  },
  statTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#5f6368',
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#202124',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#5f6368',
  },
  actionsSection: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '20px',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  actionButton: {
    backgroundColor: 'white',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '16px',
    fontWeight: '500',
    color: '#202124',
  },
  actionIcon: {
    fontSize: '24px',
  },
  actionText: {
    fontSize: '14px',
  },
  successBox: {
    backgroundColor: '#e6f4ea',
    border: '1px solid #34a853',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  successIcon: {
    fontSize: '24px',
  },
  successTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e8e3e',
    marginBottom: '4px',
  },
  successText: {
    fontSize: '14px',
    color: '#137333',
    lineHeight: '1.5',
  },
};

export default Dashboard;
