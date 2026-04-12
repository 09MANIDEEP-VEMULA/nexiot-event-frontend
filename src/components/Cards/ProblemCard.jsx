import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext.jsx';

export const ProblemCard = ({ 
  id,
  title, 
  description, 
  difficulty = 'medium',
  prize,
  track,
  onClick
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
  
  const difficultyColors = {
    easy: { bg: 'from-green-500/20 to-emerald-600/20', border: 'border-green-500/50', text: 'text-green-400' },
    medium: { bg: 'from-yellow-500/20 to-orange-600/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    hard: { bg: 'from-red-500/20 to-pink-600/20', border: 'border-red-500/50', text: 'text-red-400' }
  };

  const colors = difficultyColors[difficulty] || difficultyColors.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-gradient-to-br ${colors.bg} border-2 ${colors.border} p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20`}>
        
        {/* Animated Border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 blur-2xl animate-pulse"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.text} bg-white/5 border ${colors.border}`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </motion.span>
                {track && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/50">
                    {track}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm line-clamp-3">
            {description}
          </p>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {prize && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Prize:</span>
                <span className="text-lg font-bold text-cyan-400">
                  {prize}
                </span>
              </div>
            )}
            <motion.div
              whileHover={{ x: 5 }}
              className="text-cyan-400"
            >
              →
            </motion.div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemCard;