# Architecture Research

**Project:** SB Teknik Malzeme — Visual Redesign
**Researched:** 2026-05-23
**Scope:** CSS architecture, design tokens, component boundaries, build order

---

## Recommended Approach

Keep `src/index.css` as the single stylesheet. Do not migrate to CSS Modules or per-component files. The existing pattern is coherent and well-sectioned — splitting it would add file overhead with no functional benefit for a 4-page static site with no shared-state styling conflicts. The redesign work is entirely about changing *values* (colors, spacing, typography scale, border radii), not about fixing architectural style collisions, so the file-per-component move solves a problem this project does not have.

The correct structural move is to prepend a design token block (CSS custom properties) at the top of `src/index.css`, then update all hard-coded values throughout the file to reference tokens. This is a one-file change that buys the same maintainability as CSS Modules without disrupting the existing pattern.

The WhatsApp CTA is a new shared component — it lives in `src/components/` and mounts globally in `src/App.jsx`, exactly parallel to how `Navbar` is handled today.

---

## CSS Architecture

**Decision: Keep the single `src/index.css` file. Add a token block at the top. Do not split.**

### Why not CSS Modules

- The existing file has zero class name collisions — each section uses clearly scoped prefixes (`navbar-*`, `hero-*`, `services-card__*`, `contact-*`). CSS Modules exist to prevent collisions that already do not exist here.
- Migrating to CSS Modules requires touching every JSX file to replace string class names with `styles.className` imports. That is significant mechanical churn on files that are not the target of this redesign.
- The BEM-ish naming already provides the isolation CSS Modules would add.

### What to actually do

1. Extract all hard-coded color, spacing, and typography values into CSS custom properties in a `:root` block at the very top of `src/index.css` (see Design Tokens section).
2. Replace every raw hex, `rem`, and `px` value in the file with the appropriate token.
3. Rewrite the visual properties — font stacks, sizes, colors, shadows, border-radius — under the existing class names. The selectors stay. Only the values change.
4. Add new classes for new visual elements (WhatsApp CTA, any new section variants) at the bottom of the relevant section, following the same `component-name__element` pattern.

### Class naming: transition from BEM-ish to cleaner

The current naming is already acceptable. There is one inconsistency to fix during the rewrite: `navbar-links_link` uses a single underscore where BEM uses double. Standardise on `navbar-links__link` (double underscore for element) when touching that block. Do not do a project-wide rename pass — only fix naming in sections you are actively rewriting.

**Rule:** When editing a section, normalise its naming. When not editing a section, leave it alone.

---

## Design Tokens

Prepend this block to `src/index.css` as the very first rule after `@font-face`:

```css
:root {
  /* Brand colors */
  --color-primary:       #194d88;   /* steel blue — anchor color */
  --color-primary-dark:  #123a6b;   /* hover/active state */
  --color-accent:        #c0392b;   /* industrial red — use sparingly */
  --color-surface:       #0d0d0d;   /* near-black page background */
  --color-surface-mid:   #1a1a1a;   /* card backgrounds */
  --color-surface-light: #2a2a2a;   /* borders, dividers */
  --color-text-primary:  #f5f0eb;   /* warm off-white body text */
  --color-text-muted:    #a09a94;   /* secondary text */
  --color-overlay:       rgba(0, 0, 0, 0.55);

  /* Typography */
  --font-base:    "Inter", sans-serif;
  --weight-black: 900;
  --weight-bold:  700;
  --weight-semi:  600;
  --weight-reg:   400;

  /* Spacing scale (base 10px via html 62.5%) */
  --space-xs:  0.8rem;
  --space-sm:  1.2rem;
  --space-md:  2rem;
  --space-lg:  3.2rem;
  --space-xl:  5.6rem;
  --space-2xl: 8rem;

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-card: 0 2px 16px rgba(0, 0, 0, 0.5);
  --shadow-btn:  0 1px 10px 0.5px rgba(0, 0, 0, 0.4);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;

  /* Z-index layers */
  --z-base:     0;
  --z-above:    10;
  --z-nav:      100;
  --z-float:    200;   /* WhatsApp CTA */
  --z-overlay:  300;
}
```

**Token naming convention:** `--category-variant` — flat, no nesting. Avoids the `--color-brand-primary-hover-dark` sprawl that makes tokens unreadable.

**How to introduce without breaking:** The tokens themselves are additive — adding `:root { --x: y }` to an existing stylesheet changes nothing until a rule references the variable. Introduce the block first, then migrate one section at a time. The site remains functional and visually identical until you start swapping values.

---

## Component Boundaries

### WhatsApp Floating CTA

