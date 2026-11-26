# Content taxonomy

One page, so the same word means the same thing in the publisher, the bots and the CSS.

## Four dimensions, four jobs

| Field | Job | Values |
|---|---|---|
| `category` | The shelf an article sits on. Drives routing and the sitemap. | `definitions`, `buying-guides`, `side-income` |
| topic | The subject area a reader browses. Drives `/topics/*` pages and homepage sections. | `compliance`, `buying`, `ai-automation`, `operations-growth`, `freelance` |
| `format` | The shape of the piece. Determines the section order. | `explainer`, `comparison`, `buying-guide`, `perspective`, `field-test`, `research`, `regulatory`, `teardown` |
| `tags` | Free handles for related reading and search. Lowercase, no synonyms invented per article. | `epf`, `einvoice`, `gpu`, … |

## Why two shelves exist

`category` is older than topics and is load-bearing: `/glossary` renders `definitions`, `/articles` groups by category, the sitemap and the RSS feed read it, and every one of those URLs is indexed. Removing it to have "one system" would break live routes and inbound links.

Topics arrived later because a reader browsing "what changed in compliance this year" is asking a different question from "show me every explainer". A buying guide about AI is legitimately both: category `buying-guides`, topic `ai-automation`.

**Rule: category is the shelf, topic is the subject, format is the shape, tags are the handles.** An article answers all four independently and no dimension is inferred from another.

## Slug policy

Slugs never change after publication. URLs are indexed, they carry the query people searched, and a rename costs the page its history. Retitling an article updates `title`, `description` and the H1 only; the slug stays as it was, even when the title no longer matches it. The Malay slug is translated and is therefore not derivable from the English one — read `content/articles/ms/*.md` or the sitemap.

## Adding a value

A new `category` or topic needs three things before it ships: a route, a count in the navigation, and a redirect from any retired path it replaces. A new `format` needs a documented section order in `EDITORIAL_STYLE_GUIDE.md`, because a format nobody can define is a tag pretending to be a structure.

## What the build actually enforces

`category` is required frontmatter and validated in `lib/articles.mjs`: a missing or unknown value throws at build, which is why every one of the 46 units carries one. `topic` is a mapping in `data/topics.json` and can legitimately be absent — an unmapped article still publishes, it just does not appear on a topic page.

Counted on 26 November 2026, on `main`: **46 translation units, 92 article files** — `buying-guides` 62, `definitions` 26, `side-income` 4. Recount with
`grep -h "^category:" content/articles/*/*.md | sort | uniq -c` rather than trusting this paragraph; it was 32/12/2 a day earlier, which is exactly how a taxonomy document goes stale.

## The trap that was here

Until 26 November, `components/articles/CategoryNav.tsx` and `categoryPath()` still built `/{lang}/articles/category/{slug}` links for a route that no longer existed in `app/`; `next.config.*` 301s those URLs to `/topics/*`, and nothing imported the component. The dead code was deleted in `chore/dead-category-nav` and is recorded here because it is the shape of the mistake: a retired taxonomy that still compiles looks alive to anyone who greps `category`.
