import { useState, useCallback } from 'react';
import api from '../services/api';
 
export const useTeam = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchTeams = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/teams?page=${page}`);
      setTeams(response.data.teams);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch teams');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
 
  const getTeamById = useCallback(async (teamId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/teams/${teamId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch team');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
 
  const createTeam = useCallback(async (teamData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/teams/register', teamData);
      setTeams([...teams, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [teams]);
 
  const updateTeam = useCallback(async (teamId, teamData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/teams/${teamId}`, teamData);
      setTeams(teams.map(t => t.id === teamId ? response.data : t));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update team');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [teams]);
 
  const deleteTeam = useCallback(async (teamId) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/teams/${teamId}`);
      setTeams(teams.filter(t => t.id !== teamId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete team');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [teams]);
 
  return {
    teams,
    loading,
    error,
    fetchTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};
 