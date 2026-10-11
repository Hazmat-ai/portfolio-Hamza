# UX and visual improvement pass

Implemented the supplied `portfolio-ux-visual-improvements.md` against the live site rather than treating older captures as current evidence.

## Applied

- Hero now states Hamza's name, web/ML/robotics work, Laurier program, current internship, and co-op interest. Removed the product-launch slogan, decorative laptop, pseudo-code panel, social duplicates, status dot, and scroll cue.
- Page order: introduction → selected work → experience → personal background (About and Education grouped together) → interactive skills → all projects → contact.
- Selected work uses StudyMind, campaignOS, and ASL because all three have genuine captures. These are the interim selections until Hamza supplies different preferences.
- All nine contextual stock photographs and their metadata are removed. Projects without original visuals have neutral, code-native technical summaries; no simulated interface or fake result is shown. Real screenshots display completely, without decorative browser chrome, labels, or cropping. A recapture was unnecessary to fix the displayed cut-off edge.
- About and Contact use direct factual language. The university and government highlight duplicates are gone. Personal university work is visible in the bio rather than collapsed. About facts use 15px copy without icons.
- Light is the default for first-time visitors. Explicit saved light/dark choices still work. Existing neutral theme tokens and link accent remain.
- Self-hosted Instrument Serif headings pair with Inter body text. Instrument Serif is sourced from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/instrumentserif), with the OFL license bundled. Heading tracking is loosened. Frame shadows and decorative gradients are absent from the new active surfaces.
- Homepage pinning, horizontal scroll gallery, parallax, scroll-linked heading scaling, and section entrances are removed from the rendered page. Project detail media no longer pins or scales with scroll. A short hero entrance, existing logo feedback, useful tabs, and project route transitions remain.
- HR remains the single logo system. GitHub/LinkedIn are concentrated in Contact and Footer; the resume retains its professional contact links.
- Government experience uses Hamza's new input: internal websites, business tax/anti-money-laundering compliance, databases/servers/schemas, different languages and AI tools, plus Azure, VS Code, Git, and GitHub. No internal project names, specific languages/database products, metrics, or office city were invented. Location is the known province: Ontario, Canada.

## Preserved

All 12 projects, repository URLs, existing live-demo URLs where provided, project technologies, genuine screenshot files, dates, other experience, degree, certifications, interactive skill controls, theme preferences, clipboard behavior, brand identity, and web resume remain available. No PDF was created, modified, or replaced.

## Still requires owner assets or facts

- Original screenshots/photos for FitForge, Smart Write, ARNS, Jetson, TCP, ARM, HubSpot, VEX, and FPV. Honest technical summaries are the shipped fallback.
- Original resume PDF: Hamza confirmed there is no file available. The working web resume remains, with its print action; no broken download was added.
- Office city, exact co-op start season, and personal project origin stories were not supplied. Existing factual project descriptions remain; private motives and dates were not inferred.
- The brief's ten-second test with two or three people needs actual human viewers; browser automation cannot stand in for that feedback.

## Validation

Two live screenshot reviews covered 375px and 1440px in both themes. Final production checks additionally cover 320px, 768px, and 1024px; missing stock imagery; zero pinned elements; category filtering; project route return; skill evidence; government facts on the resume; and theme behavior. Accessibility checks run on home, resume, and FitForge in both themes. ESLint, TypeScript, production build, and diff whitespace checks are included. Screenshots are in `reading-review/`.

Final results: no WCAG A/AA violations on home, resume, and FitForge in either theme; no horizontal overflow at 320/375/768/1024/1440px; zero pins; filters, project return, and skill evidence passed. Government facts were verified after opening the resume responsibilities disclosure. All nine technical previews fit without clipping at all five widths. Lint, standalone TypeScript, scoped detector, diff checks, and final production build (23 routes) passed. Project information and URLs in projects.ts are unchanged.
