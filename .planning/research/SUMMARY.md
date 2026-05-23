# Project Research Summary

**Project:** SB Teknik Malzeme — Bold/Industrial Website Redesign
**Domain:** B2B industrial supply, Turkish market, static React site
**Researched:** 2026-05-23
**Confidence:** HIGH

## Executive Summary

SB Teknik Malzeme is a 10-year-old Istanbul industrial supplier with a solid technical foundation (React 19, Vite 7, Motion, Phosphor Icons, React Router v7) that needs a visual upgrade, not a structural one. The existing 4-page site has all the right content — certificates, partner logos, service categories, contact info — but the current aesthetic (light background, corporate blue) undercuts the bold, industrial authority the audience expects. The recommended approach is a design-token-driven reskin of the existing CSS, new bold typography (Barlow Condensed + Inter), a dark-ground color system with amber accent, and a WhatsApp floating CTA that adds a frictionless contact channel without any backend or new dependencies.

The key insight from features research is that the gap between the current site and a top-performing B2B industrial site is not missing features — it is missing visual authority and a direct contact channel. Adding a product catalog, quote form, or live chat would harm conversion by adding friction and maintenance burden. The highest-ROI work is: (1) make procurement managers feel they have found a serious supplier in the first 5 seconds, and (2) give them a one-tap way to start a conversation.

The primary risk is the redesign compounding existing performance debt: an 854 KB TTF Inter font, 1.2–2.2 MB uncompressed service images, and a setTimeout-based video swap pattern. These must be fixed in the foundation phase before any visual work. If carried into the new design unchanged, the bold aesthetic will load slowly and undo the trust signals it is meant to create.

---

## Stack

**Keep everything. Add nothing new. Extend with design tokens and one new component.**

- **React 19 + Vite 7**: Keep as-is. No structural changes.
- **Motion (Framer) 12.x**: Already installed and used on all pages. Extend with `whileInView` scroll entrance animations and Motion-powered WhatsApp FAB entry animation.
- **Phosphor Icons**: Keep. Note: Phosphor does not include brand icons — WhatsApp button requires an inline SVG for the logo.
- **CSS strategy**: Single `src/index.css` with a CSS custom properties token block prepended. No Tailwind, no CSS Modules. The codebase has zero class naming collisions — the problems those tools solve do not exist here.
- **Typography**: Add Barlow Condensed (700 + 900 weights) self-hosted in `public/fonts/`, declared via `@font-face`. Inter stays as body font. Both WOFF2 only.
- **WhatsApp CTA**: Native `<a href="wa.me/...">` — zero new dependencies. Phone number from `SITE.phone` in `src/seo/site.js`. Pre-filled message uses `encodeURIComponent()`.
- **Color direction**: Dark ground (`#0f1923`) + amber/gold accent (`#c8960c`) — replaces current corporate blue. Needs validation against actual logo colors before committing.

---

## Table Stakes

Features B2B procurement managers expect by default. Missing any causes immediate bounce.

**Already present — must remain prominent through redesign:**
- Phone number visible in navbar
- Physical address (Beyoglu/Istanbul) — reinforce on homepage footer, not just Contact page
- Certificate badges (TSE, ISO 9001, ISO 10002, CE) — upgrade to labeled, legible badges; not decorative icons
- Named service categories (6 categories, scannable in 3 seconds)
- Mobile-responsive layout
- Google Maps embed on Contact page

**Present but needs upgrade:**
- Typography legibility — the core redesign goal; current fonts read as generic
- Contact CTA on every page — currently inconsistent; WhatsApp CTA solves this globally
- Years in business callout — "10+ Yil" / "2015'ten Beri" as a large typographic number, not buried in paragraph text

**Gap to fix in foundation:**
- Fast mobile load (<3s) — blocked by 854 KB TTF font and 1.2–2.2 MB service images; fix before styling

---

## Top Differentiators

Highest-ROI additions over competitors who only have the table stakes.

1. **WhatsApp floating CTA** — WhatsApp is the dominant B2B async contact channel in Turkey. Competitors with only phone/email lose prospects who prefer messaging. One component, global, zero backend.

