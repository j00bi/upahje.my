import { expect, type Page } from '@playwright/test'

export function e2eEnv() {
  const env = {
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
    employerEmail: process.env.E2E_EMPLOYER_EMAIL || '',
    talentAEmail: process.env.E2E_TALENT_A_EMAIL || '',
    talentBEmail: process.env.E2E_TALENT_B_EMAIL || '',
    adminEmail: process.env.E2E_ADMIN_EMAIL || '',
    password: process.env.E2E_PASSWORD || '',
  }
  const missing = Object.entries(env)
    .filter(([, v]) => !v)
    .map(([k]) => k)
  if (missing.length > 0) {
    throw new Error(`Missing E2E env: ${missing.join(', ')}`)
  }
  return env
}

export async function signIn(page: Page, email: string, password: string) {
  // The Supabase auth endpoint is behind Cloudflare and occasionally drops
  // connections; retry the whole sign-in a few times before failing.
  for (let attempt = 1; attempt <= 3; attempt++) {
    await page.goto('/auth/signin')
    // The page defaults to Malay; accept either language label.
    const emailInput = page.getByLabel(/email address|alamat e-mel/i)
    const passwordInput = page.getByLabel(/password|kata laluan/i)
    await emailInput.fill(email)
    await passwordInput.fill(password)
    await page.getByRole('button', { name: /sign in|log masuk/i }).click()
    try {
      // auth/complete redirects to dashboard
      await page.waitForURL(/\/(dashboard|onboarding|admin)/, { timeout: 45_000 })
      // Settle auth cookies so Playwright's page.request context sees them.
      await page.reload().catch(() => {})
      await page.waitForLoadState('domcontentloaded').catch(() => {})
      return
    } catch (err) {
      if (attempt === 3) throw err
      // Transient network failure; wipe and retry.
      await page.context().clearCookies()
      await page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
    }
  }
}

export async function signOut(page: Page) {
  // The Supabase SSR session lives entirely in a cookie named
  // sb-<ref>-auth-token. Clear every cookie and any residual storage, then
  // force a fresh navigation so no cached authenticated shell is reused.
  await page.context().clearCookies()
  await page.evaluate(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
  await page.goto('/').catch(() => {})
  await page.goto('/auth/signin').catch(() => {})
  await page.waitForLoadState('domcontentloaded').catch(() => {})
}

export async function expectUnauthenticated(page: Page, path: string) {
  await page.goto(path).catch(() => {})
  await page.waitForURL(/\/auth\/signin/, { timeout: 15_000 })
}

export async function createJobViaApi(page: Page, {
  title,
  description,
  categoryId,
  location,
}: {
  title: string
  description: string
  categoryId: string
  location: string
}) {
  let lastError: unknown
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await page.request.post('/api/jobs', {
        data: {
          title,
          description,
          rateMin: '100',
          rateMax: '200',
          location,
          track: 'TECHNICAL',
          categoryId,
        },
      })
      expect(res.status()).toBe(200)
      const body = await res.json()
      return body.jobId as string
    } catch (err) {
      lastError = err
      if (attempt === 3) throw err
      await page.waitForTimeout(1_000)
    }
  }
  throw lastError
}

export async function applyViaApi(page: Page, jobId: string, proposal: string) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await page.request.post(`/api/jobs/${jobId}/apply`, {
        data: { proposal },
      })
      const body = await res.json()
      return { status: res.status(), body, applicationId: body.application?.id as string | undefined }
    } catch (err) {
      if (attempt === 3) throw err
      await page.waitForTimeout(1_000)
    }
  }
  throw new Error('applyViaApi failed')
}

export async function decideApplicationViaApi(
  page: Page,
  applicationId: string,
  action: 'ACCEPT' | 'REJECT' | 'WITHDRAW',
) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await page.request.patch(`/api/applications/${applicationId}`, {
        data: { action },
      })
      return { status: res.status(), body: await res.json() }
    } catch (err) {
      if (attempt === 3) throw err
      await page.waitForTimeout(1_000)
    }
  }
  throw new Error('decideApplicationViaApi failed')
}

export async function fetchJobApplicationsViaApi(page: Page, jobId: string) {
  const res = await page.request.get(`/api/jobs/${jobId}`)
  expect(res.status()).toBe(200)
  const job = await res.json()
  return job
}
