/**
 * Customer API Service
 * 
 * Bestandslocatie: frontend/src/services/customers.js
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/services/customers.js
 * 
 * All customer-related API calls for CRUD operations
 */

import api from './api';

/**
 * Customer Service
 * Handles all customer-related API operations
 */
export const customerService = {
  /**
   * Create a new customer
   * @param {Object} customerData - Customer creation data
   * @param {string} customerData.email - Customer email (required)
   * @param {string} customerData.full_name - Full name (optional)
   * @param {string} customerData.company_name - Company name (optional)
   * @param {string} customerData.phone - Phone number (optional)
   * @param {string} customerData.address - Address (optional)
   * @param {string} customerData.notes - Notes (optional)
   * @param {string} customerData.status - Status (optional, default: 'active')
   * @returns {Promise<Object>} Created customer
   */
  create: async (customerData) => {
    try {
      const response = await api.post('/customers/', customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  /**
   * Get all customers (full details)
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status (active, inactive, archived)
   * @param {number} params.skip - Pagination skip
   * @param {number} params.limit - Pagination limit
   * @returns {Promise<Array>} List of customers
   */
  list: async (params = {}) => {
    try {
      const response = await api.get('/customers/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  /**
   * Get customers summary (lightweight for dropdowns/selectors)
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status (active, inactive, archived)
   * @returns {Promise<Array>} List of customer summaries
   */
  summary: async (params = {}) => {
    try {
      const response = await api.get('/customers/summary', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching customer summary:', error);
      throw error;
    }
  },

  /**
   * Get a single customer by ID
   * @param {number} customerId - Customer ID
   * @returns {Promise<Object>} Customer details
   */
  get: async (customerId) => {
    try {
      const response = await api.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer ${customerId}:`, error);
      throw error;
    }
  },

  /**
   * Update a customer
   * @param {number} customerId - Customer ID
   * @param {Object} customerData - Updated customer data
   * @returns {Promise<Object>} Updated customer
   */
  update: async (customerId, customerData) => {
    try {
      const response = await api.put(`/customers/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      console.error(`Error updating customer ${customerId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a customer
   * @param {number} customerId - Customer ID
   * @returns {Promise<Object>} Deletion result
   */
  delete: async (customerId) => {
    try {
      const response = await api.delete(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting customer ${customerId}:`, error);
      throw error;
    }
  },

  /**
   * Update customer status
   * @param {number} customerId - Customer ID
   * @param {string} status - New status (active, inactive, archived)
   * @returns {Promise<Object>} Updated customer
   */
  updateStatus: async (customerId, status) => {
    try {
      const response = await api.patch(`/customers/${customerId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for customer ${customerId}:`, error);
      throw error;
    }
  },

  /**
   * Get customer statistics
   * @param {number} customerId - Customer ID
   * @returns {Promise<Object>} Customer statistics
   */
  getStatistics: async (customerId) => {
    try {
      const response = await api.get(`/customers/${customerId}/statistics`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching statistics for customer ${customerId}:`, error);
      throw error;
    }
  },

  /**
   * Get Google Drive information for a customer
   * @param {number} customerId - Customer ID
   * @returns {Promise<Object>} Drive folder information
   */
  getDriveInfo: async (customerId) => {
    try {
      const response = await api.get(`/customers/${customerId}/drive-info`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Drive info for customer ${customerId}:`, error);
      throw error;
    }
  },

  /**
   * Search customers by name, company, or email
   * @param {string} query - Search query
   * @returns {Promise<Array>} Matching customers
   */
  search: async (query) => {
    try {
      const response = await api.get('/customers/search', { 
        params: { q: query } 
      });
      return response.data;
    } catch (error) {
      console.error('Error searching customers:', error);
      throw error;
    }
  }
};

// Helper function to format customer display name
export const getCustomerDisplayName = (customer) => {
  if (customer.company_name) {
    return customer.company_name;
  }
  if (customer.full_name) {
    return customer.full_name;
  }
  return customer.email || 'Onbekende klant';
};

// Helper function to get customer initials for avatar
export const getCustomerInitials = (customer) => {
  const name = customer.company_name || customer.full_name;
  if (!name) return '?';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Helper function to get status color
export const getStatusColor = (status) => {
  const colors = {
    active: { bg: '#e8f5e9', text: '#4caf50', border: '#4caf50' },
    inactive: { bg: '#fff3e0', text: '#ff9800', border: '#ff9800' },
    archived: { bg: '#f5f5f5', text: '#9e9e9e', border: '#9e9e9e' }
  };
  return colors[status] || colors.active;
};

// Helper function to validate customer data
export const validateCustomerData = (data) => {
  const errors = [];

  // Email is required
  if (!data.email || !data.email.trim()) {
    errors.push('Email is verplicht');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email is niet geldig');
  }

  // At least one name field is required
  if ((!data.full_name || !data.full_name.trim()) && 
      (!data.company_name || !data.company_name.trim())) {
    errors.push('Vul minimaal een naam of bedrijfsnaam in');
  }

  // Phone validation (if provided)
  if (data.phone && data.phone.trim()) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
      errors.push('Telefoon nummer bevat ongeldige tekens');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Helper function to format customer for display in lists
export const formatCustomerForList = (customer) => {
  return {
    id: customer.customer_id,
    displayName: getCustomerDisplayName(customer),
    initials: getCustomerInitials(customer),
    email: customer.email,
    phone: customer.phone || '-',
    status: customer.status,
    statusColor: getStatusColor(customer.status),
    eventCount: customer.event_count || 0,
    createdAt: customer.created_at,
    // Include original data
    ...customer
  };
};

// Export default
export default customerService;
