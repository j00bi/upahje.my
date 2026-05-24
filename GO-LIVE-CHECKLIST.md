# UpahJe.my Go-Live Checklist

## ✅ Completed

- [x] Supabase database connected and migrated
- [x] Authentication fully wired (sign up, sign in, sign out)
- [x] User state visible on landing page (UserNav)
- [x] Employer dashboard protected
- [x] Job posting page protected and functional
- [x] Jobs page shows live data from Supabase
- [x] Job cards are clickable and link to real detail pages
- [x] Job detail page fetches and displays real data
- [x] Build passes cleanly
- [x] Mobile responsive (previous pass)
- [x] Talent applications persist as reviewable proposals
- [x] Talent application dashboard exists
- [x] Employer proposal review exists
- [ ] Limited database role configured for production
- [ ] RLS baseline applied in Supabase
- [ ] Dedicated Supabase admin client is used only server-side

## 🔄 In Progress / Next

- [x] Seed sample jobs for demo purposes (realistic LABOUR + TECHNICAL jobs)
- [x] Real employer association in job posting (fetchOrCreateEmployer implemented in PostJobForm)
- [x] Improve JobCard to show employer info
- [x] Add apply functionality
- [ ] Add contact handoff after accepted application
- [ ] Set up custom domain (upahje.my)

## 🚀 Deployment

### Vercel Configuration
- [x] `vercel.json` created with proper build configuration
- [x] Framework preset: Next.js
- [x] Build command: `npm run build`
- [x] Output directory: `.next`
- [x] Install command: `npm install`

### Environment Variables (Production)
**Required Variables - Add to Vercel Dashboard:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon public key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_SECRET` - Random secure string (generate with: `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` - Production domain (e.g., `https://upahje.my`)

**Optional Variables:**
- [ ] `BILLPLZ_API_KEY` - Billplz API key (for Malaysian FPX payments)
- [ ] `BILLPLZ_COLLECTION_ID` - Billplz collection ID
- [ ] `BILLPLZ_X_SIGNATURE_KEY` - Billplz signature key
- [ ] `BILLPLZ_SANDBOX` - Set to `false` for production

### Supabase Production Setup
- [x] Enable Row Level Security (RLS) on all tables (migration applied successfully)
- [ ] Verify RLS policies are active via SQL query
- [ ] Configure database backups (automatic with Supabase)

### Domain Configuration
- [ ] Add custom domain in Vercel (upahje.my)
- [ ] Configure DNS records (CNAME for www, A record for root)
- [ ] Update `NEXTAUTH_URL` to production domain

### Pre-Deployment Checklist
- [x] Run production build locally to verify (`NODE_ENV=production npm run build` ✅ PASSED)
- [x] Run TypeScript check (`npx tsc --noEmit` ✅ PASSED)
- [ ] Fix `npm run lint` script/tooling; it currently opens Next's ESLint setup prompt because ESLint is not installed/configured for that command
- [ ] Verify all environment variables are set
- [ ] Test authentication locally with production-like env vars
- [ ] Check database connection string format
- [ ] Apply `20260524_application_relations` migration to Supabase
- [ ] Review security checklist below

### Post-Deployment Verification
- [ ] Visit production domain
- [ ] Test user registration and login
- [ ] Test job posting flow (as employer)
- [ ] Test application submit/review/accept flow with separate talent and employer accounts
- [ ] Test job browsing and details
- [ ] Verify Supabase data is accessible
- [ ] Check Vercel logs for errors

### Security Checklist
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set (never expose publicly)
- [ ] `NEXTAUTH_SECRET` is a strong random string
- [ ] Row Level Security enabled on Supabase tables
- [ ] `.env.local` is in `.gitignore`
- [ ] Billplz sandbox mode is `false` in production
- [ ] HTTPS enforced on production domain

## Current Status

**MVP Status**: Functional and demo-ready  
**Core Flows Working**:
- User registration & login
- Browse live jobs
- Post new jobs (authenticated)
- View job details
- Submit, track, review, reject, withdraw, and accept job applications

**Last Updated**: May 2026
**Branch**: master
**Build**: ✅ Passing

## Notes

- Job posting uses resolved employer/category records
- Application acceptance currently handles matching state; contact handoff after acceptance is still pending
- Sample data can be added manually via Supabase dashboard or Prisma Studio
- Security baseline scaffold lives in `supabase/migrations/20260517_security_baseline.sql`
