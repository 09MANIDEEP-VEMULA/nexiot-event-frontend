import api from './api';
 
export const adminService = {
  // Get dashboard stats
  getDashboard: () =>
    api.get('/admin/dashboard'),
 
  // Get all registrations
  getRegistrations: (page = 1, limit = 10, filters = {}) =>
    api.get('/admin/registrations', { params: { page, limit, ...filters } }),
 
  // Get all payments
  getPayments: (page = 1, limit = 10, filters = {}) =>
    api.get('/admin/payments', { params: { page, limit, ...filters } }),
 
  // Get all users
  getUsers: (page = 1, limit = 10, filters = {}) =>
    api.get('/admin/users', { params: { page, limit, ...filters } }),
 
  // Approve team
  approveTeam: (teamId) =>
    api.put(`/admin/teams/${teamId}/approve`),
 
  // Reject team
  rejectTeam: (teamId, reason) =>
    api.put(`/admin/teams/${teamId}/reject`, { reason }),
 
  // Delete team
  deleteTeam: (teamId) =>
    api.delete(`/admin/teams/${teamId}`),
 
  // Update team
  updateTeam: (teamId, teamData) =>
    api.put(`/admin/teams/${teamId}`, teamData),
 
  // Export registrations as CSV
  exportRegistrationsCSV: () =>
    api.get('/admin/export/registrations', { responseType: 'blob' }),
 
  // Export payments as CSV
  exportPaymentsCSV: () =>
    api.get('/admin/export/payments', { responseType: 'blob' }),
 
  // Send announcement
  sendAnnouncement: (message, recipientType = 'all') =>
    api.post('/admin/announcement', { message, recipientType }),
 
  // Get system logs
  getLogs: (page = 1, limit = 50) =>
    api.get('/admin/logs', { params: { page, limit } }),
 
  // Update settings
  updateSettings: (settings) =>
    api.put('/admin/settings', settings),
 
  // Get settings
  getSettings: () =>
    api.get('/admin/settings'),
};
 