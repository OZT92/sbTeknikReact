# Stack Research: SB Teknik Malzeme Redesign

**Researched:** 2026-05-23
**Overall confidence:** HIGH — existing stack is confirmed from source files; ecosystem recommendations are based on well-established 2024-2025 consensus.

---

## Recommended Stack

| Layer | Technology | Version | Action |
|-------|-----------|---------|--------|
| Core framework | React | 19.2.0 | Keep as-is |
| Build tool | Vite | 7.2.4 | Keep as-is |
| Routing | React Router | 7.12.0 | Keep as-is |
| Animation | Motion (Framer) | 12.34.0 | Keep — extend |
| Icons | Phosphor Icons | 2.1.10 | Keep as-is |
| CSS approach | Enhanced global CSS + CSS custom properties | — | Extend current file; add token layer |
| Typography | Barlow Condensed + Inter (existing) | variable | Add Barlow Condensed via @font-face |
| WhatsApp CTA | Native `<a href="wa.me/...">` | — | No new dependency needed |

**No new runtime dependencies required.** The redesign is purely CSS + font + markup work on top of the existing stack.

---

## CSS Approach

**Recommendation: Stay with enhanced global CSS. Add a CSS custom properties token layer at the top of `index.css`. Do NOT add Tailwind or CSS Modules.**

### Why not Tailwind

Introducing Tailwind into an 852-line BEM-ish global CSS codebase mid-project requires either:
1. Full migration (high risk, high effort, out of scope)
2. Hybrid coexistence (results in two competing systems, tech debt)

The redesign is visual, not structural. The component boundaries and class names are already stable. A CSS token layer achieves the same design consistency Tailwind would provide without touching a single JSX file.

### Why not CSS Modules

CSS Modules require renaming every class reference in every component file. The existing global class names are consistent and readable. The codebase has 4 pages and 5 components — there is no naming collision problem to solve.

### What to do instead

Consolidate the scattered hardcoded hex values into CSS custom properties at the `:root` level. The codebase already demonstrates this pattern correctly in `BrandSlider` (`--duration`, `--gap`, `--logoH`). Apply it globally:

```css
:root {
  /* Brand palette */
  --color-primary:     #0f1923;   /* near-black — industrial dark ground */
  --color-accent:      #c8960c;   /* amber/gold — industrial accent, replaces #194d88 */
  --color-surface:     #1a2332;   /* dark navy surface */
  --color-text-primary: #f5f0eb;  /* warm off-white — readable on dark */
  --color-text-muted:  #8a9ab0;   /* secondary text */
  --color-border:      #2e3d50;   /* subtle divider */

  /* Typography scale (existing 62.5% base means 1rem = 10px) */
  --font-display:  'Barlow Condensed', sans-serif;
  --font-body:     'Inter', sans-serif;

  /* Spacing */
  --space-xs:  0.8rem;
  --space-sm:  1.6rem;
  --space-md:  3.2rem;
  --space-lg:  6.4rem;
  --space-xl:  12.8rem;

  /* Motion */
  --ease-out:  cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast:   150ms;
  --duration-normal: 300ms;
}
```

This approach:
- Zero new dependencies
- Zero JSX changes required
- Tokens are immediately usable everywhere in the existing file
- Replaces the ~12 hardcoded `#194d88` and `#fefcfb` values with meaningful names
- Confidence: HIGH

---

## Typography

**Recommendation: Barlow Condensed (display/headings) + Inter (existing, body)**

### Barlow Condensed — primary display font

**Why:** Barlow Condensed is the dominant choice for industrial/construction B2B aesthetics in 2025. It is:
- Compressed horizontally — creates the "heavy machinery" visual density without requiring huge point sizes
- Available in 9 weights (100–900) in condensed and semi-condensed cuts
- Fully open source (Google Fonts / SIL Open Font License)
- Optimized for large-scale display use (hero titles, section headers)
- Used extensively by industrial brands (construction, manufacturing, logistics) specifically because the condensed geometry reads as structural and engineered

