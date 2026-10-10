"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ProjectCategory } from "@/data/projects";

interface Origin {
  slug: string;
  name: string;
  src: string;
  href: string;
  top: number;
  scroll: number;
}
interface ProjectNavigation {
  origin: Origin | null;
  category: ProjectCategory | "All";
  setCategory: (category: ProjectCategory | "All") => void;
  campaignState: number;
  setCampaignState: (index: number) => void;
}
const Context = createContext<ProjectNavigation | null>(null);
export function useProjectNavigation() {
  const context = useContext(Context);
  if (!context) throw new Error("Project navigation requires its provider");
  return context;
}

export function ProjectTransitions({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const currentPath = useRef(pathname);
  const pagePositions = useRef(new Map<string, number>());
  const historyNavigation = useRef(false);
  useEffect(() => {
    const remember = () => {
      if (currentPath.current !== "/")
        pagePositions.current.set(currentPath.current, window.scrollY);
    };
    const pop = () => {
      remember();
      historyNavigation.current = true;
    };
    window.addEventListener("scroll", remember, { passive: true });
    window.addEventListener("popstate", pop);
    return () => {
      window.removeEventListener("scroll", remember);
      window.removeEventListener("popstate", pop);
    };
  }, []);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [campaignState, setCampaignState] = useState(0);
  useLayoutEffect(() => {
    const entering = pathname !== "/" && previous.current !== pathname;
    if (entering) {
      document.documentElement.dataset.projectDirection = "forward";
      window.scrollTo({
        top: historyNavigation.current
          ? (pagePositions.current.get(pathname) ?? 0)
          : 0,
        behavior: "instant",
      });
    }
    const returning =
      pathname === "/" && previous.current.startsWith("/projects/") && origin;
    previous.current = pathname;
    currentPath.current = pathname;
    historyNavigation.current = false;
    if (!returning) return;
    const restore = () => {
      const visual = Array.from(
        document.querySelectorAll<HTMLElement>("[data-transition-id]"),
      ).find((el) => el.dataset.transitionId === origin.name);
      const top =
        origin.name.endsWith("-rail") || origin.name.endsWith("-story")
          ? origin.scroll
          : visual
            ? visual.getBoundingClientRect().top + window.scrollY - origin.top
            : origin.scroll;
      window.scrollTo({ top, behavior: "instant" });
    };
    document.documentElement.dataset.projectReturn = "true";
    document.documentElement.dataset.projectDirection = "back";
    restore();
    // Re-align after the homepage's existing pins have been measured.
    window.addEventListener("portfolio:layout-ready", restore, { once: true });
    const timer = window.setTimeout(() => {
      delete document.documentElement.dataset.projectReturn;
    }, 900);
    return () => {
      window.removeEventListener("portfolio:layout-ready", restore);
      window.clearTimeout(timer);
      delete document.documentElement.dataset.projectReturn;
    };
  }, [pathname, origin]);
  return (
    <Context.Provider
      value={{ origin, category, setCategory, campaignState, setCampaignState }}
    >
      <div
        className="project-navigation"
        onClickCapture={(event) => {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const target = event.target as Element;
          const link = target.closest<HTMLAnchorElement>("a[href]");
          if (!link || link.target === "_blank") return;
          const url = new URL(link.href, location.href);
          if (
            url.origin !== location.origin ||
            !url.pathname.startsWith("/projects/") ||
            pathname !== "/"
          )
            return;
          const visual =
            target.closest<HTMLElement>("[data-transition-id]") ??
            target
              .closest("[data-project]")
              ?.querySelector<HTMLElement>("[data-transition-id]");
          if (!visual) return;
          setOrigin({
            slug: url.pathname.split("/")[2],
            name: visual.dataset.transitionId!,
            src: visual.dataset.projectSrc ?? "",
            href: location.pathname + location.hash,
            top: visual.getBoundingClientRect().top,
            scroll: window.scrollY,
          });
        }}
      >
        {children}
      </div>
    </Context.Provider>
  );
}

export function ProjectBackLink({
  className,
  children,
  label,
}: {
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const { origin } = useProjectNavigation();
  return (
    <Link
      href={origin?.href ?? "/#projects"}
      scroll={!origin}
      className={className}
      aria-label={label}
    >
      {children}
    </Link>
  );
}
