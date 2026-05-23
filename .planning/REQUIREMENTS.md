# Requirements: SB Teknik Malzeme — Website Redesign

**Defined:** 2026-05-23
**Core Value:** A procurement manager landing on the site should immediately feel they've found a serious, trustworthy supplier — and have a frictionless way to contact SB Teknik within seconds.

## v1 Requirements

### Foundation (Performance & Design System)

- [ ] **FOUN-01**: Inter variable font is served as WOFF2 (converted from 854 KB TTF) with correct `@font-face` declaration and `font-display: swap`
- [ ] **FOUN-02**: All 6 service card images are converted from PNG to WebP format and referenced correctly in `ServicesPage.jsx`
- [ ] **FOUN-03**: A CSS token layer is defined in `src/index.css` as `:root` custom properties covering color palette, spacing scale, and typography (font families, display weights)
- [ ] **FOUN-04**: Barlow Condensed 700 and 900 weights are self-hosted and configured as the display font via `@font-face` with correct Unicode ranges for Turkish diacritics

### Navbar

- [ ] **NAV-01**: Navbar is visually redesigned to match the bold/industrial aesthetic using the new CSS token layer
- [ ] **NAV-02**: Navbar maintains full responsive behavior across all existing breakpoints (mobile → desktop)
- [ ] **NAV-03**: Navbar active/hover states are updated to match the new color system

### Homepage

- [ ] **HOME-01**: Hero section displays bold industrial typography using Barlow Condensed display font with strong visual hierarchy
- [ ] **HOME-02**: Hero video/poster overlay is adjusted for the new dark-ground aesthetic
- [ ] **HOME-03**: CTA buttons on the homepage use the new design token styles
- [ ] **HOME-04**: BrandSlider is visually prominent — partner logos are clearly legible against the new background
- [ ] **HOME-05**: A "10+ Yıl" or years-in-business stat is displayed as a large typographic element somewhere on the homepage

### Services Page

- [ ] **SERV-01**: Service category cards are restyled with the bold/industrial aesthetic (typography, colors, hover states)
- [ ] **SERV-02**: Card images display correctly with the new WebP sources
- [ ] **SERV-03**: The 6-category grid structure is preserved (1 col → 2 col → 3 col responsive)
- [ ] **SERV-04**: Services CTA section is restyled to match new design

### About Page

- [ ] **ABOUT-01**: About page is restyled with the bold/industrial aesthetic
- [ ] **ABOUT-02**: Certificate badges (TSE, ISO 10002, ISO 9001, CE) display with their full names, not just icons
- [ ] **ABOUT-03**: Company story text and layout reflect the new visual system
- [ ] **ABOUT-04**: Background video / poster behavior is preserved (respects `prefers-reduced-motion`)

### Contact Page

- [ ] **CONT-01**: Contact page is restyled with the bold/industrial aesthetic
- [ ] **CONT-02**: Google Maps embed is retained and displays correctly
- [ ] **CONT-03**: Contact info items (address, email, phone) are clearly styled and trust-building

### SEO & Performance Preservation

- [ ] **SEO-01**: All 4 pages retain their JSON-LD schema props (`jsonLd` passed to `<SEO>` component) — no schema silently dropped during refactor
- [ ] **SEO-02**: Canonical URLs, meta descriptions, and OG tags are preserved on all pages
- [ ] **SEO-03**: Sitemap generation via `vite-plugin-sitemap` continues to work after build
- [ ] **SEO-04**: LCP performance is not degraded — hero poster image retains `fetchpriority="high"` and `loading="eager"`

## v2 Requirements

### WhatsApp CTA

- **WA-01**: A floating WhatsApp button appears fixed at bottom-right on all pages
- **WA-02**: Button links to `wa.me/90...` with a pre-filled Turkish message using `encodeURIComponent`
- **WA-03**: Button has entrance animation (spring mount, 1.5s delay) and hover/tap interaction

### Additional Trust Signals

- **TRUST-01**: Phone number visible in navbar for instant contact without navigating to Contact page
- **TRUST-02**: `og.jpg` image created and referenced in SEO component for social sharing previews

### Future Features

- **FEAT-01**: Product catalog with search/filter (requires backend/data layer)
- **FEAT-02**: Quote request form (requires backend form handling)
- **FEAT-03**: Blog/news section (requires CMS)

## Out of Scope

| Feature | Reason |
|---------|--------|
| WhatsApp floating CTA | Deferred to v2 by user decision |
| Product catalog / search | No inventory data, no backend — liability without data |
| Quote request form | No backend — undelivered submissions damage trust |
| Blog / news section | Requires CMS, out of scope for visual redesign |
| Backend / CMS | Site stays purely static frontend by constraint |
| Language toggle | Turkish only by constraint |
| OAuth / authentication | Not applicable — public marketing site |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 — Foundation | Pending |
| FOUN-02 | Phase 1 — Foundation | Pending |
| FOUN-03 | Phase 1 — Foundation | Pending |
| FOUN-04 | Phase 1 — Foundation | Pending |
| NAV-01 | Phase 2 — Navbar | Pending |
| NAV-02 | Phase 2 — Navbar | Pending |
| NAV-03 | Phase 2 — Navbar | Pending |
| HOME-01 | Phase 3 — HomePage | Pending |
| HOME-02 | Phase 3 — HomePage | Pending |
| HOME-03 | Phase 3 — HomePage | Pending |
| HOME-04 | Phase 3 — HomePage | Pending |
| HOME-05 | Phase 3 — HomePage | Pending |
| SEO-04 | Phase 3 — HomePage | Pending |
| SERV-01 | Phase 4 — ServicesPage | Pending |
| SERV-02 | Phase 4 — ServicesPage | Pending |
| SERV-03 | Phase 4 — ServicesPage | Pending |
| SERV-04 | Phase 4 — ServicesPage | Pending |
| ABOUT-01 | Phase 5 — About + Contact + SEO | Pending |
| ABOUT-02 | Phase 5 — About + Contact + SEO | Pending |
| ABOUT-03 | Phase 5 — About + Contact + SEO | Pending |
| ABOUT-04 | Phase 5 — About + Contact + SEO | Pending |
| CONT-01 | Phase 5 — About + Contact + SEO | Pending |
| CONT-02 | Phase 5 — About + Contact + SEO | Pending |
| CONT-03 | Phase 5 — About + Contact + SEO | Pending |
| SEO-01 | Phase 5 — About + Contact + SEO | Pending |
| SEO-02 | Phase 5 — About + Contact + SEO | Pending |
| SEO-03 | Phase 5 — About + Contact + SEO | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0

---
*Requirements defined: 2026-05-23*
*Last updated: 2026-05-23 after roadmap creation*
