# Features Research

**Domain:** B2B industrial supply / construction materials — Turkish market
**Project:** SB Teknik Malzeme website redesign
**Date:** 2026-05-23
**Confidence:** MEDIUM-HIGH — drawn from established B2B conversion research and Turkish digital commerce patterns; live competitor benchmarking was not possible in this session

---

## Table Stakes

Features that procurement managers expect by default. Missing any of these creates immediate trust failure and causes bounce.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Visible phone number in header | Procurement managers verify legitimacy immediately; clicking a phone link is their fastest action | Low | Already exists — must be prominent in redesigned navbar, not buried |
| Physical address + Google Maps | Suppliers without a traceable address are not shortlisted; Istanbul location is a trust anchor | Low | Already exists on Contact page — reinforce on homepage footer too |
| Years in business / founding date | Longevity signals survival through market cycles; new suppliers carry risk | Low | 2015 founding = 10+ years. Must appear above the fold on About; consider a stat callout on homepage |
| Named service categories | Procurement managers search by category (e.g., "iş güvenliği malzemeleri") — undefined "products" creates friction | Low | Already exists as 6 categories — names and icons must be scannable in 3 seconds |
| Fast mobile load (under 3s) | Field procurement staff use mobile; slow sites are abandoned immediately | Medium | Existing video/poster optimisation helps — preserve through redesign |
| Certificates displayed visibly | ISO 9001, TSE, CE are minimum credibility gates for B2B industrial; buyers check before calling | Low | Already exists — must be above the fold on About page, not hidden at bottom |
| Clear contact CTA on every page | Procurement managers should never need to navigate to find "how to reach you" | Low | Partially exists — redesign must put a contact action in navbar or persistent footer on all pages |
| Mobile-responsive layout | Mandatory since 2020; non-responsive = unprofessional signal | Low | Already implemented |
| Legible, professional typography | Industrial buyers equate visual quality with operational quality | Medium | This is the core redesign goal |

---

## Differentiators

Features that give SB Teknik a measurable edge over competitors who have only the table stakes. Relevant given 10-year history and Istanbul location.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| WhatsApp floating CTA (persistent, site-wide) | WhatsApp is the dominant B2B contact channel in Turkey — it removes all friction between intent and contact. Competitors with only phone/email lose prospects who prefer async messaging | Low | Core requirement; details in WhatsApp section below |
| Partner brand logos (25 logos, animated marquee) | Signals that major brands trust this supplier; procurement managers recognize brand names and use them as proxy for quality standards | Low | Already built as BrandSlider — redesign must make it more visually prominent and credible-looking |
| Certificate badges with names, not just icons | ISO 9001 + ISO 10002 + TSE + CE displayed as named, legible badges (not tiny decorative icons) communicates that quality systems are in place, not just claimed | Low | Upgrade existing certificate display to labeled, visible badges |
| Specific service depth callout | "6 product categories, X+ brands, serving Istanbul since 2015" — specificity converts better than generic "wide range of products" | Low | No backend needed; static copy change with high impact |
| Industrial aesthetic that matches the product | A construction materials supplier with a clean but sterile SaaS-looking site creates cognitive dissonance. Bold/industrial visual design reinforces category expertise | Medium | This is the redesign's primary differentiator |
| Location-specific trust signal | Beyoğlu/İstanbul address communicates proximity to major construction projects and quick fulfilment. Mention district, not just city | Low | Add to homepage; currently only on Contact page |
| Single clear value statement in hero | "İstanbul'un güvenilir endüstriyel malzeme tedarikçisi — 2015'ten beri" type headline converts better than generic hero text because it answers "why you and not the next Google result" | Low | Hero copy rewrite — no technical cost |

---

## Anti-Features

Things to deliberately not build, with rationale. Each anti-feature has a real cost: development time, maintenance burden, or UX complexity that erodes the primary goal (contact inquiries).

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Product catalog with search/filter | No inventory data means a catalog is either empty, outdated, or misleading. Procurement managers who find a catalog and can't verify stock or pricing are frustrated, not converted | Keep service categories as the discovery layer; direct users to WhatsApp/phone to ask about specific products |
| Quote request form | No backend = no reliable delivery. An undelivered quote request is worse than no form (erodes trust if unanswered). Forms also add friction vs WhatsApp | Use WhatsApp CTA with pre-filled message as the lightweight async quote channel |
| Live chat widget (third-party) | Adds ~50-100KB, a cookie consent obligation, and creates expectation of fast response. If unmanned, damages trust | WhatsApp is the Turkish market equivalent of live chat — use it instead |
| Blog / news section | Content marketing requires ongoing commitment. A blog with 2 posts from 2023 signals neglect, not expertise | If content is desired later, dedicate a future milestone with a content plan |
| Language toggle (EN) | English-language procurement managers in the Turkish industrial market are not the target audience. Adds maintenance surface for every copy change | Turkish only, as already decided |
| Team member profiles | Small industrial suppliers who add team pages often expose liability (staff turnover, sparse team size). The company story is more trust-building than individual names at this stage | Use company history and milestones instead |
| Social media feed embeds | Feed embeds (Instagram, Twitter) load third-party JS, break layout when APIs change, and industrial buyers do not use them as trust signals | Link to social profiles in footer if desired; never embed live feeds |
| Parallax-heavy scroll animations | Expensive on mobile, cause motion sickness for some users, and signal "agency template" rather than industrial authority | Use purposeful entrance animations (already using Motion/Framer) with restraint |
| Cookie consent banner for analytics | If no analytics or tracking scripts are added, no banner is needed. Adding GA4 for a static brochure site adds compliance burden without clear benefit at this stage | Skip analytics in v1; add only if traffic measurement is explicitly required |

