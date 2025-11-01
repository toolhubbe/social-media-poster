/**
 * Google Drive Setup Page
 * File Location: src/pages/DriveSetup.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/DriveSetup.jsx
 * 
 * One-time setup page for creating Google Drive main folder
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
        // Success! Redirect to dashboard
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
    // Go to dashboard anyway (they can setup later)
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icon */}
        <div style={styles.iconContainer}>
          <span style={styles.icon}>📁</span>
        </div>

        {/* Title */}
        <h1 style={styles.title}>One More Step!</h1>
        <p style={styles.subtitle}>
          Let's set up your Google Drive workspace
        </p>

        {/* Info Box */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>What will be created:</h3>
          
          <div style={styles.folderPreview}>
            <div style={styles.folderItem}>
              <span style={styles.folderIcon}>📁</span>
              <span style={styles.folderName}>SOCIAL_MEDIA_POSTER</span>
            </div>
            <div style={styles.folderSub}>
              → All customer folders will be stored here
            </div>
          </div>

          <div style={styles.detailSection}>
            <h4 style={styles.detailTitle}>📍 Location:</h4>
            <p style={styles.detailText}>Root of your Google Drive</p>
          </div>

          <div style={styles.detailSection}>
            <h4 style={styles.detailTitle}>👥 Shared with:</h4>
            <ul style={styles.emailList}>
              <li>toolhubbe@gmail.com</li>
              <li>dpelssers@gmail.com</li>
            </ul>
            <p style={styles.detailNote}>
              Both admins will have full access to manage customer folders
            </p>
          </div>
        </div>

        {/* Description */}
        <div style={styles.description}>
          <p style={styles.descText}>
            This is a one-time setup. The folder will be visible in your
            Google Drive at{' '}
            <a 
              href="https://drive.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.link}
            >
              drive.google.com
            </a>
          </p>
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
              Creating folder and setting permissions...
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
            ← Back to Dashboard
          </button>
          <button
            onClick={handleCreateFolder}
            style={{
              ...styles.createButton,
              ...(loading ? styles.createButtonLoading : {})
            }}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Folder & Continue'}
          </button>
        </div>

        {/* Help Text */}
        <p style={styles.helpText}>
          Need help? Contact support at{' '}
          <a href="mailto:support@example.com" style={styles.link}>
            support@example.com
          </a>
        </p>
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
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
  },
  iconContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '64px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: '30px',
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e8eaed',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '16px',
  },
  folderPreview: {
    marginBottom: '20px',
  },
  folderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  folderIcon: {
    fontSize: '24px',
  },
  folderName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#202124',
    fontFamily: 'monospace',
  },
  folderSub: {
    fontSize: '14px',
    color: '#5f6368',
    marginLeft: '36px',
  },
  detailSection: {
    marginTop: '20px',
  },
  detailTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '8px',
  },
  detailText: {
    fontSize: '14px',
    color: '#5f6368',
    margin: 0,
  },
  emailList: {
    listStyle: 'none',
    padding: 0,
    margin: '8px 0',
  },
  detailNote: {
    fontSize: '12px',
    color: '#5f6368',
    fontStyle: 'italic',
    marginTop: '8px',
  },
  description: {
    marginBottom: '24px',
  },
  descText: {
    fontSize: '14px',
    color: '#5f6368',
    lineHeight: '1.6',
    textAlign: 'center',
  },
  link: {
    color: '#4285F4',
    textDecoration: 'none',
    fontWeight: '500',
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    border: '1px solid #f28b82',
    borderRadius: '4px',
    padding: '12px 16px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  errorIcon: {
    fontSize: '20px',
  },
  errorText: {
    fontSize: '14px',
    color: '#d93025',
  },
  successBox: {
    backgroundColor: '#e6f4ea',
    border: '1px solid #34a853',
    borderRadius: '4px',
    padding: '12px 16px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid #e6f4ea',
    borderTop: '3px solid #34a853',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  successText: {
    fontSize: '14px',
    color: '#137333',
  },
  buttonContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  skipButton: {
    flex: 1,
    padding: '14px 24px',
    backgroundColor: 'white',
    color: '#5f6368',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  createButton: {
    flex: 2,
    padding: '14px 24px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  createButtonLoading: {
    backgroundColor: '#8ab4f8',
    cursor: 'not-allowed',
  },
  helpText: {
    fontSize: '12px',
    color: '#5f6368',
    textAlign: 'center',
    borderTop: '1px solid #e8eaed',
    paddingTop: '20px',
  },
};

// Add spinner animation
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Animation might already exist
  }
}

export default DriveSetup;
