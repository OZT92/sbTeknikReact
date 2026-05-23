# Walking Skeleton — SB Teknik Malzeme Website Redesign

**Phase:** 1
**Generated:** 2026-05-23

## Capability Proven End-to-End

Opening the site in a browser proves the entire static-asset + design-system pipeline works end-to-end: the dark-ground CSS token layer is live (dark `#0f1923` background visible globally on every route), the optimized fonts load (Inter + Barlow Condensed as WOFF2, no 854 KB TTF request), and the service images resolve (six WebP files, no PNG 404s, no uncompressed fallback).

This is the thinnest possible end-to-end slice that validates the whole infrastructure the rest of the redesign depends on. No visual component work happens here — the "UI" of Phase 1 is the token system and asset pipeline itself.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | React 19 + Vite 7 + React Router 7 (existing, preserved) | Constraint: stay on the existing stack. Static frontend only — no backend, no SSR. |
| Design system | Hand-authored CSS custom properties on `:root` in `src/index.css` | Constraint: no CSS framework, no CSS modules, no Tailwind. Single global stylesheet. Tokens are the single source of truth all later phases inherit. Zero runtime cost. |
| rem convention | `html { font-size: 62.5% }` → 1rem = 10px (preserved, never changed) | Already set at index.css line 17. Every token value in the UI-SPEC is calculated on this 10px base. |
| Fonts | Self-hosted WOFF2 in `public/fonts/` — Inter (body, variable 100-900) + Barlow Condensed (display, 700/900) | WOFF2 = ~70-80% smaller than TTF. Self-hosted (no Google Fonts runtime request) preserves load time and privacy. Barlow Condensed carries Turkish-diacritic `unicode-range`. |
| Images | WebP in `public/img/services/`, referenced by public path string (not ES module import) | Public assets bypass the bundler (predictable paths, no hashing, enables future `<picture>`/srcset). WebP = ~80-90% smaller than the 1.2-2.2 MB PNG sources. |
| Asset conversion | One-off Node ESM scripts in `scripts/` using `ttf2woff2` (fonts) and `sharp` (images); packages installed as temporary devDependencies and uninstalled after | `cwebp`/`woff2_compress` are not installed; Node-based tooling is scriptable and reproducible. Barlow Condensed downloaded directly from Google Fonts CDN via curl (no conversion needed). |
| Directory layout | `public/fonts/{Inter,BarlowCondensed}/`, `public/img/services/`, `scripts/` (new), `src/index.css` (tokens), `src/pages/` (consume assets) | Static assets in `public/` (copied verbatim to `dist/`); source remains in `src/`. Matches existing project conventions (`/poster-hero.webp`, `/sbLogo.png` are already public-path-referenced). |
| Deployment target | Static `dist/` from `vite build` — any static host (existing) | No server runtime. Verified locally via `npm run dev` (skeleton check) and `npm run build` (smoke test). |

## Stack Touched in Phase 1

- [x] Build/scaffold — existing Vite build preserved; `npm run build` is the smoke gate (no new test runner — bash assertions used per VALIDATION.md)
- [x] Design-system layer — `:root` token block (color, spacing, type, z-index, motion) live and applied via `body`
- [x] Fonts — Inter WOFF2 + Barlow Condensed 700/900 WOFF2 self-hosted, `@font-face` declared, preloaded with `crossorigin` in `index.html`
- [x] Images — 6 service WebP files in `public/img/services/`, consumed by `ServicesPage.jsx` via public path strings
- [x] Browser verification — dark ground visible on all 4 routes, no `.ttf`/`.png` requests in Network tab (human checkpoint in Plan 01)

## Out of Scope (Deferred to Later Slices)

These are explicitly NOT in the Phase 1 skeleton. Later phases must not re-litigate Phase 1's minimalism:

- Any component restyling — navbar, hero, cards, buttons, about/contact layouts (Phases 2-5)
- Migrating the remaining hardcoded hex values (`#194d88`, `#2d080a`, `#fff`, etc.) to tokens — Phase 1 only changes the `body` background and font-family (Phases 2-5 do the rest)
- Hero video overlay adjustment for the dark background (Phase 3)
- Stats row, BrandSlider prominence, CTA button restyling (Phase 3)
- Certificate badges, company story, contact layout (Phase 5)
- JSON-LD / canonical / OG / sitemap end-to-end SEO verification (Phase 5)
- WhatsApp floating CTA and all other v2 requirements (deferred by user decision)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton, inheriting the token names and asset conventions without altering them:

- **Phase 2 — Navbar:** restyle the navbar to the bold/industrial aesthetic using the `:root` tokens, across all breakpoints.
- **Phase 3 — HomePage:** hero (Barlow Condensed display), stats row, BrandSlider prominence, token-styled CTAs, dark-background video overlay, LCP preserved.
- **Phase 4 — ServicesPage:** bold card grid consuming the Phase 1 WebP images, responsive 1→2→3 columns, restyled CTA section.
- **Phase 5 — About + Contact + SEO:** restyle remaining pages, certificate badges, contact trust layout, end-to-end SEO/sitemap verification.

## Skeleton Verification (run after both Phase 1 plans complete)

```
npm run build \
 && ls "public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2" \
 && ls public/fonts/BarlowCondensed/*.woff2 \
 && test $(ls public/img/services/*.webp | wc -l) -eq 6 \
 && test $(grep -c "^:root" src/index.css) -eq 1
```

Then `npm run dev` and confirm in-browser: dark `#0f1923` ground on all 4 routes, WOFF2 fonts in Network tab (no `.ttf`), WebP service images (no `.png` 404s).
