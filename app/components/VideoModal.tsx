'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useExperience } from './ExperienceShell';

const videoSrc = '/videos/forever-us.mp4';

export default function VideoModal() {
  const { videoOpen, setVideoOpen } = useExperience();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setVideoOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    videoRef.current?.play().catch(() => undefined);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [setVideoOpen, videoOpen]);

  return (
    <AnimatePresence>
      {videoOpen ? (
        <motion.div
          aria-modal="true"
          className="fixed inset-0 z-[90] grid place-items-center bg-black/80 px-4 py-6 backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setVideoOpen(false)}
          role="dialog"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,163,183,.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(185,167,255,.18),transparent_38%),radial-gradient(circle_at_50%_95%,rgba(245,199,126,.14),transparent_40%)]" />

          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#060611] shadow-[0_40px_160px_rgba(0,0,0,.75)]"
            exit={{ scale: 0.94, y: 28, opacity: 0 }}
            initial={{ scale: 0.9, y: 36, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close video"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,.12)] backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
              onClick={() => setVideoOpen(false)}
              type="button"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-video bg-black">
              <video ref={videoRef} className="h-full w-full object-cover" controls autoPlay playsInline preload="metadata">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="border-t border-white/10 px-5 py-4 text-center md:px-8">
              <p className="font-script text-3xl text-rose md:text-4xl">forever us</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/55">Replay this memory whenever you click the heart</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
