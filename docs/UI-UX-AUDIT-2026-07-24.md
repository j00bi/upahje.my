# UpahJe.my UI/UX Launch Audit

**Audit date:** 24 July 2026  
**Scope:** Current `deploy-trigger` branch, public marketplace, authentication, onboarding, jobs, talent, category, payment, dashboard, admin, informational pages, and the live UpahJe.Ai prototype routes.  
**Method:** Source review plus rendered inspection at 390×844, 768×1024, 1440×900, and 1920×1080. Public routes were inspected in Chromium through the local Next.js application. Authenticated dashboard internals were reviewed from source because no test account was supplied.

## Executive verdict

| Area | Score | Verdict |
|---|---:|---|
| Overall UI | **5.8/10** | The green/neutral marketplace shell is credible, but black/amber and purple sub-products make the experience look assembled from multiple products. |
| Overall UX | **5.1/10** | Core discovery is understandable, but fallback listings, dead actions, fake success, and missing routes create serious trust and recovery failures. |
| Accessibility | **4.3/10** | Semantic headings are generally present, but labels, focus treatment, status announcements, motion handling, contrast, and touch targets are inconsistent. |
| Mobile experience | **5.9/10** | Public listing layouts stack cleanly with no measured horizontal page overflow, but mobile dashboard navigation is structurally broken and several controls are too small. |
| Conversion readiness | **4.6/10** | The hero proposition is clear, but the intro delay, non-working CTA paths, unlabeled demo content, weak proof, and unsafe payment presentation undermine conversion. |

**Production readiness: NOT READY FOR PUBLIC LAUNCH.** The marketplace is suitable for a controlled demo or closed beta after the critical fixes below. Public paid acquisition should wait until job/payment integrity, route recovery, contact delivery, and authenticated mobile navigation are proven end to end.

## What the project is

- **Framework:** Next.js 14 App Router, React 18, TypeScript.
- **Styling:** Tailwind CSS 3.4, a partial CSS-variable token layer in `app/globals.css`, and extensive direct Tailwind palette usage.
- **Motion:** `motion/react` viewport-triggered wrappers plus CSS animation utilities.
- **Data/auth:** Prisma, Supabase auth, Billplz payments.
- **Typography:** Sora for display and DM Sans for body via `next/font`.
- **Main public flow:** Home → jobs/categories/talent → detail → sign in/register → onboarding → role dashboard.
- **Secondary live surface:** `/ai/*`, presented as UpahJe.Ai with an unrelated purple/black design and prototype-only behavior.

### Route and state coverage

Inspected routes include `/`, `/jobs`, `/jobs/post`, `/jobs/[jobId]`, `/talent`, `/talent/[slug]`, `/categories`, `/categories/[slug]`, `/auth/signin`, `/auth/signup`, `/onboarding`, `/dashboard`, `/pay/[jobId]`, `/payment/status`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `/admin`, `/admin/kyc`, `/admin/jobs`, `/portfolio/[slug]`, and all five `/ai/*` pages.

There were no route-level `loading.tsx`, `error.tsx`, or `not-found.tsx` files at audit start. The jobs index had a local spinner and empty state. Category pages had an empty state. The contact form had a success state that did not send anything. The portfolio grid rendered an empty state and six loading skeletons simultaneously.

## Critical problems

### C1. Fallback job cards lead to a server failure

1. **Severity:** Critical
2. **Affected:** `/jobs`, `/jobs/[jobId]`, `app/api/jobs/route.ts`, `app/jobs/[jobId]/page.tsx`
3. **What is wrong:** When Prisma is unavailable, the list API returns ten sample jobs with IDs such as `sample-1`, but the detail page always queries Prisma. During the audit, `/jobs/1` returned HTTP 500 and a blank document; every fallback `sample-*` card would fail similarly.
4. **Why it harms users:** The discovery page appears healthy, then the primary action produces a dead end. This is worse than a clear outage because it spends user effort before failing.
5. **Exact recommended change:** Give sample jobs the same schema as live jobs, disclose them as previews, resolve `sample-*` IDs locally on detail pages, and show a retry/recovery state for unavailable real records.
6. **Implementation notes:** Centralize sample data in `lib/sampleJobs.ts`; do not maintain a second incompatible object shape inside the API route.
7. **Expected impact:** Removes the most visible broken journey and makes degraded operation honest and navigable.

### C2. The payment page presents mock data as a real transaction

1. **Severity:** Critical
2. **Affected:** `/pay/[jobId]`, `app/pay/[jobId]/page.tsx`, `app/api/payments/create/route.ts`
3. **What is wrong:** Every job ID renders the same hard-coded garden job, parses the first number in `RM 150 - 200`, labels RM150 as the amount due, and sends hard-coded test customer details. The API accepts the client-provided amount rather than deriving an agreed amount from persisted job/contract state.
4. **Why it harms users:** The UI can display the wrong job, wrong payer, and wrong charge. Payment ambiguity is a launch blocker, not a polish issue.
5. **Exact recommended change:** Load the owned job and accepted proposal server-side, derive the charge from immutable agreement data, show subtotal/platform fee/escrow terms, and prevent payment until both parties have confirmed the amount.
6. **Implementation notes:** Do not “fix” this with client-side fetching alone. The amount must be authoritative on the server. Keep the route unlinked or feature-gated until that model exists.
7. **Expected impact:** Prevents incorrect charges and materially improves legal, trust, and conversion readiness.

### C3. The contact form claims delivery without sending a message

1. **Severity:** Critical
2. **Affected:** `/contact`, `app/contact/page.tsx`
3. **What is wrong:** Submit only sets local `submitted=true`; the confirmation says “Mesej diterima!” although no network request or email is sent.
4. **Why it harms users:** Support requests disappear while users believe the company received them. This creates direct operational and reputational risk.
5. **Exact recommended change:** Either connect a real endpoint with success/error handling or transparently open a prefilled email and state that the user must send it from their email client.
6. **Implementation notes:** Announce the resulting state with `role="status"` or `role="alert"`. Never show delivery confirmation before server acknowledgement.
7. **Expected impact:** Restores honesty and prevents silent support loss.

### C4. Authenticated dashboard navigation is not viable on mobile

1. **Severity:** Critical
2. **Affected:** `app/(app)/layout.tsx`, `app/(app)/dashboard/layout.tsx`, `components/layout/Sidebar.tsx`
3. **What is wrong:** The root navigation, a second protected-area navbar, the dashboard header, and a fixed 256px sidebar can all render together. The sidebar has no mobile hide/drawer state. At 390px, only roughly 134px remains for dashboard content before padding.
4. **Why it harms users:** The product’s retention surface becomes cramped or unusable immediately after signup.
5. **Exact recommended change:** Keep one global header, use a desktop-only sidebar, and provide a role-aware mobile bottom bar or drawer with 44px targets.
6. **Implementation notes:** Remove nested `<main>` landmarks while consolidating layouts. Verify all role routes with an authenticated test account.
7. **Expected impact:** Makes the core post-signup experience usable on phones.

### C5. Applying for a job immediately assigns it to the applicant

1. **Severity:** Critical
2. **Affected:** `app/api/jobs/[jobId]/apply/route.ts`, job application flow
3. **What is wrong:** A valid proposal updates the job to `MATCHED` and assigns its `talentId` immediately. There is no employer review or acceptance step, and the first eligible applicant effectively takes the job.
4. **Why it harms users:** Employers lose control over hiring, later applicants are blocked, and “submit application” behaves materially differently from its label.
5. **Exact recommended change:** Create a `PENDING` application record, prevent duplicate applications, and leave the job `OPEN`. Add a separate authenticated employer action to accept one application and reject/close the rest transactionally.
6. **Implementation notes:** The existing SQL migration contains the `Application` table even though the current Prisma schema omits it. Reconcile that schema drift before building employer application management.
7. **Expected impact:** Restores the core marketplace decision model and prevents accidental assignments.

## High-impact improvements

### H1. A 2.8-second intro blocks every first-session entry point

1. **Severity:** High
2. **Affected:** `app/layout.tsx`, `components/ui/IntroAnimation.tsx`, `app/globals.css`
3. **What is wrong:** A pre-paint script hides `#page-content`; a full-screen video then blocks interaction for up to 2.8 seconds. It also runs when the first visit is a deep link, not only the homepage.
4. **Why it harms users:** It delays comprehension and action, worsens perceived performance, and ignores reduced-motion preference.
5. **Exact recommended change:** Remove the blocking overlay from the root layout. Use the logo animation only as non-blocking brand media or a genuine loading indicator.
6. **Implementation notes:** Remove the `data-intro` visibility gate so content remains available if JavaScript fails.
7. **Expected impact:** Faster first action and lower bounce, especially on mobile.

### H2. Category and talent detail pages look like another company

1. **Severity:** High
2. **Affected:** `/categories/[slug]`, `/talent/[slug]`, `/portfolio/[slug]`
3. **What is wrong:** List and marketing pages use warm white, forest green, rounded cards, and restrained accents. Detail pages switch to black, zinc, amber, and in some cases purple.
4. **Why it harms users:** The visual discontinuity weakens brand recognition and can make a sensitive profile/payment journey feel like an external site.
5. **Exact recommended change:** Use the established canvas, green, teal, typography, radius, and footer system on marketplace detail pages. Reserve amber for warnings, not a second brand.
6. **Implementation notes:** UpahJe.Ai may retain its own identity if explicitly separated as a sister product, but it should not inherit two simultaneous nav bars.
7. **Expected impact:** Higher trust and a more premium, intentional product feel.

### H3. Empty portfolios look permanently broken

1. **Severity:** High
2. **Affected:** `components/portfolio/PortfolioGrid.tsx`, `/talent/[slug]`
3. **What is wrong:** When `projects.length === 0`, the grid renders both “No projects yet” and six animated loading skeleton cards. There is no loading prop or async transition that will replace them.
4. **Why it harms users:** Users interpret the page as stuck loading. On mobile this adds thousands of pixels of dead scroll.
5. **Exact recommended change:** Make loading an explicit state. Render either skeletons, empty state, or projects—never multiple states at once.
6. **Implementation notes:** For a new talent, explain what verification exists and direct employers to post a scoped job instead of fabricating portfolio depth.
7. **Expected impact:** Removes false latency and cuts the audited Aina profile from roughly 4,915px of mostly placeholder content.

### H4. “Similar talents” are not similar

