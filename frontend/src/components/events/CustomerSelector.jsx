/**
 * Customer Selector Component
 * 
 * Bestandslocatie: frontend/src/components/events/CustomerSelector.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/components/events/CustomerSelector.jsx
 * 
 * Tussenscherm voor event creation waar user een customer moet selecteren.
 * Toont dropdown met active customers + zoekveld + "nieuwe klant" button
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CustomerSelector = ({ onCustomerSelect }) => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/customers/summary?status=active');
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
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
      customer.email?.toLowerCase().includes(searchLower)
    );
  });

  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleContinue = () => {
    if (selectedCustomer) {
      onCustomerSelect(selectedCustomer);
    }
  };

  const handleCreateNewCustomer = () => {
    // Redirect to customer creation page with return URL
    navigate('/customers/create?returnTo=/events/create');
  };

  if (loading) {
    return (
      <div className="customer-selector-loading">
        <div className="spinner"></div>
        <p>Klanten laden...</p>
        <style jsx>{`
          .customer-selector-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 1rem;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customer-selector-error">
        <div className="error-icon">⚠️</div>
        <h3>Fout bij laden</h3>
        <p>{error}</p>
        <button onClick={fetchCustomers} className="btn btn-primary">
          Opnieuw proberen
        </button>
        <style jsx>{`
          .customer-selector-error {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 1rem;
            text-align: center;
          }

          .error-icon {
            font-size: 3rem;
          }

          .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.2s;
          }

          .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="customer-selector-container">
      <div className="customer-selector-card">
        {/* Header */}
        <div className="card-header">
          <h2>📋 Selecteer een Klant</h2>
          <p>Voor welke klant wil je een event aanmaken?</p>
        </div>

        <div className="card-body">
          {/* Search Input */}
          <div className="search-section">
            <label htmlFor="customer-search">Zoek klant:</label>
            <input
              id="customer-search"
              type="text"
              placeholder="Zoek op naam, bedrijf of email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>

          {/* Customer List */}
          <div className="customer-list">
            {filteredCustomers.length === 0 ? (
              <div className="no-customers">
                <div className="empty-icon">🔍</div>
                <h3>Geen klanten gevonden</h3>
                {searchTerm ? (
                  <p>Geen resultaten voor "{searchTerm}"</p>
                ) : (
                  <p>Er zijn nog geen actieve klanten</p>
                )}
                <button 
                  onClick={handleCreateNewCustomer}
                  className="btn btn-primary"
                >
                  + Nieuwe Klant Aanmaken
                </button>
              </div>
            ) : (
              <div className="customer-grid">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.customer_id}
                    className={`customer-card ${
                      selectedCustomer?.customer_id === customer.customer_id
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => handleSelect(customer)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSelect(customer);
                      }
                    }}
                  >
                    <div className="customer-icon">👤</div>
                    <div className="customer-info">
                      <h4>{customer.company_name || customer.full_name}</h4>
                      <p className="customer-email">{customer.email}</p>
                      {customer.phone && (
                        <p className="customer-phone">📞 {customer.phone}</p>
                      )}
                    </div>
                    {selectedCustomer?.customer_id === customer.customer_id && (
                      <div className="selected-badge">✓</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="action-buttons">
            <button
              onClick={() => navigate('/events')}
              className="btn btn-secondary"
            >
              ← Annuleren
            </button>
            
            {filteredCustomers.length > 0 && (
              <button
                onClick={handleCreateNewCustomer}
                className="btn btn-outline"
              >
                + Nieuwe Klant
              </button>
            )}

            <button
              onClick={handleContinue}
              disabled={!selectedCustomer}
              className="btn btn-primary"
            >
              Doorgaan →
            </button>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .customer-selector-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .customer-selector-card {
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
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
        }

        .card-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .card-body {
          padding: 2rem;
        }

        .search-section {
          margin-bottom: 1.5rem;
        }

        .search-section label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .customer-list {
          margin-bottom: 2rem;
          max-height: 500px;
          overflow-y: auto;
        }

        .customer-list::-webkit-scrollbar {
          width: 8px;
        }

        .customer-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .customer-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .customer-list::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .customer-grid {
          display: grid;
          gap: 1rem;
        }

        .customer-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          background: white;
        }

        .customer-card:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .customer-card.selected {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .customer-icon {
          font-size: 2.5rem;
          min-width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .customer-info {
          flex: 1;
          min-width: 0;
        }

        .customer-info h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1.125rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .customer-email {
          margin: 0.25rem 0;
          color: #666;
          font-size: 0.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .customer-phone {
          margin: 0.25rem 0 0 0;
          color: #888;
          font-size: 0.85rem;
        }

        .selected-badge {
          min-width: 40px;
          height: 40px;
          background: #4caf50;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          animation: scaleIn 0.2s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .no-customers {
          text-align: center;
          padding: 3rem 2rem;
          color: #666;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-customers h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .no-customers p {
          margin: 0 0 1.5rem 0;
          color: #888;
        }

        .action-buttons {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
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
          white-space: nowrap;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #f5f5f5;
          color: #333;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }

        .btn-outline {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-outline:hover {
          background: #667eea;
          color: white;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .customer-selector-container {
            padding: 0 0.5rem;
          }

          .card-body {
            padding: 1.5rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .customer-icon {
            font-size: 2rem;
            min-width: 50px;
            height: 50px;
          }

          .customer-info h4 {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerSelector;
