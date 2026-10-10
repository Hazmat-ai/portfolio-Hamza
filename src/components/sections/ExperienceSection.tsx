import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollHeading } from "@/components/ui/ScrollHeading";
import { experience } from "@/data/experience";
export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <FadeIn>
          <div className="section-intro">
            <div>
              <ScrollHeading id="experience-heading">
                Every role. A new perspective.
              </ScrollHeading>
            </div>
            <p>
              Building software, supporting students, and working with teams
              across engineering and beyond.
            </p>
          </div>
        </FadeIn>
        <div className="experience-timeline">
          <div className="career-line" aria-hidden="true">
            <div className="career-line-fill" />
          </div>
          {experience.map((item, i) => (
            <FadeIn key={item.title}>
              <article className="experience-row">
                <div className="experience-date">
                  <span className="timeline-marker" />
                  <span className="mono">{item.dates}</span>
                  <p>{item.location}</p>
                  {i === 0 && (
                    <span className="current-label">Current internship</span>
                  )}
                </div>
                <div className="experience-content">
                  <h3>{item.title}</h3>
                  <p className="organization">{item.organization}</p>
                  <details open={i === 0} className="experience-details">
                    <summary>Responsibilities &amp; contributions</summary>
                    <ul>
                      {item.description.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </details>
                  {!!item.technologies?.length && (
                    <div className="project-stack">
                      {item.technologies.map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
