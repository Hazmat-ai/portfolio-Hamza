import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectImage } from "@/components/ui/ProjectImage";

/** Selected work stays in document flow: no pinning or horizontal scrolling. */
export function ProjectRail() {
  return (
    <section
      id="projects"
      className="section selected-work"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <div className="section-intro">
          <h2 id="projects-heading">Selected work</h2>
          <p>Three projects with interfaces you can explore.</p>
        </div>
        <div className="selected-work-grid">
          {["studymind", "campaign-os", "asl-recognition"].map((slug) => {
            const project = projects.find((p) => p.slug === slug)!;
            return (
              <article
                key={slug}
                data-project={slug}
                className="selected-project"
              >
                <Link
                  href={`/projects/${slug}`}
                  className="project-visual-link"
                  aria-label={`Read about ${project.title}`}
                >
                  <ProjectImage
                    slug={slug}
                    title={project.title}
                    featured
                    transitionId={`project-${slug}-selected`}
                  />
                </Link>
                <h3>
                  <Link href={`/projects/${slug}`}>
                    {project.title}
                    <ArrowUpRight size={19} />
                  </Link>
                </h3>
                <p>{project.shortDescription}</p>
                <div className="project-stack">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <Link href={`/projects/${slug}`}>
                    Project details <ArrowUpRight size={15} />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub <ArrowUpRight size={15} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <a className="selected-all" href="#all-projects">
          Browse all {projects.length} projects <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
