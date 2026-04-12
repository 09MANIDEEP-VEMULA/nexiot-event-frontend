import React from 'react';
import { motion } from 'framer-motion';
import { NeonText } from '../components/Effects/NeonEffects';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Event Organizer',
      bio: 'Full-stack developer and tech enthusiast',
      image: '👨‍💼',
      social: ['twitter', 'linkedin', 'github'],
    },
    {
      name: 'Sarah Chen',
      role: 'Technical Lead',
      bio: 'AI/ML specialist with 5+ years experience',
      image: '👩‍💻',
      social: ['twitter', 'linkedin', 'github'],
    },
    {
      name: 'Mike Rodriguez',
      role: 'Operations Manager',
      bio: 'Expert in event management and logistics',
      image: '👨‍💼',
      social: ['twitter', 'linkedin'],
    },
    {
      name: 'Emily Watson',
      role: 'Community Lead',
      bio: 'Passionate about building tech communities',
      image: '👩‍💼',
      social: ['twitter', 'linkedin'],
    },
    {
      name: 'David Park',
      role: 'Sponsorship Manager',
      bio: 'Building partnerships with industry leaders',
      image: '👨‍💼',
      social: ['linkedin'],
    },
    {
      name: 'Lisa Anderson',
      role: 'Marketing Lead',
      bio: 'Creative strategist and brand builder',
      image: '👩‍💼',
      social: ['twitter', 'linkedin'],
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
            <NeonText color="cyan">Meet Our Team</NeonText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate individuals dedicated to making this hackathon an unforgettable experience
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card group overflow-hidden"
            >
              {/* Avatar */}
              <div className="relative h-48 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center overflow-hidden mb-6">
                <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Member Info */}
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-cyan-400 font-semibold mb-2">{member.role}</p>
              <p className="text-gray-400 mb-6 min-h-12">{member.bio}</p>

              {/* Social Links */}
              <div className="flex gap-3">
                {member.social.map((social, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-10 h-10 rounded-full bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center hover:bg-cyan-600/40 transition text-cyan-300"
                  >
                    {social === 'twitter' && '𝕏'}
                    {social === 'linkedin' && 'in'}
                    {social === 'github' && '⚙'}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Team!</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help organize future events. 
            Whether you're interested in event organization, technical support, marketing, or community building, 
            we'd love to have you on board!
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:team@hackathon.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;