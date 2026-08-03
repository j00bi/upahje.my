-- UpahJe.my auth helper functions
--
-- Adds the auth.uid() based helper used by the M3 closeout RLS policies.
-- The earlier security baseline used email-based checks; these helpers let
-- policies switch to the identity invariant (Supabase auth user ID === local
-- User.id) going forward.

begin;

create or replace function public.upahje_current_user_id()
returns text
language sql
stable
as $$
  select auth.uid()::text
$$;

commit;
