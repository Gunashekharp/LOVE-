'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import TimelineSection from '../components/TimelineSection';
import { moments } from '../data/moments';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (reducedMotion || isMobile) {
      return;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-moment').forEach((moment) => {
        const panel = moment.querySelector('.timeline-panel');
        const image = moment.querySelector('.scene-image');
        const card = moment.querySelector('.scene-card');
        const curtain = moment.querySelector('.scene-curtain');
        const orb = moment.querySelector('.scene-orb');
        const accents = moment.querySelectorAll('.light-ray');

        if (!panel || !image || !card || !curtain || !orb) {
          return;
        }

        const scene = gsap.timeline({
          scrollTrigger: {
            trigger: moment,
            start: 'top top',
            end: '+=115%',
            scrub: 0.8,
            pin: panel,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scene
          .fromTo(image, { scale: 1.13, yPercent: -2 }, { scale: 1.02, yPercent: 2, ease: 'none' }, 0)
          .fromTo(card, { yPercent: 10, opacity: 0.25 }, { yPercent: -8, opacity: 1, ease: 'none' }, 0)
          .fromTo(curtain, { opacity: 0.45 }, { opacity: 0, ease: 'power1.out' }, 0)
          .to(curtain, { opacity: 0.42, ease: 'power1.in' }, 0.78)
          .fromTo(orb, { xPercent: -18, yPercent: 10, scale: 0.85, opacity: 0.2 }, { xPercent: 18, yPercent: -12, scale: 1.16, opacity: 0.46, ease: 'sine.inOut' }, 0);

        if (accents.length > 0) {
          scene.fromTo(accents, { opacity: 0, yPercent: 14, scale: 0.92 }, { opacity: 0.54, yPercent: -12, scale: 1.04, ease: 'sine.inOut', stagger: 0.08 }, 0.12);
        }
      });

      gsap.to('.timeline-progress-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative z-10">
      <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden h-44 w-px -translate-y-1/2 overflow-hidden rounded-full bg-white/15 md:block">
        <div className="timeline-progress-fill h-full w-full origin-top scale-y-0 bg-gradient-to-b from-ember via-rose to-lavender" />
      </div>
      {moments.map((moment, index) => (
        <div className="timeline-moment relative" key={moment.title}>
          <div className="light-ray pointer-events-none absolute left-[8%] top-24 z-20 h-44 w-20 rotate-12 rounded-full bg-ember/10 blur-2xl" />
          <div className="light-ray pointer-events-none absolute bottom-24 right-[12%] z-20 h-48 w-24 -rotate-12 rounded-full bg-rose/10 blur-2xl" />
          <TimelineSection index={index} moment={moment} />
        </div>
      ))}
    </div>
  );
}
