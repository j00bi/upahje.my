# Deploy UpahJe.my to Vercel — Dashboard Method

## Step 1: Push to GitHub

```bash
git add -A
git commit -m "ready for production deployment"
git push origin master
```

## Step 2: Deploy on Vercel Dashboard

1. Go to https://vercel.com/new
2. Import the GitHub repo
3. Framework preset: **Next.js**
4. Add these environment variables exactly:

```
NEXT_PUBLIC_SUPABASE_URL=https://uyzoinyuicsnzqpewqop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
DATABASE_URL=postgresql://postgres:mpGSip4q0iimyotp@db.uyzoinyuicsnzqpewqop.supabase.co:5432/postgres?sslmode=require
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://upahje-my.vercel.app
```

5. Click **Deploy**
6. Wait ~3 minutes for build to finish
7. You'll get a live URL like `https://upahje-my.vercel.app`

## Step 3: Connect Custom Domain

1. In Vercel dashboard → Project → Settings → Domains
2. Add your purchased domain
3. Follow the DNS instructions Vercel provides
4. Update `NEXTAUTH_URL` in Vercel env vars to `https://yourdomain.com`
5. Redeploy
