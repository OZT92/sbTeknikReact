<!-- refreshed: 2026-05-23 -->
# Architecture

**Analysis Date:** 2026-05-23

## System Overview

```text
┌──────────────────────────────────────────────────────────────┐
│                    Browser / index.html                      │
│                    `index.html` + `src/main.jsx`             │
└────────────────────────┬─────────────────────────────────────┘
                         │ mounts React root
                         ▼
┌──────────────────────────────────────────────────────────────┐
│               App Shell  `src/App.jsx`                       │
│   BrowserRouter → Navbar (persistent) + <Routes>            │
└────┬──────────────┬──────────────┬──────────────┬────────────┘
     │              │              │              │
     ▼              ▼              ▼              ▼
 HomePage       AboutPage    ServicesPage   ContactPage
`src/pages/`  `src/pages/`  `src/pages/`  `src/pages/`
     │              │              │              │
     └──────────────┴──────────────┴──────────────┘
                         │ imports
                         ▼
┌──────────────────────────────────────────────────────────────┐
│              Shared Components  `src/components/`            │
│   Navbar · Button · Card · BrandSlider · SEO                 │
└──────────────────────────────┬───────────────────────────────┘
                               │ reads
                               ▼
┌──────────────────────────────────────────────────────────────┐
│         Config / Constants  `src/seo/site.js`                │
│   SITE object: baseUrl, name, phone, email, address          │
└──────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `main.jsx` | Mount React root, wrap with BrowserRouter | `src/main.jsx` |
| `App` | Render persistent Navbar + route tree | `src/App.jsx` |
| `Navbar` | Site-wide navigation links | `src/components/Navbar.jsx` |
| `SEO` | Inject `<title>`, meta, Open Graph, JSON-LD via React 19 document metadata | `src/components/SEO.jsx` |
| `Button` | Animated `<Link>` CTA with optional icon | `src/components/Button.jsx` |
| `Card` | Animated service card; optionally wraps content in `<Link>` | `src/components/Card.jsx` |
| `BrandSlider` | CSS-animated infinite logo marquee | `src/components/BrandSlider.jsx` |
| `SITE` | Singleton config object for domain, contact info, OG image | `src/seo/site.js` |
| `HomePage` | Hero section, page-link CTAs, brand slider | `src/pages/HomePage.jsx` |
| `AboutPage` | Company profile, certificates, background video | `src/pages/AboutPage.jsx` |
| `ServicesPage` | Service card grid with contact CTA | `src/pages/ServicesPage.jsx` |
| `ContactPage` | Google Maps embed + contact info list | `src/pages/ContactPage.jsx` |

## Pattern Overview

**Overall:** Single-Page Application (SPA) — flat page-based routing, no state management library, no data fetching layer.

**Key Characteristics:**
- All routing is client-side via React Router v7 (`react-router`)
- Each page is self-contained: owns its own SEO metadata, animation variants, and static data
- Shared logic is minimal — components receive all data via props; no Context or Redux
- Animation handled exclusively by `motion/react` (Motion for React / Framer Motion v12)

## Layers

**Entry:**
- Purpose: Bootstrap React and mount the app
- Location: `src/main.jsx`
- Contains: `createRoot`, `BrowserRouter` wrap, global CSS import
- Depends on: `src/App.jsx`, `src/index.css`
- Used by: `index.html` (script entry)

**App Shell:**
- Purpose: Persistent layout + route definitions
- Location: `src/App.jsx`
- Contains: `<Navbar>`, `<Routes>` / `<Route>` declarations
- Depends on: all page components, `src/components/Navbar.jsx`
- Used by: `src/main.jsx`

**Pages:**
- Purpose: Full-page views composed from shared components
- Location: `src/pages/`
- Contains: Page-scoped static data, animation variants, JSX layout, `<SEO>` usage
- Depends on: `src/components/`, `src/seo/site.js`, `src/img/`, `src/video/`
- Used by: `src/App.jsx` (via `<Route>`)

**Components:**
- Purpose: Reusable, stateless (mostly) UI primitives
- Location: `src/components/`
- Contains: `Navbar`, `Button`, `Card`, `BrandSlider`, `SEO`
- Depends on: `react-router` (Link), `motion/react`, `@phosphor-icons/react`, `src/seo/site.js` (SEO only)
- Used by: pages and `App`

**Config/Constants:**
- Purpose: Single source of truth for site identity and contact data
- Location: `src/seo/site.js`
- Contains: `SITE` export object
- Depends on: nothing
- Used by: all pages (canonical URLs, JSON-LD, OG metadata)

## Data Flow

### Page Render Path

1. Browser requests URL → Vite serves `index.html` (`index.html`)
2. `src/main.jsx` mounts React inside `#root` with `BrowserRouter`
3. `src/App.jsx` renders `<Navbar>` + matches route to a page component
4. Page component renders `<SEO>` (document head), then page sections
5. Page imports `SITE` from `src/seo/site.js` to build canonical URL and JSON-LD
6. Shared components (`Button`, `Card`, `BrandSlider`) render with props passed from page

