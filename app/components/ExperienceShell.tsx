'use client';

import Lenis from 'lenis';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type MemoryPhoto = {
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

type ExperienceContextValue = {
  letterOpen: boolean;
  setLetterOpen: (open: boolean) => void;
  videoOpen: boolean;
  setVideoOpen: (open: boolean) => void;
  photo: MemoryPhoto | null;
  openPhoto: (photo: MemoryPhoto) => void;
  closePhoto: () => void;
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
  const [videoOpen, setVideoOpen] = useState(false);
  const [photo, setPhoto] = useState<MemoryPhoto | null>(null);
  const [musicOn, setMusicOn] = useState(false);

  const openPhoto = useCallback((memoryPhoto: MemoryPhoto) => {
    setPhoto(memoryPhoto);
  }, []);

  const closePhoto = useCallback(() => {
    setPhoto(null);
  }, []);

  const value = useMemo(
    () => ({ letterOpen, setLetterOpen, videoOpen, setVideoOpen, photo, openPhoto, closePhoto }),
    [closePhoto, letterOpen, openPhoto, photo, videoOpen]
  );

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
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,163,183,.12),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(185,167,255,.12),transparent_26%),radial-gradient(circle_at_50%_82%,rgba(245,199,126,.1),transparent_30%),linear-gradient(180deg,rgba(5,7,18,.92),rgba(5,7,18,.72))]" />

          {[
            {
              src: '/images/Screenshot_20241209-000938.png',
              wrapper: 'left-[-4rem] top-24 h-72 w-56 rotate-[-8deg] md:h-[26rem] md:w-72',
              image: 'object-cover object-center',
            },
            {
              src: '/images/Screenshot_20241031-154212.png',
              wrapper: 'right-[-2.5rem] top-[18rem] h-80 w-56 rotate-[7deg] md:h-[30rem] md:w-72',
              image: 'object-cover object-top',
            },
            {
              src: '/images/Screenshot_20240718-153014.png',
              wrapper: 'left-1/2 bottom-[-7rem] h-72 w-56 -translate-x-1/2 rotate-[2deg] md:h-[30rem] md:w-80',
              image: 'object-cover object-center',
            },
          ].map((photo) => (
            <div
              className={`absolute overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,.35)] backdrop-blur-sm ${photo.wrapper}`}
              key={photo.src}
            >
              <Image alt="" fill className={photo.image} sizes="(max-width: 768px) 60vw, 24vw" src={photo.src} />
              <div className="absolute inset-0 bg-black/28" />
            </div>
          ))}

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,18,.15),rgba(5,7,18,.6))]" />
        </div>

        <div className="relative z-10">{children}</div>
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
