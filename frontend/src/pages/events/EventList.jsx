/**
 * Event List Page
 * 
 * Bestandslocatie: frontend/src/pages/events/EventList.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/events/EventList.jsx
 * 
 * Overzichtspagina met alle events
 * Features: zoeken, filteren op status/type, sorteer op datum
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const EventList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
    
    // Show success message if redirected from event creation
    if (location.state?.message) {
      alert(location.state.message);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [statusFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      const response = await api.get('/events/', { params });
      setEvents(response.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Kon events niet laden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  // Filter and search events
  const filteredEvents = events.filter(event => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      event.event_name?.toLowerCase().includes(searchLower) ||
      event.customer_name?.toLowerCase().includes(searchLower) ||
      event.location_city?.toLowerCase().includes(searchLower)
    );
    
    const matchesType = typeFilter === 'all' || event.event_type === typeFilter;
    
    return matchesSearch && matchesType;
  });

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { label: 'Concept', color: '#9e9e9e', bg: '#f5f5f5' },
      planned: { label: 'Gepland', color: '#2196f3', bg: '#e3f2fd' },
      active: { label: 'Actief', color: '#4caf50', bg: '#e8f5e9' },
      completed: { label: 'Afgerond', color: '#9c27b0', bg: '#f3e5f5' },
      cancelled: { label: 'Geannuleerd', color: '#f44336', bg: '#ffebee' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span style={{
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: config.color,
        backgroundColor: config.bg
      }}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
          <p style={styles.loadingText}>Events laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div style={styles.headerLeft}>
            <button 
              onClick={() => navigate('/dashboard')}
              style={styles.backButton}
            >
              ← Dashboard
            </button>
            <div>
              <h1 style={styles.title}>Events</h1>
              <p style={styles.subtitle}>
                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                {searchTerm && ` gevonden voor "${searchTerm}"`}
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/events/create')}
            style={styles.primaryButton}
          >
            + Nieuw Event
          </button>
        </div>

        {/* Filters */}
        <div style={styles.filtersRow}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Zoek op event naam, klant of locatie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">Alle statussen</option>
            <option value="draft">Concept</option>
            <option value="planned">Gepland</option>
            <option value="active">Actief</option>
            <option value="completed">Afgerond</option>
            <option value="cancelled">Geannuleerd</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">Alle types</option>
            <option value="corporate">Zakelijk</option>
            <option value="wedding">Bruiloft</option>
            <option value="birthday">Verjaardag</option>
            <option value="anniversary">Jubileum</option>
            <option value="conference">Conferentie</option>
            <option value="party">Feest</option>
            <option value="other">Anders</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <div>
              <h4 style={styles.errorTitle}>Fout bij laden</h4>
              <p style={styles.errorText}>{error}</p>
              <button onClick={fetchEvents} style={styles.retryButton}>
                Opnieuw proberen
              </button>
            </div>
          </div>
        )}

        {!error && filteredEvents.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              {searchTerm ? '🔍' : '📅'}
            </div>
            <h3 style={styles.emptyTitle}>
              {searchTerm ? 'Geen resultaten' : 'Nog geen events'}
            </h3>
            <p style={styles.emptyText}>
              {searchTerm 
                ? `Geen events gevonden voor "${searchTerm}"`
                : 'Begin met het aanmaken van je eerste event'
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={() => navigate('/events/create')}
                style={styles.primaryButton}
              >
                + Eerste Event Aanmaken
              </button>
            )}
          </div>
        ) : (
          <div style={styles.eventGrid}>
            {filteredEvents.map((event) => {
              const daysUntil = getDaysUntil(event.event_date);
              const typeInfo = getEventTypeInfo(event.event_type);
              
              return (
                <div
                  key={event.event_id}
                  style={styles.eventCard}
                  onClick={() => navigate(`/events/${event.event_id}`)}
                >
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.eventTypeIcon,
                      backgroundColor: typeInfo.color
                    }}>
                      {typeInfo.label.split(' ')[0]}
                    </div>
                    {getStatusBadge(event.status)}
                  </div>

                  <div style={styles.cardBody}>
                    <h3 style={styles.eventName}>{event.event_name}</h3>
                    
                    <div style={styles.eventDetails}>
                      <div style={styles.detailRow}>
                        <span style={styles.detailIcon}>👤</span>
                        <span style={styles.detailText}>
                          {event.customer_name || 'Onbekende klant'}
                        </span>
                      </div>
                      
                      <div style={styles.detailRow}>
                        <span style={styles.detailIcon}>📅</span>
                        <span style={styles.detailText}>
                          {formatDate(event.event_date)}
                        </span>
                      </div>

                      {event.location_city && (
                        <div style={styles.detailRow}>
                          <span style={styles.detailIcon}>📍</span>
                          <span style={styles.detailText}>
                            {event.location_city}
                            {event.location_venue && ` - ${event.location_venue}`}
                          </span>
                        </div>
                      )}

                      {daysUntil !== null && daysUntil >= 0 && (
                        <div style={styles.countdown}>
                          {daysUntil === 0 ? '🔥 Vandaag!' : 
                           daysUntil === 1 ? '⏰ Morgen' :
                           `⏱️ Over ${daysUntil} dagen`}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <span style={styles.eventType}>{typeInfo.label}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/events/${event.event_id}`);
                      }}
                      style={styles.viewButton}
                    >
                      Bekijk →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '2px solid #e0e0e0',
    padding: '2rem',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },
  headerLeft: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#666',
    transition: 'all 0.2s',
  },
  title: {
    margin: '0 0 0.25rem 0',
    fontSize: '2rem',
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#666',
  },
  primaryButton: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  filtersRow: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    fontSize: '1.25rem',
  },
  searchInput: {
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 3rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s',
  },
  filterSelect: {
    padding: '0.875rem 1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '180px',
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
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
  errorBox: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#fee',
    border: '2px solid #fcc',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  errorIcon: {
    fontSize: '2rem',
  },
  errorTitle: {
    margin: '0 0 0.5rem 0',
    color: '#c33',
  },
  errorText: {
    margin: '0 0 1rem 0',
    color: '#c33',
  },
  retryButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#c33',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.5rem',
    color: '#333',
  },
  emptyText: {
    margin: '0 0 2rem 0',
    color: '#666',
    fontSize: '1.1rem',
  },
  eventGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
    animation: 'fadeIn 0.3s ease-out',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '2px solid #e0e0e0',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  eventTypeIcon: {
    fontSize: '1.5rem',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  cardBody: {
    marginBottom: '1rem',
  },
  eventName: {
    margin: '0 0 1rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  detailIcon: {
    fontSize: '1rem',
  },
  detailText: {
    fontSize: '0.9rem',
    color: '#666',
  },
  countdown: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#fff3e0',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#ff6f00',
    textAlign: 'center',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
  },
  eventType: {
    fontSize: '0.9rem',
    color: '#666',
  },
  viewButton: {
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};

export default EventList;
