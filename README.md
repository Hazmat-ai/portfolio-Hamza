# Hamza Rizvi — Portfolio

Next.js 16 App Router portfolio with TypeScript, Tailwind CSS 4, Motion, GSAP and locally hosted Inter.

## Development

```sh
npm ci
npm run dev -- --port 3005
```

Validation: `npm run lint`, `npx tsc --noEmit`, `npm run build`. Run the production build with `npm run start`.

## Design system

`src/app/globals.css` is the single stylesheet and token layer. Light mode uses white and soft grey surfaces; dark mode uses black and near-black surfaces. Blue is the only accent. CSS custom properties map into Tailwind with `@theme inline`. Radius tokens are 12, 18 and 28px. Display typography uses system fonts with local Inter as fallback; no proprietary fonts are bundled.

The persistent 48px navigation uses a translucent full-width bar. A centered hero, rounded project tiles, contained original frontend captures, hairline experience rows, segmented skills controls and centered contact section share the same spacing and typography. The original HR monogram remains the responsive brand mark.

The early head script resolves a saved light/dark preference before painting, otherwise using the system preference. The accessible theme button persists manual selection; system changes apply until a manual preference is saved.

Utility icons are hand-authored 24px SVG components in `src/components/icons/`, sharing a 1.5px rounded-stroke wrapper. GitHub and LinkedIn have monochrome brand glyphs. Lucide and the unused Lenis dependency have been removed.

## Projects and motion

All twelve projects, existing links, technology lists and detail pages are retained. StudyMind and campaignOS have short desktop scroll stories. Desktop browsing translates a three-project rail as the page scrolls; touch, smaller and reduced-motion layouts use normal stacked content. GSAP uses scoped contexts, media queries and cleanup. The hero scale effect is restrained. Sliding selectors and galleries use an animated indicator and measured content transitions; reduced motion bypasses them. Native scrolling and keyboard navigation are preserved.

Original StudyMind, campaignOS and ASL frontend captures are contained rather than cropped. Nine local Unsplash photographs are explicitly labeled contextual; they do not depict the actual applications, hardware, team or author. Dimensions, blur placeholders and focal points are stored with the visual metadata. Images use Next.js optimization and an error fallback. See [asset provenance and photo credits](public/assets/README.md).

The factual project, experience and skill data modules are unchanged by this redesign. `/resume` keeps its interactive skills, expandable contributions, sticky navigation and print behavior. No original resume PDF is present; no PDF was generated or replaced.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to your production origin; the default is `https://hamzarizvi.dev`. Canonicals, structured data, sitemap, robots, manifest, HR favicon and generated Open Graph image are included. Standard GitHub/Vercel deployment is supported. Builds use local fonts and need no font network request.

## Workshop layer

The workbench after the hero opens native modal dialogs for robotics, software and UX/usability work. Dialog content comes from the existing project and experience data; Escape, keyboard focus containment, focus return and mobile taps are supported. Its app window uses the original StudyMind capture. Robot imagery and a notebook scan are visibly labeled neutral SVG placeholders pending authentic owner-supplied assets; no stock photo represents personal work.

Project catalogue numbers are stable `order` values. Mono spec rows retain all existing stack entries and categories; unrecorded roles and years are omitted. StudyMind, TCP Converter and ARM Simulator have diagrams with annotated decisions grounded in their existing approach descriptions. These are architecture notes, not screenshots or measured traces.

`src/components/signal/SignalLine.tsx` draws a 1.5px blue path on scroll with scoped GSAP contexts and media-query cleanup. StudyMind uses a terminal line, TCP uses a network path, and ARM uses a circuit path. The EEG variant is available but unwired because no EEG project exists. Touch and reduced motion render fully drawn static paths.

The shared segmented thumb uses CSS transforms and a 250ms token with the existing easing; filters, skills and capture selectors retain keyboard support. The original HR geometry also appears as a small maker's mark on catalogue labels and diagrams, with subtle theme-specific relief. The matching asset is available at `public/brand/hr-monogram.svg`.

Owner-supplied personal photos can be registered in `src/data/personalPhotos.ts` for About and the workbench. Empty slots are omitted. See `public/assets/personal/README.md` and `public/assets/workbench/README.md` for asset requirements. The owner confirmed the quiet footer line, “Sunday soccer, cars, and whatever’s next.” Light-mode footer annotation uses the secondary token to maintain readable contrast; dark mode uses tertiary.