**Weights to load:** 700 and 900 only (display use — no need for lighter cuts). Semi-condensed 600 optionally for subheadings.

**Self-hosting:** Download from Google Fonts, place alongside the existing Inter font in `/public/fonts/`, declare via `@font-face` with `font-display: swap`. This matches the existing pattern exactly and avoids external network dependency at render time.

**Alternative considered: Oswald**
Oswald is also condensed and industrial, but Barlow Condensed has a more contemporary construction-tech feel. Oswald reads slightly more "gym/fitness." For a supplier of TSE/ISO-certified industrial materials, Barlow Condensed signals precision over aggression.

**Alternative considered: Bebas Neue**
Bebas Neue is caps-only. It works for single-line hero labels but fails for mixed-case body headings and Turkish diacritic characters (ş, ğ, ü, ö, ı, ç). Do not use it.

**Alternative considered: replacing Inter**
Inter is an excellent neutral body font. There is no reason to change it. It pairs well with Barlow Condensed because their x-heights are harmonious.

### Usage pattern

```css
/* Section titles, hero headings */
font-family: var(--font-display);
font-weight: 900;
text-transform: uppercase;
letter-spacing: 0.02em;

/* Body copy, nav, labels */
font-family: var(--font-body);
font-weight: 400 or 600;
```

Confidence: HIGH — Barlow Condensed is a verified stable font with consistent Google Fonts availability and active maintenance.

---

## Animation

**Recommendation: Keep Motion (Framer) 12.x. Extend it — do not replace it.**

Motion is already installed (`motion` package, `motion/react` import path), already used in all four page components, and already at a current major version (12.x). Removing it would break every page transition and stagger effect.

For the redesign, Motion should be used for:

- **Entrance animations on scroll** — `whileInView` + `viewport: { once: true }` on section headers and service cards. This is the primary visual upgrade Motion enables.
- **Staggered children** — The services card grid benefits from `staggerChildren: 0.08` on the container variant. Already partially used; extend the pattern.
- **WhatsApp FAB** — A subtle `initial={{ scale: 0 }} animate={{ scale: 1 }}` spring on mount with a `whileHover={{ scale: 1.08 }}` and `whileTap={{ scale: 0.95 }}` is the standard Motion FAB treatment.
- **Navbar** — `AnimatePresence` for mobile menu if added later; no change needed now.

**What to avoid with Motion:**
- Do not animate layout properties (`width`, `height`, `top`, `left`) — animate `transform` and `opacity` only. This is already the project pattern; maintain it.
- Do not use `layoutId` or `AnimateSharedLayout` — overkill for this site.
- Keep `will-change: transform` on elements with continuous animations (already done on `.logoTrack`).

Confidence: HIGH — Motion 12.x API is confirmed from the installed package version and the existing usage pattern in the codebase.

---

## WhatsApp Integration

**Recommendation: Plain `<a>` tag with `wa.me` deep link. Zero dependency.**

### Link format

```
https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20SB%20Teknik%20Malzeme%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.
```

- Country code: `90` (Turkey), no leading `+` or `0`
- Phone number: digits only, no spaces/hyphens
- `text` param: URL-encoded Turkish pre-fill message. This populates the WhatsApp compose field when the user taps the button — they still send it manually. No API needed.
- Works on mobile (opens WhatsApp app) and desktop (opens web.whatsapp.com or the desktop app)

### Pre-filled message (Turkish)

```
Merhaba, SB Teknik Malzeme hakkında bilgi almak istiyorum.
```

URL-encoded:
```
Merhaba%2C%20SB%20Teknik%20Malzeme%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.
```

### Component pattern

```jsx
const WHATSAPP_URL =
  "https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20SB%20Teknik%20Malzeme%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

export function WhatsAppFAB() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
      className="whatsapp-fab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay: 1.5, stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* WhatsApp SVG icon or Phosphor equivalent */}
    </motion.a>
  );
}
```

