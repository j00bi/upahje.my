# Redesign audit

Phase 0 of `docs/specs/editorial-redesign.md`. Read against `main` on 2026-11-23.
Nothing here changes code; it records what exists so the redesign works with it
rather than replacing it.

## What the site is today

A Next.js App Router site (14.2.3) that began as a freelance marketplace and is
now a content publication built on top of it. The publication half is clean and
static; the marketplace half still builds, still ships dependencies, and is
unlinked and `noindex`.

## Route inventory

**Publication (keep, redesign):**
- `/[lang]` — hub with concept index and category groups
- `/[lang]/articles` — archive with pagination (`/page/[n]`)
- `/[lang]/articles/[slug]` — article
- `/[lang]/articles/category/[category]` — category listing
- `/[lang]/repos`, `/[lang]/repos/[topic]` — repo directory (3 topics, 46 entries)
- `/[lang]/resources` — library (21 entries)
- `robots.txt`, `sitemap.xml`, `feed.xml`, `ms/feed.xml`, `llms.txt`, `llms-full.txt`, `og.png`
- `privacy`, `terms`

**Marketplace legacy (unlinked, noindexed, still built):** `/jobs`, `/jobs/[jobId]`,
`/jobs/[jobId]/matches`, `/jobs/post`, `/talent`, `/talent/[slug]`, `/categories`,
`/categories/[slug]`, `/portfolio/[slug]`, `/pay/[jobId]`, `/payment/status`,
`/auth/*`, `/(app)/dashboard/*`, `/(onboarding)/*`, `/ai/*`.

Those routes are why the dependency list carries Prisma, Supabase, Billplz and
Zustand, and why a production build prints a `Dynamic server usage` warning for
`/api/auth/me`. They are dead weight for a publication and the largest
architectural risk in this redesign: every build compiles pages nobody can reach.

## Content

- 36 Markdown files in `content/articles/{en,ms}` = 18 pairs; 17 published pairs
  (one pair still `draft: true`).
- Frontmatter: title, description, slug, translationKey, date, updated, author,
  category, tags, canonical, draft, sources[].
- Categories in use: `definitions` (6), `buying-guides` (11), `side-income` (1).
- Figures: 8 hand-authored SVGs in `public/figures`, each used by exactly one
  article or pair.
- No hero images, no author photos, no article covers. Every image is a figure or
  the single site-wide `og.png`.

## Components

Publication: `TopBar`, `Footer`, `ArticleCard`, `ArticleToc`, `CategoryNav` (two
copies, `articles/` and `navigation/`), `FaqList`, `Pagination`,
`LanguageSwitch`, plus `motion/FadeUp` and `motion/Stagger`.

Marketplace: jobs, auth, onboarding and dashboard components — roughly 20 files
that no publication page imports.

Duplication worth fixing during the shell phase: the two `CategoryNav`s, and
`NavBar` versus `TopBar` (only `TopBar` is used by publication pages).

## Styling

- Tailwind with a hand-written token layer in `app/globals.css`
  (`--ui-canvas #fbfaf7`, `--ui-ink #14160f`, `--ui-body #3f423c`,
  `--ui-muted #63665e`, `--ui-accent #1a6b2e`, `--ui-rule`, `--ui-font`).
- One family loaded: Inter. No display face, no serif.
- Type scale in utility classes (`text-[13px]`, `text-[17px]`, `text-[21px]`,
  `md:text-[36px]`) rather than named steps, so headings and card titles sit
  within a few pixels of each other.
- Light only, by decision. No toggle, no `prefers-color-scheme`.

## SEO and machine surfaces (all working, must survive)

Canonical per page and per language; hreflang `en-MY`/`ms-MY`/`x-default`;
`Article`, `FAQPage` and `DefinedTerm` JSON-LD; sitemap (54 URLs); `llms.txt`
(40 links) and `llms-full.txt`; two RSS feeds; `og:image` on every page; robots
allowing GPTBot, ClaudeBot, PerplexityBot and disallowing the marketplace paths.

## Validation and CI

`articles:check` (frontmatter, Malay register lint, PII), `verify:content`
(sweeps every sitemap URL), `test:faq-boundary` (fixture build), `prebuild`
(llms, llms-full, feeds), GitHub Actions for the fixture test and IndexNow.

## Gaps against the specification

| Spec requirement | Today | Phase |
|---|---|---|
| Search | absent | 6 |
| Sticky TOC + progress + share/copy | TOC exists, no progress or share | 5 |
| Takeaway / callout / checklist blocks | absent in the renderer | 5 |
| Featured article metadata | absent in frontmatter | 8 |
| Cover images and attribution | absent | 8 |
| Author pages | absent | 5 |
| Collections | absent | 4 |
| Newsletter | absent, no integration | 3 (only with a working integration) |
| Display + serif typography | Inter only | 1 |
| Design tokens as named scale | partially, ad hoc utilities | 1 |
| Empty-state copy | thin | 4 |
| Mobile nav | `<details>` sheet, works | 2 |

## Risks

1. **Legacy routes dominate the build.** Removing them is the highest-value
   engineering change and needs the user's approval; it is not in the spec's
   phases, so it is listed here rather than assumed.
2. **Type scale is ad hoc.** Changing it touches nearly every component at once;
   it must land before the shell and homepage phases, not during them.
3. **No content model in code.** Articles are files; frontmatter has no `type`,
   `featured`, `cover` or `author` entity. Phase 8 must extend, not replace, and
   the loader must stay backward compatible.
4. **Bilingual parity is manual.** 18 files each side, matched by
   `translationKey`; nothing enforces it. Validation should.
5. **One OG image for the whole site.** Acceptable now, weak when articles are
   shared; per-article images are a Phase 9 opportunity.

## Recommended order (matches the spec, with one addition)

1. Design system (Phase 1) — tokens and type first, no route changes.
2. Shared shell (Phase 2) — header, nav, mobile, footer, search entry.
3. Homepage (Phase 3) — featured, latest, topics.
4. Article experience (Phase 5) — TOC, progress, share, related.
5. Archive and topic pages (Phase 4).
6. Search (Phase 6).
7. Bilingual/SEO checks (Phases 7, 9), then performance and QA (10, 11).

Addition: decide the legacy-route question before Phase 2, because the shell is
the first thing that could quietly inherit their styling.
