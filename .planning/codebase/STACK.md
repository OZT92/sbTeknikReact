# Technology Stack

**Analysis Date:** 2026-05-23

## Languages

**Primary:**
- JavaScript (ES2020+) - All source files, JSX syntax for React components (`src/**/*.jsx`, `src/**/*.js`)

**Secondary:**
- CSS - Global styles (`src/index.css`)
- HTML - SPA shell (`index.html`)

## Runtime

**Environment:**
- Node.js (version not pinned — no `.nvmrc` or `engines` field in `package.json`)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (lockfileVersion 3, present and committed)

## Frameworks

**Core:**
- React 19.2.0 - UI rendering, component model
- React DOM 19.2.0 - DOM mounting via `createRoot` (`src/main.jsx`)
- React Router 7.12.0 - Client-side routing, `BrowserRouter` + `Routes`/`Route` (`src/App.jsx`, `src/main.jsx`)

**Animation:**
- Motion 12.34.0 (`motion/react`) - Declarative animation via `motion.*` components and `variants` API (used in all page components)

**Build/Dev:**
- Vite 7.2.4 - Dev server, bundler, HMR (`vite.config.js`)
- `@vitejs/plugin-react` 5.1.4 - Babel-based JSX transform for Vite
- esbuild (via Vite) - Production minification (`build.minify: "esbuild"` in `vite.config.js`)

**SEO:**
- `vite-plugin-sitemap` 0.8.2 - Auto-generates `sitemap.xml` at build time for routes `/`, `/about`, `/services`, `/contact` (`vite.config.js`)

## Key Dependencies

**Critical:**
- `@phosphor-icons/react` 2.1.10 - Icon library used across all page components and Navbar
- `motion` 12.34.0 - Animation; removing it would break all page transition and stagger effects

**Infrastructure:**
- None — no backend SDK, no database client, no HTTP client library

## Configuration

**Environment:**
- No `.env` files present; no `import.meta.env` usage detected in source
- Site constants (URL, phone, email, address) are hardcoded in `src/seo/site.js`

**Build:**
- `vite.config.js` — plugins, minify strategy, sourcemap disabled, CSS minification enabled
- `eslint.config.js` — flat config, targets `**/*.{js,jsx}`, enforces `react-hooks`, `react-refresh`, and `no-unused-vars` (ignores `^[A-Z_]` pattern)

## Platform Requirements

**Development:**
- Node.js with npm
- `npm run dev` — Vite dev server with HMR
- `npm run lint` — ESLint check
- `npm run build` — production bundle to `dist/`
- `npm run preview` — preview production build locally

**Production:**
- Static site output (`dist/`) — deployable to any static host (Netlify, Vercel, S3, etc.)
- Target hostname: `https://sbteknikmalzeme.com` (hardcoded in `vite.config.js` sitemap and `src/seo/site.js`)
- No server-side runtime required

---

*Stack analysis: 2026-05-23*
