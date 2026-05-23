# Phase 01: Foundation - Pattern Map

**Mapped:** 2026-05-23
**Files analyzed:** 7 (4 modified, 3 created categories)
**Analogs found:** 5 / 7

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/index.css` (modify — prepend `:root`, update `@font-face`, update `body`) | config | transform | `src/index.css` itself (lines 1–24) | self |
| `src/pages/ServicesPage.jsx` (modify — swap 6 ES imports to path strings) | component | request-response | `src/pages/ServicesPage.jsx` lines 1–55 | self |
| `index.html` (modify — add 2 font preload hints) | config | request-response | `index.html` lines 8–13 (existing preload hint) | exact |
| `scripts/convert-inter.mjs` (create — one-off TTF→WOFF2) | utility | file-I/O | none — no scripts/ dir exists | none |
| `scripts/convert-images.mjs` (create — one-off PNG→WebP) | utility | file-I/O | none — no scripts/ dir exists | none |
| `public/fonts/BarlowCondensed/*.woff2` (create — 2 binary files via curl) | config | file-I/O | `public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf` | partial |
| `public/img/services/*.webp` (create — 6 binary files via sharp) | config | file-I/O | `src/img/services/*.png` (6 source PNGs) | partial |

---

## Pattern Assignments

### `src/index.css` — `:root` token block (prepend at line 1)

**Analog:** `src/index.css` lines 1–24 (existing `@font-face` + reset block — establishes the established order of CSS rule groups)

**Existing file structure** (`src/index.css` lines 1–24):
```css
/* =========================
   BASE
========================= */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter/Inter-VariableFont_opsz,wght.ttf") format("truetype");
  font-display: swap;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%; /* 1rem = 10px */
}

body {
  font-family: "Inter", sans-serif;
  background-color: #fefcfb;
  overflow-x: hidden;
}
```

**Injection order — new lines 1–N replace old lines 1–8:**

The new `src/index.css` top section must follow this exact order:

1. `:root { }` block (all tokens)
2. Updated `@font-face` for Inter (WOFF2 path, weight range `100 900`)
3. New `@font-face` for Barlow Condensed 700 (with unicode-range)
4. New `@font-face` for Barlow Condensed 900 (with unicode-range)
5. Existing `* { }` reset (unchanged — old line 10)
6. Existing `html { }` rule (unchanged — old line 16)
7. Updated `body { }` rule (token vars replacing hardcoded values)
8. Remaining rules from old line 26 onward — unchanged

**`:root` block to prepend** (from UI-SPEC, verbatim):
```css
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

**Updated `@font-face` for Inter** (replaces old lines 4–8):
```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter/Inter-VariableFont_opsz,wght.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```
Changes from existing: path `.ttf` → `.woff2`, format `"truetype"` → `"woff2"`, adds `font-weight: 100 900` and `font-style: normal`.

**New `@font-face` blocks for Barlow Condensed** (insert after Inter block):
```css
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
```

**Updated `body` rule** (replaces old lines 20–24):
```css
body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  overflow-x: hidden;
}
```
Changes from existing: `"Inter", sans-serif` → `var(--font-body)`, `#fefcfb` → `var(--color-bg)`, adds `color: var(--color-text-primary)`.

**Constraint — do not touch:** Lines 10–14 (`* { }` reset), line 17 (`html { font-size: 62.5% }`), lines 26–853 (all component and responsive rules). The `BrandSlider` CSS vars (`--duration`, `--gap`, `--logoH`) at approximately line 192 are preserved exactly.

---

### `src/pages/ServicesPage.jsx` — import swap (lines 5–10)

**Analog:** `src/pages/ServicesPage.jsx` lines 1–55 (self-analog — the existing file is the pattern)

