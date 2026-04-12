import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(formData.email, formData.password);
      
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userId', response.data.id);

      if (response.data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black flex items-center">
      <div className="max-w-md mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-neon">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to your account to continue
          </p>
        </motion.div>

        {/* User Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex gap-2 bg-white/5 border border-cyan-500/20 rounded-lg p-1"
        >
          <button
            onClick={() => setUserType('user')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition ${
              userType === 'user'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            Participant
          </button>
          <button
            onClick={() => setUserType('admin')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition ${
              userType === 'admin'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            Admin
          </button>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

          <div>
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/10 transition"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-400/50 transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <div className="text-center text-gray-400">
            <p>
              Don't have an account?{' '}
              <a href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Register here
              </a>
            </p>
          </div>
        </motion.form>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
        >
          <p className="text-sm text-blue-400 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-300">
            User: demo@example.com | Pass: demo123
          </p>
          <p className="text-xs text-blue-300">
            Admin: admin@example.com | Pass: admin123
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;