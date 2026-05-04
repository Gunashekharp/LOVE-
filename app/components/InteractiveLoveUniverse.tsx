'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Heart, Sparkles, Star, X } from 'lucide-react';
import { useState } from 'react';
import { useExperience } from './ExperienceShell';

const worlds = [
  {
    title: 'First Spark',
    text: 'The moment everything started feeling a little less random.',
    secret: 'This portal keeps the feeling of the first almost-smile, the one that made everything after it feel possible.',
    image: '/images/memory-blue-wall.jpg',
    color: 'from-cyan-400/30 to-fuchsia-400/30',
  },
  {
    title: 'Golden Calm',
    text: 'The days where time slowed down just enough for us to notice the magic.',
    secret: 'This one is for the peaceful days: simple light, easy laughter, and the kind of comfort that feels like home.',
    image: '/images/memory-flowers.jpg',
    color: 'from-amber-300/30 to-rose-400/30',
  },
  {
    title: 'Tiny Forever',
    text: 'Small jokes, soft looks, and details that became our private universe.',
    secret: 'Every tiny thing lives here: the jokes nobody else understands, the looks, the timing, the little forever moments.',
    image: '/images/memory-together.jpg',
    color: 'from-violet-400/30 to-blue-400/30',
  },
];

const notes = ['your laugh', 'our little jokes', 'quiet comfort', 'favorite days', 'soft chaos', 'home feeling'];
const sparkles = Array.from({ length: 26 }, (_, index) => ({
  left: `${6 + ((index * 17) % 88)}%`,
  top: `${8 + ((index * 23) % 84)}%`,
  delay: index * 0.16,
  size: 2 + (index % 3),
}));
const memoryShards = [
  {
    image: '/images/memory-blue-wall.jpg',
    left: '4%',
    top: '18%',
    rotate: -10,
    delay: 0,
    world: 0,
  },
  {
    image: '/images/memory-flowers.jpg',
    left: '78%',
    top: '14%',
    rotate: 8,
    delay: 0.8,
    world: 1,
  },
  {
    image: '/images/memory-together.jpg',
    left: '8%',
    top: '64%',
    rotate: 9,
    delay: 1.4,
    world: 2,
  },
  {
    image: '/images/memory-blue-wall.jpg',
    left: '82%',
    top: '58%',
    rotate: -12,
    delay: 2,
    world: 0,
  },
  {
    image: '/images/memory-flowers.jpg',
    left: '44%',
    top: '78%',
    rotate: 5,
    delay: 2.6,
    world: 1,
  },
];
const ribbonImages = [
  '/images/memory-blue-wall.jpg',
  '/images/memory-flowers.jpg',
  '/images/memory-together.jpg',
  '/images/memory-blue-wall.jpg',
  '/images/memory-flowers.jpg',
];
const universePlanets = [
  { size: 64, color: 'from-slate-100 via-slate-400 to-slate-950', left: '12%', top: '18%', duration: 6, delay: 0, ring: false, drift: 16, title: 'Her calm', message: 'When I think of your calm, it feels like the noisy parts of my world finally learn how to be gentle.', messageAlign: 'left', messageSide: 'bottom' },
  { size: 96, color: 'from-cyan-100 via-blue-500 to-indigo-950', left: '21%', top: '72%', duration: 7.2, delay: 0.5, ring: false, drift: -18, title: 'Her heart', message: 'Your heart feels like a place I never knew I was searching for, soft enough to rest in and strong enough to believe in.', messageAlign: 'left', messageSide: 'top' },
  { size: 78, color: 'from-rose-200 via-fuchsia-500 to-purple-950', left: '73%', top: '17%', duration: 6.8, delay: 1.1, ring: false, drift: 14, title: 'Her smile', message: 'Your smile does something quietly impossible to me; it turns an ordinary moment into something I want to remember.', messageAlign: 'right', messageSide: 'bottom' },
  { size: 118, color: 'from-violet-200 via-purple-600 to-slate-950', left: '76%', top: '68%', duration: 8, delay: 1.6, ring: true, drift: -20, title: 'Her soul', message: 'There is a universe in the way you care, and every time I notice it, I feel lucky to exist close to you.', messageAlign: 'right', messageSide: 'top' },
  { size: 54, color: 'from-amber-100 via-yellow-500 to-orange-900', left: '42%', top: '14%', duration: 5.6, delay: 2.1, ring: false, drift: 12, title: 'Her light', message: 'You shine without trying, and somehow that makes everything around me feel warmer, safer, and more alive.', messageAlign: 'center', messageSide: 'bottom' },
  { size: 86, color: 'from-emerald-100 via-teal-500 to-slate-950', left: '48%', top: '82%', duration: 7.8, delay: 2.6, ring: true, drift: -14, title: 'Her presence', message: 'When you are near, even silence feels full; like my heart understands something before I can put it into words.', messageAlign: 'center', messageSide: 'top' },
];
const meteors = Array.from({ length: 18 }, (_, index) => ({
  left: `${4 + ((index * 13) % 92)}%`,
  delay: index * 0.38,
  duration: 2.6 + (index % 5) * 0.42,
  length: 70 + (index % 4) * 26,
  drift: index % 2 === 0 ? 90 : -90,
}));

