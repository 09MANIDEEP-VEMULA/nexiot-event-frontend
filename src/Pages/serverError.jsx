// src/pages/ServerError.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ServerError = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-950/20 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-red-600"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-orange-600"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        {/* 500 Number */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-9xl md:text-[150px] font-black leading-none mb-4"
            style={{
              background: 'linear-gradient(135deg, #f44336, #ff6f00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(244, 67, 54, 0.3))',
            }}
          >
            500
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <NeonText color="pink">Server Error</NeonText>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 mb-8 leading-relaxed"
        >
          Oh no! Something went wrong on our end. Our team has been notified and is working 
          hard to fix the issue. We apologize for the inconvenience!
        </motion.p>

        {/* Error details */}
        <motion.div
          variants={itemVariants}
          className="mb-12 p-6 rounded-lg border border-red-500/30 bg-red-600/5"
        >
          <p className="text-gray-300 font-mono text-sm">
            Error Code: 500 Internal Server Error
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Status: Our engineers are investigating this issue
          </p>
        </motion.div>

        {/* Loading animation */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: dot * 0.2,
                }}
                className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Working on fixing this... Check back soon!
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
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-400/50 transition"
          >
            🔄 Reload Page
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-4 border border-red-400/50 text-red-300 font-bold rounded-lg hover:border-red-400 hover:bg-red-400/10 transition"
          >
            🏠 Go to Home
          </motion.button>
        </motion.div>

        {/* Support section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400 mb-6">Need immediate assistance?</p>
          <div className="space-y-3">
            <p className="text-gray-300">
              📧 Email: <span className="text-cyan-400">support@hackathon.com</span>
            </p>
            <p className="text-gray-300">
              💬 Chat: <span className="text-cyan-400">Live support available 24/7</span>
            </p>
            <p className="text-gray-300">
              🔍 Status: <span className="text-cyan-400">Check our status page</span>
            </p>
          </div>
        </motion.div>

        {/* Error reference */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-xs text-gray-500"
        >
          <p>Error Reference ID: ERR_{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p>Timestamp: {new Date().toISOString()}</p>
        </motion.div>
      </motion.div>

      {/* Floating error icons */}
      <motion.div
        className="absolute top-20 right-10 text-6xl opacity-20 pointer-events-none"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ⚠️
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 text-6xl opacity-20 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🔧
      </motion.div>
    </div>
  );
};

export default ServerError;