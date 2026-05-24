# UpahJe.my — Design Specification
# Generated via /impeccable document workflow
# Date: 2026-05-24

---

## 1. Concept & Vision

**What it does:** Malaysia's local hiring platform — connects people who need services (photography, home repair, tutoring, errands) with verified local freelancers.

**What it feels like:** Trustworthy, warm, distinctly Malaysian. Like asking a neighbor who happens to be a pro. Not a cold corporate job board — a community marketplace with real people and real accountability.

**Brand Personality:** Friendly but professional. Confident but not aggressive. Local-first, verified, secure.

---

## 2. Design Language

### Aesthetic Direction
**Reference:** Warm Southeast Asian marketplace meets modern SaaS — think Carousell meets Fiverr but with higher trust signals. Clean but not sterile. Uses vernacular Malaysian language as a differentiator.

### Color Palette

```
Primary (Teal) — Trust & Security
  --color-teal-deep:   #0f766e   (headers, primary buttons)
  --color-teal-mid:     #14b8a6   (links, active states)
  --color-teal-soft:    #ccfbf1   (backgrounds, badges)
  --color-teal-pale:    #f0fdfa   (section backgrounds)

Accent (Amber) — Warmth & Urgency
  --color-amber-deep:   #b45309   (secondary buttons, emphasis)
  --color-amber-mid:    #f59e0b   (CTAs, highlights, ticker)
  --color-amber-soft:   #fef3c7   (callout backgrounds)
  --color-amber-pale:   #fffbeb   (subtle highlights)

Neutral
  --color-canvas:       #ffffff   (primary background)
  --color-canvas-soft:  #f9f9f9   (section backgrounds)
  --color-canvas-warm:  #f5f3ee   (warm sections)
  --color-ink:          #0e0f0c   (headings)
  --color-body:         #454745   (body text)
  --color-mute:         #868685   (captions, meta)

Semantic
  --color-positive:     #2ead4b   (success, verified)
  --color-warning:      #ffd11a   (warnings)
  --color-negative:     #d03238   (errors, destructive)
```

### Typography

**Font Stack:**
- Display: `var(--font-sora)` — headings, hero text
- Body: `var(--font-dm-sans)` — body, UI elements
- Fallback: `system-ui, -apple-system, sans-serif`

**Type Scale (Major Third — 1.250 ratio):**
```
Display:   clamp(2.5rem, 6vw, 4.5rem)  — Hero headlines
H1:        clamp(2rem, 4vw, 3rem)       — Section headers
H2:        clamp(1.5rem, 3vw, 2rem)     — Subsection headers
H3:        clamp(1.25rem, 2vw, 1.5rem)  — Card titles
Body:      1rem (16px)                  — Paragraph text
Small:     0.875rem (14px)              — Captions, meta
Caption:   0.75rem (12px)              — Badges, timestamps
```

**Usage Rules:**
- H1-H3: font-display-mega with Sora
- Body: DM Sans, line-height 1.6 for readability
- Headlines: tight letter-spacing (-0.02em)
- Body: normal letter-spacing, generous line-height

### Spatial System

**Base unit:** 4px
**Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

**Component Spacing:**
- Card padding: 24px
- Section padding: 64px vertical (mobile: 48px)
- Grid gap: 24px (cards), 16px (buttons)
- Input padding: 12px 16px

### Motion Philosophy

**Principles:**
- Purposeful, not decorative
- Motion reveals hierarchy and guides attention
- Fast enough to feel snappy, slow enough to be noticed

**Standard Durations:**
- Micro (hover, toggle): 150ms
- Standard (fade, slide): 300ms
- Entrance (page elements): 400-600ms
- Stagger delay: 100ms between items

**Patterns:**
- FadeUp: translateY(20px) → translateY(0), opacity 0 → 1
- Stagger: sequential reveal with 100ms delay
- Hover: scale(1.02), subtle shadow lift
- Page transitions: fade only (no slide on mobile)

### Visual Assets

**Icons:** Emoji-first for emotional resonance (📸 🏠 💻 🎥 💄 💍). Add Icon components for UI controls.

**Images:** Real portfolio photos from talent. No stock photography.

**Decorative:** Gradient mesh on hero, subtle grain texture on canvas-warm sections.

---

## 3. Layout & Structure

### Page Architecture

```
Header (sticky)
  ├── Logo + Nav
  ├── Search (compact)
  └── Auth buttons

Main Content
  ├── Hero Section (full viewport height)
  ├── Categories Grid
  ├── How It Works (3 steps)
  ├── Featured Talent
  ├── Trust & Safety
  └── Final CTA

Footer
  ├── Links (About, FAQ, Privacy, Terms)
  ├── Social (Instagram, TikTok, Facebook)
  └── Copyright
```

