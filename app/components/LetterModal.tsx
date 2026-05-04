'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useExperience } from './ExperienceShell';

const letterLines = [
  'If I could keep one feeling forever,',
  'it would be the quiet certainty I feel with you.',
  'You turned ordinary days into places I want to return to.',
  'You made laughter softer, silence safer, and time more beautiful.',
  'Thank you for being my favorite chapter, my calm, my spark, and my home.',
];

export default function LetterModal() {
  const { letterOpen, setLetterOpen } = useExperience();

  return (
    <AnimatePresence>
      {letterOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/72 px-5 backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            aria-label="Close letter"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20"
            onClick={() => setLetterOpen(false)}
            type="button"
          >
            <X size={18} />
          </button>
          <motion.div
            className="letter-stage relative h-[620px] w-full max-w-[760px]"
            exit={{ scale: 0.86, y: 80, opacity: 0, rotateX: 18 }}
            initial={{ scale: 0.76, y: 100, opacity: 0, rotateX: 32 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute bottom-10 left-1/2 h-64 w-[92%] -translate-x-1/2 rounded-b-[2rem] rounded-t-md bg-gradient-to-br from-[#6b3247] via-[#381a2d] to-[#1b1020] shadow-2xl"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -14 }}
              exit={{ rotateX: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[264px] left-1/2 h-52 w-[92%] origin-bottom -translate-x-1/2 rounded-t-[2rem] bg-gradient-to-t from-[#7f3f58] to-[#d38aa3] shadow-rose"
              initial={{ rotateX: 0, zIndex: 30 }}
              animate={{ rotateX: -155, zIndex: 5 }}
              exit={{ rotateX: 0, zIndex: 30 }}
              transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.article
              className="paper-texture absolute left-1/2 top-10 w-[86%] -translate-x-1/2 rounded-[1.5rem] border border-[#8b6a4d]/25 bg-[#fff7e9] p-7 text-[#3d2631] shadow-2xl md:p-10"
              initial={{ y: 210, opacity: 0, rotate: -1.8 }}
              animate={{ y: 0, opacity: 1, rotate: -0.8 }}
              exit={{ y: 210, opacity: 0, rotate: -1.8 }}
              transition={{ delay: 0.85, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-script text-5xl text-[#8d425d] md:text-6xl">My love,</p>
              <div className="mt-7 space-y-5 font-serif text-xl leading-9 md:text-2xl md:leading-10">
                {letterLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 12, clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ delay: 1.2 + index * 0.32, duration: 0.8, ease: 'easeOut' }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <motion.p
                className="mt-9 text-right font-script text-4xl text-[#8d425d]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.1, duration: 1 }}
              >
                always, me
              </motion.p>
            </motion.article>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
