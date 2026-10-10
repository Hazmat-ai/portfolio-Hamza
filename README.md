# Hamza Rizvi — Cinematic Portfolio

The existing Next.js 16 App Router portfolio, upgraded with a product-storytelling layout, GSAP ScrollTrigger, Motion, Tailwind CSS 4, and Lucide icons.

## Run

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev -- --port 3005
```

Visit http://localhost:3005. Verification and production preview:

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start -- --port 3005
```

## Design and interaction

- **Hero:** oversized name, layered desktop/device concept visuals, staggered title introduction, and reversible scroll-linked scale, movement, and perspective.
- **Project expansion:** a rounded, inset StudyMind visual expands toward viewport width while the device, surrounding typography, and lighting change with scroll.
- **StudyMind walkthrough:** one short desktop pin keeps the visual in view while three readable chapters explain the experience, architecture, and learning materials. The illustrations crossfade in response to scroll. Chapter controls support direct navigation. On mobile, short viewports, and reduced-motion settings, this becomes a manual gallery with unpinned, readable chapters.
- **Project collection:** all 12 projects, original repository links and technology lists, category filters, large featured compositions, hover zoom, and original campaignOS frontend capture controls.
- **About and experience:** light editorial biography with expandable supporting content, a scroll-linked timeline, and native expandable responsibilities. All original details remain available.
- **Skills:** select a discipline and technology to discover the original projects that use it. No invented skill percentages or proficiency ratings.
- **Education and contact:** credentials, degree details, roles, and certifications are preserved. A large closing CTA supports email copying and social links.
- **Navigation:** active section highlighting, a subtle reading progress line, mobile keyboard focus cycling, Escape dismissal, and anchors that preserve native history.

`CinematicExperience.tsx` owns homepage GSAP motion and pointer delegation. `FeaturedStory.tsx` owns its gallery and desktop pin. Both use scoped contexts and `gsap.matchMedia()` cleanup. Fine-pointer hover motion is disabled on touch and when reduced motion is requested. Native wheel/touch scrolling is preserved; Lenis is not activated. Body copy is readable without waiting for motion. Heading and image transforms reserve their layout space.

## Content and assets

The original `src/data/projects.ts`, `experience.ts`, and `skills.ts` remain unchanged. No achievements, experience, metrics, live demo URLs, or new projects were fabricated.

`public/assets/projects/` contains original labeled concept graphics, including StudyMind architecture and materials, specific robotics diagrams, and a FitForge device composition. campaignOS has two locally captured original frontend components. See [asset provenance](public/assets/README.md) for source details and the distinction between captures and concepts.

`projectVisuals.ts` maps captures and alt text. `ProjectImage.tsx` handles Next.js images, reserved dimensions, local sources, and image errors. `ProjectGallery.tsx` adds the campaignOS detail gallery. Variable Inter and its license are local, so builds do not require Google Fonts.

The original repository had no resume PDF. `/resume` preserves the existing portfolio content in a printable layout; **Print / Save PDF** exports it.

## Deployment and SEO

Set `NEXT_PUBLIC_SITE_URL` to the actual production origin. The existing default is `https://hamzarizvi.dev`. Canonicals, structured data, sitemap, robots, manifest, custom favicon, and a generated 1200 × 630 Open Graph image are included. Standard GitHub/Vercel Next.js deployment remains supported. GSAP is the new runtime dependency; the existing framework and section architecture are retained.

## Optional authentic assets

Supply actual StudyMind, Smart Write, FitForge, and hardware photos/screenshots to replace the labeled concepts. No EEG project exists in the supplied data, so none was added. Confirm whether campaignOS should describe its original Claude version or the current repository's Gemini version; the existing profile content has been preserved.

### V4 refinement

The entire site now follows one selected light/dark theme, including project pages and the interactive `/resume`. An early head script resolves persisted preference or system color scheme before painting. The accessible sun/moon control persists manual selection; system changes apply until a manual preference is set. Storage failures are handled gracefully.

Conceptual SVG app previews have been removed. Authentic locally captured StudyMind, campaignOS, and ASL frontends are stored as optimized WebP under `public/assets/projects`. Other projects use editorial typography rather than simulated screenshots. Sources and capture limitations are recorded in `public/assets/README.md`.

GSAP owns short StudyMind and campaignOS scroll stories, reversible hero/frame/heading motion, desktop vertical-to-horizontal project browsing, and restrained resume career highlights. Scoped contexts, media queries and cleanup preserve route transitions. Touch and reduced-motion layouts use normal stacked content. Gallery links remain keyboard accessible and move their panel into view when focused.

`/resume` includes sticky active section navigation, visible role summaries, expandable contributions, grouped technical skills, education, certifications and all project links. The print button explicitly prints the web resume. **Original PDF download is pending:** no PDF was exposed in the repository or attachments; supply the original local path so it can be hashed and copied byte-for-byte. No replacement PDF has been generated.

Reference research: Sawad and Majd's editorial portfolios, Apple's iPhone/MacBook Pro/Vision Pro product storytelling, and Nike's large visual hierarchy. Awwwards scrolling directory was inaccessible through the research tool; Redoyan's page exposed no readable document. Reference assets were not copied.

### Cinematic photography refinement

Every project now has either its original frontend capture or a distinct contextual photograph. Nine locally hosted Unsplash photos replace the previous typography-only preview panels. Photography is labelled as contextual; it never represents an authentic project screenshot or a photo of Hamza's team/hardware. See `public/assets/README.md` for all nine photographer credits, exact source links, license, and hardware-specific limitations.

`src/data/photoMetadata.json` records dimensions, source credits and tiny WebP blur placeholders. `projectVisuals.ts` owns per-project alt text and desktop/mobile focal points. `ProjectImage.tsx` shares optimized rendering, fallback behavior, photographic overlays and restrained GSAP parallax/mask reveals across homepage and detail pages. Captures remain contained rather than cropped. Pointer parallax operates on a separate wrapper, avoiding conflicts with hover zoom. Reduced-motion and touch layouts use static images.

`globals.css` introduces radius tokens (12/22/24/32/40px), theme-specific photographic overlays and shadows, consistent rounded showcases/panels, and a rounded navigation frame. Existing hero, short story, horizontal gallery, filter, resume, and theme interactions remain in place. The featured frame expansion now retains rounded corners throughout its scroll transition.

### Whole-site editorial polish

The shared `src/app/refinements.css` stylesheet brings section spacing, heading rhythm, timeline rows, skills panels, education cards, navigation state and footer links into the existing design system. Contact is now an asymmetric two-column final CTA with accessible email copying and cleaned-up feedback timers. Project detail pages use a wider editorial layout, readable technical sections, a stack sidebar, and a real next-project link across the existing twelve projects.

The skills discipline selector supports arrow keys, Home and End. The web resume now orders its sections consistently with its sticky navigation; expanding responsibilities refreshes GSAP measurements. The main content is focusable for the skip link. Project content, experience, skills, existing photography, GitHub/demo URLs, theme behavior and the cinematic sequences are preserved. No resume PDF was modified.
