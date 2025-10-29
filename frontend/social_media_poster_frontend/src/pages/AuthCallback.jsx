/**
 * Auth Callback Page
 * File Location: src/pages/AuthCallback.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/AuthCallback.jsx
 * 
 * Handles OAuth callback from Google and processes tokens
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { handleOAuthCallback } from '../services/auth';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    processCallback();
  }, []);

  const processCallback = async () => {
    try {
      setProcessing(true);
      
      // Extract tokens from URL parameters
      const { accessToken, refreshToken } = handleOAuthCallback(searchParams);
      
      // Login with tokens (this will fetch user data and update context)
      await login(accessToken, refreshToken);
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
      
    } catch (err) {
      console.error('OAuth callback error:', err);
      setError(err.message || 'Authentication failed');
      setProcessing(false);
      
      // Redirect to error page after 3 seconds
      setTimeout(() => {
        navigate('/auth/error', {
          state: { error: err.message },
          replace: true
        });
      }, 3000);
    }
  };

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.errorIcon}>❌</div>
          <h1 style={styles.title}>Authentication Failed</h1>
          <p style={styles.error}>{error}</p>
          <p style={styles.redirect}>Redirecting to error page...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.spinner}></div>
        <h1 style={styles.title}>Completing Sign In</h1>
        <p style={styles.subtitle}>Please wait while we verify your credentials...</p>
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
    padding: '60px 40px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #4285F4',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 30px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#5f6368',
    lineHeight: '1.5',
  },
  errorIcon: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  error: {
    fontSize: '16px',
    color: '#d93025',
    marginBottom: '12px',
    padding: '12px',
    backgroundColor: '#fce8e6',
    borderRadius: '4px',
  },
  redirect: {
    fontSize: '14px',
    color: '#5f6368',
  },
};

// Add keyframes for spinner animation
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
    // Keyframe might already exist
  }
}

export default AuthCallback;
