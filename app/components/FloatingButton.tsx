'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useExperience } from './ExperienceShell';

export default function FloatingButton() {
  const { setLetterOpen } = useExperience();

  return (
    <motion.button
      aria-label="Open love letter"
      className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full border border-rose/30 bg-white/10 text-rose shadow-rose backdrop-blur-2xl"
      animate={{ boxShadow: ['0 0 30px rgba(245,163,183,.25)', '0 0 70px rgba(245,163,183,.45)', '0 0 30px rgba(245,163,183,.25)'] }}
      onClick={() => setLetterOpen(true)}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      type="button"
      whileHover={{ scale: 1.08, rotate: -4 }}
      whileTap={{ scale: 0.94 }}
    >
      <Mail size={24} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-rose/20" />
    </motion.button>
  );
}