### CSS positioning

```css
.whatsapp-fab {
  position: fixed;
  bottom: 2.4rem;
  right: 2.4rem;
  z-index: 1000;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background-color: #25d366;   /* WhatsApp brand green — do not change */
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  text-decoration: none;
}

@media (max-width: 640px) {
  .whatsapp-fab {
    bottom: 1.6rem;
    right: 1.6rem;
    width: 5rem;
    height: 5rem;
  }
}
```

**Icon:** Phosphor Icons does not include a WhatsApp icon (it avoids brand icons). Use a raw inline SVG of the WhatsApp logo (publicly available, no license issues for linking to their own service) or an `<img>` of the official WhatsApp icon. Keep it simple — one element.

**Placement:** Bottom-right. Do not use bottom-left — Turkish users scan left-to-right; the CTA lives on the terminal (right) side of the reading flow.

**Delay:** `delay: 1.5` seconds on mount animation — gives the page content time to land before the FAB draws attention.

Confidence: HIGH — `wa.me` link format is WhatsApp's official documented deep link scheme. No third-party service involved.

---

## Design Token Palette — Industrial Aesthetic

The current palette (`#194d88` blue, `#fefcfb` warm white, `#2d080a` dark red-black) is soft and corporate. For a bold industrial aesthetic, shift to a dark-ground system with high-contrast accent.

**Recommended direction: Dark ground + amber/gold accent**

| Token | Value | Role |
|-------|-------|------|
| `--color-primary` | `#0f1923` | Page background, hero ground — near-black with blue undertone (steel/industrial) |
| `--color-surface` | `#1a2840` | Card and section backgrounds — slightly lighter dark navy |
| `--color-accent` | `#c8960c` | Primary CTA, highlights, underlines — amber signals industrial equipment, caution tape, premium hardware |
| `--color-accent-hover` | `#e8b010` | Hover state for accent |
| `--color-text-primary` | `#f0ebe4` | Body text on dark — warm off-white, less harsh than pure #fff |
| `--color-text-muted` | `#7a8fa8` | Secondary labels, captions |
| `--color-border` | `#253347` | Dividers, card borders |

**Why amber/gold over the existing blue:** The existing `#194d88` is a trustworthy corporate blue, but it reads as "office software" or "bank." Amber/gold reads as industrial hardware, precision instruments, and construction equipment — directly aligned with the product category (yapı malzemeleri, el aletleri). The dark ground makes the amber pop at very high contrast, which creates the "bold" impression procurement managers respond to.

**Alternative considered: red accent (`#c0392b`)**
Red works for aggressive industrial brands but can read as "warning/danger" in a Turkish B2B context, which is not the right trust signal for a supplier. Amber avoids this.

Confidence: MEDIUM — color direction is grounded in B2B industrial design conventions, but final palette should be validated against actual logo colors before committing.

---

## Confidence Summary

| Area | Confidence | Basis |
|------|-----------|-------|
| Keep existing React/Vite/Motion stack | HIGH | Confirmed from source files |
| Enhanced global CSS + tokens | HIGH | Matches existing codebase pattern; zero risk |
| Barlow Condensed typography | HIGH | Stable open-source font, clear industrial precedent |
| Motion animation patterns | HIGH | Confirmed from installed version and existing usage |
| WhatsApp `wa.me` link format | HIGH | Official WhatsApp documented scheme |
| Dark + amber color direction | MEDIUM | Design convention; needs logo color validation |

---

## What This Does Not Cover

- Actual hex values of the company logo (needs visual inspection of `src/img/` or `src/assets/`)
- Whether the hero video works well on a dark-ground layout (needs visual test after CSS change)
- Specific Motion variant configurations per component (phase-level work)
- Turkish diacritic rendering validation for Barlow Condensed (test on first implementation)
