"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Monitor,
  Server,
  Database,
  Brain,
  Wrench,
  Cloud,
  Cpu,
} from "lucide-react";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { ScrollHeading } from "@/components/ui/ScrollHeading";
const icons = [Code2, Monitor, Server, Database, Brain, Wrench, Cloud, Cpu];
export function SkillsSection() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [selected, setSelected] = useState("Python");
  const group = skillGroups[groupIndex];
  const chooseGroup = (index: number) => {
    setGroupIndex(index);
    setSelected(skillGroups[index].skills[0]);
  };
  const related = projects.filter((p) => p.techStack.includes(selected));
  return (
    <section
      id="skills"
      className="section light-section toolkit-section"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <ScrollHeading id="skills-heading">
          The right tool. The right reason.
        </ScrollHeading>
        <p className="toolkit-intro">
          Explore my stack — and the projects where it comes to life.
        </p>
        <div className="toolkit-layout">
          <div
            className="toolkit-categories"
            role="group"
            aria-label="Technology disciplines"
            onKeyDown={(event) => {
              const directions: Record<string, number> = {
                ArrowDown: 1,
                ArrowRight: 1,
                ArrowUp: -1,
                ArrowLeft: -1,
              };
              if (
                !(event.key in directions) &&
                event.key !== "Home" &&
                event.key !== "End"
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? skillGroups.length - 1
                    : (groupIndex +
                        directions[event.key] +
                        skillGroups.length) %
                      skillGroups.length;
              chooseGroup(next);
              event.currentTarget
                .querySelectorAll<HTMLButtonElement>("button")
                [next]?.focus();
            }}
          >
            {skillGroups.map((g, i) => {
              const Icon = icons[i];
              return (
                <button
                  type="button"
                  key={g.category}
                  aria-pressed={i === groupIndex}
                  onClick={() => chooseGroup(i)}
                >
                  <Icon size={20} />
                  <span>{g.category}</span>
                  <ArrowUpRight size={16} />
                </button>
              );
            })}
          </div>
          <div className="toolkit-panel">
            <span className="toolkit-count">
              {String(groupIndex + 1).padStart(2, "0")} /{" "}
              {String(skillGroups.length).padStart(2, "0")}
            </span>
            <h3>{group.category}</h3>
            <p className="toolkit-instruction">
              Select a technology to explore related projects.
            </p>
            <div
              className="toolkit-technologies"
              role="group"
              aria-label={`${group.category} technologies`}
            >
              {group.skills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => setSelected(skill)}
                  aria-pressed={selected === skill}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="toolkit-projects" aria-live="polite">
              <span className="section-label">{selected} in practice</span>
              {related.length ? (
                <ul>
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`}>
                        {p.title}
                        <ArrowUpRight size={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Part of my technical toolkit. Explore my broader work below.
                </p>
              )}
              <a href="#projects" className="toolkit-all">
                Explore all projects <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
