"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectImage } from "@/components/ui/ProjectImage";
export function ProjectRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current || !track.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
          mm.add(
            "(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
            () => {
              const distance = () =>
                Math.max(
                  0,
                  track.current!.scrollWidth - root.current!.clientWidth,
                );
              gsap.to(track.current, {
                x: () => -distance(),
                ease: "none",
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 90px",
                  end: () => `+=${distance()}`,
                  pin: true,
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              });
              const focus = (e: FocusEvent) => {
                const card = (e.target as HTMLElement).closest<HTMLElement>(
                  ".rail-card",
                );
                const trigger = ScrollTrigger.getAll().find(
                  (t) => t.trigger === root.current,
                );
                if (card && trigger) {
                  window.scrollTo({
                    top: trigger.start + Math.min(distance(), card.offsetLeft),
                    behavior: "instant",
                  });
                }
              };
              root.current!.addEventListener("focusin", focus);
              return () => root.current?.removeEventListener("focusin", focus);
            },
          );
        }, root);
        cleanup = () => {
          mm.revert();
          ctx.revert();
        };
        void document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      },
    );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return (
    <section className="project-rail" ref={root} aria-labelledby="rail-heading">
      <div className="rail-heading">
        <h3 id="rail-heading">Follow the curiosity.</h3>
        <span className="rail-hint">Scroll to explore / 03 projects</span>
      </div>
      <div className="rail-track" ref={track}>
        {["studymind", "campaign-os", "asl-recognition"].map((slug) => {
          const p = projects.find((p) => p.slug === slug)!;
          return (
            <article className="rail-card" key={slug}>
              <Link
                href={`/projects/${slug}`}
                aria-label={`Explore ${p.title}`}
              >
                <ProjectImage slug={slug} title={p.title} featured />
                <div className="rail-caption">
                  <h4>{p.title}</h4>
                  <ArrowUpRight size={24} />
                </div>
              </Link>
              <p>{p.shortDescription}</p>
              <span className="mono">{p.category}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
