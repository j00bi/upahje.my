/**
 * Identity repair report generator.
 *
 * Enforces the identity invariant:
 *   Supabase auth user ID === local User.id
 *
 * Queries the local User table and the Supabase auth.users endpoint, then
 * reports accounts where the Supabase auth UUID differs from the local
 * User.id that owns the same email. These accounts cannot sign in until
 * repaired. Read-only; never mutates user IDs.
 *
 * Usage (from repo root, with DATABASE_URL + service role exported):
 *   node scripts/identity-repair-report.mjs
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

async function listAuthUsers() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.')
    process.exit(1)
  }

  const users = []
  let page = 1
  let total = 0

  do {
    const res = await fetch(
      `${SUPABASE_URL}/auth/v1/admin/users?per_page=200&page=${page}`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      },
    )

    if (!res.ok) {
      console.error(`Auth API error (${res.status}): ${await res.text()}`)
      process.exit(1)
    }

    const body = await res.json()
    const batch = body.users ?? []
    users.push(...batch)
    total = body.total ?? batch.length
    page += 1
  } while (users.length < total)

  return users
}

async function main() {
  const [localUsers, authUsers] = await Promise.all([
    prisma.user.findMany({ select: { id: true, email: true, name: true, createdAt: true } }),
    listAuthUsers(),
  ])

  const byEmail = new Map()
  for (const u of localUsers) {
    if (!u.email) continue
    byEmail.set(u.email.toLowerCase(), u)
  }

  const conflicts = []

  for (const a of authUsers) {
    if (!a.email) continue
    const local = byEmail.get(a.email.toLowerCase())
    if (local && local.id !== a.id) {
      conflicts.push({
        email: a.email,
        supabaseUserId: a.id,
        localUserId: local.id,
        localName: local.name,
        createdAt: local.createdAt,
      })
    }
  }

  console.log(`Local users: ${localUsers.length}`)
  console.log(`Supabase auth users: ${authUsers.length}`)
  console.log(`Identity conflicts: ${conflicts.length}`)

  if (conflicts.length === 0) {
    console.log('No identity conflicts found.')
    await prisma.$disconnect()
    return
  }

  console.log('\nConflicting accounts (need manual repair):')
  for (const c of conflicts) {
    console.log(
      `- ${c.email}: supabase=${c.supabaseUserId} local=${c.localUserId}`,
    )
  }

  console.log('\nRepair steps (do NOT run automatically):')
  console.log(
    '1. Decide the canonical identity. If the local user predates Supabase, delete/replace the Supabase auth user and re-link the local User.id to a fresh Supabase UUID.',
  )
  console.log(
    '2. Otherwise, migrate local records from the old User.id to the Supabase UUID and delete the old local user.',
  )

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
