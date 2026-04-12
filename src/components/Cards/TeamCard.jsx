import React from 'react';
import { motion } from 'framer-motion';

export const TeamCard = ({ 
  photo, 
  name, 
  role, 
  department, 
  social = {} 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative h-full"
    >
      {/* Glassmorphic Card */}
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6 h-full transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Photo */}
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover rounded-xl border-2 border-cyan-500/30"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Info */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-cyan-400 font-semibold text-sm">{role}</p>
            <p className="text-gray-400 text-xs">{department}</p>
          </div>

          {/* Social Links */}
          {Object.keys(social).length > 0 && (
            <div className="flex justify-center gap-3 pt-2">
              {social.linkedin && (
                <motion.a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition"
                >
                  in
                </motion.a>
              )}
              {social.github && (
                <motion.a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition"
                >
                  gh
                </motion.a>
              )}
              {social.email && (
                <motion.a
                  href={`mailto:${social.email}`}
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition"
                >
                  ✉
                </motion.a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;