**Current state** (lines 1–14, confirmed by read):
```jsx
import SEO from "../components/SEO";
import { SITE } from "../seo/site";
import { motion } from "motion/react";

import serviceImg1 from "../img/services/elektrikliElAletleri.png";
import serviceImg2 from "../img/services/isGuvenligi.png";
import serviceImg3 from "../img/services/nalburiye.png";
import serviceImg4 from "../img/services/tesisatMalzemeleri.png";
import serviceImg5 from "../img/services/yapiKimyasallari.png";
import serviceImg6 from "../img/services/yapiMalzemeleri.png";

import { EnvelopeIcon } from "@phosphor-icons/react";
import Card from "../components/Card";
import Button from "../components/Button";
```

**Target state — lines 5–10 replaced, all other lines unchanged:**
```jsx
import SEO from "../components/SEO";
import { SITE } from "../seo/site";
import { motion } from "motion/react";

const serviceImg1 = "/img/services/elektrikli-el-aletleri.webp";
const serviceImg2 = "/img/services/is-guvenligi.webp";
const serviceImg3 = "/img/services/nalburiye.webp";
const serviceImg4 = "/img/services/tesisat-malzemeleri.webp";
const serviceImg5 = "/img/services/yapi-kimyasallari.webp";
const serviceImg6 = "/img/services/yapi-malzemeleri.webp";

import { EnvelopeIcon } from "@phosphor-icons/react";
import Card from "../components/Card";
import Button from "../components/Button";
```

**Variable name mapping** (camelCase PNG → kebab-case WebP):
| Variable | Old import source | New path string |
|----------|-------------------|-----------------|
| `serviceImg1` | `../img/services/elektrikliElAletleri.png` | `/img/services/elektrikli-el-aletleri.webp` |
| `serviceImg2` | `../img/services/isGuvenligi.png` | `/img/services/is-guvenligi.webp` |
| `serviceImg3` | `../img/services/nalburiye.png` | `/img/services/nalburiye.webp` |
| `serviceImg4` | `../img/services/tesisatMalzemeleri.png` | `/img/services/tesisat-malzemeleri.webp` |
| `serviceImg5` | `../img/services/yapiKimyasallari.png` | `/img/services/yapi-kimyasallari.webp` |
| `serviceImg6` | `../img/services/yapiMalzemeleri.png` | `/img/services/yapi-malzemeleri.webp` |

**Constraint:** Variable names `serviceImg1`–`serviceImg6` must be preserved exactly. The `services` array at lines 18–55 uses these names as `imgSrc` values and must not be modified.

**Note on import ordering:** ES module `import` statements must appear before `const` declarations. However, the existing file has the 6 image imports between the library imports (lines 1–3) and the component imports (lines 12–14). After the swap, `const` declarations cannot be interspersed with `import` statements in strict module semantics. The safe approach: place all 6 `const` declarations after the last `import` statement (after line 14), or keep the block in its current position — `const` at module level is hoisted and works before any JSX is evaluated. Preferred: keep the block at lines 5–10 position but as `const` declarations (valid JS — `const` before `import` is unusual but the imports are already above; the block sits between two import groups, which is fine in ES modules as long as no `import` appears after a `const` that references an imported binding). Simplest safe approach: place all 6 `const` lines immediately after the last `import` line (line 14), then the blank line before `const canonical`.

---

### `index.html` — font preload hints

**Analog:** `index.html` lines 8–13 (existing image preload hint — exact same pattern, different `as` type)

**Existing preload pattern** (lines 8–13):
```html
<link
  rel="preload"
  as="image"
  href="/poster-hero.webp"
  fetchpriority="high"
/>
```

**New font preload hints** (insert after line 13, before `<meta name="viewport">`):
```html
<link rel="preload" href="/fonts/Inter/Inter-VariableFont_opsz,wght.woff2"
      as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/BarlowCondensed/BarlowCondensed-Black.woff2"
      as="font" type="font/woff2" crossorigin>
```

**Critical difference from image preload:** Font preloads require `crossorigin` attribute (anonymous CORS mode). Without it, the browser silently discards the preload hint even for same-origin fonts. The existing image preload does not use `crossorigin` — do not copy that omission for fonts.

