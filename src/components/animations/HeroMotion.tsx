"use client";
import { useEffect, useRef } from "react";
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    const initialHash = window.location.hash;
    let userScrolled = false;
    const markUserScroll = () => {
      userScrolled = true;
    };
    window.addEventListener("wheel", markUserScroll, {
      passive: true,
      once: true,
    });
    window.addEventListener("touchstart", markUserScroll, {
      passive: true,
      once: true,
    });
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const context = gsap.context(() => {
          mm.add(
            "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            () => {
              gsap.to(".launch-hero-title", {
                scale: 0.97,
                y: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: root.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.2,
                },
              });
            },
          );
        }, root);
        void document.fonts.ready.then(() => {
          requestAnimationFrame(() => {
            if (disposed) return;
            ScrollTrigger.refresh();
            window.dispatchEvent(new Event("portfolio:layout-ready"));
            if (
              !userScrolled &&
              !document.documentElement.dataset.projectReturn &&
              initialHash &&
              window.location.hash === initialHash
            ) {
              try {
                document
                  .getElementById(decodeURIComponent(initialHash.slice(1)))
                  ?.scrollIntoView({ block: "start", behavior: "instant" });
              } catch {
                /* Ignore malformed hashes. */
              }
            }
          });
        });
        cleanup = () => {
          mm.revert();
          context.revert();
        };
      },
    );
    return () => {
      disposed = true;
      window.removeEventListener("wheel", markUserScroll);
      window.removeEventListener("touchstart", markUserScroll);
      cleanup?.();
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
