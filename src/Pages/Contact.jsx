import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NeonText, GlowingButton } from '../components/Effects/NeonEffects';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
        setTimeout(() => setSubmitted(false), 5000);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

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
            <NeonText color="cyan">Get In Touch</NeonText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="card">
              <div className="flex gap-4 items-start">
                <div className="text-4xl">📍</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                  <p className="text-gray-400">
                    Tech Valley Convention Center<br />
                    123 Innovation Drive<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card">
              <div className="flex gap-4 items-start">
                <div className="text-4xl">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-gray-400">
                    <a href="mailto:info@hackathon.com" className="hover:text-cyan-400 transition">
                      info@hackathon.com
                    </a><br />
                    <a href="mailto:support@hackathon.com" className="hover:text-cyan-400 transition">
                      support@hackathon.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card">
              <div className="flex gap-4 items-start">
                <div className="text-4xl">📞</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                  <p className="text-gray-400">
                    <a href="tel:+14155552671" className="hover:text-cyan-400 transition">
                      +1 (415) 555-2671
                    </a><br />
                    <a href="tel:+14155552672" className="hover:text-cyan-400 transition">
                      +1 (415) 555-2672
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card">
              <div className="flex gap-4 items-start">
                <div className="text-4xl">🕒</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
                  <p className="text-gray-400">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="card">
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { name: 'Twitter', icon: '𝕏', url: '#' },
                  { name: 'LinkedIn', icon: 'in', url: '#' },
                  { name: 'GitHub', icon: '⚙', url: '#' },
                  { name: 'Discord', icon: '◆', url: '#' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center hover:bg-cyan-600/40 transition text-cyan-300 font-bold"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card"
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-600/20 border border-green-500/50 rounded-lg text-green-300"
              >
                ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Your Name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Message Subject"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-400 text-center">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 card h-96 overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-400">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">Embed Google Maps or similar</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;