### Animation Flow

1. Page mounts → `motion/react` `initial` variant applied instantly
2. `animate` variant triggers on mount (fade/slide in)
3. `Card` uses `whileInView` + `viewport={{ once: true }}` for scroll-triggered reveal
4. `HomePage` delays video autoplay 800ms via `useEffect` / `setTimeout` to prioritise LCP poster image

**State Management:**
- No global state. `HomePage` has one local `useState` (`playVideo`) to defer video rendering for LCP optimisation. `AboutPage` reads `useReducedMotion()` to conditionally suppress background video.

## Key Abstractions

**`SITE` config object:**
- Purpose: Centralises brand identity, URLs, contact details for SEO and JSON-LD
- Examples: `src/seo/site.js`
- Pattern: Named export constant; imported directly into pages — no context or prop-drilling

**`SEO` component:**
- Purpose: Renders React 19 document metadata (title, meta, OG, Twitter, JSON-LD) declaratively inside page JSX
- Examples: used in every page under `src/pages/`
- Pattern: Accepts structured props; outputs `<html>`, `<title>`, `<meta>`, `<link>`, `<script>` tags hoisted to `<head>` by React 19

**`Card` component:**
- Purpose: Scroll-animated service card; conditionally wraps content in `<Link>` when `to` prop is provided
- Examples: `src/components/Card.jsx`, used in `src/pages/ServicesPage.jsx`
- Pattern: Single component handles both linked and non-linked variants via prop presence check

## Entry Points

**Application bootstrap:**
- Location: `src/main.jsx`
- Triggers: Browser script execution via `index.html`
- Responsibilities: Mount React root, provide routing context, import global styles

**Vite build entry:**
- Location: `index.html` → `<script src="/src/main.jsx">`
- Triggers: Vite dev server or `vite build`
- Responsibilities: HTML shell, favicon, viewport meta

## Architectural Constraints

- **Threading:** Single-threaded browser JS. No Web Workers.
- **Global state:** None. All state is local to `HomePage` (`playVideo`). No module-level mutable singletons.
- **Circular imports:** None detected. Dependency direction is strictly: pages → components → (no further imports).
- **No backend:** Pure static SPA. Contact form does not exist — contact info is displayed as `<a href="tel:">` / `<a href="mailto:">` links. No API calls.
- **SEO approach:** Server-side rendering is NOT used. SEO metadata is rendered client-side via React 19 document metadata API. Crawlers relying on SSR/SSG will not see metadata without JS.

## Anti-Patterns

### Per-page JSON-LD duplication

**What happens:** Each page file (`HomePage.jsx`, `AboutPage.jsx`, `ContactPage.jsx`) duplicates the full `Organization` JSON-LD schema inline.
**Why it's wrong:** Any change to schema shape (e.g., adding a field) must be updated in three files.
**Do this instead:** Extract a `buildOrgSchema(overrides?)` helper to `src/seo/site.js` or a new `src/seo/schemas.js` and call it from each page.

### Static data defined inside component files

**What happens:** `logoAlts` array in `src/pages/HomePage.jsx` and `services` array in `src/pages/ServicesPage.jsx` are defined at module level inside the page file.
**Why it's wrong:** Makes the page file longer than necessary and harder to update data without touching JSX.
**Do this instead:** Move static data arrays to a `src/data/` directory (e.g., `src/data/logos.js`, `src/data/services.js`).

## Error Handling

**Strategy:** None implemented. No error boundaries exist in the component tree.

**Patterns:**
- No `<ErrorBoundary>` wrapping routes or pages
- No 404 route defined in `src/App.jsx` — unmatched paths render nothing

## Cross-Cutting Concerns

**Logging:** None.
**Validation:** Not applicable — no forms or user input.
**Authentication:** Not applicable — public marketing site, no auth layer.

---

*Architecture analysis: 2026-05-23*
