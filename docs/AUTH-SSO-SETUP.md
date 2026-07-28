# Authentication and Google SSO

UpahJe uses Supabase Auth for email/password accounts, email confirmation,
password recovery, and Google OAuth. The application does not read Google
client credentials directly.

## Required application variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-or-publishable-key>
NEXT_PUBLIC_SITE_URL=https://upahje.my
DATABASE_URL=<pooled-postgres-url>
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` can be used instead of
`NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Supabase URL configuration

In **Authentication → URL Configuration**:

- Set Site URL to `https://upahje.my`.
- Allow `https://upahje.my/auth/callback`.
- Allow `http://localhost:3000/auth/callback` for local development.
- Add explicit `www` or deployment-preview callback patterns only when those
  hosts are used.

Email templates must preserve the requested redirect URL. This is required for
confirmation and password-recovery links to return through
`/auth/callback`.

## Google provider

1. Create a Google OAuth client with application type **Web application**.
2. Add `https://upahje.my` and the local origin used for development as
   authorized JavaScript origins.
3. Add the Supabase callback shown on the Supabase Google provider page as the
   Google authorized redirect URI:
   `https://<project-ref>.supabase.co/auth/v1/callback`.
4. Enter the Google client ID and secret in
   **Supabase → Authentication → Providers → Google**, then enable the provider.

The Google redirect URI is the Supabase callback, not UpahJe's
`/auth/callback`. Supabase returns the user to the application after it
processes the Google response.

## Acceptance checks

- Email signup with confirmation enabled and disabled, for both roles.
- Confirmation resend and password reset.
- Google signup for employer and talent.
- Google login for an existing email/password account.
- Incomplete users resume role-prefilled onboarding.
- Completed users resume the requested internal page.
- External, protocol-relative, and backslash-based redirect attempts fall back
  to the dashboard.
- Signing out followed by opening a protected page returns to sign-in.

## Current environment note

On 2026-07-28, the Supabase hostname configured in the local environment did
not resolve. Code, build, and local route checks pass, but a real email/Google
round-trip requires restoring that Supabase project or updating the project
URL and keys.

References:

- https://supabase.com/docs/guides/auth/social-login/auth-google
- https://supabase.com/docs/guides/auth/redirect-urls
