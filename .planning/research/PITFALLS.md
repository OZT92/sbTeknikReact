# Pitfalls Research

**Project:** SB Teknik Malzeme — Visual Redesign
**Date:** 2026-05-23
**Scope:** React 19 + Vite 7 static site, bold/industrial aesthetic, WhatsApp CTA, SEO preserved

---

## SEO Pitfalls

### 1. Breaking Canonical URLs During Component Restructure

**What goes wrong:** The `SEO.jsx` component receives `canonical` as a prop assembled per-page from `SITE.baseUrl`. If pages are copy-pasted, renamed, or their route paths change during redesign, the canonical prop gets stale or wrong. E.g. `/hizmetler` canonicalized as `/services` after a class rename that touches the component.

**Warning signs:**
- Any change to route strings in `App.jsx`
- Copying a page component to start a restyled version

**Prevention:**
- The `canonical` prop value must always derive from `SITE.baseUrl + exact-route-string`. Audit all four page-level `<SEO>` usages before and after redesign.
- Never hardcode path segments outside of `site.js` or route definitions.

**Phase:** Foundation / first phase — audit before touching any page component.

---

### 2. JSON-LD Schema Silent Breakage

**What goes wrong:** `SEO.jsx` injects JSON-LD via `dangerouslySetInnerHTML`. The schema objects are assembled inline at each call site. During redesign, if a page is refactored and the `jsonLd` prop is accidentally dropped or the import of `SITE` is removed, structured data disappears with no build-time error. Google Search Console won't surface this for days.

**Warning signs:**
- Any page refactor that touches the `<SEO>` call
- ESLint unused-vars suppression in `HomePage.jsx` — that file already has hidden import hygiene issues

**Prevention:**
- After every page component edit, paste the page URL into Google Rich Results Test or use `curl` to grep for `application/ld+json` in the built HTML.
- Add a comment on each `<SEO jsonLd={...} />` call: "Required — do not remove."

**Phase:** Each page restyle phase. Quick check takes 30 seconds.

---

### 3. `og:image` Reference to Non-Existent Asset

**What goes wrong:** `site.js` references `https://sbteknikmalzeme.com/og.jpg` with the comment "varsa; yoksa boş bırakabilirsin." If the bold redesign introduces a new hero or brand image but `og.jpg` is never created/updated in `public/`, social shares will show a broken image. This is invisible during development.

**Warning signs:**
- `ogImage` prop is passed through `SEO.jsx` but `public/og.jpg` doesn't exist (check `ls public/`)

**Prevention:**
- During the final phase, export a 1200×630 JPG from the new hero design, place it at `public/og.jpg`, verify the URL resolves.

**Phase:** Final polish phase.

---

### 4. Sitemap Reflecting Old Structure After Route Changes

**What goes wrong:** If there is a `sitemap.xml` in `public/` (static) or generated at build time, and any route or page slug changes, the sitemap goes stale. For a 4-page site this is low risk, but if the redesign renames a route (e.g. adding a Turkish slug) the old URL stays indexed.

**Warning signs:**
- Any `<Route path=...>` change in `App.jsx`

**Prevention:**
- Keep routes unchanged (confirmed in scope). If any route ever changes, regenerate `sitemap.xml` before deploying.

**Phase:** N/A unless routes change — flag at scope review.

---

## Performance Pitfalls

### 1. Font Swap Flash (CLS) When Moving to Bold Typography

**What goes wrong:** The existing stack uses `font-display: swap` on an 854 KB TTF Inter variable font. A bold redesign that uses heavy weights (800–900) or a second display font compounds this: on slow connections the page renders in fallback font (usually Arial or system-serif), then jumps to the heavy display typeface. This causes significant CLS — measurable layout shift from the font size difference.

**Warning signs:**
- Any new `@font-face` declaration
- Using `font-weight: 800+` that wasn't in the previous design
- Adding a second font family for headings

**Prevention:**
- Convert Inter variable font to WOFF2 immediately (this is already flagged in CONCERNS.md — ~200–250 KB vs. 854 KB TTF). This is the single highest-ROI performance fix.
- If adding a display font: use `font-display: optional` for decorative headings (skips fallback entirely on slow connections) or `font-display: block` with a size-adjusted fallback stack.
- Use `@font-face { size-adjust: X% }` on the fallback to reduce layout shift from font metric differences.
- Subset fonts to Latin + Turkish characters only (saves 30–50% on variable fonts).