1. **Severity:** High
2. **Affected:** `/talent/[slug]`, `app/talent/[slug]/page.tsx`
3. **What is wrong:** A photography profile hard-codes three labour/home-service cards. The “See all” control has no behavior, and “Hubungi” buttons have no callback.
4. **Why it harms users:** Recommendations appear random, actions appear broken, and marketplace intelligence loses credibility.
5. **Exact recommended change:** Derive recommendations from the same track and overlapping categories; make every action a real route or remove it.
6. **Implementation notes:** Prefer one strong “View profile” action plus a page-level “Post a job for this talent” conversion.
7. **Expected impact:** Better discovery depth and stronger confidence in matching quality.

### H5. Sample listings are presented as live inventory

1. **Severity:** High
2. **Affected:** `/jobs`, `app/api/jobs/route.ts`
3. **What is wrong:** Prisma failure silently returns sample jobs with current timestamps. Their missing `track`, `category`, and `rate` fields cause every card—including cleaning and riding—to display as “Technical.”
4. **Why it harms users:** Inventory and classification appear deceptive. Users cannot tell whether they are browsing real opportunities.
5. **Exact recommended change:** Normalize the schema and expose a data-source flag. Render an explicit “Marketplace preview” banner and prevent sample applications.
6. **Implementation notes:** Empty database and database outage are different states; instrument and message them separately.
7. **Expected impact:** Protects trust while retaining a useful demo experience.

### H6. Primary marketplace CTAs are duplicated and one silently does nothing

1. **Severity:** High
2. **Affected:** `components/ui/HeroNew.tsx`
3. **What is wrong:** The hero has a search submit button and a second “Cari Servis” button wired to the search handler. When the field is empty, the second CTA produces no navigation or feedback.
4. **Why it harms users:** The visually dominant action can feel broken on the most important page.
5. **Exact recommended change:** Keep search for known intent and make “Cari Servis” navigate to categories. Keep “Jadi Freelancer” as the contrasting audience path.
6. **Implementation notes:** Convert popular chips to links so their behavior and semantics match navigation.
7. **Expected impact:** Removes dead clicks and clarifies the client/freelancer split.

### H7. The homepage has proof, but not credible proof

1. **Severity:** High
2. **Affected:** `/`, `app/page.tsx`
3. **What is wrong:** “Verified Talent 5+” is tiny, testimonial copy is generic and uses randomly selected avatar images, and an empty “Live Activity” panel occupies major space. No source, date, completed-job count, or verification explanation substantiates the claims.
4. **Why it harms users:** Trust claims look like launch-template content instead of marketplace evidence.
5. **Exact recommended change:** Use deterministic portraits or initials, label demo testimonials if not real, replace empty live activity with a clear early-access state, and explain what “verified” means.
6. **Implementation notes:** Do not inflate metrics. Small honest numbers are more credible than generic social proof.
7. **Expected impact:** Better trust quality and less perceived fabrication.

### H8. Navigation contains missing destinations

1. **Severity:** High
2. **Affected:** `components/layout/Sidebar.tsx`, `/admin`, `/payment/status`
3. **What is wrong:** Sidebar links target unimplemented dashboard subroutes; `/admin` links to `/admin/jobs`, which returns 404; payment help links to `/support`, which does not exist.
4. **Why it harms users:** Navigation promises capabilities that disappear on click.
5. **Exact recommended change:** Remove or disable unimplemented links with honest “Coming soon” labels; point support to `/contact`; add a branded 404 with recovery.
6. **Implementation notes:** Route existence should be part of CI or a lightweight navigation test.
7. **Expected impact:** Fewer dead ends and clearer product scope.

### H9. UpahJe.Ai is a polished-looking but non-functional prototype exposed as product

1. **Severity:** High
2. **Affected:** `/ai`, `/ai/register`, `/ai/tasks`, `/ai/post`, `/ai/dashboard`
3. **What is wrong:** The landing page has a non-submitting early-access form. Registration advances without per-step validation and finishes with `alert()`. Tasks and dashboard are mock data. `/ai` and `/ai/tasks` render a second navigation under the global one.
4. **Why it harms users:** High visual polish creates expectations the underlying product does not meet.
5. **Exact recommended change:** Feature-gate these routes, label them “Prototype,” or connect the flows before public exposure. Use one header and real inline status states.
6. **Implementation notes:** Keep the purple identity only if product separation is intentional and explicit.
7. **Expected impact:** Prevents brand dilution and false product expectations.

## Visual polish

### V1. The token system is only partially adopted

1. **Severity:** Medium
2. **Affected:** `app/globals.css`, `tailwind.config.js`, most `app/**` and `components/**`
3. **What is wrong:** The source contains large parallel palettes: slate, gray, zinc, neutral, emerald, green, purple, amber, blue, and direct hex values. The scan found 227 arbitrary/direct style usages and hundreds of palette-specific utilities.
4. **Why it harms users:** Similar surfaces differ subtly in border, text, radius, and focus treatment, which reads as unfinished.
5. **Exact recommended change:** Define semantic tokens—canvas, surface, border, text, muted, brand, accent, success, warning, danger—and use palette names only inside token definitions.
6. **Implementation notes:** Migrate page-by-page; do not attempt a blind global replacement.
7. **Expected impact:** Faster iteration and visibly stronger consistency.

### V2. Radius and density vary without hierarchy

