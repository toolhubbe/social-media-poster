/**
 * Customer Edit Page
 * 
 * Bestandslocatie: frontend/src/pages/customers/CustomerEdit.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/customers/CustomerEdit.jsx
 * 
 * Bewerkingsformulier voor bestaande klanten
 * ✅ Full address fields support
 * ✅ Notes field support
 * ✅ Pre-filled with existing data
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CustomerEdit = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    notes: ''
  });

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/customers/${customerId}`);
      const customer = response.data;
      
      // Pre-fill form with existing data
      setFormData({
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        company_name: customer.company_name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        street: customer.street || '',
        house_number: customer.house_number || '',
        house_number_addition: customer.house_number_addition || '',
        postal_code: customer.postal_code || '',
        city: customer.city || '',
        country: customer.country || 'Nederland',
        notes: customer.notes || ''
      });
    } catch (err) {
      console.error('Failed to fetch customer:', err);
      setError('Kon klant niet laden. Probeer het opnieuw.');
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
      setError('Vul minimaal een voornaam, achternaam OF bedrijfsnaam in');
      return false;
    }
    
    // If address is partially filled, validate completeness
    const hasAnyAddress = formData.street || formData.house_number || formData.postal_code || formData.city;
    if (hasAnyAddress) {
      if (!formData.street || !formData.house_number || !formData.postal_code || !formData.city) {
        setError('Als je een adres invult, zijn straat, huisnummer, postcode en plaats verplicht');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Prepare data - remove empty strings to send null instead
      const dataToSend = {};
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value && value.trim() !== '') {
          dataToSend[key] = value.trim();
        } else if (key === 'country') {
          dataToSend[key] = 'Nederland';
        }
      });

      console.log('Updating customer:', dataToSend);
      await api.put(`/customers/${customerId}`, dataToSend);
      
      alert('✅ Klant succesvol bijgewerkt!');
      navigate(`/customers/${customerId}`);
    } catch (err) {
      console.error('Failed to update customer:', err);
      console.error('Error response:', err.response?.data);
      
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message ||
                          'Er is een fout opgetreden bij het bijwerken van de klant';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/customers/${customerId}`);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Klant laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>✏️ Klant Bewerken</h2>
          <p style={styles.subtitle}>
            Wijzig de gegevens van de klant
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Error Message */}
          {error && (
            <div style={styles.errorAlert}>
              <span style={styles.alertIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Basis Informatie */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📝 Basis Informatie</h3>
            
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
                  placeholder="Bijv: Jan"
                  style={styles.input}
                  disabled={saving}
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
                  placeholder="Bijv: Jansen"
                  style={styles.input}
                  disabled={saving}
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
                disabled={saving}
              />
            </div>

            <div style={styles.helperText}>
              💡 Vul minimaal één van de naamvelden in
            </div>
          </div>

          {/* Section 2: Contact Informatie */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📞 Contact Informatie</h3>
            
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
                  disabled={saving}
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
                  disabled={saving}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Adres Informatie */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🏠 Adres Informatie</h3>
            
            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: '2'}}>
                <label style={styles.label} htmlFor="street">
                  Straat
                </label>
                <input
                  id="street"
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Bijv: Kerkstraat"
                  style={styles.input}
                  disabled={saving}
                />
              </div>

              <div style={{...styles.formGroup, flex: '1'}}>
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
                  disabled={saving}
                />
              </div>

              <div style={{...styles.formGroup, flex: '0.5'}}>
                <label style={styles.label} htmlFor="house_number_addition">
                  Toev.
                </label>
                <input
                  id="house_number_addition"
                  type="text"
                  name="house_number_addition"
                  value={formData.house_number_addition}
                  onChange={handleChange}
                  placeholder="A"
                  style={styles.input}
                  disabled={saving}
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
                  disabled={saving}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="city">
                  Plaats/Gemeente
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Bijv: Amsterdam"
                  style={styles.input}
                  disabled={saving}
                />
              </div>
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
                disabled={saving}
              />
            </div>

            <div style={styles.helperText}>
              💡 Als je een adres invult, zijn straat, huisnummer, postcode en plaats verplicht
            </div>
          </div>

          {/* Section 4: Extra Informatie */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📋 Extra Informatie</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="notes">
                Notities
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Algemene notities over deze klant..."
                rows="4"
                style={{...styles.input, ...styles.textarea}}
                disabled={saving}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            <button
              type="button"
              onClick={handleCancel}
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
                  Opslaan...
                </>
              ) : (
                '✓ Wijzigingen Opslaan'
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
    maxWidth: '900px',
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
    margin: '0 0 1.5rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  formGroup: {
    flex: '1',
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
    lineHeight: '1.5',
  },
  helperText: {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '0.5rem',
    fontStyle: 'italic',
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
};

export default CustomerEdit;
