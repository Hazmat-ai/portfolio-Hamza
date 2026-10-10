"use client";
import { SlidingControls } from "@/components/ui/SlidingControls";
import { SlidingPanel } from "@/components/ui/SlidingPanel";
import { useProjectNavigation } from "@/components/animations/ProjectTransitions";
import { useState } from "react";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { campaignVisuals, studyVisuals } from "@/data/projectVisuals";
export function ProjectGallery({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const { origin } = useProjectNavigation();
  const visuals =
    slug === "campaign-os"
      ? campaignVisuals
      : slug === "studymind"
        ? studyVisuals
        : null;
  const [index, setIndex] = useState(() =>
    origin?.slug === slug
      ? Math.max(0, visuals?.findIndex((v) => v.src === origin.src) ?? 0)
      : 0,
  );
  const [direction, setDirection] = useState(1);
  return (
    <>
      <div
        id="project-gallery-panel"
        role="tabpanel"
        aria-label={`${title} selected capture`}
      >
        <SlidingPanel panelKey={String(index)} axis="x" direction={direction}>
          <ProjectImage
            key={`${slug}-${index}`}
            slug={slug}
            title={title}
            featured
            destination
            visual={visuals?.[index]}
          />
        </SlidingPanel>
      </div>
      {visuals && (
        <SlidingControls
          className="capture-controls"
          label={`${title} frontend gallery`}
          panelId="project-gallery-panel"
        >
          {(slug === "studymind"
            ? ["Workspace", "Sign in"]
            : ["Home", "Campaign brief"]
          ).map((label, i) => (
            <button
              type="button"
              key={label}
              aria-pressed={index === i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
            >
              {label}
            </button>
          ))}
        </SlidingControls>
      )}
    </>
  );
}
