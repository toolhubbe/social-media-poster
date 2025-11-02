/**
 * Event List Page - MODERN VERSION
 * 
 * Bestandslocatie: frontend/src/pages/events/EventList.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/events/EventList.jsx
 * 
 * ✅ MODERNIZED: Glassmorphism, gradients, modern typography, hover effects
 * ✅ FUNCTIONALITEIT: 100% behouden - alleen styling aangepast
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
    
    if (location.state?.message) {
      alert(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [statusFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page_size: 1000
      };
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      const response = await api.get('/events/', { params });
      const eventsData = response.data.items || response.data || [];
      setEvents(eventsData);
      
      console.log(`Loaded ${eventsData.length} events from API`);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Kon events niet laden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { label: 'Concept', gradient: 'linear-gradient(135deg, #b2bec3 0%, #636e72 100%)', shadow: 'rgba(99, 110, 114, 0.3)' },
      planned: { label: 'Gepland', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79, 172, 254, 0.3)' },
      active: { label: 'Actief', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadow: 'rgba(67, 233, 123, 0.3)' },
      completed: { label: 'Afgerond', gradient: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)', shadow: 'rgba(162, 155, 254, 0.3)' },
      cancelled: { label: 'Geannuleerd', gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)', shadow: 'rgba(253, 121, 168, 0.3)' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span style={{
        ...styles.statusBadge,
        background: config.gradient,
        boxShadow: `0 4px 12px ${config.shadow}`
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
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.loadingCard}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Events laden...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Header Card */}
        <div style={styles.headerCard}>
          <div style={styles.headerTop}>
            <div style={styles.headerLeft}>
              <button 
                onClick={() => navigate('/dashboard')}
                style={styles.backButton}
              >
                ← Dashboard
              </button>
              <div>
                <h1 style={styles.title}>Events Beheer</h1>
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
              <span style={styles.buttonIcon}>✨</span>
              Nieuw Event
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
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <div style={styles.errorContent}>
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
                <span style={styles.buttonIcon}>✨</span>
                Eerste Event Aanmaken
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
                      background: typeInfo.gradient,
                      boxShadow: `0 4px 15px ${typeInfo.shadow}`
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
                          <span style={styles.detailText}>{event.location_city}</span>
                        </div>
                      )}
                    </div>

                    {daysUntil !== null && daysUntil >= 0 && (
                      <div style={styles.countdown}>
                        {daysUntil === 0 ? '🔥 Vandaag!' : 
                         daysUntil === 1 ? '⏰ Morgen' :
                         `⏱️ Nog ${daysUntil} dagen`}
                      </div>
                    )}
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

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
  },
  headerCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  headerLeft: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  backButton: {
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
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '36px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500',
  },
  primaryButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
  },
  buttonIcon: {
    fontSize: '18px',
  },
  filtersRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchBox: {
    flex: 1,
    minWidth: '300px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '18px',
    fontSize: '20px',
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    padding: '14px 18px 14px 50px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
  },
  filterSelect: {
    padding: '14px 18px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '180px',
    fontWeight: '600',
    outline: 'none',
    fontFamily: 'inherit',
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
  errorBox: {
    background: 'rgba(253, 121, 168, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid #fd79a8',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
    boxShadow: '0 4px 20px rgba(253, 121, 168, 0.2)',
  },
  errorIcon: {
    fontSize: '32px',
  },
  errorContent: {
    flex: 1,
  },
  errorTitle: {
    margin: '0 0 8px 0',
    color: '#e84393',
    fontSize: '20px',
    fontWeight: '700',
  },
  errorText: {
    margin: '0 0 16px 0',
    color: '#e84393',
    fontSize: '15px',
  },
  retryButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(253, 121, 168, 0.3)',
  },
  emptyState: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    textAlign: 'center',
    padding: '60px 40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    animation: 'pulse 2s ease-in-out infinite',
  },
  emptyTitle: {
    margin: '0 0 12px 0',
    fontSize: '28px',
    fontWeight: '800',
    color: '#1e293b',
  },
  emptyText: {
    margin: '0 0 32px 0',
    color: '#64748b',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  eventGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '24px',
    animation: 'fadeIn 0.5s ease-out',
  },
  eventCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  eventTypeIcon: {
    fontSize: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    color: 'white',
  },
  cardBody: {
    marginBottom: '16px',
  },
  eventName: {
    margin: '0 0 16px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  detailIcon: {
    fontSize: '16px',
  },
  detailText: {
    fontSize: '14px',
    color: '#64748b',
  },
  countdown: {
    marginTop: '12px',
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(253, 203, 110, 0.3)',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '2px solid rgba(226, 232, 240, 0.5)',
  },
  eventType: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '600',
  },
  viewButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
};

export default EventList;
