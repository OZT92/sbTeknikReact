---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
last_updated: "2026-05-23T17:09:11.069Z"
progress:
  total_phases: 5
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State: SB Teknik Malzeme — Website Redesign

*Single source of truth for current project position. Updated at every phase transition.*

---

## Project Reference

**Core Value:** A procurement manager landing on the site should immediately feel they've found a serious, trustworthy supplier — and have a frictionless way to contact SB Teknik within seconds.

**Stack:** React 19, Vite 7, React Router v7, Motion (Framer), Phosphor Icons — no CSS framework

**Current Focus:** Phase 1 — Foundation (CSS token layer, fonts, images)

---

## Current Position

| Field | Value |
|-------|-------|
| Milestone | Visual Redesign (MVP) |
| Phase | 1 — Foundation |
| Plan | Not started |
| Status | Roadmap created, ready for Phase 1 planning |

**Progress:**

```
[          ] Phase 1: Foundation        — Not started
[          ] Phase 2: Navbar            — Not started
[          ] Phase 3: HomePage          — Not started
[          ] Phase 4: ServicesPage      — Not started
[          ] Phase 5: About+Contact+SEO — Not started
```

Overall: 0/5 phases complete

---

## Performance Metrics

| Metric | Baseline | Target | Current |
|--------|----------|--------|---------|
| Inter font size | 854 KB (TTF) | ~200 KB (WOFF2) | — |
| Service image size | 1.2–2.2 MB (PNG) | <100 KB each (WebP) | — |
| LCP hero | Unknown | Maintained | — |
| Sitemap | Exists | Preserved | — |

---

## Accumulated Context

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| 5 phases (not 6) | About + Contact combined — both content pages, both benefit from established system, neither is complex alone |
| SEO-04 in Phase 3 | LCP is a hero property; fixing it belongs where the hero is built, not in a trailing SEO phase |
| SEO-01/02/03 in Phase 5 | JSON-LD, canonicals, and sitemap verified after all pages are complete — a single pass confirms nothing was dropped |
| Standard granularity | 5 natural delivery boundaries match the requirement categories exactly |

### Known Risks / Pitfalls to Watch

1. **Logo color validation** — Amber accent (`#c8960c`) must be checked against actual logo before committing to token. Resolve at start of Phase 1.
2. **Dark redesign patchiness** — Body background must be set globally before any component work. Validate full dark ground in Phase 1 before Phase 2.
3. **CSS specificity wars** — For each restyled component: delete old rules, write new. No `.v2` prefixes, no `!important`.
4. **SEO silent breakage** — After every page edit, verify `application/ld+json` present in built HTML. Enforced at Phase 5 success criteria.
5. **Hero video on dark background** — Existing video was designed for light bg. Visual test required after overlay switch (Phase 3).
6. **`1rem = 10px` convention** — All new CSS calculates against `html { font-size: 62.5% }` base. Document in Phase 1 token comments.

### Open Questions

- [ ] Logo color confirmed for token system? (Block on Phase 1 completion)
- [ ] `SITE.phone` verified as WhatsApp-registered number? (WhatsApp CTA is v2 — note for future)
- [ ] Hero copy validated against Turkish industrial competitors? (Soft — do during Phase 3 planning)
- [ ] Real customer/project count data for stats row? (Required before Phase 3 ships)

### TODOs Carried Forward

- Phase 1: Delete `public/fonts/Inter/static/` (50+ unused TTFs)
- Phase 1: Document `1rem = 10px` convention in token block comments
- Phase 3: Test hero video overlay against dark background before sign-off

---

## Session Continuity

**To resume this project:**

1. Read `.planning/STATE.md` (this file)
2. Read `.planning/ROADMAP.md` for phase goals and success criteria
3. Run `/gsd-plan-phase 1` to begin Phase 1 planning

**Last updated:** 2026-05-23 — Roadmap created
