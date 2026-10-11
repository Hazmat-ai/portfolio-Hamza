"use client";
import { SlidingControls } from "@/components/ui/SlidingControls";
import { SlidingPanel } from "@/components/ui/SlidingPanel";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/projects";
import { Github } from "@/components/ui/Icons";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { campaignVisuals } from "@/data/projectVisuals";
import { ScrollHeading } from "@/components/ui/ScrollHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { useProjectNavigation } from "@/components/animations/ProjectTransitions";
const categories: { label: string; value: ProjectCategory | "All" }[] = [
  { label: "All work", value: "All" },
  { label: "Full stack", value: "Full Stack" },
  { label: "AI & ML", value: "AI / Machine Learning" },
  { label: "Mobile", value: "Mobile Development" },
  { label: "Robotics & systems", value: "Robotics / Embedded Systems" },
];
export function ProjectsSection() {
  const { campaignState, setCampaignState, category, setCategory } =
    useProjectNavigation();
  const [captureDirection, setCaptureDirection] = useState(1);
  const [filterDirection, setFilterDirection] = useState(1);
  const [filterAxis, setFilterAxis] = useState<"x" | "fade">("x");
  const filtered = projects.filter(
    (p) => category === "All" || p.category === category,
  );
  return (
    <section
      id="all-projects"
      className="section projects-section"
      aria-labelledby="all-projects-heading"
    >
      <div className="container project-collection">
        <div className="collection-heading">
          <div>
            <ScrollHeading id="all-projects-heading">
              All projects
            </ScrollHeading>
          </div>
          <p>
            Web, machine learning, mobile, and robotics.
            <br />
            {projects.length} projects, in the collection.
          </p>
        </div>
        <SlidingControls
          className="project-filters"
          label="Filter projects by category"
          panelId="projects-results"
        >
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              aria-pressed={category === c.value}
              onClick={(event) => {
                const previous =
                  event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(
                    'button:is([aria-pressed="true"],[aria-selected="true"])',
                  );
                setFilterAxis(
                  previous?.offsetTop === event.currentTarget.offsetTop
                    ? "x"
                    : "fade",
                );
                setFilterDirection(
                  categories.findIndex((item) => item.value === c.value) >
                    categories.findIndex((item) => item.value === category)
                    ? 1
                    : -1,
                );
                setCategory(c.value);
              }}
              className={category === c.value ? "selected" : ""}
            >
              {c.label}
              {c.value === "All" && (
                <span>{projects.length.toString().padStart(2, "0")}</span>
              )}
            </button>
          ))}
        </SlidingControls>
        <p className="sr-only" aria-live="polite">
          {filtered.length} projects shown
        </p>
        <div
          id="projects-results"
          role="tabpanel"
          aria-label="Projects in the selected category"
        >
          <SlidingPanel
            panelKey={category}
            axis={filterAxis}
            direction={filterDirection}
          >
            <div className="projects-grid">
              {filtered.map((p) => (
                <FadeIn key={p.slug} className="project-entry">
                  <article className="project" data-project={p.slug}>
                    <Link
                      className="project-visual-link"
                      href={`/projects/${p.slug}`}
                      aria-label={`Read about ${p.title}`}
                    >
                      {p.slug === "campaign-os" ? (
                        <div
                          id="campaign-capture-panel"
                          role="tabpanel"
                          aria-label="Selected campaignOS capture"
                        >
                          <SlidingPanel
                            panelKey={String(campaignState)}
                            direction={captureDirection}
                            axis="x"
                          >
                            <ProjectImage
                              key={
                                p.slug === "campaign-os"
                                  ? `${p.slug}-${campaignState}`
                                  : p.slug
                              }
                              transitionId={`project-${p.slug}-collection`}
                              slug={p.slug}
                              title={p.title}
                              featured={false}
                              visual={
                                p.slug === "campaign-os"
                                  ? campaignVisuals[campaignState]
                                  : undefined
                              }
                            />
                          </SlidingPanel>
                        </div>
                      ) : (
                        <ProjectImage
                          key={
                            p.slug === "campaign-os"
                              ? `${p.slug}-${campaignState}`
                              : p.slug
                          }
                          transitionId={`project-${p.slug}-collection`}
                          slug={p.slug}
                          title={p.title}
                          featured={false}
                          visual={
                            p.slug === "campaign-os"
                              ? campaignVisuals[campaignState]
                              : undefined
                          }
                        />
                      )}
                      <span className="project-open">
                        <ArrowUpRight size={22} />
                      </span>
                    </Link>
                    {p.slug === "campaign-os" && (
                      <SlidingControls
                        className="capture-controls"
                        label="campaignOS frontend captures"
                        panelId="campaign-capture-panel"
                      >
                        {["Home", "Campaign brief"].map((label, index) => (
                          <button
                            key={label}
                            type="button"
                            aria-pressed={campaignState === index}
                            onClick={() => {
                              setCaptureDirection(
                                index > campaignState ? 1 : -1,
                              );
                              setCampaignState(index);
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </SlidingControls>
                    )}
                    <div className="project-meta">
                      <span>{p.category}</span>
                    </div>
                    <h3>
                      <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p className="project-description">{p.shortDescription}</p>
                    <div className="project-stack">
                      {p.techStack.map((t) => (
                        <span className="tech-tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      <Link href={`/projects/${p.slug}`}>
                        Explore project <ArrowUpRight size={15} />
                      </Link>
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} GitHub repository`}
                        >
                          <Github size={15} /> Source
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={15} /> Live demo
                        </a>
                      )}
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </SlidingPanel>
        </div>
      </div>
    </section>
  );
}
