"use client";
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
  const [index, setIndex] = useState(0);
  const visuals =
    slug === "campaign-os"
      ? campaignVisuals
      : slug === "studymind"
        ? studyVisuals
        : null;
  return (
    <>
      <ProjectImage
        key={`${slug}-${index}`}
        slug={slug}
        title={title}
        featured
        visual={visuals?.[index]}
      />
      {visuals && (
        <div
          className="capture-controls"
          role="group"
          aria-label="campaignOS frontend gallery"
        >
          {(slug === "studymind"
            ? ["Workspace", "Sign in"]
            : ["Home", "Campaign brief"]
          ).map((label, i) => (
            <button
              type="button"
              key={label}
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
