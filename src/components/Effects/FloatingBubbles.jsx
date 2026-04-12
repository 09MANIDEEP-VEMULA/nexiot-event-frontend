
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate random bubbles
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 100 + 20,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: Math.random() * 20 + 20,
        color: [
          'rgba(100, 181, 246, 0.5)',
          'rgba(33, 150, 243, 0.5)',
          'rgba(0, 188, 212, 0.5)',
          'rgba(100, 181, 246, 0.4)',
        ][Math.floor(Math.random() * 4)],
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full backdrop-blur-md border border-cyan-300/30"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            background: bubble.color,
            boxShadow: `0 0 ${bubble.size * 0.5}px ${bubble.color}`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(bubble.left) * 50],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;