'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useExperience } from './ExperienceShell';

export default function PhotoModal() {
  const { photo, closePhoto } = useExperience();

  useEffect(() => {
    if (!photo) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closePhoto, photo]);

  return (
    <AnimatePresence>
      {photo ? (
        <motion.div
          aria-modal="true"
          className="fixed inset-0 z-[95] grid place-items-center bg-black/80 px-4 py-6 backdrop-blur-xl md:px-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closePhoto}
          role="dialog"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,163,183,.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(185,167,255,.18),transparent_38%),radial-gradient(circle_at_50%_95%,rgba(245,199,126,.14),transparent_40%)]" />

          <motion.div
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#060611] shadow-[0_40px_160px_rgba(0,0,0,.75)]"
            exit={{ scale: 0.94, y: 28, opacity: 0 }}
            initial={{ scale: 0.9, y: 36, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close photo"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,.12)] backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
              onClick={closePhoto}
              type="button"
            >
              <X size={18} />
            </button>

            <div className="grid max-h-[88vh] md:grid-cols-[1.15fr_.85fr]">
              <div className="relative min-h-[52vh] bg-black md:min-h-[88vh]">
                <Image alt={photo.alt} className="object-contain p-4 md:p-6" fill sizes="(min-width: 768px) 58vw, 100vw" src={photo.src} />
              </div>

              <div className="flex max-h-[88vh] flex-col justify-between gap-6 overflow-y-auto border-t border-white/10 bg-[linear-gradient(180deg,#11111c,#080810)] p-6 md:border-l md:border-t-0 md:p-8">
                <div>
                  {photo.eyebrow ? <p className="text-xs uppercase tracking-[0.45em] text-ember/80">{photo.eyebrow}</p> : null}
                  <h3 className="mt-4 font-serif text-4xl leading-tight text-white md:text-6xl">{photo.title ?? 'Memory photo'}</h3>
                  {photo.description ? <p className="mt-6 text-base leading-8 text-white/72 md:text-lg md:leading-9">{photo.description}</p> : null}
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/55">
                  Tap outside the photo or press <span className="text-white/80">Esc</span> to close it.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}