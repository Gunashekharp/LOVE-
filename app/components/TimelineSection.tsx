'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Moment } from '../data/moments';

const entranceVariants = [
  {
    hidden: { opacity: 0, y: 70, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, x: 70, rotate: 1.2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  {
    hidden: { opacity: 0, y: 46, rotateX: 10, scale: 0.98 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, x: -70, rotate: -1.2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
];

export default function TimelineSection({ moment, index }: { moment: Moment; index: number }) {
  const variant = entranceVariants[index % entranceVariants.length];
  const cardSide = moment.align === 'right' ? 'md:ml-auto' : moment.align === 'center' ? 'md:mx-auto' : '';

  return (
    <section className={`timeline-panel relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b ${moment.palette} px-5 py-24 md:px-12`}>
      <div className="scene-image cinematic-soft absolute inset-0 scale-110">
        <Image alt={moment.title} className="object-cover opacity-50" fill priority={index === 0} sizes="100vw" src={moment.image} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,.06),transparent_28%),linear-gradient(90deg,rgba(11,11,15,.94),rgba(11,11,15,.48),rgba(11,11,15,.88))]" />
      <div className="scene-curtain pointer-events-none absolute inset-0 bg-midnight/0" />
      <div className="scene-letterbox pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-black/70 md:h-14" />
      <div className="scene-letterbox pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-black/70 md:h-14" />
      <div className="scene-orb pointer-events-none absolute left-[15%] top-[28%] h-56 w-56 rounded-full bg-ember/10 blur-2xl" />
      <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-ember/30 to-transparent md:block" />
      <motion.article
        className={`scene-card cinematic-soft relative z-10 max-w-2xl rounded-[2rem] border border-white/12 bg-white/[0.075] p-7 shadow-glow backdrop-blur-2xl md:p-10 ${cardSide}`}
        initial="hidden"
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        variants={variant}
        viewport={{ once: false, amount: 0.48 }}
        whileInView="visible"
      >
        <motion.div className="scene-eyebrow mb-6 flex items-center gap-4" variants={{ hidden: { opacity: 0, x: -22 }, visible: { opacity: 1, x: 0 } }} transition={{ delay: 0.1, duration: 0.8 }}>
          <motion.span className="h-px w-14 bg-ember/70" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
          <p className="text-xs uppercase tracking-[0.45em] text-ember/90">{moment.eyebrow}</p>
        </motion.div>
        <motion.h2 className="scene-title font-serif text-4xl leading-tight text-white drop-shadow-[0_0_25px_rgba(245,199,126,.22)] md:text-7xl" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }} transition={{ delay: 0.2, duration: 0.9 }}>
          {moment.title}
        </motion.h2>
        <motion.p className="scene-copy mt-7 text-base leading-8 text-white/72 md:text-xl md:leading-10" variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }} transition={{ delay: 0.36, duration: 1 }}>
          {moment.body}
        </motion.p>
        <motion.div className="mt-8 h-20 rounded-full bg-gradient-to-r from-transparent via-white/12 to-transparent blur-xl" animate={{ opacity: [0.35, 0.7, 0.35], scaleX: [0.86, 1.05, 0.86] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.article>
    </section>
  );
}
