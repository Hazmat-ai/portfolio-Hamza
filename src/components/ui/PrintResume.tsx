"use client";
import { useEffect } from "react";
import { Printer } from "lucide-react";

export function PrintResume() {
  useEffect(() => {
    let collapsed: HTMLDetailsElement[] = [];
    const expand = () => {
      collapsed = Array.from(
        document.querySelectorAll<HTMLDetailsElement>(
          ".resume-page details:not([open])",
        ),
      );
      collapsed.forEach((details) => {
        details.open = true;
      });
    };
    const restore = () => {
      collapsed.forEach((details) => {
        details.open = false;
      });
      collapsed = [];
    };
    window.addEventListener("beforeprint", expand);
    window.addEventListener("afterprint", restore);
    return () => {
      window.removeEventListener("beforeprint", expand);
      window.removeEventListener("afterprint", restore);
      restore();
    };
  }, []);
  return (
    <button
      type="button"
      className="btn-primary"
      onClick={() => window.print()}
    >
      Print web resume <Printer size={16} />
    </button>
  );
}