1. **Severity:** Medium
2. **Affected:** Auth cards, jobs cards, category cards, dashboard glass cards, payment cards
3. **What is wrong:** Comparable cards range from 8px to 32px radius. Inputs range from 6px to pill. Dashboard uses arbitrary `1.75rem` and `2rem` radii.
4. **Why it harms users:** Shape no longer communicates component type or importance.
5. **Exact recommended change:** Use 12px for controls, 16px for standard cards, 24px for hero/feature panels, and full radius only for chips/compact CTAs.
6. **Implementation notes:** Preserve round marketplace cards where they aid touchability, but stop mixing five systems on adjacent screens.
7. **Expected impact:** More coherent, premium visual rhythm.

### V3. Homepage section spacing is too expansive at tablet and mobile

1. **Severity:** Medium
2. **Affected:** `/`, `app/page.tsx`
3. **What is wrong:** Repeated 80–100px section padding creates a 9,498px mobile homepage. The trust and final CTA bands merge into an especially long dark block.
4. **Why it harms users:** Key proof and final action feel far away, increasing scroll fatigue.
5. **Exact recommended change:** Use 56–64px mobile and 80px desktop section spacing; combine trust and final CTA more tightly.
6. **Implementation notes:** Preserve breathing room around the hero and category cards; reduce repeated empty intervals.
7. **Expected impact:** Faster scanning and stronger content momentum.

### V4. Homepage process grid declares four columns for three steps

1. **Severity:** Medium
2. **Affected:** `app/page.tsx`
3. **What is wrong:** “How it works” uses `md:grid-cols-4` but only renders three steps, leaving an implicit empty column and off-center content.
4. **Why it harms users:** The section looks accidentally positioned on larger screens.
5. **Exact recommended change:** Use three equal columns and align connectors to that grid.
6. **Implementation notes:** The step connector CSS already assumes adjacent items; no fourth placeholder is needed.
7. **Expected impact:** Immediate visual balance improvement.

## Accessibility

### A1. Search and multiple form controls do not have programmatic labels

1. **Severity:** High
2. **Affected:** `CategoryNav`, `HeroNew`, `JobFilters`, `PostJobForm`, contact form, onboarding variants
3. **What is wrong:** Rendered inspection found the global search input unlabeled on every route. Hero search is also unlabeled. Several forms use visual `<label>` elements without `htmlFor`/`id`.
4. **Why it harms users:** Screen-reader and speech-input users cannot reliably identify or target fields.
5. **Exact recommended change:** Add stable IDs, associated labels, fieldsets/legends for grouped choices, and descriptive `aria-label` only where a visible label is inappropriate.
6. **Implementation notes:** Placeholder text is not a label.
7. **Expected impact:** Major improvement to form completion for assistive-technology users.

### A2. Error and success messages are not announced

1. **Severity:** High
2. **Affected:** Auth, post job, onboarding, KYC, payment, contact
3. **What is wrong:** Inline error boxes generally lack `role="alert"` or live regions. Onboarding uses blocking browser alerts.
4. **Why it harms users:** Screen-reader users may not know submission failed or where recovery is needed.
5. **Exact recommended change:** Use `role="alert"` for failures, `role="status"` for progress/success, move focus to summaries when appropriate, and connect field errors with `aria-describedby`.
6. **Implementation notes:** Preserve user-entered values after failure.
7. **Expected impact:** Clearer recovery and fewer abandoned forms.

### A3. Core token contrast fails WCAG AA

1. **Severity:** High
2. **Affected:** `.btn-primary`, `.cta-nav`, `.step-number`, `.category-pill-badge`, muted text
3. **What is wrong:** `#166345` against `#0a2a12` is **2.15:1**. `#868685` on white is **3.64:1**. `#2d8f5e` on white is **4.04:1**.
4. **Why it harms users:** Small button labels and secondary text are difficult to read for low-vision users and fail AA thresholds.
5. **Exact recommended change:** Use white on brand green; darken muted text to at least approximately `#666966`; reserve the lighter green for large text or non-text decoration.
6. **Implementation notes:** Recheck translucent text against its composited background, not the source color alone.
7. **Expected impact:** Better readability with no brand change.

### A4. Focus treatment is component-specific and easy to lose

1. **Severity:** High
2. **Affected:** Global links/buttons, nav search, cards, chips, FAQ summaries
3. **What is wrong:** Some inputs define rings, many buttons and links only define hover, and the dark nav search removes the native outline without adding a strong ring.
4. **Why it harms users:** Keyboard users cannot consistently see where they are.
5. **Exact recommended change:** Add a global `:focus-visible` outline standard and preserve component-specific rings where stronger.
6. **Implementation notes:** Use a 3px high-contrast outline with offset; do not suppress outlines unless replaced.
7. **Expected impact:** Immediate keyboard usability across the product.

### A5. Motion does not respect user preference and hides content before intersection

1. **Severity:** Medium
2. **Affected:** `FadeUp`, `Stagger`, intro, spinners/pulse
3. **What is wrong:** Viewport wrappers initialize content at opacity zero; full-page audit captures showed entire sections blank until scripted scrolling triggered them. No global reduced-motion treatment exists.
4. **Why it harms users:** Content can disappear in print, capture, automation, or edge cases; motion-sensitive users receive unnecessary animation.
5. **Exact recommended change:** Keep content visible in the initial state, animate translation only, and disable non-essential animation under `prefers-reduced-motion`.
6. **Implementation notes:** Loading indicators may continue to convey state, but decorative pulse and smooth scroll should stop.
7. **Expected impact:** More robust rendering and better motion accessibility.

