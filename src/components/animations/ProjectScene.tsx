"use client";
import { useEffect, useRef, ViewTransition } from "react";

export function ProjectScene({
  children,
  slug,
  featured,
}: {
  children: React.ReactNode;
  slug: string;
  featured: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            const image = root.current!.querySelector(".project-image");
            if (!image) return;
            gsap.fromTo(
              image,
              { clipPath: "inset(0% 3% 0% 3% round 40px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 24px)",
                ease: "none",
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 85%",
                  end: "top 20%",
                  scrub: 0.5,
                },
              },
            );
            root
              .current!.closest(".project-detail")
              ?.querySelectorAll(".case-body section")
              .forEach((section) => {
                gsap.fromTo(
                  section,
                  { y: 16 },
                  {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                      trigger: section,
                      start: "top 90%",
                      end: "top 65%",
                      scrub: 0.4,
                    },
                  },
                );
              });
          });
          if (featured)
            mm.add(
              "(min-width: 1024px) and (min-height: 750px) and (prefers-reduced-motion: no-preference)",
              () => {
                ScrollTrigger.create({
                  trigger: root.current,
                  start: "top 110px",
                  end: () => `+=${Math.min(280, window.innerHeight * 0.28)}`,
                  pin: true,
                  invalidateOnRefresh: true,
                });
              },
            );
        }, root);
        const refresh = () => {
          if (!disposed) ScrollTrigger.refresh();
        };
        void document.fonts.ready.then(refresh);
        cleanup = () => {
          mm.revert();
          ctx.revert();
        };
      },
    );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [slug, featured]);
  return (
    <ViewTransition
      name={`case-media-${slug}`}
      enter="case-arrive"
      exit="case-depart"
      default="none"
    >
      <div className="detail-visual case-media" ref={root}>
        {children}
      </div>
    </ViewTransition>
  );
}
