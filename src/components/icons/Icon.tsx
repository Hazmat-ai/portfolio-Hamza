import type { SVGProps } from "react";
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
/** Original utility geometry, drawn on a consistent 24px grid. */
export function Icon({ size = 20, title, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}
