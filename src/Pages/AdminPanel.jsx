import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAPI } from '../services/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboard, setDashboard] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dashRes = await adminAPI.getDashboard();
      setDashboard(dashRes.data);

      const regRes = await adminAPI.getRegistrations();
      setRegistrations(regRes.data.content || []);

      const payRes = adminAPI.getPayments();
      setPayments((await payRes).data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTeam = async (teamId) => {
    try {
      await adminAPI.approveTeam(teamId);
      setRegistrations(registrations.map(r => 
        r.id === teamId ? { ...r, status: 'approved' } : r
      ));
    } catch (err) {
      setError('Failed to approve team');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await adminAPI.deleteTeam(teamId);
      setRegistrations(registrations.filter(r => r.id !== teamId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete team');
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await adminAPI.downloadCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'registrations.csv');
      document.body.appendChild(link);
      link.click();
      link.parentChild.removeChild(link);
    } catch (err) {
      setError('Failed to download CSV');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-neon">
              Admin Panel
            </h1>
            <p className="text-gray-400">Manage hackathon registrations and payments</p>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-600/20 border border-red-600 text-red-400 rounded-lg hover:bg-red-600/30 transition"
          >
            Logout
          </motion.button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 mb-8"
          >
            {error}
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8 border-b border-cyan-500/20 overflow-x-auto pb-4"
        >
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'registrations', label: '📋 Registrations' },
            { id: 'payments', label: '💳 Payments' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-cyan-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && dashboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: 'Total Teams', value: dashboard.totalTeams, icon: '👥' },
              { label: 'Total Payments', value: `₹${dashboard.totalPayments}`, icon: '💰' },
              { label: 'Tracks', value: dashboard.totalTracks, icon: '🎯' },
              { label: 'Registered Users', value: dashboard.totalUsers, icon: '📝' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="card"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-400">All Registrations</h2>
              <motion.button
                onClick={handleDownloadCSV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-600/20 border border-green-600 text-green-400 rounded-lg hover:bg-green-600/30 transition text-sm font-semibold"
              >
                📥 Download CSV
              </motion.button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/20">
                    <th className="px-4 py-3 font-semibold text-cyan-400">Team Name</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Leader</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Track</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Members</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Status</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((team) => (
                    <tr key={team.id} className="border-b border-cyan-500/10 hover:bg-white/5 transition">
                      <td className="px-4 py-3 font-semibold">{team.teamName}</td>
                      <td className="px-4 py-3 text-gray-300">{team.leaderName}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {team.track}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {(team.teamMembers?.length || 0) + 1}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            team.status === 'approved'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {team.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {team.status !== 'approved' && (
                            <motion.button
                              onClick={() => handleApproveTeam(team.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-1 bg-green-600/20 border border-green-600 text-green-400 rounded text-xs hover:bg-green-600/30 transition"
                            >
                              Approve
                            </motion.button>
                          )}
                          <motion.button
                            onClick={() => setDeleteConfirm(team.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 bg-red-600/20 border border-red-600 text-red-400 rounded text-xs hover:bg-red-600/30 transition"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Payment Records</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/20">
                    <th className="px-4 py-3 font-semibold text-cyan-400">Payment ID</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Team Name</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Amount</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Status</th>
                    <th className="px-4 py-3 font-semibold text-cyan-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-cyan-500/10 hover:bg-white/5 transition">
                      <td className="px-4 py-3 font-mono text-xs text-gray-300">
                        {payment.razorpayPaymentId?.substring(0, 12)}...
                      </td>
                      <td className="px-4 py-3 font-semibold">{payment.team?.teamName}</td>
                      <td className="px-4 py-3 font-semibold text-cyan-400">
                        ₹{payment.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            payment.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : payment.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {payment.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this team? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setDeleteConfirm(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 border border-gray-500 text-gray-400 rounded-lg hover:border-gray-400 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteTeam(deleteConfirm)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;