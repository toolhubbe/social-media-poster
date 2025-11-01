/**
 * Customer List Page
 * 
 * Bestandslocatie: frontend/src/pages/customers/CustomerList.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/customers/CustomerList.jsx
 * 
 * Overzichtspagina met alle klanten
 * Features: zoeken, filteren op status, klikken voor details
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CustomerList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchCustomers();
  }, [statusFilter]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      const response = await api.get('/customers/summary', { params });
      setCustomers(response.data);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setError('Kon klanten niet laden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.company_name?.toLowerCase().includes(searchLower) ||
      customer.full_name?.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(searchTerm)
    );
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Actief', color: '#4caf50', bg: '#e8f5e9' },
      inactive: { label: 'Inactief', color: '#ff9800', bg: '#fff3e0' },
      archived: { label: 'Gearchiveerd', color: '#9e9e9e', bg: '#f5f5f5' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
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

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Klanten laden...</p>
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
              <h1 style={styles.title}>Klanten</h1>
              <p style={styles.subtitle}>
                {filteredCustomers.length} {filteredCustomers.length === 1 ? 'klant' : 'klanten'}
                {searchTerm && ` gevonden voor "${searchTerm}"`}
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/customers/create')}
            style={styles.primaryButton}
          >
            + Nieuwe Klant
          </button>
        </div>

        {/* Filters */}
        <div style={styles.filtersRow}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Zoek op naam, bedrijf, email of telefoon..."
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
            <option value="active">Actief</option>
            <option value="inactive">Inactief</option>
            <option value="archived">Gearchiveerd</option>
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
              <button onClick={fetchCustomers} style={styles.retryButton}>
                Opnieuw proberen
              </button>
            </div>
          </div>
        )}

        {!error && filteredCustomers.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              {searchTerm ? '🔍' : '👥'}
            </div>
            <h3 style={styles.emptyTitle}>
              {searchTerm ? 'Geen resultaten' : 'Nog geen klanten'}
            </h3>
            <p style={styles.emptyText}>
              {searchTerm 
                ? `Geen klanten gevonden voor "${searchTerm}"`
                : 'Begin met het toevoegen van je eerste klant'
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={() => navigate('/customers/create')}
                style={styles.primaryButton}
              >
                + Eerste Klant Toevoegen
              </button>
            )}
          </div>
        ) : (
          <div style={styles.customerGrid}>
            {filteredCustomers.map((customer) => (
              <div
                key={customer.customer_id}
                style={styles.customerCard}
                onClick={() => navigate(`/customers/${customer.customer_id}`)}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.customerIcon}>👤</div>
                  {getStatusBadge(customer.status)}
                </div>

                <div style={styles.cardBody}>
                  <h3 style={styles.customerName}>
                    {customer.company_name || customer.full_name}
                  </h3>
                  
                  {customer.company_name && customer.full_name && (
                    <p style={styles.customerSubname}>{customer.full_name}</p>
                  )}

                  <div style={styles.customerDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailIcon}>📧</span>
                      <span style={styles.detailText}>{customer.email}</span>
                    </div>
                    
                    {customer.phone && (
                      <div style={styles.detailRow}>
                        <span style={styles.detailIcon}>📞</span>
                        <span style={styles.detailText}>{customer.phone}</span>
                      </div>
                    )}

                    <div style={styles.detailRow}>
                      <span style={styles.detailIcon}>📅</span>
                      <span style={styles.detailText}>
                        {customer.event_count || 0} event{customer.event_count !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/events/create?customerId=${customer.customer_id}`);
                    }}
                    style={styles.quickActionButton}
                  >
                    + Event
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customers/${customer.customer_id}`);
                    }}
                    style={styles.viewButton}
                  >
                    Bekijk →
                  </button>
                </div>
              </div>
            ))}
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
  customerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
    animation: 'fadeIn 0.3s ease-out',
  },
  customerCard: {
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
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  customerIcon: {
    fontSize: '2.5rem',
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: '1rem',
  },
  customerName: {
    margin: '0 0 0.25rem 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#333',
  },
  customerSubname: {
    margin: '0 0 1rem 0',
    fontSize: '0.95rem',
    color: '#666',
  },
  customerDetails: {
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
  cardFooter: {
    display: 'flex',
    gap: '0.75rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
  },
  quickActionButton: {
    flex: 1,
    padding: '0.625rem',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  viewButton: {
    flex: 1,
    padding: '0.625rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
};

export default CustomerList;
