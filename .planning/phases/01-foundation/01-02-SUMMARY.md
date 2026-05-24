---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [webp, sharp, image-optimization, vite, react, static-assets]

# Dependency graph
requires:
  - phase: 01-foundation
    plan: 01
    provides: CSS design token layer and font pipeline (prerequisite for visual work)
provides:
  - 6 WebP service card images in public/img/services/ (46–182 KB each, vs 1.2–2.2 MB PNG sources)
  - scripts/convert-images.mjs: reproducible one-off ESM conversion script
  - ServicesPage.jsx: 6 const public-path strings replacing 6 ES module PNG imports
affects: [phase-02-navbar, phase-03-homepage, phase-04-servicespage]

# Tech tracking
tech-stack:
  added: [sharp (temp devDependency — installed and uninstalled; not in final package.json)]
  patterns: [WebP public-path convention — const serviceImgN = "/img/services/name.webp" after last import]

key-files:
  created:
    - scripts/convert-images.mjs
    - public/img/services/elektrikli-el-aletleri.webp
    - public/img/services/is-guvenligi.webp
    - public/img/services/nalburiye.webp
    - public/img/services/tesisat-malzemeleri.webp
    - public/img/services/yapi-kimyasallari.webp
    - public/img/services/yapi-malzemeleri.webp
  modified:
    - src/pages/ServicesPage.jsx

key-decisions:
  - "sharp installed as temp devDependency and uninstalled after conversion — not present in production package.json"
  - "WebP public-path convention: const declarations placed after all imports, before const canonical, preserving ES module ordering"
  - "serviceImg1-6 variable names preserved to avoid touching the services array"
  - "quality 82 / effort 6 yields 46–182 KB per file (vs 1.2–2.2 MB PNG) — well within 200 KB gate"

patterns-established:
  - "WebP Convention: static images go in public/img/<category>/ as kebab-case .webp; referenced via const path strings, not ES module imports"
  - "Convert-script pattern: one-off ESM scripts live in scripts/; committed for reproducibility; dependency temp-uninstalled after use"

requirements-completed: [FOUN-02]

# Metrics
duration: 2min
completed: 2026-05-24
---

# Phase 01 Plan 02: WebP Service Images Summary

**6 service card images converted from 1.2–2.2 MB PNGs to 46–182 KB WebP static public assets; ServicesPage imports replaced with public path const strings**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-05-24T09:05:00Z
- **Completed:** 2026-05-24T09:06:44Z
- **Tasks:** 2
- **Files modified:** 8 (7 created, 1 modified)

## Accomplishments

- All 6 service card images converted to WebP at quality 82/effort 6 — total payload reduced from ~12 MB to ~752 KB
- Reproducible conversion script (`scripts/convert-images.mjs`) committed as ESM, matching project's `"type": "module"` convention
- ServicesPage.jsx import pattern migrated from ES module PNG imports to public-path const strings; build confirmed passing
- Source PNGs in `src/img/services/` preserved; sharp removed from devDependencies

## Per-File WebP Sizes

| File | WebP size | Source PNG (approx) |
|------|-----------|---------------------|
| elektrikli-el-aletleri.webp | 141,682 bytes (138 KB) | ~2.2 MB |
| is-guvenligi.webp | 46,794 bytes (46 KB) | ~1.2 MB |
| nalburiye.webp | 157,080 bytes (153 KB) | ~2.0 MB |
| tesisat-malzemeleri.webp | 99,476 bytes (97 KB) | ~1.5 MB |
| yapi-kimyasallari.webp | 124,042 bytes (121 KB) | ~1.8 MB |
| yapi-malzemeleri.webp | 182,764 bytes (179 KB) | ~2.2 MB |
| **Total** | **~752 KB** | **~12 MB** |

All files under 200 KB ceiling. All source PNGs preserved.

## Task Commits

1. **Task 1: Convert 6 service PNGs to WebP via sharp** — `3e0261f` (feat)
2. **Task 2: Swap ServicesPage PNG imports for WebP public path strings** — `bc23bcf` (feat)

## Files Created/Modified

- `scripts/convert-images.mjs` — ESM one-off conversion script using sharp; quality 82, effort 6
- `public/img/services/elektrikli-el-aletleri.webp` — WebP for Elektrikli El Aletleri card
- `public/img/services/is-guvenligi.webp` — WebP for Is Guvenligi card
- `public/img/services/nalburiye.webp` — WebP for Nalburiye card
- `public/img/services/tesisat-malzemeleri.webp` — WebP for Tesisat Malzemeleri card
- `public/img/services/yapi-kimyasallari.webp` — WebP for Yapi Kimyasallari card
- `public/img/services/yapi-malzemeleri.webp` — WebP for Yapi Malzemeleri card
- `src/pages/ServicesPage.jsx` — Replaced 6 PNG import statements with 6 const path-string declarations

## Decisions Made

- **sharp as temp devDependency:** Installed for conversion, uninstalled immediately after. Not in production package.json.
- **WebP public-path convention established:** `const serviceImgN = "/img/services/kebab-name.webp"` placed after all import statements, before module-level `const canonical`. This is the pattern all future image additions follow.
- **Variable names preserved:** `serviceImg1`–`serviceImg6` kept exactly — avoids any modification to the `services` array.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Known Stubs

None — all 6 WebP files exist on disk and are referenced by public path strings. No placeholder data or empty values.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundary surface introduced. Images are public static assets.

## Next Phase Readiness

- FOUN-02 satisfied. Phase 1 (Foundation) complete — both plans done.
- WebP convention established for Phase 4 (ServicesPage) and any future image work.
- `npm run build` exits 0 with WebP files copied verbatim into dist/.
- Phase 2 (Navbar) can proceed immediately.

---
*Phase: 01-foundation*
*Completed: 2026-05-24*
