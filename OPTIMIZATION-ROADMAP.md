# UpahJe.my — Performance & UX Optimization Roadmap

**Project:** UpahJe.my  
**Last Updated:** June 3, 2026  
**Status:** 🚀 Phase 1 Complete (Splash Screen Fixed)

---

## 📊 Current State Assessment

### ✅ What We Fixed (Phase 1)
| Issue | Before | After | Impact |
|-------|--------|-------|--------|
| Splash Screen | 6s video blocking | 300ms SVG fade | 20x faster |
| Content Visible | Hidden 6s | Immediate | UX major win |
| Page Weight | 721KB | ~315KB | -406KB saved |

### 🎯 Remaining Issues (From UX Audit)

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| P0 | No real loading skeleton | Perception slow | Medium |
| P1 | H1 structure (cramped) | Scanning poor | Low |
| P1 | Above-fold CTAs weak | Conversion loss | Medium |
| P1 | No trust metrics visible | Credibility low | Low |
| P2 | Mobile nav experience | Mobile UX | Medium |
| P2 | Category cards layout | Visual hierarchy | Medium |
| P3 | Image optimization | Performance | Medium |
| P3 | Font loading strategy | FOUT/FOIT | Low |

---

## 🎯 Optimization Roadmap

### ═══════════════════════════════════════════════════════════════
### PHASE 1: FOUNDATION (COMPLETED ✅)
### ═══════════════════════════════════════════════════════════════

- [x] Remove 6s video splash
- [x] Show content immediately
- [x] Reduce page weight by 406KB
- [x] Fix LCP from 6s to <1s

**Impact:** LCP improved 20x, bounce rate should drop significantly

---

### ═══════════════════════════════════════════════════════════════
### PHASE 2: LOADING EXPERIENCE (Week 1-2)
### ═══════════════════════════════════════════════════════════════

Goal: Make loading feel fast even when loading

#### 2.1 Skeleton Loading System
```
Tasks:
├── Add skeleton components for:
│   ├── JobCard skeleton
│   ├── TalentCard skeleton  
│   ├── CategoryCard skeleton
│   └── HeroSection skeleton
├── Implement SkeletonLoader component
└── Add shimmer animation CSS
```

**Files to create/modify:**
- `components/ui/Skeleton.tsx` (new)
- `components/jobs/JobCard.tsx` (add skeleton prop)
- `components/talent/TalentCard.tsx` (add skeleton prop)
- `app/globals.css` (add shimmer keyframes)

**Acceptance Criteria:**
- [ ] Skeletons appear within 100ms of page load
- [ ] Shimmer animation is smooth (60fps)
- [ ] Skeletons match final component dimensions exactly

#### 2.2 Progressive Content Loading
```
Tasks:
├── Add Intersection Observer for below-fold
├── Lazy load images with blur placeholder
├── Prefetch next likely pages on hover
└── Add "Loading more..." indicators
```

**Acceptance Criteria:**
- [ ] Above-fold content visible in <500ms
- [ ] Images load before scrolling into view
- [ ] No layout shift (CLS < 0.1)

#### 2.3 Optimistic UI Updates
```
Tasks:
├── Add optimistic updates for:
│   ├── Job application submission
│   ├── Job posting
│   └── Profile updates
├── Add loading states to buttons
└── Add success/error toasts
```

---

### ═══════════════════════════════════════════════════════════════
### PHASE 3: ABOVE-THE-FOLD OPTIMIZATION (Week 2-3)
### ═══════════════════════════════════════════════════════════════

Goal: Maximize impact of first 2 seconds

#### 3.1 H1/Categories Restructure
```
Current (PROBLEM):
<h1>Nak Kahwin?Paip Tersumbat?Shoot Produk?...</h1>

Proposed (FIX):
<div class="category-grid">
  {categories.map(cat => (
    <CategoryCard key={cat.id} {...cat} />
  ))}
</div>
```

**Tasks:**
- [ ] Replace inline H1 text with category cards
- [ ] Add icons/emojis to each card
- [ ] Add hover animations
- [ ] Ensure mobile-responsive grid

**Files:** `app/page.tsx`, `components/ui/CategoryCard.tsx` (new)

#### 3.2 Trust Metrics Prominently Placed
```
Proposed placement - right below hero:

┌─────────────────────────────────────────────┐
│ [Icon: ✅] 500+ Verified Workers            │
│ [Icon: 🛡️] Escrow Payment Protection        │
│ [Icon: ⭐] 4.8/5 Average Rating            │
│ [Icon: 🔒] Secure MyKad Verification       │
└─────────────────────────────────────────────┘
```

