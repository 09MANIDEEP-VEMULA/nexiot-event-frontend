import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  ...props 
}) => {
  
  // Size Configurations
  const sizes = {
    sm: { padding: '8px 16px', fontSize: '13px' },
    md: { padding: '12px 28px', fontSize: '15px' },
    lg: { padding: '16px 40px', fontSize: '18px' },
  };

  // Base Logic for Variant Styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
          color: '#020617',
          border: 'none',
          fontWeight: '800',
          boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)',
        };
      case 'secondary':
        return {
          background: 'rgba(255, 255, 255, 0.03)',
          color: '#f8fafc',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          fontWeight: '600',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#22d3ee',
          border: '1px solid #22d3ee',
          fontWeight: '600',
        };
      default:
        return {};
    }
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}

      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: variant === 'primary' 
          ? '0 8px 25px rgba(34, 211, 238, 0.5)' 
          : '0 8px 20px rgba(0, 0, 0, 0.4)'
      }}

      whileTap={{ scale: 0.97, y: 0 }}

      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }}

      style={{
        ...styles.base,
        ...sizes[size],
        ...getVariantStyles(),
      }}

      {...props}
    >
      
      {/* Shine Effect */}
      {variant === 'primary' && (
        <motion.div 
          style={styles.shine}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "linear",
            repeatDelay: 1 
          }}
        />
      )}
      
      <span style={styles.text}>
        {children}
      </span>

    </motion.button>
  );
};


/* Styles */

const styles = {

  base: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: '"Inter", sans-serif',
    letterSpacing: '-0.01em',
    transition: 'background 0.3s ease, border 0.3s ease',
    outline: 'none',
  },

  text: {
    position: 'relative',
    zIndex: 1
  },

  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transform: 'skewX(-20deg)',
    pointerEvents: 'none',
  }

};

export default AnimatedButton;