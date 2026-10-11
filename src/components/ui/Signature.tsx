"use client";
import { useEffect, useRef } from "react";
import { hamzaStrokes, rizviStrokes } from "@/data/signature";
import { BrandMark } from "@/components/ui/BrandLogo";

export function Signature({ full = false }: { full?: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (full || !svg.current) return;
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const paths = Array.from(
      svg.current.querySelectorAll<SVGPathElement>(".signature-stroke"),
    );
    let animations: Animation[] = [];
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const write = () => {
      if (!media.matches || document.hidden) return;
      animations.forEach((animation) => animation.cancel());
      animations = paths.map((path, index) =>
        path.animate(
          [
            { strokeDasharray: "1", strokeDashoffset: "1" },
            { strokeDasharray: "1", strokeDashoffset: "0" },
          ],
          {
            delay: hamzaStrokes[index].delay,
            duration: hamzaStrokes[index].duration,
            easing: "cubic-bezier(.35,.05,.45,1)",
            fill: "both",
          },
        ),
      );
    };
    const start = () => {
      stop();
      if (!media.matches || document.hidden) return;
      write();
      timer = setInterval(write, 20_000);
    };
    start();
    media.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    return () => {
      stop();
      media.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, [full]);

  const drawing = (
    <svg
      ref={svg}
      className="signature-svg"
      viewBox={full ? "0 0 565 155" : "0 0 350 155"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {hamzaStrokes.slice(0, full ? -1 : undefined).map((stroke, index) => {
        return (
          <path
            key={index}
            d={stroke.d}
            pathLength="1"
            className="signature-stroke"
          />
        );
      })}
      {full && (
        <>
          <g transform="translate(65 28) scale(1.5)" strokeWidth={2.65 / 1.5}>
            {rizviStrokes.slice(0, -1).map((d, index) => (
              <path key={`surname-${index}`} d={d} />
            ))}
          </g>
          <path d="M126 122 C227 118 418 119 526 113" />
        </>
      )}
    </svg>
  );
  if (full) return <span className="footer-signature">{drawing}</span>;
  return (
    <span className="navigation-signature">
      <span className="desktop-signature">{drawing}</span>
      <BrandMark className="compact-signature" />
    </span>
  );
}
