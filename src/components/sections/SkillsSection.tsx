'use client';

import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { skillGroups } from '@/data/skills';
import { motion } from 'motion/react';
import {
  Code2,
  Monitor,
  Server,
  Database,
  Brain,
  Wrench,
  Cloud,
  Cpu,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  Monitor,
  Server,
  Database,
  Brain,
  Wrench,
  Cloud,
  Cpu,
};

export function SkillsSection() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        <FadeIn>
          <span className="section-label">Technical Skills</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-4"
          >
            Technologies I work with
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-[var(--text-secondary)] max-w-xl mb-12 leading-relaxed">
            A snapshot of the tools, frameworks, and platforms I use across full-stack, AI, mobile, and
            embedded systems work.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          staggerDelay={0.07}
        >
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon] ?? Code2;
            return (
              <motion.div
                key={group.category}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
                }}
                className="card p-5"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)' }}
                  >
                    <Icon size={16} className="text-[var(--accent-bright)]" />
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-tight">
                    {group.category}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="badge cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
