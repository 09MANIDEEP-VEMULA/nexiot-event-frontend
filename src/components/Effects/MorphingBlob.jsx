import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

// Morphing Blob Component
function MorphingBlob() {
  const meshRef = useRef();
  const noiseRef = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;

      // Update distortion
      noiseRef.current += 0.01;
      if (meshRef.current.material) {
        meshRef.current.material.distort = 
          0.5 + Math.sin(noiseRef.current) * 0.3;
      }
    }
  });

  return (
    <group>
      {/* Main Morphing Blob */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 6]} />
        <MeshDistortMaterial
          color="#64b5f6"
          emissive="#1e88e5"
          distort={0.5}
          speed={3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Secondary Blob */}
      <mesh position={[0, 0, 0]} scale={1.3} opacity={0.3}>
        <icosahedronGeometry args={[1.5, 5]} />
        <MeshDistortMaterial
          color="#00bcd4"
          emissive="#0097a7"
          distort={0.3}
          speed={2}
          roughness={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Tertiary Blob for layering */}
      <mesh position={[0, 0, 0]} scale={0.8} opacity={0.5}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#1976d2"
          emissive="#0d47a1"
          distort={0.4}
          speed={1.5}
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Light sources */}
      <pointLight position={[5, 5, 5]} intensity={1} color={0x64b5f6} />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color={0x00bcd4} />
      <pointLight position={[0, 0, -10]} intensity={0.6} color={0x2196f3} />
    </group>
  );
}

// Main Scene
export function MorphingBlobScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 70 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <MorphingBlob />
      <fog attach="fog" args={['#000000', 0, 10]} />
    </Canvas>
  );
}

export default MorphingBlobScene;