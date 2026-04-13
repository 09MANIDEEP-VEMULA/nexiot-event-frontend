// About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

export const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
            About Hackathon
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building the future through innovation, collaboration, and technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">What is Hackathon?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A hackathon is a time-bound event where developers, designers, and innovators come together to create solutions for real-world problems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our 48-hour hackathon brings together the brightest minds to compete, collaborate, and showcase their skills across diverse technology tracks.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We believe in the power of innovation to solve real-world problems and create positive change.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to provide a platform for talented individuals to showcase their skills, learn from industry experts, and build solutions that matter.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center py-12"
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-8">Why Participate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Prizes', desc: 'Win amazing prizes and opportunities' },
              { icon: '🤝', title: 'Network', desc: 'Connect with industry professionals' },
              { icon: '💡', title: 'Learn', desc: 'Develop new skills and knowledge' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default About;