"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AmbientOrbits } from "./AmbientOrbits";
import { SiteHeader, type ContentActions } from "./Content";
import { DocumentDialog, cases, caseKey } from "./Dialogs";
export function CasePage({ slug }: { slug: string }) {
  const router = useRouter();
  const [documentKey, setDocumentKey] = useState<string | null>(null);
  const entry = cases[caseKey(slug)];
  const actions: ContentActions = {
    tab: "cs",
    onTab: (tab) =>
      router.push(
        tab === "resume" ? "/resume" : tab === "ux" ? "/#work-ux" : "/#work",
      ),
    onProject: (key) => router.push(`/projects/${key}`),
    onDocument: setDocumentKey,
    onReplay: () => router.push("/"),
  };
  return (
    <>
      <AmbientOrbits />
      <a className="skip" href="#main">
        Skip to project
      </a>
      <SiteHeader actions={actions} />
      <main id="main" className="wrap project-page">
        <Link href="/#work">← Back to projects</Link>
        <article
          className="case-content"
          onClick={(event) => {
            const trigger = (event.target as Element).closest<HTMLElement>(
              "[data-doc-preview]",
            );
            if (trigger?.dataset.docPreview)
              setDocumentKey(trigger.dataset.docPreview);
          }}
        >
          <h1>{entry[0]}</h1>
          <div dangerouslySetInnerHTML={{ __html: entry[1] }} />
        </article>
      </main>
      {documentKey && (
        <DocumentDialog
          documentKey={documentKey}
          key={documentKey}
          onClose={() => setDocumentKey(null)}
        />
      )}
    </>
  );
}
