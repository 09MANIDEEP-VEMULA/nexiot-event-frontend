import React from 'react';
import { motion } from 'framer-motion';

export const NeonText = ({ children, color = 'cyan', delay = 0 }) => {
  const colorClasses = {
    cyan: 'text-cyan-400 shadow-[0_0_20px_#64b5f6]',
    blue: 'text-blue-400 shadow-[0_0_20px_#2196f3]',
    purple: 'text-purple-400 shadow-[0_0_20px_#9c27b0]',
    pink: 'text-pink-400 shadow-[0_0_20px_#ec407a]',
    green: 'text-green-400 shadow-[0_0_20px_#4caf50]',
  };

  return (
    <motion.span
      className={`${colorClasses[color]} font-bold tracking-widest drop-shadow-2xl`}
      style={{
        textShadow: `0 0 10px ${color === 'cyan' ? '#64b5f6' : '#2196f3'}, 
                     0 0 20px ${color === 'cyan' ? '#64b5f6' : '#2196f3'},
                     0 0 30px ${color === 'cyan' ? '#64b5f6' : '#2196f3'}`,
      }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: delay,
      }}
    >
      {children}
    </motion.span>
  );
};

export const NeonGlitch = ({ text, className = '' }) => {
  const glitchVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      variants={glitchVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {text.split('').map((letter, idx) => (
        <motion.span
          key={idx}
          variants={letterVariants}
          className="inline-block"
          animate={{
            textShadow: [
              `0 0 10px #64b5f6`,
              `2px 2px 0 #00bcd4, 4px 4px 0 #64b5f6`,
              `0 0 10px #64b5f6`,
            ],
            x: [0, 2, -2, 0],
          }}
          transition={{
            duration: 0.3,
            delay: idx * 0.05,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const GlowingButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 font-bold text-white rounded-lg overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #64b5f6, #2196f3)',
        boxShadow: '0 0 20px rgba(100, 181, 246, 0.5)',
      }}
      whileHover={{
        boxShadow: '0 0 40px rgba(100, 181, 246, 0.8)',
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(100, 181, 246, 0.5)',
          '0 0 40px rgba(100, 181, 246, 0.8)',
          '0 0 20px rgba(100, 181, 246, 0.5)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
};

export const PulsingOrb = ({ color = '#64b5f6', size = 100 }) => {
  return (
    <motion.div
      className="relative rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent)`,
      }}
      animate={{
        boxShadow: [
          `0 0 ${size * 0.5}px ${color}`,
          `0 0 ${size}px ${color}`,
          `0 0 ${size * 0.5}px ${color}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: color,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: color,
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};

export const StreamingText = ({ text, className = '' }) => {
  return (
    <div className={className}>
      {text.split('').map((letter, idx) => (
        <motion.span
          key={idx}
          animate={{
            color: ['#64b5f6', '#2196f3', '#00bcd4', '#64b5f6'],
            textShadow: [
              '0 0 10px #64b5f6',
              '0 0 20px #2196f3',
              '0 0 15px #00bcd4',
              '0 0 10px #64b5f6',
            ],
          }}
          transition={{
            duration: 3,
            delay: idx * 0.05,
            repeat: Infinity,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default NeonText;