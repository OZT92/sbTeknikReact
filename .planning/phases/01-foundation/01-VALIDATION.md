---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-23
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no test runner installed; bash assertions used instead |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && ls public/fonts/Inter/*.woff2 && ls public/fonts/BarlowCondensed/*.woff2 && ls public/img/services/*.webp | wc -l && grep -c "^:root" src/index.css` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (confirms no import/compile errors)
- **After every plan wave:** Run bash smoke assertions (see Per-Task Verification Map)
- **Before `/gsd-verify-work`:** Full suite + browser visual check with all 4 success criteria confirmed
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| fonts-woff2 | 01 | 1 | FOUN-01 | — | N/A | smoke | `ls public/fonts/Inter/*.woff2` | ❌ Wave 0 | ⬜ pending |
| fonts-ttf-request | 01 | 1 | FOUN-01 | — | N/A | manual | DevTools Network tab inspection | manual-only | ⬜ pending |
| webp-images | 02 | 1 | FOUN-02 | — | N/A | smoke | `ls public/img/services/*.webp \| wc -l` (expect 6) | ❌ Wave 0 | ⬜ pending |
| webp-build | 02 | 1 | FOUN-02 | — | N/A | smoke | `npm run build` | ❌ Wave 0 | ⬜ pending |
| root-token-block | 03 | 1 | FOUN-03 | — | N/A | smoke | `grep -c "^:root" src/index.css` (expect 1) | ❌ Wave 0 | ⬜ pending |
| root-color-token | 03 | 1 | FOUN-03 | — | N/A | smoke | `grep "\-\-color-bg" src/index.css` | ❌ Wave 0 | ⬜ pending |
| barlow-woff2 | 04 | 1 | FOUN-04 | — | N/A | smoke | `ls public/fonts/BarlowCondensed/*.woff2` | ❌ Wave 0 | ⬜ pending |
| dark-bg-visual | 04 | 1 | FOUN-04 | — | N/A | manual | `npm run dev` → browser → verify dark background | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No test runner to install — bash assertions are one-line shell commands that run directly. No Wave 0 test file setup is required.

*Existing infrastructure (Vite build) covers compile/import verification for all plans.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| No TTF request in browser Network tab | FOUN-01 | Requires DevTools browser inspection | Run `npm run dev`, open DevTools Network tab, reload, confirm no `.ttf` requests appear |
| Dark background (#0f1923) visible globally | FOUN-04 | Visual rendering check | Run `npm run dev`, open site in browser, confirm dark ground background on all 4 pages |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or are documented as manual-only
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 note confirmed: bash assertions sufficient, no runner install needed
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