**Phase:** Must be done in the foundation phase before any visual work. Not doing this now means compounding it with every subsequent phase.

---

### 2. LCP Regression From New Hero Images or Video

**What goes wrong:** A bold redesign often introduces a large full-bleed hero image or background. If it's a PNG/JPG without `loading="eager"` + `fetchpriority="high"`, or if it's set as a CSS `background-image` (not a `<img>` tag), it is invisible to the browser's preload scanner. LCP degrades.

The existing hero uses a video with an 800ms timer swap (already fragile — see CONCERNS.md). A redesign that replaces this with a CSS background image will make LCP worse, not better.

**Warning signs:**
- Using `background-image: url(...)` in CSS for the primary hero visual
- Adding any image >100 KB above the fold
- Keeping the `setTimeout` video swap pattern

**Prevention:**
- Hero image must be an `<img>` tag with `fetchpriority="high"` and `loading="eager"`.
- Convert all new hero images to WebP, target <100 KB.
- Fix the setTimeout video pattern: use `onCanPlay` event or keep video in DOM from the start with CSS opacity transition.
- Add `<link rel="preload" as="image" href="/hero.webp">` in `index.html` for the hero asset.

**Phase:** Homepage hero restyle phase. This is the highest-traffic page and the LCP source.

---

### 3. Uncompressed Service Card Images Carried Into New Design

**What goes wrong:** The six service PNGs (1.2–2.2 MB each) are already flagged in CONCERNS.md. A visual redesign that keeps these assets but applies new CSS styling does not fix the underlying problem. Easy to overlook because lazy loading masks the issue during development (images only load on scroll).

**Warning signs:**
- `ls -lh src/img/services/` — any file >200 KB is a problem
- Redesign brief says "same 6-category structure" — high risk the old images get carried over unchanged

**Prevention:**
- Convert all six to WebP, target <100 KB each, before implementing the new card design. Doing it after means re-testing the layout.
- Use `vite-plugin-imagemin` or a one-time `sharp` CLI conversion script.

**Phase:** Services page restyle phase — convert images first, then apply new styling.

---

### 4. Heavy Display Font Loading Kills Time-to-Interactive

**What goes wrong:** Bold/industrial aesthetics often use distinctive display fonts (e.g. Bebas Neue, Monument Extended, Druk). These can be 200–500 KB. Adding one on top of the existing 854 KB TTF Inter produces 1+ MB of font loading on first paint.

**Warning signs:**
- Any Google Fonts `<link>` added to `index.html`
- Any new `@font-face` for a typeface not already in `public/fonts/`

**Prevention:**
- Inter variable font already supports weights 100–900 including heavy display weights. Use `font-weight: 800` or `900` with Inter instead of adding a second font. This is zero additional download and produces a genuinely bold look.
- If a second font is truly needed, subset aggressively (Turkish characters: A-Z, a-z, 0-9, Turkish-specific: ÇçĞğİıÖöŞşÜü, punctuation). A properly subsetted display font can be <20 KB.
- Self-host — never use Google Fonts CDN link, it adds a DNS lookup and has privacy implications under Turkish/EU regulations.

**Phase:** Foundation phase — decide font strategy before any page styling.

---

### 5. Unused Static Font Variants Still in Build Output

