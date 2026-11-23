# Rebuild: editorial publication

Owner: Chief, with Patch on engineering and SEO Publisher on content. Decision
taken by the user on 2026-11-23: full editorial rebuild, not an incremental
restyle.

## What is being built

A Malaysian knowledge publication: six pillars, a structured content model in
Postgres, an editorial CMS, a homepage that behaves like a front page, article
pages built for reading, topic pages, search, collections, newsletter.

## Invariants (nothing below may break these)

1. **URLs stay.** Every live `/en/articles/<slug>` and `/ms/articles/<slug>`
   keeps working. If a slug must change, a 301 is added in the same commit.
2. **Content survives.** Article count, titles, dates and sources migrate
   one-for-one. A migration that loses a paragraph is a failed migration.
3. **Crawl surface stays.** `sitemap.xml`, `llms.txt`, `llms-full.txt`, both RSS
   feeds, `robots.txt` and hreflang keep working at every phase.
4. **Git stays the source of truth until the CMS proves itself.** Markdown
   remains canonical through phase 3; the database is a mirror until phase 4,
   and the importer stays runnable so a rollback is one command.
5. **Core Web Vitals do not regress.** LCP under 1.2 s, CLS 0, INP under 50 ms on
   the machine baseline before any phase is signed off.

## Phases and gates

### Phase 1 — Foundation (no visible change)
- Design tokens: forest `#25382B` ink, paper `#F6F6F0` canvas, lime `#A5D96A` as
  an accent only (never text on paper), existing `#1a6b2e` for links.
- Type: Inter for body, one display sans for headings, one serif for feature
  headlines. No more than three families.
- Content model: `articles`, `article_translations`, `categories`, `authors`,
  `collections`, `article_sources`, `article_figures` in Postgres.
- Importer from markdown; parity report counts every article, paragraph and
  source.
- **Gate:** importer reports 0 missing, tokens merged, no route touched.

### Phase 2 — Core experience
- Homepage: editorial introduction, one featured story, topic explorer, latest,
  collections teaser.
- Article page: header, reading measure ~700px, sticky TOC, progress, takeaway
  block, callouts, checklist, sources, related, author card, newsletter slot.
- Topic pages: introduction, featured, latest, guides, search within topic.
- **Gate:** every live URL 200, sitemap count unchanged, an article reads better
  than the current page on a phone, no layout shift.

### Phase 3 — Discovery
- Postgres full-text search with suggestions, highlighted excerpts, language
  aware, zero-result handling.
- Related articles from shared topics and sources.
- Collections (curated paths) and author pages.
- **Gate:** search returns the right article for 20 hand-written queries, and
  every collection page links only to live articles.

### Phase 4 — Editorial infrastructure
- CMS: create, edit, drafts, review, schedule, preview, SEO fields, image
  upload, translation linking, collections management.
- Source-of-truth flip: database becomes canonical, markdown export retained.
- **Gate:** publish one article end to end through the CMS, then roll back by
  re-running the exporter, and prove both directions work.

### Phase 5 — Growth
- Newsletter capture and send, analytics beyond pageviews, downloadable
  resources, sponsored-slot rules with disclosure.
- **Gate:** one send, one opt-out, one measurement of article engagement.

## Superseded: the Postgres content model is deferred

This plan was written before the marketplace half of the site was deleted, when
Prisma and Supabase were still in the tree. The user approved removing them on
2026-11-23, so the phase 1 database work is withdrawn:

- **Markdown stays canonical.** Content lives in `content/articles/`, the loader
  in `lib/articles.mjs` stays the reader, and git stays the history.
- **No Prisma, no Supabase, no editorial tables** until there is a CMS that a
  non-technical editor actually uses. At that point the schema is a new decision,
  not a resurrection of this one.
- The pillar and type mapping lives in `data/pillars.json` and is applied at
  render time. Phase 8 extends frontmatter with optional `featured`, `cover`,
  `coverAlt`, `coverCredit`, `type` only.
- The authoritative implementation document is
  `docs/specs/editorial-redesign.md`; where this file and that one disagree, the
  spec wins.

## Taxonomy

Six pillars: Business, Finance, Technology, Automation & AI, Marketing,
Operations. Two of them have no articles today. They exist in the model from
phase 1 and stay hidden in navigation and sitemap until each has three live
pieces — an empty pillar is worse than a missing one.

Existing categories map in, and every article keeps its current canonical URL.

## What we deliberately will not do

- No six-pillar navigation with empty sections.
- No CMS before the importer proves parity.
- No slug changes without a 301.
- No gradient heroes, glass cards, or stock imagery for a publication with
  figures we authored ourselves.
