# Testing Patterns

**Analysis Date:** 2026-05-23

## Test Framework

**Runner:** None — no test framework is installed or configured.

**Test files found:** 0

The project has no testing infrastructure. `package.json` contains no test runner dependency (no Jest, Vitest, Playwright, Cypress, or Testing Library). There is no `test` script in `scripts`.

**Run Commands:**
```bash
# No test commands exist
npm run lint    # Only quality check available
```

## Current Quality Assurance

The only automated quality tooling present is ESLint:

- Config: `eslint.config.js`
- Command: `npm run lint`
- Covers: JS/JSX files, React Hooks rules, React Refresh rules

## Test File Organization

Not applicable — no test files exist in the project.

## Test Types

**Unit Tests:** Not used

**Integration Tests:** Not used

**E2E Tests:** Not used

## Coverage

**Requirements:** None enforced

**Coverage tooling:** Not installed

## Recommendations for Adding Tests

If tests are introduced, the natural fit given the Vite + React stack is:

**Framework:** Vitest (native Vite integration, zero config overhead)

**Suggested setup:**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/user-event jsdom
```

**Suggested `vitest.config.js`:**
```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

**Suggested test script in `package.json`:**
```json
"test": "vitest",
"test:coverage": "vitest run --coverage"
```

**Suggested file placement:** Co-located with components — e.g. `src/components/Card.test.jsx`

**Highest-value test targets given current codebase:**
- `src/components/Card.jsx` — conditional `Link` vs plain `div` render based on `to` prop
- `src/components/SEO.jsx` — meta tag rendering, `noindex` flag, `jsonLd` output
- `src/components/BrandSlider.jsx` — logo duplication (a/b sets), `href` conditional render
- `src/seo/site.js` — `SITE` constant shape validation

---

*Testing analysis: 2026-05-23*
