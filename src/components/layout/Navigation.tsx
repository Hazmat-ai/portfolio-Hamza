"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
const links = [
  "Projects",
  "Experience",
  "About",
  "Skills",
  "Education",
  "Contact",
];
export function Navigation() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = () => {
      setCondensed(window.scrollY > 96);
      let current = "";
      for (const label of links) {
        const element = document.getElementById(label.toLowerCase());
        if (element && element.getBoundingClientRect().top <= 160)
          current = label;
      }
      setActive(current);
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
    };
    track();
    window.addEventListener("scroll", track, { passive: true });
    return () => window.removeEventListener("scroll", track);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const first = menu.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const i = nodes.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          nodes.at(-1)?.focus();
        } else if (!e.shiftKey && i === nodes.length - 1) {
          e.preventDefault();
          nodes[0]?.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    document.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  const href = (label: string) =>
    `${pathname === "/" ? "" : "/"}#${label.toLowerCase()}`;
  return (
    <header className="nav-shell">
      <div className="nav-scroll-progress" aria-hidden="true">
        <div ref={progress} />
      </div>
      <div className="container">
        <nav className="nav-inner" aria-label="Primary navigation">
          <Link href="/" className="brand" aria-label="Hamza Rizvi home">
            <BrandLogo compact={condensed} />
          </Link>
          <ul className="nav-desktop">
            {links.map((label) => (
              <li key={label}>
                <a
                  href={href(label)}
                  aria-current={active === label ? "location" : undefined}
                  className={`nav-link ${active === label ? "active" : ""}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            className="nav-resume"
            href="/resume"
            aria-current={pathname === "/resume" ? "page" : undefined}
          >
            Resume <ArrowUpRight size={14} />
          </Link>
          <ThemeToggle />
          <button
            ref={toggle}
            className="mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>
      {open && (
        <div ref={menu} id="mobile-nav" className="mobile-menu">
          {links.map((label) => (
            <a key={label} href={href(label)} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <Link href="/resume" onClick={() => setOpen(false)}>
            Resume
            <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
