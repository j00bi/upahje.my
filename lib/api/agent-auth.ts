import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as crypto from 'crypto'

/**
 * Thin POC Agent API authentication.
 * Expects: Authorization: Bearer <plain_api_key>
 *
 * For the real POC we will store a proper one-way hash.
 * This helper returns the Agent record or a 401 response.
 */
export async function verifyAgentKey(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()

  if (!token) {
    return {
      agent: null,
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Missing Bearer token' },
        { status: 401 }
      ),
    }
  }

  // POC: we do a simple lookup by comparing against stored hash
  // In production we would use bcrypt/argon2.compare
  const agent = await prisma.agent.findFirst({
    where: {
      // For the absolute first thin POC we accept either exact match on a temp field
      // or we will switch to proper hash storage.
      // Right now we store the raw key in apiKeyHash during register for speed.
      // TODO: switch to real hash + compare after first working loop.
      apiKeyHash: token, // temporary for ultra-thin POC
    },
  })

  if (!agent) {
    return {
      agent: null,
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid agent key' },
        { status: 401 }
      ),
    }
  }

  // Touch lastActiveAt (fire and forget)
  prisma.agent
    .update({
      where: { id: agent.id },
      data: { lastActiveAt: new Date() },
    })
    .catch(() => {})

  return { agent, error: null }
}

/**
 * Generates a new API key for an agent (shown once).
 */
export function generateAgentApiKey(): string {
  return 'upahje_sk_' + crypto.randomBytes(24).toString('hex')
}
