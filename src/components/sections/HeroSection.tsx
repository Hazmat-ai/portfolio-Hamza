import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";

export function HeroSection() {
  return (
    <section id="hero" className="launch-hero" aria-labelledby="hero-heading">
      <div className="container launch-hero-intro">
        <div className="launch-status">
          <span className="status">
            <span />
            Available for co-op opportunities
          </span>
          <span className="mono">Mississauga, Ontario</span>
        </div>
        <p className="launch-kicker">
          Software Developer · Computer Science + UX Design
        </p>
        <h1 className="launch-hero-title" id="hero-heading">
          <span className="title-mask">
            <span className="title-line">Hamza Rizvi.</span>
          </span>
          <span className="title-mask">
            <span className="title-line hero-title-sub">
              Built on curiosity.
            </span>
          </span>
        </h1>
        <p className="launch-description">
          Full-stack applications. Intelligent tools. Embedded systems. <br />
          Thoughtful engineering, from the interface to the infrastructure.
        </p>
        <div className="launch-actions">
          <a href="#projects" className="btn-primary">
            Explore my work <ArrowDown size={16} />
          </a>
          <a href="#contact" className="btn-secondary">
            Let’s connect <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="hero-device-stage">
        <div className="hero-device-scene">
          <div className="hero-monitor">
            <div className="monitor-bar">
              <span className="window-controls">
                <i />
                <i />
                <i />
              </span>
              <span>StudyMind / Original frontend</span>
              <span className="monitor-bar-end">⌘</span>
            </div>
            <Image
              src="/assets/projects/studymind/home.webp"
              alt="Actual StudyMind frontend captured locally"
              width={1000}
              height={650}
              preload
              sizes="(max-width: 767px) 92vw, 70vw"
            />
            <div className="monitor-base" />
          </div>
          <div className="hero-code-panel" aria-hidden="true">
            <span className="code-panel-label">BEHIND THE INTERFACE</span>
            <code>
              <span>INPUT</span> → document
              <br />
              <br />
              document → extract
              <br />
              prompt → generate
              <br />
              response → validate
              <br />
              <span>OUTPUT</span> → study materials
            </code>
            <span className="code-panel-footer">
              Python / FastAPI / Claude API
            </span>
          </div>
        </div>
      </div>
      <div className="container launch-hero-bottom">
        <p>
          Currently building at <strong>Ontario Government</strong>
          <br />
          Studying at Wilfrid Laurier University
        </p>
        <div className="launch-socials">
          <a
            href="https://github.com/Hazmat-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/hamzarizvi-cs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={17} />
          </a>
          <a href="/resume">
            Resume <ArrowUpRight size={13} />
          </a>
        </div>
        <a href="#projects" className="launch-scroll">
          <span>Scroll to discover</span>
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
