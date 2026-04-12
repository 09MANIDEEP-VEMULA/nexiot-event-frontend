import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Rotating Sphere
function RotatingSphere() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.001;
      mesh.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#64b5f6"
          emissive="#1e3a8a"
          distort={0.3}
          speed={2}
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// 3D Background elements
function Background() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 0, 500]} />
    </>
  );
}

export function Hero3D() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 75 }} style={{ height: '500px' }}>
      <Background />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#64b5f6" />
      
      <RotatingSphere />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}

// Full Hero Section
export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Hero3D />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Hackathon 2024
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Building Tomorrow's Solutions Today
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Join 100+ developers, designers, and innovators for 48 hours of non-stop creation. 
            Compete, collaborate, and showcase your skills on the biggest platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
          >
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(100, 181, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-lg text-lg transition-all"
            >
              Register Now
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg text-lg hover:bg-cyan-400/10 transition"
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-cyan-500/20"
          >
            {[
              { label: '100+', value: 'Teams' },
              { label: '₹10L+', value: 'Prizes' },
              { label: '48hrs', value: 'Duration' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400">
                  {stat.label}
                </div>
                <div className="text-gray-400">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
          <svg className="w-6 h-6 text-cyan-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroSection;