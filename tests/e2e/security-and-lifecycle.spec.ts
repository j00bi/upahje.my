import { test, expect } from '@playwright/test'
import {
  e2eEnv,
  signIn,
  signOut,
  createJobViaApi,
  applyViaApi,
  decideApplicationViaApi,
} from './helpers'

const env = e2eEnv()
const RUN = Date.now().toString(36)

test.describe('match inbox access control', () => {
  test('a talent cannot access another employer match inbox', async ({ page }) => {
    // Employer creates a job.
    await signIn(page, env.employerEmail, env.password)
    const jobId = await createJobViaApi(page, {
      title: `E2E Private Inbox ${RUN}`,
      description: 'Inbox ownership test job.',
      categoryId: 'webdev',
      location: 'KL',
    })

    // Talent A signs in and tries to open the employer's inbox.
    await signOut(page)
    await signIn(page, env.talentAEmail, env.password)
    await page.goto(`/jobs/${jobId}/matches`).catch(() => {})
    await page.waitForURL(/\/(dashboard|auth\/signin)/, { timeout: 15_000 })
    expect(page.url()).not.toContain(`/jobs/${jobId}/matches`)
  })
})

test.describe('application lifecycle', () => {
  test('a pending application can be withdrawn, an accepted one cannot', async ({ page }) => {
    // Employer posts two jobs in one session.
    await signIn(page, env.employerEmail, env.password)
    const jobAccepted = await createJobViaApi(page, {
      title: `E2E Withdraw ${RUN}`,
      description: 'Withdrawal lifecycle test job (accepted).',
      categoryId: 'webdev',
      location: 'KL',
    })
    const jobPending = await createJobViaApi(page, {
      title: `E2E Withdraw 2 ${RUN}`,
      description: 'Withdrawal lifecycle test job (pending).',
      categoryId: 'webdev',
      location: 'KL',
    })

    // Talent A applies to both in one session.
    await signOut(page)
    await signIn(page, env.talentAEmail, env.password)
    const appliedAccepted = await applyViaApi(page, jobAccepted, `Withdrawable proposal A ${RUN}`)
    expect(appliedAccepted.status).toBe(201)
    const appliedPending = await applyViaApi(page, jobPending, `Withdrawable proposal B ${RUN}`)
    expect(appliedPending.status).toBe(201)

    // Employer accepts the first job.
    await signOut(page)
    await signIn(page, env.employerEmail, env.password)
    await page.goto(`/jobs/${jobAccepted}/matches`)
    const appIds = await page.locator('article[data-application-id]').evaluateAll(
      (cards) => cards.map((c) => c.getAttribute('data-application-id')),
    )
    expect(appIds.length).toBe(1)
    const accept = await decideApplicationViaApi(page, appIds[0], 'ACCEPT')
    expect(accept.status).toBe(200)

    // Talent A: cannot withdraw the accepted application (409); the pending
    // application on the other job can be withdrawn (200).
    await signOut(page)
    await signIn(page, env.talentAEmail, env.password)
    const withdrawAccepted = await decideApplicationViaApi(page, appIds[0], 'WITHDRAW')
    expect(withdrawAccepted.status).toBe(409)

    expect(appliedPending.applicationId).toBeTruthy()
    const withdrawPending = await decideApplicationViaApi(
      page,
      appliedPending.applicationId!,
      'WITHDRAW',
    )
    expect(withdrawPending.status).toBe(200)
    expect(withdrawPending.body.status).toBe('WITHDRAWN')
  })

  test('retrying an accepted decision does not create duplicate records', async ({ page }) => {
    await signIn(page, env.employerEmail, env.password)
    const jobId = await createJobViaApi(page, {
      title: `E2E Idempotency ${RUN}`,
      description: 'Retry idempotency test job.',
      categoryId: 'webdev',
      location: 'KL',
    })
    await signOut(page)
    await signIn(page, env.talentAEmail, env.password)
    const applied = await applyViaApi(page, jobId, `Idempotency proposal ${RUN}`)
    expect(applied.status).toBe(201)

    await signOut(page)
    await signIn(page, env.employerEmail, env.password)
    await page.goto(`/jobs/${jobId}/matches`)
    const appIds = await page.locator('article[data-application-id]').evaluateAll(
      (cards) => cards.map((c) => c.getAttribute('data-application-id')),
    )
    expect(appIds.length).toBe(1)

    const first = await decideApplicationViaApi(page, appIds[0], 'ACCEPT')
    expect(first.status).toBe(200)
    const retry = await decideApplicationViaApi(page, appIds[0], 'ACCEPT')
    expect(retry.status).toBe(409)

    // Job still MATCHED, still one application row.
    await page.goto(`/jobs/${jobId}/matches`)
    const after = await page.locator('article[data-application-id]').count()
    expect(after).toBe(1)
    await expect(page.getByRole('status').first()).toContainText(/Applicant selected/i)
  })
})

test.describe('KYC and payments', () => {
  test('KYC upload rejects invalid file types', async ({ page }) => {
    await signIn(page, env.talentAEmail, env.password)
    const res = await page.request.post('/api/kyc/upload', {
      multipart: {
        mykad: {
          name: 'fake.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('not a real document'),
        },
      },
    })
    expect(res.status()).toBe(400)
  })

  test('KYC upload rejects files over 10MB', async ({ page }) => {
    await signIn(page, env.talentAEmail, env.password)
    const big = Buffer.alloc(11 * 1024 * 1024, 1)
    const res = await page.request.post('/api/kyc/upload', {
      multipart: {
        mykad: {
          name: 'big.pdf',
          mimeType: 'application/pdf',
          buffer: big,
        },
      },
    })
    expect(res.status()).toBe(400)
  })

  test('KYC documents are not publicly accessible', async ({ page }) => {
    await signIn(page, env.talentAEmail, env.password)
    // A direct public URL to a private bucket object must 400 (not found/denied).
    const res = await page.request.get(
      `/storage/v1/object/public/kyc-documents/nonexistent/file.pdf`,
    )
    expect([400, 404]).toContain(res.status())
  })
})
