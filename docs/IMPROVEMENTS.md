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

Current correctness state: 14 published pairs, 28 article pages, 38 sitemap
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
2026-11-19:
- **Decimal lede (hotfix).** The short-answer split treated every `[.!?]` as a
  sentence end, so six live pages printed `4. 35`, `3. 70`, `0. 2. 2-rc. 1` and
  `RM99. 90`. A boundary now needs whitespace plus a capital or digit, or end of
  text. Before: 6 of 28 article pages wrong; after: 0, literals intact, and the
  fixture asserts `4.35`, `0.2.2-rc.1`, `USD 100` and the absence of `4. 35`.
- **Figure type (accessibility).** The API figure renders 686 px wide at 1280
  from a 1040 px source, so 17 px labels displayed at 11.2 px (14 px at 9.2 px).
  At 22 px they display at 14.5 px; all nine text runs per language re-measured
  inside their boxes. Residual: 7.3 px at 390 px, which needs a taller mobile
  layout, not larger type.
- **CI.** The FAQ-boundary job ran red on main for a clean-runner reason, not
  the test: the fixture build prerenders `/auth/*`, which constructs a Supabase
  client at import. Build-only placeholders fixed it; main runs are green.
- **Dead theme CSS.** Removed the two `.theme-toggle` rules and the `data-js`
  gate left after the light-only change.

## Next

0. **TOC without JS (next branch).** The SSR nav ships
   `style="opacity:0;transform:translateY(6px)"`, so 0 of 8 in-page links are
   visible with scripts disabled. Target 8 of 8, measured at 1280 px, with the
   scrollspy left as enhancement.
1. Re-measure the four baseline pages, same method, and record an after column
   here; the baseline above is still the `716af6b` numbers.
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
- A `/en` hub LCP branch: the hub loads less than the article (6 scripts /
  118 KB versus 9 / 191 KB), LCP equals FCP on both hubs, and the gap tracked
  TTFB samples from 0.5 s to 7.1 s. Tuning it would be chasing network noise;
  if performance is taken next, inlining the single render-blocking CSS request
  is the lever that helps both pages and can be measured honestly.
