'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useExperience } from './ExperienceShell';

const letterBody = [
  'Happiest birthday to the most precious person in my life. The day you were born is not just special for your family, it is special for me too — because my universe got its center.',
  'You are my princess, my panda, my best friend, and my peace. When you are around, even ordinary moments become beautiful memories.',
  'I still smile thinking about our little moments — the random talks, silly jokes, emotional days, tight hugs, and those times we fought and still came back stronger.',
  'You made me feel loved in a way I never imagined. You made me feel worthy, understood, and safe. That is why I say you are not just my love, you are my home.',
  'I admire your heart so much — your care for family, your softness, your honesty, your loyalty, and your strength even on difficult days. Your character is the most beautiful thing about you.',
  'Whatever life gives us — happy days or hard days — I promise to stand with you, talk with you, solve with you, and choose you every single time.',
  'I dream of all our tomorrows thangam: laughing together, seducing you , building a family, having kids making memories, growing old side by side, and still teasing each other like kids.',
  "You gave me everything thangam , literally everything you know what all are they , coz its personal can't say here , will say you today and do the same personal things today",
  'If this life gives me one forever wish, it is only this: let me love you completely, protect your smile, and keep proving through actions that you are my everything.',
  'Thank you for being my light, my comfort, and my once-in-a-lifetime love.',
  'In this life, next life, and every life — it is always you.',
];

export default function LetterModal() {
  const { letterOpen, setLetterOpen } = useExperience();

  return (
    <AnimatePresence>
      {letterOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/75 px-4 py-6 backdrop-blur-xl md:px-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,163,183,.22),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(185,167,255,.22),transparent_38%),radial-gradient(circle_at_50%_95%,rgba(245,199,126,.18),transparent_40%)]" />
          <button
            aria-label="Close letter"
            className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,.12)] backdrop-blur-xl transition hover:scale-105 hover:bg-white/20 md:right-6 md:top-6"
            onClick={() => setLetterOpen(false)}
            type="button"
          >
            <X size={18} />
          </button>
          <motion.div
            className="letter-stage relative w-full max-w-3xl"
            exit={{ scale: 0.92, y: 48, opacity: 0 }}
            initial={{ scale: 0.86, y: 64, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.article
              className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-gradient-to-b from-[#fff8ec] via-[#fff2dd] to-[#f8e9cf] text-[#3d2631] shadow-[0_40px_160px_rgba(0,0,0,.55)]"
              initial={{ y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pointer-events-none absolute inset-0 paper-texture opacity-80" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent" />
              <div className="relative z-10 max-h-[82vh] overflow-y-auto px-6 pb-8 pt-7 md:max-h-[78vh] md:px-10 md:pb-10 md:pt-9">
                <div className="mb-6 border-b border-[#8b6a4d]/25 pb-5">
                  <div className="grid gap-3 text-[11px] uppercase tracking-[0.26em] text-[#7e5a3e]/85 md:grid-cols-2">
                    <p>From: Yours Always</p>
                    <p className="md:text-right">Date: 04 May 2026</p>
                    <p>To: My Pondatti</p>
                    <p className="md:text-right">Place: In Love With You</p>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-script text-5xl text-[#8d425d] md:text-6xl">Oiii pondatti,</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#7e5a3e]/80">subject: my birthday promise to you</p>
                    </div>
                    <div className="mt-1 rounded-full border border-[#8b6a4d]/30 bg-white/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#7e5a3e]">
                      personal letter
                    </div>
                  </div>
                </div>

                <div className="space-y-5 font-serif text-lg leading-8 text-[#3d2631]/95 md:text-[1.38rem] md:leading-10">
                  {letterBody.map((line, index) => (
                    <motion.p
                      key={line}
                      className="indent-6 md:indent-10"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + index * 0.12, duration: 0.5, ease: 'easeOut' }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <div className="mt-8 border-t border-[#8b6a4d]/20 pt-6">
                  <motion.p
                    className="text-right text-sm uppercase tracking-[0.22em] text-[#7e5a3e]/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.35, duration: 0.8 }}
                  >
                    With all my love,
                  </motion.p>
                  <motion.p
                    className="mt-2 text-right font-script text-4xl text-[#8d425d] md:text-5xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    always yours, mental ❤️
                  </motion.p>
                </div>
              </div>
            </motion.article>

            <motion.div
              className="pointer-events-none absolute -bottom-6 left-1/2 h-14 w-48 -translate-x-1/2 rounded-full bg-rose/25 blur-2xl"
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.08, 0.9] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
