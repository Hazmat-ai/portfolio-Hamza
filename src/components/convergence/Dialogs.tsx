"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import content from "@/data/convergence/content.json";
export const cases = content.caseContent as Record<string, string[]>;
export function caseKey(slug: string) {
  return slug === "asl-recognition" ? "asl" : slug;
}
export function projectSlug(key: string) {
  return key === "asl" ? "asl-recognition" : key;
}
export function ProjectDialog({
  project,
  onClose,
  onDocument,
}: {
  project: string;
  onClose: () => void;
  onDocument: (key: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const entry = cases[caseKey(project)];
  useEffect(() => {
    const dialog = ref.current!;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.querySelectorAll("video").forEach((v) => v.pause());
      dialog.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus();
    };
  }, []);
  if (!entry) return null;
  return (
    <dialog
      ref={ref}
      id="detail"
      aria-labelledby="detailTitle"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="dialoghead">
        <span>Project / {entry[0]}</span>
        <button autoFocus aria-label="Close case study" onClick={onClose}>
          ×
        </button>
      </div>
      <div
        id="detailBody"
        className="case-content"
        onClick={(event) => {
          const trigger = (event.target as Element).closest<HTMLElement>(
            "[data-doc-preview]",
          );
          if (trigger?.dataset.docPreview)
            onDocument(trigger.dataset.docPreview);
        }}
      >
        <h2 id="detailTitle">{entry[0]}</h2>
        <div dangerouslySetInnerHTML={{ __html: entry[1] }} />
        <p>
          <a href={`/projects/${projectSlug(project)}`}>Open project page ↗</a>
        </p>
      </div>
    </dialog>
  );
}
export function DocumentDialog({
  documentKey,
  onClose,
}: {
  documentKey: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const doc = content.uxDocuments.find((d) => d.key === documentKey)!;
  const [page, setPage] = useState(0);
  useEffect(() => {
    const dialog = ref.current!;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      id="documentDialog"
      aria-labelledby="documentTitle"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="dialoghead">
        <h2 id="documentTitle">{doc.title}</h2>
        <button autoFocus aria-label="Close document preview" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="document-controls">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          ← Previous
        </button>
        <label>
          Page{" "}
          <select
            value={page}
            onChange={(event) => setPage(Number(event.target.value))}
          >
            {doc.pages.map((_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button
          disabled={page === doc.pages.length - 1}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
        <span id="documentStatus" role="status">
          Page {page + 1} of {doc.pages.length}
        </span>
      </div>
      <div className="document-links">
        <a href={doc.pdf} download>
          Download PDF ↓
        </a>
        <a href={doc.source} target="_blank" rel="noopener noreferrer">
          Open original ↗
        </a>
        <p className="small muted">
          {doc.kind === "Supplied PDF"
            ? "Original supplied PDF."
            : "Image previews. Open the original for full text and resolution."}
        </p>
      </div>
      <div className="document-canvas">
        <img
          key={page}
          src={doc.pages[page]}
          alt={`${doc.title}, page ${page + 1} image preview`}
        />
      </div>
    </dialog>
  );
}
