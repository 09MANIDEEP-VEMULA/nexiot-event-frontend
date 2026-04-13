import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const styles = {
    wrapper: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    },
    bgCircle: (top, left, color) => ({
      position: 'absolute',
      top: top,
      left: left,
      width: '400px',
      height: '400px',
      backgroundColor: color,
      filter: 'blur(100px)',
      opacity: 0.15,
      borderRadius: '50%',
      zIndex: 0
    }),
    errorText: {
      fontSize: 'clamp(100px, 15vw, 180px)',
      fontWeight: '900',
      lineHeight: '1',
      background: 'linear-gradient(135deg, #64b5f6, #00bcd4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
      filter: 'drop-shadow(0 0 15px rgba(0, 188, 212, 0.3))'
    },
    neonTitle: {
      fontSize: '32px',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      color: '#0ff',
      textShadow: '0 0 10px #08f, 0 0 20px #08f'
    },
    btnContainer: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginTop: '40px'
    },
    primaryBtn: {
      padding: '15px 30px',
      background: 'linear-gradient(90deg, #2563eb, #0891b2)',
      borderRadius: '10px',
      border: 'none',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    secondaryBtn: {
      padding: '15px 30px',
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '10px',
      color: '#fff',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.bgCircle('-10%', '-10%', '#08f')} />
      <div style={styles.bgCircle('60%', '70%', '#06b')} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        style={{ position: 'relative', zIndex: 10, padding: '20px' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={styles.errorText}
        >
          404
        </motion.div>

        <h2 style={styles.neonTitle}>Signal Lost</h2>
        <p style={{ color: '#888', maxWidth: '450px', margin: '20px auto' }}>
          You've ventured beyond the known galaxy. This page doesn't exist or has been relocated.
        </p>

        <div style={styles.btnContainer}>
          <button style={styles.primaryBtn} onClick={() => navigate('/')}>RETURN HOME</button>
          <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>GO BACK</button>
        </div>
      </motion.div>

      {/* Floating Space Objects */}
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '20%', right: '15%', fontSize: '50px', opacity: 0.2 }}
      >
        🛸
      </motion.div>
    </div>
  );
};

export default NotFound;