---

## WhatsApp CTA Best Practices

### Placement

- **Floating button, bottom-right, fixed position** — this is the universal pattern; bottom-left conflicts with browser UI on mobile. Z-index above all content.
- **Persistent across all 4 pages** — implemented in `App.jsx` outside the route tree so it renders on every route without per-page duplication.
- **Safe zones** — on mobile, position at least 80px from the bottom edge to avoid overlap with browser navigation bars. On desktop, 24–32px from corner edges.
- **Size** — 56–64px diameter on mobile (minimum 44px tap target per WCAG), 56px on desktop. Large enough to be noticed; small enough not to cover content.
- **Animation** — single subtle entrance animation on first load (bounce-in or fade-scale). Do not loop or pulse continuously — it becomes noise and trains users to ignore it.
- **Icon** — WhatsApp logo (green #25D366 on white, or white on green). Add a small "WhatsApp" label on desktop hover state for clarity; label is optional on mobile where the icon is universally recognized in Turkey.

### Copy / Pre-filled Message

The `wa.me` link format: `https://wa.me/90XXXXXXXXXX?text=ENCODED_MESSAGE`

Pre-filled message must do three things: (1) identify the channel (so the team knows it came from the website), (2) signal buyer intent without commitment, (3) be short enough that the user does not feel they are typing for them.

**Recommended Turkish pre-filled message:**

```
Merhaba, web sitenizden ulaşıyorum. Ürün ve hizmetleriniz hakkında bilgi almak istiyorum.
```

This works because:
- Starts with "Merhaba" — standard Turkish greeting, not formal/cold
- "web sitenizden ulaşıyorum" — tells SB Teknik staff the lead source immediately
- "bilgi almak istiyorum" — non-committal intent that lowers the user's psychological barrier to sending
- Under 120 characters — users can read it in 2 seconds and hit send without editing

**Avoid:**
- Long messages that force the user to scroll before sending
- Messages that start with company name ("SB Teknik Malzeme'ye ulaşıyorum") — sounds robotic
- English in the pre-filled text
- Overly specific messages ("fiyat teklifi istiyorum") — limits use case; some callers want general info

### Button Label (if adding text alongside icon)

- "WhatsApp'tan Yazın" — clear, actionable, Turkish
- "Bize Yazın" — simpler alternative
- Avoid "İletişim" — too generic, doesn't signal WhatsApp specifically

### Tooltip on hover (desktop)

A tooltip appearing on hover adds a secondary CTA opportunity on desktop:
- "Hemen Yazın — Online" (if you want to imply availability)
- Or simply the phone number as reinforcement

### Implementation note for this codebase

Add as a `WhatsAppButton` component in `src/components/`. Read phone number from `SITE` config in `src/seo/site.js` so it stays in sync with the contact page. Mount it in `src/App.jsx` between `<Navbar>` and `<Routes>` — it will render on all pages without touching any page file.

---

## Trust Signal Patterns

What actually converts for B2B industrial buyers — ranked by impact for the Turkish market.

### Tier 1 — Immediate trust gates (checked before calling)

**1. Certificates with context**
Displaying certificate logos is table stakes. What converts is displaying them with:
- The full name (not just "ISO" — write "ISO 9001:2015 Kalite Yönetim Sistemi")
- The issuing body where known
- A visual treatment that looks official, not decorative

For SB Teknik: TSE, ISO 10002, ISO 9001, CE are already held. Show them as a defined horizontal row, visually separated from decorative graphics. Consider linking to certificate documents if PDFs are available (very high trust signal — almost no competitors do this).

**2. Years in business as a number**
"2015'ten Beri" or "10+ Yıllık Deneyim" displayed as a large typographic number (e.g., "10+" in oversized weight) converts because it is scannable at a glance. Procurement managers who scan don't read paragraphs — they read numbers.

**3. Physical address specificity**
"Beyoğlu, İstanbul" converts better than "İstanbul" alone. District-level specificity signals a real, locatable business. Pair with the Google Maps embed or a static map image.

**4. Phone number format**
Display as: `+90 (212) XXX XX XX` — the full international format with area code signals legitimacy and allows click-to-call on mobile. Avoid formatting as just digits.

### Tier 2 — Credibility amplifiers (noticed during evaluation)

**5. Partner brand logos**
A recognized brand (Bosch, Hilti, Sika, etc.) in the logo slider says "these brands trusted this supplier enough to partner with them." This is borrowed authority — one of the most efficient trust signals available. The existing BrandSlider component serves this; the redesign should make it visually prominent (not tiny, not hidden below the fold).

**6. Specific service breadth**
"6 Ana Kategori" as a stat is more convincing than a list. Pair with the count of brands or SKUs if available. If not, use "Geniş Ürün Yelpazesi" with category names as the backup.

**7. Social proof — customer count or project count**
"X+ mutlu müşteri" or "X+ tamamlanan proje" if the company has this data. Even conservative numbers (50+, 100+) outperform no number. Only use if the numbers are real — procurement managers spot inflated figures.

### Tier 3 — Reinforcement signals (deepen trust after initial assessment)

**8. Company story with dates**
A brief timeline or founding story (not just "we were founded in 2015") that mentions growth, milestones, or team size converts because it makes the company feel inhabited by real people. 2-3 sentences, not a page of text.

**9. Consistent professional photography or video**
The existing About page background video is a strong signal if the video quality is high. Avoid stock photography of generic industrial settings — it reads as inauthentic to buyers who know the industry. Real product photos or real Istanbul location shots are far more credible.

**10. Response time signal**
Even a static claim like "Mesai saatlerinde WhatsApp'a genellikle 1 saat içinde yanıt veriyoruz" placed near the CTA reduces hesitation. Buyers fear being ignored; setting an expectation converts.

### What does NOT convert for Turkish B2B industrial

- Awards from obscure organizations — buyers don't recognize them and they feel bought
- Testimonial carousels with stock headshot photos — immediately recognized as fake
- Vague mission statements ("müşteri memnuniyetini ön planda tutuyoruz") without evidence — every competitor says this
- "En iyi fiyat garantisi" claims without mechanism — creates skepticism
- Animated counter widgets (numbers counting up to a stat) — overused to the point of blindness by 2025

---

## Hero / Homepage Patterns for Industrial B2B

### What the hero must communicate in under 5 seconds

1. **Who you are** — company name / type visible in logo or H1
2. **What you supply** — category clarity ("yapı malzemeleri ve endüstriyel ürünler")
3. **Why trust you** — one anchoring signal (years, location, certificate count)
4. **What to do next** — one primary CTA, one secondary CTA maximum

### Recommended hero structure for SB Teknik

```
[Background: dark industrial video/image — existing video asset]

[Logo — top left in navbar]

H1: "İstanbul'un Güvenilir Endüstriyel Tedarikçisi"     ← bold, large, max 6 words
H2/Subhead: "Yapı malzemeleri, tesisat, iş güvenliği ve daha fazlası — 2015'ten beri"

[Primary CTA button]: "WhatsApp'tan Yazın"   ← direct channel to conversion
[Secondary CTA button]: "Hizmetlerimizi Görün"  ← internal navigation
```

- H1 should be 60–80px on desktop, 36–44px on mobile
- High contrast text over the video (white text + dark overlay on video is the standard)
- The primary CTA in the hero should mirror the floating WhatsApp button — dual exposure increases conversion without adding new channels
- Do not put 4+ CTAs in the hero — procurement managers who see too many options defer action

### What to avoid in the hero

- Auto-playing video without a dark overlay (text becomes illegible)
- Hero sliders / carousels — they reduce conversion; static heroes convert better for B2B
- Vague hero text ("Kalite ve Güven") — says nothing differentiating
- Hero that takes the full viewport with no hint of content below — procurement managers need to see there is depth to scroll into

### Below-the-fold homepage flow (recommended order)

1. **Key stats row** — "10+ Yıl", "6 Kategori", "25+ Marka" as large typographic numbers
2. **Service categories** — 6-card grid, scannable in 3 seconds
3. **Brand partner logos** — BrandSlider, positioned here as trust reinforcement
4. **Trust signal strip** — certificate badges + a one-line company claim
5. **Final CTA block** — WhatsApp + Contact page link before footer

This order follows the B2B evaluation funnel: identity → capabilities → evidence → action.

---

## Sources and Confidence

| Area | Confidence | Basis |
|------|------------|-------|
| Table stakes | HIGH | Standard B2B UX research (Baymard, Nielsen Norman, established CRO literature) |
| Anti-features | HIGH | Consistent across B2B conversion research; anti-catalog pattern validated by project constraints |
| WhatsApp CTA placement | HIGH | Universal floating button pattern, well-established |
| WhatsApp pre-filled copy | MEDIUM | Turkish B2B messaging conventions from market knowledge; no live A/B test data available |
| Trust signal tier ranking | MEDIUM-HIGH | B2B buyer behavior research + Turkish digital commerce patterns; live competitor benchmarking not performed |
| Hero pattern | HIGH | Nielsen Norman B2B homepage research; industrial sector conventions |

*Live competitor benchmarking of Turkish industrial supply websites (e.g., Tekzen, Bauhaus TR, niche B2B suppliers) was not performed due to tool restrictions. Recommend manually reviewing 3–5 direct competitors before finalizing hero copy.*
