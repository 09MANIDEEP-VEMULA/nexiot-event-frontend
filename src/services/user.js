import api from './api';
 
export const userService = {
  // Get user profile
  getProfile: () =>
    api.get('/user/profile'),
 
  // Update profile
  updateProfile: (userData) =>
    api.put('/user/profile', userData),
 
  // Upload avatar
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
 
  // Get preferences
  getPreferences: () =>
    api.get('/user/preferences'),
 
  // Update preferences
  updatePreferences: (preferences) =>
    api.put('/user/preferences', preferences),
 
  // Get notifications
  getNotifications: (page = 1, limit = 20) =>
    api.get(`/user/notifications?page=${page}&limit=${limit}`),
 
  // Mark notification as read
  markNotificationAsRead: (notificationId) =>
    api.put(`/user/notifications/${notificationId}/read`),
 
  // Delete notification
  deleteNotification: (notificationId) =>
    api.delete(`/user/notifications/${notificationId}`),
 
  // Mark all notifications as read
  markAllNotificationsAsRead: () =>
    api.put('/user/notifications/read-all'),
 
  // Get activity history
  getActivityHistory: (page = 1, limit = 10) =>
    api.get(`/user/activity?page=${page}&limit=${limit}`),
 
  // Enable 2FA
  enable2FA: () =>
    api.post('/user/2fa/enable'),
 
  // Verify 2FA
  verify2FA: (code) =>
    api.post('/user/2fa/verify', { code }),
 
  // Disable 2FA
  disable2FA: () =>
    api.post('/user/2fa/disable'),
};
 