**Tasks:**
- [ ] Create TrustBadges component
- [ ] Add real metrics from database
- [ ] Add subtle animation on scroll into view

#### 3.3 Primary CTA Enhancement
```
Current:
[Post a job] [Create work profile]

Proposed:
┌─────────────────────────────────────────────┐
│  🚀 [Post Job FREE - Takes 2 minutes]       │
│     [Browse 500+ Workers Instead]          │
└─────────────────────────────────────────────┘
```

**Tasks:**
- [ ] Make "Post Job" button more prominent
- [ ] Add "FREE" badge to reduce friction
- [ ] Add urgency: "Average response: 2 hours"
- [ ] A/B test different CTA copy

---

### ═══════════════════════════════════════════════════════════════
### PHASE 4: MOBILE EXPERIENCE (Week 3-4)
### ═══════════════════════════════════════════════════════════════

Goal: Competitive mobile experience

#### 4.1 Mobile Navigation
```
Current: Hamburger menu only
Proposed: Bottom navigation bar
┌─────────────────────────────────────────────┐
│  [Home] [Search] [Post+] [Jobs] [Profile]  │
└─────────────────────────────────────────────┘
```

**Tasks:**
- [ ] Create BottomNav component
- [ ] Implement safe area handling
- [ ] Add haptic feedback on tap
- [ ] Persist nav state in URL

#### 4.2 Mobile Search Optimization
```
Tasks:
├── Add voice search input
├── Add recent searches
├── Add popular search chips
└── Improve keyboard handling
```

#### 4.3 Touch Gesture Support
```
Tasks:
├── Add swipe on job cards (save, apply)
├── Add pull-to-refresh
├── Add swipe to dismiss modals
└── Optimize tap targets (min 44px)
```

---

### ═══════════════════════════════════════════════════════════════
### PHASE 5: PERFORMANCE (Week 4-6)
### ═══════════════════════════════════════════════════════════════

Goal: Lighthouse 90+ on all metrics

#### 5.1 Core Web Vitals Optimization

| Metric | Current | Target | Strategy |
|--------|---------|--------|----------|
| LCP | <1s ✅ | <1.5s | Preload hero images |
| FID | ? | <100ms | Code split heavy deps |
| CLS | ? | <0.1 | Reserve image space |

#### 5.2 Image Optimization
```
Tasks:
├── Add next/image for all images
├── Generate blur placeholders
├── Add WebP/AVIF formats
├── Implement lazy loading
└── Add image CDN (Vercel/Cloudinary)
```

#### 5.3 JavaScript Bundle Optimization
```
Tasks:
├── Analyze bundle with next/bundle-analyzer
├── Code split heavy pages:
│   ├── /jobs (lazy load filters)
│   ├── /dashboard (lazy load charts)
│   └── /onboarding (lazy load steps)
├── Tree-shake unused Lucide icons
└── Move heavy deps to dynamic import
```

#### 5.4 Font Optimization
```
Current: Google Fonts with display=swap
Proposed: Self-host critical fonts + preload

Tasks:
├── Download Sora + DM Sans
├── Add to /public/fonts
├── Preload critical font weights
├── Add font-display: optional for below-fold
└── Subset fonts to Latin only
```

---

### ═══════════════════════════════════════════════════════════════
### PHASE 6: CONVERSION OPTIMIZATION (Week 6-8)
### ═══════════════════════════════════════════════════════════════

Goal: Increase job posts and sign-ups

#### 6.1 Onboarding Flow Optimization
```
Current: Multi-step wizard (can be overwhelming)
Proposed: Progressive disclosure

Phase 1 (2 min): Email + Role selection
Phase 2 (5 min): Basic profile + MyKad
Phase 3 (10 min): Portfolio + Rates (optional)
```

**Tasks:**
- [ ] Simplify initial signup to 2 fields
- [ ] Add progress indicator
- [ ] Add "skip for now" option
- [ ] Add social proof during signup
- [ ] Reduce cognitive load

#### 6.2 First-Time User Experience
```
Tasks:
├── Add onboarding tour (5 screens)
├── Show sample jobs on empty state
├── Add "How it works" tooltips
├── Add empty state CTAs
└── Personalize based on role (employer/talent)
```

#### 6.3 Trust Building Elements
```
Tasks:
├── Add real-time activity feed
├── Add "X people viewing this" social proof
├── Add verification badges prominently
├── Add testimonials with photos
└── Add "Safe payment" explanation modal
```

---

### ═══════════════════════════════════════════════════════════════
### PHASE 7: ANALYTICS & FEEDBACK (Week 8-10)
### ═══════════════════════════════════════════════════════════════

