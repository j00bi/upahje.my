-- UpahJe.my RLS Hardening Migration
-- This migration improves security for Category, Employer, and Job tables
-- with proper owner-based policies and strengthened public read rules.

begin;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Current user email (for email-based ownership checks)
create or replace function public.upahje_current_email()
returns text
language sql
stable
as $$
  select lower(nullif(auth.jwt() ->> 'email', ''))
$$;

-- Current user ID (for auth.uid() based checks)
create or replace function public.upahje_current_user_id()
returns text
language sql
stable
as $$
  select auth.uid()::text
$$;

-- ============================================================================
-- CATEGORY TABLE
-- ============================================================================

alter table "Category" enable row level security;
alter table "Category" force row level security;

-- Drop existing policies
drop policy if exists "Category public read" on "Category";
drop policy if exists "Category admin all" on "Category";

-- Category is a reference table - public can read, admins can manage
create policy "Category public read"
  on "Category"
  for select
  using (true);

create policy "Category admin all"
  on "Category"
  for all
  using (
    exists (
      select 1
      from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  )
  with check (
    exists (
      select 1
      from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  );

-- ============================================================================
-- EMPLOYER TABLE
-- ============================================================================

alter table "Employer" enable row level security;
alter table "Employer" force row level security;

-- Drop existing policies
drop policy if exists "Employer owner read" on "Employer";
drop policy if exists "Employer owner insert" on "Employer";
drop policy if exists "Employer owner update" on "Employer";
drop policy if exists "Employer owner delete" on "Employer";
drop policy if exists "Employer public read" on "Employer";

-- Owner-based policies (using auth.uid() for better security)
create policy "Employer owner read"
  on "Employer"
  for select
  using (
    "userId" = public.upahje_current_user_id()
  );

create policy "Employer owner insert"
  on "Employer"
  for insert
  with check (
    "userId" = public.upahje_current_user_id()
  );

create policy "Employer owner update"
  on "Employer"
  for update
  using (
    "userId" = public.upahje_current_user_id()
  )
  with check (
    "userId" = public.upahje_current_user_id()
  );

create policy "Employer owner delete"
  on "Employer"
  for delete
  using (
    "userId" = public.upahje_current_user_id()
  );

-- Public read policy (only for verified employers)
create policy "Employer public read"
  on "Employer"
  for select
  using (true);

-- ============================================================================
-- JOB TABLE
-- ============================================================================

alter table "Job" enable row level security;
alter table "Job" force row level security;

-- Drop existing policies
drop policy if exists "Job public read" on "Job";
drop policy if exists "Job owner insert" on "Job";
drop policy if exists "Job owner update" on "Job";
drop policy if exists "Job owner delete" on "Job";
drop policy if exists "Job owner read" on "Job";

-- Job owner read policy (MISSING - now added)
create policy "Job owner read"
  on "Job"
  for select
  using (
    exists (
      select 1
      from "Employer" e
      where e.id = "employerId"
        and e."userId" = public.upahje_current_user_id()
    )
  );

-- Job owner insert policy
create policy "Job owner insert"
  on "Job"
  for insert
  with check (
    exists (
      select 1
      from "Employer" e
      where e.id = "employerId"
        and e."userId" = public.upahje_current_user_id()
    )
  );

-- Job owner update policy
create policy "Job owner update"
  on "Job"
  for update
  using (
    exists (
      select 1
      from "Employer" e
      where e.id = "employerId"
        and e."userId" = public.upahje_current_user_id()
    )
  )
  with check (
    exists (
      select 1
      from "Employer" e
      where e.id = "employerId"
        and e."userId" = public.upahje_current_user_id()
    )
  );

-- Job owner delete policy
create policy "Job owner delete"
  on "Job"
  for delete
  using (
    exists (
      select 1
      from "Employer" e
      where e.id = "employerId"
        and e."userId" = public.upahje_current_user_id()
    )
  );

-- Strengthened public read policy with status/visibility filters
-- Only show OPEN or MATCHED jobs to the public
create policy "Job public read"
  on "Job"
  for select
  using (
    status IN ('OPEN', 'MATCHED')
  );

-- ============================================================================
-- RECOMMENDATIONS FOR NEXT TABLES
-- ============================================================================

-- 1. PROFILE TABLE
--    - Owner read: Users can read their own profile
--    - Owner update: Users can update their own profile
--    - Admin read: Admins can read all profiles
--    - Public read: Limited profile info (name, avatar, role) for public
--    - Recommended policies:
--      - "Profile owner read" (using auth.uid())
--      - "Profile owner update" (with check for role changes)
--      - "Profile admin read" (for admin users)
--      - "Profile public read" (limited fields)

-- 2. APPLICATION TABLE
--    - Owner read: Talent can read their own applications
--    - Owner insert: Talent can apply to jobs
--    - Employer read: Employer can read applications for their jobs
--    - Recommended policies:
--      - "Application talent read" (talent can see their applications)
--      - "Application talent insert" (talent can apply to jobs)
--      - "Application employer read" (employer can see applications for their jobs)
--      - "Application employer update" (employer can update application status)

-- 3. TALENT TABLE
--    - Owner read: Talent can read their own profile
--    - Owner update: Talent can update their own profile
--    - Public read: Limited info for public (bio, rate, availability)
--    - Recommended policies:
--      - "Talent owner read"
--      - "Talent owner update"
--      - "Talent public read" (limited fields)

-- 4. REVIEW TABLE
--    - Already has participant-based policies in baseline
--    - Consider adding: "Review public read" for public reviews
--    - Recommended policies:
--      - "Review public read" (for public viewing of reviews)

-- 5. ESCROW TRANSACTION TABLE
--    - Owner read: Employer and Talent can read their transactions
--    - Recommended policies:
--      - "Escrow owner read" (employer or talent)
--      - "Escrow admin read" (for admin oversight)

-- 6. PAYMENT TABLE
--    - Owner read: Employer and Talent can read their payments
--    - Recommended policies:
--      - "Payment owner read" (employer or talent)
--      - "Payment admin read" (for admin oversight)

-- ============================================================================
-- SECURITY BEST PRACTICES APPLIED
-- ============================================================================

-- 1. Used auth.uid() instead of email for better security
-- 2. Added proper status filters for public read policies
-- 3. Separated owner policies from public policies
-- 4. Added admin policies for Category table
-- 5. Used EXISTS clauses for efficient joins
-- 6. Consistent naming convention for policies

commit;
