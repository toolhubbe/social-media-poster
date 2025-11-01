/**
 * Dashboard Page - FIXED VERSION
 * File Location: frontend/src/pages/Dashboard.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/frontend/src/pages/Dashboard.jsx
 * 
 * Main dashboard for authenticated users
 * ✅ FIXED: Now fetches live data from backend
 * ✅ FIXED: Auto-refresh on mount
 * ✅ FIXED: Manual refresh button
 * ✅ FIXED: Working Quick Action buttons
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State for stats
  const [stats, setStats] = useState({
    customers: { total: 0, active: 0 },
    events: { total: 0, active: 0 },
    photos: { total: 0 },
    posts: { total: 0, scheduled: 0 }
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  /**
   * Fetch all dashboard stats from backend
   */
  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Fetch customer stats
      const customerResponse = await api.get('/customers/stats/overview');
      
      // Fetch events (we'll count them)
      const eventsResponse = await api.get('/events', { params: { page_size: 1000 } });
      
      // TODO: Add photos and posts endpoints when available
      // const photosResponse = await api.get('/photos/stats/overview');
      // const postsResponse = await api.get('/posts/stats/overview');

      // Update stats
      setStats({
        customers: {
          total: customerResponse.data.total || 0,
          active: customerResponse.data.active || 0
        },
        events: {
          total: eventsResponse.data?.total || eventsResponse.data?.events?.length || 0,
          active: eventsResponse.data?.total || eventsResponse.data?.events?.length || 0
        },
        photos: {
          total: 0 // TODO: Update when photos endpoint available
        },
        posts: {
          total: 0, // TODO: Update when posts endpoint available
          scheduled: 0
        }
      });

      console.log('✅ Dashboard stats loaded:', {
        customers: customerResponse.data.total,
        events: eventsResponse.data?.total || eventsResponse.data?.events?.length || 0
      });

    } catch (err) {
      console.error('❌ Error fetching dashboard stats:', err);
      setError('Failed to load dashboard data. Please try refreshing.');
      
      // Set default values on error
      setStats({
        customers: { total: 0, active: 0 },
        events: { total: 0, active: 0 },
        photos: { total: 0 },
        posts: { total: 0, scheduled: 0 }
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Manual refresh handler
   */
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchStats(true);
  };

  // Auto-load on mount
  useEffect(() => {
    console.log('📊 Dashboard mounted - loading stats...');
    fetchStats();
  }, []); // Empty dependency array = run once on mount

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

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
        {/* Welcome Section with Refresh Button */}
        <div style={styles.welcomeSection}>
          <div style={styles.welcome}>
            <h2 style={styles.welcomeTitle}>
              Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
            </h2>
            <p style={styles.welcomeText}>
              Your dashboard is ready. Start managing your social media content.
            </p>
          </div>
          
          {/* Refresh Button */}
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              ...styles.refreshButton,
              ...(refreshing ? styles.refreshButtonDisabled : {})
            }}
            title="Refresh dashboard data"
          >
            <span style={{
              ...styles.refreshIcon,
              ...(refreshing ? styles.refreshIconSpinning : {})
            }}>
              🔄
            </span>
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <span style={styles.errorText}>{error}</span>
            <button onClick={handleRefresh} style={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Customers</h3>
              <p style={styles.statValue}>
                {loading ? '...' : stats.customers.total}
              </p>
              <p style={styles.statLabel}>Total customers</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📅</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Events</h3>
              <p style={styles.statValue}>
                {loading ? '...' : stats.events.active}
              </p>
              <p style={styles.statLabel}>Active events</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📸</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Photos</h3>
              <p style={styles.statValue}>
                {loading ? '...' : stats.photos.total}
              </p>
              <p style={styles.statLabel}>Total photos</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📝</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statTitle}>Posts</h3>
              <p style={styles.statValue}>
                {loading ? '...' : stats.posts.scheduled}
              </p>
              <p style={styles.statLabel}>Scheduled posts</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.actionsSection}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            <button 
              style={styles.actionButton}
              onClick={() => handleNavigate('/drive-setup')}
            >
              <span style={styles.actionIcon}>📁</span>
              <span style={styles.actionText}>Drive Setup</span>
            </button>
            
            <button 
              style={styles.actionButton}
              onClick={() => handleNavigate('/customers')}
            >
              <span style={styles.actionIcon}>👥</span>
              <span style={styles.actionText}>View Customers</span>
            </button>
            
            <button 
              style={styles.actionButton}
              onClick={() => handleNavigate('/customers/create')}
            >
              <span style={styles.actionIcon}>➕</span>
              <span style={styles.actionText}>Add Customer</span>
            </button>
            
            <button 
              style={styles.actionButton}
              onClick={() => handleNavigate('/events')}
            >
              <span style={styles.actionIcon}>📅</span>
              <span style={styles.actionText}>View Events</span>
            </button>
            
            <button 
              style={styles.actionButton}
              onClick={() => handleNavigate('/events/create')}
            >
              <span style={styles.actionIcon}>🎉</span>
              <span style={styles.actionText}>Create Event</span>
            </button>
            
            <button 
              style={styles.actionButton}
              onClick={() => handleNavigate('/photos')}
            >
              <span style={styles.actionIcon}>📸</span>
              <span style={styles.actionText}>Upload Photos</span>
            </button>
            
            <button 
              style={styles.actionButton}
              onClick={() => handleNavigate('/posts/create')}
            >
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

// ============================================================================
// STYLES
// ============================================================================

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
  welcomeSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '40px',
    gap: '20px',
  },
  welcome: {
    flex: 1,
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
  refreshButton: {
    padding: '12px 24px',
    backgroundColor: '#1a73e8',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  refreshButtonDisabled: {
    backgroundColor: '#9aa0a6',
    cursor: 'not-allowed',
  },
  refreshIcon: {
    fontSize: '18px',
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },
  refreshIconSpinning: {
    animation: 'spin 1s linear infinite',
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    border: '1px solid #ea4335',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  errorIcon: {
    fontSize: '20px',
  },
  errorText: {
    flex: 1,
    fontSize: '14px',
    color: '#c5221f',
  },
  retryButton: {
    padding: '6px 12px',
    backgroundColor: 'white',
    border: '1px solid #ea4335',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#ea4335',
    cursor: 'pointer',
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
    transition: 'transform 0.2s, box-shadow 0.2s',
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

// Add keyframes for spin animation in a style tag
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(style);
}

export default Dashboard;
