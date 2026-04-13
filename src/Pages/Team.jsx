import React from 'react';
import { motion } from 'framer-motion';

const Team = () => {
  // Data sets for individual profiles
  const faculty = {
    name: "Ms. N. Sujata Gupta",
    role: "Faculty Advisor",
    dept: "Dept of CET, CBIT",
    bio: "Guiding NEX-IOT with expertise in embedded systems and wireless communications, helping students bridge academic theory with practical IoT implementation.",
    initials: "FA"
  };

  const core = [
    { name: 'Dasari Ishanvith', role: 'President', initials: 'DI' },
    { name: 'P. Harini', role: 'Vice President', initials: 'PH' },
    { name: 'Jeevan Reddy', role: 'Vice President', initials: 'JR' },
    { name: 'Ridhima Balakrishna', role: 'General Secretary', initials: 'RB' },
    { name: 'Ch Sai Harika', role: 'General Secretary', initials: 'CH' },
    { name: 'Ananth', role: 'General Secretary', initials: 'A' },
    { name: 'Sathvika Cheelamanthula', role: 'Joint Secretary', initials: 'SC' },
    { name: 'Guduri Adhvika', role: 'Joint Secretary', initials: 'GA' },
    { name: 'Manpreet Kaur', role: 'Treasurer', initials: 'MK' },
    { name: 'M. Deekshitha', role: 'Treasurer', initials: 'MD' },
  ];

  const leads = [
    { name: 'Rohan Pudari', role: 'External Affairs', initials: 'RP' },
    { name: 'Sadhika', role: 'Events Head', initials: 'SA' },
    { name: 'Harsha', role: 'Events Head', initials: 'HA' },
    { name: 'Abhinaya', role: 'Design Head', initials: 'AB' },
    { name: 'Natalie Sasha', role: 'Design Head', initials: 'NS' },
    { name: 'Manideep K', role: 'Technical Head', initials: 'MK' },
    { name: 'Manideep V', role: 'Technical Head', initials: 'MV' },
    { name: 'Manjunath', role: 'Technical Head', initials: 'MJ' },
    { name: 'Ramya', role: 'Documentation Head', initials: 'RA' },
    { name: 'Bhavya', role: 'Documentation Head', initials: 'BH' },
    { name: 'Ruthwik', role: 'Sponsorship & Finance', initials: 'RU' },
    { name: 'Vibhav', role: 'Sponsorship & Finance', initials: 'VI' },
    { name: 'Faiz', role: 'PR Head', initials: 'FA' },
    { name: 'Pranitha', role: 'PR Head', initials: 'PR' },
    { name: 'Sathwik B S', role: 'Photography Head', initials: 'SB' },
    { name: 'Shrithan', role: 'Photography Head', initials: 'SH' },
    { name: 'Vikram', role: 'Logistics Head', initials: 'VK' },
    { name: 'Ganesh', role: 'Logistics Head', initials: 'GA' },
  ];

  const founders = [
    { name: 'MD Raheesh Arman', role: 'Student Coordinator', initials: 'RA' },
    { name: 'B Praneeth', role: 'Student Coordinator', initials: 'BP' },
    { name: 'G Rami Reddy', role: 'Student Coordinator', initials: 'RR' },
  ];

  // Reusable Member Card Component
  const MemberCard = ({ name, role, initials, color = "#22d3ee" }) => (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      style={styles.card}
    >
      <div style={{ ...styles.avatar, border: `2px solid ${color}33`, color: color }}>
        {initials}
      </div>
      <h3 style={styles.memberName}>{name}</h3>
      <p style={{ ...styles.memberRole, color: color }}>{role}</p>
      <div style={styles.cardDecoration}></div>
    </motion.div>
  );

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        <header style={styles.header}>
          <h1 style={styles.title}>Our <span style={styles.accentText}>Team</span></h1>
          <p style={styles.subtitle}>The brilliant minds behind the NEX-IOT revolution.</p>
        </header>

        {/* FACULTY ADVISOR */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Faculty Advisor</h2>
          <div style={styles.facultyWrapper}>
            <motion.div whileHover={{ scale: 1.01 }} style={styles.facultyCard}>
              <div style={styles.facultyAvatar}>{faculty.initials}</div>
              <div style={styles.facultyContent}>
                <h3 style={styles.facultyName}>{faculty.name}</h3>
                <p style={styles.facultyRole}>{faculty.role} | {faculty.dept}</p>
                <p style={styles.facultyBio}>{faculty.bio}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CORE COMMITTEE */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Core Committee</h2>
          <div style={styles.grid}>
            {core.map((m, i) => <MemberCard key={i} {...m} color="#22d3ee" />)}
          </div>
        </section>

        {/* DEPARTMENT HEADS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Department Leads</h2>
          <div style={styles.grid}>
            {leads.map((m, i) => <MemberCard key={i} {...m} color="#818cf8" />)}
          </div>
        </section>

        {/* FOUNDERS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Founding Coordinators (2024)</h2>
          <div style={styles.grid}>
            {founders.map((m, i) => <MemberCard key={i} {...m} color="#c084fc" />)}
          </div>
        </section>

      </div>
    </div>
  );
};

/* --- UI Styling --- */
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#020617',
    color: '#fff',
    padding: '120px 20px',
    fontFamily: '"Inter", sans-serif',
    backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)',
  },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '80px' },
  title: { fontSize: '4rem', fontWeight: '900', letterSpacing: '-0.05em' },
  accentText: { color: '#22d3ee' },
  subtitle: { color: '#64748b', fontSize: '1.2rem', marginTop: '10px' },
  
  section: { marginBottom: '100px' },
  sectionTitle: { 
    fontSize: '24px', fontWeight: '800', marginBottom: '40px', 
    textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8',
    textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'
  },

  // Faculty Card
  facultyCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '40px', borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex', gap: '40px', alignItems: 'center',
    backdropFilter: 'blur(20px)',
  },
  facultyAvatar: { 
    width: '100px', height: '100px', borderRadius: '50%', 
    background: '#22d3ee', color: '#020617', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', 
    fontSize: '32px', fontWeight: '900' 
  },
  facultyName: { fontSize: '28px', fontWeight: '900' },
  facultyRole: { color: '#22d3ee', fontWeight: '700', margin: '10px 0' },
  facultyBio: { color: '#94a3b8', lineHeight: '1.6' },

  // Grid Member Card
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
    gap: '24px' 
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '20px', padding: '30px',
    textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.05)',
    position: 'relative', overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  avatar: {
    width: '70px', height: '70px', borderRadius: '50%',
    margin: '0 auto 20px', background: 'rgba(255,255,255,0.02)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '20px', fontWeight: '800'
  },
  memberName: { fontSize: '18px', fontWeight: '800', marginBottom: '8px' },
  memberRole: { fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' },
  cardDecoration: {
    position: 'absolute', bottom: '-20px', right: '-20px',
    width: '60px', height: '60px', background: 'currentColor',
    opacity: 0.03, borderRadius: '50%'
  }
};

export default Team;