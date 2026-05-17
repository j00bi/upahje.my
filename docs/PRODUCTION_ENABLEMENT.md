# Production Enablement Guide — UpahJe.my

## Current Status
- ✅ RLS baseline migration exists (`supabase/migrations/20260517_security_baseline.sql`)
- ✅ Build passes cleanly
- ✅ Seeding script ready (`npm run db:seed`)
- ✅ Vercel config ready (`vercel.json`)
- ⚠️ RLS policies not yet applied to live Supabase project

## Step 1: Apply Row Level Security (Critical for Production)

1. Go to your Supabase project: https://supabase.com/dashboard/project/uyzoinyuicsnzqpewqop
2. Open **SQL Editor**
3. Copy and paste the entire contents of `supabase/migrations/20260517_security_baseline.sql`
4. Run the script
5. Verify in **Database → Tables** that RLS is enabled on:
   - Job
   - Employer
   - Category
   - (Add any new tables like EscrowTransaction, Payment, Review later)

## Step 2: Production Environment Variables

In Vercel (or your hosting platform), set these as **Production** environment variables:

### Required
```
NEXT_PUBLIC_SUPABASE_URL=https://uyzoinyuicsnzqpewqop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.uyzoinyuicsnzqpewqop.supabase.co:5432/postgres
```

### Recommended for Production
```
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://upahje.my
NODE_ENV=production
```

## Step 3: Enable Production Mode in Supabase

1. In Supabase Dashboard → **Authentication** → turn on **Email** + any social providers you want.
2. Under **Database** → **Replication** make sure your tables are published.
3. (Optional but recommended) Set up Supabase Edge Functions or keep using existing API routes.

## Step 4: Deploy to Vercel

```bash
git push origin master
# Then connect the repo in Vercel dashboard or use:
vercel --prod
```

## Step 5: Post-Deployment Verification

After deployment, test these critical flows:
- [ ] New user registration + login
- [ ] Employer posts a job (verifies real employerId creation)
- [ ] Job appears on public /jobs page
- [ ] Job detail page loads correctly
- [ ] Mobile responsiveness on real device

## Security Notes
- The current RLS policies use email-based checks as a bridge. Once we store `user_id` consistently, we should migrate to `auth.uid()` policies.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## Next Actions
- [ ] Run the RLS migration in Supabase SQL Editor (today)
- [ ] Add production env vars in Vercel
- [ ] Deploy and test
- [ ] Purchase and configure `upahje.my` domain

Last updated: May 2026
