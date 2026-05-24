---
phase: 01-foundation
reviewed: 2026-05-24T09:11:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - src/index.css
  - src/pages/ServicesPage.jsx
  - scripts/convert-inter.mjs
  - scripts/convert-images.mjs
  - index.html
findings:
  critical: 2
  warning: 5
  info: 3
  total: 10
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-24T09:11:00Z
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Five files from the Phase 01 Foundation implementation were reviewed: the global stylesheet, the ServicesPage component, two one-off conversion scripts, and the HTML shell. The design token system was introduced into `:root` in this phase but the tokens are almost entirely unused — the stylesheet immediately reverts to inline hex values throughout its own body, making the token layer decorative rather than functional. Two critical defects were found: a MIME-type mismatch on the favicon that suppresses the browser icon in strict renderers, and missing `ttf2woff2` / `sharp` dependencies that make both conversion scripts crash at runtime. Five warnings cover a class-name collision that causes wrong styles on the services CTA, a missing font preload, CWD-sensitive script paths, no error propagation from `sharp`, and the near-total abandonment of the new design tokens. Three info items note minor quality issues.

---

## Critical Issues

### CR-01: Favicon declared as `image/svg+xml` but references a PNG file

**File:** `index.html:5`
**Issue:** The `<link rel="icon">` sets `type="image/svg+xml"` while the actual file is `/sbLogo.png`. Browsers that validate the MIME type against the declared type (Firefox, Safari) will silently drop the favicon, displaying a blank tab icon in production. The file extension is the browser's authoritative signal; the type attribute makes the mismatch explicit and unfixable without changing one of the two values.
**Fix:**
```html
<!-- Option A: keep the PNG, fix the type -->
<link rel="icon" type="image/png" href="/sbLogo.png" />

<!-- Option B: add an SVG favicon and keep the declaration as-is -->
<link rel="icon" type="image/svg+xml" href="/sbLogo.svg" />
```

---

### CR-02: `ttf2woff2` and `sharp` are not listed in `package.json` — scripts crash at import

**File:** `scripts/convert-inter.mjs:2`, `scripts/convert-images.mjs:1`
**Issue:** Both scripts import third-party packages (`ttf2woff2`, `sharp`) that are absent from both `dependencies` and `devDependencies` in `package.json`. Any developer running these scripts on a clean clone gets a fatal `Cannot find package` error immediately. The scripts are the only mechanism for producing the `.woff2` font file and the `.webp` service images that the site requires; if they cannot be run reliably, the build assets cannot be reproduced.
**Fix:** Add the packages as devDependencies and pin a version:
```bash
npm install --save-dev ttf2woff2 sharp
```
Then verify by running the scripts: `node scripts/convert-inter.mjs && node scripts/convert-images.mjs`.

---

## Warnings

### WR-01: `Button` component always renders `.hero-cta-btn` — wrong style on ServicesPage CTA

**File:** `src/components/Button.jsx:14`, `src/pages/ServicesPage.jsx:105`
**Issue:** `Button.jsx` hardcodes `className="hero-cta-btn"` on the rendered `<Link>`. `ServicesPage.jsx` uses `<Button>` inside `.services-cta-section`, which has a matching `.services-cta-btn` class in CSS with different sizing, border, and hover colours. The correct class is never applied. The button renders with hero button dimensions (e.g. `width: 20rem; height: 8rem` at desktop) inside the services CTA section, breaking the intended layout.
**Fix:** Accept an optional `className` prop in `Button` and pass it through, or add a `variant` prop:
```jsx
// Button.jsx
const Button = ({ text, to, Icon, delay, className = "hero-cta-btn" }) => (
  <motion.div ...>
    <Link className={className} to={to}>
      {text}
      {Icon && <Icon size={22} />}
    </Link>
  </motion.div>
);

// ServicesPage.jsx
<Button to="/contact" text="İletişim" Icon={EnvelopeIcon} delay={0.2} className="services-cta-btn" />
```

---

### WR-02: `BarlowCondensed-Bold.woff2` used in CSS but not preloaded in `index.html`

**File:** `index.html:16-17`, `src/index.css:65`
**Issue:** `index.html` preloads `BarlowCondensed-Black.woff2` (weight 900) but not `BarlowCondensed-Bold.woff2` (weight 700), which is declared in a separate `@font-face` block in the CSS and will be downloaded as a render-blocking late-fetch. Any element using `font-weight: 700` with `--font-display` will flash unstyled text (FOUT) until the Bold variant downloads. The preload only covers half the font surface.
**Fix:**
```html
<link rel="preload" href="/fonts/BarlowCondensed/BarlowCondensed-Bold.woff2"
      as="font" type="font/woff2" crossorigin>
```

