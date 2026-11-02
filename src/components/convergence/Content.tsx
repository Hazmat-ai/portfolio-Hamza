"use client";
/* Approved content, rendered as React JSX. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ThemeToggle,
  PortfolioTabs,
  DemoBadge,
  DocumentLibrary,
} from "./Controls";
export type Tab = "cs" | "ux" | "resume";
export interface ContentActions {
  tab: Tab;
  onTab: (tab: Tab) => void;
  onProject: (key: string) => void;
  onDocument: (key: string) => void;
  onReplay: () => void;
}

export function SiteHeader({ actions }: { actions: ContentActions }) {
  return (
    <header>
      <nav aria-label="Main navigation" className="wrap">
        <Link
          className="brand"
          href="/"
          aria-label="Hamza Rizvi home"
          onClick={(event) => {
            // Keep normal navigation and modified-click behavior on other routes.
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              window.location.pathname !== "/"
            )
              return;
            event.preventDefault();
            actions.onTab("cs");
            window.history.replaceState(window.history.state, "", "/");
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
          }}
        >
          {"Hamza Rizvi"}
          <span aria-hidden="true" className="dot"></span>
        </Link>
        <div className="navlinks">
          <a href="#work">{"Work"}</a>
          <a href="#work" onClick={() => actions.onTab("ux")}>
            {"UX Design"}
          </a>
          <a href="#about">{"About"}</a>
          <a href="#contact">{"Contact"}</a>
          <button
            className="textbtn optional"
            id="resume"
            onClick={() => actions.onTab("resume")}
          >
            {"Résumé"}
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export function HeroSection({ actions }: { actions: ContentActions }) {
  return (
    <section className="hero">
      <div>
        <p className="identity">
          <i aria-hidden="true"></i>
          {"Computer Science + UX Design"}
        </p>
        <h1>
          {"Hamza"}
          <span className="last">{"Rizvi."}</span>
        </h1>
        <p className="bio">
          {
            "I build software, test the experience, and keep asking where it gets confusing."
          }
        </p>
        <p className="small muted" style={{ marginTop: "16px" }}>
          {"Computer Science · UX Design minor · Wilfrid Laurier"}
        </p>
        <div className="actions">
          <a
            className="btn primary"
            href="#work"
            onClick={() => actions.onTab("cs")}
          >
            {"Explore my work "}
            <span aria-hidden="true">{"↓"}</span>
          </a>
          <button
            className="textbtn"
            id="motionButton"
            onClick={actions.onReplay}
          >
            {"Replay clip"}
          </button>
        </div>
      </div>
      <div className="specimen">
        <div className="specimen-labels">
          <div className="blue">
            {"Computer Science"}
            <span>{"Structure. Systems. Implementation."}</span>
          </div>
          <div className="red">
            {"UX Design"}
            <span>{"Research. Clarity. Interaction."}</span>
          </div>
        </div>
        <p className="caption">
          {"Two disciplines. One way of making things."}
        </p>
      </div>
    </section>
  );
}

export function WorkSection({ actions }: { actions: ContentActions }) {
  return (
    <section className="section" id="work">
      <div className="sectionhead">
        <h2>{"My work."}</h2>
        <p className="muted">
          {
            "Software, research, and the experience behind both. Pick a discipline or open my résumé."
          }
        </p>
      </div>
      <PortfolioTabs active={actions.tab} onChange={actions.onTab} />
      <div
        aria-labelledby="tab-cs"
        id="panel-cs"
        role="tabpanel"
        tabIndex={0}
        hidden={actions.tab !== "cs"}
      >
        <p className="panel-intro muted">
          {"Software, machine learning, mobile apps and robotics."}
        </p>
        <div className="workgrid">
          <button
            className="workitem"
            data-category="software"
            data-project="studymind"
            onClick={() => actions.onProject("studymind")}
          >
            <div className="workimage">
              <img
                alt="StudyMind interface capture from the existing portfolio"
                loading="lazy"
                src="/convergence/assets/studymind.webp"
              />
            </div>
            <div className="workmeta">
              <div>
                <span className="type blue">{"Software / full stack"}</span>
                <h3>{"StudyMind"}</h3>
                <p>{"From lecture notes to a study session."}</p>
              </div>
              <span aria-hidden="true" className="arrow">
                {"↗"}
              </span>
            </div>
            <DemoBadge project="studymind" />
          </button>
          <button
            className="workitem"
            data-category="software"
            data-project="asl"
            onClick={() => actions.onProject("asl")}
          >
            <div className="workimage">
              <img
                alt="ASL project interface capture from the existing portfolio"
                loading="lazy"
                src="/convergence/assets/asl.webp"
              />
            </div>
            <div className="workmeta">
              <div>
                <span className="type blue">
                  {"Software / camera interaction"}
                </span>
                <h3>{"ASL hand-sign prototype."}</h3>
                <p>{"Exploring feedback for selected static hand shapes."}</p>
              </div>
              <span aria-hidden="true" className="arrow">
                {"↗"}
              </span>
            </div>
            <DemoBadge project="asl" />
          </button>
        </div>
        <div className="project-list">
          <button
            className="project-row"
            data-project="smart-write"
            onClick={() => actions.onProject("smart-write")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/smart-write.svg"
                alt="Inference pipeline overview"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Inference pipeline overview ↗"}
            </span>
            <span className="project-number mono">{"01"}</span>
            <span>
              <span className="type blue">{"AI / Machine Learning"}</span>
              <span className="project-title">{"Smart Write"}</span>
              <span className="project-summary muted">
                {
                  "Handwriting recognition app with a custom PyTorch CNN classifying 47 character classes."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="smart-write" />
          </button>
          <button
            className="project-row"
            data-project="campaign-os"
            onClick={() => actions.onProject("campaign-os")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/campaign.jpg"
                alt="Frame from the actual app walkthrough"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Frame from the actual app walkthrough ↗"}
            </span>
            <span className="project-number mono">{"02"}</span>
            <span>
              <span className="type blue">{"Full Stack"}</span>
              <span className="project-title">{"campaignOS"}</span>
              <span className="project-summary muted">
                {
                  "AI-powered marketing campaign generator using the Claude API to produce structured campaign plans."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="campaign-os" />
          </button>
          <button
            className="project-row"
            data-project="fitforge"
            onClick={() => actions.onProject("fitforge")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/fitforge.jpg"
                alt="Actual browser companion / routine builder"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Actual browser companion / routine builder ↗"}
            </span>
            <span className="project-number mono">{"03"}</span>
            <span>
              <span className="type blue">{"Mobile Development"}</span>
              <span className="project-title">{"FitForge"}</span>
              <span className="project-summary muted">
                {
                  "iOS fitness app built with Swift and SwiftUI for workout planning, tracking, and nutrition."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="fitforge" />
          </button>
          <button
            className="project-row"
            data-project="arns-travel-system"
            onClick={() => actions.onProject("arns-travel-system")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/arns.jpg"
                alt="Frame from the actual Java app walkthrough"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Frame from the actual Java app walkthrough ↗"}
            </span>
            <span className="project-number mono">{"04"}</span>
            <span>
              <span className="type blue">{"Full Stack"}</span>
              <span className="project-title">{"ARNS Travel System"}</span>
              <span className="project-summary muted">
                {
                  "Java desktop application for travel planning and reservation management with a layered OOP architecture."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="arns-travel-system" />
          </button>
          <button
            className="project-row"
            data-project="jetson-nano-robot"
            onClick={() => actions.onProject("jetson-nano-robot")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/jetson.svg"
                alt="Hardware architecture overview"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Hardware architecture overview ↗"}
            </span>
            <span className="project-number mono">{"05"}</span>
            <span>
              <span className="type blue">{"Robotics / Embedded Systems"}</span>
              <span className="project-title">
                {"Jetson Nano Face Detection Robot"}
              </span>
              <span className="project-summary muted">
                {
                  "Robotics project combining a mobile chassis with Jetson Nano-powered face detection and age estimation."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="jetson-nano-robot" />
          </button>
          <button
            className="project-row"
            data-project="tcp-converter"
            onClick={() => actions.onProject("tcp-converter")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/tcp.jpg"
                alt="Actual conversion-logic browser adaptation"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Actual conversion-logic browser adaptation ↗"}
            </span>
            <span className="project-number mono">{"06"}</span>
            <span>
              <span className="type blue">{"Full Stack"}</span>
              <span className="project-title">
                {"TCP Multi-Service Converter"}
              </span>
              <span className="project-summary muted">
                {
                  "Python TCP client–server application supporting concurrent currency, temperature, length, and weight conversions."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="tcp-converter" />
          </button>
          <button
            className="project-row"
            data-project="arm-cortex-simulator"
            onClick={() => actions.onProject("arm-cortex-simulator")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/arm.jpg"
                alt="Actual simulator with generated sensor data"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Actual simulator with generated sensor data ↗"}
            </span>
            <span className="project-number mono">{"07"}</span>
            <span>
              <span className="type blue">{"Robotics / Embedded Systems"}</span>
              <span className="project-title">
                {"ARM Cortex-M Sensor Simulator"}
              </span>
              <span className="project-summary muted">
                {
                  "Interactive browser simulator visualizing ARM Thumb polling loops and GPIO threshold alerts across Cortex-M variants."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="arm-cortex-simulator" />
          </button>
          <button
            className="project-row"
            data-project="hubspot-integration"
            onClick={() => actions.onProject("hubspot-integration")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/hubspot.svg"
                alt="CRM integration overview"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"CRM integration overview ↗"}
            </span>
            <span className="project-number mono">{"08"}</span>
            <span>
              <span className="type blue">{"Full Stack"}</span>
              <span className="project-title">{"HubSpot CRM Integration"}</span>
              <span className="project-summary muted">
                {
                  "Node.js/Express app integrating the HubSpot API to create and display custom CRM object records."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="hubspot-integration" />
          </button>
          <button
            className="project-row"
            data-project="vex-robotics"
            onClick={() => actions.onProject("vex-robotics")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/vex.svg"
                alt="Competition engineering overview"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Competition engineering overview ↗"}
            </span>
            <span className="project-number mono">{"09"}</span>
            <span>
              <span className="type blue">{"Robotics / Embedded Systems"}</span>
              <span className="project-title">
                {"VEX V5 Competition Robotics"}
              </span>
              <span className="project-summary muted">
                {
                  "Multi-season VEX V5 competition robotics: drivetrain design, motor control, and team World Championship qualification."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="vex-robotics" />
          </button>
          <button
            className="project-row"
            data-project="fpv-racing-sim"
            onClick={() => actions.onProject("fpv-racing-sim")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/fpv.svg"
                alt="Camera signal-path overview"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Camera signal-path overview ↗"}
            </span>
            <span className="project-number mono">{"10"}</span>
            <span>
              <span className="type blue">{"Robotics / Embedded Systems"}</span>
              <span className="project-title">{"FPV Racing Simulation"}</span>
              <span className="project-summary muted">
                {
                  "FPV simulation integrating camera modules with live video feeds for a first-person viewing experience."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="fpv-racing-sim" />
          </button>
          <button
            className="project-row"
            data-project="mood-picker"
            onClick={() => actions.onProject("mood-picker")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/mood-picker.svg"
                alt="Preference-matching algorithm overview"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Preference-matching algorithm overview ↗"}
            </span>
            <span className="project-number mono">{"11"}</span>
            <span>
              <span className="type blue">{"Full Stack"}</span>
              <span className="project-title">{"Mood Project Picker"}</span>
              <span className="project-summary muted">
                {
                  "Self-reported preferences become a project brief through weighted matching."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="mood-picker" />
          </button>
          <button
            className="project-row"
            data-project="remnant"
            onClick={() => actions.onProject("remnant")}
          >
            <span className="project-preview">
              <img
                src="/convergence/assets/project-previews/remnant.jpg"
                alt="Frame from the actual CLI walkthrough"
                loading="lazy"
              />
            </span>
            <span className="preview-caption">
              {"Frame from the actual CLI walkthrough ↗"}
            </span>
            <span className="project-number mono">{"12"}</span>
            <span>
              <span className="type blue">{"Offline tools"}</span>
              <span className="project-title">{"REMNANT"}</span>
              <span className="project-summary muted">
                {
                  "An offline knowledge library and prerequisite-aware community skill planner."
                }
              </span>
            </span>
            <span aria-hidden="true" className="arrow">
              {"↗"}
            </span>
            <DemoBadge project="remnant" />
          </button>
        </div>
        <details className="repo-index">
          <summary>{"All GitHub repositories"}</summary>
          <p className="small muted">
            {"Projects, coursework and supporting repositories from Hazmat-ai."}
          </p>
          <div className="repo-links">
            <a
              href="https://github.com/Hazmat-ai/Vibecode_projects"
              rel="noopener"
              target="_blank"
            >
              {"Vibecode_projects "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/ASL_Recognition"
              rel="noopener"
              target="_blank"
            >
              {"ASL_Recognition "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/CP264"
              rel="noopener"
              target="_blank"
            >
              {"CP264 "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/StudyMind"
              rel="noopener"
              target="_blank"
            >
              {"StudyMind "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/CP372"
              rel="noopener"
              target="_blank"
            >
              {"CP372 "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/Workout-app"
              rel="noopener"
              target="_blank"
            >
              {"Workout-app "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/Hubspot_integration-"
              rel="noopener"
              target="_blank"
            >
              {"Hubspot_integration- "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/Mood-Analyzer-Project-Selector"
              rel="noopener"
              target="_blank"
            >
              {"Mood-Analyzer-Project-Selector "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/Hazmat-ai"
              rel="noopener"
              target="_blank"
            >
              {"Hazmat-ai "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/introduction-to-github"
              rel="noopener"
              target="_blank"
            >
              {"introduction-to-github "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/REMNANT"
              rel="noopener"
              target="_blank"
            >
              {"REMNANT "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/portfolio-Hamza"
              rel="noopener"
              target="_blank"
            >
              {"portfolio-Hamza "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/tcp-converter-2.0"
              rel="noopener"
              target="_blank"
            >
              {"tcp-converter-2.0 "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/CP_216"
              rel="noopener"
              target="_blank"
            >
              {"CP_216 "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/Campaign-app"
              rel="noopener"
              target="_blank"
            >
              {"Campaign-app "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a
              href="https://github.com/Hazmat-ai/ARNS_Travel_System"
              rel="noopener"
              target="_blank"
            >
              {"ARNS_Travel_System "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
          </div>
        </details>
      </div>
      <div
        aria-labelledby="tab-ux"
        id="panel-ux"
        role="tabpanel"
        tabIndex={0}
        hidden={actions.tab !== "ux"}
      >
        <p className="panel-intro muted">
          {
            "Research, interaction design and the documents behind the decisions."
          }
        </p>
        <div className="workgrid">
          <button
            className="workitem"
            data-category="ux"
            data-project="lotus"
            onClick={() => actions.onProject("lotus")}
          >
            <div className="workimage lotus">
              <img
                alt="Cover of Hamza’s Lotus card-sorting research report"
                loading="lazy"
                src="/convergence/assets/lotus-cover.png"
              />
            </div>
            <div className="workmeta">
              <div>
                <span className="type red">
                  {"UX / information architecture"}
                </span>
                <h3>{"Lotus, reorganized."}</h3>
                <p>{"When the categories don’t match the people."}</p>
              </div>
              <span aria-hidden="true" className="arrow">
                {"↗"}
              </span>
            </div>
          </button>
          <button
            className="workitem"
            data-category="ux"
            data-project="koenigsegg"
            onClick={() => actions.onProject("koenigsegg")}
          >
            <div className="workimage ux-document">
              <img
                src="/convergence/assets/ux-previews/3ugm54bg5rnw0g8/001.webp"
                alt="Original Koenigsegg research plan cover"
                loading="lazy"
              />
            </div>
            <div className="workmeta">
              <div>
                <span className="type red">
                  {"UX / collaborative research"}
                </span>
                <h3>{"Koenigsegg research."}</h3>
                <p>{"Keeping the spectacle. Finding the information."}</p>
                <p className="small">{"Original research plan preview."}</p>
              </div>
              <span aria-hidden="true" className="arrow">
                {"↗"}
              </span>
            </div>
          </button>
          <button
            className="workitem"
            data-project="gamified"
            onClick={() => actions.onProject("gamified")}
          >
            <div className="workimage ux-document">
              <img
                src="/convergence/assets/ux-previews/s3hisb19oyrsg9m/001.webp"
                alt="Original gamified-learning whiteboard overview"
                loading="lazy"
              />
            </div>
            <div className="workmeta">
              <div>
                <span className="type red">{"UX100 / Design Thinking"}</span>
                <h3>{"Gamified learning platform"}</h3>
                <p>{"Learning through courses, games and practice."}</p>
              </div>
              <span aria-hidden="true" className="arrow">
                {"↗"}
              </span>
            </div>
          </button>
          <button
            className="workitem"
            data-project="wellness"
            onClick={() => actions.onProject("wellness")}
          >
            <div className="workimage ux-document">
              <img
                src="/convergence/assets/ux-previews/29n5hhvlvjp6goy/001.webp"
                alt="Original Wellness Hero design sprint page"
                loading="lazy"
              />
            </div>
            <div className="workmeta">
              <div>
                <span className="type red">{"UX103 / UX Strategy"}</span>
                <h3>{"Wellness Hero"}</h3>
                <p>
                  {"Planning a wellbeing experience through a design sprint."}
                </p>
              </div>
              <span aria-hidden="true" className="arrow">
                {"↗"}
              </span>
            </div>
          </button>
        </div>
        <section className="section" id="ux">
          <div className="researchintro">
            <h2>
              {"The work"}
              <br />
              {"behind the screens."}
            </h2>
            <div>
              <p>
                {
                  "Plans, interviews, test sessions and revisions. The source documents stay close to the decisions they informed."
                }
              </p>
              <p className="muted small" style={{ marginTop: "18px" }}>
                {
                  "Coursework collection: 10 Canva documents and 2 PDFs. Open a collection to explore its sources."
                }
              </p>
            </div>
          </div>
          <DocumentLibrary onDocument={actions.onDocument} />
          <article className="lotusfeature">
            <div>
              <p className="small red">{"Lotus / UX205"}</p>
              <h3>{"The category users didn’t expect."}</h3>
              <p>
                {
                  "Only one of five participants put “Compare models” in Compare. That challenged the proposed structure, rather than confirming it."
                }
              </p>
              <p className="small muted" style={{ marginTop: "14px" }}>
                {"Five completed sorts · 20 cards · directional findings."}
              </p>
              <button
                className="btn"
                data-project="lotus"
                onClick={() => actions.onProject("lotus")}
              >
                {"Read the case study "}
                <span aria-hidden="true">{"↗"}</span>
              </button>
            </div>
            <img
              alt="The supplied 30-page Lotus sitemap with its five top-level categories"
              loading="lazy"
              src="/convergence/assets/lotus-sitemap.png"
            />
          </article>
        </section>
      </div>
      <div
        aria-labelledby="tab-resume"
        id="panel-resume"
        role="tabpanel"
        tabIndex={0}
        hidden={actions.tab !== "resume"}
      >
        <div className="resume-heading">
          <div>
            <p className="small blue">{"Résumé"}</p>
            <h3>{"Hamza Rizvi."}</h3>
            <p className="muted">
              {"Software Developer · Computer Science + UX Design"}
            </p>
            <p className="small">
              <a href="mailto:hamzarizvi006@gmail.com">
                {"hamzarizvi006@gmail.com"}
              </a>
              {" · "}
              <a
                href="https://github.com/Hazmat-ai"
                rel="noopener"
                target="_blank"
              >
                {"GitHub"}
              </a>
              {" · "}
              <a
                href="https://www.linkedin.com/in/hamzarizvi-cs"
                rel="noopener"
                target="_blank"
              >
                {"LinkedIn"}
              </a>
            </p>
          </div>
          <button
            className="btn"
            id="printResume"
            onClick={() => window.print()}
          >
            {"Print / save PDF ↗"}
          </button>
        </div>
        <div className="resume-layout">
          <aside>
            <h3>{"Education"}</h3>
            <p>
              {"Wilfrid Laurier University"}
              <br />
              {"Milton Campus"}
            </p>
            <p className="muted small">
              {"BSc Computer Science"}
              <br />
              {"UX Design Minor · Co-op"}
              <br />
              {"Expected graduation: August 2028"}
            </p>
            <h3>{"Skills"}</h3>
            <h4>{"Programming Languages"}</h4>
            <p className="small muted">
              {
                "Python · TypeScript · JavaScript · Java · Swift · C/C++ · HTML · CSS"
              }
            </p>
            <h4>{"Frontend Development"}</h4>
            <p className="small muted">
              {
                "React · Next.js · Vite · Tailwind CSS · SwiftUI · Radix UI · MediaPipe"
              }
            </p>
            <h4>{"Backend & APIs"}</h4>
            <p className="small muted">
              {"FastAPI · Node.js · Express · REST APIs · GraphQL · Pug · JWT"}
            </p>
            <h4>{"Databases"}</h4>
            <p className="small muted">
              {"PostgreSQL · SQLAlchemy · localStorage"}
            </p>
            <h4>{"AI / Machine Learning"}</h4>
            <p className="small muted">
              {
                "PyTorch · Torchvision · OpenCV · Claude API · MediaPipe · Computer Vision · CNN"
              }
            </p>
            <h4>{"Developer Tools"}</h4>
            <p className="small muted">
              {
                "Git · GitHub · VS Code · Eclipse IDE · Xcode · Postman · Javadoc"
              }
            </p>
            <h4>{"Cloud & Deployment"}</h4>
            <p className="small muted">{"Vercel · GitHub Actions · npm"}</p>
            <h4>{"Embedded Systems & Robotics"}</h4>
            <p className="small muted">
              {
                "NVIDIA Jetson Nano · Arduino · Raspberry Pi · VEX V5 · VEXcode · ARM Assembly · TETRIX Platform"
              }
            </p>
          </aside>
          <div>
            <h3>{"Experience"}</h3>
            <article className="resume-role">
              <h4>{"Software Development Intern"}</h4>
              <p>
                {
                  "Ministry of Public and Business Service Delivery and Procurement, Ontario Government"
                }
              </p>
              <p className="small muted">
                {"Aug 2026 – Jan 2027 · Ontario, Canada"}
              </p>
              <p>{"Build internal websites for industry use."}</p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Work with businesses on tax-law and anti-money-laundering compliance."
                    }
                  </li>
                  <li>
                    {
                      "Work with databases, servers, and data schemas across projects using different programming languages and AI tools."
                    }
                  </li>
                  <li>
                    {
                      "Use Azure, VS Code, Git, and GitHub in development workflows."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <article className="resume-role">
              <h4>{"IT Teaching Assistant"}</h4>
              <p>{"Wilfrid Laurier University"}</p>
              <p className="small muted">
                {"Jan 2026 – Apr 2026 · Milton, ON"}
              </p>
              <p>
                {
                  "Supported instruction for IT courses, reinforcing concepts and helping students work through technical problems."
                }
              </p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Communicated structured technical material to 100+ students, adapting explanations to different learning needs."
                    }
                  </li>
                  <li>
                    {
                      "Provided one-on-one and small-group support during labs and office hours."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <article className="resume-role">
              <h4>
                {"Student Instructional Assistant — Calculus & Functions"}
              </h4>
              <p>{"Wilfrid Laurier University"}</p>
              <p className="small muted">
                {"Aug 2025 – Apr 2026 · Milton, ON"}
              </p>
              <p>
                {
                  "Provided academic support for Calculus and Functions courses, reinforcing quantitative reasoning and problem-solving approaches."
                }
              </p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Held regular office hours and study sessions for groups of students, clarifying concepts and reviewing assignments."
                    }
                  </li>
                  <li>
                    {
                      "Developed explanations for complex mathematical topics tailored to first-year computer science students."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <article className="resume-role">
              <h4>{"Head of Competition"}</h4>
              <p>{"WLU Robotics"}</p>
              <p className="small muted">{"Nov 2025 – Present · Milton, ON"}</p>
              <p>
                {
                  "Lead competition logistics for WLU Robotics, coordinating team participation in robotics events and managing timelines."
                }
              </p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Organize team preparation, competition registration, and post-event reviews to support continuous improvement."
                    }
                  </li>
                  <li>
                    {
                      "Collaborate with team leads across design and programming subgroups to align on competition strategy."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <article className="resume-role">
              <h4>{"Student Ambassador"}</h4>
              <p>{"Wilfrid Laurier University"}</p>
              <p className="small muted">{"Jan 2025 – Present · Milton, ON"}</p>
              <p>
                {
                  "Represented Wilfrid Laurier University at prospective student events, open houses, and campus tours."
                }
              </p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Contributed to a 25% increase in prospective student inquiries through audience-tailored communication and event engagement."
                    }
                  </li>
                  <li>
                    {
                      "Collaborated with university staff to coordinate event logistics and ensure consistent, accurate information delivery."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <article className="resume-role">
              <h4>{"Website Usability Tester"}</h4>
              <p>{"Betlabs"}</p>
              <p className="small muted">{"Mar 2026 – Present · Remote"}</p>
              <p>
                {
                  "Conducted structured usability testing sessions, documenting user behaviour observations and interface friction points."
                }
              </p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Produced written feedback reports communicating findings to cross-functional stakeholders."
                    }
                  </li>
                  <li>
                    {
                      "Applied UX evaluation methods to identify usability issues and prioritize improvements."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <article className="resume-role">
              <h4>{"iOS Developer (Co-op)"}</h4>
              <p>{"Swift Developer Program"}</p>
              <p className="small muted">{"Jan 2024 – Jun 2024 · Remote"}</p>
              <p>
                {
                  "Completed a structured iOS development program, building applications in Swift and SwiftUI."
                }
              </p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Developed FitForge, a workout and nutrition tracking application, as a capstone project."
                    }
                  </li>
                  <li>
                    {
                      "Gained hands-on experience with Swift Concurrency, data modelling, and SwiftUI component architecture."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <article className="resume-role">
              <h4>{"Guide / Technician"}</h4>
              <p>{"Minecraft Experience"}</p>
              <p className="small muted">
                {"Jun 2025 – Sep 2025 · Mississauga, ON"}
              </p>
              <p>
                {
                  "Provided technical support and guided visitors through an interactive Minecraft-themed experience with 1,000+ daily visitors."
                }
              </p>
              <details>
                <summary>{"Responsibilities & contributions"}</summary>
                <ul>
                  <li>
                    {
                      "Diagnosed and resolved hardware and software issues under operational pressure to maintain uptime."
                    }
                  </li>
                  <li>
                    {
                      "Collaborated cross-functionally with operations staff to manage high visitor volumes and ensure consistent experience quality."
                    }
                  </li>
                </ul>
              </details>
            </article>
            <h3 className="resume-subheading">{"Certifications"}</h3>
            <ul className="certifications">
              <li>
                {"Claude API Development"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Claude Code 101"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Claude Code in Action"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Claude 101"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Model Context Protocol (MCP) Fundamentals & Advanced Topics"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"AI Fluency Framework & Foundations"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"AI Fluency for Students, Educators, and Nonprofits"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Introduction to Agent Skills"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Introduction to Subagents"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Claude with Vertex AI"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
              <li>
                {"Claude in Amazon Bedrock"}
                <span className="small muted">{"Anthropic · Apr 2026"}</span>
              </li>
            </ul>
            <h3 className="resume-subheading">{"Projects"}</h3>
            <div className="resume-projects">
              <a
                data-open-project="studymind"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("studymind");
                }}
              >
                {"StudyMind "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="smart-write"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("smart-write");
                }}
              >
                {"Smart Write "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="campaign-os"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("campaign-os");
                }}
              >
                {"campaignOS "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="asl-recognition"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("asl-recognition");
                }}
              >
                {"ASL Hand-Sign Recognition "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="fitforge"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("fitforge");
                }}
              >
                {"FitForge "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="arns-travel-system"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("arns-travel-system");
                }}
              >
                {"ARNS Travel System "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="jetson-nano-robot"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("jetson-nano-robot");
                }}
              >
                {"Jetson Nano Face Detection Robot "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="tcp-converter"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("tcp-converter");
                }}
              >
                {"TCP Multi-Service Converter "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="arm-cortex-simulator"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("arm-cortex-simulator");
                }}
              >
                {"ARM Cortex-M Sensor Simulator "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="hubspot-integration"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("hubspot-integration");
                }}
              >
                {"HubSpot CRM Integration "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="vex-robotics"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("vex-robotics");
                }}
              >
                {"VEX V5 Competition Robotics "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="fpv-racing-sim"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("fpv-racing-sim");
                }}
              >
                {"FPV Racing Simulation "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="mood-picker"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("mood-picker");
                }}
              >
                {"Mood Project Picker "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
              <a
                data-open-project="remnant"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  actions.onProject("remnant");
                }}
              >
                {"REMNANT "}
                <span aria-hidden="true">{"↗"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ actions }: { actions: ContentActions }) {
  return (
    <section className="section about" id="about">
      <div>
        <h2>
          {"A little"}
          <br />
          {"outside the IDE."}
        </h2>
        <img
          alt="Hamza signature from the existing portfolio"
          className="signature"
          src="/convergence/assets/signature.svg"
        />
      </div>
      <div>
        <p>
          {
            "I’m a Computer Science student with a UX Design minor at Laurier. I’m interested in the handoff between what a system can do and what a person can understand."
          }
        </p>
        <div className="experiences">
          <div className="experience">
            <div>{"Ontario Government"}</div>
            <span>{"Software development co-op"}</span>
          </div>
          <div className="experience">
            <div>{"Wilfrid Laurier University"}</div>
            <span>{"Teaching and student support"}</span>
          </div>
          <div className="experience">
            <div>{"WLU Robotics"}</div>
            <span>{"Competition and teamwork"}</span>
          </div>
        </div>
        <p className="personal">
          {"Sunday soccer, cars, and whatever’s next."}
        </p>
        <button
          className="textbtn"
          id="resumeAbout"
          onClick={() => actions.onTab("resume")}
        >
          {"View my résumé"}
        </button>
      </div>
    </section>
  );
}

export function ContactSection({ actions }: { actions: ContentActions }) {
  return (
    <section className="section contact" id="contact">
      <p className="small muted" style={{ marginBottom: "25px" }}>
        {"Next conversation"}
      </p>
      <h2>
        {"Have something"}
        <br />
        {"worth figuring out?"}
      </h2>
      <div className="links">
        <a
          className="btn primary"
          href="https://github.com/Hazmat-ai"
          rel="noopener"
          target="_blank"
        >
          {"Find me on GitHub ↗"}
        </a>
        <a className="btn" href="mailto:hamzarizvi006@gmail.com">
          {"Email Hamza ↗"}
        </a>
        <a
          className="btn"
          href="https://www.linkedin.com/in/hamzarizvi-cs"
          rel="noopener"
          target="_blank"
        >
          {"LinkedIn ↗"}
        </a>
        <button className="btn" id="replayClip" onClick={actions.onReplay}>
          {"Replay clip"}
        </button>
      </div>
      <div className="footer">
        <span>{"Hamza Rizvi / Computer Science + UX Design"}</span>
        <span>{"Hamza Rizvi"}</span>
        <Link href="/">{"Back to top ↑"}</Link>
      </div>
    </section>
  );
}
