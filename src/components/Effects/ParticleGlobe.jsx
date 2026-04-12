import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Particle Globe Component
function ParticleGlobe() {
  const groupRef = useRef();
  const particlesRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create particle positions in a sphere
    const particleCount = 1000;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      
      newParticles.push({
        pos: [x, y, z],
        vel: [Math.random() * 0.01, Math.random() * 0.01, Math.random() * 0.01],
        color: Math.random(),
      });
    }
    
    setParticles(newParticles);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate globe
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.rotation.y += 0.001;
      
      // Mouse interaction
      const targetX = mouseRef.current.x * 0.1;
      const targetY = mouseRef.current.y * 0.1;
      
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }

    // Animate particles
    if (particlesRef.current && particlesRef.current.geometry) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const idx = i * 3;
        
        // Update position
        particle.pos[0] += particle.vel[0];
        particle.pos[1] += particle.vel[1];
        particle.pos[2] += particle.vel[2];
        
        // Constraint to sphere
        const mag = Math.sqrt(
          particle.pos[0] ** 2 + particle.pos[1] ** 2 + particle.pos[2] ** 2
        );
        
        particle.pos[0] = (particle.pos[0] / mag) * 1.0;
        particle.pos[1] = (particle.pos[1] / mag) * 1.0;
        particle.pos[2] = (particle.pos[2] / mag) * 1.0;
        
        positions[idx] = particle.pos[0];
        positions[idx + 1] = particle.pos[1];
        positions[idx + 2] = particle.pos[2];
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (particles.length === 0) return null;

  return (
    <group ref={groupRef}>
      {/* Particle Points */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={new Float32Array(particles.flatMap(p => p.pos))}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.length}
            array={new Float32Array(
              particles.flatMap(p => [
                Math.sin(p.color * Math.PI) * 0.5 + 0.5,
                Math.cos(p.color * Math.PI * 2) * 0.5 + 0.5,
                Math.sin(p.color * Math.PI * 3) * 0.5 + 0.5,
              ])
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          color={0x64b5f6}
        />
      </points>

      {/* Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          wireframe
          color={0x2196f3}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Glow Ring */}
      <mesh rotation={[Math.PI * 0.15, 0, Math.PI * 0.2]}>
        <torusGeometry args={[1.2, 0.02, 8, 100]} />
        <meshBasicMaterial
          color={0x00bcd4}
          emissive={0x00bcd4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Additional Ring */}
      <mesh rotation={[0, 0, Math.PI * 0.3]}>
        <torusGeometry args={[1.15, 0.015, 8, 100]} />
        <meshBasicMaterial
          color={0x64b5f6}
          emissive={0x64b5f6}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// Main Particle Globe Scene
export function ParticleGlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color={0x64b5f6} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color={0x2196f3} />
      
      <ParticleGlobe />

      {/* Background fog effect */}
      <fog attach="fog" args={['#000000', 2, 8]} />
    </Canvas>
  );
}

export default ParticleGlobeScene;