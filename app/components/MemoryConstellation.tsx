'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cards = [
  {
    title: 'Tiny Adventures',
    label: '01',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=90',
  },
  {
    title: 'Laughing Like Kids',
    label: '02',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=90',
  },
  {
    title: 'Soft Evenings',
    label: '03',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=90',
  },
];

export default function MemoryConstellation() {
  return (
    <section className="relative z-10 overflow-hidden bg-[linear-gradient(180deg,#0B0B0F,#101827,#0B0B0F)] px-5 py-28 md:px-12">
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-lavender/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 1 }}>
          <p className="font-script text-5xl text-rose md:text-7xl">touch the memories</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-7xl">A constellation of little things I never want to lose</h2>
        </motion.div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              className="group relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-[0_30px_100px_rgba(0,0,0,.42)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -2 : 2 }}
              key={card.title}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -14, rotate: 0, scale: 1.025 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Image alt={card.title} className="object-cover transition duration-700 group-hover:scale-110" fill sizes="(min-width: 768px) 33vw, 100vw" src={card.image} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="mb-3 text-xs uppercase tracking-[0.5em] text-ember">memory {card.label}</p>
                <h3 className="font-serif text-3xl text-white md:text-4xl">{card.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
