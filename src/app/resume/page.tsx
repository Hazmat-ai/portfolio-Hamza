import type { Metadata } from "next";
import Link from "next/link";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { certifications } from "@/data/skills";
import { ArrowUpRight } from "lucide-react";
import { ResumeNavigation } from "@/components/ui/ResumeNavigation";
import { ResumeSkills } from "@/components/ui/ResumeSkills";
import { PrintResume } from "@/components/ui/PrintResume";
export const metadata: Metadata = {
  title: "Resume",
  description:
    "Hamza Rizvi — software development, education, projects, and technical skills.",
  alternates: { canonical: "/resume" },
};
export default function ResumePage() {
  return (
    <div className="container resume-page">
      <header className="resume-intro">
        <h1>Hamza Rizvi.</h1>
        <p>Software Developer · Mississauga, Ontario</p>
        <div className="resume-meta">
          <a href="mailto:hamzarizvi006@gmail.com">hamzarizvi006@gmail.com</a>
          <a href="https://github.com/Hazmat-ai">GitHub / Hazmat-ai</a>
          <a href="https://www.linkedin.com/in/hamzarizvi-cs">LinkedIn</a>
        </div>
        <div className="resume-actions">
          <PrintResume />
          <Link href="/" className="btn-secondary">
            Back to portfolio
          </Link>
        </div>
      </header>
      <div className="resume-layout">
        <ResumeNavigation />
        <div>
          <section id="resume-experience" className="resume-section">
            <h2>Experience</h2>
            {experience.map((e) => (
              <article key={e.title} className="resume-role">
                <h3>{e.title}</h3>
                <p className="resume-organization">{e.organization}</p>
                <p className="resume-role-meta">
                  <span>{e.dates}</span>
                  <span>{e.location}</span>
                </p>
                <p>{e.description[0]}</p>
                <details>
                  <summary>Responsibilities & contributions</summary>
                  <ul>
                    {e.description.slice(1).map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </details>
              </article>
            ))}
          </section>
          <section id="resume-education" className="resume-section">
            <h2>Education</h2>
            <h3>Wilfrid Laurier University · Milton Campus</h3>
            <p>
              BSc Computer Science · UX Design Minor · Co-op Program
              <br />
              Expected graduation: August 2028
            </p>
          </section>
          <section id="resume-skills" className="resume-section">
            <h2>Technical Skills</h2>
            <ResumeSkills />
            <h2>Certifications</h2>
            {certifications.map((c) => (
              <p key={c.title}>
                {c.title} — {c.issuer} · {c.date}
              </p>
            ))}
          </section>
          <section id="resume-projects" className="resume-section">
            <h2>Projects</h2>
            {projects.map((p) => (
              <article key={p.slug} className="resume-project">
                <h3>
                  <Link href={`/projects/${p.slug}`}>
                    {p.title}
                    <ArrowUpRight size={18} />
                  </Link>
                </h3>
                <p>{p.description}</p>
                <p>{p.techStack.join(" · ")}</p>
                {p.githubUrl && <a href={p.githubUrl}>{p.githubUrl}</a>}
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
