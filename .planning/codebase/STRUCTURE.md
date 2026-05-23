# Codebase Structure

**Analysis Date:** 2026-05-23

## Directory Layout

```
sbTeknikReact/
├── index.html              # Vite HTML entry; mounts #root
├── vite.config.js          # Vite + React plugin + sitemap plugin
├── eslint.config.js        # ESLint flat config
├── package.json            # Dependencies and scripts
├── public/                 # Static assets served at root (/)
│   ├── fonts/              # Inter font family (static subsets)
│   │   └── Inter/static/
│   ├── *.webp              # Brand logos (1.webp–25.webp), OG image, hero poster
│   └── poster-*.webp       # Video poster frames
└── src/
    ├── main.jsx            # React root bootstrap
    ├── App.jsx             # Route definitions + persistent Navbar
    ├── index.css           # Global styles (single stylesheet)
    ├── assets/             # Vite-processed assets (currently empty / minimal)
    ├── components/         # Shared UI components
    │   ├── Navbar.jsx
    │   ├── Button.jsx
    │   ├── Card.jsx
    │   ├── BrandSlider.jsx
    │   └── SEO.jsx
    ├── pages/              # Route-level page components
    │   ├── HomePage.jsx
    │   ├── AboutPage.jsx
    │   ├── ServicesPage.jsx
    │   └── ContactPage.jsx
    ├── seo/                # SEO config and constants
    │   └── site.js         # SITE constant (baseUrl, name, contact, address)
    ├── img/                # Imported image assets (processed by Vite)
    │   ├── sbLogo.png
    │   ├── certificatesLogos/   # 1.png–4.png (TSE, ISO 10002, ISO 9001, CE)
    │   └── services/            # Service category images (.png)
    └── video/              # Imported video assets (processed by Vite)
        ├── sb-hero-video-1-opt.mp4
        └── sbAboutVideo1-opt.mp4
```

## Directory Purposes

**`public/`:**
- Purpose: Static files served as-is at the root URL, not processed by Vite
- Contains: Brand logo webp files (numbered 1–N for BrandSlider), poster images for videos, OG image, Inter fonts
- Key files: `1.webp`–`25.webp` (brand logos referenced as `/N.webp` strings in `HomePage.jsx`)

**`src/components/`:**
- Purpose: Reusable UI primitives shared across multiple pages
- Contains: Layout components (`Navbar`), interactive elements (`Button`, `Card`), utility components (`SEO`, `BrandSlider`)
- Key files: `src/components/SEO.jsx`, `src/components/Card.jsx`

**`src/pages/`:**
- Purpose: One file per route; each page owns its own data, animations, and SEO metadata
- Contains: Full-page React components matching routes defined in `src/App.jsx`
- Key files: `src/pages/HomePage.jsx`, `src/pages/ServicesPage.jsx`

**`src/seo/`:**
- Purpose: Centralised site metadata constants
- Contains: `SITE` export with `baseUrl`, `name`, `phone`, `email`, `address`, `ogImage`
- Key files: `src/seo/site.js`

**`src/img/`:**
- Purpose: Image assets imported directly into JSX (Vite resolves and hashes these at build time)
- Contains: Company logo, certificate logos, service category images
- Key files: `src/img/sbLogo.png`, `src/img/services/*.png`, `src/img/certificatesLogos/*.png`

**`src/video/`:**
- Purpose: Video assets imported directly into JSX (Vite processes these)
- Contains: Optimised MP4 clips for hero and about page backgrounds

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell, defines `#root` mount target
- `src/main.jsx`: React bootstrap — `createRoot`, `BrowserRouter`, global CSS
- `src/App.jsx`: Route tree, persistent `<Navbar>`

**Configuration:**
- `vite.config.js`: Build config — esbuild minify, sitemap plugin with all routes
- `eslint.config.js`: Linting rules
- `src/seo/site.js`: Runtime site config (URLs, contact info)

**Core Logic:**
- `src/App.jsx`: Defines all four routes (`/`, `/about`, `/services`, `/contact`)
- `src/components/SEO.jsx`: React 19 document metadata renderer used by every page

**Styles:**
- `src/index.css`: Single global stylesheet — all component styles are here (no CSS modules, no Tailwind)

## Naming Conventions

**Files:**
- Page components: `PascalCase` + `Page` suffix — e.g., `HomePage.jsx`, `ContactPage.jsx`
- Shared components: `PascalCase` — e.g., `Navbar.jsx`, `BrandSlider.jsx`
- Config/data: `camelCase` — e.g., `site.js`
- All source files use `.jsx` extension (even files without JSX, e.g. `site.js` is `.js`)

**Directories:**
- `lowercase` for all directories under `src/`
- Directories named by concern: `components/`, `pages/`, `seo/`, `img/`, `video/`, `assets/`

**CSS classes:**
- `kebab-case` — e.g., `hero-text-title`, `services-card__body`, `navbar-links_link`
- BEM-like for card sub-elements: `services-card__image-wrapper`, `services-card__title`

**Exports:**
- Pages use both named and default exports (inconsistently — `HomePage` uses `const` + `export default`, `AboutPage` uses `export default function`)
- Components prefer `export default` at file end or as `export default function`

## Where to Add New Code

**New page/route:**
1. Create `src/pages/NewPage.jsx` — include `<SEO>` at top, import `SITE` from `src/seo/site.js`
2. Add `<Route path="/new-path" element={<NewPage />} />` in `src/App.jsx`
3. Add the path to `dynamicRoutes` in `vite.config.js` for sitemap generation
4. Add a `<Link>` entry to `src/components/Navbar.jsx` if it needs top-nav presence

**New shared component:**
- Implementation: `src/components/ComponentName.jsx`
- No separate test file convention exists (no test suite currently)

**New static data (service list, logo list, etc.):**
- Preferred location: `src/data/` (directory does not yet exist — create it)
- Alternative (current pattern): define at module level in the consuming page file

**New image asset (Vite-processed):**
- Place in `src/img/` and import into the component: `import myImg from "../img/myImg.png"`

**New static asset (served at root URL):**
- Place in `public/` and reference by absolute path string: `src="/my-asset.webp"`

**Global styles:**
- Add to `src/index.css` — there is no scoped styling system

## Special Directories

**`public/`:**
- Purpose: Static assets copied verbatim to build output root
- Generated: No
- Committed: Yes

**`.planning/`:**
- Purpose: GSD planning documents (codebase maps, phase plans)
- Generated: Yes (by GSD tooling)
- Committed: Yes

**`.git/`:**
- Purpose: Git version control
- Generated: Yes
- Committed: N/A

---

*Structure analysis: 2026-05-23*
