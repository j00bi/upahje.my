# Articles — authoring and publishing

The site is a bilingual knowledge site. Every published page is a Markdown file
with frontmatter; there is no CMS and no database table.

## Where files live

    content/articles/en/<slug>.md     English
    content/articles/ms/<slug>.md     Bahasa Melayu

Both are read by `lib/articles.mjs`; the language comes from the folder. Write
one file per language — never machine-translate at render time. A pair is linked
by the same `translationKey`. If only one language exists, that page publishes
alone and gets no `hreflang` sibling.

`content/fixtures/` holds test articles (`npm run articles:check -- --fixtures`
and the fixture build); it is never served.

## Frontmatter (required unless marked)

```yaml
---
title: "Question-shaped title"
description: "One sentence a search engine can quote."
slug: what-is-freelance-work
translationKey: what-is-freelance-work   # same in both language files
date: 2026-11-19
updated: 2026-11-19
author: "Full name or desk name"
category: definitions                     # definitions | buying-guides | side-income
tags: [definitions, malaysia]
canonical: https://upahje.my/en/articles/what-is-freelance-work  # must match the route
draft: false
sources:                                  # optional but expected
  - title: "Source name"
    url: "https://example.gov.my/"
    checked: 2026-11-19                   # ISO date you actually checked it
---
```

`draft: true` means: not linked, not rendered in production, not in the sitemap,
not in `llms.txt`, not in the RSS feed. It still renders in `next dev` so you can
read it.

## Canonical

The route is the canonical URL: `/en/articles/<slug>` and `/ms/articles/<slug>`
are always emitted as canonical, and `hreflang` is added only when both language
files are published. The frontmatter `canonical` is kept for reference and must
match the route; the build does not trust it, so a stale value cannot de-index a
page.

## Body

- Markdown only. **No MDX components** — the renderer (`lib/markdown.tsx`) is a
  small subset with no runtime.
- One `# H1` matching `title` at the top (the page renders the title itself and
  drops the duplicate).
- Question-shaped `##` headings.
- At least one ordered step list (`1.` `2.`) or a pipe table. GFM tables are
  supported: header row, `|---|` separator, body rows. Cells take the same inline
  Markdown as paragraphs.
- A cost / "what it takes" section.
- Figures: one block of its own, never inside a paragraph.

  ```markdown
  ![Your store sends an order to the API, the API passes it to the courier, and the delivery status comes back the same way](/figures/what-is-an-api.svg)
  *Optional italic caption line, which must not repeat the alt text.*
  ```

  SVG only, under `public/figures/`. The renderer reads the SVG's own
  width/height, so the `<img>` ships with intrinsic dimensions (no layout shift),
  `loading="lazy"`, and a `<figcaption>` from the italic line. The source stays
  in `figures/` (Mermaid) or `assets/diagram-sources/` (authored), never in
  `public/`.

  ### Mermaid sources

  Diagrams that suit Mermaid are text-defined in `figures/<slug>.mmd` and
  rendered manually:

  ```bash
  node scripts/build-figures.mjs           # changed sources only
  node scripts/build-figures.mjs --force   # all of them
  ```

  It writes `public/figures/<slug>.svg`; commit the SVG. It is **not** part of
  the Vercel build, because the build must not depend on Puppeteer. Set
  `PUPPETEER_EXECUTABLE_PATH` if Chromium is not at `/usr/bin/chromium`.

  Rules for a figure: one per article, never reused; a declared aspect ratio
  with `<title>`/`<desc>`; if the rendered shape is flatter than about 4:1 it is
  a ribbon, so re-author it; type must land at 14px or larger at 640px wide;
  each arrow gets exactly one label and the directions must differ (solid
  forward, dashed return). No inline `<svg>` in article Markdown and nothing
  that draws in a shared layout.

  An authored SVG is allowed when Mermaid provably cannot hold the shape (the
  API article's three-step flow with a return path renders as a 10:1 ribbon in
  Mermaid). It still goes through the image line and `<figure>` branch, and a
  translated language needs its own SVG rather than an English-labelled one.
- An FAQ at the end, in exactly this shape, so the FAQPage JSON-LD can be
  generated from the visible copy:

```markdown
## FAQ

### Is this the question?

A short answer, one or two sentences.
```

3–5 questions. `## FAQ` (or "Frequently asked questions") is the marker; each
`###` becomes a `Question` in the JSON-LD. Do not hand-write FAQ schema.
- Internal links must include the language prefix: `/en/articles/<slug>` in the
  English file, `/ms/articles/<slug>` in the Malay one. Link only published
  articles and the category page.

## Publishing checks

```bash
node scripts/check-articles.mjs            # validates content/articles
node scripts/check-articles.mjs --fixtures # validates the fixtures
NODE_ENV=production npm run build          # production build (see note)
```

