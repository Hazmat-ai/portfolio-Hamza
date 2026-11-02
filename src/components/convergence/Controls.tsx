"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import content from "@/data/convergence/content.json";
import type { Tab } from "./Content";

export const THEME_KEY = "hamza-theme-v2";
export function ThemeToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      const button = ref.current;
      if (!button) return;
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme",
      );
      button.textContent = dark ? "☀" : "◐";
    };
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const sync = (e: StorageEvent) => {
      if (e.key === THEME_KEY || e.key === null)
        document.documentElement.dataset.theme =
          e.newValue === "dark" ? "dark" : "light";
    };
    update();
    window.addEventListener("storage", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", sync);
    };
  }, []);
  return (
    <button
      ref={ref}
      className="icon"
      id="theme"
      aria-label="Switch to dark theme"
      aria-pressed={false}
      onClick={() => {
        const next =
          document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          /* Theme still works when storage is unavailable. */
        }
      }}
    >
      ◐
    </button>
  );
}

const tabs: Tab[] = ["cs", "ux", "resume"];
const labels = { cs: "Computer Science", ux: "UX Design", resume: "Résumé" };
function useIndicator(active: string) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const measure = () => {
      const button = root.current?.querySelector<HTMLElement>(
        '[aria-selected="true"]',
      );
      const line = root.current?.querySelector<HTMLElement>("[data-indicator]");
      if (button && line) {
        line.style.left = `${button.offsetLeft}px`;
        line.style.width = `${button.offsetWidth}px`;
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (root.current) observer.observe(root.current);
    let live = true;
    document.fonts.ready.then(() => {
      if (live) measure();
    });
    return () => {
      live = false;
      observer.disconnect();
    };
  }, [active]);
  return root;
}
export function PortfolioTabs({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (key: Tab) => void;
}) {
  const ref = useIndicator(active);
  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Portfolio sections"
      className="portfolio-tabs"
    >
      {tabs.map((key, i) => (
        <button
          key={key}
          id={`tab-${key}`}
          role="tab"
          data-portfolio={key}
          aria-controls={`panel-${key}`}
          aria-selected={active === key}
          tabIndex={active === key ? 0 : -1}
          onClick={() => onChange(key)}
          onKeyDown={(event) => {
            const j =
              event.key === "ArrowRight"
                ? (i + 1) % 3
                : event.key === "ArrowLeft"
                  ? (i + 2) % 3
                  : event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 2
                      : -1;
            if (j >= 0) {
              event.preventDefault();
              onChange(tabs[j]);
              document.getElementById(`tab-${tabs[j]}`)?.focus();
            }
          }}
        >
          {labels[key]}
        </button>
      ))}
      <span data-indicator aria-hidden="true" className="portfolio-line" />
    </div>
  );
}
export function SkillsSection() {
  const [active, setActive] = useState("cs");
  const ref = useIndicator(active);
  return (
    <section id="skills" className="section skillslayout">
      <div>
        <h2>
          Different tools.
          <br />
          Same curiosity.
        </h2>
        <p className="muted" style={{ marginTop: 24 }}>
          The point is what a tool helps me understand or build.
        </p>
      </div>
      <div>
        <div
          ref={ref}
          className="skilltabs"
          role="tablist"
          aria-label="Disciplines"
        >
          {["cs", "ux"].map((key) => (
            <button
              key={key}
              id={`skill-${key}`}
              role="tab"
              aria-controls="skills-panel"
              aria-selected={key === active}
              tabIndex={key === active ? 0 : -1}
              onClick={() => setActive(key)}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? "cs"
                      : event.key === "End"
                        ? "ux"
                        : active === "cs"
                          ? "ux"
                          : "cs";
                  setActive(next);
                  document.getElementById(`skill-${next}`)?.focus();
                }
              }}
            >
              {key === "cs" ? "Computer Science" : "UX Design"}
            </button>
          ))}
          <span data-indicator aria-hidden="true" className="skillline" />
        </div>
        <div
          key={active}
          id="skills-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`skill-${active}`}
          className="skillcontent"
        >
          <div className="skilllist">
            {active === "cs" ? (
              <>
                Python · TypeScript · React
                <br />
                FastAPI · PostgreSQL · Git
              </>
            ) : (
              <>
                Research · Interaction design
                <br />
                Information architecture · Usability testing
              </>
            )}
          </div>
          <p>
            {active === "cs"
              ? "StudyMind connects document input, structured generation and saved study material across the interface and API."
              : "The Lotus card sort challenged the proposed categories. Research, synthesis and testing shape how I organize an experience."}
          </p>
        </div>
      </div>
    </section>
  );
}
export function DocumentLibrary({
  onDocument,
}: {
  onDocument: (key: string) => void;
}) {
  return (
    <div id="library" className="library">
      {content.sources.map((source, i) => (
        <details key={source.title} open={i === 3}>
          <summary>
            <div>
              <h3>{source.title}</h3>
              <span>{source.course}</span>
            </div>
          </summary>
          <div className="doc-preview-grid">
            {content.docGroups[i].map((index) => {
              const doc = content.uxDocuments[index];
              return (
                <article className="doc-card" key={doc.key}>
                  <button
                    className="doc-cover"
                    onClick={() => onDocument(doc.key)}
                  >
                    <img src={doc.pages[0]} alt="" loading="lazy" />
                    <span className="doc-name">{doc.title}</span>
                    <span className="small muted">
                      Preview {doc.pages.length} pages ↗
                    </span>
                  </button>
                  <div className="doc-actions">
                    <a href={doc.pdf} download>
                      Download{" "}
                      {doc.kind === "Supplied PDF" ? "PDF" : "preview PDF"} ↓
                    </a>
                    <a
                      href={doc.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="source-note">{source.note}</p>
        </details>
      ))}
    </div>
  );
}
export function DemoBadge({ project }: { project: string }) {
  const demos: Record<string, { kind: string }> = content.projectDemos;
  const kind = demos[project === "asl" ? "asl-recognition" : project]?.kind;
  return (
    <span className="demo-badge">
      {kind === "live"
        ? "Live demo"
        : kind === "adaptation"
          ? "Interactive preview"
          : kind === "video"
            ? "Video walkthrough"
            : "Demo setup"}
    </span>
  );
}
