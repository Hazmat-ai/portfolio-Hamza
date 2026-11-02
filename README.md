# Hamza Rizvi — Convergence

A responsive Next.js / React portfolio implementing the approved Computer Science × UX Design concept. White is the default; an explicit dark-mode choice persists locally.

## Run locally

Requires Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For production:

```bash
npm run build
npm start
```

## Included

- The approved landscape and portrait Gojo intro, muted by default, with sound, skip, replay and Escape. It runs through the final hand extension to white before revealing the page. Automatic playback respects reduced motion and only runs once per browser tab.
- Scroll-driven red/blue orbits in a fixed background layer. Opaque project cards and `pointer-events: none` prevent interference; reduced motion freezes the orbit.
- Computer Science, UX Design and Résumé tabs with arrow/Home/End keyboard navigation and sliding indicators.
- Fourteen software/robotics projects, four UX projects, individual project URLs, and the original public repository index.
- Actual interface captures, recordings and browser demos where available. Hardware/model-dependent projects retain honest setup links. Workflow diagrams are labelled as diagrams.
- All ten Canva preview exports and both supplied Lotus PDFs: 12 documents, 202 browsable page images. The Canva PDFs use preview-resolution images; original links remain available.
- Résumé print / save PDF, SEO metadata, sitemap, robots and security headers.

## Structure

`src/components/convergence/` contains the React controls, native dialogs, intro, background animation and page sections. `src/data/convergence/content.json` holds the reviewed project/document content. `public/convergence/` contains the actual videos, previews, PDFs and browser demos; do not omit it when transferring the code.

Project case-study HTML is authored at build time in the local content file. No remote HTML or user input is inserted. The portfolio has no login, tracking integration, contact-form server or secret API key; contact uses email and external profile links.

## Checks

```bash
npm run typecheck
npm run lint
npm run test:assets
npm run build
npx playwright install chromium
npm run test:e2e
```

The Playwright suite covers desktop and phone navigation, persisted theme, document paging, modal focus, project routes, accessibility and intro playback. GitHub Actions installs Chromium explicitly before running it. Browser tests need the production build first.

See [docs/RELEASE.md](docs/RELEASE.md) for verification and deployment notes.
