/**
 * Dashboard Page - MODERN VERSION
 * File Location: frontend/src/pages/Dashboard.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/frontend/src/pages/Dashboard.jsx
 * 
 * Main dashboard for authenticated users
 * ✨ MODERNIZED: New gradient design with glassmorphism effects
 * ✅ MAINTAINED: All functionality remains 100% intact
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
          total: 0
        },
        posts: {
          total: 0,
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
  }, []);

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
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>✨ Social Media Poster</div>
          <div style={styles.userSection}>
            <span style={styles.userEmail}>{user?.email}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </header>

        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>
            Welkom terug! 👋
          </h1>
          <p style={styles.welcomeSubtitle}>
            Je dashboard staat klaar. Start met het beheren van je social media content.
          </p>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              ...styles.refreshBtn,
              ...(refreshing ? styles.refreshBtnDisabled : {})
            }}
          >
            <span style={{
              ...styles.refreshIcon,
              ...(refreshing ? styles.refreshIconSpin : {})
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

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, ...styles.statCard1}}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statLabel}>Klanten</div>
            <div style={styles.statValue}>
              {loading ? '...' : stats.customers.total}
            </div>
            <div style={styles.statDescription}>Totaal aantal klanten</div>
          </div>

          <div style={{...styles.statCard, ...styles.statCard2}}>
            <div style={styles.statIcon}>📅</div>
            <div style={styles.statLabel}>Events</div>
            <div style={styles.statValue}>
              {loading ? '...' : stats.events.active}
            </div>
            <div style={styles.statDescription}>Actieve evenementen</div>
          </div>

          <div style={{...styles.statCard, ...styles.statCard3}}>
            <div style={styles.statIcon}>📸</div>
            <div style={styles.statLabel}>Foto's</div>
            <div style={styles.statValue}>
              {loading ? '...' : stats.photos.total}
            </div>
            <div style={styles.statDescription}>Totaal aantal foto's</div>
          </div>

          <div style={{...styles.statCard, ...styles.statCard4}}>
            <div style={styles.statIcon}>📝</div>
            <div style={styles.statLabel}>Posts</div>
            <div style={styles.statValue}>
              {loading ? '...' : stats.posts.scheduled}
            </div>
            <div style={styles.statDescription}>Geplande posts</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 style={styles.sectionTitle}>Snelle Acties</h2>
        <div style={styles.actionsGrid}>
          <button 
            style={{...styles.actionCard, ...styles.actionCard1}}
            onClick={() => handleNavigate('/drive-setup')}
          >
            <div style={styles.actionIcon}>📁</div>
            <div style={styles.actionText}>Drive Setup</div>
          </button>

          <button 
            style={{...styles.actionCard, ...styles.actionCard2}}
            onClick={() => handleNavigate('/customers')}
          >
            <div style={styles.actionIcon}>👥</div>
            <div style={styles.actionText}>Bekijk Klanten</div>
          </button>

          <button 
            style={{...styles.actionCard, ...styles.actionCard3}}
            onClick={() => handleNavigate('/customers/create')}
          >
            <div style={styles.actionIcon}>➕</div>
            <div style={styles.actionText}>Klant Toevoegen</div>
          </button>

          <button 
            style={{...styles.actionCard, ...styles.actionCard4}}
            onClick={() => handleNavigate('/events')}
          >
            <div style={styles.actionIcon}>📅</div>
            <div style={styles.actionText}>Bekijk Events</div>
          </button>

          <button 
            style={{...styles.actionCard, ...styles.actionCard5}}
            onClick={() => handleNavigate('/events/create')}
          >
            <div style={styles.actionIcon}>✨</div>
            <div style={styles.actionText}>Event Aanmaken</div>
          </button>

          <button 
            style={{...styles.actionCard, ...styles.actionCard6}}
            onClick={() => handleNavigate('/photos')}
          >
            <div style={styles.actionIcon}>📸</div>
            <div style={styles.actionText}>Upload Foto's</div>
          </button>

          <button 
            style={{...styles.actionCard, ...styles.actionCard7}}
            onClick={() => handleNavigate('/posts/create')}
          >
            <div style={styles.actionIcon}>✍️</div>
            <div style={styles.actionText}>Post Aanmaken</div>
          </button>
        </div>

        {/* Success Message */}
        <div style={styles.successMessage}>
          <div style={styles.successIcon}>✓</div>
          <div style={styles.successContent}>
            <h3 style={styles.successTitle}>OAuth Authenticatie Succesvol!</h3>
            <p style={styles.successText}>
              Je bent nu ingelogd met Google OAuth 2.0. Je sessie is beveiligd en je data is beschermd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MODERN STYLES