### A6. Mobile target sizes are inconsistent

1. **Severity:** Medium
2. **Affected:** Mobile menu button, filters, chips, footer links, breadcrumbs, category CTAs
3. **What is wrong:** The audit measured multiple visible controls under 44px in one or both dimensions, including the 40×40 menu toggle and 40px category CTAs.
4. **Why it harms users:** Small controls are error-prone for touch and motor-impaired users.
5. **Exact recommended change:** Make primary controls at least 44px high; ensure smaller inline links have sufficient spacing and a minimum 24×24 target.
6. **Implementation notes:** Horizontal filter chips can remain compact if their target box and inter-chip spacing meet WCAG 2.2.
7. **Expected impact:** Fewer mistaps and better one-handed mobile use.

## Responsive behavior

### R1. Public pages avoid horizontal page overflow, but some horizontal controls lack affordance

1. **Severity:** Medium
2. **Affected:** `/jobs` quick filters
3. **What is wrong:** At 390px the quick-filter row scrolls horizontally, but the rightmost chip is visibly clipped with no fade or continuation cue.
4. **Why it harms users:** Users may not discover additional filters.
5. **Exact recommended change:** Add edge fade/peek treatment and ensure the active chip scrolls into view.
6. **Implementation notes:** Do not hide the scrollbar unless an alternate affordance exists.
7. **Expected impact:** Better filter discoverability.

### R2. Profile pages create excessive mobile scroll

1. **Severity:** High
2. **Affected:** `/talent/[slug]`
3. **What is wrong:** The audited Aina page reached 4,915px largely because of permanent skeletons and a sticky CTA added after multiple unrelated recommendations.
4. **Why it harms users:** The real profile facts are diluted and the conversion action arrives after misleading content.
5. **Exact recommended change:** Remove false skeletons, place trust and availability near the profile summary, and keep one clear CTA visible without covering content.
6. **Implementation notes:** A non-fixed CTA near the top plus repeated final CTA is sufficient.
7. **Expected impact:** Faster profile evaluation and stronger contact conversion.

### R3. Tablet navigation is too close to its capacity

1. **Severity:** Medium
2. **Affected:** `CategoryNav` at 768px
3. **What is wrong:** At the exact `md` breakpoint, logo, four links, sign-in, and register fill nearly the full width. Longer localized labels or authenticated state will overflow.
4. **Why it harms users:** Small content changes can break the header at a common tablet width.
5. **Exact recommended change:** Keep the mobile menu through the `lg` breakpoint or reduce visible tablet links to the two primary paths.
6. **Implementation notes:** Search already waits until `lg`; navigation density should follow the same breakpoint.
7. **Expected impact:** More resilient tablet navigation.

## Copy improvements

### CP1. Language switches mid-thought without a controlled voice

1. **Severity:** Medium
2. **Affected:** Homepage, auth, jobs, categories, talent, FAQ, contact
3. **What is wrong:** Copy mixes formal English, Malay, and colloquial Manglish unpredictably: “Post What You Need,” “verified dekat kawasan kau,” “Register,” and “Sedang dalam perjalanan.”
4. **Why it harms users:** It feels unedited and creates different levels of formality across one journey.
5. **Exact recommended change:** Choose a primary voice: friendly Bahasa Malaysia with familiar English marketplace terms, then document which terms remain English.
6. **Implementation notes:** Keep audience-appropriate colloquial phrases in marketing headlines; use plain, formal language for payment, errors, verification, and legal content.
7. **Expected impact:** Stronger brand personality and comprehension.

### CP2. The trust headline contains a nonsensical phrase

1. **Severity:** High
2. **Affected:** Homepage trust section
3. **What is wrong:** “Dibina untuk kurangkan ghosting, scam, dan hirup tenung” does not communicate a recognizable user risk.
4. **Why it harms users:** A trust section with confusing copy damages credibility at the exact point it should reduce anxiety.
5. **Exact recommended change:** Use “Dibina untuk kurangkan ghosting, scam, dan harga tak telus.”
6. **Implementation notes:** Follow with concrete protections, not abstract claims.
7. **Expected impact:** Clearer trust value proposition.

### CP3. Empty states are generic instead of actionable

1. **Severity:** Medium
2. **Affected:** Jobs, categories, portfolio, dashboards
3. **What is wrong:** “No jobs found” and “No projects yet” do not distinguish filters, new marketplace inventory, service failure, or a new user.
4. **Why it harms users:** Users do not know whether to retry, clear filters, create supply, or return later.
5. **Exact recommended change:** Name the cause where known and offer one primary recovery action.
6. **Implementation notes:** Never use a zero-inventory message for a database outage.
7. **Expected impact:** Better recovery and fewer dead ends.

### Recommended rewrites

- Hero subhead: **“Cari pekerja yang telah disahkan, dekat kawasan anda.”**
- Hero support: **“Cari servis, banding profil dan portfolio, kemudian bayar melalui escrow selepas kerja diluluskan.”**
- Client CTA: **“Teroka servis”**
- Talent CTA: **“Daftar sebagai freelancer”**
- Trust headline: **“Kurangkan ghosting, scam dan harga tak telus.”**
- Category empty state: **“Belum ada kerja aktif dalam kategori ini. Lihat talent yang tersedia atau post kerja percuma.”**
- Portfolio empty state: **“Belum ada projek dimuat naik. Semak kemahiran dan pengesahan, kemudian post kerja untuk berbincang.”**
- Contact fallback: **“Buka aplikasi e-mel untuk hantar mesej kepada support@upahje.my.”**

