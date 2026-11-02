"use client";
import { useEffect, useRef, useState } from "react";
export const INTRO_SEEN = "convergence-intro-seen-v1";
export function Intro({ onDone }: { onDone: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null),
    video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true),
    [manual, setManual] = useState(false),
    [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);
  useEffect(() => {
    const modal = dialog.current!,
      clip = video.current!;
    const portrait = matchMedia(
      "(max-width:640px) and (orientation:portrait)",
    ).matches;
    modal.classList.toggle("portrait-clip", portrait);
    clip.src = `/convergence/${portrait ? "intro-mobile" : "intro-study"}.mp4`;
    clip.poster = `/convergence/assets/gojo-poster${portrait ? "-mobile" : ""}.jpg`;
    clip.muted = true;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.showModal();
    clip.play().catch(() => setManual(true));
    return () => {
      clearTimeout(timer.current);
      clip.pause();
      modal.close();
      document.body.style.overflow = overflow;
    };
  }, []);
  const finish = () => {
    try {
      sessionStorage.setItem(INTRO_SEEN, "true");
    } catch {}
    done.current();
  };
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
        onTimeUpdate={(event) => {
          const clip = event.currentTarget;
          if (!Number.isFinite(clip.duration)) return;
          const remaining = clip.duration - clip.currentTime;
          dialog.current?.style.setProperty(
            "--clip-exit",
            String(Math.min(1, Math.max(0, (2 - remaining) / 0.55))),
          );
          // The final half-second is fully white; reveal the page without cutting movement.
          if (remaining <= 0.5) dialog.current?.classList.add("leaving");
        }}
        onEnded={() => {
          dialog.current?.classList.add("leaving");
          timer.current = setTimeout(
            finish,
            matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 900,
          );
        }}
      />
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
