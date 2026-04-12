// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/helpers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getStorageItem('authToken');
        const storedUser = getStorageItem('user');

        if (token && storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
          // Optionally verify token is still valid
          try {
            const response = await api.get('/auth/verify');
            setUser(response.data.user);
          } catch (err) {
            // Token invalid, clear storage
            removeStorageItem('authToken');
            removeStorageItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Store auth data
      setStorageItem('authToken', token);
      setStorageItem('user', user);

      // Update state
      setUser(user);
      setIsAuthenticated(true);

      return { success: true, user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;

      // Store auth data
      setStorageItem('authToken', token);
      setStorageItem('user', user);

      // Update state
      setUser(user);
      setIsAuthenticated(true);

      return { success: true, user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      // Call logout API if needed
      api.post('/auth/logout').catch(() => {
        // Continue logout even if API call fails
      });
    } finally {
      // Clear storage
      removeStorageItem('authToken');
      removeStorageItem('user');

      // Update state
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    setStorageItem('user', updatedUser);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;