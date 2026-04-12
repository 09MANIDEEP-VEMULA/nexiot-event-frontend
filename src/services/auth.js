import api from './api';
 
export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
 
  register: (userData) =>
    api.post('/auth/register', userData),
 
  logout: () =>
    api.post('/auth/logout'),
 
  verify: () =>
    api.get('/auth/verify'),
 
  refreshToken: () =>
    api.post('/auth/refresh'),
 
  updateProfile: (userData) =>
    api.put('/auth/profile', userData),
 
  changePassword: (oldPassword, newPassword) =>
    api.post('/auth/change-password', { oldPassword, newPassword }),
 
  resetPassword: (email) =>
    api.post('/auth/reset-password', { email }),
 
  confirmResetPassword: (token, newPassword) =>
    api.post('/auth/confirm-reset-password', { token, newPassword }),
};