"use client";
import { ViewTransition } from "react";

export function ProjectArrival({
  children,
  name,
  content = false,
}: {
  children: React.ReactNode;
  name: string;
  content?: boolean;
}) {
  return (
    <ViewTransition
      name={name}
      enter={content ? "case-content" : "case-arrive"}
      exit="case-depart"
    >
      {children}
    </ViewTransition>
  );
}