## Technical cleanup

### T1. Dynamic Tailwind class construction is fragile

1. **Severity:** High
2. **Affected:** `TalentProfilePreview`
3. **What is wrong:** Classes such as `bg-${accent}-50` and `text-${accent}-800` cannot be reliably detected by Tailwind’s static scanner.
4. **Why it harms users:** Production builds can silently omit styling that appeared during development.
5. **Exact recommended change:** Use explicit class maps for labour, photography, and technical variants.
6. **Implementation notes:** Include photography as a first-class track rather than treating every non-labour profile as technical.
7. **Expected impact:** Stable production styling and correct profile labels.

### T2. Multiple components implement the same primitives differently

1. **Severity:** Medium
2. **Affected:** Buttons, inputs, cards, badges, alerts across app/components
3. **What is wrong:** Auth, jobs, dashboard, category, and AI routes each hand-code controls with different radius, disabled style, focus style, and typography.
4. **Why it harms users:** States and expectations change between screens.
5. **Exact recommended change:** Create shared `Button`, `Field`, `Card`, `Badge`, `Alert`, and `EmptyState` primitives using semantic variants.
6. **Implementation notes:** Start with marketplace routes; the AI prototype can migrate separately.
7. **Expected impact:** Fewer regressions and faster consistent delivery.

### T3. Nested landmark elements reduce semantic clarity

1. **Severity:** Medium
2. **Affected:** Root layout, job post, onboarding, AI tasks, matches, dashboard layouts
3. **What is wrong:** The root layout renders `<main>` around pages that sometimes render their own `<main>`. Runtime inspection found two main landmarks on `/jobs/post` and `/onboarding`.
4. **Why it harms users:** Multiple nested mains make screen-reader landmark navigation ambiguous.
5. **Exact recommended change:** Keep exactly one main landmark per rendered page.
6. **Implementation notes:** Use `<section>` or `<div>` inside the root main unless a nested route owns the document landmark.
7. **Expected impact:** Cleaner assistive navigation.

### T4. There is no route-level recovery system

1. **Severity:** High
2. **Affected:** Entire App Router tree
3. **What is wrong:** No custom loading, error, or not-found boundaries existed at audit start. The Prisma failure rendered a blank/error document and missing links showed generic Next.js 404.
4. **Why it harms users:** Failures look like product abandonment and provide no safe next action.
5. **Exact recommended change:** Add branded global 404/error recovery and route-specific boundaries for data-heavy flows.
6. **Implementation notes:** Log technical detail server-side; show plain recovery copy to users.
7. **Expected impact:** Better resilience and lower abandonment during transient failures.

## The 10 highest-priority fixes

1. Replace the mock/client-authoritative payment flow with agreement-backed server amounts; keep it gated meanwhile.
2. Separate application submission from employer acceptance; never auto-match the first applicant.
3. Repair job fallback schema, disclosure, and detail resolution.
4. Replace fake contact confirmation with real delivery or transparent email handoff.
5. Make authenticated dashboard navigation responsive and remove duplicate headers.
6. Add global error/not-found recovery and remove links to missing routes.
7. Remove the blocking intro and content-hiding animation behavior.
8. Unify category/talent detail pages with the marketplace design system.
9. Fix form labels, live error announcements, focus visibility, and contrast.
10. Feature-gate or clearly label UpahJe.Ai as a prototype until its flows persist real data.

## Quick wins

- Use white text on brand-green buttons.
- Darken the muted text token.
- Add a global focus-visible outline and reduced-motion rule.
- Add labels to both global search fields.
- Add `aria-expanded` and a 44px target to the mobile menu.
- Change the homepage process grid from four columns to three.
- Replace “hirup tenung” with “harga tak telus.”
- Make testimonial avatars deterministic.
- Point payment support to `/contact`.
- Remove or label the `/admin/jobs` link until implemented.
- Stop rendering skeletons when portfolio data is known to be empty.
- Add a branded 404 page.

## Deeper redesign list

- Rebuild payment around accepted proposals, fee disclosure, escrow milestones, disputes, and receipts.
- Consolidate dashboard information architecture and implement all role navigation destinations.
- Establish a real messaging/contact flow between employer and talent.
- Replace demo marketplace inventory with seeded beta data clearly separated from live jobs.
- Create one marketplace component library and migrate the remaining palette/radius variants.
- Decide whether UpahJe.Ai is a sister product, experiment, or product area; give it an explicit shell and release status.
- Build real portfolio upload/management, then restore portfolio-led profile layouts.
- Add authenticated browser testing for employer, talent, and admin states.

## Suggested design-system rules

### Color

- **Brand 700:** `#166345` — primary actions, links, selected controls.
- **Brand 900:** `#0a2a12` — dark bands and high-emphasis headings.
- **Brand 100:** `#e8f5e0` — selected/positive surfaces.
- **Canvas:** `#ffffff`.
- **Canvas soft:** `#f8faf8` or existing `#f9f9f9`.
- **Text:** `#0e0f0c`.
- **Body:** `#454745`.
- **Muted:** `#666966` minimum for normal text on white.
- **Border:** `rgba(14,15,12,.10)`.
- **Focus:** `#14b8a6`, 3px outline with 3px offset.
- Teal is reserved for verification/security. Amber is reserved for warning/attention. Purple belongs only to an explicitly separated AI product.

