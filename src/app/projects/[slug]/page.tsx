import { ProjectBackLink } from "@/components/animations/ProjectTransitions";
import { ProjectScene } from "@/components/animations/ProjectScene";
import { ProjectArrival } from "@/components/animations/ProjectArrival";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ExternalLink, ArrowLeft, ArrowUpRight } from "@/components/icons";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { Github } from "@/components/ui/Icons";
import { socialMetadata } from "@/lib/socialMetadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    alternates: { canonical: `/projects/${slug}` },
    description: project.shortDescription,
    ...socialMetadata({
      path: `/projects/${slug}`,
      title: `${project.title} | Hamza Rizvi`,
      description: project.shortDescription,
    }),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <div
      className={`project-detail min-h-screen pt-24 pb-20 ${project.featured ? "case-featured" : ""}`}
    >
      <div className="container detail-container">
        {/* Back button */}
        <ProjectBackLink className="back-link group" label="Back to projects">
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Projects
        </ProjectBackLink>

        {/* Header */}
        <ProjectArrival name={`case-heading-${project.slug}`}>
          <header className="case-heading">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md badge">
                {project.category}
              </span>
              {project.featured && (
                <span className="text-xs font-medium text-[var(--accent-bright)] bg-[var(--accent-dim)] px-2.5 py-1 rounded-full border border-[var(--accent)]/20">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label={`View on GitHub: ${project.title}`}
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label={`Live demo for ${project.title}`}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </header>
        </ProjectArrival>

        <ProjectScene slug={project.slug} featured={project.featured}>
          <ProjectGallery
            key={project.slug}
            slug={project.slug}
            title={project.title}
          />
        </ProjectScene>

        {/* Content */}
        <ProjectArrival name={`case-content-${project.slug}`} content>
          <div className="case-body grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-8">
              <Section title="Overview">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>
              </Section>

              <Section title="Problem / Challenge">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {project.problem}
                </p>
              </Section>

              <Section title="Technical Approach">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {project.approach}
                </p>
              </Section>

              <Section title="Key Features">
                <ul className="space-y-2.5">
                  {project.keyFeatures.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[var(--text-secondary)]"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{
                          background: "var(--accent-dim)",
                          color: "var(--accent-bright)",
                        }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="card p-5 sticky top-24">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
                      aria-label="Open GitHub repository"
                    >
                      <Github size={15} />
                      GitHub Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
                      aria-label="Open live demo"
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </ProjectArrival>
        <nav className="case-next" aria-label="Continue exploring projects">
          <ProjectBackLink className="case-all">
            <ArrowLeft size={16} />
            All projects
          </ProjectBackLink>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="case-next-link"
          >
            <span className="section-label">
              Next project / {nextProject.category}
            </span>
            <span>
              {nextProject.title}
              <ArrowUpRight size={30} />
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-white/5">
        {title}
      </h2>
      {children}
    </section>
  );
}
