/**
 * Event Form Component
 * 
 * Bestandslocatie: frontend/src/components/events/EventForm.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/components/events/EventForm.jsx
 * 
 * Formulier voor event details (stap 2 na customer selectie)
 * Maakt event aan via backend API en creëert automatisch Drive subfolder
 */

import React, { useState } from 'react';
import api from '../../services/api';

const EventForm = ({ customer, onBack, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    event_name: '',
    event_type: 'corporate',
    event_date: '',
    location_city: '',
    location_venue: '',
    description: '',
    status: 'draft'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.event_name.trim()) {
      setError('Event naam is verplicht');
      return false;
    }
    if (!formData.event_date) {
      setError('Event datum is verplicht');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/events/', {
        ...formData,
        customer_id: customer.customer_id
      });

      console.log('Event created successfully:', response.data);
      
      // Show success message briefly before redirect
      alert('✅ Event succesvol aangemaakt!');
      onSuccess(response.data);
    } catch (err) {
      console.error('Failed to create event:', err);
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message ||
                          'Er is een fout opgetreden bij het aanmaken van het event';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const eventTypes = [
    { value: 'corporate', label: '🏢 Zakelijk' },
    { value: 'wedding', label: '💍 Bruiloft' },
    { value: 'birthday', label: '🎂 Verjaardag' },
    { value: 'anniversary', label: '🎉 Jubileum' },
    { value: 'conference', label: '🎤 Conferentie' },
    { value: 'party', label: '🎊 Feest' },
    { value: 'other', label: '📌 Anders' }
  ];

  return (
    <div className="event-form-container">
      <div className="event-form-card">
        {/* Header */}
        <div className="card-header">
          <h2>🎉 Nieuw Event</h2>
          <div className="customer-badge">
            <span className="badge-label">Voor:</span>
            <span className="badge-value">{customer.company_name || customer.full_name}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-body">
          {/* Error Message */}
          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              <span className="alert-message">{error}</span>
            </div>
          )}

          {/* Event Name */}
          <div className="form-group">
            <label htmlFor="event_name">
              Event Naam <span className="required">*</span>
            </label>
            <input
              id="event_name"
              type="text"
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              required
              placeholder="Bijv: Bedrijfsfeest 2025"
              autoFocus
              disabled={loading}
            />
          </div>

          {/* Event Type */}
          <div className="form-group">
            <label htmlFor="event_type">
              Type <span className="required">*</span>
            </label>
            <select
              id="event_type"
              name="event_type"
              value={formData.event_type}
              onChange={handleChange}
              required
              disabled={loading}
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Event Date */}
          <div className="form-group">
            <label htmlFor="event_date">
              Datum <span className="required">*</span>
            </label>
            <input
              id="event_date"
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              required
              disabled={loading}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Location Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location_city">Stad</label>
              <input
                id="location_city"
                type="text"
                name="location_city"
                value={formData.location_city}
                onChange={handleChange}
                placeholder="Bijv: Amsterdam"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location_venue">Locatie</label>
              <input
                id="location_venue"
                type="text"
                name="location_venue"
                value={formData.location_venue}
                onChange={handleChange}
                placeholder="Bijv: Grand Hotel"
                disabled={loading}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Beschrijving</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Extra details over het event..."
              disabled={loading}
            />
            <span className="helper-text">
              Optioneel: voeg hier extra informatie toe over het event
            </span>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-secondary"
              disabled={loading}
            >
              ← Andere Klant
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Event aanmaken...
                </>
              ) : (
                '✓ Event Aanmaken'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Styles */}
      <style jsx>{`
        .event-form-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .event-form-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .card-header h2 {
          margin: 0 0 1rem 0;
          font-size: 1.75rem;
        }

        .customer-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.95rem;
        }

        .badge-label {
          opacity: 0.9;
        }

        .badge-value {
          font-weight: 600;
        }

        .card-body {
          padding: 2rem;
        }

        .alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          animation: slideDown 0.3s ease-out;
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

        .alert-error {
          background: #fee;
          border: 1px solid #fcc;
          color: #c33;
        }

        .alert-icon {
          font-size: 1.25rem;
        }

        .alert-message {
          flex: 1;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
        }

        .required {
          color: #e53e3e;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.2s;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input:disabled,
        .form-group select:disabled,
        .form-group textarea:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .helper-text {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: #888;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.5rem;
          margin-top: 1.5rem;
          border-top: 2px solid #e0e0e0;
        }

        .btn {
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          flex: 1;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #f5f5f5;
          color: #333;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #e0e0e0;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .event-form-container {
            padding: 0 0.5rem;
            margin: 1rem auto;
          }

          .card-body {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .card-header h2 {
            font-size: 1.5rem;
          }

          .customer-badge {
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EventForm;
