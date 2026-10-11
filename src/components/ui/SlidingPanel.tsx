"use client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useIsPresent,
} from "motion/react";

function PresentContent({ children }: { children: ReactNode }) {
  const present = useIsPresent();
  return (
    <div inert={!present} aria-hidden={present ? undefined : true}>
      {children}
    </div>
  );
}

export function SlidingPanel({
  children,
  panelKey,
  direction = 1,
  axis = "x",
}: {
  children: ReactNode;
  panelKey: string;
  direction?: number;
  axis?: "x" | "y" | "fade";
}) {
  const reduced = useReducedMotion();
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  useLayoutEffect(() => {
    if (!content.current) return;
    const node = content.current;
    const measure = () => setHeight(node.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [panelKey]);
  const offset = reduced || axis === "fade" ? 0 : direction * 20;
  return (
    <motion.div
      className="sliding-panel"
      initial={false}
      animate={{ height }}
      transition={{ duration: reduced ? 0 : 0.5, ease: [0.28, 0.11, 0.32, 1] }}
    >
      <AnimatePresence
        initial={false}
        mode="popLayout"
        custom={{ offset, axis }}
      >
        <motion.div
          key={panelKey}
          ref={content}
          className="sliding-panel-content"
          initial={{
            opacity: reduced ? 1 : 0,
            x: axis === "x" ? offset : 0,
            y: axis === "y" ? offset : 0,
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit="exit"
          variants={{
            exit: (next: { offset: number; axis: string }) => ({
              opacity: 0,
              x: next.axis === "x" ? -next.offset : 0,
              y: next.axis === "y" ? -next.offset : 0,
              transition: { duration: reduced ? 0 : 0.14 },
            }),
          }}
          transition={{
            duration: reduced ? 0 : 0.4,
            delay: reduced ? 0 : 0.14,
            ease: [0.28, 0.11, 0.32, 1],
          }}
        >
          <PresentContent>{children}</PresentContent>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
