import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NeonText } from '../components/Effects/NeonEffects';

const ProblemStatements = () => {
  const [expandedId, setExpandedId] = useState(null);

  const problems = [
    {
      id: 1,
      track: 'AI & Machine Learning',
      difficulty: 'Advanced',
      icon: '🤖',
      title: 'Smart Recommendation Engine',
      description: 'Build an AI-powered recommendation system that learns from user behavior',
      fullDescription: `Create a machine learning system that can predict user preferences and recommend products, 
      content, or services with high accuracy. The system should learn from user interactions, improve over time, 
      and handle edge cases like cold start problems.`,
      requirements: ['ML Algorithm', 'Data Processing', 'Performance Optimization'],
      evaluation: ['Accuracy', 'Efficiency', 'Scalability', 'Innovation'],
      prize: '₹50,000',
    },
    {
      id: 2,
      track: 'AI & Machine Learning',
      difficulty: 'Advanced',
      icon: '🔍',
      title: 'Computer Vision for Accessibility',
      description: 'Develop a computer vision solution to help visually impaired individuals',
      fullDescription: `Build a real-time computer vision application that can describe scenes, read text, 
      detect obstacles, and provide audio feedback. The system should work offline and on mobile devices.`,
      requirements: ['Computer Vision', 'Deep Learning', 'Real-time Processing'],
      evaluation: ['Accuracy', 'Speed', 'Usability', 'Accessibility'],
      prize: '₹60,000',
    },
    {
      id: 3,
      track: 'Web Development',
      difficulty: 'Intermediate',
      icon: '🌐',
      title: 'Real-time Collaboration Platform',
      description: 'Build a web app where multiple users can collaborate on documents in real-time',
      fullDescription: `Create a web-based platform similar to Google Docs or Figma where users can collaborate 
      on documents, spreadsheets, or designs in real-time. Include features like version history, comments, 
      and real-time notifications.`,
      requirements: ['WebSockets', 'React/Vue', 'Operational Transform'],
      evaluation: ['Usability', 'Performance', 'Feature Completeness', 'Code Quality'],
      prize: '₹45,000',
    },
    {
      id: 4,
      track: 'Web Development',
      difficulty: 'Intermediate',
      icon: '🛍️',
      title: 'E-commerce with AI Integration',
      description: 'Create an e-commerce platform with AI-powered features',
      fullDescription: `Build a full-featured e-commerce platform that integrates AI for product recommendations, 
      smart search, visual search, and customer service chatbot. Include payment integration and inventory management.`,
      requirements: ['React', 'Node.js', 'Database', 'AI/ML'],
      evaluation: ['Feature Richness', 'UX Design', 'Performance', 'Security'],
      prize: '₹50,000',
    },
    {
      id: 5,
      track: 'Mobile Development',
      difficulty: 'Intermediate',
      icon: '📱',
      title: 'Health & Fitness Tracker',
      description: 'Develop a mobile app for tracking health metrics and workouts',
      fullDescription: `Create a cross-platform mobile application that tracks fitness activities, health metrics, 
      nutrition, and sleep. Include social features, workout recommendations, and integration with wearables.`,
      requirements: ['React Native/Flutter', 'Backend API', 'Health Integration'],
      evaluation: ['Feature Completeness', 'UI/UX', 'Performance', 'Data Privacy'],
      prize: '₹45,000',
    },
    {
      id: 6,
      track: 'IoT & Embedded Systems',
      difficulty: 'Advanced',
      icon: '⚙️',
      title: 'Smart City Waste Management',
      description: 'Build an IoT solution for efficient waste management in smart cities',
      fullDescription: `Develop an IoT system with sensors and smart bins that optimizes waste collection routes, 
      predicts bin fullness, and reduces emissions. Include mobile app for tracking and analytics dashboard.`,
      requirements: ['IoT Sensors', 'MQTT', 'Mobile App', 'Analytics'],
      evaluation: ['Innovation', 'Practicality', 'Sustainability', 'Integration'],
      prize: '₹55,000',
    },
    {
      id: 7,
      track: 'Blockchain & Web3',
      difficulty: 'Advanced',
      icon: '⛓️',
      title: 'Decentralized Identity Solution',
      description: 'Create a blockchain-based identity verification system',
      fullDescription: `Build a decentralized identity solution using blockchain for secure, self-sovereign identity. 
      Include credentials, verification, and integration with other dApps.`,
      requirements: ['Solidity', 'Blockchain', 'Smart Contracts'],
      evaluation: ['Security', 'Usability', 'Standards Compliance', 'Innovation'],
      prize: '₹60,000',
    },
    {
      id: 8,
      track: 'Cybersecurity',
      difficulty: 'Advanced',
      icon: '🔒',
      title: 'Vulnerability Scanning Tool',
      description: 'Develop an automated security scanning and vulnerability assessment tool',
      fullDescription: `Create a comprehensive tool that can scan web applications and infrastructure for 
      vulnerabilities, generate detailed reports, and suggest fixes. Include both automated and manual testing capabilities.`,
      requirements: ['Security Knowledge', 'Python/Node.js', 'Penetration Testing'],
      evaluation: ['Detection Accuracy', 'False Positive Rate', 'Usability', 'Reporting'],
      prize: '₹55,000',
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
            <NeonText color="cyan">Problem Statements</NeonText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Solve real-world problems and win exciting prizes
          </p>
        </motion.div>

        {/* Problems List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              variants={itemVariants}
              className="card overflow-hidden"
            >
              <motion.button
                onClick={() => setExpandedId(expandedId === problem.id ? null : problem.id)}
                className="w-full"
              >
                <div className="flex items-start gap-4 p-6 hover:bg-gray-800/50 transition">
                  {/* Icon */}
                  <div className="text-4xl flex-shrink-0">{problem.icon}</div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <h3 className="text-2xl font-bold text-white">{problem.title}</h3>
                      <span className="px-3 py-1 bg-cyan-600/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
                        {problem.track}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        problem.difficulty === 'Advanced' ? 'bg-red-600/20 text-red-300' : 'bg-yellow-600/20 text-yellow-300'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{problem.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-bold">{problem.prize}</span>
                      <motion.div
                        animate={{ rotate: expandedId === problem.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400"
                      >
                        ▼
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Expanded Details */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedId === problem.id ? 'auto' : 0,
                  opacity: expandedId === problem.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-700"
              >
                <div className="p-6 bg-gray-800/30 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Full Description</h4>
                    <p className="text-gray-300">{problem.fullDescription}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {problem.requirements.map((req, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-300 text-sm">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Evaluation Criteria</h4>
                    <ul className="space-y-2">
                      {problem.evaluation.map((criterion, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.a
                    href="/register"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition"
                  >
                    Work on This Problem
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemStatements;