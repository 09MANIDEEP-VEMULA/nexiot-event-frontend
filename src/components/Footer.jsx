import React from 'react';
import { motion } from 'framer-motion';

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
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#' },
    { name: 'LinkedIn', icon: 'in', href: '#' },
    { name: 'GitHub', icon: 'gh', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' }
  ];

  return (
    <footer style={styles.footer}>
      {/* Subtle Top Border Glow */}
      <div style={styles.topGlow}></div>

      <div style={styles.container}>
        <div style={styles.mainGrid}>
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.brandCol}
          >
            <div style={styles.logoWrapper}>
              <div style={styles.logoBox}></div>
              <span style={styles.logoText}>HACKATHON <span style={{color: '#22d3ee'}}>2026</span></span>
            </div>
            <p style={styles.brandDesc}>
              A global stage for builders, creators, and visionaries to shape the next generation of tech.
            </p>
          </motion.div>

          {/* Link Sections */}
          {footerSections.map((section, idx) => (
            <div key={idx} style={styles.linkCol}>
              <h3 style={styles.sectionTitle}>{section.title}</h3>
              <ul style={styles.linkList}>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} style={styles.linkItem}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <div style={styles.bottomContent}>
            
            {/* Socials */}
            <div style={styles.socialGroup}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -3, color: '#22d3ee' }}
                  style={styles.socialIcon}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Copyright Info */}
            <div style={styles.copyRightGroup}>
              <p style={styles.copyText}>
                © {currentYear} Hackathon Organization. 
                <span style={styles.divider}>|</span> 
                Status: <span style={styles.statusDot}></span> All Systems Operational
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#020617',
    position: 'relative',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '80px',
    paddingBottom: '40px',
    color: '#94a3b8',
    fontFamily: '"Inter", sans-serif',
    overflow: 'hidden',
  },
  topGlow: {
    position: 'absolute',
    top: '-1px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #0891b2, transparent)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '48px',
    marginBottom: '64px',
  },
  brandCol: {
    gridColumn: 'span 1',
    maxWidth: '300px',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  logoBox: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #0891b2 0%, #4f46e5 100%)',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(8, 145, 178, 0.3)',
  },
  logoText: {
    color: '#f8fafc',
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.02em',
  },
  brandDesc: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#64748b',
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '24px',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  linkItem: {
    display: 'block',
    fontSize: '14px',
    color: '#94a3b8',
    textDecoration: 'none',
    marginBottom: '12px',
    transition: 'all 0.2s ease',
    ':hover': { color: '#f8fafc' } // Handled via global CSS or hover states
  },
  bottomBar: {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '32px',
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24px',
  },
  socialGroup: {
    display: 'flex',
    gap: '16px',
  },
  socialIcon: {
    fontSize: '18px',
    color: '#64748b',
    textDecoration: 'none',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    transition: '0.3s',
  },
  copyRightGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  copyText: {
    fontSize: '13px',
    color: '#475569',
  },
  divider: {
    margin: '0 12px',
    color: '#1e293b',
  },
  statusDot: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    marginRight: '6px',
    boxShadow: '0 0 8px #10b981',
  }
};

export default Footer;