# Content model

What an article is, as it exists in `content/articles/` today, and what the redesign may add on top. This documents the current contract; it does not change any article. If a rule here and the loader disagree, the loader wins and this file is wrong.

Sources of truth: `lib/articles.mjs` (loading and validation), `docs/ARTICLES.md` (authoring rules), `docs/specs/editorial-redesign.md` phase 8 (the optional extension).

## Where content lives

```
content/articles/en/<slug>.md     English
content/articles/ms/<slug>.md     Bahasa Melayu
figures/<slug>.mmd                Mermaid source, committed
public/figures/<slug>.svg         Rendered figure, committed
docs/justifications/<slug>.md     Claim and section evidence, never served
docs/ms-notes/<slug>.md           Malay register notes, never served
```

One file per language. The language comes from the folder, never from the file, and nothing is machine-translated at render time.

## Frontmatter, field by field

Required unless the Type column says optional.

| Field | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes | `"What an AI agent can and cannot do for a Malaysian SME"` | One H1 in the body must match it |
| `description` | string | yes | `"An AI agent runs a loop on its own..."` | One sentence a search engine can quote |
| `slug` | string | yes | `what-an-ai-agent-can-do` | Must match the filename; must match the route |
| `translationKey` | string | yes | `what-an-ai-agent-can-do` | Identical in both language files. This is the pair key |
| `date` | ISO date | yes | `2026-11-23` | First publication date; not the read date |
| `updated` | ISO date | yes | `2026-11-23` | Last content change |
| `author` | string | yes | `"UpahJe editorial"` | Plain name or desk |
| `category` | enum | yes | `buying-guides` | One of `definitions`, `buying-guides`, `side-income` |
| `tags` | string array | yes | `[buying-guides, whatsapp, pricing, malaysia]` | Flow style, lowercase, no spaces inside a tag |
| `canonical` | URL | yes | `https://upahje.my/en/articles/what-an-ai-agent-can-do` | Per language. Must match the route the loader derives |
| `draft` | boolean | yes | `false` | See the draft rule below |
| `sources` | object array | optional but expected | see below | Every printed source, with the date checked |

No other field is read today. Unknown fields are ignored rather than rejected, which is what makes the optional extensions at the bottom safe to add.

## The translation mechanism

`translationKey` is the only thing that pairs two files. Slugs may differ per language and usually do; the key does not.

- Both files exist and are published: the pair is linked, each page gets a language switcher, and `hreflang` alternates are emitted for `en-MY`, `ms-MY` and `x-default`.
- One side is missing, or one side is `draft: true`: the published page stands alone. No switcher link to a page that would 404, no `hreflang` to a page that does not exist.
- The same key on two files in the same language folder is a hard error: it would make the pair ambiguous.

What breaks when one side is missing: nothing in the render, but the article is unpaired. It is published in one language, absent from the other language's index, sitemap and `llms.txt`, and has no alternate link. That is the correct behaviour, and it is why a missing Malay file is a draft rather than published content.

## Sources array

```yaml
sources:
  - title: "Bank Negara Malaysia, public exchange-rate API (USD/MYR middle rate 4.1145, 19 November 2026)"
    url: "https://api.bnm.gov.my/public/exchange-rate"
    checked: 2026-11-23
```

- `title`, `url`, `checked` are all required on a source row.
- `checked` is the ISO date the page was actually opened, not the publication date. For a measurement, the URL is the tool's own page or the repository, and the basis lives in the justification block.
- A source that cannot be linked is not a source. Where a page is gone, the archived snapshot URL goes in `url` and the snapshot's date is stated in the body.
- The printed list on the page is generated from this array, so a URL that appears only in `docs/justifications/` is a block row without a printed source and gets fixed or removed.

## Figures

A figure is a block of its own, never inside a paragraph:

```markdown
![Alt text describing the diagram](/figures/what-an-ai-agent-can-do.svg)
*Optional caption, which must not repeat the alt text.*
```

- SVG only, under `public/figures/`. The renderer reads the SVG's own `width`/`height`, so the `<img>` has intrinsic dimensions and no layout shift.
- The source stays out of `public/`: `figures/<slug>.mmd` for Mermaid, `assets/diagram-sources/` for authored SVG.
- One figure per article at most, authored for that article. A broken path renders nothing and is not caught today; it is a proposed validation rule below.
- Alt text is required, and a caption identical to the alt is dropped by the renderer.

## The draft rule

`draft: true` means: not rendered in production, not in the sitemap, not in `llms.txt`, not in the RSS feed, and absent from the other language's pair as if it did not exist. It still renders in `next dev`.

The rule to hold: **draft is for unfinished work, never for an evidence-block problem.** Removing a live, indexed page from the build to fix a bookkeeping gap is a 404 dressed as caution.

## Optional extensions

Proposed in the spec's phase 8. Each is optional, each has a default, and existing files stay valid without any of them.

| Field | Type | Default when absent | Purpose |
| --- | --- | --- | --- |
| `featured` | boolean | `false` | Promote one article per language on the homepage |
| `cover` | path | none | Cover image for cards and social previews |
| `coverAlt` | string | none | Required whenever `cover` is present |
| `coverCredit` | string | none | Attribution line for the image |
| `type` | enum | inferred | One of `explainer`, `guide`, `comparison`, `perspective` |
| `updated` | ISO date | `date` | Already present in the corpus; keep it |

Note on naming: the spec's sample uses `coverImage`, `publishedAt`, `updatedAt` and `translationGroup`. This document uses `cover`/`coverAlt`/`coverCredit`, the existing `date`/`updated`, and the existing `translationKey`, because those are what the corpus already carries. Adopting the spec's names instead would mean rewriting 34 files for synonyms, which the spec's own migration rules forbid. Pick one set before phase 8 ships, and record the choice here.

### Migration note

Existing files stay valid unchanged. Adding a field to a subset is safe, and the loader ignores what it does not read. No article needs editing for these to work; the migration is the importer's job when the database lands in phase 1, and the markdown stays canonical until phase 4.

## Validation rules

What the loader enforces today:

| Check | Today |
| --- | --- |
| Missing `title`, `description`, `date`, `author` on a published article | error |
| Unknown or missing `category` | error |
| `date` in the future | error |
| Missing frontmatter delimiters, unparsable YAML | error |
| Duplicate `translationKey` in the same language | later file wins silently, no error |

Proposed additions, in the order they would catch real mistakes:

1. **Duplicate slug** across the two language folders, or two files whose `slug` frontmatter disagrees with its filename.
2. **Missing translation pair** where `translationKey` exists on one side only, reported as a warning rather than an error, because an unpaired article is legal.
3. **Broken figure path**: any `/figures/<name>.svg` referenced in the body that is not present in `public/figures/`.
4. **Invalid category**: already enforced, keep the error message naming the three valid values.
5. **`featured: true` on more than one article per language.** Today the homepage would have to pick arbitrarily; this must be a hard error once `featured` exists.
6. **`cover` without `coverAlt`**, since an image without alt text is an accessibility defect rather than a style choice.
7. **`type` outside the four editorial formats**, once the field is adopted.
8. **Malformed dates** beyond the future-date check: reject anything that is not `YYYY-MM-DD`.
9. **Empty body after frontmatter**, and a body with no H1 or more than one.
10. **A source row missing `title`, `url` or `checked`.**

Rules 1, 3, 5 and 6 are the ones worth building first: each maps to a defect that has either happened in this project or would publish a broken page.
