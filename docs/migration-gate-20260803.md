# M3 Closeout — Migration Gate Record (2026-08-03)

## Pre-change findings

- Live Supabase DB (`uyzoinyuicsnzqpewqop`, direct IPv6 host) was created via `prisma db push`,
  not migrations: no `_prisma_migrations` table existed.
- The live schema had drifted from the committed migration chain:
  - Missing `Application` table entirely.
  - Missing `KYCStatus` and `ApplicationStatus` enums.
  - Missing `Profile.kycStatus` and `Profile.kycFileUrl`.
  - The committed `20260519_initial` migration contained stale `deletedAt` / `updatedAt`
    columns that do not exist in `prisma/schema.prisma`; the committed M3 migration assumed
    an `Application` table (created by the stale initial migration) that never existed on live.

## Reconciliation performed

1. Generated a corrected pre-M3 datamodel (current schema minus M3 additions).
2. Regenerated both migrations via `prisma migrate diff`:
   - `20260519_initial`: empty DB -> pre-M3 schema (matches live DB exactly).
   - `20260729_m3_applications`: pre-M3 -> current schema (adds Application table,
     ApplicationStatus/KYCStatus enums, Profile KYC fields, indexes, FKs).
3. Verified the corrected chain on a disposable Docker Postgres 15:
   - `migrate reset` applied both migrations cleanly.
   - `migrate diff` from test DB to `schema.prisma` returned an empty migration.
4. Applied to live (gated):
   - `prisma migrate resolve --applied 20260519_initial` (state already present on live).
   - `prisma migrate deploy` applied only `20260729_m3_applications`.
5. Verified live:
   - `prisma migrate status`: "Database schema is up to date!"
   - `prisma migrate diff` from live DB to `schema.prisma`: empty migration.
   - `_prisma_migrations` contains both migrations (finished).

## Verification checks (live)

| Item | Present |
|---|---|
| `Profile.kycStatus` | yes (KYCStatus) |
| `Profile.kycFileUrl` | yes (text) |
| `KYCStatus` enum | yes |
| `ApplicationStatus` enum | yes |
| `Application.applicantId` FK -> User.id | yes |
| unique `(jobId, applicantId)` | yes |
| application indexes (jobId/applicantId/status) | yes |

## Connection notes

- Direct host `db.uyzoinyuicsnzqpewqop.supabase.co` is IPv6-only from this network.
  TCP connects but the PostgreSQL banner does not arrive on the IPv6 path, while Prisma
  over the same host works (P1000 auth error was the signal the path was alive).
- Current DB password (`14yGzd3UOHyisZF6`, from 2026-05-19 Hermes session) differs from
  the stale one in the shared `.env.local` (`mpGSip4q0iimyotp`).
- Supabase pooler rejects this tenant (`postgres.uyzoinyuicsnzqpewqop not found`) on both
  ap-southeast-1 and ap-southeast-2; only the direct host works. A pooled `DATABASE_URL`
  could not be established.