**Location:** `src/components/WhatsAppCTA.jsx`

**Mount point:** `src/App.jsx` — rendered once, outside `<Routes>`, adjacent to `<Navbar>`. This mirrors the exact pattern Navbar uses for site-wide persistence.

```jsx
// src/App.jsx (after change)
return (
  <>
    <Navbar />
    <WhatsAppCTA />
    <Routes>
      ...
    </Routes>
  </>
);
```

**Component contract:**
- Accepts no props — contact number is read directly from `SITE.phone` in `src/seo/site.js`, the same source all pages use.
- Renders a fixed-position `<a href="https://wa.me/90XXXXXXXXXX?text=...">` link with `target="_blank" rel="noopener noreferrer"`.
- Styled entirely within `src/index.css` under a `/* WHATSAPP CTA */` section.
- Uses `--z-float: 200` to sit above page content and below any future modals.
- Pre-filled message text is a Turkish string hardcoded in the component (not from `SITE` — it is UI copy, not config).
- No Motion animation needed at first — CSS `:hover` scale transform is sufficient. Add Motion entry animation only if the phase plan calls for it.

**CSS class:** `.whatsapp-cta` (block) with `.whatsapp-cta__icon` (element). Fixed bottom-right, 6rem circle, `--color-accent` or WhatsApp green (`#25d366`) — green is universally recognised and preferred here.

**Communicates with:** Nothing. It is a pure output component — reads one value from `SITE`, renders an anchor. No callbacks, no state, no context.

---

## Build Order

Build component-by-component, not page-by-page. The reasons are:

1. **Tokens and base styles cut across all pages.** If you do "HomePage first", you will set colors and typography for that page, then have to reconcile them when you reach About. Doing tokens first means every subsequent component inherits the correct values automatically.
2. **Navbar appears on all pages.** Redesigning it once at the start means every page preview during development looks correct from the first render.
3. **WhatsApp CTA is global and trivial.** Build it early so it is present in every page review — it is also the deliverable procurement managers will use most.
4. **Pages share Card, Button, BrandSlider.** Redesigning shared components before pages means pages assemble from already-correct parts.

**Recommended sequence:**

| Step | What | Why first |
|------|------|-----------|
| 1 | Design token block in `src/index.css` | Foundation — all subsequent steps build on this |
| 2 | Base/body styles: background, text color, font | Page canvas before any component |
| 3 | `Navbar` | Appears on every page; sets the visual tone |
| 4 | `WhatsAppCTA` | Global, simple, establishes fixed-layer pattern |
| 5 | `Button` | Used by Hero and Services CTA; redesign once |
| 6 | `Card` | Used by ServicesPage; visually complex, needs bold treatment |
| 7 | `BrandSlider` | Cosmetic only — speed, opacity, gap tweaks |
| 8 | `HomePage` | Hero is the statement piece; do it after tokens/nav are solid |
| 9 | `ServicesPage` | Cards already done; mostly grid + CTA work |
| 10 | `AboutPage` | Video overlay + certificate section |
| 11 | `ContactPage` | Simplest page; do last |

Within each step: update the token values first, then the structural/layout properties, then responsive overrides.

---

## Data Flow

The redesign introduces no new data flows. All existing flows remain identical:

- `SITE` object → pages → `SEO` (unchanged)
- `SITE.phone` → `WhatsAppCTA` (new, read-only reference — same pattern as existing `<a href="tel:">` usage in ContactPage)
- Props flow down: pages → `Button`, `Card`, `BrandSlider` (unchanged)

The only architectural addition is the `WhatsAppCTA` node in `App.jsx`, which is a leaf — it reads `SITE.phone` and renders an anchor. It introduces no state, no context, and no upward communication.

**If `src/data/` is created during this phase** (to address the anti-pattern flagged in `ARCHITECTURE.md` — services array and logo array embedded in page files), move those arrays to `src/data/services.js` and `src/data/logos.js`. This does not change the data flow direction; it only moves the definition site. Not required for the visual redesign, but a natural point to clean up if touching `ServicesPage.jsx` anyway.

---

## Confidence Assessment

| Area | Level | Basis |
|------|-------|-------|
| CSS strategy | HIGH | Based on direct inspection of 852-line `index.css` — no collisions, already well-sectioned |
| Token pattern | HIGH | Standard CSS custom properties; no library dependency |
| WhatsApp CTA placement | HIGH | Exact parallel to existing `Navbar` mount pattern in `App.jsx` |
| Build order | HIGH | Derived from component dependency graph in `ARCHITECTURE.md` |
| Naming migration | MEDIUM | Mechanical work — risk is inconsistency if not applied section-by-section |
