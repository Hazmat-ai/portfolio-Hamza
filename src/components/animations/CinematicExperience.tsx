"use client";

import { useEffect, useRef } from "react";

/** Owns only homepage motion. MatchMedia/context revert all styles and triggers on unmount. */
export function CinematicExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            const hero = gsap.timeline({
              scrollTrigger: {
                trigger: ".launch-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
            hero
              .to(
                ".hero-device-scene",
                { y: -100, scale: 1.08, rotationX: 0, ease: "none" },
                0,
              )
              .to(
                ".launch-hero-title",
                { y: -65, scale: 0.94, ease: "none" },
                0,
              )
              .to(".hero-code-panel", { y: 50, rotation: -4, ease: "none" }, 0);
            gsap.from(".launch-hero-title .title-line", {
              yPercent: 105,
              duration: 1.1,
              stagger: 0.12,
              ease: "power3.out",
            });
            gsap.fromTo(
              ".expand-visual",
              { clipPath: "inset(0% 10% 0% 10% round 32px)", scale: 0.94 },
              {
                clipPath: "inset(0% 2% 0% 2% round 40px)",
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".project-expansion",
                  start: "top 80%",
                  end: "center 35%",
                  scrub: 0.55,
                },
              },
            );
            gsap.to(".expand-title", {
              y: -25,
              ease: "none",
              scrollTrigger: {
                trigger: ".project-expansion",
                start: "top 80%",
                end: "center 35%",
                scrub: 0.55,
              },
            });
            gsap.fromTo(
              ".expansion-device",
              { scale: 0.9, y: 45 },
              {
                scale: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: ".project-expansion",
                  start: "top bottom",
                  end: "bottom center",
                  scrub: 0.5,
                },
              },
            );
            gsap.utils
              .toArray<HTMLElement>("[data-scroll-heading]")
              .forEach((heading) => {
                gsap.fromTo(
                  heading.querySelectorAll(".word-reveal"),
                  { yPercent: 45 },
                  {
                    yPercent: 0,
                    ease: "none",
                    stagger: 0.09,
                    scrollTrigger: {
                      trigger: heading,
                      start: "top 90%",
                      end: "top 60%",
                      scrub: 0.5,
                    },
                  },
                );
              });
            gsap.fromTo(
              ".career-line-fill",
              { scaleY: 0 },
              {
                scaleY: 1,
                transformOrigin: "top",
                ease: "none",
                scrollTrigger: {
                  trigger: ".experience-timeline",
                  start: "top 65%",
                  end: "bottom 65%",
                  scrub: true,
                },
              },
            );
            gsap.fromTo(
              ".contact-content h2",
              { scale: 0.92, y: 25 },
              {
                scale: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: "#contact",
                  start: "top 85%",
                  end: "top 30%",
                  scrub: 0.5,
                },
              },
            );
          });
        }, root);
        // Delegate hover motion so filtering and changing galleries retain their interactions.
        mm.add(
          "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          () => {
            const scope = root.current;
            if (!scope) return;
            const handlers = new Map<
              HTMLElement,
              {
                target: Element;
                x: ReturnType<typeof gsap.quickTo>;
                y: ReturnType<typeof gsap.quickTo>;
              }
            >();
            let current: HTMLElement | null = null;
            const reset = () => {
              if (current) {
                const handler = handlers.get(current);
                handler?.x(0);
                handler?.y(0);
              }
              current = null;
            };
            const move = (event: PointerEvent) => {
              const element = (event.target as Element).closest<HTMLElement>(
                ".btn-primary, .btn-secondary, .project-visual-link",
              );
              if (!element || !scope.contains(element)) {
                reset();
                return;
              }
              if (current !== element) reset();
              current = element;
              const magnetic = !element.classList.contains(
                "project-visual-link",
              );
              const target = magnetic
                ? element
                : element.querySelector(".photo-layer")
                  ? null
                  : element.querySelector("img");
              if (!target) return;
              let handler = handlers.get(element);
              if (!handler || handler.target !== target) {
                handler?.x.tween.kill();
                handler?.y.tween.kill();
                handler = {
                  target,
                  x: gsap.quickTo(target, "x", {
                    duration: 0.45,
                    ease: "power3.out",
                  }),
                  y: gsap.quickTo(target, "y", {
                    duration: 0.45,
                    ease: "power3.out",
                  }),
                };
                handlers.set(element, handler);
              }
              const box = element.getBoundingClientRect();
              const intensity = magnetic ? 0.12 : 0.018;
              handler.x((event.clientX - box.left - box.width / 2) * intensity);
              handler.y((event.clientY - box.top - box.height / 2) * intensity);
            };
            scope.addEventListener("pointermove", move);
            scope.addEventListener("pointerleave", reset);
            return () => {
              scope.removeEventListener("pointermove", move);
              scope.removeEventListener("pointerleave", reset);
              handlers.forEach(({ target, x, y }) => {
                x.tween.kill();
                y.tween.kill();
                gsap.set(target, { clearProps: "transform" });
              });
              handlers.clear();
            };
          },
        );
        const refresh = () => {
          if (!disposed) ScrollTrigger.refresh();
        };
        // Browser hash scrolling can run before ScrollTrigger has measured its pin.
        // Align once after setup; never interfere with a user's wheel/touch input.
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
        void document.fonts.ready.then(() => {
          refresh();
          requestAnimationFrame(() => {
            if (!disposed)
              window.dispatchEvent(new Event("portfolio:layout-ready"));
            if (
              disposed ||
              userScrolled ||
              document.documentElement.dataset.projectReturn ||
              !initialHash ||
              window.location.hash !== initialHash
            )
              return;
            try {
              const target = document.getElementById(
                decodeURIComponent(initialHash.slice(1)),
              );
              if (target && root.current?.contains(target))
                target.scrollIntoView({ block: "start", behavior: "instant" });
            } catch {
              /* A malformed hash must not affect navigation. */
            }
          });
        });
        window.addEventListener("load", refresh, { once: true });
        const scope = root.current;
        scope?.addEventListener("toggle", refresh, true);
        requestAnimationFrame(refresh);
        revert = () => {
          window.removeEventListener("load", refresh);
          window.removeEventListener("wheel", markUserScroll);
          window.removeEventListener("touchstart", markUserScroll);
          scope?.removeEventListener("toggle", refresh, true);
          mm.revert();
          ctx.revert();
        };
      },
    );
    return () => {
      disposed = true;
      revert?.();
    };
  }, []);
  return (
    <div ref={root} className="cinematic-experience">
      {children}
    </div>
  );
}
