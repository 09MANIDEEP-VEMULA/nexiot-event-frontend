import { useState, useEffect } from 'react';
import api from '../services/api';
 
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    let isMounted = true;
 
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(url, options);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to fetch data');
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
 
    fetchData();
 
    return () => {
      isMounted = false;
    };
  }, [url]);
 
  const refetch = async () => {
    try {
      setLoading(true);
      const response = await api.get(url, options);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };
 
  return { data, loading, error, refetch };
};