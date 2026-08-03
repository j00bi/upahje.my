# M3 Closeout Record (2026-08-03)

Branch: `idea/m3-closeout-launch-gate`
Worktree: `/home/husni/projects/upahje-my-deepseek`
Integration base: `integration/current-verified`

## Definition of done checklist

| Gate | Status |
|---|---|
| Isolated worktree clean | done |
| M3 branch separate from `master` | done |
| Next.js security patch (14.2.35) | done |
| Prisma and Supabase schemas reconciled | done |
| Migration application recorded | done |
| M3 authorization tests pass | done |
| Application concurrency tests pass | done |
| KYC storage private and durable | done |
| Unit tests / typecheck / lint / build | done |
| Authenticated E2E against non-production env | done (15/15) |
| Payments safely disabled | done |
| Verified preview deployment | pending (Vercel) |
| Integration branch passes all gates | pending (merge) |
| Handoff identifies M4/M5 work | done (below) |

## Commits

```
4e00d0a fix: patch Next.js security baseline (next 14.2.3 -> 14.2.35)
e063c75 fix: reconcile Prisma and Supabase schema
1816062 fix: harden M3 application transitions
3d70e8a fix: move KYC files to private storage
fc07342 test: add authenticated M3 E2E
<ci>    ci: add lint gate and protected authenticated E2E workflow
```

## What changed

### Security
- `next@14.2.35` / `eslint-config-next@14.2.35` (fixed 14.x; Next 14 is EOL — public
  launch requires an upgrade to a supported release).
- Same-origin guard on all cookie-authenticated mutation routes (payment webhook
  exempt, Billplz signature verified).
- `SUPABASE_SERVICE_ROLE_KEY` confined to server-only admin module.
- Preview/sample data fallback gated behind `PREVIEW_DATA_ENABLED=true`; production
  returns 404/503 instead of fake jobs.

### Identity
- Invariant enforced: Supabase auth user ID === local `User.id`.
- `ensureLocalUser` raises `IdentityConflictError` instead of silently attaching a
  legacy email match; surfaced on sign-in; `scripts/identity-repair-report.mjs`
  lists accounts needing manual repair. Live check: 5 local users, 0 conflicts.

### Authorization & RLS
- Application-layer authz on all Prisma-backed routes (job create/update, apply,
  decide, withdraw, onboarding, KYC, admin KYC, reviews, payments).
- Expanded RLS for `Profile`, `Talent`, `Application` + admin/talent read for
  `Payment`, `EscrowTransaction` (`supabase/migrations/20260803_*`). Prisma
  connects as a superuser-equivalent app role, so RLS covers the direct Supabase
  client path; per-request DB-enforced RLS for Prisma needs a later JWT-context
  design.

### M3 application correctness
- State machine: PENDING -> ACCEPTED/REJECTED/WITHDRAWN; terminal states locked.
- Acceptance is a transaction: verify PENDING, verify job OPEN, assign talent,
  MATCHED job, ACCEPT selected, REJECT others, rollback on conflict.
- Proposal validation: trimmed, 10..5000 chars, malformed JSON -> 400.
- Duplicate application -> 409; concurrent decision conflict -> 409.
- KYC rule preserved: SUBMITTED/VERIFIED may apply; VERIFIED earns full trust signal.

### KYC storage
- Private Supabase Storage bucket `kyc-documents` (public=false, 10MB cap,
  JPEG/PNG/WebP/PDF only), object path `<userId>/<uuid>.<ext>`.
- `Profile.kycFileUrl` stores the object path, never a public URL.
- Admin views via short-lived signed URL endpoint (auth-only, 5 min TTL).
- Verified via REST: service-role upload OK, anon signed URL denied.

### E2E
- `npm run test:e2e` (Playwright) against disposable project
  `frwxjautfnyxegbwuwin` with seeded employer/talent A/talent B/admin accounts.
- 15 scenarios covering the required list; 15/15 pass.

## Environment notes

- Production DB password changed after `.env.local` was written; current value
  found in Hermes session history (`14yGzd3UOHyisZF6`). Update the shared
  `.env.local`.
- Supabase pooler rejects this tenant on both ap-southeast-1/2; only the direct
  IPv6 host works. No pooled `DATABASE_URL` available.
- Cloudflare path from this machine is flaky (EHOSTUNREACH / connect timeouts);
  E2E uses retries and a DNS warm-up to absorb it.

## Remaining M4/M5 work

- M4: OCR for MyKad, Next.js upgrade to supported release, pooled DATABASE_URL,
  per-request Prisma RLS (JWT context), identity repair execution.
- M5: agreement model, Billplz live charging, full escrow redesign.

## Next action

Merge `idea/m3-closeout-launch-gate` into `integration/current-verified`, push to
`origin`, then verify the Vercel preview deployment passes the same gates.
