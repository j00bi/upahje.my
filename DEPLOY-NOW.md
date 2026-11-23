# Deploying UpahJe.my

The site is a Next.js publication deployed on Vercel from `main`. It needs **no
secrets to build or run**: content is Markdown in the repository, and the only
third-party script is Vercel Web Analytics, configured in the dashboard.

Environment variables live in **Vercel → Project → Settings → Environment
Variables**, never in this repository. If a future feature needs a key, add it
there and document its name here, without the value.

## Deploy

1. Push to `main` — Vercel builds and deploys on every push.
2. Watch the deployment in the Vercel dashboard; the build command runs
   `check-articles`, `generate-llms`, `generate-feeds`, then `next build`.
3. Verify the result:

```bash
BASE=https://upahje.my node scripts/verify-content.mjs
```

## Domain

`upahje.my` points at Vercel; DNS is managed at Shinjiru. Nothing in the build
depends on the DNS provider.

## Analytics

Enable Web Analytics once in Vercel → Project → Analytics. The code is already
wired (`@vercel/analytics` in `app/layout.tsx`); with it disabled the script
endpoint returns 404 and no data is recorded.
