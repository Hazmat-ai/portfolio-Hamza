# Asset provenance

## Original concept illustrations

The SVGs in `projects/` are locally authored concept illustrations derived from the existing project data. They do not depict authentic application interfaces, actual hardware, recorded signals, measurements, or performance results. Each is visibly labeled as a concept on the site.

StudyMind's architecture diagram represents the documented React → FastAPI → Claude API flow, PyMuPDF document parsing, and PostgreSQL/SQLAlchemy persistence with JWT authentication. The materials graphic represents documented flashcards, summaries, and practice questions. The standalone FitForge device artwork is a viewBox crop of the existing original concept SVG.

The Jetson robot, VEX robotics, Cortex-M polling loop, and FPV signal flow have distinct illustrations specific to their documented hardware or architecture. No hardware photographs were supplied or found in the linked repositories.

## campaignOS frontend captures

- `projects/campaign-os/home.webp`
- `projects/campaign-os/brief.webp`

Captured locally in Chrome from the original `HomeScreen` and `InputScreen` React components in [Hazmat-ai/Campaign-app/index.html](https://github.com/Hazmat-ai/Campaign-app/blob/main/index.html). The components were rendered in isolation using a temporary local capture entrypoint. Source component markup, CSS, and fonts were retained. The brief is empty. No API key, seeded campaign, model call, or generated result was used.

These are genuine captures of the frontend components, not evidence of backend behavior or a deployed live demo. The portfolio's existing project descriptions and technology data remain unchanged. The current repository source uses Gemini in its app-level API integration, while the preserved portfolio data describes its Claude implementation; confirm the preferred project version when updating that content.

The original repo asset audit found no suitable application screenshots or authentic hardware photographs elsewhere. The few available images were icons, an inference input, a generic hero asset, or unrelated content and were not used.

## Fonts and icons

Variable Inter is self-hosted in `fonts/` with its SIL Open Font License. The favicon and manifest icons are original monogram artwork. No stock photography or remote hotlinked images are used by the portfolio.

## V4 authentic capture update

All conceptual project SVG assets have been removed. Projects without genuine visual assets now use code-native editorial typography; these are project title treatments, not fabricated interfaces.

- `projects/studymind/home.webp` and `auth.webp`: original public StudyMind React frontend, served locally from https://github.com/Hazmat-ai/StudyMind/tree/main/frontend. Captured at 1440 × 1000, dark preference, empty home input and actual sign-in route. No database rows, account, study materials, or model output were seeded.
- `projects/asl-recognition/home.webp`: original public ASL React frontend from https://github.com/Hazmat-ai/ASL_Recognition. Captured at 1440 × 1000 with camera inactive. No fabricated camera feed or recognition result.
- Existing campaignOS WebP captures remain the original frontend components documented above.

These captures depict the portfolio owner's public project frontends. The V4 frontend-capture pass used no third-party stock photography, commercial device renders, reference-site imagery, or unrelated portrait. The subsequent cinematic photography additions are documented below. Original repositories and their applicable licenses remain authoritative; screenshots are not a grant to redistribute their source code. Capture projects were installed and run only in `/tmp`, without modifying the portfolio's dependency versions.

No original resume PDF was available in the accessible repository or attachments. No PDF has been created, rewritten, or replaced; integration and byte checksum require the original file.

## Cinematic contextual photography

The nine photographs below represent project subject matter, not the actual application, hardware, team, or author. All source pages identify these as free photos under the [Unsplash License](https://unsplash.com/license). These are direct licensed downloads, not Unsplash API integrations. Attribution is appreciated rather than required; photographers are credited here. No image is hotlinked. Each local WebP is at most 1800 pixels wide, with a tiny embedded blur placeholder. Original frontend captures retain priority for StudyMind, campaignOS, and ASL.

| Asset / project | Photographer | Original photo | Context |
|---|---|---|---|
| `photography/fitforge.webp` | Anastase Maragos on Unsplash | [View source](https://unsplash.com/photos/9dzWZQWZMdE) | Shirtless man lifting barbell in gym |
| `photography/smart-write.webp` | Aaron Burden on Unsplash | [View source](https://unsplash.com/photos/y02jEX_B0O0) | Fountain pen on black lined paper |
| `photography/arns-travel-system.webp` | Fujiphilm on Unsplash | [View source](https://unsplash.com/photos/wNNdhPycLkU) | Airplane engine and wing above clouds at sunset |
| `photography/jetson-nano-robot.webp` | Vishnu Mohanan on Unsplash | [View source](https://unsplash.com/photos/uXFKr39XNBM) | Green and black circuit board |
| `photography/tcp-converter.webp` | Taylor Vick on Unsplash | [View source](https://unsplash.com/photos/M5tzZtFCOfs) | Cable network |
| `photography/arm-cortex-simulator.webp` | Sahand Babali on Unsplash | [View source](https://unsplash.com/photos/owjrvbyXYyc) | Blue and black circuit board |
| `photography/hubspot-integration.webp` | Campaign Creators on Unsplash | [View source](https://unsplash.com/photos/gMsnXqILjp4) | Man standing in front of people sitting beside table with laptop computers |
| `photography/vex-robotics.webp` | Isis França on Unsplash | [View source](https://unsplash.com/photos/hsPFuudRg5I) | Close-up photography of black metal gears |
| `photography/fpv-racing-sim.webp` | Kool C on Unsplash | [View source](https://unsplash.com/photos/7jabkilL0qI) | Black camera lens in close up photography |

Arduino and Raspberry Pi imagery is contextual electronics photography, not a claim that these boards implement the ARM simulator or are the project’s Jetson Nano. Gears represent drivetrain/mechanical work; the camera lens represents imaging/optics rather than a photograph of the FPV installation. No author or subject endorsement is implied.
