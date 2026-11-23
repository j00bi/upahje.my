# Archive and topic pages, visual QA and measured performance

Phase 4 on top of the merged design system and shell. Full-page captures from
the production build (`next start`), both languages at the six widths, plus one
topic page.

| File | Caption |
| --- | --- |
| `archive-en-375.png` | EN archive at 375: one column, previews with topic, date and reading time, topic nav wraps without overflow. |
| `archive-en-430.png` | EN archive at 430. |
| `archive-en-768.png` | EN archive at 768: still one column, wider measure. |
| `archive-en-1366.png` | EN archive at 1366: header, topic nav with real counts, hairline-separated previews, pagination. |
| `archive-en-1440.png` | EN archive at 1440. |
| `archive-en-1920.png` | EN archive at 1920: container centred, measure unchanged. |
| `archive-ms-375.png` | BM archive at 375, Malay labels and counts. |
| `archive-ms-430.png` | BM archive at 430. |
| `archive-ms-768.png` | BM archive at 768. |
| `archive-ms-1366.png` | BM archive at 1366. |
| `archive-ms-1440.png` | BM archive at 1440. |
| `archive-ms-1920.png` | BM archive at 1920. |
| `topic-en-1366.png` | EN topic page for Business: title, description, topic nav with the active pillar marked, previews. |

## Measured LCP and CLS, before and after

Method: headless Chromium via CDP, 4x CPU throttle, 1.6 Mbps down / 0.75 Mbps
up / 150 ms RTT, cache disabled, median of three runs at 1280 px. Before is the
live archive at `71f4d8c`; after is this branch's production build.

| Page | LCP before | LCP after | CLS before | CLS after |
| --- | --- | --- | --- | --- |
| `/en/articles` | 1344 ms | 820 ms | 0 | 0.0001 |
| `/ms/articles` | 1192 ms | 812 ms | 0 | 0.0001 |

Checks on this build: `/en/articles`, `/en/articles/page/2`, `/ms/articles`,
`/en/articles/category/business` (new pillar page),
`/en/articles/category/definitions` (legacy URL) and
`/ms/articles/category/automation-ai` all 200; no horizontal overflow at 375;
topic nav renders four pillars with real counts and no empty pillar; pagination
keeps the existing `/en/articles/page/2` and `/page/3` links. Sitemap grows from
56 to 64 URLs: the eight new pillar topic pages, additive, with every previous
URL still served.
