/**
 * Login Page - MODERN VERSION
 * File Location: frontend/src/pages/Login.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/frontend/src/pages/Login.jsx
 * 
 * Login page with Google OAuth button
 * ✨ MODERNIZED: New gradient design
 * ✅ MAINTAINED: All functionality intact
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
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Main Card */}
        <div style={styles.card}>
          <div style={styles.iconContainer}>
            <span style={styles.mainIcon}>✨</span>
          </div>

          <h1 style={styles.title}>Social Media Poster</h1>
          <p style={styles.subtitle}>Beheer je social media content efficiënt</p>

          <div style={styles.content}>
            <h2 style={styles.welcomeText}>Welkom terug!</h2>
            <p style={styles.description}>
              Log in met je Google account om verder te gaan
            </p>

            <div style={styles.buttonContainer}>
              <GoogleOAuthButton />
            </div>
          </div>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Door in te loggen ga je akkoord met onze Algemene Voorwaarden en Privacybeleid
            </p>
          </div>
        </div>

        {/* Features section */}
        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📸</div>
            <h3 style={styles.featureTitle}>Foto Management</h3>
            <p style={styles.featureText}>Organiseer en beheer foto's voor je events</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📅</div>
            <h3 style={styles.featureTitle}>Event Planning</h3>
            <p style={styles.featureText}>Maak en volg events voor je klanten</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>Veilig & Privé</h3>
            <p style={styles.featureText}>Je data is versleuteld en beschermd</p>
          </div>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    padding: '50px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '20px',
  },
  mainIcon: {
    fontSize: '64px',
    display: 'inline-block',
    animation: 'pulse 2s ease-in-out infinite',
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    marginBottom: '40px',
  },
  content: {
    marginBottom: '40px',
  },
  welcomeText: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
  },
  description: {
    fontSize: '15px',
    color: '#64748b',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    borderTop: '2px solid #e0e0e0',
    paddingTop: '24px',
  },
  footerText: {
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: '1.6',
    margin: 0,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    width: '100%',
  },
  feature: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    fontSize: '56px',
    marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
  },
  featureText: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },
};

// Add animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @media (max-width: 768px) {
      .features {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Login;
