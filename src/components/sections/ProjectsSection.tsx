"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/projects";
import { Github } from "@/components/ui/Icons";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { campaignVisuals } from "@/data/projectVisuals";
import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { ScrollHeading } from "@/components/ui/ScrollHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProjectRail } from "@/components/sections/ProjectRail";
const categories: { label: string; value: ProjectCategory | "All" }[] = [
  { label: "All work", value: "All" },
  { label: "Full stack", value: "Full Stack" },
  { label: "AI & ML", value: "AI / Machine Learning" },
  { label: "Mobile", value: "Mobile Development" },
  { label: "Robotics & systems", value: "Robotics / Embedded Systems" },
];
export function ProjectsSection() {
  const [campaignState, setCampaignState] = useState(0);
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  useEffect(() => {
    let cancelled = false;
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelled = true;
    };
  }, [category]);
  const filtered = projects.filter(
    (p) => category === "All" || p.category === category,
  );
  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="container launch-project-intro">
        <ScrollHeading id="projects-heading">
          Built to be useful. Designed to be used.
        </ScrollHeading>
        <p>
          Real projects. From the first idea to the final interface.
          <br />
          Explore the engineering behind the experience.
        </p>
      </div>
      <div className="project-expansion">
        <div className="expand-visual">
          <div className="expand-title">
            <span>FEATURED / FULL STACK + AI</span>
            <h3>StudyMind.</h3>
            <p>
              A little less organizing.
              <br />A lot more understanding.
            </p>
          </div>
          <div className="expansion-device">
            <ProjectImage slug="studymind" title="StudyMind" featured />
          </div>
          <a href="#studymind-story" className="expansion-scroll">
            Go inside the project <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div id="studymind-story" className="container story-section">
        <FeaturedStory />
      </div>
      <div
        id="campaign-story"
        className="container story-section campaign-story"
      >
        <FeaturedStory project="campaign-os" />
      </div>
      <ProjectRail />
      <div className="container project-collection">
        <div className="collection-heading">
          <div>
            <ScrollHeading>Many ideas. One curious mind.</ScrollHeading>
          </div>
          <p>
            Full stack, AI, mobile, and robotics.
            <br />
            {projects.length} projects, different perspectives.
          </p>
        </div>
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              aria-pressed={category === c.value}
              onClick={() => setCategory(c.value)}
              className={category === c.value ? "selected" : ""}
            >
              {c.label}
              {c.value === "All" && (
                <span>{projects.length.toString().padStart(2, "0")}</span>
              )}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {filtered.length} projects shown
        </p>
        <div className="projects-grid">
          {filtered.map((p, i) => (
            <FadeIn
              key={p.slug}
              className={`project-entry ${category === "All" && (i === 2 || i === 4) ? "project-featured" : ""}`}
            >
              <article className="project">
                <Link
                  className="project-visual-link"
                  href={`/projects/${p.slug}`}
                  aria-label={`Read about ${p.title}`}
                >
                  <ProjectImage
                    key={
                      p.slug === "campaign-os"
                        ? `${p.slug}-${campaignState}`
                        : p.slug
                    }
                    slug={p.slug}
                    title={p.title}
                    featured={category === "All" && (i === 2 || i === 4)}
                    visual={
                      p.slug === "campaign-os"
                        ? campaignVisuals[campaignState]
                        : undefined
                    }
                  />
                  <span className="project-open">
                    <ArrowUpRight size={22} />
                  </span>
                </Link>
                {p.slug === "campaign-os" && (
                  <div
                    className="capture-controls"
                    role="group"
                    aria-label="campaignOS frontend captures"
                  >
                    {["Home", "Campaign brief"].map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={campaignState === index}
                        onClick={() => setCampaignState(index)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
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
      </div>
    </section>
  );
}
