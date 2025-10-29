/**
 * Login Page
 * File Location: src/pages/Login.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/Login.jsx
 * 
 * Login page with Google OAuth button
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleOAuthButton from '../components/GoogleOAuthButton';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Social Media Poster</h1>
          <p style={styles.subtitle}>Manage your social media content efficiently</p>
        </div>

        <div style={styles.content}>
          <h2 style={styles.welcomeText}>Welcome back!</h2>
          <p style={styles.description}>
            Sign in with your Google account to continue
          </p>

          <div style={styles.buttonContainer}>
            <GoogleOAuthButton />
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Features section */}
      <div style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>📸</div>
          <h3 style={styles.featureTitle}>Photo Management</h3>
          <p style={styles.featureText}>Organize and manage photos for your events</p>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>📅</div>
          <h3 style={styles.featureTitle}>Event Planning</h3>
          <p style={styles.featureText}>Create and track events for your customers</p>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🔐</div>
          <h3 style={styles.featureTitle}>Secure & Private</h3>
          <p style={styles.featureText}>Your data is encrypted and protected</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
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
    maxWidth: '500px',
    width: '100%',
    marginBottom: '40px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#202124',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#5f6368',
  },
  content: {
    marginBottom: '30px',
  },
  welcomeText: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '8px',
    textAlign: 'center',
  },
  description: {
    fontSize: '14px',
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    borderTop: '1px solid #e8eaed',
    paddingTop: '20px',
  },
  footerText: {
    fontSize: '12px',
    color: '#5f6368',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    width: '100%',
  },
  feature: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '15px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '8px',
  },
  featureText: {
    fontSize: '14px',
    color: '#5f6368',
    lineHeight: '1.5',
  },
};

export default Login;
