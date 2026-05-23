# External Integrations

**Analysis Date:** 2026-05-23

## APIs & External Services

**Mapping:**
- Google Maps Embed API - Displays store location on the Contact page
  - SDK/Client: Native `<iframe>` embed (no SDK)
  - Auth: No API key required for embed URL; embed URL hardcoded in `src/pages/ContactPage.jsx` (line 55)
  - URL: `https://www.google.com/maps/embed?pb=...`

**Fonts:**
- Google Fonts - Referenced via `<link rel="preconnect">` tags in `index.html`
  - Loading: Preconnect declared (`fonts.googleapis.com`, `fonts.gstatic.com`); actual font `<link>` is absent from `index.html` — likely loaded via CSS `@import` in `src/index.css`
  - Auth: None

## Data Storage

**Databases:**
- None — no database client or ORM detected

**File Storage:**
- Local static assets only: images in `src/img/`, videos in `src/video/`, served by Vite at build time

**Caching:**
- None

## Authentication & Identity

**Auth Provider:**
- None — no authentication system present

## Monitoring & Observability

**Error Tracking:**
- None — no Sentry, Datadog, or similar SDK detected

**Analytics:**
- None — no Google Analytics, gtag, Plausible, or PostHog detected

**Logs:**
- Browser `console` only (development)

## CI/CD & Deployment

**Hosting:**
- Not detected in repository — target is `https://sbteknikmalzeme.com` (static site)
- Output: `dist/` directory (Vite build)

**CI Pipeline:**
- None detected — no `.github/workflows/`, no CI config files

## Environment Configuration

**Required env vars:**
- None — no `import.meta.env` usage found; all configuration is hardcoded in `src/seo/site.js`

**Secrets location:**
- Not applicable — no secrets in use

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Structured Data (Schema.org)

All pages emit JSON-LD structured data via the `SEO` component (`src/components/SEO.jsx`). This is not a runtime integration but affects search engine indexing:

- `HomePage` — `LocalBusiness` schema (`src/pages/HomePage.jsx`)
- `AboutPage` — `LocalBusiness` schema (`src/pages/AboutPage.jsx`)
- `ServicesPage` — `LocalBusiness` schema (`src/pages/ServicesPage.jsx`)
- `ContactPage` — `LocalBusiness` schema with full `PostalAddress` (`src/pages/ContactPage.jsx`)

---

*Integration audit: 2026-05-23*
