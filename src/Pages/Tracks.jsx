import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NeonText, StreamingText } from '../components/Effects/NeonEffects';

const Tracks = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const tracks = [
    {
      id: 1,
      name: 'AI & Machine Learning',
      icon: '🤖',
      color: 'from-purple-600 to-purple-900',
      description: 'Build intelligent systems using the latest AI and ML technologies',
      prize: '₹2,00,000',
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face'],
      problems: [
        'Develop AI-powered chatbot for customer support',
        'Create ML model for predictive analytics',
        'Build computer vision application',
      ],
      difficulty: 'Advanced',
    },
    {
      id: 2,
      name: 'Web Development',
      icon: '🌐',
      color: 'from-blue-600 to-blue-900',
      description: 'Create stunning web applications with modern frameworks',
      prize: '₹1,50,000',
      technologies: ['React', 'Vue', 'Next.js', 'TypeScript'],
      problems: [
        'Build collaborative project management platform',
        'Create real-time chat application',
        'Develop e-commerce platform with payment integration',
      ],
      difficulty: 'Intermediate',
    },
    {
      id: 3,
      name: 'Mobile Development',
      icon: '📱',
      color: 'from-green-600 to-green-900',
      description: 'Develop mobile apps that solve real-world problems',
      prize: '₹1,50,000',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      problems: [
        'Create fitness tracking application',
        'Build social networking app',
        'Develop productivity suite for mobile',
      ],
      difficulty: 'Intermediate',
    },
    {
      id: 4,
      name: 'IoT & Embedded Systems',
      icon: '⚙️',
      color: 'from-yellow-600 to-yellow-900',
      description: 'Connect the physical and digital worlds with IoT solutions',
      prize: '₹1,50,000',
      technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'Edge Computing'],
      problems: [
        'Build smart home automation system',
        'Create environmental monitoring device',
        'Develop industrial IoT solution',
      ],
      difficulty: 'Advanced',
    },
    {
      id: 5,
      name: 'Blockchain & Web3',
      icon: '⛓️',
      color: 'from-orange-600 to-orange-900',
      description: 'Explore decentralized technologies and build Web3 applications',
      prize: '₹1,75,000',
      technologies: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts'],
      problems: [
        'Create decentralized voting system',
        'Build NFT marketplace',
        'Develop DeFi application',
      ],
      difficulty: 'Advanced',
    },
    {
      id: 6,
      name: 'Cybersecurity',
      icon: '🔒',
      color: 'from-red-600 to-red-900',
      description: 'Secure applications and protect against cyber threats',
      prize: '₹1,50,000',
      technologies: ['Cryptography', 'Network Security', 'Penetration Testing'],
      problems: [
        'Build secure authentication system',
        'Create vulnerability assessment tool',
        'Develop security monitoring platform',
      ],
      difficulty: 'Advanced',
    },
  ];

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
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <NeonText color="cyan">Hackathon Tracks</NeonText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose your track and compete with brilliant minds across different domains
          </p>
        </motion.div>

        {/* Tracks Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              variants={itemVariants}
              onClick={() => setSelectedTrack(track.id)}
              className="cursor-pointer group"
            >
              <div className={`relative overflow-hidden rounded-xl border border-gray-700/50 p-8 h-full transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 bg-gradient-to-br ${track.color} bg-opacity-10`}>
                {/* Background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)`,
                  opacity: 0.05,
                }} />

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{track.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{track.name}</h3>
                  <p className="text-gray-300 mb-4">{track.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">Prize:</span>
                      <span className="text-white font-bold">{track.prize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">Level:</span>
                      <span className="text-white">{track.difficulty}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition mt-4"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Track Details */}
        {selectedTrack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card mb-16"
          >
            {(() => {
              const track = tracks.find(t => t.id === selectedTrack);
              return (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{track.name}</h2>
                      <p className="text-gray-400">{track.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedTrack(null)}
                      className="text-2xl text-gray-400 hover:text-white"
                    >
                      ✕
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-cyan-400 mb-4">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {track.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-cyan-600/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-cyan-400 mb-4">Prize & Details</h4>
                      <div className="space-y-2 text-gray-300">
                        <p><span className="text-cyan-400">Prize Money:</span> {track.prize}</p>
                        <p><span className="text-cyan-400">Difficulty:</span> {track.difficulty}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-4">Problem Statements</h4>
                    <div className="space-y-3">
                      {track.problems.map((problem, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex gap-3 items-start p-3 bg-gray-800/50 rounded-lg"
                        >
                          <span className="text-cyan-400 font-bold">#{idx + 1}</span>
                          <span className="text-gray-300">{problem}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/register'}
                    className="w-full mt-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition"
                  >
                    Register for {track.name}
                  </motion.button>
                </>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tracks;