---

### WR-03: Both conversion scripts use CWD-relative paths — silently corrupt output if run from wrong directory

**File:** `scripts/convert-inter.mjs:4-6`, `scripts/convert-images.mjs:4-12`
**Issue:** `readFileSync('public/fonts/Inter/...')`, `writeFileSync(...)`, `mkdirSync(...)`, and all `sharp(src)` paths are relative strings. Node resolves them against `process.cwd()`, not the script's own `__dirname`/`import.meta.url`. Running the scripts from any directory other than the project root (e.g. `node ../../scripts/convert-images.mjs` from a CI working dir) silently reads from or writes to the wrong location, corrupting or missing assets with no diagnostic output.
**Fix:** Anchor paths to the script file's location using `import.meta.url`:
```js
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const input = readFileSync(resolve(root, 'public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf'));
```

---

### WR-04: `convert-images.mjs` has no error handling — a single bad image silently aborts the loop

**File:** `scripts/convert-images.mjs:15-18`
**Issue:** The `for` loop `await`s `sharp(...).toFile(dest)` with no `try/catch`. If any source image is missing or malformed, `sharp` throws, the loop aborts, and subsequent images are never processed. The script exits with a non-zero code but no per-file diagnosis. In a CI pipeline this looks like a complete failure even if only one of six images is missing.
**Fix:**
```js
for (const [src, dest] of images) {
  try {
    await sharp(src).webp({ quality: 82, effort: 6 }).toFile(dest);
    console.log(`Converted: ${dest}`);
  } catch (err) {
    console.error(`Failed: ${src} → ${err.message}`);
    process.exitCode = 1;
  }
}
```

---

### WR-05: Design token system added to `:root` is bypassed by 30+ hardcoded hex values in the same file

**File:** `src/index.css:1-50` (tokens), `src/index.css:110-807` (usages)
**Issue:** The Phase 01 work introduced a complete design token layer (colors, spacing, z-index, motion) in `:root`. Of the 6 `var(--...)` references in the file, 5 are structural (`--color-bg`, `--font-body`, etc. on `html`/`body`). The remaining 900+ lines of rules use raw hex values: `#194d88`, `#fefcfb`, `#2d080a`, `rgba(75,75,75,0.75)` etc. appear 30+ times. The tokens are not wired to the component styles they were introduced to govern. This makes the token system non-functional as a theming or consistency mechanism.
**Fix:** Replace inline hex values with the corresponding token references. For example:
```css
/* Before */
background-color: #194d88;
color: #fefcfb;

/* After */
background-color: var(--color-surface);   /* or introduce --color-brand: #194d88 */
color: var(--color-text-primary);
```
At minimum, the brand blue (`#194d88`), off-white (`#fefcfb`), and dark-red (`#2d080a`) should each be declared as a named token so the 30+ references can be updated from one place.

---

## Info

### IN-01: `<title>` in `index.html` is a fallback placeholder — React SEO component overwrites it, but bots may read the shell

**File:** `index.html:20`
**Issue:** The HTML shell has `<title>SB Teknik Malzeme</title>`. All pages override this via the `<SEO>` component using React 19's document metadata API. Since this is a pure-CSR SPA with no SSR, crawlers that render JS will see the correct per-page title. Crawlers that read the raw HTML (some social scrapers, older bots) will always see the generic fallback. This is a known SSR-vs-CSR tradeoff documented in `CLAUDE.md`, so it is noted as informational rather than a warning.

---

### IN-02: `convert-inter.mjs` is a one-shot script with output already committed — no guard against re-running

**File:** `scripts/convert-inter.mjs`
**Issue:** The `.woff2` output file already exists in `public/fonts/Inter/`. The script unconditionally overwrites it every run (`writeFileSync` with no existence check). This is harmless if the TTF source is unchanged but will silently replace a hand-tuned file. A simple existence guard would make intent explicit.

---

### IN-03: `@font-face` `unicode-range` on Barlow Condensed is missing the Latin Extended-A block needed for Turkish uppercase I-dot (U+0130)

**File:** `src/index.css:69-73`, `src/index.css:82-87`
**Issue:** The `unicode-range` declarations include `U+0130-0131` (İ/ı) as individual code points, which is correct. However `U+011E-011F` (Ğ/ğ) and `U+015E-015F` (Ş/ş) are present but `U+00C7` (Ç) and `U+00E7` (ç) are listed separately. The coverage looks complete on inspection — this is informational noting that the ranges are non-standard (manually assembled rather than the Google Fonts standard block) and should be verified against the actual font's character set if rendering issues appear with Turkish headlines.

---

_Reviewed: 2026-05-24T09:11:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
