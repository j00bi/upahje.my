-- UpahJe.my security baseline for the existing Supabase project.
--
-- This file is staged for the current mixed-auth app. The codebase still mixes
-- Prisma/NextAuth on the server with Supabase auth in browser flows, so these
-- policies use email-based ownership checks as the temporary bridge.
--
-- Replace the email checks below with auth.uid()-based policies once the app
-- stores a shared auth identifier on the app tables.

begin;

create or replace function public.upahje_current_email()
returns text
language sql
stable
as $$
  select lower(nullif(auth.jwt() ->> 'email', ''))
$$;

alter table "Category" enable row level security;
alter table "Category" force row level security;

drop policy if exists "Category public read" on "Category";
create policy "Category public read"
  on "Category"
  for select
  using (true);

alter table "Job" enable row level security;
alter table "Job" force row level security;

drop policy if exists "Job public read" on "Job";
create policy "Job public read"
  on "Job"
  for select
  using (true);

drop policy if exists "Job owner insert" on "Job";
create policy "Job owner insert"
  on "Job"
  for insert
  with check (
    exists (
      select 1
      from "Employer" e
      join "User" u on u.id = e."userId"
      where e.id = "employerId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

drop policy if exists "Job owner update" on "Job";
create policy "Job owner update"
  on "Job"
  for update
  using (
    exists (
      select 1
      from "Employer" e
      join "User" u on u.id = e."userId"
      where e.id = "employerId"
        and lower(u.email) = public.upahje_current_email()
    )
  )
  with check (
    exists (
      select 1
      from "Employer" e
      join "User" u on u.id = e."userId"
      where e.id = "employerId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

drop policy if exists "Job owner delete" on "Job";
create policy "Job owner delete"
  on "Job"
  for delete
  using (
    exists (
      select 1
      from "Employer" e
      join "User" u on u.id = e."userId"
      where e.id = "employerId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

alter table "Employer" enable row level security;
alter table "Employer" force row level security;

drop policy if exists "Employer owner read" on "Employer";
create policy "Employer owner read"
  on "Employer"
  for select
  using (
    exists (
      select 1
      from "User" u
      where u.id = "userId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

drop policy if exists "Employer owner insert" on "Employer";
create policy "Employer owner insert"
  on "Employer"
  for insert
  with check (
    exists (
      select 1
      from "User" u
      where u.id = "userId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

drop policy if exists "Employer owner update" on "Employer";
create policy "Employer owner update"
  on "Employer"
  for update
  using (
    exists (
      select 1
      from "User" u
      where u.id = "userId"
        and lower(u.email) = public.upahje_current_email()
    )
  )
  with check (
    exists (
      select 1
      from "User" u
      where u.id = "userId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

drop policy if exists "Employer owner delete" on "Employer";
create policy "Employer owner delete"
  on "Employer"
  for delete
  using (
    exists (
      select 1
      from "User" u
      where u.id = "userId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

alter table "Review" enable row level security;
alter table "Review" force row level security;

drop policy if exists "Review participants read" on "Review";
create policy "Review participants read"
  on "Review"
  for select
  using (
    exists (
      select 1
      from "User" u
      where u.id = "fromUserId"
        and lower(u.email) = public.upahje_current_email()
    )
    or exists (
      select 1
      from "User" u
      where u.id = "toUserId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

drop policy if exists "Review participants insert" on "Review";
create policy "Review participants insert"
  on "Review"
  for insert
  with check (
    exists (
      select 1
      from "User" u
      where u.id = "fromUserId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

alter table "EscrowTransaction" enable row level security;
alter table "EscrowTransaction" force row level security;

drop policy if exists "Escrow owner read" on "EscrowTransaction";
create policy "Escrow owner read"
  on "EscrowTransaction"
  for select
  using (
    exists (
      select 1
      from "Employer" e
      join "User" u on u.id = e."userId"
      where e.id = "employerId"
        and lower(u.email) = public.upahje_current_email()
    )
  );

alter table "Payment" enable row level security;
alter table "Payment" force row level security;

drop policy if exists "Payment owner read" on "Payment";
create policy "Payment owner read"
  on "Payment"
  for select
  using (
    lower("employerEmail") = public.upahje_current_email()
    or lower("talentEmail") = public.upahje_current_email()
  );

commit;
