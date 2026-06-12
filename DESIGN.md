---
version: alpha
name: UpahJe.my
description: Malaysia's local hiring platform — post a job, compare verified workers, and pay safely after the work is done. Browse categories from home services to creative work.
colors:
  primary: "#166345"
  primary-hover: "#0d3b18"
  primary-neutral: "#2d8f5e"
  primary-pale: "#e8f5e0"
  green-deep: "#0a2a12"
  green-forest: "#0d3b18"
  green-mid: "#166345"
  green-soft: "#e8f5e0"
  teal-deep: "#0f766e"
  teal-mid: "#14b8a6"
  teal-soft: "#ccfbf1"
  teal-pale: "#f0fdfa"
  amber-deep: "#b45309"
  amber-mid: "#f59e0b"
  amber-soft: "#fef3c7"
  canvas: "#ffffff"
  canvas-soft: "#f9f9f9"
  canvas-warm: "#f5f3ee"
  ink: "#0e0f0c"
  ink-deep: "#0a2a12"
  body: "#454745"
  mute: "#868685"
  positive: "#2ead4b"
  positive-deep: "#166345"
  warning: "#ffd11a"
  warning-deep: "#b86700"
  negative: "#d03238"
  negative-deep: "#a72027"
typography:
  display-font: Sora
  body-font: DM Sans
  display-mega:
    fontFamily: Sora
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: "1.05"
    letterSpacing: "-0.03em"
  display-xl:
    fontFamily: Sora
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  display-lg:
    fontFamily: Sora
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 600
    lineHeight: "1.2"
    letterSpacing: "-0.02em"
  display-md:
    fontFamily: Sora
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: "1.1"
    letterSpacing: "-0.01em"
  display-sm:
    fontFamily: Sora
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.2"
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: DM Sans
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body-sm:
    fontFamily: DM Sans
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  section-label:
    fontFamily: DM Sans
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.08em"
    textTransform: uppercase
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.1)"
    textColor: "{colors.ink}"
    border: "1.5px solid {colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card-content:
    backgroundColor: "{colors.canvas}"
    border: "1px solid rgba(14, 15, 12, 0.06)"
    rounded: "{rounded.lg}"
    padding: "24px"
  nav-bar:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.canvas}"
    position: "sticky top-0"
  hero-band-green:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.canvas}"
    padding: "80px 24px"
---

## Overview

UpahJe.my is Malaysia's local hiring platform. The brand identity is professional and trustworthy — using a deep forest green as the primary color, with teal and amber as supporting accents. The aesthetic emphasises generous whitespace, rounded UI elements, and clear typographic hierarchy.

**Key Characteristics:**
- Deep green primary `{colors.green-mid}` (`#166345`) — the brand's universal action color. Conveys trust, money, and Malaysian identity.
- Two-font system: **Sora** (geometric, modern) for display headings, **DM Sans** (friendly, readable) for body text.
- `{rounded.lg}` 16px is the canonical card radius. Buttons use `{rounded.md}` 12px. Full-round pills for badges.
- Near-white canvas `{colors.canvas-soft}` (`#f9f9f9`) as page background; pure white `{colors.canvas}` for cards.
- Teal accent for trust signals (verified badges, security). Amber accent for availability/urgency indicators.

## Colors

### Brand Green
- **Green Mid** (`{colors.green-mid}` — `#166345`): Primary CTA, nav buttons, step indicators.
- **Green Deep** (`{colors.green-deep}` — `#0a2a12`): Navigation bar, footer, dark hero bands.
- **Green Forest** (`{colors.green-forest}` — `#0d3b18`): Hover state for primary buttons.
- **Green Soft** (`{colors.green-soft}` — `#e8f5e0`): Soft backgrounds, category pill hover.
- **Primary Pale** (`{colors.primary-pale}` — `#e8f5e0`): Badge backgrounds, positive indicators.

### Teal (Trust & Verification)
- **Teal Deep** (`#0f766e`): Verified badge text, rate labels.
- **Teal Mid** (`#14b8a6`): Availability dots, stat gradients.
- **Teal Soft** (`#ccfbf1`): Badge backgrounds for verified/teal state.

### Amber (Energy & Urgency)
- **Amber Deep** (`#b45309`): Urgent labels.
- **Amber Mid** (`#f59e0b`): Availability dots for limited slots.
- **Amber Soft** (`#fef3c7`): Badge backgrounds for amber state.

### Surface
- **Canvas** (`#ffffff`): Card interiors, inputs.
- **Canvas Soft** (`#f9f9f9`): Page background, section alternation.
- **Canvas Warm** (`#f5f3ee`): Optional warm tint for featured sections.

### Text
- **Ink** (`#0e0f0c`): Primary headings and text.
- **Ink Deep** (`#0a2a12`): Text on green surfaces.
- **Body** (`#454745`): Secondary body text, descriptions.
- **Mute** (`#868685`): Captions, timestamps, placeholder text.

