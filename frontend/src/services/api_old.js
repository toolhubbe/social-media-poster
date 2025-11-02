/**
 * API Service - UPDATED
 * File Location: frontend/src/services/api.js
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/frontend/src/services/api.js
 * 
 * Axios instance with interceptors for token management
 * ✅ UPDATED: Added stats endpoints for dashboard
 */

import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens, isTokenExpired } from '../utils/tokenManager';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    
    // Check if token exists and is not expired
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && isTokenExpired(token)) {
      // Token is expired, try to refresh
      try {
        const newToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/${API_VERSION}/auth/refresh`,
      { refresh_token: refreshToken }
    );
    
    const { access_token, refresh_token } = response.data;
    setTokens(access_token, refresh_token);
    
    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

// API endpoints
export const apiEndpoints = {
  // Auth
  auth: {
    googleLogin: () => `${API_BASE_URL}/api/${API_VERSION}/auth/google/login`,
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  
  // Customers
  customers: {
    list: '/customers',
    get: (id) => `/customers/${id}`,
    create: '/customers',
    update: (id) => `/customers/${id}`,
    delete: (id) => `/customers/${id}`,
    archive: (id) => `/customers/${id}/archive`,
    restore: (id) => `/customers/${id}/restore`,
    summary: '/customers/summary',
    stats: '/customers/stats/overview', // ✅ NEW
  },
  
  // Events
  events: {
    list: '/events',
    get: (id) => `/events/${id}`,
    getByCustomer: (customerId) => `/events/customer/${customerId}`,
    create: '/events',
    update: (id) => `/events/${id}`,
    delete: (id) => `/events/${id}`,
    stats: '/events/stats/overview', // ✅ NEW (when implemented)
  },
  
  // Photos
  photos: {
    list: '/photos',
    get: (id) => `/photos/${id}`,
    getByEvent: (eventId) => `/photos/event/${eventId}`,
    upload: (eventId) => `/photos/event/${eventId}`,
    delete: (id) => `/photos/${id}`,
    stats: '/photos/stats/overview', // ✅ NEW (when implemented)
  },
  
  // Posts (future)
  posts: {
    list: '/posts',
    get: (id) => `/posts/${id}`,
    create: '/posts',
    update: (id) => `/posts/${id}`,
    delete: (id) => `/posts/${id}`,
    stats: '/posts/stats/overview', // ✅ NEW (when implemented)
  },
  
  // Drive Setup
  drive: {
    setup: '/drive/setup',
    status: '/drive/status',
    folders: '/drive/folders',
  },
  
  // Workspace (future)
  workspace: {
    get: '/workspace',
    update: '/workspace',
    stats: '/workspace/stats',
  },
};

export default api;
