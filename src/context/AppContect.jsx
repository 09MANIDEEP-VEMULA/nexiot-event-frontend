// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [formData, setFormData] = useState({});

  // Notification management
  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    
    setNotification({
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
    });

    if (duration > 0) {
      setTimeout(() => {
        setNotification(null);
      }, duration);
    }

    return id;
  }, []);

  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const showSuccess = useCallback((message, duration = 3000) => {
    return showNotification(message, 'success', duration);
  }, [showNotification]);

  const showError = useCallback((message, duration = 5000) => {
    return showNotification(message, 'error', duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration = 3000) => {
    return showNotification(message, 'warning', duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration = 3000) => {
    return showNotification(message, 'info', duration);
  }, [showNotification]);

  // Loading management
  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  // Sidebar management
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Theme management
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Track management
  const selectTrack = useCallback((track) => {
    setSelectedTrack(track);
  }, []);

  const clearTrackSelection = useCallback(() => {
    setSelectedTrack(null);
  }, []);

  // Form data management
  const updateFormData = useCallback((key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const setFormDataBatch = useCallback((newData) => {
    setFormData(prev => ({
      ...prev,
      ...newData,
    }));
  }, []);

  const clearFormData = useCallback(() => {
    setFormData({});
  }, []);

  const value = {
    // Notifications
    notification,
    showNotification,
    closeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,

    // Loading
    loading,
    startLoading,
    stopLoading,

    // Sidebar
    sidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,

    // Theme
    theme,
    toggleTheme,

    // Track
    selectedTrack,
    selectTrack,
    clearTrackSelection,

    // Form
    formData,
    updateFormData,
    setFormDataBatch,
    clearFormData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default AppContext;