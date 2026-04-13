import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProblemStatements = () => {
  const [expandedId, setExpandedId] = useState(null);

  const problems = [
    { id: 1, track: 'AI & ML', difficulty: 'Advanced', icon: '🤖', title: 'Smart Recommendation Engine', description: 'Build an AI-powered recommendation system that learns from user behavior', prize: '₹50,000', requirements: ['ML Algorithm', 'Data Processing'], evaluation: ['Accuracy', 'Efficiency'] },
    { id: 3, track: 'Web Dev', difficulty: 'Intermediate', icon: '🌐', title: 'Real-time Collaboration', description: 'Build a web app where multiple users can collaborate in real-time', prize: '₹45,000', requirements: ['WebSockets', 'React'], evaluation: ['Usability', 'Performance'] },
    // ... add others as needed
  ];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.headerSection}
        >
          <div style={styles.topBadge}>CHALLENGE REPOSITORY 2026</div>
          <h1 style={styles.mainTitle}>
            Problem <span style={styles.gradientText}>Statements</span>
          </h1>
          <p style={styles.subtitle}>
            Select a vertical, deploy your skills, and solve high-impact challenges.
          </p>
        </motion.div>

        {/* --- Grid/List --- */}
        <div style={styles.listWrapper}>
          {problems.map((problem) => {
            const isExpanded = expandedId === problem.id;
            return (
              <motion.div
                key={problem.id}
                layout
                style={{
                  ...styles.card,
                  borderColor: isExpanded ? '#22d3ee' : 'rgba(255,255,255,0.08)',
                  background: isExpanded ? 'rgba(34, 211, 238, 0.03)' : 'rgba(255,255,255,0.02)',
                }}
              >
                {/* Trigger Area */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : problem.id)}
                  style={styles.cardHeader}
                >
                  <div style={styles.iconBox}>{problem.icon}</div>
                  
                  <div style={styles.mainInfo}>
                    <div style={styles.tagRow}>
                      <span style={styles.trackTag}>{problem.track}</span>
                      <span style={{
                        ...styles.diffTag,
                        color: problem.difficulty === 'Advanced' ? '#f87171' : '#fbbf24',
                        backgroundColor: problem.difficulty === 'Advanced' ? 'rgba(248,113,113,0.1)' : 'rgba(251,191,36,0.1)'
                      }}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <h3 style={styles.cardTitle}>{problem.title}</h3>
                    <p style={styles.cardShortDesc}>{problem.description}</p>
                  </div>

                  <div style={styles.sideInfo}>
                    <div style={styles.prizeLabel}>Bounty</div>
                    <div style={styles.prizeValue}>{problem.prize}</div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} style={styles.chevron}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={styles.expandedBody}>
                        <div style={styles.gridDetails}>
                          <div>
                            <h4 style={styles.detailTitle}>Stack Requirements</h4>
                            <div style={styles.pillGroup}>
                              {problem.requirements.map(r => <span key={r} style={styles.pill}>{r}</span>)}
                            </div>
                          </div>
                          <div>
                            <h4 style={styles.detailTitle}>Evaluation Metric</h4>
                            <div style={styles.pillGroup}>
                              {problem.evaluation.map(e => <span key={e} style={styles.pill}>{e}</span>)}
                            </div>
                          </div>
                        </div>
                        
                        <button style={styles.actionBtn}>
                          INITIALIZE PROJECT
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* --- Component Styles --- */
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#020617',
    padding: '120px 20px',
    fontFamily: '"Inter", sans-serif',
    color: '#fff',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  topBadge: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '3px',
    color: '#22d3ee',
    marginBottom: '16px',
    border: '1px solid rgba(34,211,238,0.3)',
    padding: '4px 12px',
    borderRadius: '4px',
  },
  mainTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    marginBottom: '16px',
  },
  gradientText: {
    background: 'linear-gradient(to right, #22d3ee, #818cf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '18px',
    color: '#94a3b8',
    maxWidth: '600px',
    margin: '0 auto',
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    borderRadius: '20px',
    border: '1px solid',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardHeader: {
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    cursor: 'pointer',
  },
  iconBox: {
    width: '64px',
    height: '64px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  mainInfo: {
    flex: 1,
  },
  tagRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  trackTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#22d3ee',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  diffTag: {
    fontSize: '11px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '800',
    marginBottom: '6px',
    letterSpacing: '-0.01em',
  },
  cardShortDesc: {
    fontSize: '15px',
    color: '#64748b',
  },
  sideInfo: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  prizeLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  prizeValue: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#22d3ee',
  },
  chevron: {
    marginTop: '10px',
    color: '#475569',
  },
  expandedBody: {
    padding: '0 30px 30px 118px',
  },
  gridDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    marginBottom: '30px',
  },
  detailTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '12px',
    letterSpacing: '1px',
  },
  pillGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  pill: {
    fontSize: '12px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '4px 12px',
    borderRadius: '6px',
    color: '#cbd5e1',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  actionBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#020617',
    fontWeight: '800',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: '0.3s',
  }
};

export default ProblemStatements;