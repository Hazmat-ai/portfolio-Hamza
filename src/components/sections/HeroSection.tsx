import { HeroMotion } from "@/components/animations/HeroMotion";
import { ChevronRight } from "@/components/icons";

export function HeroSection() {
  return (
    <HeroMotion>
      <section
        id="hero"
        className="launch-hero personal-hero"
        aria-labelledby="hero-heading"
      >
        <div className="container launch-hero-intro">
          <h1 id="hero-heading" className="launch-hero-title">
            Hamza Rizvi
          </h1>
          <p className="personal-intro">
            I build web apps, machine learning tools, and robots.
          </p>
          <p className="launch-description">
            Computer Science student at Wilfrid Laurier’s Milton campus, with a
            UX Design minor. Currently a software development intern at the
            Ontario Ministry of Public and Business Service Delivery and
            Procurement.
          </p>
          <p className="personal-availability">
            Looking for a co-op term · Mississauga, Ontario
          </p>
          <div className="launch-actions">
            <a href="#contact" className="btn-primary">
              Get in touch
            </a>
            <a href="#projects" className="btn-secondary">
              View projects <ChevronRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </HeroMotion>
  );
}
