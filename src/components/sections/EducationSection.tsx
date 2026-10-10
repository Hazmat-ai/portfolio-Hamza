'use client';

import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { certifications } from '@/data/skills';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

export function EducationSection() {
  return (
    <section
      id="education"
      className="section bg-[#0a0a0f]"
      aria-labelledby="education-heading"
    >
      <div className="container">
        <FadeIn>
          <span className="section-label">Education &amp; Certifications</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            id="education-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-12"
          >
            Academic background
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Education */}
          <FadeIn delay={0.15}>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-5 flex items-center gap-2">
                <GraduationCap size={18} className="text-[var(--accent-bright)]" />
                Degree
              </h3>
              <div className="card p-7">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)' }}
                  >
                    <BookOpen size={22} className="text-[var(--accent-bright)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Wilfrid Laurier University</h4>
                    <p className="text-[var(--accent-bright)] font-medium mt-0.5">Milton Campus</p>
                    <p className="text-[var(--text-secondary)] mt-2">
                      BSc Computer Science
                    </p>
                    <p className="text-[var(--text-secondary)] text-sm">
                      UX Design Minor · Co-op Program
                    </p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-[var(--text-muted)]">
                      <Calendar size={12} />
                      Expected Graduation: August 2028
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <h5 className="text-sm font-semibold text-white mb-3">Roles &amp; Activities</h5>
                  <ul className="space-y-2">
                    {[
                      'IT Teaching Assistant — Jan 2026 – Apr 2026',
                      'Student Instructional Assistant (Calculus) — Aug 2025 – Apr 2026',
                      'Head of Competition, WLU Robotics — Nov 2025 – Present',
                      'Student Ambassador — Jan 2025 – Present',
                      'Exam Proctor — Jan 2026 – Apr 2026',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <span
                          className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                          style={{ background: 'var(--accent)' }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-5 flex items-center gap-2">
                <Award size={18} className="text-[var(--accent-bright)]" />
                Certifications
              </h3>
              <StaggerContainer className="space-y-2" staggerDelay={0.04}>
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.title}
                    variants={staggerItem}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all duration-200"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'var(--accent-dim)' }}
                    >
                      <Award size={13} className="text-[var(--accent-bright)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white leading-snug">{cert.title}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
