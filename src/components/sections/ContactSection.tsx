"use client";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
const EMAIL = "hamzarizvi006@gmail.com";
export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact-content contact-layout">
          <div className="contact-intro">
            <FadeIn delay={0.1}>
              <h2 id="contact-heading">
                Let’s build
                <br />
                something
                <br />
                <span className="serif-accent">worth using.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <span className="status">
                <span />
                Available for co-op opportunities
              </span>
            </FadeIn>
          </div>
          <div className="contact-conversation">
            <FadeIn delay={0.2}>
              <p className="contact-description">
                I&apos;m actively seeking co-op opportunities and always open to
                discussing interesting projects, collaborations, or full-time
                roles after graduation. Reach out via email or connect on
                LinkedIn.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <span className="sr-only" role="status">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
              <div className="contact-email">
                <span className="section-label">Start a conversation</span>
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label={`Send email to ${EMAIL}`}
                >
                  {EMAIL}
                  <ArrowUpRight size={20} />
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
                  {copied ? "Copied" : "Copy email address"}
                </button>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="contact-links">
                <a
                  href="https://github.com/Hazmat-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile"
                >
                  <Github size={17} />
                  GitHub
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href="https://www.linkedin.com/in/hamzarizvi-cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin size={17} />
                  LinkedIn
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-primary"
                aria-label="Send email"
              >
                Let’s talk
                <ArrowUpRight size={17} />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
