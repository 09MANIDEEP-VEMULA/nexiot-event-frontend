// src/components/Cards/FeatureCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  benefits = [], 
  index = 0,
}) => {

  const { user } = useAuthContext();
  const { showSuccess, showError } = useAppContext();

  const handleClick = () => {
    if (user) {
      showSuccess(`Hi ${user.name}, you clicked ${title}`);
    } else {
      showError("You are not logged in!");
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-xl border border-gray-700/50 hover:border-cyan-400/50 p-8 transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: 'linear-gradient(135deg, rgba(100, 181, 246, 0.1), rgba(0, 188, 212, 0.1))',
      }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="text-5xl mb-6 inline-block"
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

        {/* Description */}
        <motion.p
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-400 mb-6 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Benefits list */}
        {benefits && benefits.length > 0 && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-2 mb-4"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                <span className="text-gray-300 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-300 font-semibold rounded-lg hover:from-cyan-500/40 hover:to-blue-500/40 transition-all duration-300 text-sm"
        >
          Learn More →
        </motion.button>
      </div>

      {/* Bottom border accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FeatureCard;