'use client';

import { motion } from 'motion/react';
import { Mail, ArrowDown, Download, ExternalLink } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient background orbs */}
      <div
        className="ambient-orb w-[600px] h-[600px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          top: '-150px',
          right: '-100px',
        }}
        aria-hidden="true"
      />
      <div
        className="ambient-orb w-[400px] h-[400px] opacity-8"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          bottom: '0',
          left: '-80px',
        }}
        aria-hidden="true"
      />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 pt-24">
        <div className="max-w-4xl">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="section-label">Mississauga, Ontario · Available for Co-op</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            <span className="gradient-text">Hamza</span>
            <br />
            <span className="text-white">Rizvi</span>
          </motion.h1>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xl md:text-2xl font-medium text-[var(--text-secondary)] mb-4 tracking-tight"
          >
            Software Developer &middot; Computer Science &amp; UX Design
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mb-10"
          >
            I build full-stack applications, AI-powered tools, and robotics systems at Wilfrid Laurier University.
            Currently a Software Development Intern at the Ontario Government, with hands-on experience spanning
            computer vision, embedded systems, and user-focused engineering.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <a href="#projects" className="btn-primary">
              View Projects
              <ExternalLink size={15} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Download size={15} />
              Resume
            </a>
            <a
              href="https://github.com/Hazmat-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="GitHub profile"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hamzarizvi-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
            <a
              href="mailto:hamzarizvi006@gmail.com"
              className="btn-secondary"
              aria-label="Send email"
            >
              <Mail size={15} />
              Contact
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-8 pt-8 border-t border-white/5"
          >
            {[
              { value: '12+', label: 'Projects Built' },
              { value: '11', label: 'Certifications' },
              { value: 'BSc CS', label: 'Wilfrid Laurier' },
              { value: 'Aug 2028', label: 'Graduation' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-[var(--text-muted)] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[var(--text-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
