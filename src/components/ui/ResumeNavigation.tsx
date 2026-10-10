"use client";
import { useEffect, useRef, useState } from "react";
const sections = ["Experience", "Education", "Skills", "Projects"];
export function ResumeNavigation() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("Experience");
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const track = () => {
      let next = "Experience";
      sections.forEach((s) => {
        const el = document.getElementById(`resume-${s.toLowerCase()}`);
        if (el && el.getBoundingClientRect().top < 210) next = s;
      });
      setActive(next);
      const content = document.querySelector<HTMLElement>(".resume-layout");
      if (content) {
        const top = content.getBoundingClientRect().top + window.scrollY;
        const distance = Math.max(
          1,
          content.offsetHeight - window.innerHeight + 160,
        );
        setProgress(
          Math.round(
            Math.min(1, Math.max(0, (window.scrollY - top + 160) / distance)) *
              100,
          ),
        );
      }
    };
    window.addEventListener("scroll", track, { passive: true });
    window.addEventListener("resize", track);
    track();
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            document
              .querySelectorAll<HTMLElement>(".resume-role")
              .forEach((row) => {
                ScrollTrigger.create({
                  trigger: row,
                  start: "top 55%",
                  end: "bottom 55%",
                  toggleClass: "is-current",
                });
                gsap.from(row, {
                  y: 18,
                  duration: 0.5,
                  scrollTrigger: {
                    trigger: row,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                });
              });
          });
        }, root);
        const main = document.querySelector(".resume-page");
        const refresh = () => {
          if (!disposed) {
            ScrollTrigger.refresh();
            track();
          }
        };
        main?.addEventListener("toggle", refresh, true);
        const observer = new ResizeObserver(refresh);
        const content = main?.querySelector(".resume-layout");
        if (content) observer.observe(content);
        void document.fonts.ready.then(refresh);
        cleanup = () => {
          main?.removeEventListener("toggle", refresh, true);
          observer.disconnect();
          mm.revert();
          ctx.revert();
        };
      },
    );
    return () => {
      disposed = true;
      window.removeEventListener("scroll", track);
      window.removeEventListener("resize", track);
      cleanup?.();
    };
  }, []);
  return (
    <aside className="resume-sidebar" ref={root} aria-label="Resume sections">
      <div className="resume-reading">
        <span>Career overview</span>
        <span aria-hidden="true">{progress}%</span>
        <progress
          max={100}
          value={progress}
          aria-label="Resume reading progress"
        />
      </div>
      {sections.map((s) => (
        <a
          key={s}
          href={`#resume-${s.toLowerCase()}`}
          aria-current={active === s ? "location" : undefined}
        >
          {s}
        </a>
      ))}
    </aside>
  );
}
