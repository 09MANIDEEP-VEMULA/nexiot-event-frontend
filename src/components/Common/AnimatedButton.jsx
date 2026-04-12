import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-400/50',
    secondary: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10',
    outline: 'border border-gray-500 text-gray-300 hover:border-cyan-400 hover:text-cyan-400',
    ghost: 'text-cyan-400 hover:bg-cyan-400/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;