2. **Bold/industrial visual identity** — Cognitive dissonance between "construction materials supplier" and "generic corporate website" is the single biggest trust gap. The aesthetic redesign itself is the differentiator.

3. **Hero value statement** — Replace vague hero text with "Istanbul'un Guvenilir Endustriyel Tedarikcisi" + "2015'ten beri" anchoring signal. Specificity converts; generic claims do not.

4. **Key stats row** — "10+ Yil", "6 Kategori", "25+ Marka" as large typographic numbers above the fold. Procurement managers scan numbers, not paragraphs.

5. **Certificate badges with full names** — "ISO 9001:2015 Kalite Yonetim Sistemi" displayed as a defined horizontal row, not tiny decorative icons. Almost no competitors do this legibly.

6. **BrandSlider prominence** — Partner logos already built. The redesign must make the slider visually prominent (not tiny, not below the fold). Borrowed authority from recognized brands.

**What not to build:** product catalog, quote form, live chat widget, blog, team profiles, social feed embeds, language toggle. Each adds maintenance burden without conversion lift for this audience.

---

## Architecture Approach

**Build order: tokens => base => Navbar => WhatsAppCTA => Button => Card => BrandSlider => HomePage => ServicesPage => AboutPage => ContactPage**

The reason for component-first (not page-first) order: tokens and Navbar cut across all pages. Building tokens first means every subsequent step inherits the correct values automatically. Building Navbar before any page means every page preview looks correct from the first render.

**CSS strategy — replace, don't layer:**
- Prepend a `:root` CSS custom properties block to `src/index.css` as the first action
- For each component being restyled: delete old rules, write new ones under the same selectors
- Never add `.new-` prefixes or override layers — specificity wars compound quickly
- `1rem = 10px` (`html { font-size: 62.5% }`) — document prominently; all new CSS must calculate against this base, not the 16px default

**WhatsApp CTA component:**
- `src/components/WhatsAppCTA.jsx` — no props, reads `SITE.phone`, renders fixed anchor
- Mounted in `src/App.jsx` outside `<Routes>`, adjacent to `<Navbar>` — exact same pattern as Navbar
- `z-index: var(--z-float)` (200) — above page content, below any future modals

---

## Top Pitfalls

Ranked by impact, with the phase where each must be addressed.

1. **Performance debt carried into new design** *(Foundation phase — do this first)*
   Inter variable font is 854 KB TTF; service card images are 1.2–2.2 MB each; `public/fonts/Inter/static/` contains 50+ unused TTFs. Convert Inter to WOFF2 (~200 KB), convert service images to WebP (<100 KB each), delete the static font directory. Failing to fix this before styling means the bold design loads slowly and erodes the trust it is meant to build.

2. **Dark redesign applied patchily** *(Foundation phase — before any component work)*
   If the body background changes to near-black but some components inherit `#fefcfb`, the site looks unfinished. Define the full color token system first, apply `body` background globally, then proceed component by component. Every section that gets a new background must also explicitly set text color.

3. **Specificity war from layered CSS** *(Every phase)*
   Adding new rules below old ones for the same components creates conflicting declarations that compound over time. The rule: for each component you restyle, delete its old CSS block entirely and write the replacement. No `!important`, no `.component-v2` prefixes.

4. **WhatsApp link Turkish encoding bug** *(WhatsApp CTA phase)*
   Plain-string `href` with Turkish characters (g, s, i, o, u, c with diacritics) mangles on some devices. Always construct the href with `encodeURIComponent()` on the message text. One line of code; do it right the first time.

5. **SEO silent breakage during component edits** *(Each page restyle phase)*
   `SEO.jsx` injects JSON-LD via `dangerouslySetInnerHTML`. If a page is refactored and the `jsonLd` prop is dropped, structured data disappears with no build error. After every page component edit, verify `application/ld+json` is present in built HTML.

---

## Implications for Roadmap

### Phase 1: Foundation
**Rationale:** Everything else depends on this. Tokens define the color system all components will use. Performance fixes must precede styling work or they get carried through.
**Delivers:** CSS token layer, WOFF2 font swap, deleted static fonts, WebP image conversion, documented `1rem = 10px` convention.
**Avoids:** Dark-design patchiness, font swap CLS, performance debt compounding.
**Research flag:** None — standard patterns. Skip research-phase.

