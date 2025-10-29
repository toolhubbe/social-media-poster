/**
 * Authentication Service
 * File Location: src/services/auth.js
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/services/auth.js
 * 
 * Handles OAuth 2.0 flow and authentication operations
 */

import api, { apiEndpoints } from './api';
import { setTokens, clearTokens, setUser, getUser } from '../utils/tokenManager';

/**
 * Initiate Google OAuth login
 * Redirects to backend OAuth endpoint
 */
export const initiateGoogleLogin = () => {
  window.location.href = apiEndpoints.auth.googleLogin();
};

/**
 * Handle OAuth callback (called from callback page)
 * Receives tokens from URL parameters
 */
export const handleOAuthCallback = (urlParams) => {
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');
  const error = urlParams.get('error');
  
  if (error) {
    throw new Error(error);
  }
  
  if (!accessToken) {
    throw new Error('No access token received');
  }
  
  // Store tokens
  setTokens(accessToken, refreshToken);
  
  return { accessToken, refreshToken };
};

/**
 * Get current user info
 */
export const getCurrentUser = async () => {
  try {
    // Check localStorage first
    const cachedUser = getUser();
    if (cachedUser) {
      return cachedUser;
    }
    
    // Fetch from API
    const response = await api.get(apiEndpoints.auth.me);
    const user = response.data;
    
    // Cache in localStorage
    setUser(user);
    
    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    // Call backend logout endpoint
    await api.post(apiEndpoints.auth.logout);
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    // Always clear tokens and redirect
    clearTokens();
    window.location.href = '/login';
  }
};

/**
 * Refresh access token
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post(apiEndpoints.auth.refresh, {
      refresh_token: refreshToken
    });
    
    const { access_token, refresh_token } = response.data;
    setTokens(access_token, refresh_token);
    
    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    throw error;
  }
};
