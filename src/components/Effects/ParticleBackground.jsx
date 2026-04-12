import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField(props) {
  const ref = useRef();
  const positions = new Float32Array(5000 * 3);
  
  for (let i = 0; i < 5000; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.00005;
      ref.current.rotation.y -= 0.0001;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} {...props}>
      <PointMaterial
        transparent
        color="#64b5f6"
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export function ParticleBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 1200] }} style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <ParticleField />
    </Canvas>
  );
}

export default ParticleBackground;