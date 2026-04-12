import api from './api';
 
export const teamService = {
  // Get all teams
  getAll: (page = 1, limit = 10) =>
    api.get(`/teams?page=${page}&limit=${limit}`),
 
  // Get team by ID
  getById: (teamId) =>
    api.get(`/teams/${teamId}`),
 
  // Register new team
  register: (teamData) =>
    api.post('/teams/register', teamData),
 
  // Update team
  update: (teamId, teamData) =>
    api.put(`/teams/${teamId}`, teamData),
 
  // Delete team
  delete: (teamId) =>
    api.delete(`/teams/${teamId}`),
 
  // Get current user's team
  getMyTeam: () =>
    api.get('/teams/my-team'),
 
  // Add team member
  addMember: (teamId, memberData) =>
    api.post(`/teams/${teamId}/members`, memberData),
 
  // Remove team member
  removeMember: (teamId, memberId) =>
    api.delete(`/teams/${teamId}/members/${memberId}`),
 
  // Update team status
  updateStatus: (teamId, status) =>
    api.patch(`/teams/${teamId}/status`, { status }),
 
  // Leave team
  leaveTeam: (teamId) =>
    api.post(`/teams/${teamId}/leave`),
};
 