export default function InteractiveLoveUniverse() {
  const { setLetterOpen } = useExperience();
  const [activeWorld, setActiveWorld] = useState(0);
  const [energy, setEnergy] = useState(42);
  const [selectedNote, setSelectedNote] = useState('quiet comfort');
  const [showFinalMessage, setShowFinalMessage] = useState(true);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 24 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const active = worlds[activeWorld];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#050712] text-white touch-pan-y"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <motion.div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.28),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(244,114,182,.24),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,.25),transparent_30%),linear-gradient(180deg,#050712,#090a18_45%,#04040a)]" animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(18deg)', 'hue-rotate(0deg)'] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="pointer-events-none fixed inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,rgba(0,0,0,.58))]" />
      <div className="pointer-events-none fixed inset-0">
        {sparkles.map((sparkle) => (
          <motion.span
            className="absolute rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,.9)]"
            key={`${sparkle.left}-${sparkle.top}`}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.8, 0.8], y: [0, -18, 0] }}
            style={{ left: sparkle.left, top: sparkle.top, height: sparkle.size, width: sparkle.size }}
            transition={{ delay: sparkle.delay, duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="fixed inset-0 z-[1] overflow-hidden">
        {memoryShards.map((shard, index) => (
          <motion.button
            aria-label={`Activate floating memory ${index + 1}`}
            className="group absolute hidden h-32 w-24 overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-1 shadow-[0_25px_90px_rgba(0,0,0,.45)] backdrop-blur-xl md:block"
            key={`${shard.image}-${index}`}
            onClick={() => {
              setActiveWorld(shard.world);
              setEnergy((current) => Math.min(100, current + 10));
            }}
            style={{ left: shard.left, top: shard.top, rotate: shard.rotate }}
            type="button"
            animate={{ y: [0, -26, 0], x: [0, index % 2 === 0 ? 16 : -16, 0], rotate: [shard.rotate, shard.rotate + (index % 2 === 0 ? 5 : -5), shard.rotate] }}
            transition={{ delay: shard.delay, duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.18, rotate: 0, zIndex: 40 }}
            whileTap={{ scale: 0.94 }}
          >
            <Image alt="" className="rounded-[1.25rem] object-cover opacity-70 transition duration-500 group-hover:opacity-100 group-hover:scale-110" fill sizes="120px" src={shard.image} />
            <span className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/50 opacity-0 transition group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      <section className="relative z-10 grid min-h-screen place-items-center px-5 py-24">
        <motion.div className="absolute h-[620px] w-[620px] rounded-full border border-cyan-300/15 shadow-[0_0_120px_rgba(34,211,238,.16)]" animate={{ rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute h-[440px] w-[440px] rounded-full border border-rose/20 shadow-[0_0_120px_rgba(244,114,182,.16)]" animate={{ rotate: -360 }} transition={{ duration: 19, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="relative mx-auto max-w-6xl rounded-[3rem] border border-white/10 bg-white/[0.045] p-7 text-center shadow-[0_40px_180px_rgba(0,0,0,.55)] backdrop-blur-md md:p-12" style={{ rotateX, rotateY, transformPerspective: 1200 }}>
          <div className="absolute -inset-px -z-10 rounded-[3rem] bg-gradient-to-r from-cyan-300/25 via-rose/20 to-amber-200/25 blur-xl" />
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm uppercase tracking-[0.35em] text-cyan-100 shadow-[0_0_50px_rgba(34,211,238,.18)] backdrop-blur-2xl">
            <Sparkles size={16} /> interactive love universe
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 1.1 }} className="font-serif text-6xl leading-none tracking-tight text-white drop-shadow-[0_0_60px_rgba(34,211,238,.22)] md:text-9xl">
            Not a timeline.
            <span className="block bg-gradient-to-r from-cyan-200 via-rose to-amber-200 bg-clip-text text-transparent">A whole world.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/68 md:text-xl">
            Move your cursor, scroll through the portals, open the hidden letter, and let each memory feel alive.
          </motion.p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a href="#worlds" className="rounded-full bg-gradient-to-r from-cyan-100 via-white to-amber-100 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#070812] shadow-[0_0_55px_rgba(255,255,255,.22)]" whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }}>
              Explore
            </motion.a>
            <motion.button onClick={() => setLetterOpen(true)} className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm uppercase tracking-[0.28em] text-white shadow-[0_0_45px_rgba(244,114,182,.16)] backdrop-blur-xl" type="button" whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }}>
              Open letter
            </motion.button>
          </div>
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown />
        </motion.div>
      </section>

      <section className="relative z-10 overflow-hidden py-16">
        <motion.div className="flex w-max gap-5 px-5" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
          {[...ribbonImages, ...ribbonImages].map((image, index) => (
            <motion.button
              aria-label={`Open moving memory ${index + 1}`}
              className="group relative h-48 w-72 shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_20px_80px_rgba(0,0,0,.35)] backdrop-blur-xl md:h-64 md:w-96"
              key={`${image}-${index}`}
              onClick={() => {
                setActiveWorld(index % worlds.length);
                setEnergy((current) => Math.min(100, current + 6));
              }}
              type="button"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Image alt="" className="object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-100" fill sizes="400px" src={image} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl">tap memory</span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <section id="worlds" className="relative z-10 px-5 py-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-script text-5xl text-rose md:text-7xl">choose a portal</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-7xl">Every card reacts like a memory you can touch</h2>
            </div>
            <p className="max-w-sm text-white/55">Click a portal to change the active memory. Drag the heart crystal below to charge the page.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid gap-6 md:grid-cols-3">
            {worlds.map((world, index) => (
              <motion.button
                aria-pressed={activeWorld === index}
                onClick={() => {
                  setActiveWorld(index);
                  setEnergy((current) => Math.min(100, current + 14));
                }}
                key={world.title}
                className={`group relative h-[520px] overflow-hidden rounded-[2.5rem] border bg-white/[0.06] text-left shadow-[0_30px_120px_rgba(0,0,0,.5)] backdrop-blur-2xl transition ${activeWorld === index ? 'border-cyan-200/70 ring-2 ring-cyan-200/25 shadow-[0_0_90px_rgba(34,211,238,.22)]' : 'border-white/10'}`}
                initial={{ opacity: 0, y: 70 }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false, amount: 0.25 }}
                whileHover={{ y: -18, scale: 1.025 }}
                whileInView={{ opacity: 1, y: 0 }}
                type="button"
              >
                <Image alt={world.title} className="object-cover transition duration-700 group-hover:scale-110" fill sizes="(min-width: 768px) 33vw, 100vw" src={world.image} />
                <div className={`absolute inset-0 bg-gradient-to-t ${world.color} opacity-70 mix-blend-screen`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,.22),transparent_35%)]" />
                <div className="absolute left-6 top-6 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">0{index + 1}</div>
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="font-serif text-4xl text-white md:text-5xl">{world.title}</h3>
                  <p className="mt-4 text-white/68">{world.text}</p>
                </div>
              </motion.button>
            ))}
            </div>
            <motion.aside
              className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.08] p-7 shadow-[0_30px_140px_rgba(0,0,0,.58)] backdrop-blur-2xl md:p-9"
              key={active.title}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 opacity-35">
                <Image alt={active.title} className="object-cover" fill sizes="50vw" src={active.image} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050712] via-[#050712]/80 to-[#050712]/35" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-cyan-100">active portal</p>
                  <h3 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">{active.title}</h3>
                  <p className="mt-6 text-lg leading-9 text-white/72">{active.secret}</p>
                </div>
                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                    <span>love charge</span>
                    <span>{energy}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-rose to-amber-200" animate={{ width: `${energy}%` }} />
                  </div>
                  <motion.div
                    className="mx-auto mt-10 grid h-28 w-28 cursor-grab place-items-center rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/20 to-white/5 text-rose shadow-[0_0_90px_rgba(244,114,182,.42)] backdrop-blur-xl active:cursor-grabbing"
                    drag
                    dragConstraints={{ left: -80, right: 80, top: -50, bottom: 50 }}
                    dragElastic={0.28}
                    onDragEnd={() => setEnergy((current) => Math.min(100, current + 8))}
                    whileDrag={{ scale: 1.15, rotate: 8 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Heart fill="currentColor" size={42} />
                  </motion.div>
                  <p className="mt-5 text-center text-sm text-white/50">Drag the heart crystal to charge the memory.</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-28 md:px-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.07] p-8 shadow-[0_30px_140px_rgba(0,0,0,.45)] backdrop-blur-2xl md:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-script text-5xl text-rose md:text-7xl">little gravity</p>
              <h2 className="mt-4 font-serif text-4xl md:text-7xl">Things that keep pulling me back to you</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {notes.map((note, index) => (
                <motion.button key={note} onClick={() => setSelectedNote(note)} className={`rounded-full border px-5 py-3 backdrop-blur-xl transition ${selectedNote === note ? 'border-rose/60 bg-rose/20 text-white' : 'border-white/10 bg-white/10 text-white/75'}`} initial={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.08 }} type="button" viewport={{ once: false }} whileHover={{ scale: 1.08, y: -4, color: '#fff' }} whileInView={{ opacity: 1, scale: 1 }}>
                  {note}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.div className="mt-8 rounded-[2rem] border border-white/10 bg-black/20 p-6 text-xl text-white/75" key={selectedNote} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            Today&apos;s gravity: <span className="text-rose">{selectedNote}</span>
          </motion.div>
        </div>
      </section>

      <section className="relative z-30 grid min-h-screen place-items-center overflow-hidden bg-black px-5 py-24 text-center">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,.9)_1px,transparent_1.5px)] [background-size:42px_42px]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,.7)_1px,transparent_1.5px)] [background-size:91px_91px]" />
        <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,.12),transparent_20%),radial-gradient(circle_at_52%_55%,rgba(244,114,182,.1),transparent_28%),linear-gradient(180deg,#000,#02030a_48%,#000)]" animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <motion.button
          aria-label="Reveal what your love feels like"
          className="group absolute left-1/2 top-[48%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff7c2,#facc15_35%,#f97316_68%,#7c2d12_100%)] text-left shadow-[0_0_100px_rgba(250,204,21,.75),0_0_220px_rgba(249,115,22,.5),0_0_360px_rgba(249,115,22,.22)] outline-none touch-pan-y"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0], filter: ['brightness(1)', 'brightness(1.35)', 'brightness(1)'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          type="button"
          whileHover={{ scale: 1.15, zIndex: 46 }}
          whileFocus={{ scale: 1.15, zIndex: 46 }}
        >
          <div className="absolute inset-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.45),transparent_20%),radial-gradient(circle_at_70%_62%,rgba(124,45,18,.35),transparent_22%)]" />
          <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 w-64 -translate-x-1/2 rounded-[1.5rem] border border-amber-200/30 bg-[#120d08]/90 p-4 text-center opacity-0 shadow-[0_30px_90px_rgba(250,204,21,.25)] backdrop-blur-2xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 md:w-72 md:p-5">
            <span className="mb-3 block font-script text-4xl text-amber-200">Her Sun</span>
            <span className="block text-sm leading-7 text-white/80">If every feeling in me had one center, it would still be you; the warmth I return to, the light I believe in, the reason my world keeps glowing.</span>
          </span>
        </motion.button>
        {universePlanets.map((planet, index) => (
          <motion.button
            aria-label={`Reveal what ${planet.title.toLowerCase()} means`}
            className={`group absolute rounded-full bg-gradient-to-br ${planet.color} text-left shadow-[inset_-18px_-16px_34px_rgba(0,0,0,.65),0_0_60px_rgba(255,255,255,.22)] outline-none touch-pan-y`}
            key={`${planet.left}-${planet.top}`}
            style={{ height: planet.size, left: planet.left, top: planet.top, width: planet.size }}
            animate={{ x: [0, planet.drift, 0], y: [0, index % 2 === 0 ? -14 : 14, 0], rotate: [0, 10, 0], scale: [1, 1.08, 1] }}
            transition={{ delay: planet.delay, duration: planet.duration, repeat: Infinity, ease: 'easeInOut' }}
            type="button"
            whileHover={{ scale: 1.2, zIndex: 45 }}
            whileFocus={{ scale: 1.2, zIndex: 45 }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.52),transparent_18%),radial-gradient(circle_at_70%_72%,rgba(0,0,0,.42),transparent_34%)]" />
            <div className="absolute inset-x-3 top-1/3 h-px bg-white/20" />
            <div className="absolute inset-x-5 top-1/2 h-px bg-black/20" />
            {planet.ring ? <div className="absolute left-1/2 top-1/2 h-[38%] w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-full border border-white/30" /> : null}
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-[145%] w-[145%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100 group-focus:opacity-100" />
            <span className={`pointer-events-none absolute z-50 w-64 rounded-[1.5rem] border border-rose/30 bg-[#090812]/90 p-4 text-center opacity-0 shadow-[0_30px_90px_rgba(244,114,182,.28)] backdrop-blur-2xl transition duration-500 md:w-72 md:p-5 ${planet.messageSide === 'top' ? 'bottom-full mb-4 translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0' : 'top-full mt-4 -translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0'} ${planet.messageAlign === 'left' ? 'left-0' : planet.messageAlign === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'} group-hover:opacity-100 group-focus:opacity-100`}>
              <span className="mb-3 block font-script text-4xl text-rose">{planet.title}</span>
              <span className="block text-sm leading-7 text-white/78">{planet.message}</span>
            </span>
          </motion.button>
        ))}
        {meteors.map((meteor, index) => (
          <motion.div
            className="absolute -top-40 rounded-full bg-gradient-to-b from-white via-cyan-100/90 to-transparent shadow-[0_0_28px_rgba(255,255,255,.9)]"
            key={`${meteor.left}-${index}`}
            style={{ height: meteor.length, left: meteor.left, width: index % 3 === 0 ? 3 : 2 }}
            animate={{ x: [0, meteor.drift], y: ['-12vh', '125vh'], opacity: [0, 1, 0.75, 0] }}
            transition={{ delay: meteor.delay, duration: meteor.duration, repeat: Infinity, repeatDelay: 1.8, ease: 'easeIn' }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,1)]" />
          </motion.div>
        ))}
        {showFinalMessage ? (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 1 }} className="relative max-w-3xl rounded-[3.5rem] border border-white/15 bg-[#070814]/62 p-8 shadow-[0_50px_220px_rgba(0,0,0,.7)] backdrop-blur-xl md:p-12">
            <button aria-label="Close birthday message" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white" onClick={() => setShowFinalMessage(false)} type="button">
              <X size={18} />
            </button>
            <div className="absolute -inset-px -z-10 rounded-[3.5rem] bg-gradient-to-r from-cyan-300/30 via-rose/30 to-amber-200/25 blur-2xl" />
            <motion.div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full border border-white/20 bg-white/10 text-rose shadow-[0_0_90px_rgba(244,114,182,.45)] backdrop-blur-xl" animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
              <Heart fill="currentColor" size={48} />
            </motion.div>
            <p className="font-script text-6xl text-rose drop-shadow-[0_0_35px_rgba(244,114,182,.45)] md:text-8xl">happy birthday</p>
            <h2 className="mt-6 font-serif text-5xl leading-tight text-white drop-shadow-[0_0_70px_rgba(34,211,238,.28)] md:text-8xl">
              You&apos;re my universe.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-white/68 md:text-xl">
              Every star behind this page is just a small way of saying you make my world brighter, softer, and more beautiful.
            </p>
            <motion.button onClick={() => setLetterOpen(true)} className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-100 via-white to-rose-100 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#070812] shadow-[0_0_70px_rgba(255,255,255,.25)]" type="button" whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.96 }}>
              <Star size={17} /> read the final note
            </motion.button>
          </motion.div>
        ) : (
          <motion.button className="rounded-full border border-white/20 bg-white/10 px-7 py-4 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-xl" onClick={() => setShowFinalMessage(true)} type="button" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
            show birthday message
          </motion.button>
        )}
      </section>
    </div>
  );
}