`prebuild` regenerates `public/llms.txt` from the content, so the file cannot
drift from what is published. Sitemap, RSS and `llms.txt` all read the same
loader and exclude drafts.

## Known limitation: `<html lang>`

Next requires `<html>` in the root layout, which has no language parameter, so
`<html lang="en">` is fixed for now. Each language route sets `lang` on a wrapper
`div` and emits correct `hreflang` + canonical per page. Fixing `<html lang>`
properly means multiple root layouts (moving every route into a group) — do not
"fix" it by moving routes without checking the marketplace surface first.

## Malay register lint

`npm run articles:check` lints every `content/articles/ms/**` file for
Indonesian-leaning forms before the build: `bisa`, `uang`, `gratis`, `kantor`,
`perusahaan`, `manajemen`, `karyawan`, `daring`, `luring`, `unduh`, `unggah`,
`ponsel`, `gawai` (device usage), `izin`, `karena`, `aktifitas`, `kualitas`,
`universitas`, `realitas`, `manapun`, `kapanpun`, `siapapun`, the relative
pronoun `yang mana`, and `adalah merupakan`.

Each hit prints `file:line: "word" -> "suggested"` and the command exits
non-zero. The list lives in `tools/ms-lint-words.mjs`; grow that file, not the
checker. A word that is correct in a specific line can be escaped inline:

```markdown
Pesta Gawai is a festival. <!-- ms-lint: allow -->
```

`sudah` and `sedang` are correct BM and are never flagged. The command:

```bash
npm run articles:check            # content/articles
npm run articles:check -- --fixtures
```

## Deployment identity (Vercel blocks unknown committers)

Vercel only deploys commits authored by a verified identity on the project. A
commit authored as an agent identity (`SEO Publisher <seo@local>`, etc.) fails
with **"Deployment was blocked"** — and nothing visible breaks: the site just
serves the previous build while the GitHub branch looks updated.

- Commit with the repo identity (`Ahmad Husni <husnisarafi17@gmail.com>`, the
  repo's configured `user.name`/`user.email`), not an agent label.
- After a push, confirm the deployment actually ran:

  ```bash
  gh api repos/j00bi/upahje.my/commits/<sha>/statuses \
    --jq '.[] | [.context,.state,.target_url] | @tsv'
  ```

  `state: failure` with "Deployment was blocked" means the identity, not the code.

## `llms.txt` on deploy

Vercel uses the `buildCommand` from `vercel.json`, which does **not** run the
package.json `prebuild` hook. The generation therefore lives in the build command
itself:

```
prisma generate && node scripts/generate-llms.mjs && next build
```

Keep both in sync if the build command ever changes; `npm run articles:llms`
regenerates the file locally.

## Build environment trap

This repo has been built from a shell that exports `NODE_ENV=development`, which
makes `next build` fail on `main` before any content changes
(`<Html> outside pages/_document`, `useContext` null). Always build with:

```bash
NODE_ENV=production npm run build
```

See also `DEPLOYMENT.md`.

## Read-next block

Every published article ends its body with a read-next block, placed **before**
`## FAQ`, separated from the FAQ heading. The words are content, not chrome, so
they follow the reader's point of view:

- Up to two links. One is fine.
- Each label is a complete noun phrase or a question a reader would ask, in
  sentence case, with no trailing period: `What an API costs to wire up in
  Malaysia`, `Do you need an API, or just a spreadsheet?`
- No internal vocabulary. Never `pillar`, `category`, `section`, a URL slug, or
  a repeated `Read more about…` preamble.
- Both links point at published siblings in the same language. Never the same
  article, never the other language.
- A category link may stay, last, labelled by subject: `More on APIs and models`.
- The same label must not point at two different targets. Two articles may share
  a label only when they share the target.

Write the block as a short label line, then each link on its own line. Do not
write it as one sentence: the renderer turns a paragraph into anchors, so a
comma-separated run of links becomes a run-on of plain text.

## Rendering figures

Figure sources live in `figures/<slug>.mmd` and render to `public/figures/<slug>.svg`:

```bash
NPM_CONFIG_CACHE=$PWD/../.npm-cache \
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
npx -y @mermaid-js/mermaid-cli -i figures/<slug>.mmd -o public/figures/<slug>.svg -b transparent
```

The `NPM_CONFIG_CACHE` override is not optional on this machine: npm's default
cache is outside the writable workspace, so the render fails with `EROFS`
before mermaid runs. Mermaid's front-matter `title` does not survive into the
SVG (`<title>`/`<desc>` come out empty), so the description belongs in the
markdown alt text, which the renderer emits on the `<img>`.
