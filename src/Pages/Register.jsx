// src/pages/Register.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { validateEmail } from '../utils/validators';

const Register = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([{ name: '', email: '', role: 'Developer' }]);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const tracks = [
    'AI & Machine Learning',
    'Web Development',
    'Mobile Development',
    'IoT & Embedded Systems',
    'Blockchain & Web3',
    'Cybersecurity',
  ];

  const roles = ['Developer', 'Designer', 'Manager', 'Other'];

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } = useForm(
    { teamName: '', teamSize: 2, track: '' },
    async (values) => {
      console.log('Registering team:', { ...values, teamMembers });
      setSuccessMessage('Team registered successfully! You will receive a confirmation email.');
      reset();
      setTeamMembers([{ name: '', email: '', role: 'Developer' }]);
      setSelectedTrack('');
      setTimeout(() => navigate('/payment'), 2000);
    }
  );

  const addMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, { name: '', email: '', role: 'Developer' }]);
    }
  };

  const removeMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0e27 50%, #000000 100%)',
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      {/* Background 3D elements */}
      <motion.div
        animate={{ rotate: 360, y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'fixed',
          top: -300,
          right: -300,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(100,181,246,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #64b5f6, #00bcd4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '15px',
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: '2px',
            }}
          >
            Register Your Team
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#bdbdbd' }}>
            Join the most exciting tech event. Build something amazing!
          </p>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(76,175,80,0.1) 100%)',
              border: '2px solid #4caf50',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '30px',
              color: '#4caf50',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            ✓ {successMessage}
          </motion.div>
        )}

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(45,45,45,0.8) 0%, rgba(26,26,26,0.8) 100%)',
            border: '2px solid rgba(100,181,246,0.2)',
            borderRadius: '20px',
            padding: '50px 40px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Team Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ marginBottom: '30px' }}
            >
              <label
                style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#64b5f6',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Team Name *
              </label>
              <input
                type="text"
                name="teamName"
                value={values.teamName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your team name"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(0,0,0,0.5)',
                  border: touched.teamName && errors.teamName ? '2px solid #f44336' : '2px solid rgba(100,181,246,0.3)',
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
              {touched.teamName && errors.teamName && (
                <span style={{ color: '#f44336', fontSize: '0.9rem', marginTop: '5px', display: 'block' }}>
                  {errors.teamName}
                </span>
              )}
            </motion.div>

            {/* Track Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ marginBottom: '30px' }}
            >
              <label
                style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#64b5f6',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Select Track *
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px',
                }}
              >
                {tracks.map((track) => (
                  <motion.button
                    key={track}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setSelectedTrack(track)}
                    style={{
                      padding: '12px 18px',
                      background: selectedTrack === track
                        ? 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
                        : 'rgba(0,0,0,0.5)',
                      border: selectedTrack === track ? 'none' : '2px solid rgba(100,181,246,0.3)',
                      borderRadius: '10px',
                      color: selectedTrack === track ? 'white' : '#64b5f6',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: selectedTrack === track ? '0 0 20px rgba(100,181,246,0.4)' : 'none',
                    }}
                  >
                    {track}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Team Members */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ marginBottom: '30px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <label
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#64b5f6',
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  Team Members *
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addMember}
                  disabled={teamMembers.length >= 5}
                  style={{
                    padding: '8px 16px',
                    background: teamMembers.length >= 5 ? '#666' : 'linear-gradient(135deg, #00bcd4 0%, #64b5f6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: teamMembers.length >= 5 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  + Add Member
                </motion.button>
              </div>

              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(100,181,246,0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '15px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '15px',
                      marginBottom: '15px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Member name"
                      value={member.name}
                      onChange={(e) => updateMember(idx, 'name', e.target.value)}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(100,181,246,0.3)',
                        borderRadius: '8px',
                        color: '#e0e0e0',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Member email"
                      value={member.email}
                      onChange={(e) => updateMember(idx, 'email', e.target.value)}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(100,181,246,0.3)',
                        borderRadius: '8px',
                        color: '#e0e0e0',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                      }}
                    />
                    <select
                      value={member.role}
                      onChange={(e) => updateMember(idx, 'role', e.target.value)}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(100,181,246,0.3)',
                        borderRadius: '8px',
                        color: '#e0e0e0',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                      }}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {teamMembers.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeMember(idx)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ×
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(100,181,246,0.6)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(100,181,246,0.4)',
                transition: 'all 0.3s ease',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '1px',
              }}
            >
              Register Team →
            </motion.button>
          </form>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: '60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
          }}
        >
          {[
            { icon: '👥', title: '2-5 Members', desc: 'Build diverse teams with different skills' },
            { icon: '⏰', title: 'Quick Signup', desc: 'Register in less than 5 minutes' },
            { icon: '🎯', title: 'All Levels', desc: 'Beginners to experts welcome' },
          ].map((info, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              style={{
                background: 'linear-gradient(135deg, rgba(100,181,246,0.1) 0%, rgba(0,188,212,0.1) 100%)',
                border: '1px solid rgba(100,181,246,0.2)',
                borderRadius: '12px',
                padding: '30px 20px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{info.icon}</div>
              <h3 style={{ color: '#64b5f6', fontWeight: 'bold', marginBottom: '8px' }}>
                {info.title}
              </h3>
              <p style={{ color: '#bdbdbd' }}>{info.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Register;