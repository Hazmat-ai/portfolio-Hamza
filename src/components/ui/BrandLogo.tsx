import { HR_PATHS } from "@/data/brand";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hr-monogram ${className}`}
      viewBox="0 0 60 48"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path className="hr-initial hr-h" d={HR_PATHS.h} />
      <path className="hr-initial hr-r" d={HR_PATHS.r} fillRule="evenodd" />
    </svg>
  );
}

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-signature" data-compact={compact}>
      <BrandMark />
      <span className="brand-wordmark">
        <span>Hamza Rizvi</span>
      </span>
    </span>
  );
}
