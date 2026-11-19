# Improvements backlog

Owner: Patch. Scope: correctness, measured performance, accessibility, crawl
surface, build hygiene, in that order. One improvement per branch, before and
after measured, merge SHA pushed to a ref; never push to `main`.

## Baseline (2026-11-19, live site at `716af6b`)

Measured before this branch merged. Method: local headless Chromium via CDP,
4x CPU throttle, 1.6 Mbps down / 750 kbps up / 150 ms latency, cache disabled,
median of three runs, same machine and network each time, so numbers compare to
each other, not to field data. LCP candidates are text (H1 or first paragraph);
there is no hero image or webfont on any page.

| Page | LCP | CLS | TTFB | Transfer |
| --- | --- | --- | --- | --- |
| `/en/articles/what-is-an-api-for-malaysian-sme` | 988 ms | 0.0000 | 205 ms | 191 KB |
| `/ms/articles/apa-itu-api-untuk-pks-malaysia` | 1032 ms | 0.0000 | 379 ms | 192 KB |
| `/en` (hub) | 1884 ms | 0.0000 | 572 ms | 136 KB |
| `/ms` (hub) | 1624 ms | 0.0000 | 780 ms | 136 KB |

The first measurement, on the live site at `5df0f4a` before the ten-pair merge,
was LCP 1380/1620 ms on the two articles and 2144/1276 ms on the hubs, transfer
192/136 KB, CLS ≈0. The run above is the current baseline; comparisons should
use the same rows and method, and single runs are noisy (samples swing by up to
2x), so take a median of three.

INP is not measured yet: no interaction script exists. That is a backlog item,
not a pass.

Current correctness state: 10 published pairs, 20 article pages, 30 sitemap
URLs. `npm run articles:check` green (Malay register and PII clean);
`npm run verify:content` sweeps every sitemap URL, status first, 0 failures;
`npm run test:faq-boundary` green; `NODE_ENV=production npm run build` green.
Every page renders without JS, every figure ships with intrinsic dimensions,
and the site is light-only with no theme control in the served HTML.

Known open items, not yet fixed:
- Preview deployments are publicly readable; deployment protection is off in
  Vercel and cannot be enabled without dashboard access or credentials.
- `DEPLOY-NOW.md` tracks a Supabase `service_role` JWT and an anon key. Chief
  owns the purge decision; the user rotates what matters.
- INP and a repeatable vitals runner are not in the repo yet. The ad-hoc CDP
  script used here lives outside the repo; moving it into `scripts/` is next.

## Last change

`feat/read-next-figures` (pending merge): the FAQ-boundary fixture now points at
the figure that exists (`what-is-an-api.svg`, 1040x320) instead of the deleted
`api-key-flow.svg`, so the test can run in CI; the job is wired as a GitHub
Actions workflow on pull requests. Adds `scripts/build-figures.mjs` for
`figures/*.mmd` to `public/figures/*.svg` (manual, never in the Vercel build),
documents the figure rules, and gives the Malay API article a translated SVG so
its labels are not English. Records this baseline.

## Next

1. Re-measure the four baseline pages after this branch merges, same method,
   and record the after column here.
2. Move the vitals runner into `scripts/measure-vitals.mjs`, including INP
   (click and keypress probes), so a measurement is reproducible in one command.
3. Check preview deployment protection in the Vercel dashboard; until then
   treat every preview URL as public.
4. Render the two harness Mermaid sources with the new pipeline and confirm the
   committed SVGs match the current sources.

## Rejected, with reasons

- Removing marketplace-era CSS classes and routes while off the article path:
  churn with no user-visible win, and the routes are deliberately kept with
  `noindex`.
- A theme auto-switch or a toggle: main is light-only by decision.
- Mermaid for the API figure: three steps plus a return path renders as a 10:1
  ribbon, so the authored SVG is the deliberate exception. Mermaid stays for
  the two cycle diagrams.
- A second read-next renderer: the publisher's line already moved the block
  before the FAQ and it renders as label plus links. Rebuilding it in React
  would fork the same content into two implementations.
