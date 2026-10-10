"use client";
import { useEffect } from "react";

/** A bounded matched-image handoff; original accessible images stay in their sections. */
export function StudyMindHandoff() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add(
          "(min-width: 1024px) and (min-height: 750px) and (prefers-reduced-motion: no-preference)",
          () => {
            const source = document.querySelector<HTMLElement>(
              ".expansion-device .project-image",
            );
            const target = document.querySelector<HTMLElement>(
              "#studymind-story .story-gallery",
            );
            if (!source || !target) return;
            const tile = source.cloneNode(true) as HTMLElement;
            tile.removeAttribute("data-transition-id");
            tile.removeAttribute("data-project-visual");
            tile.setAttribute("aria-hidden", "true");
            tile.classList.add("study-handoff");
            document.body.appendChild(tile);
            let baseWidth = source.offsetWidth;
            let baseHeight = source.offsetHeight;
            const size = () => {
              baseWidth = source.offsetWidth;
              baseHeight = source.offsetHeight;
              tile.style.width = `${baseWidth}px`;
              tile.style.height = `${baseHeight}px`;
            };
            size();
            const paint = (progress: number) => {
              const active = progress > 0.001 && progress < 0.999;
              tile.style.visibility = active ? "visible" : "hidden";
              source.style.opacity = active ? "0" : "";
              target.style.opacity = active ? "0" : "";
              if (!active) return;
              const from = source.getBoundingClientRect();
              const to = target.getBoundingClientRect();
              const mix = gsap.utils.interpolate;
              const width = mix(from.width, to.width, progress);
              const height = mix(from.height, to.height, progress);
              // Geometry reads are grouped; one transform moves the photographic tile.
              tile.style.width = `${from.width}px`;
              tile.style.height = `${from.height}px`;
              gsap.set(tile, {
                x: mix(from.left, to.left, progress),
                y: mix(from.top, to.top, progress),
                scaleX: width / from.width,
                scaleY: height / from.height,
                borderRadius: mix(32, 24, progress),
              });
            };
            const trigger = ScrollTrigger.create({
              trigger: ".project-expansion",
              start: "bottom 90%",
              endTrigger: target,
              end: "top 40%",
              onUpdate: (self) => paint(self.progress),
              onRefresh: (self) => {
                size();
                paint(self.progress);
              },
            });
            paint(trigger.progress);
            return () => {
              trigger.kill();
              source.style.opacity = "";
              target.style.opacity = "";
              tile.remove();
            };
          },
        );
        cleanup = () => mm.revert();
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
  return null;
}
