// src/pages/NotFound.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NeonText } from '../components/Effects/NeonEffects';

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-blue-950/20 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-cyan-600"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-blue-600"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        {/* 404 Number */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-9xl md:text-[150px] font-black leading-none mb-4"
            style={{
              background: 'linear-gradient(135deg, #64b5f6, #00bcd4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(100, 181, 246, 0.3))',
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <NeonText color="cyan">Page Not Found</NeonText>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 mb-8 leading-relaxed"
        >
          Oops! It looks like you've ventured into unknown territory. The page you're looking 
          for doesn't exist or has been moved. Don't worry, we can help you get back on track!
        </motion.p>

        {/* Lost message */}
        <motion.div
          variants={itemVariants}
          className="mb-12 p-6 rounded-lg border border-cyan-500/30 bg-cyan-600/5"
        >
          <p className="text-gray-300">
            🔍 We searched everywhere but couldn't find what you're looking for.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition"
          >
            🏠 Go to Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-8 py-4 border border-cyan-400/50 text-cyan-300 font-bold rounded-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition"
          >
            ← Go Back
          </motion.button>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400 mb-6">Need help? Check these pages:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
              { label: 'Tracks', path: '/tracks' },
              { label: 'Register', path: '/register' },
              { label: 'Contact', path: '/contact' },
              { label: 'FAQ', path: '/about' },
            ].map((link, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(link.path)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-10 text-6xl opacity-20 pointer-events-none"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🚀
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 text-6xl opacity-20 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🛸
      </motion.div>
    </div>
  );
};

export default NotFound;