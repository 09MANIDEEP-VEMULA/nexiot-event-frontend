// src/components/Cards/TrackCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TrackCard = ({ track, onClick, isSelected }) => {
  const getGradientClass = () => {
    switch (track.name) {
      case 'AI & Machine Learning':
        return 'from-purple-600 to-purple-900';
      case 'Web Development':
        return 'from-blue-600 to-blue-900';
      case 'Mobile Development':
        return 'from-green-600 to-green-900';
      case 'IoT & Embedded Systems':
        return 'from-yellow-600 to-yellow-900';
      case 'Blockchain & Web3':
        return 'from-orange-600 to-orange-900';
      case 'Cybersecurity':
        return 'from-red-600 to-red-900';
      default:
        return 'from-cyan-600 to-blue-900';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`relative group cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 ${
        isSelected
          ? 'border-cyan-400 shadow-lg shadow-cyan-400/50 bg-gradient-to-br ' + getGradientClass() + ' bg-opacity-30'
          : 'border-gray-700/50 hover:border-cyan-400/50 bg-gradient-to-br ' + getGradientClass() + ' bg-opacity-10'
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
        opacity: 0.03,
      }} />

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header with icon and name */}
        <div className="mb-6">
          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {track.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{track.name}</h3>
          <p className="text-gray-300 text-sm">{track.description}</p>
        </div>

        {/* Tech stack */}
        <div className="mb-6 flex-grow">
          <p className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-widest">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {track.technologies?.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-cyan-600/20 border border-cyan-500/50 rounded text-cyan-300 text-xs"
              >
                {tech}
              </span>
            ))}
            {track.technologies?.length > 3 && (
              <span className="px-2 py-1 text-cyan-300 text-xs font-semibold">
                +{track.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="space-y-3 border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Prize Pool</span>
            <span className="font-bold text-cyan-400">{track.prize}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Difficulty</span>
            <span className={`font-bold ${
              track.difficulty === 'Advanced' ? 'text-red-400' : 
              track.difficulty === 'Intermediate' ? 'text-yellow-400' : 
              'text-green-400'
            }`}>
              {track.difficulty}
            </span>
          </div>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm"
          >
            ✓
          </motion.div>
        )}
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isSelected
            ? '0 0 30px rgba(100, 181, 246, 0.5) inset'
            : '0 0 0px rgba(100, 181, 246, 0) inset'
        }}
      />
    </motion.div>
  );
};

export default TrackCard;