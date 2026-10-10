"use client";
import { SlidingControls } from "@/components/ui/SlidingControls";
import { SlidingPanel } from "@/components/ui/SlidingPanel";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";

export function ResumeSkills() {
  const [selected, setSelected] = useState<string | null>(null);
  const related = selected
    ? projects.filter((project) => project.techStack.includes(selected))
    : [];
  return (
    <div className="resume-skills">
      <p className="resume-skills-hint">
        Select a technology to see it in my work.
      </p>
      <SlidingControls
        className="resume-skills-grid"
        label="Resume technologies"
      >
        {skillGroups.map((group) => (
          <div className="resume-skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <div
              className="project-stack"
              role="group"
              aria-label={`${group.category} skills`}
            >
              {group.skills.map((skill) => (
                <button
                  type="button"
                  className="tech-tag"
                  key={skill}
                  aria-pressed={selected === skill}
                  onClick={() => setSelected(selected === skill ? null : skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </SlidingControls>
      <div
        className="resume-skill-evidence"
        aria-live="polite"
        aria-atomic="true"
      >
        <SlidingPanel panelKey={selected ?? "empty"} axis="fade">
          {selected && (
            <>
              <h3>{selected} in practice</h3>
              {related.length ? (
                <ul>
                  {related.map((project) => (
                    <li key={project.slug}>
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Part of my technical toolkit. Browse the projects below to
                  explore my work.
                </p>
              )}
            </>
          )}
        </SlidingPanel>
      </div>
    </div>
  );
}