### Phase 2: Navbar + WhatsApp CTA
**Rationale:** Navbar appears on every page; getting it right first means every subsequent page review looks correct. WhatsApp CTA is global and trivial — build it once, visible everywhere.
**Delivers:** New bold Navbar, WhatsApp floating CTA (persistent, site-wide), base body/typography styles.
**Avoids:** Focus indicator regression, missing `aria-label`, button appearing before page loads (add 3s delay).
**Research flag:** None — patterns confirmed from existing Navbar mount pattern in `App.jsx`.

### Phase 3: HomePage
**Rationale:** The hero is the statement piece and the primary conversion surface. Do it after tokens and Navbar are solid.
**Delivers:** Bold hero with strong typographic hierarchy + value statement, key stats row, BrandSlider with prominence upgrade, final CTA block.
**Avoids:** LCP regression (hero must use `<img fetchpriority="high">` not CSS background), vague hero copy.
**Research flag:** Hero copy should be validated against 3-5 direct Turkish industrial supply competitors before finalizing.

### Phase 4: ServicesPage
**Rationale:** Card component is shared — redesign it once here. Service images must be WebP before styling (done in Phase 1).
**Delivers:** Bold 6-category card grid, restyled Button component.
**Avoids:** Uncompressed images carried into new card layout.
**Research flag:** None — card grid is standard B2B pattern.

### Phase 5: AboutPage + ContactPage
**Rationale:** Least complex pages. Do last so the full visual system is established.
**Delivers:** Labeled certificate badges, company stats callout, clean contact layout, `public/og.jpg` for social shares.
**Avoids:** Decorative video without `aria-hidden`, missing og:image.
**Research flag:** None — straightforward content pages.

### Phase Ordering Rationale

- Tokens before components prevents dark/light inconsistency across the site
- Global components (Navbar, WhatsApp CTA) before pages means zero reconciliation work per page
- Homepage before inner pages — highest-traffic surface, most visually ambitious
- AboutPage and ContactPage last — content-heavy, layout-simple; benefit from established system

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Confirmed from direct source file inspection; no speculation |
| Features | MEDIUM-HIGH | B2B conversion research + Turkish market knowledge; live competitor benchmarking not performed |
| Architecture | HIGH | Based on direct inspection of 852-line index.css and component tree |
| Pitfalls | HIGH | Grounded in CONCERNS.md codebase audit and existing code analysis |

**Overall confidence:** HIGH

### Gaps to Address

- **Logo colors unknown**: The amber/gold accent (`#c8960c`) must be validated against actual company logo colors in `src/img/` before committing to the token system.
- **Phone number not confirmed**: `SITE.phone` must be verified as the WhatsApp-registered number before deploying the CTA.
- **Hero video on dark background**: Existing hero video was designed for a light background. Visual test required after switching to dark ground — may need a darker overlay.
- **Competitor benchmarking not done**: Hero copy recommendations are based on general B2B research. Manual review of 3-5 direct Turkish industrial suppliers recommended before finalizing hero copy.
- **Customer/project count data**: "X+ mutlu musteri" stat requires real data from the client. Do not use placeholder numbers.

---

## Sources

### Primary (HIGH confidence)
- `src/index.css` (852 lines) — CSS architecture, existing patterns, token gaps
- `src/App.jsx`, `src/seo/site.js`, page components — component structure, data flow, SEO implementation
- `.planning/codebase/CONCERNS.md` — performance debt (font sizes, image weights)
- WhatsApp `wa.me` official deep link documentation — link format confirmed

### Secondary (MEDIUM confidence)
- B2B UX research (Baymard Institute, Nielsen Norman Group) — table stakes and hero patterns
- Turkish digital commerce patterns — WhatsApp as primary B2B contact channel, trust signal ranking
- Industrial B2B design conventions 2024-2025 — Barlow Condensed typography, dark-ground aesthetics

### Tertiary (LOW confidence)
- Color direction (dark + amber) — design convention inference; needs logo color validation before finalizing

---
*Research completed: 2026-05-23*
*Ready for roadmap: yes*
