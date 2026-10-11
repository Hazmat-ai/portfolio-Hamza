"use client";
import { useEffect, useRef } from "react";

export type SignalVariant = "eeg" | "network" | "circuit" | "default";
const paths: Record<SignalVariant, string> = {
  eeg: "M8 28H42L52 23L60 34L68 10L78 46L88 28H112L122 22L130 35L140 13L151 42L160 28H232",
  network:
    "M8 28H70Q80 28 80 18V14Q80 8 88 8H152Q160 8 160 16V20Q160 28 170 28H232",
  circuit: "M8 28H64V10H118V44H176V28H232",
  default: "M8 28H232",
};
const variants: Record<string, SignalVariant> = {
  "tcp-converter": "network",
  "jetson-nano-robot": "circuit",
  "arm-cortex-simulator": "circuit",
  "vex-robotics": "circuit",
};
/** Decorative signature, never a measured signal or a hardware schematic. */
export function SignalLine({ projectId }: { projectId: string }) {
  const root = useRef<SVGSVGElement>(null);
  const variant = variants[projectId] ?? "default";
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const context = gsap.context(() => {
          mm.add(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            () => {
              const path =
                root.current?.querySelector<SVGPathElement>(".signal-path");
              if (!path) return;
              const length = path.getTotalLength();
              gsap.fromTo(
                path,
                { strokeDasharray: length, strokeDashoffset: length },
                {
                  strokeDashoffset: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: root.current,
                    start: "top 95%",
                    end: "top 65%",
                    scrub: 0.5,
                  },
                },
              );
            },
          );
        }, root);
        cleanup = () => {
          mm.revert();
          context.revert();
        };
      },
    );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return (
    <svg
      ref={root}
      className="signal-line"
      data-signal-variant={variant}
      viewBox="0 0 240 56"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="signal-path"
        d={paths[variant]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="232" cy="28" r="3" fill="currentColor" />
      {variant === "network" && (
        <>
          <circle cx="48" cy="28" r="2" fill="currentColor" />
          <circle cx="120" cy="8" r="2" fill="currentColor" />
        </>
      )}
      {variant === "circuit" && (
        <circle
          cx="8"
          cy="28"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}
