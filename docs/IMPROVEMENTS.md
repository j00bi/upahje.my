# Improvements backlog

Owner: Patch. Scope: correctness, measured performance, accessibility, crawl
surface, build hygiene, in that order. One improvement per branch, before and
after measured, merge SHA pushed to a ref; never push to `main`.

## Baseline (2026-11-19, live site at `5df0f4a`)

Measured before this branch merged. Method: local headless Chromium via CDP,
4x CPU throttle, 1.6 Mbps down / 750 kbps up / 150 ms latency, cache disabled,
median of three runs, same machine and network each time, so numbers compare to
each other, not to field data. LCP candidates are text (H1 or first paragraph);
there is no hero image or webfont on any page.

| Page | LCP | CLS | TTFB | Transfer |
| --- | --- | --- | --- | --- |
| `/en/articles/what-is-an-api-for-malaysian-sme` | 1380 ms | 0.0000 | 562 ms | 192 KB |
| `/ms/articles/apa-itu-api-untuk-pks-malaysia` | 1620 ms | 0.0002 | 1072 ms | 192 KB |
| `/en` (hub) | 2144 ms | 0.0000 | 744 ms | 136 KB |
| `/ms` (hub) | 1276 ms | 0.0000 | 325 ms | 136 KB |

INP is not measured yet: no interaction script exists. That is a backlog item,
not a pass.

Current correctness state: 7 published pairs, 14 article pages, 28 sitemap
URLs. `npm run articles:check` green (Malay register and PII clean);
`npm run verify:content` sweeps every sitemap URL, status first, 0 failures;
`npm run test:faq-boundary` green; `NODE_ENV=production npm run build` green.
Every page renders without JS. Every figure has intrinsic dimensions.

Known open items, not yet fixed:
- Preview deployments are publicly readable; deployment protection is off in
  Vercel and cannot be enabled without dashboard access or credentials.
- `DEPLOY-NOW.md` tracks a Supabase `service_role` JWT and an anon key. Chief
  owns the purge decision; the user rotates what matters.
- `figures/*.mmd` render pipeline (`scripts/build-figures.mjs`) is not built;
  the two harness figures were committed as rendered SVG from the publisher.
- The eighth article pair sits on the publisher's line, not `main`.

## Last change

`feat/light-readnext` (pending merge): dark-mode toggle and all theme plumbing
removed (light-only surface), read-next reworked into a labelled list before
`## FAQ` with plain writer labels, and the shared inline store-API-courier SVG
replaced by the authored 1040x320 `what-is-an-api.svg` in both languages.
After-merge vitals are recorded in the review note for this branch.

## Next

1. Re-measure the four baseline pages after this branch merges, same method;
   add the measured numbers here so the next review has a real before/after.
2. Move the vitals runner into `scripts/measure-vitals.mjs` so a measurement
   is reproducible and quick, and include INP (click and keypress probes).
3. Check preview deployment protection in the Vercel dashboard; until then
   treat every preview URL as public.
4. Mermaid render pipeline for the two cycle diagrams, run manually, SVGs
   committed, `.mmd` sources in the PII scan (already scanned).

## Rejected, with reasons

- Removing marketplace-era CSS classes and routes while off the article path:
  churn with no user-visible win, and the routes are deliberately kept with
  `noindex`.
- A theme auto-switch instead of a toggle: contradicts the light-only decision.
- Mermaid for the API figure: a three-step flow with a return path renders as
  a 10:1 ribbon, so the authored SVG is the deliberate exception (Chief's
  call). Mermaid stays for the two cycle diagrams.
