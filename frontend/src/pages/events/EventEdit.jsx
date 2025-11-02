/**
 * Event Edit Page - MODERN VERSION
 * 
 * Bestandslocatie: frontend/src/pages/events/EventEdit.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/events/EventEdit.jsx
 * 
 * ✅ MODERNIZED: Glassmorphism forms, gradient styling, modern inputs
 * ✅ FUNCTIONALITEIT: 100% behouden - alleen styling aangepast
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const EventEdit = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    event_name: '',
    event_type: 'corporate',
    event_date: '',
    status: 'planned',
    location_city: '',
    location_venue: '',
    description: ''
  });

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${eventId}`);
      const event = response.data;
      
      setFormData({
        event_name: event.event_name || '',
        event_type: event.event_type || 'corporate',
        event_date: event.event_date ? event.event_date.split('T')[0] : '',
        status: event.status || 'planned',
        location_city: event.location_city || '',
        location_venue: event.location_venue || '',
        description: event.description || ''
      });
    } catch (err) {
      console.error('Failed to fetch event:', err);
      setError('Kon event niet laden');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.event_name.trim()) {
      alert('Event naam is verplicht');
      return;
    }
    if (!formData.event_date) {
      alert('Event datum is verplicht');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      await api.put(`/events/${eventId}`, formData);
      
      navigate(`/events/${eventId}`, {
        state: { message: 'Event succesvol bijgewerkt!' }
      });
    } catch (err) {
      console.error('Failed to update event:', err);
      setError(err.response?.data?.detail || 'Fout bij opslaan. Probeer opnieuw.');
    } finally {
      setSaving(false);
    }
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

  if (error && !formData.event_name) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.errorCard}>
            <div style={styles.errorIcon}>⚠️</div>
            <h3 style={styles.errorTitle}>Fout bij laden</h3>
            <p style={styles.errorText}>{error}</p>
            <button onClick={() => navigate(`/events/${eventId}`)} style={styles.backButton}>
              Terug naar event
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.formCard}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>✏️</div>
            <h2 style={styles.title}>Event Bewerken</h2>
            <p style={styles.subtitle}>
              Wijzig de gegevens van het event
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {error && (
              <div style={styles.errorAlert}>
                <span style={styles.alertIcon}>⚠️</span>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            {/* Basic Info Section */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📋</span>
                Basis Informatie
              </h2>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Event Naam *
                </label>
                <input
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  placeholder="Bijv. Bedrijfsfeest 2025"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Event Type *
                  </label>
                  <select
                    name="event_type"
                    value={formData.event_type}
                    onChange={handleChange}
                    required
                    style={styles.select}
                  >
                    <option value="corporate">🏢 Zakelijk</option>
                    <option value="wedding">💍 Bruiloft</option>
                    <option value="birthday">🎂 Verjaardag</option>
                    <option value="anniversary">🎉 Jubileum</option>
                    <option value="conference">🎤 Conferentie</option>
                    <option value="party">🎊 Feest</option>
                    <option value="other">📌 Anders</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Event Datum *
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    style={styles.select}
                  >
                    <option value="draft">Concept</option>
                    <option value="planned">Gepland</option>
                    <option value="active">Actief</option>
                    <option value="completed">Afgerond</option>
                    <option value="cancelled">Geannuleerd</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📍</span>
                Locatie
              </h2>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Stad
                  </label>
                  <input
                    type="text"
                    name="location_city"
                    value={formData.location_city}
                    onChange={handleChange}
                    placeholder="Bijv. Genk"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Locatie/Venue
                  </label>
                  <input
                    type="text"
                    name="location_venue"
                    value={formData.location_venue}
                    onChange={handleChange}
                    placeholder="Bijv. Hotel De Stadsherberg"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📝</span>
                Beschrijving
              </h2>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Omschrijving
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Extra informatie over dit event..."
                  rows="5"
                  style={styles.textarea}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.actions}>
              <button
                type="button"
                onClick={() => navigate(`/events/${eventId}`)}
                style={styles.cancelButton}
                disabled={saving}
              >
                Annuleren
              </button>
              <button
                type="submit"
                style={styles.submitButton}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span style={styles.spinnerSmall}></span>
                    <span>Opslaan...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Wijzigingen Opslaan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        input:focus, textarea:focus, select:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
      `}</style>
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
    maxWidth: '1000px',
    margin: '0 auto',
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '48px 40px',
    textAlign: 'center',
  },
  headerIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    animation: 'pulse 2s ease-in-out infinite',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '42px',
    fontWeight: '800',
  },
  subtitle: {
    margin: 0,
    fontSize: '18px',
    opacity: 0.95,
    fontWeight: '500',
  },
  form: {
    padding: '40px',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    background: 'rgba(253, 121, 168, 0.1)',
    border: '2px solid #fd79a8',
    borderRadius: '16px',
    marginBottom: '32px',
    boxShadow: '0 4px 15px rgba(253, 121, 168, 0.2)',
  },
  alertIcon: {
    fontSize: '24px',
  },
  errorText: {
    color: '#e84393',
    fontWeight: '600',
    fontSize: '15px',
  },
  section: {
    marginBottom: '32px',
    paddingBottom: '32px',
    borderBottom: '2px solid rgba(226, 232, 240, 0.5)',
  },
  sectionTitle: {
    margin: '0 0 24px 0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sectionIcon: {
    fontSize: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
    marginBottom: '16px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '14px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
  },
  select: {
    padding: '14px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '14px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'all 0.2s ease',
    outline: 'none',
    minHeight: '140px',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    paddingTop: '32px',
  },
  cancelButton: {
    padding: '14px 28px',
    background: 'rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(226, 232, 240, 0.8)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    color: '#475569',
    transition: 'all 0.3s ease',
  },
  submitButton: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)',
  },
  spinnerSmall: {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
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
  backButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    marginTop: '24px',
  },
};

export default EventEdit;
