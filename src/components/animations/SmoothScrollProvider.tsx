'use client';

import { useEffect } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize Lenis on non-reduced-motion environments
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: import('lenis').default | null = null;
    let animationId: number;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      // Scroll progress bar
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      lenis.on('scroll', ({ progress }: { progress: number }) => {
        if (progressBar) {
          progressBar.style.transform = `scaleX(${progress})`;
        }
      });

      const raf = (time: number) => {
        lenis!.raf(time);
        animationId = requestAnimationFrame(raf);
      };
      animationId = requestAnimationFrame(raf);

      // Anchor link smooth scrolling
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis?.scrollTo(element as HTMLElement, { offset: -80, duration: 1.2 });
        }
      };

      document.addEventListener('click', handleAnchorClick);

      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    };

    let cleanup: (() => void) | undefined;
    initLenis().then((c) => { cleanup = c; });

    return () => {
      cancelAnimationFrame(animationId);
      lenis?.destroy();
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ transform: 'scaleX(0)' }} />
      </div>
      {children}
    </>
  );
}
