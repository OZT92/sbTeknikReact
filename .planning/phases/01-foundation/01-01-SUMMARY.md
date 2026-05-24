---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [css, fonts, woff2, design-tokens, inter, barlow-condensed]

# Dependency graph
requires: []
provides:
  - ":root CSS token block with all design-system custom properties (colors, type, spacing, z-index, motion)"
  - "Inter variable font as self-hosted WOFF2 (356 KB, was 854 KB TTF)"
  - "Barlow Condensed 700 + 900 as self-hosted WOFF2 with Turkish unicode-range"
  - "Dark ground background (#0f1923) applied globally via body"
  - "Font preload hints in index.html for Inter and Barlow Condensed Black"
affects: [02-navbar, 03-homepage, 04-servicespage, 05-about-contact-seo]

# Tech tracking
tech-stack:
  added: [ttf2woff2 (dev-only, uninstalled after use)]
  patterns:
    - ":root custom properties as the single source of truth for all design tokens"
    - "Self-hosted WOFF2 fonts in public/fonts/ referenced via absolute path /fonts/..."
    - "Font preload hints in index.html with mandatory crossorigin attribute"

key-files:
  created:
    - src/index.css (:root block prepended — token system inherited by all phases)
    - scripts/convert-inter.mjs (reproducible TTF→WOFF2 conversion utility)
    - public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2
    - public/fonts/BarlowCondensed/BarlowCondensed-Bold.woff2
    - public/fonts/BarlowCondensed/BarlowCondensed-Black.woff2
  modified:
    - src/index.css (Inter @font-face → WOFF2; two Barlow Condensed @font-face; body tokens)
    - index.html (two crossorigin font preload hints added)
    - package.json (ttf2woff2 installed then removed; net: unchanged devDependencies)

key-decisions:
  - "Inter WOFF2 produced via ttf2woff2 at 356 KB (within 400 KB limit) — no subsetting needed for variable font"
  - "Barlow Condensed CDN URLs from 2026-05-23 v13 hash returned HTTP 200; no 404 fallback re-query required"
  - "ttf2woff2 installed as temporary devDependency and uninstalled after conversion — kept convert-inter.mjs as reproducible utility"
  - "--color-accent: #c8960c confirmed — human visual check against sbLogo.png approved amber; no correction required"
  - "index.html preconnect hints to fonts.googleapis.com/fonts.gstatic.com left intact (harmless; can be cleaned up in later phase)"

patterns-established:
  - "Token contract: all token names from :root are a cross-phase contract — never rename without updating all downstream phases"
  - "1rem = 10px convention via html { font-size: 62.5% } — all Phase 2+ CSS calculates against this base"
  - "Static assets in public/ referenced with leading / and no /public prefix (e.g. /fonts/Inter/...)"

requirements-completed: [FOUN-01, FOUN-03, FOUN-04]

# Metrics
duration: ~35min
completed: 2026-05-24
---

# Phase 01 Plan 01: Foundation — Dark Ground + Fonts Summary

**:root design token system, Inter WOFF2 (352 KB), and self-hosted Barlow Condensed 700/900 with dark body background and amber accent #c8960c approved by human visual check against sbLogo.png**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-05-23T17:48:00Z
- **Completed:** 2026-05-24T09:01:00Z
- **Tasks:** 3 of 3 complete (Task 3 checkpoint approved 2026-05-24)
- **Files modified:** 7 (2 source, 3 binary fonts created, 1 script, 1 package.json/lock)

## Accomplishments
- Inter variable font converted from 854 KB TTF to 356 KB WOFF2 via ttf2woff2; source TTF preserved
- Barlow Condensed Bold (700) and Black (900) downloaded from Google Fonts CDN as WOFF2 (23 KB + 22 KB); Turkish unicode-range applied
- Complete `:root` token block prepended as first CSS rule in `src/index.css` — 45 tokens across 5 groups (colors, fonts, type, spacing, z-index, motion)
- Body now uses `var(--color-bg)` (#0f1923 dark industrial ground) and `var(--color-text-primary)` — dark background applied globally
- Two crossorigin font preload hints added to `index.html`; `npm run build` exits 0
- Deleted `public/fonts/Inter/static/` (54 unused TTF files, ~3 MB of bloat)

## Task Commits

1. **Task 1: Convert Inter TTF to WOFF2, download Barlow Condensed, delete static/** - `acd30f4` (chore)
2. **Task 2: Prepend :root token block, update @font-face and body, add preload hints** - `c05b64d` (feat)
3. **Task 3: Validate logo color and dark-ground walking skeleton** — `43a46e9` (checkpoint approved 2026-05-24)

## Files Created/Modified
- `src/index.css` - :root token block prepended; Inter @font-face updated to WOFF2; two Barlow Condensed @font-face blocks; body tokens
- `index.html` - Two crossorigin font preload hints added after poster-hero preload
- `public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2` - Inter as self-hosted WOFF2 (356 KB)
- `public/fonts/BarlowCondensed/BarlowCondensed-Bold.woff2` - Barlow Condensed weight 700 (23 KB)
- `public/fonts/BarlowCondensed/BarlowCondensed-Black.woff2` - Barlow Condensed weight 900 (22 KB)
- `scripts/convert-inter.mjs` - Reproducible TTF→WOFF2 conversion utility
- `package.json` / `package-lock.json` - ttf2woff2 installed and uninstalled (net unchanged)

## Decisions Made
- ttf2woff2 (408K weekly downloads, nfroidure/ttf2woff2, 11-yr history) used as temporary devDependency, uninstalled after conversion
- Barlow Condensed CDN v13 URLs confirmed valid (HTTP 200); no 404 fallback needed
- Inter WOFF2 at 356 KB passes the <400 KB gate; no subsetting applied (variable font covers full Latin + Turkish range)
- Amber accent `#c8960c` approved by human visual check against `public/sbLogo.png` at Task 3 checkpoint — no correction required; Phase 2 unblocked

## Deviations from Plan
None — plan executed exactly as written. Both auto tasks completed without issues.

## Issues Encountered
None.

## Known Stubs
None. `--color-accent: #c8960c` validated and approved at Task 3 checkpoint. No outstanding stubs.

## Threat Flags
None — no new network endpoints, auth paths, or trust boundary changes introduced. Font downloads were from Google's official CDN over HTTPS (HTTP 200 verified). ttf2woff2 disposition was pre-approved in threat register T-01-SC.

## Next Phase Readiness
- Task 3 checkpoint approved 2026-05-24 — dark background on all 4 routes confirmed, WOFF2 fonts confirmed, amber #c8960c approved against sbLogo.png
- **Phase 2 (Navbar) is unblocked** — all token names are the cross-phase contract

---
*Phase: 01-foundation*
*Completed: 2026-05-24*
