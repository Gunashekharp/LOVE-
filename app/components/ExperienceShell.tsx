'use client';

import Lenis from 'lenis';
import { Volume2, VolumeX } from 'lucide-react';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type ExperienceContextValue = {
  letterOpen: boolean;
  setLetterOpen: (open: boolean) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function useExperience() {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error('useExperience must be used within ExperienceShell');
  }

  return context;
}

export default function ExperienceShell({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  const value = useMemo(() => ({ letterOpen, setLetterOpen }), [letterOpen]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.18;

    if (musicOn) {
      audio.play().catch(() => setMusicOn(false));
    } else {
      audio.pause();
    }
  }, [musicOn]);

  return (
    <ExperienceContext.Provider value={value}>
      <main className="relative min-h-screen overflow-x-hidden bg-midnight text-white selection:bg-rose/30 selection:text-white">
        {children}
        <audio ref={audioRef} loop preload="none" src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=ambient-piano-logo-11137.mp3" />
        <button
          aria-label={musicOn ? 'Pause background music' : 'Play background music'}
          className="fixed left-5 top-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-glow backdrop-blur-xl transition hover:scale-105 hover:bg-white/15"
          onClick={() => setMusicOn((current) => !current)}
          type="button"
        >
          {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </main>
    </ExperienceContext.Provider>
  );
}
