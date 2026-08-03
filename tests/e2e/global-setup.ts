export default async function globalSetup() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return
  // Resolve once so the OS resolver caches the Cloudflare-backed host before
  // the browser and dev server hammer it during parallel auth calls.
  await fetch(`${url}/auth/v1/health`, {
    headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '' },
  }).catch(() => {})
}
