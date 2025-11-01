/**
 * Customer Create Page
 * 
 * Bestandslocatie: frontend/src/pages/customers/CustomerCreate.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/customers/CustomerCreate.jsx
 * 
 * Formulier voor het aanmaken van nieuwe klanten
 * Ondersteunt redirect terug naar event creation na aanmaken
 */

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const CustomerCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    status: 'active'
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
    if (!formData.email.trim()) {
      setError('Email is verplicht');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Voer een geldig email adres in');
      return false;
    }
    if (!formData.full_name.trim() && !formData.company_name.trim()) {
      setError('Vul minimaal een naam OF bedrijfsnaam in');
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
      const response = await api.post('/customers/', formData);
      const customer = response.data;
      
      console.log('Customer created successfully:', customer);

      // Check if we should redirect back to event creation
      if (returnTo) {
        navigate(`${returnTo}?customerId=${customer.customer_id}&customerName=${encodeURIComponent(customer.company_name || customer.full_name)}`);
      } else {
        // Show success and redirect to customer list
        alert('✅ Klant succesvol aangemaakt!');
        navigate('/customers');
      }
    } catch (err) {
      console.error('Failed to create customer:', err);
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message ||
                          'Er is een fout opgetreden bij het aanmaken van de klant';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (returnTo) {
      navigate(returnTo);
    } else {
      navigate('/customers');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>👤 Nieuwe Klant</h2>
          <p style={styles.subtitle}>
            Voeg een nieuwe klant toe aan je systeem
          </p>
          {returnTo && (
            <div style={styles.infoBadge}>
              ℹ️ Na aanmaken ga je terug naar event creation
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Error Message */}
          {error && (
            <div style={styles.errorAlert}>
              <span style={styles.alertIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Section: Basis Informatie */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Basis Informatie</h3>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="full_name">
                  Volledige Naam
                </label>
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Bijv: Jan Jansen"
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="company_name">
                  Bedrijfsnaam
                </label>
                <input
                  id="company_name"
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Bijv: Jansen BV"
                  style={styles.input}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={styles.helperText}>
              💡 Vul minimaal één van beide velden in
            </div>
          </div>

          {/* Section: Contact Informatie */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Informatie</h3>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="email">
                  Email <span style={styles.required}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@voorbeeld.nl"
                  required
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="phone">
                  Telefoon
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+31 6 12345678"
                  style={styles.input}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="address">
                Adres
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Straat 123, 1234 AB Stad"
                style={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          {/* Section: Extra Informatie */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Extra Informatie</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.input}
                disabled={loading}
              >
                <option value="active">Actief</option>
                <option value="inactive">Inactief</option>
                <option value="archived">Gearchiveerd</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="notes">
                Notities
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Extra opmerkingen over deze klant..."
                rows="4"
                style={{...styles.input, ...styles.textarea}}
                disabled={loading}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            <button
              type="button"
              onClick={handleCancel}
              style={styles.cancelButton}
              disabled={loading}
            >
              Annuleren
            </button>

            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span style={styles.spinnerSmall}></span>
                  Aanmaken...
                </>
              ) : (
                '✓ Klant Aanmaken'
              )}
            </button>
          </div>
        </form>
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
    padding: '2rem 1rem',
  },
  formCard: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '2rem',
    fontWeight: '700',
  },
  subtitle: {
    margin: 0,
    fontSize: '1.05rem',
    opacity: 0.9,
  },
  infoBadge: {
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  form: {
    padding: '2rem',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    backgroundColor: '#fee',
    border: '2px solid #fcc',
    borderRadius: '8px',
    color: '#c33',
    marginBottom: '1.5rem',
  },
  alertIcon: {
    fontSize: '1.25rem',
  },
  section: {
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '2px solid #e0e0e0',
  },
  sectionTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
  },
  required: {
    color: '#e53e3e',
  },
  input: {
    width: '100%',
    padding: '0.875rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '100px',
  },
  helperText: {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '0.5rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    paddingTop: '1.5rem',
  },
  cancelButton: {
    padding: '0.875rem 1.5rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#666',
    transition: 'all 0.2s',
  },
  submitButton: {
    padding: '0.875rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  spinnerSmall: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
};

export default CustomerCreate;
