'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type ScrollSceneProps = {
  image?: string;
  title?: string;
  description?: string;
};

export default function ScrollScene({
  image = '/images/IMG_20250911_144243949.jpg',
  title = 'The moment my life changed',
  description = 'It started with one hello, then one smile, then one dream. Slowly you became my peace, my madness, and the only future I want.',
}: ScrollSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const visual = visualRef.current;
    const overlay = overlayRef.current;
    const titleElement = titleRef.current;
    const descriptionElement = descriptionRef.current;
    const glow = glowRef.current;

    if (!scene || !visual || !overlay || !titleElement || !descriptionElement || !glow) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(visual, {
        scale: 1,
        y: 0,
        rotate: 0,
        rotateY: 0,
        filter: 'blur(10px) brightness(0.62)',
        transformPerspective: 1200,
        transformOrigin: '50% 55%',
      });
      gsap.set([titleElement, descriptionElement], { autoAlpha: 0, y: 46 });
      gsap.set(glow, { autoAlpha: 0.18, scale: 0.72 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(visual, {
          scale: 1.4,
          y: -200,
          rotate: 5,
          rotateY: 10,
          filter: 'blur(0px) brightness(1)',
          ease: 'none',
        }, 0)
        .to(overlay, { opacity: 0.22, ease: 'none' }, 0.08)
        .to(glow, { autoAlpha: 0.65, scale: 1.22, y: -70, ease: 'none' }, 0.12)
        .to(titleElement, { autoAlpha: 1, y: 0, ease: 'power2.out' }, 0.18)
        .to(descriptionElement, { autoAlpha: 1, y: 0, ease: 'power2.out' }, 0.3)
        .to([titleElement, descriptionElement], { y: -34, ease: 'none' }, 0.58)
        .to(overlay, { opacity: 0.48, ease: 'none' }, 0.76);
    }, scene);

    return () => context.revert();
  }, []);

  return (
    <section ref={sceneRef} className="relative z-10 h-[350vh] bg-midnight">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(245,199,126,.14),transparent_30%),linear-gradient(180deg,#0B0B0F,#140d1b_45%,#0B0B0F)]" />
        <div ref={glowRef} className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-50">
          {Array.from({ length: 14 }).map((_, index) => (
            <span
              className="absolute h-1 w-1 rounded-full bg-ember/70 shadow-[0_0_18px_rgba(245,199,126,.75)]"
              key={index}
              style={{ left: `${8 + ((index * 13) % 84)}%`, top: `${12 + ((index * 17) % 76)}%` }}
            />
          ))}
        </div>
        <div className="relative h-[72vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_40px_140px_rgba(0,0,0,.6)] backdrop-blur-xl md:h-[78vh]">
          <div ref={visualRef} className="main-visual absolute inset-0 will-change-transform">
            <Image alt={title} className="object-cover" fill priority sizes="100vw" src={image} />
          </div>
          <div ref={overlayRef} className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,15,.92),rgba(11,11,15,.38),rgba(11,11,15,.78)),linear-gradient(180deg,rgba(11,11,15,.72),transparent_45%,rgba(11,11,15,.84))]" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="relative z-10 flex h-full items-end px-6 pb-12 md:px-14 md:pb-16">
            <div className="max-w-3xl">
              <p className="mb-5 font-script text-4xl text-rose md:text-6xl">from strangers to soulmates</p>
              <h1 ref={titleRef} className="title font-serif text-4xl leading-tight text-white drop-shadow-[0_0_40px_rgba(245,199,126,.28)] md:text-7xl">
                {title}
              </h1>
              <p ref={descriptionRef} className="description mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-xl md:leading-10">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
