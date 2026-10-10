# HR personal identity

Reference studied in Chrome: https://celinehermanto.framer.website. Its restrained typography, personal illustration, and spacious composition informed the restraint of this identity; neither its illustration nor its logo was copied.

Three original geometric directions are compared in `brand-review/concepts.svg`: separate initials, a monoline weave, and the selected shared-stem mark. Separate initials are clear but conventional. The thin weave is less robust at browser-tab size. The shared stem connects the initials into one compact signature while retaining recognizable H and R letterforms.

## System

- Primary: custom SVG monogram and Hamza Rizvi wordmark in existing self-hosted Inter.
- Compact: standalone SVG monogram, used below 1024px and after 96px of scrolling.
- Favicon: static high-contrast mark on a near-black rounded field, supplied as SVG and 32px ICO; Apple 180px and PWA 192/512px PNGs use the same geometry.
- Colors: existing text-primary theme token on the website; charcoal in light mode and soft white in dark mode. No gradients.
- Motion: staggered masked initials at initial load, subtle 0.7px separation on hover, and a 450ms wordmark collapse. The navigation component persists through client-side routing, so the reveal does not replay between pages. Reduced motion removes reveal, hover movement, and transition duration. The fixed branding slot prevents surrounding navigation links from shifting.

## Files

`src/data/brand.ts` holds canonical paths. `src/components/ui/BrandLogo.tsx` renders both website variants. Navigation and Footer use the same component. Icon assets, manifest shortcut versions, and the Open Graph image were updated. Styling is scoped in refinements.css. Original portfolio content and resume files were not changed.

## Review

Chrome/Playwright checks cover desktop and mobile, both themes, scroll collapse/return, hover, reduced motion, icon HTTP responses, Apple icon metadata, overflow, and persistent DOM identity through client navigation. Review captures are stored in `brand-review`. Browser icon files were also inspected at small sizes. Safari and Firefox were not tested.

Final result: both review passes passed at 375px and 1440px in light and dark themes, with no console or runtime errors. The production pass confirmed the exact same navigation SVG DOM node survived client navigation to the resume. All favicon, Apple/PWA icon, and Open Graph routes returned HTTP 200. ESLint, standalone TypeScript, production build (23 routes), diff whitespace checks, and the scoped design detector passed.

Captures: `brand-review/desktop-dark.png`, `desktop-compact.png`, `mobile-light.png`, and `favicon-sizes.png` (16/32/64px icons enlarged to inspect pixels).
