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
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5em9pbnl1aWNzbnpxcGV3cW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5OTU4ODUsImV4cCI6MjA5NDU3MTg4NX0.Jw4LCQDso_CPBPLtmRSJ6AclSQQ9occET4tqJFYwnfc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5em9pbnl1aWNzbnpxcGV3cW9wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk5NTg4NSwiZXhwIjoyMDk0NTcxODg1fQ.MLx35Q5855Rp1jVsfcllkuvCiM5STwpCENJsU4l0TO8
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
