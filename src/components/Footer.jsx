import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/globals.css';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Tracks', href: '/tracks' },
        { name: 'Team', href: '/team' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Problem Statements', href: '/problems' },
        { name: 'Guidelines', href: '/guidelines' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Sponsors', href: '/sponsors' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Code of Conduct', href: '/code-of-conduct' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
    { name: 'GitHub', icon: 'gh', href: 'https://github.com' },
    { name: 'Instagram', icon: '📷', href: 'https://instagram.com' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black/50 to-black border-t border-cyan-500/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg"></div>
              <span className="text-white font-bold text-xl">Hackathon 2024</span>
            </div>
            <p className="text-gray-400 text-sm">
              Building the future through innovation, creativity, and collaboration.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Bottom Section */}
        <div className="border-t border-cyan-500/20 pt-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <p className="text-gray-400 text-sm">Follow us:</p>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-cyan-400/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center md:text-right space-y-2"
            >
              <p className="text-gray-400 text-sm">
                📧 contact@hackathon.org
              </p>
              <p className="text-gray-400 text-sm">
                📍 City Name, Country
              </p>
            </motion.div>
          </div>

          {/* Copyright */}
          <div className="border-t border-cyan-500/20 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Hackathon. All rights reserved. | Designed with ❤️ by the Hackathon Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;