import api from './api';
 
export const paymentService = {
  // Initiate payment
  initiate: (teamId, amount) =>
    api.post('/payments/initiate', { teamId, amount }),
 
  // Verify payment
  verify: (paymentData) =>
    api.post('/payments/verify', paymentData),
 
  // Get payment status
  getStatus: (teamId) =>
    api.get(`/payments/status/${teamId}`),
 
  // Get all payments for user
  getMyPayments: () =>
    api.get('/payments/my-payments'),
 
  // Cancel payment
  cancel: (paymentId) =>
    api.post(`/payments/${paymentId}/cancel`),
 
  // Get payment history
  getHistory: (page = 1, limit = 10) =>
    api.get(`/payments/history?page=${page}&limit=${limit}`),
 
  // Download invoice
  downloadInvoice: (paymentId) =>
    api.get(`/payments/${paymentId}/invoice`, { responseType: 'blob' }),
 
  // Refund payment
  refund: (paymentId, reason) =>
    api.post(`/payments/${paymentId}/refund`, { reason }),
};
 