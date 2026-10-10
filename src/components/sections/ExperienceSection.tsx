'use client';

import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { experience } from '@/data/experience';
import { motion } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section bg-[#0a0a0f]"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <FadeIn>
          <span className="section-label">Professional Experience</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            id="experience-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-12"
          >
            Where I&apos;ve worked
          </h2>
        </FadeIn>

        {/* Timeline */}
        <StaggerContainer className="relative pl-8">
          {/* Vertical line */}
          <div className="timeline-line" aria-hidden="true" />

          {experience.map((item, i) => (
            <motion.article
              key={`${item.title}-${item.organization}`}
              variants={staggerItem}
              className="relative mb-12 last:mb-0"
              aria-label={`${item.title} at ${item.organization}`}
            >
              {/* Dot */}
              <div className="timeline-dot" aria-hidden="true" />

              <div className="card p-6 ml-4">
                {/* Dates & location */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="flex items-center gap-1.5 text-xs text-[var(--accent-bright)] font-medium">
                    <Calendar size={12} />
                    {item.dates}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-0.5">{item.title}</h3>
                <p className="text-sm font-medium text-[var(--accent-bright)] mb-4">
                  {item.organization}
                </p>

                {/* Bullets */}
                <ul className="space-y-2" aria-label="Responsibilities">
                  {item.description.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      <span
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                        style={{ background: 'var(--accent)' }}
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
