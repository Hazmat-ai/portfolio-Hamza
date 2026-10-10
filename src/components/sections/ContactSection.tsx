'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';

const EMAIL = 'hamzarizvi006@gmail.com';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        {/* Ambient effect */}
        <div className="relative">
          <div
            className="ambient-orb w-[500px] h-[500px] opacity-[0.07] -z-10"
            style={{
              background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          />

          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <span className="section-label">Get In Touch</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                id="contact-heading"
                className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-4"
              >
                Let&apos;s work together
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                I&apos;m actively seeking co-op opportunities and always open to discussing interesting
                projects, collaborations, or full-time roles after graduation. Reach out via email
                or connect on LinkedIn.
              </p>
            </FadeIn>

            {/* Email card */}
            <FadeIn delay={0.3}>
              <div className="card p-6 mb-8 text-left">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent-dim)' }}
                    >
                      <Mail size={18} className="text-[var(--accent-bright)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">Email</p>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="text-white font-medium hover:text-[var(--accent-bright)] transition-colors truncate block"
                        aria-label={`Send email to ${EMAIL}`}
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-white/10 hover:border-[var(--accent)] hover:bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-white transition-all flex-shrink-0"
                    aria-label={copied ? 'Email copied' : 'Copy email address'}
                    aria-live="polite"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Social links */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://github.com/Hazmat-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center"
                  aria-label="Visit GitHub profile"
                >
                  <Github size={16} />
                  GitHub Profile
                  <ArrowUpRight size={14} className="ml-auto opacity-50" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hamzarizvi-cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin size={16} />
                  LinkedIn
                  <ArrowUpRight size={14} className="ml-auto opacity-50" />
                </a>
                <a
                  href="mailto:hamzarizvi006@gmail.com"
                  className="btn-primary justify-center"
                  aria-label="Send email"
                >
                  <Mail size={16} />
                  Send Email
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
