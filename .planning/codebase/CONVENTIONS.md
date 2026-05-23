# Coding Conventions

**Analysis Date:** 2026-05-23

## Naming Patterns

**Files:**
- React components: PascalCase `.jsx` — e.g. `Card.jsx`, `BrandSlider.jsx`, `HomePage.jsx`
- Pages: PascalCase with `Page` suffix — e.g. `AboutPage.jsx`, `ContactPage.jsx`
- Non-component modules: camelCase `.js` — e.g. `site.js`
- CSS: single `index.css` at `src/` root; no CSS modules or separate per-component files

**Components:**
- PascalCase function names matching the filename exactly
- Sub-components defined in the same file as their parent when tightly coupled (e.g. `LogoItem` inside `BrandSlider.jsx`)

**Variables and Constants:**
- Module-level data arrays: camelCase — e.g. `logos`, `services`, `certificates`
- Motion variant objects: camelCase descriptive names — e.g. `cardVariants`, `panel`, `certsAnim`, `fadeIn`, `list`, `item`
- Computed/derived page-level constants: camelCase — e.g. `canonical`
- Exported config objects: UPPER_SNAKE_CASE — e.g. `SITE` in `src/seo/site.js`

**Props:**
- camelCase — e.g. `imgSrc`, `ogImage`, `jsonLd`, `noindex`
- Boolean props with sensible defaults declared inline — e.g. `noindex = false`

## Export Style

**Two patterns in use — both are acceptable:**
- Named arrow function + `export default` at bottom (used in `Navbar.jsx`, `Button.jsx`, `HomePage.jsx`, `ContactPage.jsx`)
- `export default function Name()` declaration (used in `Card.jsx`, `SEO.jsx`, `ServicesPage.jsx`, `AboutPage.jsx`, `BrandSlider.jsx`)

There is no enforced single style; both coexist. New code should match the file it is adjacent to.

## Import Organization

**Order (observed pattern):**
1. Third-party libraries — `react-router`, `motion/react`, `@phosphor-icons/react`
2. Internal components — `../components/ComponentName`
3. Internal data/config — `../seo/site.js`
4. Static assets (images, video) — `../img/...`, `../video/...`

**Path style:** Relative paths only. No path aliases configured.

**Extension handling:** `.jsx` extension included when importing pages from `App.jsx`; omitted in some other imports (both are present — no strict rule enforced).

## Motion / Animation Patterns

Motion variant objects are always defined as module-level constants outside the component:

```jsx
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
// Used as: <motion.div variants={cardVariants} initial="hidden" whileInView="show" ...>
```

Entry animations use `initial` + `animate`. Scroll-triggered animations use `whileInView` + `viewport={{ once: true, amount: 0.25 }}`.

Accessibility: `useReducedMotion()` from `motion/react` is used in `AboutPage.jsx` to skip video when the user prefers reduced motion.

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

Every page renders `<SEO ... />` as the first child, passing `title`, `description`, `canonical`, `ogImage`, and a page-specific `jsonLd` object. Schema.org types used: `Organization`, `Service`, `LocalBusiness`.

## Error Handling

- No explicit error boundaries present
- No try/catch in component code
- No async data fetching — all data is static/local

## ESLint Rules

Config file: `eslint.config.js`

- Base: `@eslint/js` recommended
- Plugins: `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Custom rule: `no-unused-vars` set to `error`, variables matching `/^[A-Z_]/` pattern are ignored
- `/* eslint-disable no-unused-vars */` suppressions present in `Button.jsx` and `HomePage.jsx`

## Comments

- Inline comments explain non-obvious decisions — e.g. React 19 + CSP JSON-LD approach in `SEO.jsx`
- Turkish-language inline comments used for domain notes
- JSDoc not used

---

*Convention analysis: 2026-05-23*
