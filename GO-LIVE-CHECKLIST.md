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

## 🔄 In Progress / Next

- [x] Seed sample jobs for demo purposes (realistic LABOUR + TECHNICAL jobs)
- [x] Real employer association in job posting (fetchOrCreateEmployer implemented in PostJobForm)
- [x] Improve JobCard to show employer info
- [ ] Add apply/contact functionality
- [ ] Set up custom domain (upahje.my)

## 🚀 Deployment

- [ ] Vercel deployment configured
- [ ] Environment variables set in production
- [ ] Supabase production keys configured
- [ ] Test all critical flows in production

## Current Status

**MVP Status**: Functional and demo-ready  
**Core Flows Working**:
- User registration & login
- Browse live jobs
- Post new jobs (authenticated)
- View job details

**Last Updated**: May 2026
**Branch**: master
**Build**: ✅ Passing

## Notes

- Job posting currently uses placeholder employerId and categoryId
- Real employer association requires user profile / employer record creation flow
- Sample data can be added manually via Supabase dashboard or Prisma Studio
