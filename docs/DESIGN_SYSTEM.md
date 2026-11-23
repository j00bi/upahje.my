# Design system

Phase 1 of the editorial rebuild. Tokens live in `app/globals.css` under
`:root`; the three typefaces are loaded by `next/font` in `app/layout.tsx`.
Nothing here changes a route or a URL.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--ui-paper` / `--ui-canvas` | `#FAF9F5` | page canvas |
| `--ui-white` / `--ui-surface` | `#FFFFFF` | raised surfaces, cards |
| `--ui-forest` | `#25382B` | structural ink: rules, dark blocks |
| `--ui-ink` | `#242824` | headings and primary text |
| `--ui-body` | `#3F443B` | body copy |
| `--ui-muted` | `#6C7468` | metadata, secondary text |
| `--ui-rule` | `rgba(37,56,43,0.14)` | hairlines only |
| `--ui-accent` | `#1A6B2E` | links and interactive text |
| `--ui-lime` | `#9FE870` | accent rule, highlight background |

Measured contrast on paper (`#FAF9F5`): ink 14.2:1, forest 11.9:1, body 9.5:1,
accent 6.3:1, muted 4.6:1. White on forest is 12.5:1.

**Deviation from the spec palette, deliberate:** muted is `#6C7468`, not
`#777F73`. `#777F73` measures 3.93:1 on paper and 4.14:1 on white, below the
4.5:1 needed by the 13px metadata it is used for. `#6C7468` is the closest
warmer tone that passes (4.6:1 / 4.84:1).

**Lime is never text.** `#9FE870` on paper is 1.4:1. It is allowed as a rule or
as a highlight background behind ink text, and nowhere else.

## Type

Three families, no more: Inter (body and UI), Archivo (display and headings),
Newsreader (serif, selected display headlines only). All are self-hosted by
`next/font`; there is no runtime request to a font CDN and no layout shift.

| Token | Size | Use |
| --- | --- | --- |
| `--text-display` | 40 to 64px clamp | homepage and feature headlines |
| `--text-h1` | 32 to 44px clamp | page and article titles |
| `--text-h2` | 28px | section headings |
| `--text-h3` | 20px | sub-headings |
| `--text-h4` | 17px | card titles |
| `--text-body` | 17px | body copy |
| `--text-small` | 13px | metadata, captions |
| `--text-label` | 11px | labels only, with `--tracking-label` |

Components use `.type-display`, `.type-h1`, `.type-h2`, `.type-h3`,
`.type-body`, `.type-small`, `.type-label`, `.type-serif`. New work does not
use raw `text-[21px]` style utilities; existing components are migrated as each
phase touches them, and those utilities are not added to.

## Spacing, containers, measure

- One 4px scale: `--space-1` (4px) through `--space-16` (96px).
- Reading measure `--measure: 44rem` (704px), narrow `40rem` (640px).
- Content width `--container: 78rem` (1248px), gutters `--gutter`
  (`clamp(1rem, 4vw, 2rem)`).
- Utilities: `.container-editorial`, `.measure`, `.measure-narrow`.

## Focus and motion

- Focus is a 2px `--ui-accent` outline with 2px offset, on every interactive
  element (`:focus-visible`).
- Motion is limited to hover and focus transitions (150 to 200ms,
  `--ui-ease`) and the TOC entrance, which is CSS-only so it survives with
  JavaScript off. Everything collapses under `prefers-reduced-motion: reduce`.

## Rules

- Use the token names. A raw hex value or a raw pixel font size in a component
  is a defect in new work.
- Lime as text, lime behind small text, or lime as a large fill is forbidden.
- Three families is the ceiling. Do not add a fourth for one screen.
- The reading measure is 680 to 740px. Full-width text is a defect.
- `--ui-*` remains the variable surface: other pages that were not part of this
  phase keep working unchanged.
