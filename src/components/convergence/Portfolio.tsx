"use client";
import { useEffect, useRef, useState } from "react";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  SiteHeader,
  WorkSection,
  type ContentActions,
  type Tab,
} from "./Content";
import { AmbientOrbits } from "./AmbientOrbits";
import { SkillsSection } from "./Controls";
import { DocumentDialog, ProjectDialog, cases, caseKey } from "./Dialogs";
import { Intro, INTRO_SEEN } from "./Intro";

export function Portfolio({
  initialTab = "cs",
  initialProject,
  autoIntro = true,
}: {
  initialTab?: Tab;
  initialProject?: string;
  autoIntro?: boolean;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [project, setProject] = useState<string | null>(initialProject ?? null);
  const [documentKey, setDocumentKey] = useState<string | null>(null);
  const [intro, setIntro] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN) === "true";
    } catch {}
    const frame = requestAnimationFrame(() => {
      if (
        autoIntro &&
        !seen &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        setIntro(true);
      if (location.hash === "#work-ux") {
        setTab("ux");
        document.getElementById("work")?.scrollIntoView();
      } else if (initialTab === "resume")
        document.getElementById("work")?.scrollIntoView();
    });
    const beforePrint = () =>
      document
        .querySelectorAll<HTMLDetailsElement>("#panel-resume details")
        .forEach((node) => {
          node.dataset.printOpen = String(node.open);
          node.open = true;
        });
    const afterPrint = () =>
      document
        .querySelectorAll<HTMLDetailsElement>("#panel-resume details")
        .forEach((node) => {
          node.open = node.dataset.printOpen === "true";
          delete node.dataset.printOpen;
        });
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, [autoIntro, initialTab]);
  const actions: ContentActions = {
    tab,
    onTab: (next) => {
      setTab(next);
      if (next !== "cs")
        requestAnimationFrame(() =>
          document.getElementById("work")?.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          }),
        );
    },
    onProject: (key) => {
      if (cases[caseKey(key)]) setProject(key);
    },
    onDocument: (key) => setDocumentKey(key),
    onReplay: () => {
      opener.current = document.activeElement as HTMLElement;
      setIntro(true);
    },
  };
  return (
    <>
      <AmbientOrbits />
      <a className="skip" href="#main">
        Skip to portfolio
      </a>
      <SiteHeader actions={actions} />
      <main id="main" className="wrap">
        <HeroSection actions={actions} />
        <WorkSection actions={actions} />
        <SkillsSection />
        <AboutSection actions={actions} />
        <ContactSection actions={actions} />
      </main>
      {project && (
        <ProjectDialog
          key={project}
          project={project}
          onClose={() => setProject(null)}
          onDocument={actions.onDocument}
        />
      )}
      {documentKey && (
        <DocumentDialog
          key={documentKey}
          documentKey={documentKey}
          onClose={() => setDocumentKey(null)}
        />
      )}
      {intro && (
        <Intro
          onDone={() => {
            setIntro(false);
            requestAnimationFrame(() =>
              (
                opener.current ?? document.getElementById("motionButton")
              )?.focus({ preventScroll: true }),
            );
          }}
        />
      )}
    </>
  );
}
