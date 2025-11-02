/**
 * Event Edit Page
 * 
 * Bestandslocatie: frontend/src/pages/events/EventEdit.jsx
 * Volledige pad: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/pages/events/EventEdit.jsx
 * 
 * Edit pagina voor bestaand event
 * Pre-populeerd met huidige event data
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
  
  // Form state
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
      
      // Populate form with existing data
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
    
    // Validation
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
      
      // Success - navigate back to detail
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
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Event laden...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.event_name) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3 style={styles.errorTitle}>Fout bij laden</h3>
          <p style={styles.errorText}>{error}</p>
          <button onClick={() => navigate(`/events/${eventId}`)} style={styles.backButton}>
            Terug naar event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button 
          onClick={() => navigate(`/events/${eventId}`)}
          style={styles.backButton}
        >
          ← Terug naar Event
        </button>
        <h1 style={styles.title}>Event Bewerken</h1>
      </div>

      {/* Form */}
      <div style={styles.content}>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Basic Info Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📋 Basis Informatie</h2>
            
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
            <h2 style={styles.sectionTitle}>📍 Locatie</h2>
            
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
            <h2 style={styles.sectionTitle}>📝 Beschrijving</h2>
            
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
              {saving ? 'Opslaan...' : '💾 Opslaan'}
            </button>
          </div>
        </form>
      </div>
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
    padding: '1.5rem 2rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    color: '#666',
    transition: 'all 0.2s',
  },
  title: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#333',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '0.875rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s',
    outline: 'none',
  },
  select: {
    padding: '0.875rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
  },
  textarea: {
    padding: '0.875rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'all 0.2s',
    outline: 'none',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    paddingTop: '1rem',
  },
  cancelButton: {
    padding: '0.875rem 1.5rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#666',
    transition: 'all 0.2s',
  },
  submitButton: {
    padding: '0.875rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  errorBox: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1rem',
    backgroundColor: '#fee',
    border: '2px solid #fcc',
    borderRadius: '8px',
    color: '#c33',
    alignItems: 'center',
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
  },
  errorIcon: {
    fontSize: '3rem',
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
};

export default EventEdit;
