# Animated controls refinement

The existing design, project data, imagery, navigation, and scroll sequences remain in place. This pass uses the already installed Motion library; no dependencies or image assets were added.

## Controls audited

- Skills disciplines: vertical on desktop, horizontal scrolling on mobile; a measured highlight glides to the selected discipline. The discipline panel follows that axis.
- Skills technologies: rounded sliding highlight with directional project evidence. Selections across wrapped rows use an opacity transition rather than diagonal content movement.
- Project categories: sliding highlight, keyboard selection, directional collection transitions within one row, and fades across wrapped rows.
- campaignOS collection captures and project-detail galleries: shared control styling and directional image transitions.
- Featured story chapters: moving control highlight alongside the existing desktop GSAP scroll sequence; manual mobile gallery changes slide horizontally.
- Interactive resume technologies: one highlight moves across the entire technology grid; evidence fades and resizes.
- Experience uses disclosure controls; resume section links and site navigation are anchors. These retain their existing behavior rather than receiving tab semantics.

## Implementation

`SlidingControls.tsx` measures actual button bounds, including scrolled and wrapped layouts, using ResizeObserver. Motion animates indicator position and size in 450ms with a restrained ease-out. True tab interfaces receive tablist/tab/tabpanel relationships, selected state, and roving tab stops. Arrow keys, Home, and End select and focus options. Toggle groups remain buttons.

`SlidingPanel.tsx` uses a 140ms exit followed by a 220ms entrance, with a 20px directional movement and a 360ms measured height transition. Exiting content becomes inert and hidden from accessibility APIs. Rapid selections interrupt the animation. Reduced motion removes movement and delay. Print layouts show complete content without measured height constraints.

Theme colors use the existing button, text, surface, and accent tokens. The existing downloadable PDF was not edited; no original PDF is currently present in public assets.

## Verification

Two Chrome/Playwright review passes inspect desktop, tablet, and mobile controls in light and dark themes, including intermediate transition screenshots. Coverage includes Python → TypeScript and back, non-adjacent and rapid selections, category arrow/Home/End navigation, wrapping, indicator alignment, gallery selection, resume evidence, reduced motion, horizontal overflow, and project-detail return/filter restoration. Production build, TypeScript, ESLint, and accessibility checks accompany the final pass.

Final results: all six skill/control viewport-theme combinations passed. Additional 320px and 1024px checks found no horizontal overflow. Axe reported zero WCAG A/AA violations on the home page, resume, and StudyMind detail in both themes. Production navigation retained the Mobile filter after visiting FitForge and returning. Mobile story selection showed the correct original sign-in capture. No browser runtime errors were reported. ESLint, standalone TypeScript, production build (22 routes), and diff whitespace checks passed.

Review captures: `tabs-review/desktop-transition.png`, `tabs-review/desktop-dark.png`, and `tabs-review/mobile-light.png`.

Changed components: SkillsSection, ProjectsSection, FeaturedStory, ProjectGallery, and ResumeSkills, plus the new SlidingControls and SlidingPanel primitives. Theme and interaction rules live in `src/app/refinements.css`. Tests used local Chrome; Safari and Firefox were not exercised.

Follow-up fix: outgoing AnimatePresence images relinquish their React ViewTransition boundary, so only the present image owns the canonical shared route name. Rapid collection and detail gallery switching followed by immediate route navigation produced no console or runtime errors in Chrome. After user clarification, shared project route transitions retain their original 650ms desktop and 440ms mobile timings. Content transitions also retain their original timing; only the selection indicator remains slower at 450ms. ESLint and production build passed after the fix.
