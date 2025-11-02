/**
 * Event Detail Page - MODERN VERSION
 * 
 * Bestandslocatie: frontend/src/pages/events/EventDetail.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/events/EventDetail.jsx
 * 
 * ✅ MODERNIZED: Glassmorphism profile card, gradient borders, modern layout
 * ✅ FUNCTIONALITEIT: 100% behouden - alleen styling aangepast
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
    
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, [eventId, location.state]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const eventResponse = await api.get(`/events/${eventId}`);
      setEvent(eventResponse.data);

      try {
        const driveResponse = await api.get(`/events/${eventId}/drive-info`);
        setDriveInfo(driveResponse.data);
      } catch (driveErr) {
        console.warn('Could not fetch Drive info:', driveErr);
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
    alert('📸 Foto upload functionaliteit komt binnenkort!');
  };

  const handleCreatePost = () => {
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
      corporate: { label: '🏢 Zakelijk', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadow: 'rgba(102, 126, 234, 0.3)' },
      wedding: { label: '💍 Bruiloft', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', shadow: 'rgba(240, 147, 251, 0.3)' },
      birthday: { label: '🎂 Verjaardag', gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)', shadow: 'rgba(253, 203, 110, 0.3)' },
      anniversary: { label: '🎉 Jubileum', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79, 172, 254, 0.3)' },
      conference: { label: '🎤 Conferentie', gradient: 'linear-gradient(135deg, #ff6348 0%, #ff4757 100%)', shadow: 'rgba(255, 99, 72, 0.3)' },
      party: { label: '🎊 Feest', gradient: 'linear-gradient(135deg, #ee5a6f 0%, #f29263 100%)', shadow: 'rgba(238, 90, 111, 0.3)' },
      other: { label: '📌 Anders', gradient: 'linear-gradient(135deg, #95afc0 0%, #636e72 100%)', shadow: 'rgba(149, 175, 192, 0.3)' }
    };
    return types[type] || types.other;
  };

  const getStatusInfo = (status) => {
    const statusConfig = {
      draft: { label: 'Concept', gradient: 'linear-gradient(135deg, #b2bec3 0%, #636e72 100%)', shadow: 'rgba(99, 110, 114, 0.3)' },
      planned: { label: 'Gepland', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79, 172, 254, 0.3)' },
      active: { label: 'Actief', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadow: 'rgba(67, 233, 123, 0.3)' },
      completed: { label: 'Afgerond', gradient: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)', shadow: 'rgba(162, 155, 254, 0.3)' },
      cancelled: { label: 'Geannuleerd', gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)', shadow: 'rgba(253, 121, 168, 0.3)' }
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
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.loadingCard}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Event laden...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.errorCard}>
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
      </div>
    );
  }

  const typeInfo = getEventTypeInfo(event.event_type);
  const statusInfo = getStatusInfo(event.status);
  const daysUntil = getDaysUntil(event.event_date);

  return (
    <div style={styles.pageContainer}>
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

        {/* Header Card */}
        <div style={styles.headerCard}>
          <button 
            onClick={() => navigate('/events')}
            style={styles.navButton}
          >
            ← Terug naar Events
          </button>

          <div style={styles.headerContent}>
            <div style={{
              ...styles.typeIconLarge,
              background: typeInfo.gradient,
              boxShadow: `0 8px 30px ${typeInfo.shadow}`
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
              background: statusInfo.gradient,
              boxShadow: `0 4px 15px ${statusInfo.shadow}`
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
              <h3 style={styles.cardTitle}>
                <span style={styles.cardTitleIcon}>👤</span>
                Klant
              </h3>
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
              <h3 style={styles.cardTitle}>
                <span style={styles.cardTitleIcon}>📋</span>
                Event Details
              </h3>
              
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
            {/* Actions Card */}
            <div style={styles.infoCard}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardTitleIcon}>⚙️</span>
                Acties
              </h3>
              
              <div style={styles.actionsGrid}>
                <button onClick={handleEdit} style={styles.actionButtonEdit}>
                  <span>✏️</span>
                  <span>Bewerken</span>
                </button>

                <button onClick={handleUploadPhotos} style={styles.actionButtonPhoto}>
                  <span>📸</span>
                  <span>Foto's uploaden</span>
                </button>

                <button onClick={handleCreatePost} style={styles.actionButtonPost}>
                  <span>📝</span>
                  <span>Post aanmaken</span>
                </button>

                <button onClick={handleDelete} style={styles.actionButtonDelete}>
                  <span>🗑️</span>
                  <span>Verwijderen</span>
                </button>
              </div>
            </div>

            {/* Drive Info Card */}
            {driveInfo && (
              <div style={styles.infoCard}>
                <h3 style={styles.cardTitle}>
                  <span style={styles.cardTitleIcon}>📁</span>
                  Google Drive
                </h3>
                
                <div style={styles.driveInfo}>
                  <p style={styles.driveText}>
                    Event folder in Google Drive
                  </p>
                  
                  <a
                    href={`https://drive.google.com/drive/folders/${driveInfo.event_folder_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.driveButton}
                  >
                    📂 Open Drive Folder →
                  </a>

                  {driveInfo.folder_path && (
                    <p style={styles.drivePath}>{driveInfo.folder_path}</p>
                  )}
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div style={styles.infoCard}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardTitleIcon}>📊</span>
                Statistieken
              </h3>
              
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

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  successBanner: {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    borderRadius: '16px',
    padding: '20px 30px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 4px 20px rgba(67, 233, 123, 0.3)',
    animation: 'slideDown 0.3s ease-out',
  },
  successIcon: {
    fontSize: '24px',
  },
  closeButton: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: 'white',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.5s ease-out',
  },
  navButton: {
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(102, 126, 234, 0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    color: '#667eea',
    transition: 'all 0.3s ease',
    marginBottom: '24px',
  },
  headerContent: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
  },
  typeIconLarge: {
    fontSize: '40px',
    width: '96px',
    height: '96px',
    borderRadius: '24px',
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
    margin: '0 0 12px 0',
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e293b',
  },
  eventMeta: {
    margin: 0,
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500',
  },
  statusBadge: {
    padding: '12px 24px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '700',
    alignSelf: 'flex-start',
    color: 'white',
  },
  countdownBanner: {
    marginTop: '24px',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(253, 203, 110, 0.3)',
  },
  gridLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    animation: 'fadeIn 0.5s ease-out',
  },
  cardTitle: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cardTitleIcon: {
    fontSize: '22px',
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  customerName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
  },
  linkButton: {
    alignSelf: 'flex-start',
    padding: '10px 20px',
    background: 'rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#667eea',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '16px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  detailLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: '15px',
    color: '#1e293b',
    fontWeight: '600',
  },
  descriptionSection: {
    paddingTop: '16px',
    borderTop: '2px solid rgba(226, 232, 240, 0.5)',
  },
  descriptionText: {
    margin: '8px 0 0 0',
    color: '#64748b',
    lineHeight: '1.6',
    fontSize: '15px',
  },
  actionsGrid: {
    display: 'grid',
    gap: '12px',
  },
  actionButtonEdit: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  actionButtonPhoto: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  actionButtonPost: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(253, 203, 110, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  actionButtonDelete: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(253, 121, 168, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  driveInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  driveText: {
    margin: 0,
    color: '#64748b',
    fontSize: '15px',
  },
  driveButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '15px',
    textAlign: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)',
  },
  drivePath: {
    margin: 0,
    fontSize: '12px',
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    background: 'rgba(226, 232, 240, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '600',
    marginTop: '6px',
  },
  loadingCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '6px solid rgba(255, 255, 255, 0.3)',
    borderTop: '6px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  },
  errorCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    textAlign: 'center',
    padding: '60px 40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  errorIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  errorTitle: {
    fontSize: '28px',
    color: '#e84393',
    marginBottom: '12px',
    fontWeight: '800',
  },
  errorText: {
    fontSize: '16px',
    color: '#64748b',
    marginBottom: '32px',
  },
  errorActions: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  retryButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  backButton: {
    padding: '14px 28px',
    background: 'rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    color: '#475569',
    border: '2px solid rgba(226, 232, 240, 0.8)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
  },
};

export default EventDetail;
