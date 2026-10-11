"use client";
import { ViewTransition } from "react";

export function ProjectScene({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
  featured: boolean;
}) {
  return (
    <ViewTransition
      name={`case-media-${slug}`}
      enter="case-arrive"
      exit="case-depart"
      default="none"
    >
      <div className="detail-visual case-media">{children}</div>
    </ViewTransition>
  );
}
