// About.jsx
import React from 'react';
import { motion } from 'framer-motion';

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

// Tracks.jsx
export const Tracks = () => {
  const tracks = [
    {
      name: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Build intelligent systems and explore deep learning',
      problems: ['ML Model Optimization', 'AI Chatbot', 'Computer Vision']
    },
    {
      name: 'IoT & Hardware',
      icon: '🌐',
      description: 'Connect devices and build smart solutions',
      problems: ['Smart Home', 'Wearables', 'Industrial IoT']
    },
    {
      name: 'Blockchain & Web3',
      icon: '⛓️',
      description: 'Develop decentralized applications',
      problems: ['DeFi Protocol', 'NFT Platform', 'DAO']
    },
    {
      name: 'Cybersecurity',
      icon: '🔐',
      description: 'Secure systems and protect against threats',
      problems: ['Threat Detection', 'Secure Messaging', 'Vulnerability Scanner']
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
            Explore Tracks
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card group"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">
                {track.icon}
              </div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">{track.name}</h2>
              <p className="text-gray-300 mb-4">{track.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400 font-semibold">Problem Statements:</p>
                {track.problems.map((problem, pIdx) => (
                  <p key={pIdx} className="text-sm text-gray-400">• {problem}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Team.jsx
export const Team = () => {
  const team = [
    {
      section: 'Faculty Advisors',
      members: [
        { name: 'Dr. John Smith', role: 'President', photo: 'https://via.placeholder.com/150' },
        { name: 'Prof. Sarah Johnson', role: 'Vice President', photo: 'https://via.placeholder.com/150' }
      ]
    },
    {
      section: 'Organizing Committee',
      members: [
        { name: 'Alex Williams', role: 'Technical Lead', photo: 'https://via.placeholder.com/150' },
        { name: 'Emma Davis', role: 'Event Lead', photo: 'https://via.placeholder.com/150' },
        { name: 'Mike Brown', role: 'Marketing Lead', photo: 'https://via.placeholder.com/150' }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
            Meet Our Team
          </h1>
        </motion.div>

        {team.map((section, sIdx) => (
          <div key={sIdx} className="mb-12">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center">
              {section.section}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.members.map((member, mIdx) => (
                <motion.div
                  key={mIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card text-center"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-cyan-400"
                  />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-cyan-400 text-sm mb-4">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ProblemStatements.jsx
export const ProblemStatements = () => {
  const problems = [
    { title: 'AI Track', id: 1, track: 'AI & ML' },
    { title: 'IoT Solutions', id: 2, track: 'IoT' },
    { title: 'Blockchain Innovation', id: 3, track: 'Web3' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
            Problem Statements
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                {problem.track}
              </span>
              <h3 className="text-xl font-bold mt-3 mb-2">{problem.title}</h3>
              <p className="text-gray-400">
                Challenge yourself to solve real-world problems and create innovative solutions.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact.jsx
export const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '', email: '', phone: '', message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
            Contact Us
          </h1>
          <p className="text-gray-400">
            Have questions? Get in touch with our team
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="card space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              placeholder="+91-XXXXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              placeholder="Your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 transition min-h-32"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition"
          >
            Send Message
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {[
            { icon: '📧', label: 'Email', value: 'contact@hackathon.org' },
            { icon: '📍', label: 'Location', value: 'City, Country' },
            { icon: '🕐', label: 'Hours', value: '24/7 Support' }
          ].map((info, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-3xl mb-2">{info.icon}</div>
              <p className="text-gray-400 text-sm mb-1">{info.label}</p>
              <p className="font-semibold">{info.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;