### Grid System

**Container:** max-width 1280px, centered, 24px horizontal padding

**Breakpoints:**
- Mobile: < 640px (1 column)
- Tablet: 640-1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

### Responsive Strategy

- Mobile-first implementation
- Hero: stacked layout on mobile, side-by-side on desktop
- Cards: 1 col → 2 col → 3-4 col
- Typography: fluid with clamp()

---

## 4. Features & Interactions

### Primary Features

1. **Search-First** — Search bar prominently placed, instant results
2. **Category Browsing** — Problem-based categories (not skill-based)
3. **Talent Cards** — Portfolio preview, verified badge, price, location
4. **Escrow Payments** — Secure payment with fund release on approval
5. **Trust Verification** — MyKad verification, portfolio review

### Interaction Details

**Search Input:**
- Placeholder: "Cari servis… contoh: photographer, plumber"
- On focus: border color changes to teal-mid
- On submit: triggers search results page
- No results: empty state with suggestions

**Category Cards:**
- Default: subtle shadow, rounded corners
- Hover: scale(1.02), shadow lift, teal border
- Click: navigate to category page

**Talent Cards:**
- Default: flat card with info
- Hover: shadow lift, slight scale
- Verified badge: green checkmark
- Price: prominently displayed in amber

**CTAs:**
- Primary (Cari Servis): teal background, white text, hover darkens
- Secondary (Jadi Freelancer): teal outline, teal text, hover fills
- Disabled: 50% opacity, cursor not-allowed

**Error States:**
- Red border on invalid inputs
- Error message below input in negative color
- Toast notifications for async errors

**Empty States:**
- Illustrated placeholder (emoji-based)
- Helpful message + CTA to resolve

---

## 5. Component Inventory

### Navigation
- **Logo:** UpahJe.my text with teal color
- **Nav links:** Home, Browse Jobs, Hire Talent, Categories, Post Job
- **Auth:** Sign in (text link), Register (teal button)

### Hero Section
- **Ticker:** Rotating Malaysian phrases in amber
- **Headline:** Problem-based question in display font
- **Search bar:** Large input with search button
- **Popular tags:** Pill buttons below search

### Category Cards
- **Icon:** Large emoji (📸 🏠 💻)
- **Title:** H3, ink color
- **Description:** Body text, muted
- **Count:** Small text, teal soft badge

### Talent Cards
- **Name:** H4, bold
- **Role:** Body text, muted
- **Location:** Small, with 📍 emoji
- **Availability:** Small text
- **Price:** Amber, bold
- **Badge:** Verified (green checkmark) or New (teal badge)
- **Status:** New to UpahJe or has jobs completed

### Testimonial Section
- **Quote:** Large text, italic
- **Attribution:** Name + role below
- **Decorative:** Emoji icon for type (👰 💼)

### Footer
- **Links:** Organized in columns
- **Social icons:** Instagram, TikTok, Facebook
- **Copyright:** Muted text

---

## 6. Technical Approach

### Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Motion** (motion.dev) for animations

### Component Architecture
```
app/
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── layout/       # Header, Footer, Container
│   ├── sections/     # Page sections (Hero, Categories, etc.)
│   └── variants/     # Design variants for A/B testing
```

### Design Tokens
All tokens defined in `globals.css` as CSS custom properties under `:root`.

### Animation Components
- `FadeUp.tsx` — Scroll-triggered fade + translate animation
- `Stagger.tsx` — Container for staggered reveal animations

---

## 7. Pages

### Homepage
- Hero with search
- Problem-based categories
- How it works (3 steps)
- Featured talent
- Testimonials
- Trust signals
- Final CTA

### Category Pages
- Category header with description
- Talent grid
- Filter sidebar

### Talent Profile
- Portfolio gallery
- Bio and skills
- Reviews
- Availability
- Contact CTA

### Job Posting
- Multi-step form
- Category selection
- Budget and timeline
- Description

### Dashboard
- For employers: posted jobs, hired talent, payments
- For talent: proposals, active jobs, earnings

---

## 8. Quality Checklist

### Design
- [ ] All text legible (WCAG AA contrast)
- [ ] Touch targets min 44px
- [ ] Consistent spacing (4px grid)
- [ ] Typography hierarchy clear
- [ ] Color not sole indicator of state

### Interaction
- [ ] All buttons have hover/focus states
- [ ] Form validation with clear errors
- [ ] Loading states for async operations
- [ ] Empty states for lists with no content

### Performance
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] No layout shift on load
- [ ] Images lazy-loaded

---

*This spec is generated and maintained by Hermes Agent. Update when design decisions change.*