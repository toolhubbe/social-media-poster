/**
 * Auth Context
 * File Location: src/contexts/AuthContext.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/contexts/AuthContext.jsx
 * 
 * Provides global authentication state and methods
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated, getUserFromToken, clearTokens } from '../utils/tokenManager';
import { getCurrentUser, logout as logoutService } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check if user is authenticated
   */
  const checkAuthStatus = async () => {
    try {
      if (isAuthenticated()) {
        // Try to get user info from token first (fast)
        const userFromToken = getUserFromToken();
        if (userFromToken) {
          setUser(userFromToken);
          setIsAuth(true);
        }
        
        // Then fetch full user data from API (slow but accurate)
        try {
          const fullUser = await getCurrentUser();
          setUser(fullUser);
          setIsAuth(true);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Keep token-derived user if API call fails
        }
      } else {
        setUser(null);
        setIsAuth(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login with OAuth tokens
   */
  const login = async (accessToken, refreshToken) => {
    try {
      setLoading(true);
      
      // Tokens are already stored by auth.js
      // Just fetch user data
      const userData = await getCurrentUser();
      setUser(userData);
      setIsAuth(true);
      
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setLoading(true);
      await logoutService();
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout API fails, clear local state
      clearTokens();
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: isAuth,
    loading,
    login,
    logout,
    refreshUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
