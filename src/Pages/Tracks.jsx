import React, { useState } from "react";
import { motion } from "framer-motion";

const Tracks = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const tracks = [
    {
      id: 1,
      name: "AI & Machine Learning",
      icon: "🤖",
      color: "#7c3aed",
      description: "Build intelligent systems using AI/ML",
      prize: "₹2,00,000",
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"],
      problems: [
        "AI chatbot for support system",
        "ML prediction engine",
        "Computer vision app",
      ],
      difficulty: "Advanced",
    },
    {
      id: 2,
      name: "Web Development",
      icon: "🌐",
      color: "#2563eb",
      description: "Modern full-stack web applications",
      prize: "₹1,50,000",
      technologies: ["React", "Next.js", "Node.js", "TypeScript"],
      problems: [
        "Realtime chat app",
        "E-commerce platform",
        "Project management tool",
      ],
      difficulty: "Intermediate",
    },
    {
      id: 3,
      name: "Mobile Development",
      icon: "📱",
      color: "#16a34a",
      description: "Cross-platform mobile applications",
      prize: "₹1,50,000",
      technologies: ["Flutter", "React Native", "Swift", "Kotlin"],
      problems: ["Fitness app", "Social media app", "Productivity app"],
      difficulty: "Intermediate",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "90px",
        paddingBottom: "60px",
        background: "radial-gradient(circle at top, #0a0a0a, #050b1a)",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>
            <span style={{ color: "#00e5ff" }}>Hackathon Tracks</span>
          </h1>
          <p style={{ color: "#aaa", marginTop: "10px" }}>
            Choose your domain and build something amazing 🚀
          </p>
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              whileHover={{ scale: 1.03 }}
              style={{
                padding: "20px",
                borderRadius: "16px",
                cursor: "pointer",
                background:
                  "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,255,255,0.15)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 20px rgba(0,255,255,0.05)",
              }}
            >
              <div style={{ fontSize: "40px" }}>{track.icon}</div>

              <h2 style={{ fontSize: "20px", marginTop: "10px" }}>
                {track.name}
              </h2>

              <p style={{ color: "#aaa", fontSize: "14px", marginTop: "5px" }}>
                {track.description}
              </p>

              <div style={{ marginTop: "10px", fontSize: "13px" }}>
                <p>
                  💰 <b style={{ color: "#00e5ff" }}>{track.prize}</b>
                </p>
                <p>
                  ⚡ <b>{track.difficulty}</b>
                </p>
              </div>

              <button
                style={{
                  marginTop: "15px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(90deg,#00e5ff,#3b82f6)",
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>

        {/* DETAILS SECTION */}
        {selectedTrack && (
          <div
            style={{
              marginTop: "40px",
              padding: "25px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,255,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            {(() => {
              const track = tracks.find((t) => t.id === selectedTrack);

              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ fontSize: "26px" }}>{track.name}</h2>

                    <span
                      style={{ cursor: "pointer", color: "#aaa" }}
                      onClick={() => setSelectedTrack(null)}
                    >
                      ✕
                    </span>
                  </div>

                  <p style={{ color: "#aaa", marginBottom: "20px" }}>
                    {track.description}
                  </p>

                  <h3 style={{ color: "#00e5ff" }}>Technologies</h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {track.technologies.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          background: "rgba(0,255,255,0.1)",
                          border: "1px solid rgba(0,255,255,0.3)",
                          fontSize: "12px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ color: "#00e5ff", marginTop: "20px" }}>
                    Problems
                  </h3>

                  {track.problems.map((p, i) => (
                    <p key={i} style={{ marginTop: "8px", color: "#ccc" }}>
                      • {p}
                    </p>
                  ))}

                  <button
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "none",
                      background:
                        "linear-gradient(90deg,#00e5ff,#3b82f6)",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => (window.location.href = "/register")}
                  >
                    Register Now
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracks;