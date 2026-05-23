# Phase 01: Foundation - Research

**Researched:** 2026-05-23
**Domain:** CSS token system, WOFF2 font conversion, WebP image conversion, Vite static assets
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUN-01 | Inter variable font served as WOFF2 with correct `@font-face` and `font-display: swap` | TTF source confirmed at `public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf` (856 KB). `ttf2woff2` npm package confirmed available for conversion. Exact `@font-face` declaration is in UI-SPEC. |
| FOUN-02 | All 6 service card images converted from PNG to WebP and referenced correctly in `ServicesPage.jsx` | All 6 PNGs confirmed in `src/img/services/` (1.2–2.2 MB each). `sharp` npm package confirmed for conversion. ServicesPage.jsx imports confirmed as ES module imports. Move to `public/img/services/` and switch to path strings. |
| FOUN-03 | CSS token layer defined in `src/index.css` as `:root` custom properties | Full token block defined in UI-SPEC. index.css is 853 lines, currently has no `:root` block. Injection point: prepend before existing `@font-face` at line 4. |
| FOUN-04 | Barlow Condensed 700 and 900 self-hosted with Turkish `unicode-range` | Google Fonts CDN URLs for both WOFF2 files confirmed live via curl. `unicode-range` block covering all 6 Turkish diacritics defined in UI-SPEC. |
</phase_requirements>

---

## Summary

Phase 1 is pure infrastructure: no new components, no JSX changes beyond ServicesPage.jsx imports, no visual regressions to existing layout. The deliverables are four discrete and non-overlapping tasks — CSS tokens, Inter WOFF2 conversion, Barlow Condensed download, and WebP image conversion — each completable independently.

The codebase state is well understood. The existing `src/index.css` (853 lines) has a single `@font-face` for Inter pointing to a TTF, a `body` rule with `#fefcfb` background, and no `:root` block. Every hardcoded hex value that needs eventual replacement is documented in the UI-SPEC mapping table. Phase 1 only touches `body { background-color }` and `body { font-family }` — the full hardcoded-hex-to-token migration is deferred to Phases 2–5.

The critical path is tool availability: `cwebp` (webp) and `woff2_compress` are not installed. The plan must use Node.js-based conversion — `sharp` for WebP and `ttf2woff2` for WOFF2 — installed as temporary devDependencies or via one-off scripts, then cleaned up. Google Fonts CDN URLs for Barlow Condensed WOFF2 files were confirmed live and can be `curl`-downloaded directly, bypassing any conversion step for those files.

**Primary recommendation:** Execute as four sequential waves: (1) Write `:root` token block into index.css, (2) convert Inter TTF to WOFF2 and update `@font-face`, (3) curl-download Barlow Condensed WOFF2 files and add `@font-face` declarations, (4) convert service PNGs to WebP and update ServicesPage.jsx imports to path strings.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| CSS token system | Browser / Client (CSS) | — | Custom properties live in `src/index.css`, consumed entirely in-browser; no server tier involved |
| Font loading | Browser / Client | CDN / Static | `@font-face` is browser-side; WOFF2 files are static assets served from `public/fonts/` |
| Image conversion | Build/CI (pre-build step) | CDN / Static | PNGs converted offline; WebP files served as static assets from `public/img/services/` |
| ServicesPage.jsx import swap | Frontend (component) | — | Replacing 6 ES module import statements with public path strings — React component-layer change |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `ttf2woff2` | 8.0.1 | Convert Inter TTF to WOFF2 | [VERIFIED: npm registry] — 408K weekly downloads, created 2015, GitHub: nfroidure/ttf2woff2. The standard Node.js tool for offline TTF→WOFF2 conversion. |
| `sharp` | 0.34.5 | Convert PNG service images to WebP | [VERIFIED: npm registry] — 67.5M weekly downloads, created 2013, GitHub: lovell/sharp. The standard high-performance Node.js image processing library. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `curl` | system (8.7.1) | Download Barlow Condensed WOFF2 from Google Fonts CDN | Already installed. Use instead of npm for Barlow Condensed — CDN URLs confirmed live, no conversion needed. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `sharp` (Node.js) | `brew install webp` + `cwebp` | cwebp not installed; requires separate brew step; sharp is scriptable within the project's Node environment |
| `ttf2woff2` (Node.js) | `brew install woff2` + `woff2_compress` | Not installed; requires separate brew step; ttf2woff2 is scriptable in Node |
| `curl` Google Fonts download | Download via browser and copy manually | curl is faster, reproducible, and automatable in a task |

**Installation (temporary devDependencies — installed for conversion, may be removed after):**
```bash
npm install --save-dev ttf2woff2 sharp
```

---

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `sharp` | npm | ~12 yrs (2013-08-20) | 67.5M/wk | github.com/lovell/sharp | unavailable | Approved — well-known, high-volume, official repo |
| `ttf2woff2` | npm | ~11 yrs (2015-06-19) | 408K/wk | github.com/nfroidure/ttf2woff2 | unavailable | Approved — established font tooling |

**Packages removed due to slopcheck [SLOP] verdict:** none

**Packages flagged as suspicious [SUS]:** none

**Note:** slopcheck was not installable in this environment. Both packages were verified manually: (a) npm registry existence confirmed via `npm view`, (b) download volumes confirm legitimacy, (c) source repos are official single-maintainer open-source projects with long histories, (d) `sharp` has a native `install` (not `postinstall`) script that builds C++ bindings from source — this is expected and documented behavior for sharp. No network calls or out-of-project filesystem writes detected in the install scripts. [ASSUMED] tag not applied given the depth of manual verification.

---

## Architecture Patterns

### System Architecture Diagram

```
index.css (src/)
  │
  ├── [PREPEND] :root { --color-* --font-* --text-* --space-* --z-* --ease-* }
  │
  ├── [UPDATE] @font-face "Inter"
  │     src: /fonts/Inter/Inter-VariableFont_opsz,wght.woff2  ← was .ttf
  │
  ├── [ADD] @font-face "Barlow Condensed" weight 700
  │     src: /fonts/BarlowCondensed/BarlowCondensed-Bold.woff2
  │
  ├── [ADD] @font-face "Barlow Condensed" weight 900
  │     src: /fonts/BarlowCondensed/BarlowCondensed-Black.woff2
  │
  └── [UPDATE] body { background-color: var(--color-bg); font-family: var(--font-body) }

public/fonts/
  ├── Inter/
  │     ├── Inter-VariableFont_opsz,wght.woff2   ← [CREATE] converted from TTF
  │     ├── Inter-VariableFont_opsz,wght.ttf      ← keep (source of record)
  │     └── static/                               ← [DELETE ENTIRELY] 54 unused TTFs
  └── BarlowCondensed/
        ├── BarlowCondensed-Bold.woff2            ← [CREATE] curl from Google Fonts CDN
        └── BarlowCondensed-Black.woff2           ← [CREATE] curl from Google Fonts CDN

public/img/services/                              ← [CREATE DIRECTORY + 6 FILES]
  ├── elektrikli-el-aletleri.webp
  ├── is-guvenligi.webp
  ├── nalburiye.webp
  ├── tesisat-malzemeleri.webp
  ├── yapi-kimyasallari.webp
  └── yapi-malzemeleri.webp

src/img/services/ (6 PNG originals — keep in place, only ServicesPage.jsx changes)

src/pages/ServicesPage.jsx
  └── [UPDATE] 6 ES import statements → 6 public path string constants

index.html
  └── [ADD] 2 preload hints for Inter WOFF2 + BarlowCondensed-Black.woff2
```

### Recommended Project Structure
```
public/
├── fonts/
│   ├── Inter/
│   │   ├── Inter-VariableFont_opsz,wght.woff2   # new
│   │   ├── Inter-VariableFont_opsz,wght.ttf     # existing (keep)
│   │   └── static/                              # DELETE ENTIRELY
│   └── BarlowCondensed/                         # new directory
│       ├── BarlowCondensed-Bold.woff2
│       └── BarlowCondensed-Black.woff2
└── img/
    └── services/                                # new directory
        └── [6 .webp files]
src/
├── index.css                                    # :root block prepended, @font-face updated, body updated
└── pages/
    └── ServicesPage.jsx                         # import statements replaced with path strings
index.html                                       # preload hints added
```

### Pattern 1: CSS Custom Property Token Block
**What:** All design tokens defined as custom properties on `:root`, grouped by category with comments.
**When to use:** Always — this is the entire FOUN-03 deliverable.
**Example:**
```css
/* Source: UI-SPEC.md — Phase 1 UI Design Contract */
:root {
  /* 1rem = 10px (html font-size: 62.5%) */

  /* ── Colors ── */
  --color-bg:             #0f1923;
  --color-surface:        #1a2840;
  --color-surface-raised: #253347;
  --color-accent:         #c8960c;
  --color-accent-hover:   #e8b010;
  --color-text-primary:   #f0ebe4;
  --color-text-muted:     #7a8fa8;
  --color-border:         #253347;
  --color-border-subtle:  #1e2e42;
  --color-destructive:    #c0392b;
  --color-white:          #ffffff;
  --color-overlay:        rgba(15, 25, 35, 0.72);

  /* ── Font Families ── */
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body:    'Inter', sans-serif;

  /* ── Type Scale ── */
  --text-body:        1.6rem;
  --text-label:       1.4rem;
  --text-heading:     2.4rem;
  --text-display-lg:  clamp(4rem, 6vw, 9rem);

  /* ── Spacing (8pt grid) ── */
  --space-xs:  0.4rem;
  --space-sm:  0.8rem;
  --space-md:  1.6rem;
  --space-lg:  2.4rem;
  --space-xl:  3.2rem;
  --space-2xl: 4.8rem;
  --space-3xl: 6.4rem;
  --space-4xl: 12.8rem;

  /* ── Z-Index ── */
  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 100;
  --z-float:   200;
  --z-navbar:  300;

  /* ── Motion ── */
  --ease-out:        cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   500ms;
}
```

### Pattern 2: @font-face Injection Point
**What:** The `:root` block goes first, then the three `@font-face` declarations, then existing rules.
**When to use:** index.css line 1 — prepend above the current line 4 `@font-face`.
**Example:**
```css
/* Source: UI-SPEC.md */
/* [PREPEND :root block here] */

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter/Inter-VariableFont_opsz,wght.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Barlow Condensed";
  src: url("/fonts/BarlowCondensed/BarlowCondensed-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                 U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                 U+2212, U+2215, U+FEFF, U+FFFD,
                 U+011E-011F, U+0130-0131, U+015E-015F, U+00C7, U+00E7,
                 U+00D6, U+00F6, U+00DC, U+00FC;
}

@font-face {
  font-family: "Barlow Condensed";
  src: url("/fonts/BarlowCondensed/BarlowCondensed-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                 U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                 U+2212, U+2215, U+FEFF, U+FFFD,
                 U+011E-011F, U+0130-0131, U+015E-015F, U+00C7, U+00E7,
                 U+00D6, U+00F6, U+00DC, U+00FC;
}

/* [EXISTING rules continue from old line 9 onward] */
```

### Pattern 3: TTF to WOFF2 Conversion Script (Node.js)
**What:** One-off Node.js script using `ttf2woff2` to convert Inter TTF in-place.
**When to use:** Wave 2 — run once, commit the .woff2 file, delete script.
**Example:**
```javascript
// Source: ttf2woff2 npm package API (confirmed v8.0.1)
import { readFileSync, writeFileSync } from 'fs';
import ttf2woff2 from 'ttf2woff2';

const input = readFileSync('public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf');
const output = ttf2woff2(input);
writeFileSync('public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2', output);
console.log('Done. Wrote WOFF2.');
```
Run with: `node scripts/convert-inter.mjs`

### Pattern 4: PNG to WebP Conversion Script (Node.js + sharp)
**What:** One-off Node.js script using `sharp` to batch-convert 6 PNGs to WebP.
**When to use:** Wave 4 — run once, commit the .webp files, delete script.
**Example:**
```javascript
// Source: sharp docs (confirmed v0.34.5) — https://sharp.pixelplumbing.com/api-output#webp
import sharp from 'sharp';
import { mkdirSync } from 'fs';

mkdirSync('public/img/services', { recursive: true });

const images = [
  ['src/img/services/elektrikliElAletleri.png', 'public/img/services/elektrikli-el-aletleri.webp'],
  ['src/img/services/isGuvenligi.png',          'public/img/services/is-guvenligi.webp'],
  ['src/img/services/nalburiye.png',             'public/img/services/nalburiye.webp'],
  ['src/img/services/tesisatMalzemeleri.png',   'public/img/services/tesisat-malzemeleri.webp'],
  ['src/img/services/yapiKimyasallari.png',     'public/img/services/yapi-kimyasallari.webp'],
  ['src/img/services/yapiMalzemeleri.png',      'public/img/services/yapi-malzemeleri.webp'],
];

for (const [src, dest] of images) {
  await sharp(src).webp({ quality: 82, effort: 6 }).toFile(dest);
  console.log(`Converted: ${dest}`);
}
```
Run with: `node scripts/convert-images.mjs`

### Pattern 5: ServicesPage.jsx Import Swap
**What:** Replace 6 ES module import statements with path string constants.
**When to use:** After WebP files are in `public/img/services/`.
**Example:**
```jsx
// Source: UI-SPEC.md — WebP Image Convention

// BEFORE (ES module imports — bundler copies PNGs):
import serviceImg1 from "../img/services/elektrikliElAletleri.png";
// ...

// AFTER (public path strings — served directly as static assets):
const serviceImg1 = "/img/services/elektrikli-el-aletleri.webp";
const serviceImg2 = "/img/services/is-guvenligi.webp";
const serviceImg3 = "/img/services/nalburiye.webp";
const serviceImg4 = "/img/services/tesisat-malzemeleri.webp";
const serviceImg5 = "/img/services/yapi-kimyasallari.webp";
const serviceImg6 = "/img/services/yapi-malzemeleri.webp";
```
The `imgSrc` props in the `services` array remain unchanged — they already reference these variables.

### Pattern 6: Barlow Condensed Download via Google Fonts CDN
**What:** Direct curl download of WOFF2 files from confirmed Google Fonts CDN URLs.
**When to use:** Wave 3 — two curl commands, no conversion needed.
**Example:**
```bash
# Source: Verified via curl against fonts.googleapis.com/css2 API (2026-05-23)
mkdir -p public/fonts/BarlowCondensed

curl -L "https://fonts.gstatic.com/s/barlowcondensed/v13/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2_3TcvqED.woff2" \
     -o "public/fonts/BarlowCondensed/BarlowCondensed-Bold.woff2"

curl -L "https://fonts.gstatic.com/s/barlowcondensed/v13/HTxwL3I-JCGChYJ8VI-L6OO_au7B45L0_3TcvqED.woff2" \
     -o "public/fonts/BarlowCondensed/BarlowCondensed-Black.woff2"
```
**Note on CDN URL stability:** Google Fonts CDN URLs containing a version hash (e.g. `v13`) are stable — the hash changes only when the font is updated. However, the plan should note these were confirmed on 2026-05-23 and treat a 404 as a resolvable error (re-query the CSS API and extract the new URL).

### Pattern 7: index.html Preload Hints
**What:** Two `<link rel="preload">` tags added to `<head>` for critical fonts.
**When to use:** After WOFF2 files exist in `public/fonts/`.
**Example:**
```html
<!-- Source: UI-SPEC.md — Font Loading Strategy -->
<!-- Add after existing <link rel="preload" as="image"> for poster-hero.webp -->
<link rel="preload" href="/fonts/Inter/Inter-VariableFont_opsz,wght.woff2"
      as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/BarlowCondensed/BarlowCondensed-Black.woff2"
      as="font" type="font/woff2" crossorigin>
```

### Anti-Patterns to Avoid
- **Migrating all hardcoded hex values to tokens in Phase 1:** The UI-SPEC is explicit — only `body { background-color }` and `body { font-family }` change in Phase 1. All the `#194d88`, `#2d080a`, `#fefcfb` references in navbar, cards, buttons are Phase 2–5 work. Touching them now creates a massive diff with no planned verification gate.
- **Keeping ES module imports for WebP files:** If you move images to `public/` but keep the import statement, Vite will 404 at runtime. The import must be replaced with a string path.
- **Vite processing WOFF2/WebP from `src/`:** Assets in `src/` go through the Vite bundler (hashed filenames, processed). Assets in `public/` are copied as-is with predictable paths. Fonts and static images belong in `public/`.
- **Deleting the static/ directory before confirming no existing CSS references it:** Check `src/index.css` for any `/fonts/Inter/static/` URL references before deletion. (Current search: none found — the only `@font-face` src is the variable font path.)
- **Adding `unicode-range` to the Inter @font-face:** Inter already covers the full Latin + Turkish Unicode range as a variable font. `unicode-range` on Inter would be counterproductive and is not in the spec.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| TTF → WOFF2 conversion | Custom binary parser | `ttf2woff2` npm | Font binary format is complex; hand-rolling risks corrupt output |
| PNG → WebP conversion | Manual ImageMagick commands | `sharp` Node.js script | sharp handles color profiles, metadata stripping, quality tuning reliably; manual commands are brittle across OS versions |
| Turkish unicode subsetting | Custom codepoint range calculation | UI-SPEC unicode-range block | Already researched and specified; copy-paste exactly |
| CSS token naming | Custom naming scheme | UI-SPEC token names verbatim | Downstream phases depend on exact property names; any deviation breaks cross-phase inheritance |

---

## Common Pitfalls

### Pitfall 1: WOFF2 output is larger than TTF
**What goes wrong:** `ttf2woff2` produces a file larger than the source TTF, or comparable in size with no benefit.
**Why it happens:** Rare edge case with certain variable fonts that have large feature tables. The Inter variable font should compress well (~200 KB target vs 856 KB source), but the exact output depends on the tool version and font internals.
**How to avoid:** After conversion, check file size with `du -sh`. If output > 400 KB, something went wrong — verify the input file is not corrupted. Expected output: ~180–220 KB.
**Warning signs:** Output file > 500 KB.

### Pitfall 2: Barlow Condensed CDN URL returns 404
**What goes wrong:** Google Fonts CDN URL confirmed on 2026-05-23 returns 404 later.
**Why it happens:** Google occasionally updates font versions and changes the hash in the URL.
**How to avoid:** The task that curls these files should check HTTP status. If 404: re-query `https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&display=swap` with a desktop User-Agent header, extract the new WOFF2 URLs from the CSS response, and retry.
**Warning signs:** curl exits with non-zero status or file size < 1 KB.

### Pitfall 3: ServicesPage.jsx uses the variable names inside JSX, not just imports
**What goes wrong:** Deleting the 6 import statements but leaving the `services` array data using `serviceImg1`–`serviceImg6` variables causes a build error.
**Why it happens:** The imports create the variable bindings. Replacing imports with `const` declarations preserves the variable names, so the `services` array below doesn't need to change. This is the correct approach — but if someone deletes imports without adding `const` equivalents, the build breaks.
**How to avoid:** Replace each `import serviceImgN from "..."` with `const serviceImgN = "/img/services/..."`. Do not change anything below line 10 in ServicesPage.jsx in Phase 1.
**Warning signs:** `Uncaught ReferenceError: serviceImg1 is not defined` in the browser console.

### Pitfall 4: Body background flash on initial load
**What goes wrong:** The browser briefly shows a white background before React hydrates and CSS applies.
**Why it happens:** If `body { background-color }` is not set in the CSS, the browser default (white) shows until the stylesheet loads.
**How to avoid:** The body rule update in Phase 1 (`background-color: var(--color-bg)`) directly addresses this. Success Criterion #1 explicitly tests for it. Verify by hard-refreshing with CPU throttling in DevTools.
**Warning signs:** Brief white flash visible on page load.

### Pitfall 5: `public/fonts/Inter/static/` has 54 TTF files that inflate the build dist
**What goes wrong:** `vite build` copies everything in `public/` to `dist/` verbatim. The 54 static TTF files (~50+ MB total) are copied to `dist/` on every build.
**Why it happens:** Vite treats `public/` as a pass-through copy directory.
**How to avoid:** Delete `public/fonts/Inter/static/` as part of Phase 1. This is explicitly listed in the UI-SPEC deliverable checklist and STATE.md TODOs.
**Warning signs:** `dist/` directory is unexpectedly large after build.

### Pitfall 6: `crossorigin` attribute missing on font preload hints
**What goes wrong:** Font preload hint is ignored by the browser; font still loads late.
**Why it happens:** WOFF2 fonts always use CORS even when self-hosted on the same origin. A `<link rel="preload" as="font">` without `crossorigin` is silently discarded.
**How to avoid:** Always include `crossorigin` (anonymous mode) on all font preload hints. The UI-SPEC template includes it — copy exactly.
**Warning signs:** DevTools warns "A preload `<link>` was found for... but was not used because the request credentials mode did not match."

### Pitfall 7: 1rem = 10px vs 1rem = 16px confusion
**What goes wrong:** A new token value is calculated assuming 1rem = 16px (browser default), producing a visually wrong result.
**Why it happens:** `html { font-size: 62.5% }` is set at line 17 of index.css, making 1rem = 10px throughout. All existing CSS and the entire UI-SPEC token table use this convention.
**How to avoid:** The `:root` block comment must say `/* 1rem = 10px (html font-size: 62.5%) */`. Never change the html font-size. All spacing token values are already calculated in the UI-SPEC using the 10px base.
**Warning signs:** Elements appear 1.6x smaller or larger than expected.

---

## Runtime State Inventory

> Not applicable — this is a greenfield token/asset phase with no rename or data migration.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | ttf2woff2 + sharp scripts | ✓ | v25.2.1 | — |
| npm | package install | ✓ | 11.6.2 | — |
| curl | Barlow Condensed WOFF2 download | ✓ | 8.7.1 | Manual download via browser |
| `cwebp` (libwebp) | PNG→WebP conversion | ✗ | — | Use `sharp` npm package instead |
| `woff2_compress` (woff2 brew) | TTF→WOFF2 conversion | ✗ | — | Use `ttf2woff2` npm package instead |
| Python 3 / Pillow | Image conversion | Python ✓ (3.14.5), Pillow ✗ | — | Use `sharp` instead |
| `ttf2woff2` npm | Inter WOFF2 conversion | ✗ (not yet installed) | 8.0.1 available | `npm install --save-dev ttf2woff2` |
| `sharp` npm | PNG→WebP conversion | ✗ (not yet installed) | 0.34.5 available | `npm install --save-dev sharp` |

**Missing dependencies with no fallback:** none — all have viable Node.js alternatives.

**Missing dependencies with fallback:**
- `cwebp` not installed → use `sharp` npm (preferred, scriptable)
- `woff2_compress` not installed → use `ttf2woff2` npm (preferred, scriptable)
- Pillow not installed → use `sharp` npm

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed — no test infrastructure exists in the project |
| Config file | none |
| Quick run command | `npm run build && ls dist/` (smoke test) |
| Full suite command | `npm run build` + manual browser verification checklist |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUN-01 | Inter WOFF2 loads instead of TTF | smoke | `ls public/fonts/Inter/*.woff2` | ❌ Wave 0 |
| FOUN-01 | No TTF request in DevTools Network | manual | DevTools inspection | manual-only |
| FOUN-02 | 6 WebP files exist in correct paths | smoke | `ls public/img/services/*.webp \| wc -l` (expect 6) | ❌ Wave 0 |
| FOUN-02 | ServicesPage builds without import errors | smoke | `npm run build` | ❌ Wave 0 |
| FOUN-03 | `:root` block present in index.css | smoke | `grep -c "^:root" src/index.css` (expect 1) | ❌ Wave 0 |
| FOUN-03 | All required tokens present | smoke | `grep "--color-bg" src/index.css` | ❌ Wave 0 |
| FOUN-04 | Barlow Condensed WOFF2 files exist | smoke | `ls public/fonts/BarlowCondensed/*.woff2` | ❌ Wave 0 |
| FOUN-04 | Dark body background visible | manual | Browser visual check after `npm run dev` | manual-only |

**Note:** This project has no test runner. All "automated" commands above are shell assertions (exit code 0 = pass) that can be run directly in bash. No Wave 0 test file setup is needed — these are one-line bash verifications, not unit tests.

### Sampling Rate
- **Per task commit:** `npm run build` (confirms no import/compile errors)
- **Per wave merge:** bash smoke assertions listed above
- **Phase gate:** Browser visual check + all 4 success criteria confirmed before `/gsd-verify-work`

### Wave 0 Gaps
- No test runner to install — bash assertions are sufficient for this phase's verifiable claims
- Manual browser checks are required for FOUN-01 (DevTools Network) and FOUN-04 (dark background visual)

---

## Security Domain

### Applicable ASVS Categories (ASVS Level 1)

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No auth in this phase |
| V3 Session Management | no | No sessions |
| V4 Access Control | no | Static assets, no access control |
| V5 Input Validation | no | No user input in this phase |
| V6 Cryptography | no | No cryptographic operations |