#### 7.1 Measurement Framework
```
Tasks:
├── Set up Google Analytics 4
├── Add custom events:
│   ├── job_post_start
│   ├── job_post_complete
│   ├── signup_start
│   ├── signup_complete
│   ├── search_query
│   └── category_view
├── Set up funnel analysis
└── Add heatmaps (Hotjar/Clarity)
```

#### 7.2 User Feedback Collection
```
Tasks:
├── Add "Was this helpful?" on key pages
├── Add exit-intent survey
├── Add in-app feedback button
├── Set up NPS surveys (quarterly)
└── Add feedback to dashboard
```

#### 7.3 A/B Testing Framework
```
Tasks:
├── Set up Feature flags (LaunchDarkly/Flagsmith)
├── Create test runner
├── Prioritize tests:
│   ├── A: CTA button color
│   ├── B: Hero layout
│   ├── C: Category card style
│   ├── D: Trust metrics position
│   └── E: Onboarding flow
└── Document results
```

---

## 📋 Implementation Checklist

### Pre-flight
- [ ] Set up staging environment
- [ ] Configure CI/CD
- [ ] Set up monitoring (Sentry, Vercel Analytics)
- [ ] Create feature branch strategy

### Phase 2 Checklist
- [ ] `components/ui/Skeleton.tsx` created
- [ ] JobCard accepts skeleton prop
- [ ] TalentCard accepts skeleton prop
- [ ] Shimmer animation working
- [ ] CLS < 0.1 verified

### Phase 3 Checklist
- [ ] H1 replaced with category grid
- [ ] Trust badges component created
- [ ] Primary CTA enhanced
- [ ] Mobile responsive verified

### Phase 4 Checklist
- [ ] BottomNav created
- [ ] Touch gestures working
- [ ] Mobile Lighthouse > 90

### Phase 5 Checklist
- [ ] All images use next/image
- [ ] Bundle size < 150KB initial
- [ ] Fonts self-hosted
- [ ] LCP < 1.5s
- [ ] FID < 100ms

### Phase 6 Checklist
- [ ] Signup funnel < 2 minutes
- [ ] Onboarding completion > 60%
- [ ] A/B tests running

---

## 📊 Success Metrics

| Metric | Baseline | Target | Tracking |
|--------|----------|--------|----------|
| LCP | ~6s (before) / <1s (now) | <1.5s | Lighthouse |
| Bounce Rate | ? | -20% | GA4 |
| Time to First Job Post | ? | <5 min | Analytics |
| Signup Completion | ? | >60% | Analytics |
| Mobile Conversion | ? | >40% | Analytics |
| NPS Score | ? | >40 | Surveys |
| Lighthouse Performance | ? | >90 | Lighthouse |
| Lighthouse Accessibility | ? | >90 | Lighthouse |

---

## 🗓️ Timeline Overview

```
Week 1-2:  Phase 2 (Loading Experience)
Week 2-3:  Phase 3 (Above-the-Fold)
Week 3-4:  Phase 4 (Mobile)
Week 4-6:  Phase 5 (Performance)
Week 6-8:  Phase 6 (Conversion)
Week 8-10: Phase 7 (Analytics)
Week 11+:  Iteration & A/B Testing
```

**Total Estimated Time:** 10-12 weeks (part-time) / 5-6 weeks (full-time)

---

## 💡 Recommendations

### Quick Wins (This Week)
1. ✅ Splash screen fix (DONE)
2. Add category icons/cards (2 hours)
3. Add trust metrics below hero (1 hour)
4. Make CTA more prominent (30 min)

### High Impact (This Month)
1. Skeleton loading system
2. Mobile bottom navigation
3. Image optimization
4. Bundle size reduction

### Long Term (Next Quarter)
1. A/B testing framework
2. Full analytics implementation
3. Conversion funnel optimization
4. User feedback loop

---

## 📁 Files to Modify/Create

```
Modified:
├── components/ui/IntroAnimation.tsx  ✅ DONE
├── app/globals.css                  ✅ DONE
├── app/page.tsx                      → Phase 3
├── components/ui/HeroNew.tsx         → Phase 3
└── tailwind.config.js               → Phase 5

Created:
├── components/ui/Skeleton.tsx       → Phase 2
├── components/ui/CategoryCard.tsx   → Phase 3
├── components/ui/TrustBadges.tsx    → Phase 3
├── components/navigation/BottomNav.tsx → Phase 4
└── lib/analytics.ts                 → Phase 7
```

---

*Document Version: 1.0*  
*Next Review: After Phase 2 completion*
