import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Highly recommended for pro feel
import * as THREE from "three";

/* 🌍 ROTATING HERO GLOBE - Enhanced with wireframe layer */
const HeroGlobe = () => {
  const globeRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.1;
      wireRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d2ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9d50bb" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={globeRef} position={[0, 0, -2]}>
          <sphereGeometry args={[3, 64, 64]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#0f172a"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        {/* Professional touch: Subtle wireframe overlay */}
        <mesh ref={wireRef} position={[0, 0, -2]}>
          <sphereGeometry args={[3.05, 32, 32]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </>
  );
};

const HeroSection = () => {
  const heroRef = useRef();
  const navigate = useNavigate();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 15;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 15;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.05;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.05;
      if (heroRef.current) {
        heroRef.current.style.transform = `translate3d(${smooth.current.x}px, ${smooth.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section style={styles.container}>
      {/* 🌌 3D Canvas Layer */}
      <div style={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <HeroGlobe />
          <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* ✨ Content Layer */}
      <div ref={heroRef} style={styles.content}>
        <div style={styles.badge}>
          <span style={styles.badgePulse}></span>
          HACKATHON 2026 • NOW OPEN
        </div>

        <h1 style={styles.title}>
          Build the <span style={styles.gradientText}>Future</span>
        </h1>

        <p style={styles.description}>
          Experience the next generation of innovation. 
          Collaborate with the world's brightest minds to build solutions that scale.
        </p>

        <div style={styles.buttonGroup}>
          <button 
            style={styles.primaryBtn} 
            onClick={() => navigate("Register")}
            onMouseEnter={(e) => e.target.style.filter = "brightness(1.2)"}
            onMouseLeave={(e) => e.target.style.filter = "brightness(1)"}
          >
            Register Now
          </button>
          <button style={styles.secondaryBtn}>
            View Tracks
          </button>
        </div>

        {/* Improved Glass Card */}
        <div style={styles.glassCard}>
          <div style={styles.cardItem}><strong>AI</strong> Model Training</div>
          <div style={styles.divider}></div>
          <div style={styles.cardItem}><strong>Web3</strong> Architecture</div>
          <div style={styles.divider}></div>
          <div style={styles.cardItem}><strong>Cloud</strong> Native</div>
        </div>
      </div>
    </section>
  );
};

/* 🎨 Professional UI Style Objects */
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617",
    overflow: "hidden",
    position: "relative",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
  },
  canvasWrapper: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    background: "radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)",
  },
  content: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    maxWidth: "850px",
    padding: "0 20px",
    pointerEvents: "none", // Allow clicks to pass to buttons below
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.05)",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "2px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    marginBottom: "24px",
    color: "#38bdf8",
  },
  title: {
    fontSize: "clamp(3rem, 8vw, 5rem)",
    fontWeight: "900",
    lineHeight: "1.1",
    letterSpacing: "-0.03em",
    marginBottom: "20px",
  },
  gradientText: {
    background: "linear-gradient(to right, #38bdf8, #818cf8, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    fontSize: "1.1rem",
    color: "#94a3b8",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto 40px auto",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    pointerEvents: "all",
  },
  primaryBtn: {
    padding: "14px 32px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    color: "#020617",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 20px rgba(255,255,255,0.1)",
  },
  secondaryBtn: {
    padding: "14px 32px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "600",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  glassCard: {
    marginTop: "60px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  },
  cardItem: {
    fontSize: "14px",
    color: "#94a3b8",
  },
  divider: {
    width: "1px",
    height: "24px",
    background: "rgba(255,255,255,0.1)",
  }
};

export default HeroSection;