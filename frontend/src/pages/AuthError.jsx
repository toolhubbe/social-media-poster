/**
 * Auth Error Page
 * File Location: src/pages/AuthError.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/AuthError.jsx
 * 
 * Error page for authentication failures
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthError = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error || 'An unknown error occurred during authentication';

  const handleRetry = () => {
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.errorIcon}>❌</span>
        </div>

        <h1 style={styles.title}>Authentication Failed</h1>
        
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
        </div>

        <div style={styles.suggestions}>
          <h3 style={styles.suggestionsTitle}>Common issues:</h3>
          <ul style={styles.suggestionsList}>
            <li style={styles.suggestionItem}>
              You may have denied permission to access your Google account
            </li>
            <li style={styles.suggestionItem}>
              Your browser may be blocking cookies or third-party authentication
            </li>
            <li style={styles.suggestionItem}>
              There might be a temporary issue with the authentication service
            </li>
          </ul>
        </div>

        <div style={styles.actions}>
          <button onClick={handleRetry} style={styles.primaryButton}>
            Try Again
          </button>
          <button onClick={handleGoHome} style={styles.secondaryButton}>
            Go to Home
          </button>
        </div>

        <div style={styles.help}>
          <p style={styles.helpText}>
            Still having trouble? Contact support at{' '}
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
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
  },
  iconContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  errorIcon: {
    fontSize: '64px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    marginBottom: '20px',
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    border: '1px solid #f28b82',
    borderRadius: '4px',
    padding: '16px',
    marginBottom: '30px',
  },
  errorText: {
    fontSize: '14px',
    color: '#d93025',
    margin: 0,
    lineHeight: '1.5',
  },
  suggestions: {
    marginBottom: '30px',
  },
  suggestionsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '12px',
  },
  suggestionsList: {
    listStylePosition: 'inside',
    paddingLeft: '0',
  },
  suggestionItem: {
    fontSize: '14px',
    color: '#5f6368',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  primaryButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: 'white',
    color: '#202124',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  help: {
    borderTop: '1px solid #e8eaed',
    paddingTop: '20px',
    textAlign: 'center',
  },
  helpText: {
    fontSize: '14px',
    color: '#5f6368',
    margin: 0,
  },
  link: {
    color: '#4285F4',
    textDecoration: 'none',
  },
};

export default AuthError;
