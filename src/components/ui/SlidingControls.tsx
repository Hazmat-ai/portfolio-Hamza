"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type ReactElement,
  type ButtonHTMLAttributes,
} from "react";
import { motion, useReducedMotion } from "motion/react";

/** One measured indicator also works across wrapped rows and scrollable rails. */
export function SlidingControls({
  children,
  className,
  label,
  panelId,
  orientation = "horizontal",
}: {
  children: ReactNode;
  className: string;
  label: string;
  panelId?: string;
  orientation?: "horizontal" | "responsive";
}) {
  const root = useRef<HTMLDivElement>(null);
  const uid = useId();
  const reduced = useReducedMotion();
  const [box, setBox] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [vertical, setVertical] = useState(false);
  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const measure = () => {
      const selected = node.querySelector<HTMLElement>(
        'button:is([aria-pressed="true"],[aria-selected="true"])',
      );
      const bounds = node.getBoundingClientRect();
      const selectedBounds = selected?.getBoundingClientRect();
      if (selected && selectedBounds)
        setBox({
          x: selectedBounds.left - bounds.left + node.scrollLeft,
          y: selectedBounds.top - bounds.top + node.scrollTop,
          width: selected.offsetWidth,
          height: selected.offsetHeight,
        });
      if (!selected) setBox(null);
      setVertical(getComputedStyle(node).flexDirection === "column");
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    node
      .querySelectorAll("button")
      .forEach((button) => observer.observe(button));
    document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, [children]);
  const buttons = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>[];
  return (
    <div
      ref={root}
      className={`${className} sliding-controls`}
      role={panelId ? "tablist" : "group"}
      aria-label={label}
      aria-orientation={
        panelId
          ? orientation === "responsive" && vertical
            ? "vertical"
            : "horizontal"
          : undefined
      }
      onKeyDown={(event) => {
        if (
          ![
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End",
          ].includes(event.key)
        )
          return;
        const nodes = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
        );
        const current = nodes.indexOf(
          document.activeElement as HTMLButtonElement,
        );
        if (current < 0) return;
        event.preventDefault();
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? nodes.length - 1
              : (current +
                  (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
                  nodes.length) %
                nodes.length;
        nodes[next].focus({ preventScroll: true });
        nodes[next].click();
        if (event.currentTarget.scrollWidth > event.currentTarget.clientWidth)
          nodes[next].scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: reduced ? "instant" : "smooth",
          });
      }}
    >
      {box && (
        <motion.span
          aria-hidden="true"
          className="sliding-indicator"
          initial={false}
          animate={box}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {panelId
        ? buttons.map((button, i) =>
            cloneElement(
              button,
              panelId
                ? {
                    role: "tab",
                    "aria-pressed": undefined,
                    id: `${uid}-tab-${i}`,
                    "aria-selected": !!button.props["aria-pressed"],
                    "aria-controls": panelId,
                    tabIndex: button.props["aria-pressed"] ? 0 : -1,
                  }
                : {},
            ),
          )
        : children}
    </div>
  );
}
