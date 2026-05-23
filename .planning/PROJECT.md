# SB Teknik Malzeme — Website Redesign

## What This Is

A bold, industrial-aesthetic redesign of the existing SB Teknik Malzeme corporate website — a Turkish B2B industrial supply company in Istanbul. The redesign targets procurement managers who need to assess the company quickly and reach out with confidence. It preserves the current React + Vite stack and 4-page structure while elevating visual quality and adding a WhatsApp floating CTA to drive direct contact.

## Core Value

A procurement manager landing on the site should immediately feel they've found a serious, trustworthy supplier — and have a frictionless way to contact SB Teknik within seconds.

## Requirements

### Validated

- ✓ Homepage with hero video + brand slider (25 partner logos) — existing
- ✓ About page with company history, logo, certificate badges (TSE, ISO 10002, ISO 9001, CE) — existing
- ✓ Services page with 6-category card grid (Yapı Malzemeleri, Yapı Kimyasalları, Tesisat, Nalburiye, İş Güvenliği, Elektrikli El Aletleri) — existing
- ✓ Contact page with Google Maps embed + phone/email/address — existing
- ✓ Responsive layout with mobile-first breakpoints — existing
- ✓ SEO: JSON-LD schemas (Organization, Service, LocalBusiness), sitemap, canonical URLs — existing
- ✓ Navbar with logo + 3 nav links — existing

### Active

- [ ] Bold / industrial visual redesign across all pages — heavy typography, strong contrast, materials-inspired aesthetic
- [ ] WhatsApp floating CTA button — persistent, site-wide, links to WhatsApp with pre-filled message
- [ ] Services page restyle — same 6-category structure, new visual treatment matching bold aesthetic
- [ ] Homepage hero restyle — stronger typography hierarchy, improved CTA layout
- [ ] About page restyle — more impactful company story presentation
- [ ] Contact page restyle — clean, trust-building layout
- [ ] Navbar redesign — matches new bold aesthetic
- [ ] Performance and SEO preserved through redesign

### Out of Scope

- Product catalog / search — no backend, no inventory data; deferred to future milestone
- Quote request form — no backend; deferred
- Blog / news section — content management out of scope for v1
- Backend / CMS — site stays purely static frontend
- Language toggle — Turkish only by constraint

## Context

- **Stack**: React 19, Vite 7, React Router v7, Motion (Framer), Phosphor Icons — no CSS framework
- **CSS**: Single global `src/index.css` using BEM-ish classes; `html { font-size: 62.5% }` (1rem = 10px)
- **Codebase map**: `.planning/codebase/` — full analysis of existing architecture
- **Audience**: B2B procurement/purchasing managers comparing industrial suppliers
- **Domain**: sbteknikmalzeme.com, deployed as static site
- **Location**: Emekyemez Mah. Buğulu Sk. 14/A Beyoğlu/İstanbul, established 2015

## Constraints

- **Tech stack**: React + Vite only — no backend, stays static frontend
- **Paid services**: No new subscriptions or paid APIs
- **Language**: Turkish only — all copy stays in Turkish
- **Performance**: Must preserve fast load times, SEO, and sitemap generation
- **WhatsApp**: Free — uses `wa.me` link, no paid WhatsApp Business API

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep React + Vite (no rebuild) | Preserve existing SEO work and codebase; redesign is visual, not structural | — Pending |
| Bold / industrial aesthetic | Matches the product category (construction materials, industrial tools) and signals expertise to B2B buyers | — Pending |
| WhatsApp CTA over contact form | No backend needed; WhatsApp is the primary B2B contact channel in Turkey | — Pending |
| Keep 4-page structure | Navigation is already clear; redesign is within existing pages | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-23 after initialization*
