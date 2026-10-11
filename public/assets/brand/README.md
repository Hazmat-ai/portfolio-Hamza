# Hamza Rizvi identity

Original geometric artwork authored for this portfolio; no external logo or font outlines were copied.

- `hr-monogram.svg`: scalable currentColor master, 60 × 48 viewBox.
- `hr-dark.svg`: charcoal ink for light backgrounds.
- `hr-light.svg`: soft white ink for dark backgrounds.
- Primary lockup: BrandLogo combines this master geometry with the site's self-hosted Inter wordmark.
- Compact lockup: same monogram, without the wordmark.
- Browser icon: `src/app/icon.svg` and `src/app/favicon.ico`.
- Apple shortcut: `src/app/apple-icon.png`.
- PWA shortcuts: `public/assets/icon-192.png` and `icon-512.png`.

SVG master uses a 6-unit stem, a 6-unit crossbar, a rounded bowl, a single clear counter, and softly rounded outer left corners. The H and R share the central vertical stem. Keep the mark in one foreground color. Do not stretch, rotate, or apply gradients. Allow at least one stem width of clear space.

Desktop navigation now uses the custom pen-centerline “Hamza” signature, and the footer uses “Hamza Rizvi”. Their source geometry is in `src/data/signature.ts`, rendered by `Signature.tsx`. These are original authored paths rather than font outlines or a sample of the owner's handwriting. HR remains the small-screen navigation mark, favicon and project maker's mark. Neither the HR assets nor favicon were modified by the signature update.

`hamza-signature.svg` preserves the supplied Hamza paths from `Hamza-Signature.html`. The portfolio uses these exact paths and stroke order, with the source easing and a reveal scaled to approximately 1.94 seconds. The footer combines them with the existing Rizvi strokes. HR assets remain unchanged.
