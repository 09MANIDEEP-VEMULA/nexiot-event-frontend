// src/services/api.js
import axios from 'axios';
import { getStorageItem, removeStorageItem, setStorageItem } from '../utils/helpers';


export const authAPI = {
  login: (data) => {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  register: (data) => {
    return fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};
export const paymentAPI = {
  createPayment: (data) =>
    fetch('/api/payment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  verifyPayment: (data) =>
    fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
};

export const teamAPI = {
  registerTeam: (data) => {
    return fetch('/api/team/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};

export const userAPI = {
  getProfile: (token) =>
    fetch('/api/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  updateProfile: (data, token) =>
    fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getAllUsers: (token) =>
    fetch('/api/user/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  deleteUser: (id, token) =>
    fetch(`/api/user/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
};


export const adminAPI = {
  // Get all users (admin dashboard)
  getAllUsers: (token) =>
    fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  // Get system stats (dashboard analytics)
  getStats: (token) =>
    fetch('/api/admin/stats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  // Approve user
  approveUser: (userId, token) =>
    fetch(`/api/admin/user/approve/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  // Block user
  blockUser: (userId, token) =>
    fetch(`/api/admin/user/block/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  // Delete user
  deleteUser: (userId, token) =>
    fetch(`/api/admin/user/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  // Get all payments
  getPayments: (token) =>
    fetch('/api/admin/payments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
};

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token to every request
    const token = getStorageItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp
    config.headers['X-Request-ID'] = Math.random().toString(36).substr(2, 9);

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (
      error.response?.status === 401 &&
      error.response?.data?.message?.includes('Token expired') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getStorageItem('authToken')}`,
            },
          }
        );

        const { token } = response.data;
        setStorageItem('authToken', token);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        removeStorageItem('authToken');
        removeStorageItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      removeStorageItem('authToken');
      removeStorageItem('user');
      window.location.href = '/login';
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.response.data);
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }

    // Handle network errors
    if (error.message === 'Network Error' && !error.response) {
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

// Utility methods
export const apiUtils = {
  /**
   * Upload file with progress tracking
   */
  uploadFile: async (endpoint, file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  /**
   * Download file
   */
  downloadFile: async (endpoint, filename) => {
    try {
      const response = await api.get(endpoint, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename || 'file');
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },



  /**
   * Batch API calls
   */
  batch: async (requests) => {
    try {
      const promises = requests.map(({ method, endpoint, data }) => {
        switch (method.toUpperCase()) {
          case 'GET':
            return api.get(endpoint);
          case 'POST':
            return api.post(endpoint, data);
          case 'PUT':
            return api.put(endpoint, data);
          case 'DELETE':
            return api.delete(endpoint);
          default:
            return Promise.reject(new Error(`Unknown method: ${method}`));
        }
      });

      return Promise.all(promises);
    } catch (error) {
      console.error('Batch request error:', error);
      throw error;
    }
  },

  /**
   * Cancel request
   */
  createCancelToken: () => axios.CancelToken.source(),
};

export default api;