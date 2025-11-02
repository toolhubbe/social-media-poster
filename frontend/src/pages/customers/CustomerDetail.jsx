/**
 * Customer Detail Page - MODERN VERSION
 * 
 * Bestandslocatie: frontend/src/pages/customers/CustomerDetail.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/customers/CustomerDetail.jsx
 * 
 * ✅ MODERNIZED: Glassmorphism profile card, gradient borders, modern layout
 * ✅ FUNCTIONALITEIT: 100% behouden - alleen styling aangepast
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
      fetchCustomer();
    } catch (err) {
      console.error('Failed to archive customer:', err);
      alert('❌ Fout bij archiveren van klant');
    }
  };

  const handleRestore = async () => {
    try {
      await api.post(`/customers/${customerId}/restore`);
      alert('✅ Klant hersteld!');
      fetchCustomer();
    } catch (err) {
      console.error('Failed to restore customer:', err);
      alert('❌ Fout bij herstellen van klant');
    }
  };

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.loadingCard}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Klant laden...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.errorCard}>
            <div style={styles.errorIcon}>⚠️</div>
            <h2 style={styles.errorTitle}>Fout bij laden</h2>
            <p style={styles.errorText}>{error || 'Klant niet gevonden'}</p>
            <button onClick={() => navigate('/customers')} style={styles.primaryButton}>
              Terug naar overzicht
            </button>
          </div>
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
      active: { 
        label: '✅ Actief', 
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        shadow: 'rgba(67, 233, 123, 0.3)'
      },
      archived: { 
        label: '📦 Gearchiveerd', 
        gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
        shadow: 'rgba(253, 203, 110, 0.3)'
      },
      deleted: { 
        label: '🗑️ Verwijderd', 
        gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
        shadow: 'rgba(253, 121, 168, 0.3)'
      }
    };
    
    const config = statusConfig[customer.status] || statusConfig.active;
    
    return (
      <span style={{
        ...styles.statusBadge,
        background: config.gradient,
        boxShadow: `0 4px 15px ${config.shadow}`
      }}>
        {config.label}
      </span>
    );
  };

  const isDeleted = customer.status === 'deleted';
  const isArchived = customer.status === 'archived';
  const isActive = customer.status === 'active';

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Header Card */}
        <div style={styles.headerCard}>
          <button onClick={() => navigate('/customers')} style={styles.backButton}>
            ← Terug
          </button>
          <div style={styles.headerContent}>
            <div style={styles.profileIcon}>👤</div>
            <div style={styles.headerInfo}>
              <h1 style={styles.title}>{displayName}</h1>
              {getStatusBadge()}
            </div>
          </div>
          {!isDeleted && (
            <button 
              onClick={() => navigate(`/events/create?customerId=${customerId}`)}
              style={styles.primaryButton}
            >
              <span>✨</span>
              <span>Nieuw Event</span>
            </button>
          )}
        </div>

        {/* Deleted Warning */}
        {isDeleted && (
          <div style={styles.warningBanner}>
            <span style={styles.warningIconLarge}>⚠️</span>
            <div style={styles.warningContent}>
              <strong style={styles.warningTitle}>Deze klant is verwijderd</strong>
              <p style={styles.warningText}>
                De klant is verborgen maar kan nog worden hersteld. 
                Gebruik "Herstellen" om de klant opnieuw actief te maken.
              </p>
            </div>
          </div>
        )}

        {/* Main Info Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span style={styles.cardTitleIcon}>📋</span>
            Basis Informatie
          </h2>

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
          <h2 style={styles.cardTitle}>
            <span style={styles.cardTitleIcon}>📞</span>
            Contact Informatie
          </h2>
          
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
          <h2 style={styles.cardTitle}>
            <span style={styles.cardTitleIcon}>🏠</span>
            Adres
          </h2>
          
          <div style={styles.addressBox}>
            {getFullAddress()}
          </div>
        </div>

        {/* Notes Card */}
        {customer.notes && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardTitleIcon}>📝</span>
              Notities
            </h2>
            
            <div style={styles.notesBox}>
              {customer.notes}
            </div>
          </div>
        )}

        {/* Google Drive Card */}
        {customer.google_drive_folder_id && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardTitleIcon}>📁</span>
              Google Drive
            </h2>
            
            <a
              href={`https://drive.google.com/drive/folders/${customer.google_drive_folder_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.driveLink}
            >
              📂 Open Drive Folder →
            </a>
          </div>
        )}

        {/* Actions Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span style={styles.cardTitleIcon}>⚙️</span>
            Acties
          </h2>
          
          <div style={styles.actionsGrid}>
            {!isDeleted && (
              <button
                onClick={() => navigate(`/customers/${customerId}/edit`)}
                style={styles.actionButtonEdit}
              >
                <span>✏️</span>
                <span>Bewerken</span>
              </button>
            )}

            {isActive && (
              <button onClick={handleArchive} style={styles.actionButtonArchive}>
                <span>📦</span>
                <span>Archiveren</span>
              </button>
            )}

            {(isArchived || isDeleted) && (
              <button onClick={handleRestore} style={styles.actionButtonRestore}>
                <span>♻️</span>
                <span>Herstellen</span>
              </button>
            )}

            {!isDeleted && (
              <button onClick={handleDelete} style={styles.actionButtonDelete}>
                <span>🗑️</span>
                <span>Verwijderen</span>
              </button>
            )}

            {isDeleted && (
              <button onClick={handlePermanentDelete} style={styles.actionButtonPermanent}>
                <span>❌</span>
                <span>Permanent Verwijderen</span>
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
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  headerCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
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
  headerContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  profileIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
  },
  headerInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e293b',
  },
  statusBadge: {
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '700',
    color: 'white',
    display: 'inline-block',
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
  warningBanner: {
    background: 'rgba(255, 243, 205, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '2px solid #fdcb6e',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    boxShadow: '0 4px 20px rgba(253, 203, 110, 0.3)',
  },
  warningIconLarge: {
    fontSize: '32px',
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    display: 'block',
    fontSize: '18px',
    color: '#856404',
    marginBottom: '8px',
  },
  warningText: {
    margin: 0,
    color: '#856404',
    fontSize: '15px',
    lineHeight: '1.6',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    animation: 'fadeIn 0.5s ease-out',
  },
  cardTitle: {
    margin: '0 0 24px 0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cardTitleIcon: {
    fontSize: '24px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  infoValue: {
    fontSize: '16px',
    color: '#1e293b',
    fontWeight: '600',
  },
  infoLink: {
    fontSize: '16px',
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  addressBox: {
    padding: '20px',
    background: 'rgba(226, 232, 240, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#1e293b',
    fontWeight: '500',
  },
  notesBox: {
    padding: '20px',
    background: 'rgba(226, 232, 240, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#475569',
    whiteSpace: 'pre-wrap',
  },
  driveLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)',
    transition: 'all 0.3s ease',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  actionButtonEdit: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  actionButtonArchive: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(253, 203, 110, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  actionButtonRestore: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  actionButtonDelete: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(253, 121, 168, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  actionButtonPermanent: {
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #b71c1c 0%, #c62828 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(183, 28, 28, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  helperText: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '20px',
    fontStyle: 'italic',
    fontWeight: '500',
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
  errorText: {
    fontSize: '16px',
    color: '#64748b',
    marginBottom: '32px',
  },
};

export default CustomerDetail;
