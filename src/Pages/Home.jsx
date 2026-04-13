import React, { useState } from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import HeroSection from '../components/Hero/HeroSection.jsx';
import CountdownTimer from '../components/Common/CountdownTimer.jsx';
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
          {/* Countdown Section */}
<section className="py-16 bg-gradient-to-b from-black via-blue-950/10 to-black">
  <div className="max-w-7xl mx-auto px-6">

    {/* 🔥 WRAP TIMER IN CENTER + HORIZONTAL LOOK */}
    <div className="flex justify-center items-center">
      <div className="flex gap-6 md:gap-10 bg-white/5 border border-cyan-500/20 rounded-2xl px-6 py-6 backdrop-blur-md shadow-lg">
        <CountdownTimer targetDate="2024-12-31T00:00:00" />
      </div>
    </div>

  </div>
</section>
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
            <br>
            </br>
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

      <section
  style={{
    position: "relative",
    padding: "120px 0",
    overflow: "hidden",
    background: "#030712"
  }}
>
  {/* Background Glow */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 60%)"
    }}
  />

  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 24px",
      position: "relative",
      zIndex: 10
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px"
      }}
    >
      {[
        { value: "100+", label: "Expected Teams" },
        { value: "48hrs", label: "Coding Sprint" },
        { value: "₹10L+", label: "Prize Pool" },
        { value: "5", label: "Tracks" }
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          whileHover={{ y: -8 }}
          style={{
            position: "relative",
            padding: "40px 20px",
            textAlign: "center",
            borderRadius: "16px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
        >
          {/* Glow Effect */}
          <div
            style={{
              position: "absolute",
              inset: "-1px",
              borderRadius: "16px",
              background:
                "linear-gradient(120deg, transparent, rgba(0,255,255,0.3), transparent)",
              opacity: 0,
              transition: "0.4s"
            }}
            className="card-glow"
          />

          {/* Number */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              background:
                "linear-gradient(180deg, #ffffff 0%, #9ca3af 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px"
            }}
          >
            {stat.value}
          </div>

          {/* Label */}
          <div
            style={{
              marginTop: "12px",
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "rgba(34,211,238,0.8)"
            }}
          >
            {stat.label}
          </div>

          {/* Bottom Accent */}
          <div
            style={{
              margin: "20px auto 0",
              width: "30px",
              height: "2px",
              background: "#1f2937",
              transition: "0.3s"
            }}
          />
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
      <section
  className="py-24"
  style={{
    background:
      "linear-gradient(to bottom, transparent, rgba(2,6,23,0.8), transparent)",
    position: "relative"
  }}
>
  {/* Background Glow */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(circle at center, rgba(0,140,255,0.08), transparent 70%)"
    }}
  />

  <div
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "0 24px",
      position: "relative",
      zIndex: 2
    }}
  >
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        textAlign: "center",
        marginBottom: "60px"
      }}
    >
      <h2
        style={{
          fontSize: "42px",
          fontWeight: "700",
          color: "white",
          marginBottom: "10px"
        }}
      >
        Frequently Asked{" "}
        <span
          style={{
            background:
              "linear-gradient(90deg,#22d3ee,#3b82f6,#8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Questions
        </span>
      </h2>

      <div
        style={{
          width: "80px",
          height: "3px",
          margin: "15px auto",
          background:
            "linear-gradient(90deg, transparent, #22d3ee, transparent)"
        }}
      />
    </motion.div>

    {/* FAQ Container */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}
    >
      {faqs.map((faq, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
        >
          {/* Question */}
          <motion.button
            onClick={() =>
              setExpandedFaq(expandedFaq === idx ? -1 : idx)
            }
            whileHover={{
              y: -3
            }}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "20px 22px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              backdropFilter: "blur(20px)",
              border:
                expandedFaq === idx
                  ? "1px solid rgba(34,211,238,0.4)"
                  : "1px solid rgba(255,255,255,0.05)",
              position: "relative",
              transition: "all 0.3s ease"
            }}
          >
            {/* Left Accent */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "3px",
                borderRadius: "4px",
                background:
                  expandedFaq === idx
                    ? "linear-gradient(#22d3ee,#3b82f6)"
                    : "transparent",
                transition: "0.3s"
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#fff"
                }}
              >
                {faq.q}
              </h3>

              <motion.div
                animate={{
                  rotate: expandedFaq === idx ? 180 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{
                  color: "#22d3ee",
                  fontSize: "18px"
                }}
              >
                ▼
              </motion.div>
            </div>
          </motion.button>

          {/* Answer */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: expandedFaq === idx ? 1 : 0,
              height: expandedFaq === idx ? "auto" : 0
            }}
            transition={{ duration: 0.35 }}
            style={{
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "20px 22px",
                marginTop: "2px",
                borderRadius: "0 0 14px 14px",
                background:
                  "rgba(255,255,255,0.03)",
                border:
                  "1px solid rgba(34,211,238,0.1)",
                borderTop: "none",
                color: "#9ca3af",
                lineHeight: "1.7"
              }}
            >
              {faq.a}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;