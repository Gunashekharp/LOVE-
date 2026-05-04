'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef } from 'react';

export default function Ending() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section ref={ref} className="relative z-10 grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(245,163,183,.18),transparent_32%),linear-gradient(180deg,#0B0B0F,#14101f,#0B0B0F)] px-6 text-center">
      <div className="absolute inset-0 opacity-50">
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.span
            className="absolute text-rose/35"
            key={index}
            animate={{ y: [-20, -180], opacity: [0, 0.8, 0], scale: [0.7, 1, 0.8] }}
            transition={{ delay: index * 0.24, duration: 5 + (index % 4), repeat: Infinity, ease: 'easeInOut' }}
            style={{ left: `${8 + ((index * 11) % 84)}%`, bottom: `${(index * 9) % 28}%` }}
          >
            <Heart size={12 + (index % 4) * 4} />
          </motion.span>
        ))}
      </div>
      <motion.div style={{ opacity, scale }}>
        <p className="font-script text-5xl text-rose md:text-7xl">always becoming</p>
        <h2 className="mt-6 font-serif text-5xl leading-tight text-white drop-shadow-[0_0_45px_rgba(245,199,126,.24)] md:text-8xl">And this is just the beginning...</h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/64">Whatever comes next, may it find us kinder, closer, and still choosing the magic we found in each other.</p>
      </motion.div>
    </section>
  );
}
