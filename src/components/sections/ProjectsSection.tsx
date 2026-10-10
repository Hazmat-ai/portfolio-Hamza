'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { projects, type ProjectCategory } from '@/data/projects';

const CATEGORIES: { label: string; value: ProjectCategory | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Full Stack', value: 'Full Stack' },
  { label: 'AI / ML', value: 'AI / Machine Learning' },
  { label: 'Mobile', value: 'Mobile Development' },
  { label: 'Robotics', value: 'Robotics / Embedded Systems' },
  { label: 'UX / Frontend', value: 'UX / Frontend' },
];

const categoryColors: Record<ProjectCategory, string> = {
  'Full Stack': '#06b6d4',
  'AI / Machine Learning': '#8b5cf6',
  'Mobile Development': '#f59e0b',
  'Robotics / Embedded Systems': '#10b981',
  'UX / Frontend': '#ec4899',
};

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        {/* Header */}
        <FadeIn>
          <span className="section-label">Featured Work</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-4"
          >
            Projects I&apos;ve built
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-[var(--text-secondary)] max-w-xl mb-10 leading-relaxed">
            A selection of full-stack applications, AI tools, iOS apps, and robotics projects—built to solve
            real problems with clean engineering.
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat.value
                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                    : 'bg-transparent border-white/10 text-[var(--text-secondary)] hover:border-white/25 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Project grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <motion.article
              key={project.slug}
              variants={staggerItem}
              className="card p-6 flex flex-col group"
              aria-label={project.title}
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-md"
                  style={{
                    color: categoryColors[project.category],
                    background: `${categoryColors[project.category]}18`,
                    border: `1px solid ${categoryColors[project.category]}30`,
                  }}
                >
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-medium text-[var(--accent-bright)] bg-[var(--accent-dim)] px-2 py-0.5 rounded-full border border-[var(--accent)]/20">
                    Featured
                  </span>
                )}
              </div>

              {/* Title & description */}
              <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[var(--accent-bright)] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
                {project.shortDescription}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 5 && (
                  <span className="tech-tag">+{project.techStack.length - 5}</span>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-medium text-[var(--accent-bright)] hover:text-white flex items-center gap-1 transition-colors"
                  aria-label={`View details for ${project.title}`}
                >
                  View Details <ArrowUpRight size={14} />
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto p-1.5 rounded-md text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github size={16} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <p className="text-[var(--text-muted)] text-center py-20">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