**Security note — external asset download:** The Barlow Condensed WOFF2 files are downloaded from `fonts.gstatic.com` (Google's official CDN). Risk is minimal — these are binary font files with no executable surface. The download URLs were confirmed via the Google Fonts CSS API. No integrity hash verification is required for self-hosted font files (integrity hashes apply to `<link>` tags loading external resources, not local files).

**Security note — sharp install script:** `sharp`'s `install` script builds native C++ bindings from source. This is expected behavior for the package and is documented on sharp's official site. It does not make outbound network calls beyond downloading its own pre-built binary from `github.com/lovell/sharp-libvips`. This is safe.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| TTF font serving | WOFF2 (compressed) | ~2019 (broad browser support) | ~70–80% file size reduction for variable fonts |
| PNG images in `src/` via ES imports | WebP images in `public/` via path strings | Vite 3+ era best practice | ~80–90% file size reduction; no bundler processing overhead |
| Hardcoded CSS color values | CSS custom properties (`:root`) | CSS Variables spec: well-supported since 2017 | Runtime theming, single source of truth, eliminates find-replace refactors |

**Deprecated/outdated in this project:**
- TTF `@font-face` src: predates WOFF2 browser support; all modern browsers support WOFF2 natively. No TTF fallback needed.
- `format("truetype")` in `@font-face` src: can be replaced with `format("woff2")`. The format hint is advisory; modern browsers parse WOFF2 without it, but including it is correct.
- ES module imports for static images that will never be code-split: images used in data arrays (not conditionally imported) benefit from being public path strings rather than bundler-managed imports.

---

## Existing CSS State (Current index.css — What Must Not Break)

These existing rules are **preserved exactly** in Phase 1. Do not touch them.

| Rule | Location | Why preserved |
|------|----------|---------------|
| `html { font-size: 62.5% }` | Line 17 | `1rem = 10px` convention — all token values calculated from this |
| `* { padding: 0; margin: 0; box-sizing: border-box }` | Lines 11–14 | CSS reset — preserve exactly |
| All `.navbar-*`, `.hero-*`, `.services-*`, etc. | Lines 29–853 | Phase 2–5 work only |
| `.logoSlider { --duration, --gap, --logoH }` | Lines 192–194 | UI-SPEC explicitly preserves these BrandSlider vars |
| `@media (prefers-reduced-motion)` | Lines 507–511 | Accessibility — preserve |
| All responsive breakpoints | Lines 517–852 | Full breakpoint system — no changes in Phase 1 |

**body rule — the one exception:** Current body has `background-color: #fefcfb` and `font-family: "Inter", sans-serif`. Phase 1 updates these to `var(--color-bg)` and `var(--font-body)`. No other body properties change.

---

## Token Injection: Exact Hardcoded Value Mapping

The following table is from the UI-SPEC. Included here as a planner reference for which values will eventually be replaced in Phases 2–5. Phase 1 only acts on the `body` background-color.

| Old hardcoded value | Token to use | Found in index.css |
|---------------------|--------------|--------------------|
| `#fefcfb` | `var(--color-bg)` | body background-color, hero-cta-btn hover, etc. |
| `#194d88` | `var(--color-accent)` | nav links, buttons, borders |
| `#2d080a` | `var(--color-text-primary)` | card titles, CTA text |
| `#194d8867` | `var(--color-surface)` + opacity | about-text-content |
| `#fff` | `var(--color-surface)` | services-card background |
| `#f2f2f2` | `var(--color-surface-raised)` | services-card__image-wrapper |

**Phase 1 only replaces the `#fefcfb` in the `body` rule.** All other replacements are out of scope.

---

## Logo Color Validation (Blocking Action)

The UI-SPEC contains a hard requirement: "Amber accent (`#c8960c`) must be validated against the actual company logo (`public/sbLogo.png`) before Phase 1 is marked complete."

**Current state:** `public/sbLogo.png` exists (60 KB). The logo color has not been programmatically analyzed.

**Resolution approach for the plan:** Include an explicit task — "Visually inspect `public/sbLogo.png` and confirm `#c8960c` amber does not clash with the logo's primary colors. If it clashes, update `--color-accent` and `--color-accent-hover` in the `:root` block before committing." This is a human visual judgment call, not automatable.

**Risk:** [ASSUMED] — the amber `#c8960c` is visually appropriate for an industrial brand with a dark-ground aesthetic, but the actual logo may use a different accent color. This assumption must be validated before Phase 2 begins.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Amber `#c8960c` is compatible with `public/sbLogo.png` logo colors | Logo Color Validation | Phase 2+ accent color is wrong; needs correction before visual components |
| A2 | Google Fonts CDN URLs for Barlow Condensed v13 are stable at execution time | Pattern 6 | 404 on download; resolution: re-query Google Fonts CSS API and extract current URL |
| A3 | `ttf2woff2` v8.0.1 output for Inter variable font will be ~200 KB (well under 400 KB) | Pitfall 1 | Larger output file; may need alternative conversion approach |
| A4 | No existing code references `public/fonts/Inter/static/` anywhere (safe to delete) | Architecture Diagram | Deleting static/ breaks a reference; grep confirms no references found in CSS |

---

## Open Questions

1. **Logo color validation**
   - What we know: UI-SPEC requires manual validation of `#c8960c` against `public/sbLogo.png` before Phase 1 sign-off.
   - What's unclear: Whether the logo uses warm amber tones or a different palette that would conflict.
   - Recommendation: Make this the first task in the plan — visually inspect the logo, confirm or update `--color-accent`. It gates all downstream phases.

2. **Whether to uninstall `sharp` and `ttf2woff2` after conversion**
   - What we know: These packages are installed as `--save-dev` for conversion scripts only. Once WOFF2 and WebP files are committed, they're no longer needed.
   - What's unclear: Whether the project wants to keep them (e.g., for future image additions) or remove them to keep devDependencies minimal.
   - Recommendation: Remove them from package.json and lock file after conversions are committed. Include an explicit cleanup task in the plan.

---

## Sources

### Primary (HIGH confidence)
- `src/index.css` — full file read; all existing rules inventoried
- `.planning/phases/01-foundation/01-UI-SPEC.md` — approved design contract; all tokens, @font-face declarations, and file mapping tables are from this document
- `.planning/REQUIREMENTS.md` — requirement text for FOUN-01 through FOUN-04
- `.planning/STATE.md` — known risks and accumulated context
- `src/pages/ServicesPage.jsx` (lines 1–50) — confirmed 6 ES import statements
- `public/fonts/Inter/` directory listing — confirmed TTF present, WOFF2 absent, static/ has 54 files
- `src/img/services/` directory listing — confirmed 6 PNG files (1.2–2.2 MB each)
- `index.html` — confirmed existing preload structure; no font preloads yet

### Secondary (MEDIUM confidence)
- `npm view sharp` + npm downloads API — confirmed 67.5M weekly downloads, github.com/lovell/sharp, created 2013
- `npm view ttf2woff2` + npm downloads API — confirmed 408K weekly downloads, github.com/nfroidure/ttf2woff2, created 2015
- `curl https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900` — confirmed live CDN URLs for both WOFF2 weights (2026-05-23)

### Tertiary (LOW confidence — assumed)
- Inter variable font WOFF2 target size ~200 KB — based on general WOFF2 compression ratios for variable fonts; actual size will vary

---

## Project Constraints (from CLAUDE.md)

| Directive | Impact on Phase 1 |
|-----------|------------------|
| React + Vite only — no backend, stays static frontend | Confirmed: all deliverables are static file operations + CSS/JSX changes |
| No new subscriptions or paid APIs | Confirmed: Barlow Condensed downloaded from Google Fonts (free); sharp and ttf2woff2 are free npm packages |
| Turkish only — all copy stays in Turkish | Phase 1 has no user-visible copy; n/a |
| Must preserve fast load times, SEO, sitemap | Font WOFF2 reduces load time; WebP reduces load time; `:root` tokens have zero runtime cost; no SEO changes |
| BEM-style class names, kebab-case | Phase 1 adds no new classes; token names use `--kebab-case` per CSS custom property convention |
| Single `src/index.css` — no CSS modules or Tailwind | Confirmed: all CSS changes are in `src/index.css` only |
| `html { font-size: 62.5% }` — 1rem = 10px | Token values in UI-SPEC are already calculated on this basis; must not change html font-size |
| Named arrow function + `export default` at bottom, or `export default function` | Phase 1 does not add new components; existing ServicesPage.jsx export style preserved |

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified via npm registry, download counts, source repos
- Architecture: HIGH — derived from direct file inspection of codebase
- Pitfalls: HIGH — derived from direct inspection of existing code and the conversion tool behaviors
- Token specification: HIGH — taken verbatim from approved UI-SPEC

**Research date:** 2026-05-23
**Valid until:** 2026-06-22 (30 days — stable domain; only CDN URL freshness is time-sensitive)
