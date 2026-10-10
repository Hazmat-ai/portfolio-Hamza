"use client";
import { SlidingControls } from "@/components/ui/SlidingControls";
import {
  useEffect,
  useRef,
  useState,
  ViewTransition,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/ui/Icons";
const studyChapters = [
  {
    label: "The experience",
    title: "Your notes. A new way to learn.",
    description:
      "StudyMind turns notes and PDFs into flashcards, summaries, practice questions, and key concept breakdowns.",
    image: "/assets/projects/studymind/home.webp",
    alt: "Original StudyMind empty study workspace",
    tech: ["React", "Tailwind CSS"],
  },
  {
    label: "Under the surface",
    title: "A thoughtful pipeline. End to end.",
    description:
      "A FastAPI backend coordinates PDF parsing and Claude API generation. PostgreSQL persists study sets behind JWT authentication.",
    image: "/assets/projects/studymind/auth.webp",
    alt: "Original StudyMind sign-in screen; backend architecture is described in the accompanying text",
    tech: ["FastAPI", "PyMuPDF", "Claude API", "PostgreSQL", "JWT"],
  },
  {
    label: "The result",
    title: "Less reformatting. More studying.",
    description:
      "Structured materials, saved study sets, and multiple ways to revisit a concept — all in one full-stack application.",
    image: "/assets/projects/studymind/home.webp",
    alt: "Original StudyMind note input and upload interface",
    tech: ["Python", "SQLAlchemy", "React"],
  },
];
export function FeaturedStory({
  project = "studymind",
}: {
  project?: "studymind" | "campaign-os";
}) {
  const campaign = project === "campaign-os";
  const title = campaign ? "campaignOS" : "StudyMind";
  const chapters = campaign
    ? [
        {
          label: "The starting point",
          title: "An idea. A clearer brief.",
          description:
            "campaignOS brings campaign planning into a guided React interface with a choice of formats and a structured brief.",
          image: "/assets/projects/campaign-os/home.webp",
          alt: "Original campaignOS home screen captured locally",
          tech: ["React", "JavaScript", "CSS"],
        },
        {
          label: "The workflow",
          title: "Give the campaign direction.",
          description:
            "The original frontend asks for the idea, audience, and goal before generation. This capture shows the real empty brief, with no fabricated campaign output.",
          image: "/assets/projects/campaign-os/brief.webp",
          alt: "Original campaignOS empty campaign brief captured locally",
          tech: ["React", "localStorage"],
        },
      ]
    : studyChapters;
  const root = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current || !visual.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
          mm.add(
            "(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
            () => {
              const frames = gsap.utils.toArray<HTMLElement>(".story-frame");
              const steps = gsap.utils.toArray<HTMLElement>(".story-chapter");
              const pin = ScrollTrigger.create({
                trigger: root.current,
                start: "top 112px",
                end: "bottom bottom-=60px",
                pin: visual.current,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              });
              steps.forEach((step, i) => {
                ScrollTrigger.create({
                  trigger: step,
                  start: "top center",
                  end: "bottom center",
                  onEnter: () => setActive(i),
                  onEnterBack: () => setActive(i),
                });
                if (i > 0) {
                  gsap.fromTo(
                    frames[i],
                    { opacity: 0, scale: 1.06 },
                    {
                      opacity: 1,
                      scale: 1,
                      ease: "none",
                      scrollTrigger: {
                        trigger: step,
                        start: "top 55%",
                        end: "top 45%",
                        scrub: 0.4,
                      },
                    },
                  );
                }
              });
              return () => {
                pin.kill();
              };
            },
          );
        }, root);
        void document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        cleanup = () => {
          mm.revert();
          ctx.revert();
        };
      },
    );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  const select = (i: number) => {
    setActive(i);
    const mobile = window.matchMedia(
      "(max-width: 1023px), (max-height: 649px), (prefers-reduced-motion: reduce)",
    ).matches;
    if (!mobile)
      root.current
        ?.querySelectorAll(".story-chapter")
        [i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <div className="featured-story" ref={root} data-project={project}>
      <div className="story-visual-column">
        <div className="story-visual" ref={visual}>
          <ViewTransition
            name={`project-${project}-story`}
            share="project-morph"
            default="none"
          >
            <div
              className="story-gallery"
              data-transition-id={`project-${project}-story`}
              data-project-src={chapters[active].image}
              aria-label={`${title} visual gallery`}
            >
              {chapters.map((chapter, i) => (
                <div
                  className={`story-frame ${i === active ? "active-frame" : ""}`}
                  key={chapter.label}
                  style={
                    {
                      "--chapter-offset": `${i < active ? -20 : 20}px`,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    width={1000}
                    height={650}
                    sizes="(max-width: 1023px) 100vw, 60vw"
                  />
                </div>
              ))}
              <span className="preview-label">
                Original frontend · local captures
              </span>
            </div>
          </ViewTransition>
          <SlidingControls
            className="story-gallery-controls"
            label={`Explore ${title} chapters`}
          >
            {chapters.map((chapter, i) => (
              <button
                type="button"
                key={chapter.label}
                aria-pressed={active === i}
                onClick={() => select(i)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {chapter.label}
              </button>
            ))}
          </SlidingControls>
        </div>
      </div>
      <div className="story-chapters">
        {chapters.map((chapter, i) => (
          <article className="story-chapter" key={chapter.label}>
            <span className="section-label">
              {String(i + 1).padStart(2, "0")} / {chapter.label}
            </span>
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
            <div className="project-stack">
              {chapter.tech.map((t) => (
                <span className="tech-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            {i === chapters.length - 1 && (
              <div className="story-links">
                <Link href={`/projects/${project}`} className="btn-primary">
                  Explore {title} <ArrowUpRight size={16} />
                </Link>
                <a
                  href={
                    campaign
                      ? "https://github.com/Hazmat-ai/Campaign-app"
                      : "https://github.com/Hazmat-ai/StudyMind"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="story-source"
                >
                  <Github size={16} />
                  View source
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