### Typography scale

| Token | Mobile | Desktop | Line height | Weight |
|---|---:|---:|---:|---:|
| Display | 40px | 64px | 1.05 | 700 |
| H1 | 36px | 48px | 1.10 | 700 |
| H2 | 28px | 40px | 1.15 | 700 |
| H3 | 20px | 24px | 1.25 | 600 |
| Body large | 18px | 18px | 1.55 | 400 |
| Body | 16px | 16px | 1.55 | 400 |
| Small | 14px | 14px | 1.45 | 400/500 |
| Label | 12px | 12px | 1.35 | 600 |

Keep body lines between roughly 55 and 75 characters. Avoid 10px text for meaningful metadata.

### Spacing scale

Use a 4px base: **4, 8, 12, 16, 24, 32, 48, 64, 80**.  
Control height: **44px minimum**.  
Input/card internal padding: **12–16px / 20–24px**.  
Section spacing: **56–64px mobile, 80px desktop**.  
Content widths: **720px reading, 960px task flow, 1152–1280px marketplace grid**.

### Button hierarchy

- **Primary:** solid brand green, white text, one per decision cluster.
- **Secondary:** white/transparent, brand or dark border, dark text.
- **Tertiary:** text link with visible hover and focus; no floating shadow.
- **Danger:** red only for destructive actions; require confirmation for irreversible actions.
- **Disabled:** retain readable text, remove elevation, explain unmet requirements nearby.
- Full-pill buttons are for marketing CTAs. Form and dashboard controls use 12px radius.

### Component-state standards

Every interactive component should define:

- default, hover, active, focus-visible;
- disabled with reason where the requirement is not obvious;
- loading with stable dimensions and text;
- success confirmation tied to actual server acknowledgement;
- error copy with recovery action and `role="alert"`;
- empty state distinct from unavailable/offline state;
- keyboard operation and screen-reader name;
- reduced-motion behavior;
- minimum touch target.

## Page-by-page improvement plan

### Home

Remove intro blocking, keep content visible before intersection, correct CTA behavior, tighten mobile section spacing, use three process columns, replace weak trust copy, and disclose the early-marketplace nature of social proof.

### Navigation and footer

Use one shell per product, keep tablet on compact navigation, label search, add active-page indication, improve focus/touch targets, and increase low-opacity footer text contrast.

### Jobs index

Disclose preview data, normalize tracks/categories/rates, make quick-filter behavior real or remove inactive chips, and distinguish empty results from service unavailability.

### Job detail

Add data fallback/recovery, show a sample-listing banner, prevent applications to previews, and provide a clear return path. Add route-level error/loading states.

### Post job

Associate every label, use fieldset/legend for track/category, explain why submit is disabled, validate budget order, announce errors, and restore a pending draft after authentication.

### Categories index

Keep the current green/neutral grid, but clarify “coming soon” items as non-actionable or collect interest instead of linking to zero-inventory pages.

### Category detail

Replace black/amber styling with marketplace tokens, expose talent as the primary supply-side path, distinguish preview listings, and use the shared footer.

### Talent index

The expandable comparison model is useful. Add filters by category/location/availability, make the expanded action direct and stable, and use real image semantics instead of background-image avatars.

### Talent detail

Use the marketplace shell, correct photography labeling, remove false skeletons, show same-track recommendations, and make contact a real job/message path.

### Authentication

Retain the compact card. Add a visible selected role state with group semantics, password requirements/show control, live validation, consistent Malay/English terminology, and an implemented password-recovery route.

### Onboarding

Reduce nested-card density, expose semantic progress, replace browser alerts with inline recovery, validate each step, save draft state, and verify the complete employer/talent paths on mobile.

### Dashboard

Remove duplicate headers, implement a mobile nav, remove missing destinations, add service-failure states around Prisma reads, and test employer/talent/admin roles with realistic data.

### Contact/FAQ/legal

Connect contact delivery, keep FAQ `<details>` behavior, increase low-contrast small text, and ensure legal language matches actual escrow/payment behavior.

### Payment

Do not launch until the displayed job, payer, payee, agreed amount, fees, and escrow terms come from authoritative server state. Add confirmation, cancellation, receipt, retry, and support flows.

### Admin/KYC

Protect the page at the route boundary, make destructive verification decisions confirmable and auditable, add reject reasons, use responsive card/table behavior, and remove the missing Jobs destination.

### UpahJe.Ai

Treat as a separately released prototype. Remove the duplicate UpahJe.my shell, disclose mock data, validate steps, replace alerts, persist forms, and do not publish “Get Early Access” until it submits somewhere.

## Implementation completed in this review

The first implementation pass focused on high-impact changes that do not require inventing new business rules: removal of the blocking intro, visible-by-default content, navigation and form semantics, honest marketplace fallback data, working degraded states, brand unification, mobile dashboard navigation, payment gating, and server-authoritative payment status.

### Changed-file manifest

