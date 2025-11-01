/**
 * Customer Detail Page
 * 
 * Bestandslocatie: frontend/src/pages/customers/CustomerDetail.jsx
 * 
 * Detailpagina voor een specifieke klant met alle informatie
 * ✅ FIXED: Restore function now works correctly
 * ✅ NEW: Permanent delete option for truly removing customers
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/customers/${customerId}`);
      setCustomer(response.data);
    } catch (err) {
      console.error('Failed to fetch customer:', err);
      setError('Kon klant niet laden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('⚠️ Weet je zeker dat je deze klant wilt verwijderen?\n\n✅ Je kunt de klant later nog herstellen.\n\n(Tip: Voor permanent verwijderen, gebruik de "Permanent Verwijderen" knop)')) {
      return;
    }

    try {
      // Soft delete (can be restored)
      await api.delete(`/customers/${customerId}`);
      alert('✅ Klant verwijderd (kan nog worden hersteld)');
      navigate('/customers');
    } catch (err) {
      console.error('Failed to delete customer:', err);
      alert('❌ Fout bij verwijderen van klant');
    }
  };

  const handlePermanentDelete = async () => {
    if (!window.confirm('⚠️⚠️⚠️ PERMANENTE VERWIJDERING ⚠️⚠️⚠️\n\nWeet je ABSOLUUT ZEKER dat je deze klant PERMANENT wilt verwijderen?\n\n❌ Dit kan NIET ongedaan gemaakt worden!\n❌ Alle events, foto\'s en posts worden ook verwijderd!\n❌ Het emailadres wordt vrijgegeven voor nieuwe klanten!\n\nTyp OK als je zeker bent.')) {
      return;
    }

    const confirmation = prompt('Type "VERWIJDER PERMANENT" om te bevestigen:');
    if (confirmation !== 'VERWIJDER PERMANENT') {
      alert('Permanent verwijderen geannuleerd');
      return;
    }

    try {
      // Permanent delete (cannot be undone!)
      await api.delete(`/customers/${customerId}/permanent`);
      alert('✅ Klant permanent verwijderd');
      navigate('/customers');
    } catch (err) {
      console.error('Failed to permanently delete customer:', err);
      alert('❌ Fout bij permanent verwijderen van klant');
    }
  };

  const handleArchive = async () => {
    try {
      await api.post(`/customers/${customerId}/archive`);
      alert('✅ Klant gearchiveerd');
      fetchCustomer(); // Refresh
    } catch (err) {
      console.error('Failed to archive customer:', err);
      alert('❌ Fout bij archiveren van klant');
    }
  };

  const handleRestore = async () => {
    try {
      await api.post(`/customers/${customerId}/restore`);
      alert('✅ Klant hersteld!');
      fetchCustomer(); // Refresh
    } catch (err) {
      console.error('Failed to restore customer:', err);
      alert('❌ Fout bij herstellen van klant');
    }
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

  if (error || !customer) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2 style={styles.errorTitle}>⚠️ Fout</h2>
          <p style={styles.errorText}>{error || 'Klant niet gevonden'}</p>
          <button onClick={() => navigate('/customers')} style={styles.button}>
            Terug naar overzicht
          </button>
        </div>
      </div>
    );
  }

  const displayName = customer.company_name || 
    `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 
    'Onbekende klant';

  const getFullAddress = () => {
    const parts = [];
    
    if (customer.street) {
      let street = customer.street;
      if (customer.house_number) {
        street += ` ${customer.house_number}`;
        if (customer.house_number_addition) {
          street += `${customer.house_number_addition}`;
        }
      }
      parts.push(street);
    }
    
    if (customer.postal_code && customer.city) {
      parts.push(`${customer.postal_code} ${customer.city}`);
    } else if (customer.postal_code) {
      parts.push(customer.postal_code);
    } else if (customer.city) {
      parts.push(customer.city);
    }
    
    if (customer.country) {
      parts.push(customer.country);
    }
    
    return parts.length > 0 ? parts.join(', ') : 'Geen adres';
  };

  const getStatusBadge = () => {
    const statusConfig = {
      active: { label: '✅ Actief', color: '#2e7d32', bg: '#e8f5e9' },
      archived: { label: '📦 Gearchiveerd', color: '#f57c00', bg: '#fff3e0' },
      deleted: { label: '🗑️ Verwijderd', color: '#c62828', bg: '#ffebee' }
    };
    
    const config = statusConfig[customer.status] || statusConfig.active;
    
    return (
      <span style={{
        ...styles.statusBadge,
        color: config.color,
        backgroundColor: config.bg
      }}>
        {config.label}
      </span>
    );
  };

  const isDeleted = customer.status === 'deleted';
  const isArchived = customer.status === 'archived';
  const isActive = customer.status === 'active';

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate('/customers')} style={styles.backButton}>
          ← Terug
        </button>
        <h1 style={styles.title}>{displayName}</h1>
        <div style={styles.headerActions}>
          {!isDeleted && (
            <button 
              onClick={() => navigate(`/events/create?customerId=${customerId}`)}
              style={styles.primaryButton}
            >
              + Nieuw Event
            </button>
          )}
        </div>
      </div>

      {/* Deleted Warning */}
      {isDeleted && (
        <div style={styles.warningBanner}>
          <span style={styles.warningIcon}>⚠️</span>
          <div>
            <strong>Deze klant is verwijderd</strong>
            <p style={styles.warningText}>
              De klant is verborgen maar kan nog worden hersteld. 
              Gebruik "Herstellen" om de klant opnieuw actief te maken.
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={styles.content}>
        {/* Main Info Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>📋 Basis Informatie</h2>
            {getStatusBadge()}
          </div>

          <div style={styles.infoGrid}>
            {customer.first_name && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Voornaam</span>
                <span style={styles.infoValue}>{customer.first_name}</span>
              </div>
            )}

            {customer.last_name && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Achternaam</span>
                <span style={styles.infoValue}>{customer.last_name}</span>
              </div>
            )}

            {customer.company_name && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Bedrijfsnaam</span>
                <span style={styles.infoValue}>{customer.company_name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📞 Contact Informatie</h2>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email</span>
              <a href={`mailto:${customer.email}`} style={styles.infoLink}>
                {customer.email}
              </a>
            </div>

            {customer.phone && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Telefoon</span>
                <a href={`tel:${customer.phone}`} style={styles.infoLink}>
                  {customer.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Address Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🏠 Adres</h2>
          
          <div style={styles.infoGrid}>
            {customer.street || customer.house_number ? (
              <>
                {customer.street && (
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Straat</span>
                    <span style={styles.infoValue}>{customer.street}</span>
                  </div>
                )}

                {customer.house_number && (
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Huisnummer</span>
                    <span style={styles.infoValue}>
                      {customer.house_number}
                      {customer.house_number_addition && ` ${customer.house_number_addition}`}
                    </span>
                  </div>
                )}

                {customer.postal_code && (
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Postcode</span>
                    <span style={styles.infoValue}>{customer.postal_code}</span>
                  </div>
                )}

                {customer.city && (
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Plaats</span>
                    <span style={styles.infoValue}>{customer.city}</span>
                  </div>
                )}

                {customer.country && (
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Land</span>
                    <span style={styles.infoValue}>{customer.country}</span>
                  </div>
                )}

                <div style={{...styles.infoItem, gridColumn: '1 / -1'}}>
                  <span style={styles.infoLabel}>Volledig adres</span>
                  <span style={styles.infoValue}>{getFullAddress()}</span>
                </div>
              </>
            ) : (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>Geen adres opgegeven</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes Card */}
        {customer.notes && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📝 Notities</h2>
            <div style={styles.notesBox}>
              {customer.notes}
            </div>
          </div>
        )}

        {/* Google Drive Card */}
        {customer.google_drive_folder_id && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>☁️ Google Drive</h2>
            <a
              href={`https://drive.google.com/drive/folders/${customer.google_drive_folder_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.driveLink}
            >
              📁 Open klantfolder in Google Drive →
            </a>
          </div>
        )}

        {/* Actions Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>⚙️ Acties</h2>
          
          <div style={styles.actionsGrid}>
            {!isDeleted && (
              <button
                onClick={() => navigate(`/customers/${customerId}/edit`)}
                style={styles.actionButton}
              >
                ✏️ Bewerken
              </button>
            )}

            {isActive && (
              <button onClick={handleArchive} style={styles.actionButton}>
                📦 Archiveren
              </button>
            )}

            {(isArchived || isDeleted) && (
              <button onClick={handleRestore} style={styles.restoreButton}>
                ♻️ Herstellen
              </button>
            )}

            {!isDeleted && (
              <button onClick={handleDelete} style={styles.deleteButton}>
                🗑️ Verwijderen
              </button>
            )}

            {isDeleted && (
              <button onClick={handlePermanentDelete} style={styles.permanentDeleteButton}>
                ❌ Permanent Verwijderen
              </button>
            )}
          </div>

          {isDeleted && (
            <div style={styles.helperText}>
              💡 Tip: "Permanent Verwijderen" maakt het emailadres beschikbaar voor nieuwe klanten
            </div>
          )}
        </div>
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
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '2px solid #e0e0e0',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: '700',
    flex: 1,
  },
  headerActions: {
    display: 'flex',
    gap: '0.75rem',
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
  },
  warningBanner: {
    backgroundColor: '#fff3cd',
    border: '2px solid #ffecb5',
    borderRadius: '8px',
    padding: '1.5rem',
    margin: '1rem 2rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  warningIcon: {
    fontSize: '2rem',
  },
  warningText: {
    margin: '0.5rem 0 0 0',
    color: '#856404',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  infoLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: '1rem',
    color: '#333',
  },
  infoLink: {
    fontSize: '1rem',
    color: '#667eea',
    textDecoration: 'none',
  },
  notesBox: {
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  driveLink: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f5f5f5',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  actionButton: {
    padding: '0.875rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  restoreButton: {
    padding: '0.875rem',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  deleteButton: {
    padding: '0.875rem',
    backgroundColor: '#ffebee',
    color: '#c62828',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  permanentDeleteButton: {
    padding: '0.875rem',
    backgroundColor: '#b71c1c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  helperText: {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '1rem',
    fontStyle: 'italic',
  },
  button: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
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
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  errorTitle: {
    fontSize: '2rem',
    color: '#c62828',
    marginBottom: '1rem',
  },
  errorText: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
  },
  emptyText: {
    color: '#999',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
};

export default CustomerDetail;
