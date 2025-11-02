/**
 * Auth Callback Page - MODERN VERSION
 * File Location: frontend/src/pages/AuthCallback.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/frontend/src/pages/AuthCallback.jsx
 * 
 * Handles OAuth callback from Google and processes tokens
 * ✨ MODERNIZED: New gradient design with loading animations
 * ✅ MAINTAINED: All functionality intact
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
      
      const { accessToken, refreshToken } = handleOAuthCallback(searchParams);
      await login(accessToken, refreshToken);
      navigate('/dashboard', { replace: true });
      
    } catch (err) {
      console.error('OAuth callback error:', err);
      setError(err.message || 'Authentication failed');
      setProcessing(false);
      
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
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <div style={styles.errorIconLarge}>⚠️</div>
          <h1 style={styles.title}>Authenticatie Mislukt</h1>
          <div style={styles.errorBox}>
            <p style={styles.errorText}>{error}</p>
          </div>
          <p style={styles.redirectText}>Doorverwijzen naar foutpagina...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <div style={styles.spinnerContainer}>
          <div style={styles.spinner}></div>
        </div>
        <h1 style={styles.title}>Inloggen Voltooien</h1>
        <p style={styles.subtitle}>Even geduld terwijl we je gegevens verifiëren...</p>
        
        <div style={styles.progressDots}>
          <span style={{...styles.dot, ...styles.dot1}}>●</span>
          <span style={{...styles.dot, ...styles.dot2}}>●</span>
          <span style={{...styles.dot, ...styles.dot3}}>●</span>
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
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    padding: '60px 40px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  spinnerContainer: {
    marginBottom: '30px',
  },
  spinner: {
    width: '80px',
    height: '80px',
    border: '6px solid rgba(102, 126, 234, 0.1)',
    borderTop: '6px solid #667eea',
    borderRight: '6px solid #764ba2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  progressDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  dot: {
    fontSize: '24px',
    color: '#667eea',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  dot1: { animationDelay: '0s' },
  dot2: { animationDelay: '0.2s' },
  dot3: { animationDelay: '0.4s' },
  errorIconLarge: {
    fontSize: '80px',
    marginBottom: '24px',
    animation: 'shake 0.5s ease-in-out',
  },
  errorBox: {
    background: 'rgba(253, 121, 168, 0.1)',
    border: '2px solid #fd79a8',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '24px',
  },
  errorText: {
    fontSize: '16px',
    color: '#e84393',
    fontWeight: '500',
    margin: 0,
    lineHeight: '1.6',
  },
  redirectText: {
    fontSize: '14px',
    color: '#94a3b8',
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
    
    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  `;
  document.head.appendChild(style);
}

export default AuthCallback;
