"use client";
import Image from "next/image";
import { ViewTransition, useState, type CSSProperties } from "react";
import { useIsPresent } from "motion/react";
import { projectVisual, type ProjectVisual } from "@/data/projectVisuals";
import { projects } from "@/data/projects";
import { useProjectNavigation } from "@/components/animations/ProjectTransitions";

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
  const isPresent = useIsPresent();
  const { origin } = useProjectNavigation();
  const name = destination
    ? origin?.slug === slug
      ? origin.name
      : `project-${slug}-collection`
    : transitionId;
  const asset = visual ?? projectVisual(slug, title);
  const project = projects.find((project) => project.slug === slug);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const preview = (
    <div
      data-project-visual={slug}
      data-transition-id={transitionId}
      data-project-src={asset.src ?? ""}
      style={
        {
          "--photo-position": asset.position,
          "--photo-mobile-position": asset.mobilePosition ?? asset.position,
        } as CSSProperties
      }
      className={`project-image ${asset.kind === "photograph" ? `photo-frame photo-${slug}` : asset.src ? "authentic-preview" : "technical-project"} ${loaded ? "is-loaded" : ""}`}
    >
      {!asset.src ? (
        <div className="technical-preview">
          <span className="technical-preview-category">
            {project?.category}
          </span>
          <p>{project?.shortDescription}</p>
          <div className="technical-preview-stack">
            {project?.techStack.slice(0, 4).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      ) : failed ? (
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
            width={asset.width ?? 1440}
            height={asset.height ?? 1000}
            placeholder={asset.blurDataURL ? "blur" : "empty"}
            blurDataURL={asset.blurDataURL}
            sizes={
              featured
                ? "(max-width: 767px) calc(100vw - 40px), 92vw"
                : "(max-width: 767px) calc(100vw - 40px), 46vw"
            }
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </div>
      )}
      {asset.kind === "photograph" && (
        <span className="preview-label">Contextual photo · Unsplash</span>
      )}
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
