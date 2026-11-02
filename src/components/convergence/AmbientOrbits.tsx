"use client";
import { useEffect, useRef } from "react";
import { OrbitArtwork } from "./OrbitArtwork";
export function AmbientOrbits() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const blue = root.querySelector("#orbitBlue"),
      red = root.querySelector("#orbitRed");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const render = () => {
      frame = 0;
      const progress = Math.min(
        1,
        Math.max(0, scrollY / Math.max(1, innerHeight * 0.65)),
      );
      const mobile = innerWidth < 581;
      root.style.opacity = String(
        (mobile ? 0.45 : 0.8) * (1 - progress) +
          (mobile ? 0.24 : 0.36) * progress,
      );
      root.style.setProperty(
        "--orbit-drift",
        `${motion.matches ? 0 : Math.sin(scrollY * 0.0008) * 40}px`,
      );
      const phase = Math.PI + (motion.matches ? 0 : scrollY * 0.0045),
        tilt = (-23 * Math.PI) / 180;
      for (const [node, angle] of [
        [blue, phase],
        [red, phase + Math.PI],
      ] as const) {
        const x = 225 * Math.cos(angle),
          y = 72 * Math.sin(angle);
        node?.setAttribute(
          "transform",
          `translate(${260 + x * Math.cos(tilt) - y * Math.sin(tilt)} ${160 + x * Math.sin(tilt) + y * Math.cos(tilt)}) scale(${1 + Math.sin(angle) * 0.14})`,
        );
      }
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    motion.addEventListener("change", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      motion.removeEventListener("change", request);
    };
  }, []);
  return (
    <div ref={ref} id="ambientOrbits" aria-hidden="true">
      <OrbitArtwork />
    </div>
  );
}
