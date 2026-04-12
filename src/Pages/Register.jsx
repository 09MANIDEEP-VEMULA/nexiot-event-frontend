import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamAPI } from '../services/api.js';
import AnimatedButton from '../components/Common/AnimatedButton';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '', email: '', phone: '' }]);

  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    track: '',
    problemStatement: ''
  });

  const tracks = ['AI & ML', 'IoT', 'Web3', 'Cybersecurity', 'Open Innovation'];
  const problems = {
    'AI & ML': ['ML Model Optimization', 'AI Chatbot', 'Computer Vision'],
    'IoT': ['Smart Home', 'Wearables', 'Industrial IoT'],
    'Web3': ['DeFi Protocol', 'NFT Platform', 'DAO'],
    'Cybersecurity': ['Threat Detection', 'Secure Messaging', 'Vulnerability Scanner'],
    'Open Innovation': ['Your Own Idea']
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberChange = (idx, field, value) => {
    const newMembers = [...teamMembers];
    newMembers[idx][field] = value;
    setTeamMembers(newMembers);
  };

  const addMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '', phone: '' }]);
  };

  const removeMember = (idx) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.teamName || !formData.leaderName || !formData.track) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        teamMembers: teamMembers.filter(m => m.name && m.email)
      };

      const response = await teamAPI.register(payload);
      localStorage.setItem('teamId', response.data.id);
      localStorage.setItem('teamName', formData.teamName);
      
      navigate('/payment', { state: { teamId: response.data.id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
            Register Your Team
          </h1>
          <p className="text-gray-400">
            Join the most exciting hackathon of the year
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="card space-y-6"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400"
            >
              {error}
            </motion.div>
          )}

          {/* Team Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-cyan-400">Team Information</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Team Name *</label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleFormChange}
                placeholder="Your awesome team name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">College/Organization *</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleFormChange}
                placeholder="Your institution name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition"
              />
            </div>
          </div>

          {/* Team Leader Information */}
          <div className="space-y-4 border-t border-cyan-500/20 pt-6">
            <h2 className="text-xl font-bold text-cyan-400">Team Leader</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="leaderName"
                value={formData.leaderName}
                onChange={handleFormChange}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="leaderEmail"
                  value={formData.leaderEmail}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="leaderPhone"
                  value={formData.leaderPhone}
                  onChange={handleFormChange}
                  placeholder="+91-XXXXXXXXXX"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition"
                />
              </div>
            </div>
          </div>

          {/* Track Selection */}
          <div className="space-y-4 border-t border-cyan-500/20 pt-6">
            <h2 className="text-xl font-bold text-cyan-400">Track & Problem Statement</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Select Track *</label>
              <select
                name="track"
                value={formData.track}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-400 focus:bg-white/10 transition"
              >
                <option value="">Choose a track...</option>
                {tracks.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
            </div>

            {formData.track && (
              <div>
                <label className="block text-sm font-semibold mb-2">Problem Statement *</label>
                <select
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-400 focus:bg-white/10 transition"
                >
                  <option value="">Choose a problem...</option>
                  {problems[formData.track]?.map(problem => (
                    <option key={problem} value={problem}>{problem}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Team Members */}
          <div className="space-y-4 border-t border-cyan-500/20 pt-6">
            <h2 className="text-xl font-bold text-cyan-400">Team Members (Optional)</h2>
            <p className="text-sm text-gray-400">Add up to 4 additional team members</p>

            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 p-4 bg-white/5 rounded-lg border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-cyan-400">Member {idx + 1}</span>
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => removeMember(idx)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Full name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition text-sm"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition text-sm"
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  value={member.phone}
                  onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition text-sm"
                />
              </motion.div>
            ))}

            {teamMembers.length < 5 && (
              <motion.button
                type="button"
                onClick={addMember}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border-2 border-dashed border-cyan-400/50 rounded-lg text-cyan-400 font-semibold hover:border-cyan-400 hover:bg-cyan-400/5 transition"
              >
                + Add Team Member
              </motion.button>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-400/50 transition"
          >
            {loading ? 'Registering...' : 'Proceed to Payment'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default Register;