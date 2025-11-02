/**
 * Event Detail Page with Photo Upload
 * 
 * Bestandslocatie: frontend/src/pages/events/EventDetail.jsx
 * Volledige pad: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/events/EventDetail.jsx
 * 
 * ✅ MODERN: Glassmorphism design matching EventList
 * ✅ FEATURES: Event details, photo upload, photo gallery
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import PhotoUpload from '../../components/PhotoUpload';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'photos'

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch event details
      const eventResponse = await api.get(`/events/${eventId}`);
      setEvent(eventResponse.data);

      // Fetch photos
      await fetchPhotos();

      console.log('✅ Event data loaded');
    } catch (err) {
      console.error('Failed to fetch event:', err);
      setError('Kon event niet laden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      const photosResponse = await api.get(`/photos/event/${eventId}`);
      setPhotos(photosResponse.data || []);
      console.log(`✅ Loaded ${photosResponse.data?.length || 0} photos`);
    } catch (err) {
      console.error('Failed to fetch photos:', err);
      // Don't set error for photos, just log it
    }
  };

  const handlePhotoUploadComplete = () => {
    // Refresh photos after upload
    fetchPhotos();
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Weet je zeker dat je deze foto wilt verwijderen?')) {
      return;
    }

    try {
      await api.delete(`/photos/${photoId}`);
      setPhotos(photos.filter(p => p.photo_id !== photoId));
      alert('Foto verwijderd!');
    } catch (err) {
      console.error('Failed to delete photo:', err);
      alert('Kon foto niet verwijderen');
    }
  };

  const getEventTypeInfo = (type) => {
    const types = {
      corporate: { label: '🏢 Zakelijk', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      wedding: { label: '💍 Bruiloft', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      birthday: { label: '🎂 Verjaardag', gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)' },
      anniversary: { label: '🎉 Jubileum', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
      conference: { label: '🎤 Conferentie', gradient: 'linear-gradient(135deg, #ff6348 0%, #ff4757 100%)' },
      party: { label: '🎊 Feest', gradient: 'linear-gradient(135deg, #ee5a6f 0%, #f29263 100%)' },
      other: { label: '📌 Anders', gradient: 'linear-gradient(135deg, #95afc0 0%, #636e72 100%)' }
    };
    return types[type] || types.other;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { label: 'Concept', gradient: 'linear-gradient(135deg, #b2bec3 0%, #636e72 100%)' },
      planned: { label: 'Gepland', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
      active: { label: 'Actief', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
      completed: { label: 'Afgerond', gradient: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)' },
      cancelled: { label: 'Geannuleerd', gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span style={{
        ...styles.statusBadge,
        background: config.gradient,
      }}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('nl-NL', options);
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
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <div>
              <h4 style={styles.errorTitle}>Fout bij laden</h4>
              <p style={styles.errorText}>{error || 'Event niet gevonden'}</p>
              <button onClick={() => navigate('/events')} style={styles.retryButton}>
                Terug naar events
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const typeInfo = getEventTypeInfo(event.event_type);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.headerCard}>
          <div style={styles.headerTop}>
            <button 
              onClick={() => navigate('/events')}
              style={styles.backButton}
            >
              ← Events
            </button>
            <div style={styles.headerActions}>
              <button 
                onClick={() => navigate(`/events/${eventId}/edit`)}
                style={styles.editButton}
              >
                ✏️ Bewerken
              </button>
            </div>
          </div>

          <div style={styles.headerContent}>
            <div style={{
              ...styles.eventTypeIcon,
              background: typeInfo.gradient,
            }}>
              {typeInfo.label.split(' ')[0]}
            </div>
            <div style={styles.headerInfo}>
              <h1 style={styles.title}>{event.event_name}</h1>
              <div style={styles.headerMeta}>
                {getStatusBadge(event.status)}
                <span style={styles.eventType}>{typeInfo.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button 
            onClick={() => setActiveTab('details')}
            style={{
              ...styles.tab,
              ...(activeTab === 'details' ? styles.activeTab : {})
            }}
          >
            📋 Details
          </button>
          <button 
            onClick={() => setActiveTab('photos')}
            style={{
              ...styles.tab,
              ...(activeTab === 'photos' ? styles.activeTab : {})
            }}
          >
            📸 Foto's ({photos.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'details' ? (
          <div style={styles.contentCard}>
            <div style={styles.detailsGrid}>
              {/* Left Column */}
              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>📅 Event Informatie</h3>
                <div style={styles.detailsList}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Datum:</span>
                    <span style={styles.detailValue}>{formatDate(event.event_date)}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Klant:</span>
                    <span style={styles.detailValue}>{event.customer_name || '-'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Type:</span>
                    <span style={styles.detailValue}>{typeInfo.label}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Status:</span>
                    <span>{getStatusBadge(event.status)}</span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>📍 Locatie</h3>
                <div style={styles.detailsList}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Locatie:</span>
                    <span style={styles.detailValue}>{event.location_name || '-'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Stad:</span>
                    <span style={styles.detailValue}>{event.location_city || '-'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Straat:</span>
                    <span style={styles.detailValue}>{event.location_street || '-'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Postcode:</span>
                    <span style={styles.detailValue}>{event.location_postal_code || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div style={styles.descriptionSection}>
                <h3 style={styles.sectionTitle}>📝 Omschrijving</h3>
                <p style={styles.descriptionText}>{event.description}</p>
              </div>
            )}

            {/* Google Drive */}
            {event.google_drive_folder_id && (
              <div style={styles.driveSection}>
                <h3 style={styles.sectionTitle}>📁 Google Drive</h3>
                <a 
                  href={event.google_drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.driveLink}
                >
                  🔗 Open folder in Google Drive
                </a>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.contentCard}>
            {/* Photo Upload */}
            <div style={{ marginBottom: '32px' }}>
              <PhotoUpload 
                eventId={eventId}
                onUploadComplete={handlePhotoUploadComplete}
              />
            </div>

            {/* Photo Gallery */}
            <div>
              <h3 style={styles.sectionTitle}>
                🖼️ Foto Galerij ({photos.length} foto{photos.length !== 1 ? '\'s' : ''})
              </h3>

              {photos.length === 0 ? (
                <div style={styles.emptyPhotos}>
                  <p style={styles.emptyText}>Nog geen foto's geüpload</p>
                </div>
              ) : (
                <div style={styles.photoGrid}>
                  {photos.map((photo) => (
                    <div key={photo.photo_id} style={styles.photoCard}>
                      {photo.google_drive_url ? (
                        <a 
                          href={photo.google_drive_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img 
                            src={photo.thumbnail_url || photo.google_drive_url}
                            alt={photo.filename}
                            style={styles.photoImage}
                          />
                        </a>
                      ) : (
                        <div style={styles.photoPlaceholder}>
                          📷
                        </div>
                      )}
                      <div style={styles.photoInfo}>
                        <p style={styles.photoName}>{photo.filename}</p>
                        <p style={styles.photoSize}>
                          {(photo.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button 
                          onClick={() => handleDeletePhoto(photo.photo_id)}
                          style={styles.deletePhotoButton}
                        >
                          🗑️ Verwijder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  loadingCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  errorBox: {
    background: 'rgba(253, 121, 168, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid #fd79a8',
    borderRadius: '20px',
    padding: '32px',
    display: 'flex',
    gap: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  errorIcon: {
    fontSize: '48px',
  },
  errorTitle: {
    margin: '0 0 12px 0',
    color: '#e84393',
    fontSize: '24px',
    fontWeight: '700',
  },
  errorText: {
    margin: '0 0 20px 0',
    color: '#e84393',
    fontSize: '16px',
  },
  retryButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(253, 121, 168, 0.3)',
  },
  headerCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  backButton: {
    padding: '12px 24px',
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  editButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  eventTypeIcon: {
    fontSize: '40px',
    width: '80px',
    height: '80px',
    borderRadius: '20px',
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
  title: {
    margin: '0 0 12px 0',
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e293b',
  },
  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  statusBadge: {
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '700',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  eventType: {
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '600',
  },
  tabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  tab: {
    flex: 1,
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    color: '#64748b',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  activeTab: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    border: '2px solid rgba(102, 126, 234, 0.5)',
  },
  contentCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginBottom: '32px',
  },
  detailSection: {
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'rgba(248, 250, 252, 0.5)',
    borderRadius: '10px',
  },
  detailLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#64748b',
  },
  detailValue: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1e293b',
  },
  descriptionSection: {
    marginBottom: '32px',
  },
  descriptionText: {
    margin: 0,
    fontSize: '15px',
    color: '#64748b',
    lineHeight: '1.8',
    padding: '16px',
    background: 'rgba(248, 250, 252, 0.5)',
    borderRadius: '12px',
  },
  driveSection: {
  },
  driveLink: {
    display: 'inline-block',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)',
    transition: 'all 0.3s ease',
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  photoCard: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease',
  },
  photoImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    display: 'block',
  },
  photoPlaceholder: {
    width: '100%',
    height: '250px',
    background: 'rgba(226, 232, 240, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '64px',
  },
  photoInfo: {
    padding: '16px',
  },
  photoName: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  photoSize: {
    margin: '0 0 12px 0',
    fontSize: '12px',
    color: '#64748b',
  },
  deletePhotoButton: {
    width: '100%',
    padding: '8px',
    background: 'rgba(253, 121, 168, 0.1)',
    color: '#e84393',
    border: '2px solid #fd79a8',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  emptyPhotos: {
    padding: '40px',
    textAlign: 'center',
    background: 'rgba(248, 250, 252, 0.5)',
    borderRadius: '16px',
    marginTop: '20px',
  },
  emptyText: {
    margin: 0,
    fontSize: '16px',
    color: '#64748b',
  },
};

export default EventDetail;
