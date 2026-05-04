'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 6,
    size: 16 + Math.random() * 20,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            top: '-30px',
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [heart.opacity, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            className="text-red-500/60"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
