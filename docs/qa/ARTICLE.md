# Article reading experience, QA and measured performance

Phase 5 on the existing article route. Twelve full-page captures from the
production build, both languages at the six widths.

| File | Caption |
| --- | --- |
| `article-en-375.png` | EN at 375: breadcrumb, topic label, H1, standfirst, byline, share row, TOC in the flow, body at full measure. |
| `article-en-430.png` | EN at 430. |
| `article-en-768.png` | EN at 768: single column, TOC above the body. |
| `article-en-1366.png` | EN at 1366: TOC sticky in a narrow rail, 704px reading measure, lime progress rule at the top. |
| `article-en-1440.png` | EN at 1440. |
| `article-en-1920.png` | EN at 1920: container centred, measure unchanged. |
| `article-ms-375.png` | BM at 375 with Malay labels. |
| `article-ms-430.png` | BM at 430. |
| `article-ms-768.png` | BM at 768. |
| `article-ms-1366.png` | BM at 1366. |
| `article-ms-1440.png` | BM at 1440. |
| `article-ms-1920.png` | BM at 1920. |

## Measured before and after

Method: headless Chromium via CDP, 4x CPU throttle, 1.6 Mbps down / 0.75 Mbps
up / 150 ms RTT, cache disabled; LCP and CLS at 1280 px, INP at 390 px from a
real tap on the menu disclosure, p75 of interaction events, median of three
runs. Before is the live article at `d2f1eb6`; after is this branch's build.

| Page | LCP before | LCP after | CLS before | CLS after | INP before | INP after |
| --- | --- | --- | --- | --- | --- | --- |
| `/en/articles/what-is-an-api-for-malaysian-sme` | 2460 ms | 852 ms | 0 | 0.0001 | 32 ms | 24 ms |

## Checks actually run on the built site

- Article 200 in both languages; canonical unchanged; `Article`, `FAQPage`,
  `DefinedTerm` JSON-LD all present.
- Read-next block still renders before `id="faq"` (byte offsets 24919 < 25609 in
  the served HTML).
- TOC links exist in the HTML with scripts disabled: 8 anchors, visible at 375
  and above; the highlight is client-side enhancement only.
- No horizontal overflow at 375 (`scrollWidth === innerWidth`); mobile menu
  still opens with 8 links.
- Share and copy controls render; clicking Copy sets the visible status. In the
  available browser (headless, clipboard permission denied) the status correctly
  read "Could not copy"; a successful clipboard write could not be verified in
  this environment, only the failure path and the fallback path being exercised.
- Related section present with four scored links, never the article itself.
