<!-- GSD:project-start source:PROJECT.md -->
## Project

**SB Teknik Malzeme — Website Redesign**

A bold, industrial-aesthetic redesign of the existing SB Teknik Malzeme corporate website — a Turkish B2B industrial supply company in Istanbul. The redesign targets procurement managers who need to assess the company quickly and reach out with confidence. It preserves the current React + Vite stack and 4-page structure while elevating visual quality and adding a WhatsApp floating CTA to drive direct contact.

**Core Value:** A procurement manager landing on the site should immediately feel they've found a serious, trustworthy supplier — and have a frictionless way to contact SB Teknik within seconds.

### Constraints

- **Tech stack**: React + Vite only — no backend, stays static frontend
- **Paid services**: No new subscriptions or paid APIs
- **Language**: Turkish only — all copy stays in Turkish
- **Performance**: Must preserve fast load times, SEO, and sitemap generation
- **WhatsApp**: Free — uses `wa.me` link, no paid WhatsApp Business API
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript (ES2020+) - All source files, JSX syntax for React components (`src/**/*.jsx`, `src/**/*.js`)
- CSS - Global styles (`src/index.css`)
- HTML - SPA shell (`index.html`)
## Runtime
- Node.js (version not pinned — no `.nvmrc` or `engines` field in `package.json`)
- npm
- Lockfile: `package-lock.json` (lockfileVersion 3, present and committed)
## Frameworks
- React 19.2.0 - UI rendering, component model
- React DOM 19.2.0 - DOM mounting via `createRoot` (`src/main.jsx`)
- React Router 7.12.0 - Client-side routing, `BrowserRouter` + `Routes`/`Route` (`src/App.jsx`, `src/main.jsx`)
- Motion 12.34.0 (`motion/react`) - Declarative animation via `motion.*` components and `variants` API (used in all page components)
- Vite 7.2.4 - Dev server, bundler, HMR (`vite.config.js`)
- `@vitejs/plugin-react` 5.1.4 - Babel-based JSX transform for Vite
- esbuild (via Vite) - Production minification (`build.minify: "esbuild"` in `vite.config.js`)
- `vite-plugin-sitemap` 0.8.2 - Auto-generates `sitemap.xml` at build time for routes `/`, `/about`, `/services`, `/contact` (`vite.config.js`)
## Key Dependencies
- `@phosphor-icons/react` 2.1.10 - Icon library used across all page components and Navbar
- `motion` 12.34.0 - Animation; removing it would break all page transition and stagger effects
- None — no backend SDK, no database client, no HTTP client library
## Configuration
- No `.env` files present; no `import.meta.env` usage detected in source
- Site constants (URL, phone, email, address) are hardcoded in `src/seo/site.js`
- `vite.config.js` — plugins, minify strategy, sourcemap disabled, CSS minification enabled
- `eslint.config.js` — flat config, targets `**/*.{js,jsx}`, enforces `react-hooks`, `react-refresh`, and `no-unused-vars` (ignores `^[A-Z_]` pattern)
## Platform Requirements
- Node.js with npm
- `npm run dev` — Vite dev server with HMR
- `npm run lint` — ESLint check
- `npm run build` — production bundle to `dist/`
- `npm run preview` — preview production build locally
- Static site output (`dist/`) — deployable to any static host (Netlify, Vercel, S3, etc.)
- Target hostname: `https://sbteknikmalzeme.com` (hardcoded in `vite.config.js` sitemap and `src/seo/site.js`)
- No server-side runtime required
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components: PascalCase `.jsx` — e.g. `Card.jsx`, `BrandSlider.jsx`, `HomePage.jsx`
- Pages: PascalCase with `Page` suffix — e.g. `AboutPage.jsx`, `ContactPage.jsx`
- Non-component modules: camelCase `.js` — e.g. `site.js`
- CSS: single `index.css` at `src/` root; no CSS modules or separate per-component files
- PascalCase function names matching the filename exactly
- Sub-components defined in the same file as their parent when tightly coupled (e.g. `LogoItem` inside `BrandSlider.jsx`)
- Module-level data arrays: camelCase — e.g. `logos`, `services`, `certificates`
- Motion variant objects: camelCase descriptive names — e.g. `cardVariants`, `panel`, `certsAnim`, `fadeIn`, `list`, `item`
- Computed/derived page-level constants: camelCase — e.g. `canonical`
- Exported config objects: UPPER_SNAKE_CASE — e.g. `SITE` in `src/seo/site.js`
- camelCase — e.g. `imgSrc`, `ogImage`, `jsonLd`, `noindex`
- Boolean props with sensible defaults declared inline — e.g. `noindex = false`
## Export Style
- Named arrow function + `export default` at bottom (used in `Navbar.jsx`, `Button.jsx`, `HomePage.jsx`, `ContactPage.jsx`)
- `export default function Name()` declaration (used in `Card.jsx`, `SEO.jsx`, `ServicesPage.jsx`, `AboutPage.jsx`, `BrandSlider.jsx`)
## Import Organization
## Motion / Animation Patterns
## CSS / Styling
- BEM-style class names for component elements — e.g. `services-card`, `services-card__image-wrapper`, `services-card__title`
- kebab-case class names throughout
- CSS custom properties used for dynamic values passed from JS — e.g. `--duration`, `--gap`, `--logoH` in `BrandSlider.jsx`
- No CSS-in-JS, no Tailwind, no CSS modules
## Accessibility Patterns
- Decorative media gets `aria-hidden="true"` — hero video, about video
- Interactive icons inside links get `aria-label` on the wrapping element
- `loading="lazy"` + `decoding="async"` on all non-critical images
- First/hero image uses `fetchpriority="high"` + `loading="eager"`
- External links use `rel="noreferrer"` consistently
## Data Patterns
- Static data arrays (services list, logos list, certificates list) defined as module-level constants directly in the page file that uses them
- Shared site-wide config extracted to `src/seo/site.js` as a named export (`SITE`)
- Per-page `canonical` URL computed from `SITE.baseUrl` at module level: `const canonical = \`${SITE.baseUrl}/path\``
## SEO Pattern
## Error Handling
- No explicit error boundaries present
- No try/catch in component code
- No async data fetching — all data is static/local
## ESLint Rules
- Base: `@eslint/js` recommended
- Plugins: `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Custom rule: `no-unused-vars` set to `error`, variables matching `/^[A-Z_]/` pattern are ignored
- `/* eslint-disable no-unused-vars */` suppressions present in `Button.jsx` and `HomePage.jsx`
## Comments
- Inline comments explain non-obvious decisions — e.g. React 19 + CSP JSON-LD approach in `SEO.jsx`
- Turkish-language inline comments used for domain notes
- JSDoc not used
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
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
- All routing is client-side via React Router v7 (`react-router`)
- Each page is self-contained: owns its own SEO metadata, animation variants, and static data
- Shared logic is minimal — components receive all data via props; no Context or Redux
- Animation handled exclusively by `motion/react` (Motion for React / Framer Motion v12)
## Layers
- Purpose: Bootstrap React and mount the app
- Location: `src/main.jsx`
- Contains: `createRoot`, `BrowserRouter` wrap, global CSS import
- Depends on: `src/App.jsx`, `src/index.css`
- Used by: `index.html` (script entry)
- Purpose: Persistent layout + route definitions
- Location: `src/App.jsx`
- Contains: `<Navbar>`, `<Routes>` / `<Route>` declarations
- Depends on: all page components, `src/components/Navbar.jsx`
- Used by: `src/main.jsx`
- Purpose: Full-page views composed from shared components
- Location: `src/pages/`
- Contains: Page-scoped static data, animation variants, JSX layout, `<SEO>` usage
- Depends on: `src/components/`, `src/seo/site.js`, `src/img/`, `src/video/`
- Used by: `src/App.jsx` (via `<Route>`)
- Purpose: Reusable, stateless (mostly) UI primitives
- Location: `src/components/`
- Contains: `Navbar`, `Button`, `Card`, `BrandSlider`, `SEO`
- Depends on: `react-router` (Link), `motion/react`, `@phosphor-icons/react`, `src/seo/site.js` (SEO only)
- Used by: pages and `App`
- Purpose: Single source of truth for site identity and contact data
- Location: `src/seo/site.js`
- Contains: `SITE` export object
- Depends on: nothing
- Used by: all pages (canonical URLs, JSON-LD, OG metadata)
## Data Flow
### Page Render Path
### Animation Flow
- No global state. `HomePage` has one local `useState` (`playVideo`) to defer video rendering for LCP optimisation. `AboutPage` reads `useReducedMotion()` to conditionally suppress background video.
## Key Abstractions
- Purpose: Centralises brand identity, URLs, contact details for SEO and JSON-LD
- Examples: `src/seo/site.js`
- Pattern: Named export constant; imported directly into pages — no context or prop-drilling
- Purpose: Renders React 19 document metadata (title, meta, OG, Twitter, JSON-LD) declaratively inside page JSX
- Examples: used in every page under `src/pages/`
- Pattern: Accepts structured props; outputs `<html>`, `<title>`, `<meta>`, `<link>`, `<script>` tags hoisted to `<head>` by React 19
- Purpose: Scroll-animated service card; conditionally wraps content in `<Link>` when `to` prop is provided
- Examples: `src/components/Card.jsx`, used in `src/pages/ServicesPage.jsx`
- Pattern: Single component handles both linked and non-linked variants via prop presence check
## Entry Points
- Location: `src/main.jsx`
- Triggers: Browser script execution via `index.html`
- Responsibilities: Mount React root, provide routing context, import global styles
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
### Static data defined inside component files
## Error Handling
- No `<ErrorBoundary>` wrapping routes or pages
- No 404 route defined in `src/App.jsx` — unmatched paths render nothing
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
