export const HACKATHON_CONFIG = {
  name: 'Hackathon 2024',
  startDate: new Date('2024-06-15'),
  endDate: new Date('2024-06-17'),
  registrationDeadline: new Date('2024-06-10'),
  location: 'Tech Valley Convention Center, San Francisco, CA',
  totalPrize: 1000000,
  totalTeams: 100,
  maxTeamSize: 5,
  minTeamSize: 2,
};
 
export const TRACKS = [
  'AI & Machine Learning',
  'Web Development',
  'Mobile Development',
  'IoT & Embedded Systems',
  'Blockchain & Web3',
  'Cybersecurity',
];
 
export const ROLES = ['Developer', 'Designer', 'Manager', 'Other'];
 
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  TEAMS: {
    CREATE: '/api/teams/register',
    GET: '/api/teams',
    GET_BY_ID: '/api/teams/:id',
    UPDATE: '/api/teams/:id',
    DELETE: '/api/teams/:id',
  },
  PAYMENTS: {
    INITIATE: '/api/payments/initiate',
    VERIFY: '/api/payments/verify',
    STATUS: '/api/payments/status/:teamId',
  },
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    REGISTRATIONS: '/api/admin/registrations',
    PAYMENTS: '/api/admin/payments',
    APPROVE_TEAM: '/api/admin/teams/:id/approve',
    DELETE_TEAM: '/api/admin/teams/:id',
    EXPORT_CSV: '/api/admin/export/csv',
  },
};
 
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
};
 
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful! You will receive a confirmation email shortly.',
  PAYMENT_SUCCESS: 'Payment processed successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
};
 
export const THEME_COLORS = {
  primary: '#64b5f6',
  secondary: '#2196f3',
  accent: '#00bcd4',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  dark: '#000000',
  light: '#ffffff',
};