// src/pages/Login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } = useForm(
    { email: '', password: '' },
    async (values) => {
      try {
        setLoginError('');
        await login(values.email, values.password);
        const from = location.state?.from?.pathname || (isAdmin ? '/admin' : '/dashboard');
        navigate(from);
      } catch (error) {
        setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
      }
    }
  );

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0e27 50%, #000000 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 3D Background */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: -300,
          right: -300,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(100,181,246,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0,188,212,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          maxWidth: '450px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Glowing Container */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 40px rgba(100,181,246,0.2)',
              '0 0 60px rgba(100,181,246,0.4)',
              '0 0 40px rgba(100,181,246,0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            background: 'linear-gradient(135deg, rgba(45,45,45,0.9) 0%, rgba(26,26,26,0.9) 100%)',
            border: '2px solid rgba(100,181,246,0.3)',
            borderRadius: '20px',
            padding: '50px 40px',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #64b5f6, #00bcd4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '2px',
              }}
            >
              Welcome Back
            </h1>
            <p style={{ color: '#bdbdbd', fontSize: '0.95rem' }}>
              Sign in to your account to continue
            </p>
          </motion.div>

          {/* Error Message */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'linear-gradient(135deg, rgba(244,67,54,0.2) 0%, rgba(244,67,54,0.1) 100%)',
                border: '2px solid #f44336',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '25px',
                color: '#f44336',
                fontSize: '0.95rem',
                textAlign: 'center',
              }}
            >
              ✗ {loginError}
            </motion.div>
          )}

          {/* Admin Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '30px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              padding: '5px',
              border: '1px solid rgba(100,181,246,0.2)',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              onClick={() => setIsAdmin(false)}
              style={{
                flex: 1,
                padding: '12px',
                background: !isAdmin ? 'linear-gradient(135deg, #64b5f6, #2196f3)' : 'transparent',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
              }}
            >
              User Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              onClick={() => setIsAdmin(true)}
              style={{
                flex: 1,
                padding: '12px',
                background: isAdmin ? 'linear-gradient(135deg, #64b5f6, #2196f3)' : 'transparent',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
              }}
            >
              Admin Login
            </motion.button>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginBottom: '25px' }}
            >
              <label
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  color: '#64b5f6',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(0,0,0,0.5)',
                  border: touched.email && errors.email ? '2px solid #f44336' : '2px solid rgba(100,181,246,0.3)',
                  borderRadius: '10px',
                  color: '#e0e0e0',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#64b5f6';
                  e.target.style.boxShadow = '0 0 20px rgba(100,181,246,0.3)';
                }}
              />
              {touched.email && errors.email && (
                <span style={{ color: '#f44336', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ marginBottom: '30px' }}
            >
              <label
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  color: '#64b5f6',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(0,0,0,0.5)',
                  border: touched.password && errors.password ? '2px solid #f44336' : '2px solid rgba(100,181,246,0.3)',
                  borderRadius: '10px',
                  color: '#e0e0e0',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#64b5f6';
                  e.target.style.boxShadow = '0 0 20px rgba(100,181,246,0.3)';
                }}
              />
              {touched.password && errors.password && (
                <span style={{ color: '#f44336', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                  {errors.password}
                </span>
              )}
            </motion.div>

            {/* Remember & Forgot */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                fontSize: '0.9rem',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#bdbdbd' }}>
                <input
                  type="checkbox"
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#64b5f6',
                  }}
                />
                Remember me
              </label>
              <a
                href="#"
                style={{
                  color: '#64b5f6',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#00bcd4')}
                onMouseLeave={(e) => (e.target.style.color = '#64b5f6')}
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(100,181,246,0.6)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.05rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(100,181,246,0.4)',
                transition: 'all 0.3s ease',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '1px',
              }}
            >
              {isAdmin ? 'Admin Login' : 'Sign In'}
            </motion.button>
          </form>

          {/* Test Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '30px',
              padding: '20px',
              background: 'rgba(100,181,246,0.05)',
              border: '1px dashed rgba(100,181,246,0.3)',
              borderRadius: '10px',
              fontSize: '0.85rem',
              color: '#bdbdbd',
            }}
          >
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: '25px',
              textAlign: 'center',
              color: '#bdbdbd',
              fontSize: '0.95rem',
            }}
          >
            Don't have an account?{' '}
            <motion.a
              whileHover={{ color: '#64b5f6' }}
              onClick={() => navigate('/register')}
              style={{
                color: '#64b5f6',
                textDecoration: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'color 0.3s ease',
              }}
            >
              Register here
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            marginTop: '30px',
            background: 'linear-gradient(135deg, rgba(100,181,246,0.1) 0%, rgba(0,188,212,0.1) 100%)',
            border: '1px solid rgba(100,181,246,0.2)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ color: '#bdbdbd', marginBottom: '10px' }}>
            🔒 Your data is secure and encrypted
          </p>
          <p style={{ fontSize: '0.85rem', color: '#9e9e9e' }}>
            We use industry-standard security to protect your information
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;