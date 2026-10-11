"use client";
import { SlidingControls } from "@/components/ui/SlidingControls";
import { SlidingPanel } from "@/components/ui/SlidingPanel";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { ScrollHeading } from "@/components/ui/ScrollHeading";
export function SkillsSection() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [selected, setSelected] = useState("Python");
  const [direction, setDirection] = useState(1);
  const [skillAxis, setSkillAxis] = useState<"x" | "fade">("x");
  const [vertical, setVertical] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 769px)");
    const update = () => setVertical(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const group = skillGroups[groupIndex];
  const chooseGroup = (index: number) => {
    setDirection(index > groupIndex ? 1 : -1);
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
        <ScrollHeading id="skills-heading">Skills</ScrollHeading>
        <p className="toolkit-intro">
          Select a technology to see where I’ve used it.
        </p>
        <div className="toolkit-layout">
          <SlidingControls
            className="toolkit-categories"
            label="Technology disciplines"
            panelId="skills-discipline-panel"
            orientation="responsive"
          >
            {skillGroups.map((g, i) => {
              return (
                <button
                  type="button"
                  key={g.category}
                  aria-pressed={i === groupIndex}
                  onClick={() => chooseGroup(i)}
                >
                  <span>{g.category}</span>
                  <ArrowUpRight size={16} />
                </button>
              );
            })}
          </SlidingControls>
          <div
            className="toolkit-panel"
            id="skills-discipline-panel"
            role="tabpanel"
            aria-label={group.category}
          >
            <SlidingPanel
              panelKey={group.category}
              direction={direction}
              axis={vertical ? "y" : "x"}
            >
              <span className="toolkit-count">
                {String(groupIndex + 1).padStart(2, "0")} /{" "}
                {String(skillGroups.length).padStart(2, "0")}
              </span>
              <h3>{group.category}</h3>
              <p className="toolkit-instruction">
                Select a technology to explore related projects.
              </p>
              <SlidingControls
                className="toolkit-technologies"
                label={`${group.category} technologies`}
                panelId="skills-evidence-panel"
              >
                {group.skills.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={(event) => {
                      const controls = event.currentTarget.parentElement;
                      const previous =
                        controls?.querySelector<HTMLButtonElement>(
                          'button:is([aria-pressed="true"],[aria-selected="true"])',
                        );
                      setSkillAxis(
                        previous &&
                          previous.offsetTop !== event.currentTarget.offsetTop
                          ? "fade"
                          : "x",
                      );
                      setDirection(
                        group.skills.indexOf(skill) >
                          group.skills.indexOf(selected)
                          ? 1
                          : -1,
                      );
                      setSelected(skill);
                    }}
                    aria-pressed={selected === skill}
                  >
                    {skill}
                  </button>
                ))}
              </SlidingControls>
              <div
                className="toolkit-projects"
                id="skills-evidence-panel"
                role="tabpanel"
                aria-label={`${selected} in practice`}
                aria-live="polite"
              >
                <SlidingPanel
                  panelKey={selected}
                  direction={direction}
                  axis={skillAxis}
                >
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
                      Part of my technical toolkit. Explore my broader work
                      below.
                    </p>
                  )}
                  <a href="#all-projects" className="toolkit-all">
                    Explore all projects <ArrowUpRight size={16} />
                  </a>
                </SlidingPanel>
              </div>
            </SlidingPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