- `app/(app)/dashboard/layout.tsx` — removed the nested main landmark and reserved space for mobile navigation.
- `app/(app)/layout.tsx` — removed the duplicate authenticated navigation shell.
- `app/(onboarding)/onboarding/page.tsx` — removed a nested main landmark and corrected lint-breaking copy.
- `app/admin/page.tsx` — removed the link to the nonexistent admin jobs route.
- `app/ai/tasks/page.tsx` — removed a duplicate main landmark.
- `app/api/admin/kyc/route.ts` — marked cookie-dependent API rendering as dynamic.
- `app/api/auth/me/route.ts` — marked cookie-dependent API rendering as dynamic.
- `app/api/auth/role/route.ts` — marked cookie-dependent API rendering as dynamic.
- `app/api/escrow/hold/route.ts` — disabled unsafe direct escrow creation; verified payment callbacks are now the only hold path.
- `app/api/jobs/[jobId]/route.ts` — added resolvable, labeled preview-job responses.
- `app/api/jobs/[jobId]/apply/route.ts` — changed proposal submission from immediate job assignment to a deduplicated pending application.
- `app/api/jobs/route.ts` — centralized honest preview fallback data and preserved the submitted job track.
- `app/api/kyc/status/route.ts` — marked cookie-dependent API rendering as dynamic.
- `app/api/payments/create/route.ts` — gated payments by default, ignored client amounts, required a matched job and single server-owned amount, and blocked duplicate bills.
- `app/api/payments/status/route.ts` — added authenticated, server-authoritative payment status lookup.
- `app/auth/signin/page.tsx` — added accessible alert semantics.
- `app/auth/signup/page.tsx` — added role-group semantics, selected states, password requirements, and alert semantics.
- `app/categories/[slug]/page.tsx` — rebuilt the page in the shared brand system with supply, conversion, preview, empty, and related-category states.
- `app/contact/page.tsx` — replaced the false success message with an honest email handoff and labeled every field.
- `app/error.tsx` — added branded route recovery.
- `app/globals.css` — added visible focus, skip-link, contrast, touch-state, and reduced-motion rules; removed the intro visibility gate.
- `app/jobs/JobsPageClient.tsx` — disclosed preview data and announced changing result counts.
- `app/jobs/[jobId]/ApplySection.tsx` — persisted proposals through sign-in and added labeled/live validation feedback.
- `app/jobs/[jobId]/matches/page.tsx` — removed a nested main landmark.
- `app/jobs/[jobId]/page.tsx` — added preview resolution, service-outage recovery, and safe non-applicable preview states.
- `app/jobs/post/PostJobForm.tsx` — added draft recovery, group semantics, budget validation, labels, and disabled-state guidance.
- `app/jobs/post/page.tsx` — removed a nested main landmark.
- `app/layout.tsx` — removed the blocking intro, added the skip link, and established one root main landmark.
- `app/not-found.tsx` — added a branded 404 recovery page.
- `app/page.tsx` — corrected the process grid, deterministic avatars, stats, trust copy, and key Malay copy.
- `app/pay/[jobId]/page.tsx` — removed the fabricated job/amount/customer flow and replaced it with an explicit payment-unavailable state.
- `app/payment/status/page.tsx` — stopped trusting URL success/amount parameters and now confirms status through the authenticated API.
- `app/talent/[slug]/page.tsx` — rebuilt the profile in the shared brand with accurate track, verification, empty portfolio, and comparable talent states.
- `components/jobs/JobFilters.tsx` — labeled controls, added expanded/pressed semantics, and removed nonfunctional quick filters.
- `components/layout/Footer.tsx` — increased low-contrast text and link visibility.
- `components/layout/Sidebar.tsx` — removed dead destinations and added role-aware desktop and mobile navigation.
- `components/motion/FadeUp.tsx` — made content visible before intersection and respected reduced motion.
- `components/motion/Stagger.tsx` — made staggered content visible before intersection and respected reduced motion.
- `components/navigation/CategoryNav.tsx` — added active states, labels, keyboard/mobile-menu semantics, touch targets, and route-change closing.
- `components/onboarding/MyKadUpload.tsx` — corrected lint-breaking copy.
- `components/onboarding/employer/EmployerOnboardingSimple.tsx` — corrected lint-breaking copy.
- `components/onboarding/shared/TalentProfilePreview.tsx` — replaced fragile dynamic classes and added first-class photography metadata and safer links.
- `components/portfolio/PortfolioGrid.tsx` — separated loading from empty state and added filter semantics.
- `components/talent/ExpandableTalentCard.tsx` — added an accessible avatar name.
- `components/ui/HeroNew.tsx` — strengthened the proposition, labeled search, and converted dead actions into real links.
- `lib/payments.ts` — separated Ringgit storage from Billplz sen values and made successful callbacks idempotent.
- `lib/sampleJobs.ts` — added schema-correct, centralized preview listings.
- `.eslintrc.json` — added a Next.js-compatible lint configuration.
- `eslint.config.mjs` — removed the incompatible ESLint 9 flat config from this ESLint 8 project.
- `docs/UI-UX-AUDIT-2026-07-24.md` — records this audit, recommendations, implementation manifest, and remaining work.

### Validation result

- `npm run lint` passes with four existing `@next/next/no-img-element` warnings in photography components.
- `npx tsc --noEmit` passes.
- `npm run build` passes and completes static generation for every listed application/API route.
- Rendered checks at 390, 768, 1440, and 1920 pixels found no horizontal page overflow on the tested public routes.
- Targeted probes confirm the payment-unavailable page returns 200, charge creation returns 503 while payments are disabled, direct escrow hold returns 410, and unauthenticated payment status returns 401.
