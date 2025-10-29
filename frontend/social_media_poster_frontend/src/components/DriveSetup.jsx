/**
 * ==========================================
 * DRIVE SETUP COMPONENT
 * ==========================================
 * Bestandslocatie: social_media_poster_frontend/src/components/DriveSetup.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/components/DriveSetup.jsx
 * 
 * Google Drive Setup Component
 * - Check Drive setup status
 * - Initialize Drive folder structure
 * - Show Drive folder link
 * - Display setup progress
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriveSetup = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setupLoading, setSetupLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE = 'http://localhost:8000/api/v1';

  // Fetch Drive status on component mount
  useEffect(() => {
    fetchDriveStatus();
  }, []);

  const fetchDriveStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setError('Not authenticated. Please login first.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE}/drive/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setStatus(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching Drive status:', err);
      setError(err.response?.data?.detail || 'Failed to fetch Drive status');
      setLoading(false);
    }
  };

  const runDriveSetup = async () => {
    setSetupLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setError('Not authenticated. Please login first.');
        setSetupLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE}/drive/setup`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccess(response.data);
      setSetupLoading(false);
      
      // Refresh status after setup
      setTimeout(() => {
        fetchDriveStatus();
      }, 1000);
    } catch (err) {
      console.error('Error running Drive setup:', err);
      setError(err.response?.data?.detail || 'Failed to setup Drive');
      setSetupLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="drive-setup-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Drive status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="drive-setup-container">
      <div className="drive-setup-card">
        <div className="card-header">
          <h2>📁 Google Drive Integration</h2>
          <p className="subtitle">Setup and manage your Google Drive folder structure</p>
        </div>

        <div className="card-body">
          {/* Error Message */}
          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="alert alert-success">
              <span className="alert-icon">✅</span>
              <div>
                <p><strong>Setup completed successfully!</strong></p>
                <p className="text-sm">Folder: {success.folder_name}</p>
                {success.folder_link && (
                  <a 
                    href={success.folder_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="drive-link"
                  >
                    Open in Google Drive →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Status Display */}
          {status && (
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">Setup Status:</span>
                <span className={`status-badge ${status.setup_complete ? 'badge-success' : 'badge-warning'}`}>
                  {status.setup_complete ? '✅ Complete' : '⏳ Pending'}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Credentials:</span>
                <span className={`status-badge ${status.credentials_configured ? 'badge-success' : 'badge-error'}`}>
                  {status.credentials_configured ? '✅ Configured' : '❌ Missing'}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Service:</span>
                <span className={`status-badge ${status.service_available ? 'badge-success' : 'badge-error'}`}>
                  {status.service_available ? '✅ Available' : '❌ Unavailable'}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Ready for Use:</span>
                <span className={`status-badge ${status.ready_for_use ? 'badge-success' : 'badge-warning'}`}>
                  {status.ready_for_use ? '✅ Yes' : '⏳ No'}
                </span>
              </div>
            </div>
          )}

          {/* Folder Information */}
          {status && status.setup_complete && (
            <div className="folder-info">
              <h3>📂 Main Folder</h3>
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{status.folder_name || 'SOCIAL_MEDIA_POSTER'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Folder ID:</span>
                <span className="info-value code">{status.folder_id}</span>
              </div>
              {status.folder_link && (
                <a 
                  href={status.folder_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-full"
                >
                  📁 Open in Google Drive
                </a>
              )}
            </div>
          )}

          {/* Setup Button */}
          {status && !status.setup_complete && (
            <div className="setup-section">
              <h3>🚀 Initialize Drive Structure</h3>
              <p className="text-muted">
                This will create the main "SOCIAL_MEDIA_POSTER" folder in your Google Drive 
                and configure sharing with admin users.
              </p>
              <button
                onClick={runDriveSetup}
                disabled={setupLoading || !status.service_available}
                className="btn btn-primary btn-full"
              >
                {setupLoading ? (
                  <>
                    <span className="spinner-small"></span>
                    Setting up...
                  </>
                ) : (
                  <>
                    🚀 Run Setup
                  </>
                )}
              </button>
            </div>
          )}

          {/* Refresh Button */}
          <button
            onClick={fetchDriveStatus}
            disabled={loading || setupLoading}
            className="btn btn-outline btn-full"
          >
            🔄 Refresh Status
          </button>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .drive-setup-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .drive-setup-card {
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

        .subtitle {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .card-body {
          padding: 2rem;
        }

        /* Loading Spinner */
        .loading-spinner {
          text-align: center;
          padding: 3rem;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .spinner-small {
          display: inline-block;
          border: 2px solid #f3f3f3;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Alerts */
        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .alert-error {
          background-color: #fee;
          border: 1px solid #fcc;
          color: #c33;
        }

        .alert-success {
          background-color: #efe;
          border: 1px solid #cfc;
          color: #3a3;
        }

        .alert-icon {
          font-size: 1.25rem;
        }

        /* Status Grid */
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .status-item {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .status-label {
          font-size: 0.875rem;
          color: #666;
          font-weight: 500;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          width: fit-content;
        }

        .badge-success {
          background-color: #d4edda;
          color: #155724;
        }

        .badge-warning {
          background-color: #fff3cd;
          color: #856404;
        }

        .badge-error {
          background-color: #f8d7da;
          color: #721c24;
        }

        /* Folder Info */
        .folder-info {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .folder-info h3 {
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
          color: #333;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-weight: 500;
          color: #666;
        }

        .info-value {
          color: #333;
        }

        .info-value.code {
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          background: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        /* Setup Section */
        .setup-section {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .setup-section h3 {
          margin: 0 0 0.75rem 0;
          font-size: 1.125rem;
          color: #333;
        }

        .text-muted {
          color: #666;
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .text-sm {
          font-size: 0.875rem;
          margin: 0.25rem 0;
        }

        /* Buttons */
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #5a6268;
        }

        .btn-outline {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-outline:hover:not(:disabled) {
          background: #667eea;
          color: white;
        }

        .btn-full {
          width: 100%;
          margin-top: 0.5rem;
        }

        .drive-link {
          display: inline-block;
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-top: 0.5rem;
          transition: color 0.2s;
        }

        .drive-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .status-grid {
            grid-template-columns: 1fr;
          }

          .card-body {
            padding: 1.5rem;
          }

          .info-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DriveSetup;
