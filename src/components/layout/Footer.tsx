import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container">
        <div className="footer-main">
          <Link href="/" className="brand">
            <span className="brand-mark">hr.</span>
            <span>Hamza Rizvi</span>
          </Link>
          <p>
            Engineering with intention.
            <br />
            <span>Computer Science &amp; UX Design</span>
          </p>
          <Link href="/#hero" className="back-top">
            Back to top <ArrowUp size={14} />
          </Link>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/#projects">Selected work</Link>
          <Link href="/resume">Web resume</Link>
          <a href="mailto:hamzarizvi006@gmail.com">
            Get in touch
            <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="footer-editorial">
          <span>© {new Date().getFullYear()} Hamza Rizvi</span>
          <span>Mississauga, Ontario · Canada</span>
          <a
            href="https://github.com/Hazmat-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            Find me on GitHub <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
