# Convergence implementation

Implemented against repository main commit `927efa8cc6bad04ad02bc7c6e38c9d1afacd0aa7` on `feature/convergence-portfolio`.

## Verification

- Next.js 16.4.3 production build: passed; all 18 project pages generated.
- Strict TypeScript and ESLint: passed.
- Asset inventory: passed, including 14 software previews, 18 case studies, 12 documents and 202 document page images.
- Production dependency audit after upgrading Next.js 16.4.0 to 16.4.3: zero known vulnerabilities at implementation time.
- Both delivered MP4 renditions were previously decoded and visually checked through the full white ending.
- Browser rendering of the new Next.js home page was observed. A later browser-security restriction blocked final interactive verification; a full local Playwright/UAT pass is **not claimed**. The browser regression suite is included and runs in GitHub Actions on desktop and phone profiles.

## Deployment

This is a normal Next.js project. On Vercel, import the GitHub repository, select the Next.js preset, and use `npm run build`. The Node version should be 22. Set `NEXT_PUBLIC_SITE_URL` to the actual canonical HTTPS domain before production deployment. No secret environment variables are required.

The default canonical domain is inherited from the original repository. Update it if using another domain; otherwise sitemap/canonical links will still point to `https://hamzarizvi.dev`.

Security headers are configured in `next.config.ts`. The portfolio itself requests no camera or microphone access. Its local demo companions are labelled separately from the original apps. No new backend deployment for StudyMind, ASL, Smart Write or Mood Picker is implied by this portfolio implementation.

The original uploaded recording is preserved outside the repository; only the edited, web-ready clips are included. TikTok reference streams could not be inspected and no exact reference timing match is claimed. The anime clip is supplied by the owner; no redistribution permission is asserted by the code.

## UAT before public launch

Use an actual laptop and phone to review intro audio/fade/skip, scroll through the work and résumé tabs, open a project and a document, exercise dark mode, and save the résumé as PDF. Confirm the domain, course labels and public-facing résumé content. CI smoke checks do not substitute for a complete user study or accessibility certification.

## Intro dissolve correction

The native modal backdrop is transparent so the website can show through during the overlay fade. A frame-synchronized white layer finishes the clip, then the overlay dissolves for 1.5 seconds. Completion follows the opacity transition, with a timeout fallback. Audio tapers off with the white-out; stable scrollbar space and focus restoration without scrolling prevent a layout jump. The regression suite checks backdrop transparency and a visible intermediate fade. Type, lint and production build were checked locally; the updated browser assertions still require execution on the owner’s machine or CI.
