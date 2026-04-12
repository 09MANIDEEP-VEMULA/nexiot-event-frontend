import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Interactive Network/Mesh Component
function InteractiveMesh() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Create nodes
    const nodeCount = 30;
    const nodes = [];
    const positions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const node = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
      };
      nodes.push(node);
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Apply velocity
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Bounce off walls
        if (Math.abs(node.x) > 4) node.vx *= -1;
        if (Math.abs(node.y) > 4) node.vy *= -1;
        if (Math.abs(node.z) > 4) node.vz *= -1;

        // Attract to mouse
        const attractForce = 0.0001;
        const dist = Math.sqrt(
          (node.x - mouse.current.x * 4) ** 2 +
          (node.y - mouse.current.y * 4) ** 2
        );

        if (dist < 3) {
          node.vx += (mouse.current.x * 4 - node.x) * attractForce;
          node.vy += (mouse.current.y * 4 - node.y) * attractForce;
        }

        positions[i * 3] = node.x;
        positions[i * 3 + 1] = node.y;
        positions[i * 3 + 2] = node.z;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      // Update lines
      const linePositions = [];
      const maxDistance = 2.5;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
            linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }

      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    };

    const interval = setInterval(animate, 16);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <group>
      {/* Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={30}
            array={new Float32Array(90)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0x64b5f6}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={0}
            array={new Float32Array(0)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={0x2196f3}
          transparent
          opacity={0.3}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

// Main Component
export function InteractiveMeshScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      <InteractiveMesh />

      <fog attach="fog" args={['#000000', 5, 15]} />
    </Canvas>
  );
}

export default InteractiveMeshScene;