---

### `scripts/convert-inter.mjs` (create — one-off, delete after use)

**Analog:** None — no scripts directory exists in the project.

**Pattern source:** `ttf2woff2` npm package API (v8.0.1) + Node.js `fs` module. The project uses `"type": "module"` in `package.json`, so `.mjs` extension is redundant but explicit. Using `.mjs` avoids any ambiguity.

**Complete script** (copy verbatim):
```javascript
import { readFileSync, writeFileSync } from 'fs';
import ttf2woff2 from 'ttf2woff2';

const input = readFileSync('public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf');
const output = ttf2woff2(input);
writeFileSync('public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2', output);
console.log('Done. Wrote WOFF2.');
```

**Run from project root:** `node scripts/convert-inter.mjs`
**Pre-requisite:** `npm install --save-dev ttf2woff2`
**Post-run:** Verify `public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2` is ~180–220 KB. If > 400 KB, conversion failed.

---

### `scripts/convert-images.mjs` (create — one-off, delete after use)

**Analog:** None — no scripts directory exists in the project.

**Pattern source:** `sharp` npm package API (v0.34.5). Uses ESM syntax consistent with `"type": "module"` in `package.json`.

**Complete script** (copy verbatim):
```javascript
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

**Run from project root:** `node scripts/convert-images.mjs`
**Pre-requisite:** `npm install --save-dev sharp`
**Post-run:** Verify `ls public/img/services/*.webp | wc -l` returns 6. Each file should be < 100 KB.

---

## Shared Patterns

### CSS Custom Property on `:root` — pass-through via inline style
**Source:** `src/components/BrandSlider.jsx` lines 7–11
**Apply to:** Any future component needing dynamic CSS vars (not Phase 1, but establishes the project's CSS-var-in-JS pattern)
```jsx
const trackStyle = {
  "--duration": `${speed}s`,
  "--gap": `${gap}px`,
  "--logoH": `${height}px`,
};
// ...
<div className="logoSlider" style={trackStyle} ...>
```
This is the project's established pattern for passing runtime values into CSS. Phase 1 tokens are static (`:root` level), so this pattern is not needed in Phase 1 — but it confirms CSS custom properties are the project's approved mechanism.

### Static public asset path convention
**Source:** `index.html` line 11 (`href="/poster-hero.webp"`) and line 5 (`href="/sbLogo.png"`)
**Apply to:** `scripts/convert-images.mjs` output paths, `scripts/convert-inter.mjs` output path, Barlow Condensed curl targets, `@font-face` src URLs, `index.html` preload hrefs
**Pattern:** All files in `public/` are referenced with a leading `/` and no `/public` prefix. `/poster-hero.webp` refers to `public/poster-hero.webp`. Apply consistently: `/fonts/Inter/...`, `/fonts/BarlowCondensed/...`, `/img/services/...`.

### ESM module format
**Source:** `package.json` line 6 (`"type": "module"`)
**Apply to:** `scripts/convert-inter.mjs`, `scripts/convert-images.mjs`
**Pattern:** Project is ESM. Use `import`/`export` syntax in all JS files. `.mjs` extension on scripts is safe and explicit. No `require()`.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `scripts/convert-inter.mjs` | utility | file-I/O | No scripts directory exists; no prior conversion scripts in the project |
| `scripts/convert-images.mjs` | utility | file-I/O | Same — one-off build utilities are new to this project |

For both: use the RESEARCH.md Pattern 3 and Pattern 4 excerpts verbatim (already reproduced above). No codebase analog to copy structure from.

---

## Metadata

**Analog search scope:** `src/`, `index.html`, `package.json`, `vite.config.js`
**Files read:** `src/index.css` (lines 1–50), `src/pages/ServicesPage.jsx` (lines 1–60), `index.html` (full), `src/components/BrandSlider.jsx` (lines 1–30), `vite.config.js` (full), `package.json` (full)
**Pattern extraction date:** 2026-05-23
