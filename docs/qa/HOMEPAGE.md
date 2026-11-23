# Homepage, visual QA and measured performance

Phase 3 on current `main` lineage. Twelve full-page captures from the production
build (`next start`): both languages at the six required widths.

| File | Caption |
| --- | --- |
| `home-en-375.png` | EN at 375: display headline stacks to four lines, one column, hamburger sheet, no horizontal overflow. |
| `home-en-430.png` | EN at 430: same one-column flow with a slightly wider measure. |
| `home-en-768.png` | EN at 768: still the mobile sheet (breakpoint is lg), feature headline and standfirst at full measure. |
| `home-en-1366.png` | EN at 1366: header on one line, featured story as one large serif headline with a two-column meta rail, latest list below. |
| `home-en-1440.png` | EN at 1440: container centred at 78rem, feature and list unchanged in structure. |
| `home-en-1920.png` | EN at 1920: gutters absorb the extra width; the reading measure does not stretch. |
| `home-ms-375.png` | BM at 375: same shell and flow, Malay headline and standfirst. |
| `home-ms-430.png` | BM at 430. |
| `home-ms-768.png` | BM at 768. |
| `home-ms-1366.png` | BM at 1366: its own featured piece, chosen from the Malay corpus. |
| `home-ms-1440.png` | BM at 1440. |
| `home-ms-1920.png` | BM at 1920. |

## Measured LCP and CLS, before and after

Method: headless Chromium via CDP, 4x CPU throttle, 1.6 Mbps down / 0.75 Mbps
up / 150 ms RTT, cache disabled, median of three runs at 1280 px. Before is the
live homepage at `d32744f`; after is this branch's production build.

| Page | LCP before | LCP after | CLS before | CLS after |
| --- | --- | --- | --- | --- |
| `/en` | 1284 ms | 824 ms | 0 | 0.0008 |
| `/ms` | 1008 ms | 820 ms | 0 | 0.0007 |

CLS rose from exactly 0 to 0.0008, which is a sub-pixel font-swap shift from
the newly loaded display and serif faces, far inside the 0.1 target. Both
languages and every width were captured; the page has no collections section
(no curated content exists) and no newsletter block (no working integration).
The featured story is `featuredArticle(lang)`: explicit `featured: true` in
frontmatter wins, otherwise the newest published article. No slug is hardcoded;
the EN and MS pages currently resolve to different newest stories because the
corpora are independent.
