/**
 * Customer List Page - MODERN VERSION
 * 
 * Bestandslocatie: frontend/src/pages/customers/CustomerList.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/customers/CustomerList.jsx
 * 
 * ✅ MODERNIZED: Glassmorphism, gradients, modern typography, hover effects
 * ✅ FUNCTIONALITEIT: 100% behouden - alleen styling aangepast
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
  const [statusFilter, setStatusFilter] = useState('active');

  useEffect(() => {
    fetchCustomers();
  }, [statusFilter]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: 1,
        page_size: 100
      };
      
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      } else {
        params.include_deleted = true;
      }
      
      const response = await api.get('/customers/', { params });
      setCustomers(response.data.customers || []);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setError('Kon klanten niet laden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.company_name?.toLowerCase().includes(searchLower) ||
      (customer.first_name || '' + ' ' + customer.last_name || '').toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(searchTerm)
    );
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { 
        label: 'Actief', 
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        shadow: 'rgba(67, 233, 123, 0.3)'
      },
      archived: { 
        label: 'Gearchiveerd', 
        gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
        shadow: 'rgba(253, 203, 110, 0.3)'
      },
      deleted: { 
        label: 'Verwijderd', 
        gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
        shadow: 'rgba(253, 121, 168, 0.3)'
      }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
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

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.loadingCard}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Klanten laden...</p>
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
                <h1 style={styles.title}>Klanten Beheer</h1>
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
              <span style={styles.buttonIcon}>✨</span>
              Nieuwe Klant
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
              <option value="active">Actief</option>
              <option value="all">Alle statussen</option>
              <option value="archived">Gearchiveerd</option>
              <option value="deleted">Verwijderd</option>
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
              {searchTerm ? 'Geen resultaten' : 
               statusFilter === 'deleted' ? 'Geen verwijderde klanten' :
               statusFilter === 'archived' ? 'Geen gearchiveerde klanten' :
               'Nog geen klanten'}
            </h3>
            <p style={styles.emptyText}>
              {searchTerm 
                ? `Geen klanten gevonden voor "${searchTerm}"`
                : statusFilter === 'deleted' 
                  ? 'Er zijn geen verwijderde klanten'
                  : statusFilter === 'archived'
                    ? 'Er zijn geen gearchiveerde klanten'
                    : 'Begin met het toevoegen van je eerste klant'
              }
            </p>
            {!searchTerm && statusFilter === 'active' && (
              <button 
                onClick={() => navigate('/customers/create')}
                style={styles.primaryButton}
              >
                <span style={styles.buttonIcon}>✨</span>
                Eerste Klant Toevoegen
              </button>
            )}
          </div>
        ) : (
          <div style={styles.customerGrid}>
            {filteredCustomers.map((customer) => (
              <div
                key={customer.customer_id}
                style={{
                  ...styles.customerCard,
                  ...(customer.status === 'deleted' && styles.customerCardDeleted)
                }}
                onClick={() => navigate(`/customers/${customer.customer_id}`)}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.customerIcon}>
                    👤
                  </div>
                  {getStatusBadge(customer.status)}
                </div>

                <div style={styles.cardBody}>
                  <h3 style={styles.customerName}>
                    {customer.company_name || 
                     `${customer.first_name || ''} ${customer.last_name || ''}`.trim() ||
                     'Onbekende klant'}
                  </h3>
                  
                  {customer.company_name && (customer.first_name || customer.last_name) && (
                    <p style={styles.customerSubname}>
                      {`${customer.first_name || ''} ${customer.last_name || ''}`.trim()}
                    </p>
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

                    {customer.status !== 'deleted' && (
                      <div style={styles.detailRow}>
                        <span style={styles.detailIcon}>📅</span>
                        <span style={styles.detailText}>
                          {customer.event_count || 0} event{customer.event_count !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  {customer.status !== 'deleted' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/events/create?customerId=${customer.customer_id}`);
                      }}
                      style={styles.quickActionButton}
                    >
                      + Event
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customers/${customer.customer_id}`);
                    }}
                    style={customer.status === 'deleted' ? styles.restoreButton : styles.viewButton}
                  >
                    {customer.status === 'deleted' ? 'Beheren →' : 'Bekijk →'}
                  </button>
                </div>
              </div>
            ))}
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
  customerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '24px',
    animation: 'fadeIn 0.5s ease-out',
  },
  customerCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  customerCardDeleted: {
    opacity: 0.7,
    border: '2px solid rgba(253, 121, 168, 0.3)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  customerIcon: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    color: 'white',
  },
  cardBody: {
    marginBottom: '20px',
  },
  customerName: {
    margin: '0 0 6px 0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
  },
  customerSubname: {
    margin: '0 0 16px 0',
    fontSize: '15px',
    color: '#64748b',
    fontWeight: '500',
  },
  customerDetails: {
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
  cardFooter: {
    display: 'flex',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '2px solid rgba(226, 232, 240, 0.5)',
  },
  quickActionButton: {
    flex: 1,
    padding: '12px',
    background: 'rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    transition: 'all 0.2s ease',
  },
  viewButton: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
  restoreButton: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)',
  },
};

export default CustomerList;