### Semantic
- **Positive** (`#2ead4b`): Success state.
- **Warning** (`#ffd11a`): Caution.
- **Negative** (`#d03238`): Error, destructive actions.

## Typography

### Font Families
- **Sora** — Display and headings. Geometric sans-serif with modern character. Loaded via `next/font/google` as `--font-sora`.
- **DM Sans** — Body text and UI. Friendly, highly readable. Loaded via `next/font/google` as `--font-dm-sans`.

### Hierarchy (CSS utility classes)
| Class | Size | Weight | Use |
|---|---|---|---|
| `.font-display-mega` | clamp(2.5rem, 6vw, 4.5rem) | 700 | Hero headlines |
| `.font-display-xl` | clamp(2rem, 4vw, 3rem) | 700 | Section headlines |
| `.font-display-lg` | clamp(1.5rem, 3vw, 2rem) | 600 | Sub-section headers |
| `.font-display-md` | 1.5rem | 700 | Card headlines |
| `.font-display-sm` | 1.25rem | 600 | Small section heads |
| `.section-label` | 0.75rem | 600 | Uppercase overline labels |

### Principles
- Display headings always use Sora, weight 600–700. Never lighter.
- Body text uses DM Sans. Clean and readable at all sizes.
- Responsive typography uses `clamp()` for fluid scaling.

## Layout

### Navigation
- Sticky top nav with dark green background (`--color-green-deep`).
- White logo text + translucent nav links that brighten on hover.
- Desktop: centered search bar, category links, auth buttons.
- Mobile: hamburger menu with full-width drawer.

### Hero
- Hero section uses `canvas-soft` background with subtle gradient mesh overlays.
- Rotating word ticker ("Nak Kahwin? / Paip Tersumbat? / Shoot Produk?") in Sora bold.
- Full-width search input with inline submit button.
- Popular category chips below search.
- Dual CTA: "Cari Servis" (primary green pill) + "Jadi Freelancer" (outline pill).

### Section Pattern
Sections alternate backgrounds: `canvas-soft` → `canvas` → `canvas-soft` to create visual rhythm. Each section uses:
- `.section-label` overline (uppercase, green-mid color)
- `.font-display-xl` headline
- Content grid below

### Responsive Strategy
| Breakpoint | Changes |
|---|---|
| Mobile (<768px) | Single column, stacked hero, search full-width |
| Tablet (768–1023px) | 2-column grids |
| Desktop (≥1024px) | 3–4 column grids, side-by-side hero |

## Components

### Buttons
- **Primary**: `bg-green-mid`, text `ink-deep`, 12px radius, hover lifts + shadow.
- **Secondary**: transparent + 1.5px border, hover fills soft.
- **Secondary Inverse**: for dark backgrounds, white border + text.
- **Full-round CTA**: `rounded-full` pills for hero CTAs.

### Cards
- White background, 1px border `rgba(14,15,12,0.06)`, 16px radius.
- Hover: lift `-translate-y-0.5` + shadow.
- Category cards: centered emoji + problem phrase + talent count badge.
- Talent cards: avatar, name, verified badge, location, rate, availability, rating.

### Badges
- `.badge-positive`: pale green bg, deep green text, pill shape.
- `.badge-verified`: teal soft bg, teal deep text.
- `.badge-amber`: amber soft bg, amber deep text.

### Stats Bar
- Gradient text numbers (green-mid → teal-mid).
- Sora font for stat values.
- Small muted labels below.

### Testimonial Cards
- White cards with subtle border, emoji avatar, quote, attribution.
- Hover lift effect matching content cards.

## Motion

### Approach
Uses `motion/react` (Framer Motion) for scroll-triggered reveals:
- **FadeUp**: Elements fade in + translate up on viewport entry. Default 24px distance, 0.5s duration.
- **StaggerContainer/StaggerItem**: Children stagger in with 60ms delay between each. 20px translateY, 0.4s duration.
- **NakWordTicker**: Vertical text rotation in hero, 2.8s interval.

### Intro Animation
- Logo video plays once per session (2.8s).
- Page content hidden via `data-intro` attribute until animation completes.
- Subsequent visits skip animation (sessionStorage flag).

## Do's and Don'ts

### Do
- Use `green-mid` (#166345) for primary CTAs and interactive elements.
- Use Sora for display headings, DM Sans for everything else.
- Alternate section backgrounds (`canvas-soft` ↔ `canvas`) for visual rhythm.
- Keep cards at 16px radius, buttons at 12px radius.
- Use teal for trust/verification signals, amber for urgency.
- Use CSS custom properties (`var(--color-*)`) for runtime theming consistency.

### Don't
- Don't use the brand green as a success indicator — use `positive` green (#2ead4b) instead.
- Don't set display headings lighter than weight 600.
- Don't introduce additional accent colors beyond the green/teal/amber palette.
- Don't use sharp corners — minimum radius is 8px (`rounded-sm`).
- Don't mix dark text on dark green backgrounds — always use white/canvas text on dark surfaces.
