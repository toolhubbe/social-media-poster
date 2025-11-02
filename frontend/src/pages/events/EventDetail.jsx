/**
 * Event Detail Page
 * 
 * Bestandslocatie: frontend/src/pages/events/EventDetail.jsx
 * Volledige pad: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/events/EventDetail.jsx
 * 
 * Detail pagina voor specifiek event
 * Toont alle event informatie + Google Drive folder link
 * ✅ UPDATED: Action buttons now functional (02-11-2025)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../services/api';

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [driveInfo, setDriveInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchEventDetails();
    
    // Show success message if redirected from edit
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the state
      window.history.replaceState({}, document.title);
      // Auto-hide after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, [eventId, location.state]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch event details
      const eventResponse = await api.get(`/events/${eventId}`);
      setEvent(eventResponse.data);

      // Fetch Drive info
      try {
        const driveResponse = await api.get(`/events/${eventId}/drive-info`);
        setDriveInfo(driveResponse.data);
      } catch (driveErr) {
        console.warn('Could not fetch Drive info:', driveErr);
        // Don't set error, just continue without Drive info
      }
    } catch (err) {
      console.error('Failed to fetch event:', err);
      setError('Kon event niet laden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/events/${eventId}/edit`);
  };

  const handleUploadPhotos = () => {
    // TODO: Implement photo upload functionality
    alert('📸 Foto upload functionaliteit komt binnenkort!');
  };

  const handleCreatePost = () => {
    // TODO: Implement post creation functionality
    alert('📝 Post aanmaken functionaliteit komt binnenkort!');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Weet je zeker dat je "${event.event_name}" wilt verwijderen?\n\n` +
      'Dit kan niet ongedaan gemaakt worden!'
    );
    
    if (!confirmed) return;

    try {
      await api.delete(`/events/${eventId}`);
      
      // Navigate back to events list with success message
      navigate('/events', {
        state: { message: 'Event succesvol verwijderd' }
      });
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Fout bij verwijderen. Probeer het opnieuw.');
    }
  };

  const getEventTypeInfo = (type) => {
    const types = {
      corporate: { label: '🏢 Zakelijk', color: '#667eea' },
      wedding: { label: '💍 Bruiloft', color: '#f093fb' },
      birthday: { label: '🎂 Verjaardag', color: '#feca57' },
      anniversary: { label: '🎉 Jubileum', color: '#48dbfb' },
      conference: { label: '🎤 Conferentie', color: '#ff6348' },
      party: { label: '🎊 Feest', color: '#ee5a6f' },
      other: { label: '📌 Anders', color: '#95afc0' }
    };
    return types[type] || types.other;
  };

  const getStatusInfo = (status) => {
    const statusConfig = {
      draft: { label: 'Concept', color: '#9e9e9e', bg: '#f5f5f5' },
      planned: { label: 'Gepland', color: '#2196f3', bg: '#e3f2fd' },
      active: { label: 'Actief', color: '#4caf50', bg: '#e8f5e9' },
      completed: { label: 'Afgerond', color: '#9c27b0', bg: '#f3e5f5' },
      cancelled: { label: 'Geannuleerd', color: '#f44336', bg: '#ffebee' }
    };
    return statusConfig[status] || statusConfig.draft;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return date.toLocaleDateString('nl-NL', options);
  };

  const getDaysUntil = (dateString) => {
    if (!dateString) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Event laden...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3 style={styles.errorTitle}>Fout bij laden</h3>
          <p style={styles.errorText}>{error || 'Event niet gevonden'}</p>
          <div style={styles.errorActions}>
            <button onClick={fetchEventDetails} style={styles.retryButton}>
              Opnieuw proberen
            </button>
            <button onClick={() => navigate('/events')} style={styles.backButton}>
              Terug naar overzicht
            </button>
          </div>
        </div>
      </div>
    );
  }

  const typeInfo = getEventTypeInfo(event.event_type);
  const statusInfo = getStatusInfo(event.status);
  const daysUntil = getDaysUntil(event.event_date);

  return (
    <div style={styles.container}>
      {/* Success Message */}
      {successMessage && (
        <div style={styles.successBanner}>
          <span style={styles.successIcon}>✅</span>
          <span>{successMessage}</span>
          <button 
            onClick={() => setSuccessMessage(null)}
            style={styles.closeButton}
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <button 
          onClick={() => navigate('/events')}
          style={styles.navButton}
        >
          ← Terug naar Events
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Event Header Card */}
        <div style={styles.headerCard}>
          <div style={styles.headerCardTop}>
            <div style={{
              ...styles.typeIconLarge,
              backgroundColor: typeInfo.color
            }}>
              {typeInfo.label.split(' ')[0]}
            </div>
            
            <div style={styles.headerInfo}>
              <h1 style={styles.eventTitle}>{event.event_name}</h1>
              <p style={styles.eventMeta}>
                {typeInfo.label} • {formatDate(event.event_date)}
              </p>
            </div>

            <div style={{
              ...styles.statusBadge,
              color: statusInfo.color,
              backgroundColor: statusInfo.bg
            }}>
              {statusInfo.label}
            </div>
          </div>

          {daysUntil !== null && daysUntil >= 0 && (
            <div style={styles.countdownBanner}>
              {daysUntil === 0 ? '🔥 Event is VANDAAG!' : 
               daysUntil === 1 ? '⏰ Event is MORGEN!' :
               `⏱️ Nog ${daysUntil} dagen tot het event`}
            </div>
          )}
        </div>

        <div style={styles.gridLayout}>
          {/* Left Column - Main Info */}
          <div style={styles.leftColumn}>
            {/* Customer Info */}
            <div style={styles.infoCard}>
              <h3 style={styles.cardTitle}>👤 Klant</h3>
              <div style={styles.customerInfo}>
                <p style={styles.customerName}>
                  {event.customer_name || 'Onbekende klant'}
                </p>
                <button
                  onClick={() => navigate(`/customers/${event.customer_id}`)}
                  style={styles.linkButton}
                >
                  Bekijk klant profiel →
                </button>
              </div>
            </div>

            {/* Event Details */}
            <div style={styles.infoCard}>
              <h3 style={styles.cardTitle}>📋 Event Details</h3>
              
              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>📅 Datum</span>
                  <span style={styles.detailValue}>{formatDate(event.event_date)}</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>🏷️ Type</span>
                  <span style={styles.detailValue}>{typeInfo.label}</span>
                </div>

                {event.location_city && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>📍 Stad</span>
                    <span style={styles.detailValue}>{event.location_city}</span>
                  </div>
                )}

                {event.location_venue && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>🏛️ Locatie</span>
                    <span style={styles.detailValue}>{event.location_venue}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <div style={styles.descriptionSection}>
                  <span style={styles.detailLabel}>📝 Beschrijving</span>
                  <p style={styles.descriptionText}>{event.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Actions & Drive */}
          <div style={styles.rightColumn}>
            {/* Quick Actions */}
            <div style={styles.infoCard}>
              <h3 style={styles.cardTitle}>⚡ Acties</h3>
              <div style={styles.actionsGrid}>
                <button 
                  onClick={handleEdit}
                  style={styles.actionButton}
                >
                  ✏️ Bewerk Event
                </button>
                <button 
                  onClick={handleUploadPhotos}
                  style={styles.actionButton}
                >
                  📸 Upload Foto's
                </button>
                <button 
                  onClick={handleCreatePost}
                  style={styles.actionButton}
                >
                  📝 Maak Post
                </button>
                <button 
                  onClick={handleDelete}
                  style={{...styles.actionButton, ...styles.dangerButton}}
                >
                  🗑️ Verwijder
                </button>
              </div>
            </div>

            {/* Google Drive */}
            {driveInfo && (
              <div style={styles.infoCard}>
                <h3 style={styles.cardTitle}>📁 Google Drive</h3>
                <div style={styles.driveInfo}>
                  <p style={styles.driveText}>
                    Event folder is aangemaakt in Google Drive
                  </p>
                  <a
                    href={driveInfo.folder_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.driveButton}
                  >
                    Open Drive Folder →
                  </a>
                  <p style={styles.drivePath}>
                    📂 {driveInfo.folder_path}
                  </p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div style={styles.infoCard}>
              <h3 style={styles.cardTitle}>📊 Statistieken</h3>
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>0</div>
                  <div style={styles.statLabel}>Foto's</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>0</div>
                  <div style={styles.statLabel}>Posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 2rem',
    backgroundColor: '#e8f5e9',
    borderBottom: '2px solid #4caf50',
    color: '#2e7d32',
    fontSize: '1rem',
    fontWeight: '500',
  },
  successIcon: {
    fontSize: '1.25rem',
  },
  closeButton: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#2e7d32',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '2px solid #e0e0e0',
    padding: '1.5rem 2rem',
  },
  navButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    color: '#666',
    transition: 'all 0.2s',
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
  },
  headerCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  headerCardTop: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
  },
  typeIconLarge: {
    fontSize: '2.5rem',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  headerInfo: {
    flex: 1,
  },
  eventTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '2rem',
    fontWeight: '700',
    color: '#333',
  },
  eventMeta: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#666',
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  countdownBanner: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#fff3e0',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#ff6f00',
    textAlign: 'center',
    border: '2px solid #ffb74d',
  },
  gridLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  customerName: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#333',
  },
  linkButton: {
    alignSelf: 'flex-start',
    padding: '0.5rem 1rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#667eea',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  detailLabel: {
    fontSize: '0.85rem',
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '1rem',
    color: '#333',
    fontWeight: '500',
  },
  descriptionSection: {
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
  },
  descriptionText: {
    margin: '0.5rem 0 0 0',
    color: '#666',
    lineHeight: '1.6',
  },
  actionsGrid: {
    display: 'grid',
    gap: '0.75rem',
  },
  actionButton: {
    padding: '0.75rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  dangerButton: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  driveInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  driveText: {
    margin: 0,
    color: '#666',
  },
  driveButton: {
    display: 'inline-block',
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  drivePath: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#999',
    fontFamily: 'monospace',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f5f7fa',
    borderRadius: '8px',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#667eea',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#666',
    fontSize: '1.1rem',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem',
    padding: '2rem',
  },
  errorIcon: {
    fontSize: '4rem',
  },
  errorTitle: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#333',
  },
  errorText: {
    margin: 0,
    color: '#666',
  },
  errorActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  retryButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default EventDetail;
