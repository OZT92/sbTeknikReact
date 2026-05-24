# Roadmap: SB Teknik Malzeme — Website Redesign

**Milestone:** Visual Redesign (MVP)
**Granularity:** Standard (5 phases)
**Mode:** mvp (vertical slices — each phase ships a visible, testable result)
**Coverage:** 27/27 v1 requirements mapped

---

## Phases

- [x] **Phase 1: Foundation** - CSS token layer, WOFF2 fonts, WebP images — performance and design system base (completed 2026-05-24)
- [x] **Phase 2: Navbar** - Bold/industrial navbar redesign using the new token layer, all breakpoints
- [x] **Phase 3: HomePage** - Hero redesign, stats row, BrandSlider prominence, CTA buttons — primary conversion surface
- [x] **Phase 4: ServicesPage** - Bold card grid, WebP images in place, restyled CTA section
- [x] **Phase 5: About + Contact + SEO** - Certificate badges, company story, contact layout, full SEO/sitemap verification
- [x] **Phase 6: Frontend Aesthetic Polish** - IBM Plex Sans font, global grain overlay, staggered framer-motion animations, brutalist hover states

---

## Phase Details

### Phase 1: Foundation

**Goal**: The CSS token layer, optimized fonts, and WebP images are in place — every subsequent phase inherits correct values and ships fast assets
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04
**Success Criteria** (what must be TRUE):

  1. Opening the site in a browser shows the dark ground background (`#0f1923` or token equivalent) applied globally via `body` — no light background flashes
  2. Barlow Condensed 700/900 and Inter WOFF2 load without a 854 KB TTF request visible in DevTools Network tab
  3. All 6 service card image paths resolve to WebP files (no PNG 404s, no fallback to uncompressed sources)
  4. `:root` token block is present at the top of `src/index.css` with color, spacing, and typography custom properties defined

**Plans**: 2 plansPlans:

- [x] 01-01-PLAN.md — Dark-ground + fonts slice: :root token block, Inter WOFF2, Barlow Condensed 700/900, body tokens, preload hints (accent #c8960c approved 2026-05-24)
- [x] 01-02-PLAN.md — WebP images slice: convert 6 service PNGs to WebP, swap ServicesPage imports to public path strings (completed 2026-05-24)

**UI hint**: yes

### Phase 2: Navbar

**Goal**: The navbar matches the bold/industrial aesthetic across all screen sizes and is correct on every subsequent page preview from this point forward
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):

  1. Navbar renders with the bold/industrial visual treatment (dark background, Barlow Condensed or token typography, new color system) — visibly different from the old corporate-blue style
  2. Resizing the browser from mobile (320px) through tablet to desktop shows the navbar adapt at every existing breakpoint without layout breakage
  3. Hovering or focusing a nav link shows the updated hover/active state (new accent color) — not the old corporate blue highlight

**Plans**: 1 plan (implementation_plan.md)
**UI hint**: yes

### Phase 3: HomePage

**Goal**: Procurement managers landing on the homepage immediately perceive a serious industrial supplier — bold hero, key stats, prominent partner logos, and clear CTAs are all visible above and near the fold
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, SEO-04
**Success Criteria** (what must be TRUE):

  1. The hero section displays Barlow Condensed headline text with a strong typographic hierarchy — the value statement is readable at a glance on both mobile and desktop
  2. The hero video/poster renders correctly against the dark background (overlay adjusted) — no washed-out or unreadable areas from the old light-background treatment
  3. CTA buttons on the homepage use design token styles (color, radius, spacing) — visually consistent with the new system
  4. The BrandSlider is visually prominent — partner logos are legible against the new background and the slider is visible without scrolling past the hero on desktop
  5. A "10+ Yil" or years-in-business figure is visible on the homepage as a large typographic element (not buried in body text); LCP hero image has `fetchpriority="high"` and `loading="eager"` confirmed in rendered HTML

**Plans**: 1 plan (implementation_plan.md)
**UI hint**: yes

### Phase 4: ServicesPage

**Goal**: The services page delivers the bold card grid with WebP images and restyled CTA section — the full service offering is scannable in 3 seconds
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04
**Success Criteria** (what must be TRUE):

  1. All 6 service category cards display with the bold/industrial aesthetic — new typography, colors, and hover states (not the old light-card style)
  2. Each card's image loads from a WebP source (confirmed in DevTools — no PNG requests for service images)
  3. The card grid is responsive: 1 column on mobile, 2 columns on tablet, 3 columns on desktop — no overflow or broken layout at any viewport
  4. The Services CTA section at the bottom of the page matches the new design token system (not the old unstyled or legacy CTA)

**Plans**: 1 plan (implementation_plan.md)
**UI hint**: yes

### Phase 5: About + Contact + SEO

**Goal**: All pages are restyled, certificate trust signals are legible, the contact layout builds confidence, and SEO/sitemap integrity is confirmed end-to-end — the redesign is complete and shippable
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, CONT-01, CONT-02, CONT-03, SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):

  1. The About page renders with the bold/industrial aesthetic — company story text, layout, and background video/poster all updated; `prefers-reduced-motion` still pauses or removes the video
  2. Certificate badges (TSE, ISO 10002, ISO 9001, CE) display with their full names in a labeled row — not small decorative icons
  3. The Contact page shows address, phone, and email in a clean trust-building layout, and the Google Maps embed renders correctly at mobile and desktop widths
  4. A production build (`vite build`) generates `sitemap.xml` — confirmed by checking `dist/sitemap.xml` after build
  5. All 4 pages contain `application/ld+json` script tags in the built HTML (JSON-LD not silently dropped); canonical URLs, meta descriptions, and OG tags present on all pages

**Plans**: 1 plan (implementation_plan.md)
**UI hint**: yes

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete    | 2026-05-24 |
| 2. Navbar | 1/1 | Complete    | 2026-05-24 |
| 3. HomePage | 1/1 | Complete    | 2026-05-24 |
| 4. ServicesPage | 1/1 | Complete    | 2026-05-24 |
| 5. About + Contact + SEO | 1/1 | Complete    | 2026-05-24 |
| 6. Aesthetic Polish | 1/1 | Complete    | 2026-05-24 |

---

## Coverage

| Requirement | Phase |
|-------------|-------|
| FOUN-01 | Phase 1 |
| FOUN-02 | Phase 1 |
| FOUN-03 | Phase 1 |
| FOUN-04 | Phase 1 |
| NAV-01 | Phase 2 |
| NAV-02 | Phase 2 |
| NAV-03 | Phase 2 |
| HOME-01 | Phase 3 |
| HOME-02 | Phase 3 |
| HOME-03 | Phase 3 |
| HOME-04 | Phase 3 |
| HOME-05 | Phase 3 |
| SEO-04 | Phase 3 |
| SERV-01 | Phase 4 |
| SERV-02 | Phase 4 |
| SERV-03 | Phase 4 |
| SERV-04 | Phase 4 |
| ABOUT-01 | Phase 5 |
| ABOUT-02 | Phase 5 |
| ABOUT-03 | Phase 5 |
| ABOUT-04 | Phase 5 |
| CONT-01 | Phase 5 |
| CONT-02 | Phase 5 |
| CONT-03 | Phase 5 |
| SEO-01 | Phase 5 |
| SEO-02 | Phase 5 |
| SEO-03 | Phase 5 |

**27/27 v1 requirements mapped. No orphans.**

---

*Created: 2026-05-23*
