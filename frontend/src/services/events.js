/**
 * Event API Service
 * 
 * Bestandslocatie: frontend/src/services/events.js
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/services/events.js
 * 
 * All event-related API calls for CRUD operations and Drive integration
 */

import api from './api';

/**
 * Event Service
 * Handles all event-related API operations
 */
export const eventService = {
  /**
   * Create a new event
   * @param {Object} eventData - Event creation data
   * @param {number} eventData.customer_id - Customer ID (required)
   * @param {string} eventData.event_name - Event name (required)
   * @param {string} eventData.event_type - Event type (required)
   * @param {string} eventData.event_date - Event date (required)
   * @param {string} eventData.location_city - City (optional)
   * @param {string} eventData.location_venue - Venue (optional)
   * @param {string} eventData.description - Description (optional)
   * @param {string} eventData.status - Status (optional, default: 'draft')
   * @returns {Promise<Object>} Created event
   */
  create: async (eventData) => {
    try {
      const response = await api.post('/events/', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  /**
   * Get all events with optional filters
   * @param {Object} params - Query parameters
   * @param {number} params.customer_id - Filter by customer ID
   * @param {string} params.status - Filter by status
   * @param {number} params.skip - Pagination skip
   * @param {number} params.limit - Pagination limit
   * @returns {Promise<Array>} List of events
   */
  list: async (params = {}) => {
    try {
      const response = await api.get('/events/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  /**
   * Get a single event by ID
   * @param {number} eventId - Event ID
   * @returns {Promise<Object>} Event details
   */
  get: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Update an event
   * @param {number} eventId - Event ID
   * @param {Object} eventData - Updated event data
   * @returns {Promise<Object>} Updated event
   */
  update: async (eventId, eventData) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Delete an event
   * @param {number} eventId - Event ID
   * @returns {Promise<Object>} Deletion result
   */
  delete: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Get all events for a specific customer
   * @param {number} customerId - Customer ID
   * @returns {Promise<Array>} List of customer's events
   */
  getByCustomer: async (customerId) => {
    try {
      const response = await api.get(`/events/customer/${customerId}/list`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching events for customer ${customerId}:`, error);
      throw error;
    }
  },

  /**
   * Get Google Drive information for an event
   * @param {number} eventId - Event ID
   * @returns {Promise<Object>} Drive folder information
   */
  getDriveInfo: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/drive-info`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Drive info for event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Update event status
   * @param {number} eventId - Event ID
   * @param {string} status - New status (draft, planned, active, completed, cancelled)
   * @returns {Promise<Object>} Updated event
   */
  updateStatus: async (eventId, status) => {
    try {
      const response = await api.patch(`/events/${eventId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Search events by name or description
   * @param {string} query - Search query
   * @returns {Promise<Array>} Matching events
   */
  search: async (query) => {
    try {
      const response = await api.get('/events/search', { 
        params: { q: query } 
      });
      return response.data;
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  },

  /**
   * Get event statistics
   * @returns {Promise<Object>} Event statistics
   */
  getStatistics: async () => {
    try {
      const response = await api.get('/events/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching event statistics:', error);
      throw error;
    }
  }
};

// Helper functions for event types
export const eventTypes = {
  corporate: { value: 'corporate', label: '🏢 Zakelijk', color: '#667eea' },
  wedding: { value: 'wedding', label: '💍 Bruiloft', color: '#f093fb' },
  birthday: { value: 'birthday', label: '🎂 Verjaardag', color: '#feca57' },
  anniversary: { value: 'anniversary', label: '🎉 Jubileum', color: '#48dbfb' },
  conference: { value: 'conference', label: '🎤 Conferentie', color: '#ff6348' },
  party: { value: 'party', label: '🎊 Feest', color: '#ee5a6f' },
  other: { value: 'other', label: '📌 Anders', color: '#95afc0' }
};

// Helper function to get event type info
export const getEventTypeInfo = (type) => {
  return eventTypes[type] || eventTypes.other;
};

// Helper function to format event date
export const formatEventDate = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  };
  
  return date.toLocaleDateString('nl-NL', options);
};

// Helper function to format event date short
export const formatEventDateShort = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  
  return date.toLocaleDateString('nl-NL', options);
};

// Helper function to check if event is upcoming
export const isUpcoming = (eventDate) => {
  if (!eventDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(eventDate);
  return date >= today;
};

// Helper function to check if event is past
export const isPast = (eventDate) => {
  if (!eventDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(eventDate);
  return date < today;
};

// Helper function to get days until event
export const getDaysUntilEvent = (eventDate) => {
  if (!eventDate) return null;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(eventDate);
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Export default
export default eventService;
