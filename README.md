# UpahJe.my

Plain answers about technology for Malaysian small businesses — plus a hiring board and talent directory that connects them to people who can do the work.

**Live:** https://upahje.my · [English](https://upahje.my/en) · [Bahasa Melayu](https://upahje.my/ms)

## What it does

- **Guides** — 36 bilingual articles (18 English, 18 Malay) on practical tech: getting online, payments, invoicing, tooling, security basics. Written for someone running a shop, not a sysadmin.
- **Repo and resource directories** — curated tools and templates, browsable by topic and category.
- **Jobs** — employers post work, candidates apply, and each job can surface matched talent.
- **Talent** — public profiles for freelancers and small studios.
- **Escrow payments** — Billplz-backed payment holds, so a client's money is committed before work starts.
- **AI-readable output** — `public/llms.txt`, RSS/JSON feeds and IndexNow pings, so the content is legible to crawlers and assistants instead of being trapped in HTML.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS, `class-variance-authority`, `tailwind-merge` |
| Data | Supabase (Postgres, auth, row-level security) |
| ORM | Prisma (`db:generate`, `db:migrate`, `db:seed`) |
| Payments | Billplz |
| Motion | `motion` |
| State | `zustand` |
| Validation | `zod` |
| Hosting | Vercel + Supabase |

## Structure

```
app/
  [lang]/
    page.tsx               home
    articles/              index, category, pagination, article
    repos/                 tool directory, by topic
    resources/
  jobs/                    board, detail, post, matches
  talent/                  directory
  ai/                      register, dashboard, tasks, post
  (app)/dashboard/         employer and talent dashboards
  api/escrow/hold/         payment hold endpoint
  auth/                    login, signup
content/
  articles/en|ms/          markdown source, one file per locale
supabase/migrations/       schema and RLS policies
```

## Running it locally

```bash
npm install
cp .env.example .env.local        # fill in the values
npm run db:generate
npm run db:migrate
npm run dev                       # http://localhost:3000
```

Required environment variables (see `.env.example`): Supabase URL and keys, `DATABASE_URL` / `DIRECT_URL` for Prisma, `SITE_URL`, `NEXTAUTH_SECRET`, and `BILLPLZ_API_KEY` / `BILLPLZ_COLLECTION_ID` for payments.

Content scripts:

```bash
npm run articles:check     # validate article frontmatter and links
npm run articles:llms      # regenerate public/llms.txt
npm run verify:content     # full content gate
npm run test:faq-boundary  # FAQ boundary tests
```

## Design notes

- **Bilingual by route, not by toggle.** `/en/...` and `/ms/...` are real addresses, so each language is crawlable, shareable and cacheable on its own.
- **Server-rendered content.** Articles render on the server; the client bundle stays small where it matters.
- **RLS on Postgres.** Authorisation lives in database policies and server routes, not in the browser.
- **Escrow modelled explicitly.** Payment state is a real state machine, not something inferred from a callback.

## Licence

No `LICENSE` file yet, so all rights are reserved by default. Add one if you intend others to reuse the code.
