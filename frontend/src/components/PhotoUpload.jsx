/**
 * Photo Upload Component
 * 
 * Bestandslocatie: frontend/src/components/PhotoUpload.jsx
 * Volledige pad: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/components/PhotoUpload.jsx
 * 
 * ✅ MODERN: Glassmorphism design matching EventList
 * ✅ FEATURES: Single & multiple photo upload, preview, progress tracking
 * ✅ MOBILE READY: Works on desktop, tablet, and mobile devices
 */

import React, { useState, useRef } from 'react';
import api from '../services/api';

const PhotoUpload = ({ eventId, onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  // Configuration
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_FILES = 20;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  /**
   * Handle file selection
   */
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Check max files limit
    if (files.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} foto's tegelijk`);
      return;
    }

    // Validate each file
    const validFiles = [];
    const errors = [];

    files.forEach((file, idx) => {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Ongeldig bestandstype (alleen JPG, PNG, WEBP)`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: Te groot (max 10MB)`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    // Create preview URLs
    const previewUrls = validFiles.map(file => URL.createObjectURL(file));
    
    setSelectedFiles(validFiles);
    setPreviews(previewUrls);
    setError(null);
    setSuccess(null);

    console.log(`📷 Selected ${validFiles.length} photos for upload`);
  };

  /**
   * Upload files to backend
   */
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Selecteer eerst foto\'s om te uploaden');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(null);

    try {
      console.log(`📤 Starting upload of ${selectedFiles.length} photos...`);

      if (selectedFiles.length === 1) {
        // Single upload
        await uploadSinglePhoto(selectedFiles[0]);
      } else {
        // Multiple upload
        await uploadMultiplePhotos(selectedFiles);
      }

      setSuccess(`✅ ${selectedFiles.length} foto${selectedFiles.length > 1 ? '\'s' : ''} succesvol geüpload!`);
      
      // Clear selection
      clearSelection();
      
      // Notify parent component
      if (onUploadComplete) {
        onUploadComplete();
      }

      console.log(`✅ Upload complete!`);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.detail || err.message || 'Upload mislukt. Probeer opnieuw.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  /**
   * Upload single photo
   */
  const uploadSinglePhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(
      `/photos/event/${eventId}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      }
    );

    return response.data;
  };

  /**
   * Upload multiple photos
   */
  const uploadMultiplePhotos = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await api.post(
      `/photos/event/${eventId}/upload-multiple`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      }
    );

    if (response.data.failed > 0) {
      const errorMsg = `${response.data.success} succesvol, ${response.data.failed} mislukt`;
      throw new Error(errorMsg);
    }

    return response.data;
  };

  /**
   * Clear selection
   */
  const clearSelection = () => {
    // Revoke object URLs to free memory
    previews.forEach(url => URL.revokeObjectURL(url));
    
    setSelectedFiles([]);
    setPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Remove a specific file from selection
   */
  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    
    // Revoke the URL
    URL.revokeObjectURL(newPreviews[index]);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div style={styles.container}>
      {/* Upload Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>📸 Foto's Uploaden</h3>
        <p style={styles.subtitle}>
          Upload foto's naar Google Drive (max 10MB per foto, {MAX_FILES} foto's tegelijk)
        </p>
      </div>

      {/* File Input */}
      <div style={styles.uploadArea}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          multiple
          onChange={handleFileSelect}
          style={styles.fileInput}
          id="photo-upload"
        />
        <label htmlFor="photo-upload" style={styles.uploadLabel}>
          <div style={styles.uploadIcon}>📁</div>
          <p style={styles.uploadText}>
            Klik hier of sleep foto's hierheen
          </p>
          <p style={styles.uploadHint}>
            JPG, PNG, WEBP - Max 10MB per foto
          </p>
        </label>
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div style={styles.previewSection}>
          <div style={styles.previewHeader}>
            <h4 style={styles.previewTitle}>
              Geselecteerd ({selectedFiles.length} {selectedFiles.length === 1 ? 'foto' : 'foto\'s'})
            </h4>
            <button 
              onClick={clearSelection}
              style={styles.clearButton}
              disabled={uploading}
            >
              Wis selectie
            </button>
          </div>

          <div style={styles.previewGrid}>
            {previews.map((preview, index) => (
              <div key={index} style={styles.previewCard}>
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`}
                  style={styles.previewImage}
                />
                <div style={styles.previewOverlay}>
                  <button
                    onClick={() => removeFile(index)}
                    style={styles.removeButton}
                    disabled={uploading}
                  >
                    ✕
                  </button>
                </div>
                <div style={styles.previewInfo}>
                  <p style={styles.fileName}>{selectedFiles[index].name}</p>
                  <p style={styles.fileSize}>
                    {(selectedFiles[index].size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {uploading && (
        <div style={styles.progressSection}>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${progress}%`
              }}
            />
          </div>
          <p style={styles.progressText}>
            {progress}% geüpload...
          </p>
        </div>
      )}

      {/* Messages */}
      {error && (
        <div style={styles.errorBox}>
          <span style={styles.errorIcon}>⚠️</span>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      {success && (
        <div style={styles.successBox}>
          <span style={styles.successIcon}>✅</span>
          <p style={styles.successText}>{success}</p>
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && !uploading && (
        <button 
          onClick={handleUpload}
          style={styles.uploadButton}
          disabled={uploading}
        >
          <span style={styles.buttonIcon}>🚀</span>
          Upload {selectedFiles.length} foto{selectedFiles.length > 1 ? '\'s' : ''}
        </button>
      )}
    </div>
  );
};

// Styles matching EventList design
const styles = {
  container: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
  },
  uploadArea: {
    position: 'relative',
    marginBottom: '24px',
  },
  fileInput: {
    display: 'none',
  },
  uploadLabel: {
    display: 'block',
    padding: '48px 24px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
    border: '3px dashed #667eea',
    borderRadius: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  uploadIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  uploadText: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
  },
  uploadHint: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
  },
  previewSection: {
    marginBottom: '24px',
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  previewTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
  },
  clearButton: {
    padding: '8px 16px',
    background: 'rgba(253, 121, 168, 0.1)',
    color: '#e84393',
    border: '2px solid #fd79a8',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  previewCard: {
    position: 'relative',
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease',
  },
  previewImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '8px',
  },
  removeButton: {
    width: '32px',
    height: '32px',
    background: 'rgba(232, 67, 147, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  previewInfo: {
    padding: '12px',
    background: 'rgba(248, 250, 252, 0.8)',
  },
  fileName: {
    margin: '0 0 4px 0',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  fileSize: {
    margin: 0,
    fontSize: '12px',
    color: '#64748b',
  },
  progressSection: {
    marginBottom: '24px',
  },
  progressBar: {
    width: '100%',
    height: '12px',
    background: 'rgba(226, 232, 240, 0.5)',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.3s ease',
    borderRadius: '6px',
  },
  progressText: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '600',
    color: '#667eea',
    textAlign: 'center',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(253, 121, 168, 0.1)',
    border: '2px solid #fd79a8',
    borderRadius: '12px',
    marginBottom: '16px',
  },
  errorIcon: {
    fontSize: '24px',
  },
  errorText: {
    margin: 0,
    fontSize: '14px',
    color: '#e84393',
    fontWeight: '600',
    whiteSpace: 'pre-line',
  },
  successBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(67, 233, 123, 0.1)',
    border: '2px solid #43e97b',
    borderRadius: '12px',
    marginBottom: '16px',
  },
  successIcon: {
    fontSize: '24px',
  },
  successText: {
    margin: 0,
    fontSize: '14px',
    color: '#38f9d7',
    fontWeight: '600',
  },
  uploadButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  buttonIcon: {
    fontSize: '20px',
  },
};

export default PhotoUpload;
