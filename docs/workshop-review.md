# Workshop layer — changes and asset handoff

## Scope

Adds the second part of `CODEX_REDESIGN (1).md` to the existing Apple-style portfolio. The existing palette, typography, navigation, scroll stories, contextual photo labels, project transitions and resume are retained. Project, experience and skill data files are unchanged.

- `components/workbench/Workbench.tsx`: three object controls and native accessible modal sheets, related data, mobile layouts, focus return and Escape dismissal.
- `components/projects/ProjectSpecs.tsx`: stable catalogue numbers, full stack/category spec rows and HR maker marks. Missing roles/years are omitted.
- `components/projects/ProjectDecisions.tsx`: explanatory architecture flows and two documented decisions for StudyMind, TCP Converter and ARM Simulator.
- `components/signal/SignalLine.tsx`: static-default, scroll-drawn signatures with GSAP context/media cleanup. EEG is not wired to any project.
- `components/ui/SlidingControls.tsx`: shared 250ms CSS-transform thumb, preserving keyboard selection.
- `data/personalPhotos.ts` and `components/ui/PersonalPhoto.tsx`: authentic-photo slots that render only when real local assets are configured.
- `globals.css`: signal/mono/control tokens, workshop surfaces and responsive styles.
- `Footer.tsx`: personal footer line explicitly approved by the owner.

## Assets

The existing original HR artwork is copied to the requested `public/brand/hr-monogram.svg` path; no replacement stand-in is needed. The authentic StudyMind screenshot is reused without modification. Neutral slot SVGs added under `public/assets/workbench/` are visibly labeled placeholders.

Still needed from the owner:

1. An actual robot-component photograph, replacing the robot placeholder.
2. An actual research/UX notebook scan, replacing the notebook placeholder.
3. Optional personal photographs for About and the workbench. Their slots remain omitted until supplied.

No personal stock substitutions, invented work, project dates, roles, metrics or URLs were added. The original downloadable resume PDF was not present and was not created or changed.

## Validation

Two browser passes used Python Playwright and local Chrome, first on localhost:3005 and then against the production build on localhost:3006. Both themes were checked at 375, 768, 1280 and 1920px.

- No runtime errors or horizontal overflow observed.
- Axe WCAG A/AA checks reported no violations on the page, robotics dialog and software dialog. Automated checks do not establish complete accessibility conformance.
- Dialog focus containment, Shift+Tab/Tab wrapping, Escape, close-button focus return and related-project navigation passed.
- End/Home filter keyboard selection, all twelve catalogue entries and the 250ms CSS thumb passed.
- The normal-motion signature offset moved from 224 to 0 on scroll. All three selected signatures were fully drawn at every reduced-motion size/theme combination and on desktop touch; no EEG signature was wired.
- Resume beforeprint/afterprint expansion and restoration passed. Factual project/experience/skills modules have no diff.
- `npm run lint`, `npx tsc --noEmit`, `npm run build` and `git diff --check` pass. Production generates all twelve detail routes.

Screenshots: [desktop light](workshop-review/desktop-light.png), [desktop dark](workshop-review/desktop-dark.png), [mobile light](workshop-review/mobile-light.png), [mobile dark](workshop-review/mobile-dark.png).
