# Codebase Concerns

**Analysis Date:** 2026-05-23

## Tech Debt

**ESLint suppression in Button and HomePage:**
- Issue: `/* eslint-disable no-unused-vars */` is used as a blanket file-level suppression rather than suppressing a specific line or fixing the root cause.
- Files: `src/components/Button.jsx`, `src/pages/HomePage.jsx`
- Impact: Masks genuine unused variable warnings; the actual unused import is not identified or removed.
- Fix approach: Remove the file-level disable, identify the specific unused import (likely `motion` or an icon), and either remove it or suppress at the exact line with a comment explaining why.

**Font served as TTF instead of WOFF2:**
- Issue: `@font-face` in `src/index.css` (line 6) loads `Inter-VariableFont_opsz,wght.ttf` — a ~854 KB TTF file.
- Files: `src/index.css`, `public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf`
- Impact: TTF is 2–4x larger than WOFF2 for the same font. Every visitor downloads ~854 KB just for the font on first load.
- Fix approach: Convert the variable font to WOFF2 (e.g. `woff2_compress`), place it in `public/fonts/`, update the `src:` in `@font-face` to `format("woff2")`. Drop the TTF from `public/fonts/Inter/` for production use.

**Unused static Inter font variants shipped in `public/`:**
- Issue: `public/fonts/Inter/static/` contains 50+ individual `.ttf` weight/style variants (each 335–341 KB) that are never referenced in CSS or JS.
- Files: `public/fonts/Inter/static/` (entire directory)
- Impact: These files are copied into the build output and deployed, inflating bandwidth and storage with no benefit.
- Fix approach: Delete `public/fonts/Inter/static/` entirely. Only the single variable font file used by `@font-face` is needed.

**Logo images bundled via `src/` instead of `public/`:**
- Issue: `sbLogo.png` (58 KB) is imported from `src/img/sbLogo.png` into multiple components (`Navbar.jsx`, `ContactPage.jsx`, `AboutPage.jsx`). This causes Vite to inline or hash the asset, making cache-busting unpredictable and duplicating the asset reference across three import sites.
- Files: `src/img/sbLogo.png`, `src/components/Navbar.jsx`, `src/pages/ContactPage.jsx`, `src/pages/AboutPage.jsx`
- Impact: Three separate imports of the same file; any logo update requires touching all three files.
- Fix approach: Move `sbLogo.png` to `public/`, reference it as `/sbLogo.png` everywhere, removing the per-file imports.

**Brand logo images referenced numerically from `public/` with no existence guarantee:**
- Issue: `src/pages/HomePage.jsx` (line 40) constructs logo `src` paths as `/${i + 1}.webp` via `logoAlts.map`. If the count of `logoAlts` (25) ever diverges from actual files in `public/`, broken images appear silently.
- Files: `src/pages/HomePage.jsx`
- Impact: Fragile coupling between a hardcoded array length and filenames; no build-time check.
- Fix approach: Import logo assets explicitly (as done for service images in `ServicesPage.jsx`) or add an assertion/guard. At minimum, document the 1-to-25 naming convention.

## Performance Bottlenecks

**Service card images are uncompressed PNGs (~1.2–2.2 MB each):**
- Problem: Six service images in `src/img/services/` are PNG files ranging from 1.2 MB to 2.2 MB. They are displayed as cards in `ServicesPage.jsx` and loaded lazily, but the raw file size is extreme.
- Files: `src/img/services/elektrikliElAletleri.png`, `isGuvenligi.png`, `nalburiye.png`, `tesisatMalzemeleri.png`, `yapiKimyasallari.png`, `yapiMalzemeleri.png`
- Cause: Original images saved without compression or format conversion.
- Improvement path: Convert to WebP (target <100 KB each), use `<picture>` or the `srcset` attribute with responsive sizes. Vite plugins like `vite-plugin-imagemin` can automate this at build time.

**About page video is 10 MB:**
- Problem: `src/video/sbAboutVideo1-opt.mp4` is 10 MB despite the `-opt` suffix suggesting it was already optimized. This is loaded on every `AboutPage` render.
- Files: `src/video/sbAboutVideo1-opt.mp4`, `src/pages/AboutPage.jsx`
- Cause: Insufficient compression target; video plays in a decorative background role.
- Improvement path: Re-encode at lower bitrate (CRF 28–32 in ffmpeg), reduce resolution to 720p max, target <2 MB. The video is `aria-hidden` and decorative, so quality loss is acceptable.

**Logo PNG (sbLogo.png) is 58 KB:**
- Problem: `src/img/sbLogo.png` at 58 KB is used in the Navbar on every page. A logo at this weight adds to LCP on initial render.
- Files: `src/img/sbLogo.png`
- Improvement path: Convert to WebP or SVG. An SVG would be <5 KB for a typical wordmark/icon logo.

**`bg.png` background image is 184 KB:**
- Problem: `src/img/bg.png` is a 184 KB PNG, likely used as a CSS background. PNG is not optimal for photographic backgrounds.
- Files: `src/img/bg.png`
- Improvement path: Convert to WebP; if it is a repeating texture, consider inlining as a small data URI or using a CSS pattern instead.

