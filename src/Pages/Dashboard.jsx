import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamAPI, paymentAPI, userAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const teamId = localStorage.getItem('teamId');

        if (teamId) {
          const [teamRes, paymentRes] = await Promise.all([
            teamAPI.getById(teamId),
            paymentAPI.getPaymentStatus(teamId)
          ]);

          setTeamData(teamRes.data);
          setPaymentStatus(paymentRes.data);
        }

        const profileRes = await userAPI.getProfile();
        setUserProfile(profileRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              Dashboard
            </h1>
            <p className="text-gray-400">
              Welcome, {userProfile?.name || 'Participant'}!
            </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Team Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 card"
          >
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Team Information</h2>

            {teamData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Team Name</p>
                    <p className="text-lg font-semibold">{teamData.teamName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Track</p>
                    <p className="text-lg font-semibold text-cyan-400">{teamData.track}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Team Leader</p>
                    <p className="text-lg font-semibold">{teamData.leaderName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">College</p>
                    <p className="text-lg font-semibold">{teamData.college}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-cyan-500/20">
                  <p className="text-sm text-gray-400 mb-2">Problem Statement</p>
                  <p className="text-gray-200">{teamData.problemStatement}</p>
                </div>

                {teamData.teamMembers && teamData.teamMembers.length > 0 && (
                  <div className="pt-4 border-t border-cyan-500/20">
                    <p className="text-sm text-gray-400 mb-3">Team Members</p>
                    <div className="space-y-2">
                      {teamData.teamMembers.map((member, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white/5 rounded-lg flex items-center justify-between"
                        >
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-gray-400">{member.email}</p>
                          </div>
                          <p className="text-sm text-cyan-400">{member.phone}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400">No team data found</p>
            )}
          </motion.div>

          {/* Payment Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Payment Status</h2>

            {paymentStatus ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-cyan-500/20">
                  <p className="text-sm text-gray-400 mb-1">Status</p>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                      paymentStatus.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : paymentStatus.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {paymentStatus.status.toUpperCase()}
                  </motion.div>
                </div>

                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400 mb-1">Amount</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    ₹{paymentStatus.amount}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400 mb-1">Payment ID</p>
                  <p className="text-sm font-mono text-gray-300 break-all">
                    {paymentStatus.paymentId || 'Pending'}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400 mb-1">Date</p>
                  <p className="text-sm text-gray-300">
                    {new Date(paymentStatus.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {paymentStatus.status !== 'completed' && (
                  <motion.a
                    href="/payment"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full block py-3 bg-cyan-400 text-black font-bold rounded-lg text-center hover:bg-cyan-300 transition"
                  >
                    Complete Payment
                  </motion.a>
                )}
              </div>
            ) : (
              <p className="text-gray-400">No payment data found</p>
            )}
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Event Details', icon: '📋', href: '/' },
              { label: 'Problem Statements', icon: '🎯', href: '/problems' },
              { label: 'Guidelines', icon: '📖', href: '/' },
              { label: 'Contact Support', icon: '💬', href: '/contact' }
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ y: -5 }}
                className="p-4 bg-white/5 border border-cyan-500/20 rounded-lg text-center hover:border-cyan-400 hover:bg-white/10 transition"
              >
                <div className="text-2xl mb-2">{link.icon}</div>
                <p className="text-sm font-semibold text-gray-300">{link.label}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;