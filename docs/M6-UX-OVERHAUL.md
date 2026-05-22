# M6: Polish & UX Overhaul — Standing Goal

**Status**: Active
**Owner**: Hermes (with Codex/Grok delegation)
**Based on**: UI/UX critique by Hash Critic (2026-05-22)

## Current State

M1 (Onboarding) and M2 (Jobs infrastructure) are deployed. The site has the right bones — auth, KYC, job post/apply, category pages — but the UX feels like a "concept landing page" rather than a marketplace. Main gaps:

- Generic hero copy that doesn't use the brand's local voice
- No search-first mechanic (users arrive with problems, not categories)
- "Loading..." splash on key pages (SEO + bounce risk)
- Login wall before job posting (blocks highest-intent users)
- 8/11 categories empty (sparse > empty)
- Fake trust signals (picsum portfolios, dead social links)
- CTAs ambiguous ("Cari Upah" reads two ways)
- Provider cards lack price/area/rating/availability at a glance
- Orange/amber color clash against brand green

## Milestone Plan

### P0: Hero + Search Bar (Highest Impact, Lowest Effort)
- Rotating vertical word ticker: `Nak [Kahwin?]` → `[Paip Tersumbat?]` → `[Shoot Produk?]`
- Hero: big search input `"Nak apa hari ini?"` → redirects to `/jobs?search=...`
- Brand tagline: `UpahJe.` below the ticker
- Remove old hero copy ("Hire trusted local help...")

### P1: Fix Technical Debt
- SSR first on `/jobs`, `/auth/signup`, `/jobs/post` — eliminate blank "Loading..." splash
- Remove login wall from `/jobs/post` — let them draft, prompt sign-in at submission
- Add Suspense boundaries with skeleton state instead of "Loading..."

### P2: Trust & Credibility
- Remove all fake trust signals: picsum portfolios, dead social links, fake live activity
- Show real numbers only: "X providers onboarded, Y service areas" or nothing
- Add trust flow: verified provider badges, "Pay when done" explanation with escrow note
- Replace dead social links with real ones or remove them

### P3: Categories → Problem-Based
- Rewrite category cards as problem cards: "Nak Kahwin?", "Rumah Rosak?", "Nak Shoot Produk?"
- Each problem card links to related services
- Hide empty categories — show only what has live supply
- Cluster around events/weddings as the first dense niche

### P4: CTAs & Audience Split
- Primary CTA: `Cari Servis` / `Post Kerja`
- Secondary CTA: `Ambil Job` / `Jadi Freelancer`
- Clear split: "Untuk Yang Nak Upah" / "Untuk Yang Nak Cari Upah"
- Fix "Cari Upah" ambiguity

### P5: Provider Cards Redesign
- Show: price range, location/area, rating, availability badge, verified badge
- "Available Today" / "Top Rated" / "Verified IC" labels
- Expandable inline preview (already done for jobs, apply same to talent)

### P6: Visual Hierarchy
- Reorder homepage: Hero → Search → How It Works → Trust → Featured Providers → Freelancer CTA
- Each section visually distinct (not equal weight)
- Green only for conversion moments, not branding

## Go-Live Target

| Priority | Items | Effort | Timeline |
|----------|-------|--------|----------|
| P0 | Hero + Search | 1 session | Today |
| P1 | Tech debt (SSR, login wall) | 1–2 sessions | Next |
| P2 | Trust signals | 1 session | Next |
| P3 | Problem categories | 1 session | Next |
| P4 | CTAs + audience split | 0.5 session | Next |
| P5 | Provider cards | 1 session | Next |
| P6 | Visual hierarchy | 1 session | Final |

**Completed**: P0 (Hero + Search Bar), P1 (SSR fix + login wall removal), P2 (Trust & Credibility), P3 (Problem-based categories), P4 (CTAs & Audience Split)
**Next**: P5 — Provider cards redesign
