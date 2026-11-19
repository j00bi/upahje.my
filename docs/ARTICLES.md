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
- At least one ordered step list (`1.` `2.`). **Tables are not supported yet** —
  use an ordered list.
- A cost / "what it takes" section.
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

## Build environment trap

This repo has been built from a shell that exports `NODE_ENV=development`, which
makes `next build` fail on `main` before any content changes
(`<Html> outside pages/_document`, `useContext` null). Always build with:

```bash
NODE_ENV=production npm run build
```

See also `DEPLOYMENT.md`.
