# UpahJe.my - Vercel Deployment Checklist

This guide covers deploying UpahJe.my to Vercel with Supabase and Prisma.

## Prerequisites

- [ ] Vercel account (connected to GitHub)
- [ ] Supabase project created
- [ ] Billplz account (for Malaysian FPX payments)
- [ ] Domain registered (upahje.my or similar)

## Step 1: Configure Environment Variables in Vercel

Add these variables in Vercel Dashboard → Project Settings → Environment Variables:

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key alias | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SITE_URL` | Public application origin used in auth links | e.g., `https://upahje.my` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Supabase Dashboard → Project Settings → API |
| `DATABASE_URL` | PostgreSQL connection string for the limited app role | Supabase Dashboard → Database → Connection String / pooled endpoint |
| `DIRECT_URL` | Optional direct admin connection string for migrations/maintenance | Supabase Dashboard → Database → Connection String |
| `NEXTAUTH_SECRET` | Random secure string | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your production domain | e.g., `https://upahje.my` |

### Optional Variables

| Variable | Description | Required For |
|----------|-------------|--------------|
| `BILLPLZ_API_KEY` | Billplz API key | Payment processing |
| `BILLPLZ_COLLECTION_ID` | Billplz collection ID | Payment processing |
| `BILLPLZ_X_SIGNATURE_KEY` | Billplz signature key | Webhook verification |
| `BILLPLZ_X_SIGNATURE` | Legacy Billplz signature alias | Webhook verification fallback |
| `BILLPLZ_SANDBOX` | `true` for test mode | Development/testing |

## Step 2: Supabase Setup

Google OAuth credentials are configured in Supabase Auth, not as UpahJe
application environment variables. Follow
[`docs/AUTH-SSO-SETUP.md`](docs/AUTH-SSO-SETUP.md) for the exact application,
Supabase, and Google callback settings.

### 2.1 Create Supabase Project
1. Go to [supabase.co](https://supabase.co)
2. Click "New Project"
3. Fill in:
   - Project Name: `upahje-my`
   - Database Password: Create a strong password (save securely!)
   - Region: Singapore (recommended for Malaysia)
4. Wait for provisioning (1-2 minutes)

### 2.2 Get Connection Details
1. In Supabase Dashboard, go to **Project Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 2.3 Get Database Connection String
1. Go to **Project Settings** → **Database**
2. Scroll to **Connection string**
3. Copy the **URI** connection string
4. Replace `[YOUR-PASSWORD]` with your actual database password
5. This goes in `DIRECT_URL` only if you need a direct maintenance path
6. Put the limited app-role or pooler URL in `DATABASE_URL`

### 2.4 Push Database Schema
Run these commands locally to set up your database:

```bash
cd /home/husni/projects/upahje-my
npx prisma db push
```

This creates all tables defined in `prisma/schema.prisma`.

### 2.5 Enable Row Level Security (RLS)
For production security, enable RLS on your Supabase tables:
1. Go to **Table Editor** in Supabase
2. Select each table
3. Click **Authentication** tab
4. Enable RLS and configure policies
5. Apply the staged baseline in `supabase/migrations/20260517_security_baseline.sql`

## Step 3: Billplz Setup (Malaysian Payments)

### 3.1 Create Billplz Account
1. Sign up at [billplz.com](https://billplz.com)
2. Complete business verification
3. Create a collection for UpahJe.my

### 3.2 Get API Credentials
1. Go to **Settings** → **API Keys**
2. Copy your API key
3. Go to **Collections** → Select your collection
4. Copy the collection ID
5. Get your X-Signature key from **Settings**

### 3.3 Configure Environment Variables
Add to Vercel:
- `BILLPLZ_API_KEY`: Your API key
- `BILLPLZ_COLLECTION_ID`: Your collection ID
- `BILLPLZ_X_SIGNATURE_KEY`: Your signature key
- `BILLPLZ_SANDBOX`: `false` for production

## Step 4: Vercel Deployment

### 4.1 Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `upahje-my` project

### 4.2 Configure Project Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4.3 Add Environment Variables
Add all variables from Step 1 in Vercel Dashboard.

### 4.4 Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at `*.vercel.app`

## Step 5: Configure Custom Domain

### 5.1 Add Domain in Vercel
1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `upahje.my`)
3. Follow DNS configuration instructions

### 5.2 Update DNS Records
Add these DNS records at your domain registrar:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Automatic

Type: A
Name: @
Value: 76.76.21.21
TTL: Automatic
```

### 5.3 Update NEXTAUTH_URL
Update the `NEXTAUTH_URL` environment variable to your production domain:
```
NEXTAUTH_URL=https://upahje.my
```

## Step 6: Post-Deployment Verification

### 6.1 Test Authentication
- [ ] Visit your production domain
- [ ] Click "Sign In"
- [ ] Test email/password authentication
- [ ] Test Google OAuth (if configured)

### 6.2 Test Database Operations
- [ ] Create a new user account
- [ ] Complete profile setup
- [ ] Create a job posting (as employer)
- [ ] Apply to a job (as talent)

### 6.3 Test Payments (if configured)
- [ ] Initiate a payment
- [ ] Complete Billplz flow
- [ ] Verify webhook processing

### 6.4 Monitor Logs
- Check Vercel logs for errors
- Check Supabase logs for database issues
- Check Billplz dashboard for payment issues

## Troubleshooting

### Build Failures
- **Error**: "Missing NEXTAUTH_URL"
  - Solution: Add `NEXTAUTH_URL` environment variable in Vercel

- **Error**: "Database connection failed"
  - Solution: Verify `DATABASE_URL` is correct and includes password

### Runtime Errors
- **Error**: "Supabase client not configured"
  - Solution: Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **Error**: "NextAuth secret missing"
  - Solution: Generate and add `NEXTAUTH_SECRET` in Vercel

### Payment Issues
- **Error**: "Billplz API error"
  - Solution: Verify `BILLPLZ_API_KEY` and `BILLPLZ_COLLECTION_ID`

## Security Checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set and only consumed by server-side admin code
- [ ] `NEXTAUTH_SECRET` is a strong random string
- [ ] Row Level Security enabled on Supabase tables
- [ ] `DATABASE_URL` points at the limited app role, not `postgres`
- [ ] `.env.local` is in `.gitignore`
- [ ] Billplz sandbox mode is `false` in production
- [ ] HTTPS enforced on production domain

## Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor Vercel analytics for traffic
- [ ] Check Supabase usage (free tier limits)
- [ ] Review Billplz transaction logs
- [ ] Update dependencies monthly

### Backup Strategy
- Supabase automatically backs up your database
- Consider exporting data periodically for extra safety

## References

- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)
- [Billplz API Documentation](https://www.billplz.com/api)

---

**Last Updated**: 2026-05-17
**Version**: 1.0.0
