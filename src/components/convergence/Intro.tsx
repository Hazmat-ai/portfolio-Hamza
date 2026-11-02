"use client";
import { useCallback, useEffect, useRef, useState } from "react";
export const INTRO_SEEN = "convergence-intro-seen-v1";
export function Intro({ onDone }: { onDone: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null),
    video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true),
    [manual, setManual] = useState(false),
    [error, setError] = useState(false);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN, "true");
    } catch {}
    done.current();
  }, []);
  useEffect(() => {
    const modal = dialog.current!,
      clip = video.current!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = matchMedia(
      "(max-width:640px) and (orientation:portrait)",
    ).matches;
    modal.classList.toggle("portrait-clip", portrait);
    clip.src = `/convergence/${portrait ? "intro-mobile" : "intro-study"}.mp4`;
    clip.poster = `/convergence/assets/gojo-poster${portrait ? "-mobile" : ""}.jpg`;
    clip.muted = true;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let live = true,
      frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      if (modal.classList.contains("leaving")) return;
      if (motion.matches) {
        finish();
        return;
      }
      // The dialog's white canvas fades away. Its backdrop must be transparent
      // so the already-rendered website is visible throughout this dissolve.
      modal.style.setProperty("--whiteout", "1");
      modal.style.setProperty("--clip-exit", "1");
      modal.classList.add("leaving");
      timer = setTimeout(finish, 1800); // Fallback if transitionend is interrupted.
    };
    const transitionEnd = (event: TransitionEvent) => {
      if (
        event.target === modal &&
        event.propertyName === "opacity" &&
        modal.classList.contains("leaving")
      ) {
        clearTimeout(timer);
        finish();
      }
    };
    const update = (time: number) => {
      if (!Number.isFinite(clip.duration)) return;
      const remaining = clip.duration - time;
      const whiteout = Math.min(1, Math.max(0, (1.65 - remaining) / 1.1));
      modal.style.setProperty("--whiteout", String(whiteout));
      modal.style.setProperty(
        "--clip-exit",
        String(Math.min(1, Math.max(0, (2 - remaining) / 0.55))),
      );
      clip.volume = 1 - whiteout;
      // Keep the full movement, reach white, then overlap the page dissolve
      // with the white hold instead of waiting for an abrupt modal removal.
      if (remaining <= 0.45 && !motion.matches) reveal();
    };
    const supportsVideoFrames =
      typeof clip.requestVideoFrameCallback === "function";
    const schedule = () => {
      if (!live) return;
      if (supportsVideoFrames)
        frame = clip.requestVideoFrameCallback((_, metadata) => {
          update(metadata.mediaTime);
          schedule();
        });
      else
        frame = requestAnimationFrame(() => {
          update(clip.currentTime);
          schedule();
        });
    };
    modal.addEventListener("transitionend", transitionEnd);
    clip.addEventListener("ended", reveal);
    modal.showModal();
    schedule();
    clip.play().catch(() => {
      if (live) setManual(true);
    });
    return () => {
      live = false;
      clearTimeout(timer);
      if (supportsVideoFrames) clip.cancelVideoFrameCallback(frame);
      else cancelAnimationFrame(frame);
      modal.removeEventListener("transitionend", transitionEnd);
      clip.removeEventListener("ended", reveal);
      clip.pause();
      modal.close();
      document.body.style.overflow = overflow;
    };
  }, [finish]);
  return (
    <dialog
      ref={dialog}
      className="intro"
      aria-label="Computer Science and UX Design intro"
      onCancel={(event) => {
        event.preventDefault();
        finish();
      }}
    >
      <video
        ref={video}
        playsInline
        preload="metadata"
        muted={muted}
        aria-label="Gojo red and blue sequence with Computer Science and UX Design labels, followed by Hamza Rizvi"
        onError={() => setError(true)}
        onPlaying={() => setManual(false)}
      />
      <div className="intro-whiteout" aria-hidden="true" />
      <div className="introheader">
        <span>Hamza Rizvi / two disciplines</span>
        <div className="introcontrols">
          {manual && (
            <button
              onClick={() => video.current?.play().catch(() => setError(true))}
            >
              Play intro
            </button>
          )}
          <button aria-pressed={!muted} onClick={() => setMuted(!muted)}>
            {muted ? "Turn sound on" : "Mute sound"}
          </button>
          <button autoFocus onClick={finish}>
            Skip intro ↗
          </button>
        </div>
      </div>
      <div className="introfoot">
        <span role="status">
          {error
            ? "Video unavailable. Use Skip intro to enter the portfolio."
            : manual
              ? "Choose Play intro to start, or skip to the portfolio."
              : "Computer Science × UX Design"}
        </span>
        <span>Hamza Rizvi</span>
      </div>
    </dialog>
  );
}
