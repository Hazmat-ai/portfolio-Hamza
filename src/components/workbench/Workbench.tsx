"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { X, ChevronRight } from "@/components/icons";
import { BrandMark } from "@/components/ui/BrandLogo";
import { PersonalPhoto } from "@/components/ui/PersonalPhoto";
import { ProjectDecisions } from "@/components/projects/ProjectDecisions";
const objects = [
  {
    id: "robot",
    title: "Robot component",
    description: "Robotics & embedded systems",
    image: "/assets/workbench/robot-component-placeholder.svg",
    alt: "Neutral component outline; placeholder for an actual robot photograph",
    caption: "Placeholder · robot photo needed",
  },
  {
    id: "app",
    title: "App window",
    description: "Software & machine learning",
    image: "/assets/projects/studymind/home.webp",
    alt: "Original StudyMind frontend with an empty workspace",
    caption: "Original frontend · local capture",
  },
  {
    id: "notebook",
    title: "Research notebook",
    description: "UX & usability work",
    image: "/assets/workbench/notebook-placeholder.svg",
    alt: "Neutral notebook outline; placeholder for an actual notebook scan",
    caption: "Placeholder · notebook scan needed",
  },
] as const;
type ObjectId = (typeof objects)[number]["id"];
export function Workbench() {
  const [selected, setSelected] = useState<ObjectId | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const object = objects.find((item) => item.id === selected);
  useEffect(() => {
    const sheet = dialog.current;
    if (!selected || !sheet) return;
    sheet.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      sheet.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected]);
  const relatedProjects =
    selected === "robot"
      ? projects.filter((p) => p.category === "Robotics / Embedded Systems")
      : selected === "app"
        ? projects.filter((p) => p.category !== "Robotics / Embedded Systems")
        : [];
  const relatedExperience =
    selected === "robot"
      ? experience.filter((e) => e.organization === "WLU Robotics")
      : selected === "notebook"
        ? experience.filter((e) => e.title === "Website Usability Tester")
        : experience.filter(
            (e) =>
              e.title === "Software Development Intern" ||
              e.title === "iOS Developer (Co-op)",
          );
  return (
    <section
      id="workbench"
      className="section workbench-section"
      aria-labelledby="workbench-heading"
    >
      <div className="container">
        <div className="workbench-intro">
          <h2 id="workbench-heading">Hamza’s workbench</h2>
          <p>Open an object to explore the work behind it.</p>
        </div>
        <PersonalPhoto slot="workbench" />
        <div className="workbench-surface">
          {objects.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`workbench-object workbench-${item.id}`}
              aria-haspopup="dialog"
              aria-controls="workbench-sheet"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setSelected(item.id);
              }}
            >
              <span className="workbench-object-visual">
                {!failedImages.includes(item.id) ? (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.id === "app" ? 1440 : 420}
                    height={item.id === "app" ? 1000 : 280}
                    sizes="(max-width: 767px) calc(100vw - 80px), 330px"
                    onError={() =>
                      setFailedImages((previous) => [...previous, item.id])
                    }
                  />
                ) : (
                  <span className="workbench-image-fallback">
                    Preview unavailable
                  </span>
                )}
              </span>
              <span className="workshop-annotation workbench-object-caption">
                {item.caption}
              </span>
              <span className="workbench-object-name">
                {item.title}
                <ChevronRight size={18} />
              </span>
              <span className="workbench-object-description">
                {item.description}
              </span>
            </button>
          ))}
          <div className="workbench-stamp">
            <BrandMark className="maker-mark" />
            <span className="workshop-annotation">
              Select an object to inspect
            </span>
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        id="workbench-sheet"
        className="workbench-sheet"
        aria-labelledby="workbench-sheet-heading"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              setSelected(null);
          }
        }}
      >
        {object && (
          <>
            <div className="workbench-sheet-header">
              <div>
                <h2 id="workbench-sheet-heading">{object.title}</h2>
                <p>{object.description}</p>
              </div>
              <button
                type="button"
                className="workbench-close"
                aria-label="Close workbench"
                onClick={() => setSelected(null)}
                autoFocus
              >
                <X size={20} />
              </button>
            </div>
            {selected === "notebook" && (
              <p className="workbench-sheet-intro">
                UX Design minor at Wilfrid Laurier University.
              </p>
            )}
            {selected === "app" && <ProjectDecisions projectId="studymind" />}
            {relatedProjects.length > 0 && (
              <section
                className="workbench-sheet-projects"
                aria-label="Related projects"
              >
                <h3>Projects</h3>
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    onClick={() => setSelected(null)}
                    className="workbench-project-link"
                  >
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.shortDescription}</p>
                    </div>
                    <ChevronRight size={20} />
                  </Link>
                ))}
              </section>
            )}
            {relatedExperience.length > 0 && (
              <section
                className="workbench-sheet-experience"
                aria-label="Related experience"
              >
                <h3>Experience</h3>
                {relatedExperience.map((role) => (
                  <article key={role.title}>
                    <h4>{role.title}</h4>
                    <p>{role.organization}</p>
                    <span className="workshop-annotation">{role.dates}</span>
                    <p>{role.description[0]}</p>
                  </article>
                ))}
              </section>
            )}
            <Link
              href="/#experience"
              className="btn-secondary"
              onClick={() => setSelected(null)}
            >
              Explore experience <ChevronRight size={16} />
            </Link>
          </>
        )}
      </dialog>
    </section>
  );
}