**What goes wrong:** `public/fonts/Inter/static/` contains 50+ TTF files (335–341 KB each) — already flagged in CONCERNS.md. During redesign, if these aren't deleted, they continue to be served at `sbteknikmalzeme.com/fonts/Inter/static/*.ttf`. They don't affect page performance directly (they're not linked), but they inflate hosting storage and can be accidentally referenced.

**Prevention:**
- Delete `public/fonts/Inter/static/` before or at the start of the redesign. No CSS references them; deletion is safe.

**Phase:** Foundation phase, first PR.

---

## CSS/Design Pitfalls

### 1. Specificity War From Redesign Layered Over Old Rules

**What goes wrong:** The project uses a single `src/index.css` with BEM-ish classes. A common pattern during "redesign without refactor" is adding new rules below old ones, or adding overrides in component-level `<style>` blocks. Within weeks, the same class has conflicting declarations at different specificity levels: `.navbar` from line 29 vs. `.navbar.navbar--redesign` added at line 800. Debugging becomes expensive.

**Warning signs:**
- Adding `.new-` prefixed classes alongside old `.navbar`, `.hero-*` etc. instead of replacing them
- Any `!important` appearing in new CSS
- New styles added at the bottom of `index.css` without removing old rules

**Prevention:**
- For each component being restyled: delete the old CSS rules for that component, replace with new. Don't layer.
- Maintain the existing BEM-ish convention. New components get new block names (`navbar` → `navbar` with updated declarations, not `navbar-v2`).
- Keep `index.css` sections in component order matching the component files. Use the existing section comment pattern (`/* === NAVBAR === */`).

**Phase:** Applies to every phase. Establish the "replace, don't layer" rule in phase one.

---

### 2. `62.5%` Root Font-Size Breaks With Bold Typography Assumptions

**What goes wrong:** The codebase uses `html { font-size: 62.5% }` (1rem = 10px). This is a known pattern but creates invisible bugs when:
- New CSS is copied from external sources (Tailwind examples, design systems) that assume 1rem = 16px — all font sizes will be 62.5% of expected
- A designer specifies sizes in px and the developer converts to rem using the wrong base

**Warning signs:**
- Importing CSS snippets from documentation or design tokens that weren't written for this codebase
- Any text that looks unexpectedly small after implementing new designs

**Prevention:**
- Document the `1rem = 10px` convention prominently at the top of `index.css` (it already has a comment; keep it).
- When translating design specs: divide px value by 10, not 16. E.g. 48px headline → `4.8rem`.
- Never change the `62.5%` root size mid-redesign — it would require updating every `rem` value in the file.

**Phase:** Foundation phase — document this clearly before anyone writes new CSS.

---

### 3. Responsive Breakpoints Broken by New Layout Structures

**What goes wrong:** The existing breakpoints are at 1024px and 640px (BrandSlider), with some `clamp()` usage for font sizes. A bold redesign with new grid layouts, full-bleed sections, or multi-column hero areas often introduces new breakpoints inconsistently — some sections break at 768px, others at 1024px, creating misaligned layouts at intermediate screen sizes.

**Warning signs:**
- Adding `@media (max-width: 768px)` when existing breakpoints are 1024px and 640px
- Grid or flex layouts that haven't been tested at 375px (iPhone SE), 768px (iPad portrait), 1280px (laptop)

**Prevention:**
- Stick to the two existing breakpoints: 1024px and 640px. Add a third (768px) only if genuinely needed, and apply it consistently across all new components.
- Test every new section at 375px, 768px, 1024px, 1440px during development, not just at desktop.
- For bold typography with large `clamp()` values: test that the minimum clamp size is still readable at 320px width.

**Phase:** Each page restyle phase. Mobile review at each component completion.

---

### 4. Dark/Bold Design Breaks the Existing Light Background Assumption

**What goes wrong:** `body { background-color: #fefcfb }` and `color: #194d88` (navy) are the current base. A bold/industrial design often inverts this to dark backgrounds with light text. If the transition isn't systematic — e.g. some components get dark treatment, others don't — the result looks patchy: a dark hero above a white card section above a dark footer.

**Warning signs:**
- Applying `background: #111` to some sections while others inherit `#fefcfb`
- Text color not updated when background changes (dark text on dark background)

**Prevention:**
- Decide on the color system before writing any new CSS: define CSS custom properties for `--bg-primary`, `--bg-surface`, `--text-primary`, `--text-muted`, `--accent`. Apply globally.
- Make `body` background match the dominant new tone. Section-level overrides are fine but must always set both background AND text color together.

**Phase:** Foundation phase — color system definition before any component work.

---

## Accessibility Pitfalls

### 1. Contrast Failures on Bold/Dark Designs

**What goes wrong:** Dark backgrounds with colored text (common in industrial aesthetics — dark navy, charcoal, rust accents) frequently fail WCAG AA (4.5:1 for normal text, 3:1 for large text). The existing navy `#194d88` on `#fefcfb` passes comfortably. Moving to white text on a dark tone or using accent colors for body text often fails.

**Specific risks for this project:**
- White (`#fefcfb`) on navy (`#194d88`): passes (contrast ~7:1)
- Yellow/amber accent on white: often fails
- Mid-grey text on dark background: often fails
- "Ghost" buttons (outline only) on semi-transparent backgrounds: usually fails

**Warning signs:**
- Any text color that isn't clearly black, white, or the navy already in use
- Accent colors used for body text or labels
- Hover states that change text color without checking contrast

**Prevention:**
- Run every new color pairing through WebAIM Contrast Checker before committing to the design system.
- Minimum target: WCAG AA (4.5:1 for body, 3:1 for headings >18px bold).
- Define contrasted pairs in CSS custom properties and only use those pairs — never ad-hoc color values in component CSS.

**Phase:** Foundation phase (color system). Spot-check at each page restyle phase.

---

### 2. Focus Indicators Disappear on Dark Backgrounds

**What goes wrong:** The existing site likely has default browser focus outlines. Bold dark designs often suppress these with `outline: none` because they look ugly on dark backgrounds, creating a keyboard navigation regression.

**Warning signs:**
- Any `outline: none` or `outline: 0` in new CSS without a replacement focus style
- Dark background sections where the browser's default blue focus ring is invisible

**Prevention:**
- Replace, don't remove: `outline: none; box-shadow: 0 0 0 3px var(--accent)` gives a visible custom focus ring.
- Test keyboard navigation (Tab key) through the navbar and all interactive elements after each phase.

**Phase:** Navbar redesign phase (navbar is keyboard-navigable). Applies to WhatsApp CTA button.

---

### 3. WhatsApp CTA Button Lacks Accessible Label

**What goes wrong:** A floating WhatsApp button is typically just a green circle with the WhatsApp icon — no visible text. Screen readers will either announce nothing or announce the icon name if it has `aria-label`. Without `aria-label`, it fails WCAG 2.1 Success Criterion 4.1.2.

**Prevention:**
- Always add `aria-label="WhatsApp ile iletişime geçin"` on the button element.
- If using a Phosphor icon, ensure `aria-hidden="true"` on the icon itself and the label is on the parent button.

**Phase:** WhatsApp CTA phase.

---

### 4. Decorative Video Without Proper ARIA Hiding

**What goes wrong:** The hero video and about page video are decorative — `aria-hidden` may already be set (confirmed for about video in CONCERNS.md). If new hero sections add video or animated backgrounds without `aria-hidden="true"`, screen readers will announce them as media elements, creating noise.

**Prevention:**
- Every decorative `<video>`: `aria-hidden="true"`, no `<track>`, `muted`, `loop`, `playsInline`.
- For `prefers-reduced-motion`: wrap video autoplay in a CSS media query or JS check.

**Phase:** Homepage hero restyle phase.

---

## WhatsApp CTA Pitfalls

### 1. Button Covers Content on Mobile

**What goes wrong:** A fixed-position floating button in the bottom-right corner (standard placement) overlaps page content at small viewports. On a 375px wide screen, a 56px button at `bottom: 20px; right: 20px` can cover text, form fields, or the contact page phone number.

**Warning signs:**
- Not testing at 375px viewport width with the button present
- Contact page has phone/email links near the bottom-right area

**Prevention:**
- Use `bottom: 24px; right: 16px` (slightly less margin than desktop).
- Add `padding-bottom` to any page section that ends near the bottom of the viewport on mobile, or push the button higher when the contact section is in view.
- Keep the button 48px minimum touch target (WCAG 2.5.5).

**Phase:** WhatsApp CTA phase.

---

### 2. Pre-filled Message Contains Encoding Issues in Turkish

**What goes wrong:** The `wa.me` link with a pre-filled message uses a `text` query parameter. Turkish characters (ğ, ş, ı, ö, ü, ç) must be URL-encoded. If the message is hardcoded as a plain string in JSX href, some devices will mangle the characters, producing a garbled opening message.

**Example of the bug:** `https://wa.me/90XXXXXXXXXX?text=Merhaba, bilgi almak istiyorum` — the comma and Turkish chars need encoding.

**Prevention:**
- Always use `encodeURIComponent()` on the message text:
  ```js
  const msg = encodeURIComponent("Merhaba, SB Teknik hakkında bilgi almak istiyorum.");
  const href = `https://wa.me/902122566646?text=${msg}`;
  ```

**Phase:** WhatsApp CTA phase — one line of code, do it right the first time.

---

### 3. Button Pulse/Animation Causes Distraction and CLS

**What goes wrong:** Floating WhatsApp buttons often have a pulsing ring animation to draw attention. This:
- Triggers `prefers-reduced-motion` violations if not wrapped in a media query
- Can cause CLS if the animation affects layout (scale transforms are fine; margin/padding animations are not)
- Becomes genuinely annoying to B2B users who are focused on evaluating the company, not being herded toward contact

**Warning signs:**
- Any `animation` or `@keyframes` on the WhatsApp button that uses `margin`, `padding`, `width`, or `height`

**Prevention:**
- If animation is used: `transform: scale()` or `box-shadow` pulse only — these are compositor-layer properties that don't cause CLS.
- Wrap all animation in `@media (prefers-reduced-motion: no-preference) { ... }`.
- Consider no animation at all — the green WhatsApp color is already highly distinctive.

**Phase:** WhatsApp CTA phase.

---

### 4. Button Appears Immediately on Page Load (Annoyance Pattern)

**What goes wrong:** A floating CTA that appears instantly on page load before the user has read anything is a UX anti-pattern. For a B2B audience evaluating a supplier, it signals desperation rather than confidence.

**Prevention:**
- Delay visibility by 3–5 seconds after page load, or show after the user has scrolled 30% down the page.
- Use CSS opacity/transform transition (not `display` toggle — that causes layout recalculation).
- Do not re-animate on every page navigation (the button is persistent; once shown, keep it shown).

**Phase:** WhatsApp CTA phase.

---

### 5. No `rel="noopener"` on WhatsApp Link

**What goes wrong:** The `wa.me` link opens in a new tab (`target="_blank"`). Without `rel="noopener noreferrer"`, the opened tab can access `window.opener` — a minor security issue, but a standard hygiene item.

**Prevention:**
- `<a href={href} target="_blank" rel="noopener noreferrer">`

**Phase:** WhatsApp CTA phase.

---

## Prevention Checklist

Use this checklist at the end of each phase before merging.

### SEO
- [ ] All four pages have `<SEO canonical={...} jsonLd={...} />` present and correct
- [ ] `curl` or browser source view confirms `application/ld+json` block present on each page
- [ ] `public/og.jpg` exists and resolves (final phase)
- [ ] No route paths changed without sitemap update

### Performance
- [ ] Inter variable font converted to WOFF2 (`public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2`)
- [ ] `public/fonts/Inter/static/` deleted
- [ ] All new images are WebP, <100 KB for above-fold, <200 KB for below-fold
- [ ] Hero/LCP image uses `<img fetchpriority="high" loading="eager">`, not CSS background
- [ ] No new `@font-face` declarations beyond Inter WOFF2

### CSS
- [ ] No `!important` in new CSS
- [ ] Old rules for restyled components removed, not left below new rules
- [ ] Tested at 375px, 768px, 1024px, 1440px
- [ ] `font-size` values in `rem` calculated against 1rem = 10px base

### Accessibility
- [ ] All new color pairs checked: minimum 4.5:1 (body text), 3:1 (large text)
- [ ] No `outline: none` without replacement focus style
- [ ] Decorative videos have `aria-hidden="true"`
- [ ] WhatsApp button has `aria-label`

### WhatsApp CTA
- [ ] Pre-filled message uses `encodeURIComponent()`
- [ ] Link has `target="_blank" rel="noopener noreferrer"`
- [ ] Button has minimum 48×48px touch target
- [ ] Button animation (if any) uses only `transform`/`box-shadow`, wrapped in `prefers-reduced-motion`
- [ ] Button delayed or scroll-triggered, not instant on page load

---

*Sources: CONCERNS.md codebase audit (2026-05-23), SEO.jsx and site.js inspection, index.css analysis. Confidence: HIGH for items grounded in existing code; MEDIUM for general redesign patterns.*