// ============================================================================

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  
  // Header
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '20px 30px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#64748b',
  },
  logoutButton: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
  },
  
  // Welcome Section
  welcomeSection: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  welcomeTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '10px',
  },
  welcomeSubtitle: {
    fontSize: '16px',
    color: '#64748b',
    marginBottom: '20px',
  },
  refreshBtn: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  refreshBtnDisabled: {
    background: '#94a3b8',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  refreshIcon: {
    fontSize: '18px',
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },
  refreshIconSpin: {
    animation: 'spin 1s linear infinite',
  },
  
  // Error Box
  errorBox: {
    backgroundColor: 'rgba(253, 121, 168, 0.1)',
    border: '2px solid #fd79a8',
    borderRadius: '16px',
    padding: '16px 24px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  errorIcon: {
    fontSize: '24px',
  },
  errorText: {
    flex: 1,
    fontSize: '14px',
    color: '#e84393',
    fontWeight: '500',
  },
  retryButton: {
    background: 'white',
    color: '#fd79a8',
    border: '2px solid #fd79a8',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  
  // Stats Grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '30px',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  statCard1: {
    borderTop: '4px solid transparent',
    borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderImageSlice: 1,
  },
  statCard2: {
    borderTop: '4px solid transparent',
    borderImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderImageSlice: 1,
  },
  statCard3: {
    borderTop: '4px solid transparent',
    borderImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    borderImageSlice: 1,
  },
  statCard4: {
    borderTop: '4px solid transparent',
    borderImage: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    borderImageSlice: 1,
  },
  statIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#1e293b',
    lineHeight: '1',
    marginBottom: '8px',
  },
  statDescription: {
    fontSize: '13px',
    color: '#94a3b8',
  },
  
  // Quick Actions
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  actionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: 'none',
    textAlign: 'left',
  },
  actionCard1: { background: 'linear-gradient(135deg, rgba(255, 234, 167, 0.3) 0%, rgba(253, 203, 110, 0.3) 100%), white' },
  actionCard2: { background: 'linear-gradient(135deg, rgba(162, 155, 254, 0.3) 0%, rgba(108, 92, 231, 0.3) 100%), white' },
  actionCard3: { background: 'linear-gradient(135deg, rgba(253, 121, 168, 0.3) 0%, rgba(232, 67, 147, 0.3) 100%), white' },
  actionCard4: { background: 'linear-gradient(135deg, rgba(116, 185, 255, 0.3) 0%, rgba(9, 132, 227, 0.3) 100%), white' },
  actionCard5: { background: 'linear-gradient(135deg, rgba(85, 239, 196, 0.3) 0%, rgba(0, 184, 148, 0.3) 100%), white' },
  actionCard6: { background: 'linear-gradient(135deg, rgba(250, 177, 160, 0.3) 0%, rgba(225, 112, 85, 0.3) 100%), white' },
  actionCard7: { background: 'linear-gradient(135deg, rgba(129, 236, 236, 0.3) 0%, rgba(0, 206, 201, 0.3) 100%), white' },
  actionIcon: {
    fontSize: '32px',
    flexShrink: 0,
  },
  actionText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
  },
  
  // Success Message
  successMessage: {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    borderRadius: '16px',
    padding: '20px 30px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 4px 20px rgba(67, 233, 123, 0.3)',
  },
  successIcon: {
    width: '40px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
  },
  successContent: {
    flex: 1,
  },
  successTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '4px',
  },
  successText: {
    fontSize: '14px',
    opacity: 0.9,
    margin: 0,
  },
};

// Add animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
    }
    
    @media (max-width: 768px) {
      .statsGrid {
        grid-template-columns: 1fr !important;
      }
      .actionsGrid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Dashboard;
