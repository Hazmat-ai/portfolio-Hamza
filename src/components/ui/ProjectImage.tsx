"use client";
import Image from "next/image";
import { projectVisual, type ProjectVisual } from "@/data/projectVisuals";
import { ViewTransition } from "react";
import { useIsPresent } from "motion/react";
import { useProjectNavigation } from "@/components/animations/ProjectTransitions";
import { projects } from "@/data/projects";
import { useEffect, useRef, useState, type CSSProperties } from "react";
export function ProjectImage({
  slug,
  title,
  featured = false,
  visual,
  transitionId,
  destination = false,
}: {
  slug: string;
  title: string;
  featured?: boolean;
  visual?: ProjectVisual;
  transitionId?: string;
  destination?: boolean;
}) {
  // AnimatePresence retains the outgoing image; only the current image may
  // own the shared route-transition name.
  const isPresent = useIsPresent();
  const { origin } = useProjectNavigation();
  const name = destination
    ? origin?.slug === slug
      ? origin.name
      : `project-${slug}-collection`
    : transitionId;
  const asset = visual ?? projectVisual(slug, title);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (asset.kind !== "photograph" || destination) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !frame.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
          mm.add(
            "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            () => {
              gsap.fromTo(
                ".photo-layer",
                { yPercent: -3 },
                {
                  yPercent: 3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                  },
                },
              );
              gsap.fromTo(
                frame.current,
                { clipPath: "inset(3% 0% 3% 0% round 32px)" },
                {
                  clipPath: "inset(0% 0% 0% 0% round 32px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame.current,
                    start: "top 95%",
                    end: "top 45%",
                    scrub: 0.5,
                  },
                },
              );
            },
          );
        }, frame);
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
  }, [asset.kind, asset.src, destination]);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!asset.src) {
    const project = projects.find((p) => p.slug === slug);
    return (
      <div className="type-preview">
        <span className="type-number">
          {String(project?.order ?? 0).padStart(2, "0")} / {project?.category}
        </span>
        <strong>{title}</strong>
        <span className="type-stack">{project?.techStack.join(" / ")}</span>
      </div>
    );
  }
  const preview = (
    <div
      ref={frame}
      data-project-visual={slug}
      data-transition-id={transitionId}
      data-project-src={asset.src}
      style={
        {
          "--photo-position": asset.position,
          "--photo-mobile-position": asset.mobilePosition,
        } as CSSProperties
      }
      className={`project-image ${asset.kind === "photograph" ? `photo-frame photo-${slug} ${featured ? "photo-featured" : ""}` : ""} ${loaded ? "is-loaded" : ""} ${asset.label.startsWith("Original frontend") ? "authentic-preview" : ""}`}
    >
      {failed ? (
        <div className="image-fallback">
          <span>{title}</span>
          <p>Project preview unavailable</p>
        </div>
      ) : (
        <div
          className={
            asset.kind === "photograph" ? "photo-layer" : "capture-layer"
          }
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            width={asset.width ?? 1000}
            height={asset.height ?? 650}
            placeholder={asset.blurDataURL ? "blur" : "empty"}
            blurDataURL={asset.blurDataURL}
            sizes={
              featured
                ? "(max-width: 767px) calc(100vw - 40px), (min-width: 1440px) 1320px, 92vw"
                : "(max-width: 480px) calc(100vw - 40px), 46vw"
            }
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </div>
      )}
      {asset.kind === "photograph" && !failed && (
        <>
          <span className="photo-overlay" aria-hidden="true" />
          <div className="photo-title" aria-hidden="true">
            <strong>{title}</strong>
          </div>
        </>
      )}
      <span className="preview-label">{asset.label}</span>
    </div>
  );
  return name && isPresent ? (
    <ViewTransition name={name} share="project-morph" default="none">
      {preview}
    </ViewTransition>
  ) : (
    preview
  );
}
