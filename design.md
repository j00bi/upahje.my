# UpahJe.my Design System

## Overview

UpahJe.my — Malaysian creative talent marketplace. Dark-themed, neutral palette with zinc tones, category-first navigation, Behance-inspired portfolio showcase.

**Key Characteristics:**
- Dark zinc canvas background with neutral white/slate accents
- Category navigation as primary discovery UX
- Behance-style portfolio grid with masonry layout
- Neutral tones — no brand color commitment, lets talent content shine
- Clean, professional, modern freelance marketplace feel

---

## Colors

### Brand & Accent
- **Primary** (`--color-primary`): `#ffffff` — white CTAs, active states
- **Primary Hover** (`--color-primary-hover`): `#f0f0f0` — button hover state

### Backgrounds
- **Canvas** (`--color-canvas`): `#09090b` — near-black page background (zinc-950)
- **Surface** (`--color-surface`): `#18181b` — card backgrounds (zinc-900)
- **Surface Hover** (`--color-surface-hover`): `#27272a` — elevated surface (zinc-800)
- **Border** (`--color-border`): `#3f3f46` — zinc-700 borders

### Text
- **Ink** (`--color-ink`): `#fafafa` — primary text (zinc-50)
- **Body** (`--color-body`): `#a1a1aa` — secondary text (zinc-400)
- **Mute** (`--color-mute`): `#71717a` — captions, fine print (zinc-500)

### Semantic
- **Success**: `#22c55e` (green-500)
- **Warning**: `#eab308` (yellow-500)
- **Error**: `#ef4444` (red-500)

---

## Typography

### Font Family
- **Display/Headings**: `Inter` — geometric sans, weight 700/600
- **Body**: `Inter` — weight 400/500
- Fallback: `system-ui, -apple-system, sans-serif`

### Scale (Tailwind defaults)
| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `display-mega` | 4xl-6xl | 700 | Hero headlines |
| `display-xl` | 3xl-4xl | 700 | Section headings |
| `display-lg` | 2xl-3xl | 600 | Card headlines |
| `body-lg` | lg (18px) | 400 | Lead paragraphs |
| `body-md` | base (16px) | 400 | Default body |
| `body-sm` | sm (14px) | 400 | Secondary body |
| `caption` | xs (12px) | 400 | Fine print |

---

## Layout

### Container
- Max width: 1280px (max-w-7xl)
- Section padding: 80px vertical (py-20)
- Card padding: 24px (p-6)

### Grid
- Portfolio: Masonry-style CSS columns (1 col mobile, 2 col tablet, 3 col desktop)
- Category cards: 2-3 col grid
- Feature grids: 2-up / 3-up responsive

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | < 640px | 1 col, stacked nav |
| Tablet | 640-1023px | 2 col grids |
| Desktop | ≥ 1024px | Full layout |

---

## Components

### Navigation

**`nav-bar`** — Sticky top navigation
- Background: `#09090b` with `backdrop-blur`
- Height: 64px
- Logo: Text-based "UpahJe.my"
- Links: Category nav items + Sign In + Sign Up CTA

**`category-nav`** — Horizontal category pills
- Active: white background, black text
- Inactive: zinc-800 background, zinc-400 text
- Hover: zinc-700 background

**`nav-cta`** — Primary button
- Background: white, text: black
- Hover: zinc-200
- Padding: 8px 16px
- Border radius: 8px

### Cards

**`card-surface`** — Default card
- Background: zinc-900
- Border: 1px zinc-800
- Border radius: 12px
- Padding: 24px

**`card-elevated`** — Hover state
- Background: zinc-800
- Transform: translateY(-2px)

**`project-card`** — Portfolio item
- Cover image with aspect ratio
- Hover overlay with title + author
- Like button top-right
- Border radius: 12px

### Buttons

**`btn-primary`** — White CTA
```
bg-white text-black hover:bg-zinc-200
px-4 py-2 rounded-lg
```

**`btn-secondary`** — Outline
```
bg-transparent border border-zinc-700 text-zinc-300
hover:bg-zinc-800 hover:text-white
px-4 py-2 rounded-lg
```

**`btn-ghost`** — Text-only
```
bg-transparent text-zinc-400
hover:text-white hover:bg-zinc-800
px-4 py-2
```

### Portfolio

**`portfolio-grid`** — Masonry columns
- CSS columns for natural flow
- Gap: 24px
- Filter tabs above

**`filter-tab`** — Category filter
- Active: bg-white text-black
- Inactive: bg-zinc-800 text-zinc-400

**`lightbox`** — Full-screen image viewer
- Black overlay (opacity 95%)
- Navigation arrows
- Keyboard support (Esc, arrows)
- Close button top-right

### Forms

**`text-input`** — Form inputs
```
bg-zinc-900 border border-zinc-700
text-white placeholder:text-zinc-500
focus:border-white focus:ring-1 focus:ring-white
rounded-lg px-4 py-2
```

---

## Do's and Don'ts

### Do
- Use white for primary CTAs — high contrast on dark canvas
- Use zinc scale for surface hierarchy (900 → 800 → 700)
- Keep portfolio content as the visual focus — neutral chrome
- Use Inter font family throughout
- Maintain consistent 12px border radius on cards

### Don't
- Don't introduce colored brand accents — neutral palette lets talent work shine
- Don't use orange, amber, or vivid colors — we've removed these
- Don't use rounded-full on cards (reserved for pills/avatars only)
- Don't overcrowd — generous whitespace is part of the premium feel

---

## Categories

1. **Photography** — `/categories/photography`
2. **Videography** — `/categories/videography`
3. **Content Creator** — `/categories/content-creator`
4. **Photo Editor** — `/categories/photo-editor`
5. **Graphic Design** — `/categories/graphic-design`
6. **Makeup Artist** — `/categories/makeup-artist`
7. **Wedding Planner** — `/categories/wedding-planner`
