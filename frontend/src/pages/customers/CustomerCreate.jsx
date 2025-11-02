/**
 * Customer Create Page - MODERN VERSION
 * 
 * Bestandslocatie: frontend/src/pages/customers/CustomerCreate.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/customers/CustomerCreate.jsx
 * 
 * ✅ MODERNIZED: Glassmorphism forms, gradient styling, modern inputs
 * ✅ FUNCTIONALITEIT: 100% behouden - alleen styling aangepast
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
    first_name: '',
    last_name: '',
    company_name: '',
    email: '',
    phone: '',
    street: '',
    house_number: '',
    house_number_addition: '',
    postal_code: '',
    city: '',
    country: 'Nederland',
    notes: '',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    if (!formData.first_name.trim() && !formData.last_name.trim() && !formData.company_name.trim()) {
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

      if (returnTo) {
        const displayName = customer.company_name || `${customer.first_name} ${customer.last_name}`.trim();
        navigate(`${returnTo}?customerId=${customer.customer_id}&customerName=${encodeURIComponent(displayName)}`);
      } else {
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
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.formCard}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>✨</div>
            <h2 style={styles.title}>Nieuwe Klant</h2>
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
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            {/* Section: Basis Informatie */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>👤</span>
                Basis Informatie
              </h3>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="first_name">
                    Voornaam
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Jan"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="last_name">
                    Achternaam
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Jansen"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>
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

              <div style={styles.helperText}>
                💡 Vul minimaal een naam OF bedrijfsnaam in
              </div>
            </div>

            {/* Section: Contact Informatie */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📞</span>
                Contact Informatie
              </h3>
              
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
            </div>

            {/* Section: Adres Informatie */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>🏠</span>
                Adres Informatie
              </h3>
              
              <div style={styles.formRow}>
                <div style={{...styles.formGroup, flex: 2}}>
                  <label style={styles.label} htmlFor="street">
                    Straatnaam
                  </label>
                  <input
                    id="street"
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Hoofdstraat"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>

                <div style={{...styles.formGroup, flex: 1}}>
                  <label style={styles.label} htmlFor="house_number">
                    Huisnummer
                  </label>
                  <input
                    id="house_number"
                    type="text"
                    name="house_number"
                    value={formData.house_number}
                    onChange={handleChange}
                    placeholder="123"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>

                <div style={{...styles.formGroup, flex: 1}}>
                  <label style={styles.label} htmlFor="house_number_addition">
                    Toevoeging
                  </label>
                  <input
                    id="house_number_addition"
                    type="text"
                    name="house_number_addition"
                    value={formData.house_number_addition}
                    onChange={handleChange}
                    placeholder="A"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="postal_code">
                    Postcode
                  </label>
                  <input
                    id="postal_code"
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    placeholder="1234 AB"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="city">
                    Plaats
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Amsterdam"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="country">
                    Land
                  </label>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Nederland"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Section: Extra Informatie */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📋</span>
                Extra Informatie
              </h3>
              
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
                    <span>Aanmaken...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Klant Aanmaken</span>
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
  infoBadge: {
    marginTop: '20px',
    padding: '12px 20px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    display: 'inline-block',
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
  formRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  formGroup: {
    flex: 1,
    marginBottom: '16px',
    minWidth: '200px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  required: {
    color: '#e84393',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    outline: 'none',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '120px',
    lineHeight: '1.6',
  },
  helperText: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '12px',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    paddingTop: '32px',
    flexWrap: 'wrap',
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
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
};

export default CustomerCreate;