## Security Considerations

**Google Maps iframe has no `sandbox` attribute:**
- Risk: The iframe in `ContactPage.jsx` (line 52–59) embeds Google Maps with `allowFullScreen` but no `sandbox` restriction. Without sandboxing, the embedded page can run scripts and potentially navigate the top frame.
- Files: `src/pages/ContactPage.jsx`
- Current mitigation: `referrerPolicy="no-referrer-when-downgrade"` is set.
- Recommendations: Add `sandbox="allow-scripts allow-same-origin"` (minimum required for Google Maps to function). This prevents the embedded page from navigating the top-level frame or submitting forms.

**`dangerouslySetInnerHTML` in SEO component for JSON-LD:**
- Risk: `src/components/SEO.jsx` (line 44) uses `dangerouslySetInnerHTML` to inject structured data. The `jsonLd` prop is assembled from `SITE` constants and hardcoded values, so the current risk is low, but it creates a pattern where future callers could pass user-controlled strings into this prop.
- Files: `src/components/SEO.jsx`
- Current mitigation: All current call sites use static data from `src/seo/site.js`.
- Recommendations: Add a comment making the XSS risk explicit; ensure any future dynamic data (e.g. product names from an API) is sanitized before being passed as `jsonLd`. Alternatively, use `JSON.stringify` with a replacer to strip `<script>` injection patterns.

**Email address hardcoded in source and exposed in `site.js`:**
- Risk: `sbteknik@hotmail.com` is hardcoded in `src/seo/site.js` (line 7) and rendered directly in `ContactPage.jsx` as a plain `mailto:` link. This is publicly visible in the page source and the JS bundle.
- Files: `src/seo/site.js`, `src/pages/ContactPage.jsx`
- Current mitigation: None; this is a static business site so exposure may be intentional.
- Recommendations: If spam becomes an issue, obfuscate the email (CSS direction trick or JS assembly) or replace with a contact form.

## Fragile Areas

**No 404 / catch-all route:**
- Files: `src/App.jsx`
- Why fragile: Only four explicit routes are defined (`/`, `/about`, `/services`, `/contact`). Any unmatched path renders a blank page with no user feedback.
- Safe modification: Add `<Route path="*" element={<NotFoundPage />} />` as the last route in `App.jsx`.
- Test coverage: None.

**`BrowserRouter` used on a static/SPA deployment:**
- Files: `src/main.jsx`
- Why fragile: `BrowserRouter` relies on the server returning `index.html` for all routes. If deployed to a static host without a rewrite rule (e.g. Nginx `try_files`, Vercel `rewrites`, or `_redirects` on Netlify), any direct URL or page refresh on `/about`, `/services`, or `/contact` will return a 404 from the host.
- Safe modification: Verify and document the server rewrite rule for the deployment target. Alternatively, `HashRouter` eliminates the server-side requirement at the cost of URL aesthetics.
- Test coverage: None.

**Hero video delayed by timer, not by user interaction or network signal:**
- Files: `src/pages/HomePage.jsx` (lines 43–48)
- Why fragile: A hardcoded 800 ms `setTimeout` swaps the poster image for the video element. On slow connections the video request starts but the file may not be ready by then, causing a flash or blank frame. The timer value has no relation to actual load state.
- Safe modification: Use the `<video>` element's `onCanPlay` or `onLoadedData` event to swap, or keep the video in the DOM with `preload="metadata"` and `autoPlay` from the start (hiding poster via CSS `opacity`), which is the more standard pattern.
- Test coverage: None.

## Test Coverage Gaps

**No tests exist anywhere in the project:**
- What's not tested: All components, pages, routing, SEO rendering, BrandSlider duplication logic, animation variants, SITE config values.
- Files: Entire `src/` directory.
- Risk: Any refactor, dependency upgrade (e.g. React 19 or `motion` v12 breaking changes), or structural change goes unverified. Regressions are caught only in production.
- Priority: Medium — this is a small marketing site, but the absence of even smoke tests means dependency upgrades carry significant risk.

## Dependencies at Risk

**`motion` package at v12 (renamed from `framer-motion`):**
- Risk: The `motion` package is a major-version rename/rebrand of `framer-motion`. v12 has a different import path (`motion/react` instead of `framer-motion`). This is already adopted correctly, but the package has a history of breaking API changes between majors.
- Impact: Animation variants, `useReducedMotion`, and `whileInView` are used across 5 files. A future major update could silently break animations.
- Migration plan: Pin to a minor range (`^12.x`), monitor changelogs, and add visual regression tests before upgrading majors.

**`react-router` v7 (without the `react-router-dom` package):**
- Risk: The project imports from `react-router` directly (not `react-router-dom`), which is the v7 pattern. v7 is a significant restructuring. Imports like `BrowserRouter` from `react-router` (not `react-router-dom`) are only valid in v7+; if another developer follows v6 docs they will introduce incorrect imports.
- Impact: Potential import confusion on team growth; v7 migration path differs significantly from v6.
- Migration plan: Add a comment or note in `src/main.jsx` stating the router version requirement.

---

*Concerns audit: 2026-05-23*
