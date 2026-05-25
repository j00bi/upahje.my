import { spawn } from 'node:child_process'

const DEFAULT_PORT = 3100
const port = Number(process.env.PORT || DEFAULT_PORT)
const providedBaseUrl = process.env.SMOKE_BASE_URL
const baseUrl = providedBaseUrl || `http://127.0.0.1:${port}`

const publicRoutes = [
  '/',
  '/jobs',
  '/categories',
  '/talent',
  '/auth/signin',
  '/auth/signup',
  '/contact',
  '/faq',
]

const protectedRoutes = [
  '/dashboard',
  '/dashboard/employer',
  '/dashboard/talent',
  '/dashboard/employer/applications',
  '/dashboard/employer/jobs',
  '/dashboard/talent/applications',
  '/jobs/post',
]

const unauthenticatedApiRoutes = [
  '/api/auth/me',
  '/api/auth/role',
  '/api/applications?role=talent',
  '/api/kyc/status',
]

let server
let serverExited = false
let serverExitCode = null

function startServer() {
  if (providedBaseUrl) return

  server = spawn(
    'npm',
    ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', String(port)],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PORT: String(port),
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  )

  server.stdout.on('data', (chunk) => {
    process.stdout.write(`[next] ${chunk}`)
  })

  server.stderr.on('data', (chunk) => {
    process.stderr.write(`[next] ${chunk}`)
  })

  server.on('exit', (code) => {
    serverExited = true
    serverExitCode = code
    if (code !== null && code !== 0) {
      console.error(`Next server exited with code ${code}`)
    }
  })
}

async function waitForServer() {
  const startedAt = Date.now()
  const timeoutMs = 30_000

  while (Date.now() - startedAt < timeoutMs) {
    if (serverExited) {
      throw new Error(`Next server exited before becoming ready with code ${serverExitCode}`)
    }

    try {
      const res = await fetch(`${baseUrl}/`, { redirect: 'manual' })
      if (res.status < 500) return
    } catch {
      // Keep waiting until Next is ready.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Timed out waiting for ${baseUrl}`)
}

async function assertStatus(path, expectedStatus) {
  const res = await fetch(`${baseUrl}${path}`, { redirect: 'manual' })
  if (res.status !== expectedStatus) {
    throw new Error(`${path} expected ${expectedStatus}, got ${res.status}`)
  }
  return res
}

async function assertPublicRoutes() {
  for (const path of publicRoutes) {
    await assertStatus(path, 200)
    console.log(`ok public ${path}`)
  }
}

async function assertProtectedRedirects() {
  for (const path of protectedRoutes) {
    const res = await fetch(`${baseUrl}${path}`, { redirect: 'manual' })
    const location = res.headers.get('location') || ''
    const redirectsToSignin =
      [302, 303, 307, 308].includes(res.status) && location.includes('/auth/signin')

    if (!redirectsToSignin) {
      throw new Error(
        `${path} expected sign-in redirect, got ${res.status} location=${location || '<none>'}`
      )
    }

    console.log(`ok protected ${path}`)
  }
}

async function assertUnauthenticatedApis() {
  for (const path of unauthenticatedApiRoutes) {
    await assertStatus(path, 401)
    console.log(`ok api ${path}`)
  }
}

async function main() {
  startServer()
  await waitForServer()
  await assertPublicRoutes()
  await assertProtectedRedirects()
  await assertUnauthenticatedApis()
  console.log(`route smoke passed at ${baseUrl}`)
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => {
    if (server) {
      server.kill('SIGTERM')
    }
  })
