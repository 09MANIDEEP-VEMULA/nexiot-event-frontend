import { useState, useCallback } from 'react';
import api from '../services/api';
 
export const usePayment = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const initiatePayment = useCallback(async (teamId, amount) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/payments/initiate', { teamId, amount });
      setPayment(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate payment');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
 
  const verifyPayment = useCallback(async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/payments/verify', paymentData);
      setPayment(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Payment verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
 
  const getPaymentStatus = useCallback(async (teamId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/payments/status/${teamId}`);
      setPayment(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payment status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
 
  return {
    payment,
    loading,
    error,
    initiatePayment,
    verifyPayment,
    getPaymentStatus,
  };
};
 