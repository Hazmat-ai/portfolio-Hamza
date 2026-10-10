import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div>
            <Link
              href="/"
              className="text-white font-bold text-lg tracking-tight"
              aria-label="Hamza Rizvi — home"
            >
              <span className="gradient-text">Hamza Rizvi</span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Software Developer · Computer Science & UX Design
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Hazmat-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/hamzarizvi-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hamzarizvi006@gmail.com"
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {currentYear} Hamza Rizvi. All rights reserved.
          </p>
          <a
            href="https://github.com/Hazmat-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-bright)] transition-colors flex items-center gap-1"
          >
            View source on GitHub <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
