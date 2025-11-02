/**
 * Google Drive Setup Page - MODERN VERSION
 * File Location: frontend/src/pages/DriveSetup.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/frontend/src/pages/DriveSetup.jsx
 * 
 * One-time setup page for creating Google Drive main folder
 * ✨ MODERNIZED: New gradient design with info cards
 * ✅ MAINTAINED: All functionality intact
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const DriveSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateFolder = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Creating Drive folder...');
      const response = await api.post('/drive/setup');
      console.log('Drive setup response:', response.data);

      if (response.data.success) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Drive setup error:', err);
      setError(
        err.response?.data?.detail || 
        'Failed to create folder. Please try again.'
      );
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Icon */}
          <div style={styles.iconContainer}>
            <span style={styles.icon}>📁</span>
          </div>

          {/* Title */}
          <h1 style={styles.title}>Nog Één Stap!</h1>
          <p style={styles.subtitle}>
            Laten we je Google Drive workspace instellen
          </p>

          {/* Info Box */}
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>Wat wordt aangemaakt:</h3>
            
            <div style={styles.folderPreview}>
              <div style={styles.folderItem}>
                <span style={styles.folderIcon}>📁</span>
                <span style={styles.folderName}>SOCIAL_MEDIA_POSTER</span>
              </div>
              <div style={styles.folderSub}>
                → Alle klantmappen worden hier opgeslagen
              </div>
            </div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailCard}>
                <div style={styles.detailIcon}>📍</div>
                <div style={styles.detailContent}>
                  <h4 style={styles.detailTitle}>Locatie</h4>
                  <p style={styles.detailText}>Root van je Google Drive</p>
                </div>
              </div>

              <div style={styles.detailCard}>
                <div style={styles.detailIcon}>👥</div>
                <div style={styles.detailContent}>
                  <h4 style={styles.detailTitle}>Gedeeld met</h4>
                  <div style={styles.emailList}>
                    <div style={styles.emailItem}>📧 toolhubbe@gmail.com</div>
                    <div style={styles.emailItem}>📧 dpelssers@gmail.com</div>
                  </div>
                  <p style={styles.detailNote}>
                    Beide admins krijgen volledige toegang
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠️</span>
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {loading && !error && (
            <div style={styles.successBox}>
              <div style={styles.spinner}></div>
              <span style={styles.successText}>
                Map aanmaken en permissies instellen...
              </span>
            </div>
          )}

          {/* Buttons */}
          <div style={styles.buttonContainer}>
            <button
              onClick={handleSkip}
              style={styles.skipButton}
              disabled={loading}
            >
              ← Terug naar Dashboard
            </button>
            <button
              onClick={handleCreateFolder}
              style={{
                ...styles.createButton,
                ...(loading ? styles.createButtonLoading : {})
              }}
              disabled={loading}
            >
              {loading ? 'Bezig met aanmaken...' : 'Map Aanmaken & Doorgaan'}
            </button>
          </div>

          {/* Help Text */}
          <p style={styles.helpText}>
            Hulp nodig? Neem contact op via{' '}
            <a href="mailto:support@example.com" style={styles.link}>
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '700px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    padding: '50px',
  },
  iconContainer: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  icon: {
    fontSize: '80px',
    display: 'inline-block',
    animation: 'bounce 2s ease-in-out infinite',
  },
  title: {
    fontSize: '42px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  infoBox: {
    background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.08) 0%, rgba(0, 242, 254, 0.08) 100%)',
    border: '2px solid rgba(79, 172, 254, 0.2)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
  },
  infoTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '24px',
  },
  folderPreview: {
    marginBottom: '32px',
  },
  folderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '12px',
  },
  folderIcon: {
    fontSize: '36px',
  },
  folderName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
    fontFamily: 'monospace',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  folderSub: {
    fontSize: '15px',
    color: '#64748b',
    marginLeft: '52px',
  },
  detailsGrid: {
    display: 'grid',
    gap: '20px',
  },
  detailCard: {
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    gap: '16px',
  },
  detailIcon: {
    fontSize: '32px',
    flexShrink: 0,
  },
  detailContent: {
    flex: 1,
  },
  detailTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
  },
  detailText: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  emailList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  emailItem: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
  },
  detailNote: {
    fontSize: '13px',
    color: '#94a3b8',
    fontStyle: 'italic',
    margin: 0,
  },
  errorBox: {
    background: 'rgba(253, 121, 168, 0.1)',
    border: '2px solid #fd79a8',
    borderRadius: '16px',
    padding: '16px 20px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  errorIcon: {
    fontSize: '24px',
  },
  errorText: {
    fontSize: '15px',
    color: '#e84393',
    fontWeight: '500',
  },
  successBox: {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    borderRadius: '16px',
    padding: '16px 20px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'white',
  },
  spinner: {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  successText: {
    fontSize: '15px',
    fontWeight: '600',
  },
  buttonContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
  },
  skipButton: {
    flex: 1,
    padding: '16px 24px',
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#64748b',
    border: '2px solid rgba(100, 116, 139, 0.2)',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  createButton: {
    flex: 2,
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(67, 233, 123, 0.3)',
  },
  createButtonLoading: {
    background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.5) 0%, rgba(56, 249, 215, 0.5) 100%)',
    cursor: 'not-allowed',
  },
  helpText: {
    fontSize: '13px',
    color: '#94a3b8',
    textAlign: 'center',
    borderTop: '2px solid rgba(0, 0, 0, 0.05)',
    paddingTop: '24px',
    margin: 0,
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
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
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15) !important;
    }
    
    @media (max-width: 768px) {
      .buttonContainer {
        flex-direction: column !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default DriveSetup;
