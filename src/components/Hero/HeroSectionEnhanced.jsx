import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import AnimatedButton from '../Common/AnimatedButton';


import './HeroSectionEnhanced.css';

function ParticleGlobeOptimized() {
  const groupRef = useRef();
  const particlesRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const [particles] = useState(() => {
    const count = 800;
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      particles.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        hue: Math.random(),
      });
    }
    return particles;
  });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation
      groupRef.current.rotation.x += 0.0003;
      groupRef.current.rotation.y += 0.0005;
      
      // Mouse interaction
      groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (mouse.current.y * 0.3 - groupRef.current.rotation.x) * 0.02;
    }
  });

  const positions = new Float32Array(particles.length * 3);
  const colors = new Float32Array(particles.length * 3);

  particles.forEach((p, i) => {
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;

    const hue = (p.hue + Math.sin(Date.now() * 0.0001 + i) * 0.1) % 1;
    const rgb = hslToRgb(hue, 1, 0.5);
    colors[i * 3] = rgb[0];
    colors[i * 3 + 1] = rgb[1];
    colors[i * 3 + 2] = rgb[2];
  });

  return (
    <group ref={groupRef}>
      {/* Particle Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.length}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          wireframe
          color={0x2196f3}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Glow Torus 1 */}
      <mesh rotation={[Math.PI * 0.15, 0, Math.PI * 0.2]}>
        <torusGeometry args={[1.2, 0.02, 8, 100]} />
        <meshBasicMaterial
          color={0x00bcd4}
          emissive={0x00bcd4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Glow Torus 2 */}
      <mesh rotation={[0, 0, Math.PI * 0.3]}>
        <torusGeometry args={[1.15, 0.015, 8, 100]} />
        <meshBasicMaterial
          color={0x64b5f6}
          emissive={0x64b5f6}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Glowing Points at poles */}
      <group>
        <mesh position={[0, 0, 1.3]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshBasicMaterial
            color={0x64b5f6}
            emissive={0x64b5f6}
          />
        </mesh>
        <mesh position={[0, 0, -1.3]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshBasicMaterial
            color={0x00bcd4}
            emissive={0x00bcd4}
          />
        </mesh>
      </group>
    </group>
  );
}

// Helper function
function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r, g, b];
}

// Main Hero Section Component
export function HeroSectionEnhanced() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color={0x64b5f6} />
          <pointLight position={[-10, -10, 10]} intensity={0.5} color={0x2196f3} />
          
          <ParticleGlobeOptimized />
          
          <fog attach="fog" args={['#000000', 1, 10]} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          {/* Title with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span 
                style={{
                  background: 'linear-gradient(135deg, #64b5f6, #2196f3, #00bcd4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(100, 181, 246, 0.5))',
                }}
              >
                Hackathon 2024
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Innovation Unleashed • 48-Hour Creative Sprint
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join 100+ developers, designers, and innovators for an intense 48-hour hackathon. 
            Build cutting-edge projects, win amazing prizes, and launch your next big idea.
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-3 gap-8 mb-12 py-8 border-t border-b border-cyan-500/20"
          >
            {[
              { value: '100+', label: 'Teams' },
              { value: '₹10L+', label: 'Prizes' },
              { value: '48hrs', label: 'Duration' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <AnimatedButton 
              size="lg"
              className="shadow-lg shadow-cyan-500/50"
            >
              🚀 Register Now
            </AnimatedButton>
            <AnimatedButton 
              variant="secondary" 
              size="lg"
            >
              📚 Learn More
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
        <svg className="w-6 h-6 text-cyan-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
}

export default HeroSectionEnhanced;