// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/helpers';
 
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getStorageItem('authToken');
        if (token) {
          // Verify token is still valid
          const response = await api.get('/auth/verify');
          setUser(response.data.user);
        }
      } catch (err) {
        removeStorageItem('authToken');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    checkAuth();
  }, []);
 
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      setStorageItem('authToken', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
      setStorageItem('authToken', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
 
  const logout = useCallback(() => {
    removeStorageItem('authToken');
    setUser(null);
    setError(null);
  }, []);
 
  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};