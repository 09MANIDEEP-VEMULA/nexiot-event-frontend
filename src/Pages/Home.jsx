import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/Hero/HeroSection.jsx';
import CountdownTimer from '../components/Common/CountdownTimer.jsx';
import ProblemCard from '../components/Cards/ProblemCard';
import AnimatedButton from '../components/Common/AnimatedButton.jsx';

import styles from '../styles/globals.css';
const Home = () => {
  const tracks = [
    {
      name: 'AI & ML',
      icon: '🤖',
      description: 'Explore artificial intelligence and machine learning'
    },
    {
      name: 'IoT',
      icon: '🌐',
      description: 'Internet of Things and smart devices'
    },
    {
      name: 'Web3',
      icon: '⛓️',
      description: 'Blockchain and decentralized applications'
    },
    {
      name: 'Cybersecurity',
      icon: '🔐',
      description: 'Security and privacy in digital world'
    }
  ];

  const faqs = [
    {
      q: 'Who can participate?',
      a: 'Anyone with passion for technology can participate. You can join as an individual or form a team of up to 5 members.'
    },
    {
      q: 'Is there a registration fee?',
      a: 'Registration is free! However, some tracks may have specific prerequisites.'
    },
    {
      q: 'What are the prizes?',
      a: 'We have prizes worth ₹10+ lakhs distributed across different tracks and categories.'
    },
    {
      q: 'Do I need to be a student?',
      a: 'No, anyone can participate. We welcome professionals, graduates, and enthusiasts.'
    },
    {
      q: 'Can I work remotely?',
      a: 'Yes, this is a hybrid hackathon. You can participate from anywhere.'
    },
    {
      q: 'What should I bring?',
      a: 'Bring your laptop, ideas, and enthusiasm. We provide the rest!'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(0);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20">
        <HeroSection />
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
              Event Starts In
            </h2>
            <p className="text-gray-400 text-lg">
              Mark your calendar and get ready for the biggest tech event of the year!
            </p>
          </motion.div>
          <CountdownTimer targetDate="2024-12-31T00:00:00" />
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="gradient-neon">Tracks</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose from diverse tracks and challenge yourself across different domains of technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="card group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">
                  {track.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{track.name}</h3>
                <p className="text-gray-400">{track.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-y border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100+', label: 'Expected Teams' },
              { value: '48hrs', label: 'Coding Sprint' },
              { value: '₹10L+', label: 'Prize Pool' },
              { value: '5', label: 'Tracks' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="gradient-neon">Participate?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                title: 'Win Amazing Prizes',
                description: 'Compete for cash prizes, internships, and exciting opportunities'
              },
              {
                icon: '🤝',
                title: 'Network & Collaborate',
                description: 'Connect with like-minded innovators and potential team members'
              },
              {
                icon: '💡',
                title: 'Showcase Your Skills',
                description: 'Present your projects to industry experts and investors'
              },
              {
                icon: '📚',
                title: 'Learn & Grow',
                description: 'Attend workshops and learn from industry professionals'
              },
              {
                icon: '🚀',
                title: 'Launch Your Idea',
                description: 'Get mentorship to turn your hackathon project into a startup'
              },
              {
                icon: '🎉',
                title: 'Experience & Fun',
                description: 'Part of a vibrant community focused on innovation and growth'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-neon">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <motion.button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  className="w-full text-left card group"
                  whileHover={{ borderColor: 'rgba(100, 181, 246, 0.8)' }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-cyan-400"
                    >
                      ▼
                    </motion.div>
                  </div>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedFaq === idx ? 1 : 0,
                    height: expandedFaq === idx ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="p-4 text-gray-300 bg-white/5 border border-cyan-500/10 border-t-0 rounded-b-lg">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-neon">Build Something Amazing?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Don't miss this opportunity to showcase your skills and compete with the brightest minds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton size="lg">
                Register Now
              </AnimatedButton>
              <AnimatedButton variant="secondary" size="lg">
                Learn More
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;