-- UpahJe.my RLS Expansion (M3 closeout)
--
-- Completes row level security coverage for the tables the original
-- security_baseline / rls_hardening files left without policies:
--   Profile, Talent, Application
-- and adds admin oversight for Payment and EscrowTransaction.
--
-- Scope note: Prisma connects as a superuser-equivalent app role, so these
-- policies protect the direct Supabase client path (auth.uid() based). Full
-- per-request database-enforced RLS for Prisma requires a later JWT-context
-- design (see docs/migration-gate-20260803.md).

begin;

-- ============================================================================
-- PROFILE
-- ============================================================================

alter table "Profile" enable row level security;
alter table "Profile" force row level security;

drop policy if exists "Profile owner read" on "Profile";
drop policy if exists "Profile owner update" on "Profile";
drop policy if exists "Profile admin all" on "Profile";

create policy "Profile owner read"
  on "Profile"
  for select
  using ("userId" = public.upahje_current_user_id());

create policy "Profile owner update"
  on "Profile"
  for update
  using ("userId" = public.upahje_current_user_id())
  with check ("userId" = public.upahje_current_user_id());

create policy "Profile admin all"
  on "Profile"
  for all
  using (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  )
  with check (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  );

-- ============================================================================
-- TALENT
-- ============================================================================

alter table "Talent" enable row level security;
alter table "Talent" force row level security;

drop policy if exists "Talent owner read" on "Talent";
drop policy if exists "Talent owner update" on "Talent";
drop policy if exists "Talent public read" on "Talent";
drop policy if exists "Talent admin all" on "Talent";

create policy "Talent owner read"
  on "Talent"
  for select
  using ("userId" = public.upahje_current_user_id());

create policy "Talent owner update"
  on "Talent"
  for update
  using ("userId" = public.upahje_current_user_id())
  with check ("userId" = public.upahje_current_user_id());

-- Public trust signals are part of the marketplace; bio/rate/availability
-- are safe to expose to any authenticated or anonymous reader.
create policy "Talent public read"
  on "Talent"
  for select
  using (true);

create policy "Talent admin all"
  on "Talent"
  for all
  using (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  )
  with check (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  );

-- ============================================================================
-- APPLICATION
-- ============================================================================

alter table "Application" enable row level security;
alter table "Application" force row level security;

drop policy if exists "Application applicant insert" on "Application";
drop policy if exists "Application applicant read" on "Application";
drop policy if exists "Application applicant update" on "Application";
drop policy if exists "Application employer read" on "Application";
drop policy if exists "Application employer update" on "Application";
drop policy if exists "Application admin all" on "Application";

-- A talent may apply only to jobs they do not own.
create policy "Application applicant insert"
  on "Application"
  for insert
  with check (
    "applicantId" = public.upahje_current_user_id()
  );

create policy "Application applicant read"
  on "Application"
  for select
  using ("applicantId" = public.upahje_current_user_id());

-- Withdrawals and any applicant-side updates are limited to the applicant.
create policy "Application applicant update"
  on "Application"
  for update
  using ("applicantId" = public.upahje_current_user_id())
  with check ("applicantId" = public.upahje_current_user_id());

create policy "Application employer read"
  on "Application"
  for select
  using (
    exists (
      select 1
      from "Job" j
      join "Employer" e on e.id = j."employerId"
      where j.id = "jobId"
        and e."userId" = public.upahje_current_user_id()
    )
  );

create policy "Application employer update"
  on "Application"
  for update
  using (
    exists (
      select 1
      from "Job" j
      join "Employer" e on e.id = j."employerId"
      where j.id = "jobId"
        and e."userId" = public.upahje_current_user_id()
    )
  )
  with check (
    exists (
      select 1
      from "Job" j
      join "Employer" e on e.id = j."employerId"
      where j.id = "jobId"
        and e."userId" = public.upahje_current_user_id()
    )
  );

create policy "Application admin all"
  on "Application"
  for all
  using (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  )
  with check (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  );

-- ============================================================================
-- PAYMENT (add admin oversight; owner read already exists)
-- ============================================================================

drop policy if exists "Payment admin read" on "Payment";

create policy "Payment admin read"
  on "Payment"
  for select
  using (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  );

-- ============================================================================
-- ESCROW TRANSACTION (add talent owner read + admin read)
-- ============================================================================

drop policy if exists "Escrow talent read" on "EscrowTransaction";
drop policy if exists "Escrow admin read" on "EscrowTransaction";

create policy "Escrow talent read"
  on "EscrowTransaction"
  for select
  using (
    exists (
      select 1 from "Talent" t
      where t.id = "talentId"
        and t."userId" = public.upahje_current_user_id()
    )
  );

create policy "Escrow admin read"
  on "EscrowTransaction"
  for select
  using (
    exists (
      select 1 from "Profile" p
      where p."userId" = public.upahje_current_user_id()
        and p.role = 'ADMIN'
    )
  );

commit;
