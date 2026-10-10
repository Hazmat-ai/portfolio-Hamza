# Shared-element motion review

## Ten opportunities and implemented improvements

The audit used the running localhost site, dark/light desktop and mobile captures, existing component behavior, and project-detail recordings. These are refinements to the incumbent visual world; project facts and photographic assets remain unchanged.

| Opportunity | Implemented improvement |
| --- | --- |
| Project images disappeared across navigation | Native React ViewTransition matches the actual selected card image to its detail hero |
| Back-to-projects navigation returned to a broad section rather than the selected card | Source-aware return links restore the originating card's viewport position |
| Filters belonged to the unmounted page | Layout-level browsing state preserves the selected category through navigation |
| The selected campaign screenshot did not carry into the detail gallery | Destination initializes from the actual selected source asset |
| Detail headers occupied too much of the first screen while the image was comparatively narrow | Featured headers use a balanced two-column composition and wider photographic heroes |
| Detail photographs repeated the already-visible project title | Removed decorative title overlays from detail heroes |
| StudyMind's gallery had a campaignOS accessibility label | Gallery controls now use the current project's actual title |
| Detail images had no authored scroll progression | Reversible image expansion/radius morph, with a short bounded pin on capable desktop layouts for featured projects |
| Technical sections appeared without a relationship to scrolling | Small continuous scroll-controlled positioning changes; content remains visible |
| The StudyMind expansion and following story felt like independent copies | A bounded matched-image handoff carries the real screenshot between those compositions |

## Architecture

The installed Next 16.4 documentation confirms React 19.3's native ViewTransition support. Existing App Router links and route architecture remain intact. React coordinates `document.startViewTransition`; no replacement router, dependency, or competing manual page-transition engine was added.

Named images use unique identities for collection, rail, and story instances. Only the selected identity matches the destination, preventing duplicate-name collisions when the same project appears several times on the homepage. Native browser geometry handles travel and resizing; CSS controls easing and corner-radius interpolation. The duration is 650ms on desktop and 440ms on mobile. Unsupported browsers retain ordinary navigation. Reduced motion disables spatial view-transition animation and all added pins/handoffs.

Project browsing state lives in the persistent layout provider. Return alignment happens during the route layout phase and again after existing homepage pins have been measured. Rail and story returns restore their saved native scroll offsets. A page-position map also supports browser history through successive detail pages and the resume. State is scoped to the mounted application session, not persisted across a full reload.

ProjectImage's normal photographic parallax is skipped for the destination hero, whose motion belongs to ProjectScene. This prevents competing transform/clip animations. Featured detail pins add at most 280px of native scroll distance and run only above the relevant desktop size and height thresholds. Mobile and reduced-motion layouts retain ordinary document flow.

The recurring StudyMind tile is a brief matched-element overlay cloned from the real rendered screenshot, marked aria-hidden and noninteractive. Its size is set on measurement; transforms handle per-frame geometry. It exists only during the desktop handoff interval, reverses with scrolling, and is removed on route cleanup. The actual accessible images remain in their original sections. No illustrative or fabricated image was added.

Cross-document `@view-transition` was evaluated but not enabled: these transitions use the existing same-document App Router lifecycle. Direct URLs and reloads continue to load normal pages.

## Visual review evidence

- [Desktop mid-flight](motion-review/motion-1440-mid-flight.png)
- [Desktop detail composition](motion-review/motion-1440-final-detail.png)
- [Mobile mid-flight](motion-review/motion-375-mid-flight.png)
- [Mobile detail composition](motion-review/motion-375-final-detail.png)
- [StudyMind handoff](motion-review/motion-handoff.png)
- [Collection before](motion-review/motion-before-dark-375-projects.png) / [after](motion-review/motion-final-dark-375-projects.png)

Two meaningful review cycles examined actual intermediate frames, not just final states. The first found that the detail route retained a deep source scroll offset, leaving the destination image offscreen. Synchronizing route scrolling before the new snapshot produced a real matched-image group. The second refined hero composition, duplicate photo typography, corner interpolation, and restoration from rail/story links.

## Verification

Production browser checks on local port 3006:

- Desktop dark and mobile light native matched-image groups confirmed for `project-fitforge-collection`.
- Card-to-detail, explicit return, browser back/forward, selected filter, and selected campaign screenshot passed.
- Returned card vertical-position delta was **0px** in both tested sizes.
- Rail scroll restored **7303 → 7303**; story scroll restored **5201 → 5201**.
- Successive project navigation reset to the top; browser back restored the prior detail offset **2098 → 2098**.
- Resume navigation reset to the top, interactive skills remained functional, and prior pin spacers were removed.
- Direct StudyMind loading and `/#projects` deep-link alignment passed.
- Unsupported View Transitions API navigation and reduced-motion navigation passed; reduced motion had no pinned sections.
- The StudyMind handoff followed hidden → visible → hidden → visible → hidden on down/up scrolling, and its overlay was removed after leaving the homepage.
- Home/resume screenshots at 375/768/1440/1920px in both themes recorded no horizontal overflow or page errors.
- Automated WCAG A/AA/2.1 AA checks reported no violations on homepage, resume, and StudyMind detail in both themes.
- Impeccable's mechanical detector reported no findings for the inspected changed targets.
- ESLint, standalone type checking, production build, and whitespace/diff checks passed. All 22 static routes generated successfully.

Browser checks used headless Chrome and emulated viewport sizes. Safari/Firefox and physical devices were not tested. No measured 60fps guarantee is claimed. Native morphs require a visible matching element; a cold or interrupted navigation that lacks a matched pair falls back to normal page presentation.

## Files changed in this pass

- `src/components/animations/ProjectTransitions.tsx`: browsing context, source tracking, source-aware back links, route/history scroll restoration.
- `src/components/animations/ProjectScene.tsx`: detail image and technical-content scroll progression, bounded featured pin, cleanup.
- `src/components/animations/ProjectArrival.tsx`: native detail-content transition boundaries.
- `src/components/animations/StudyMindHandoff.tsx`: recurring matched-image overlay and lifecycle.
- `src/components/animations/CinematicExperience.tsx`: layout-ready coordination and return/hash conflict prevention.
- `src/components/ui/ProjectImage.tsx`: named image boundaries and destination motion ownership.
- `src/components/ui/ProjectGallery.tsx`: selected-source asset preservation and accurate accessible labels.
- `src/components/sections/ProjectsSection.tsx`: persistent filters/gallery state, source identifiers, handoff integration.
- `src/components/sections/ProjectRail.tsx`: unique rail image identities.
- `src/components/sections/FeaturedStory.tsx`: unique story image identities and source asset tracking.
- `src/app/projects/[slug]/page.tsx`: source-aware returns, detail scene, featured composition, and route-keyed galleries.
- `src/app/layout.tsx`: persistent project-navigation provider.
- `src/app/refinements.css`: morph timing/radii, responsive hero layout, content classes, reduced motion, and return stabilization.
- `docs/motion-review/`: captured review evidence.

Frontend Design, Impeccable, and Web App Testing were applied. Remotion was not needed; existing imagery and interactive GSAP motion carry the experience. No project data, URLs, photographs, or resume content were replaced.

## Original resume PDF

No original PDF is present in the accessible repository/attachment inventory, so no PDF was modified or regenerated. Byte-for-byte checksum comparison remains unavailable until the actual original PDF is supplied. The existing interactive web resume remains working.
