'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Intro() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.18], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  const begin = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 grid min-h-screen place-items-center overflow-hidden px-6">
      <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(185,167,255,.28),transparent_32%),linear-gradient(180deg,#0B0B0F_0%,#170d22_55%,#0B0B0F_100%)]" style={{ scale, opacity }} />
      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 36, filter: 'blur(18px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-6 font-script text-4xl text-rose md:text-6xl">Oiii pondatti 💖</p>
        <h1 className="font-serif text-5xl leading-tight text-white drop-shadow-[0_0_35px_rgba(245,199,126,.25)] md:text-8xl">Happiest Birthday, My Princess</h1>
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/68 md:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.1 }}
        >
          This whole universe is for you pa — my panda, my wife, my best decision, my calm, my chaos, my forever.
        </motion.p>
        <motion.button
          className="mt-12 rounded-full border border-white/20 bg-white/10 px-9 py-4 text-sm uppercase tracking-[0.35em] text-ember shadow-glow backdrop-blur-2xl transition hover:border-ember/60 hover:bg-ember/10"
          onClick={begin}
          type="button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          Start our story
        </motion.button>
      </motion.div>
    </section>
  );
}
