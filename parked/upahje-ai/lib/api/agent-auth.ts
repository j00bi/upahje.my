import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as crypto from 'crypto'

const KEY_PREFIX = 'upahje_sk_'
const SCRYPT_KEYLEN = 64
const SCRYPT_COST = 2 ** 14   // reasonable for POC
const SCRYPT_BLOCK = 8
const SCRYPT_PARALLEL = 1

/**
 * Hash a plaintext API key using scrypt + salt.
 * Returns string in format: "salt:hash" (both hex)
 */
function hashApiKey(plainKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex')
    crypto.scrypt(
      plainKey,
      salt,
      SCRYPT_KEYLEN,
      { cost: SCRYPT_COST, blockSize: SCRYPT_BLOCK, parallelization: SCRYPT_PARALLEL },
      (err, derivedKey) => {
        if (err) return reject(err)
        resolve(`${salt}:${derivedKey.toString('hex')}`)
      }
    )
  })
}

/**
 * Constant-time comparison of two hex strings.
 */
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex')
  const bufB = Buffer.from(b, 'hex')
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

/**
 * Verify a plaintext token against a stored "salt:hash" value.
 */
function verifyHashedKey(plainKey: string, stored: string): Promise<boolean> {
  return new Promise((resolve) => {
    const [salt, hash] = stored.split(':')
    if (!salt || !hash) return resolve(false)

    crypto.scrypt(
      plainKey,
      salt,
      SCRYPT_KEYLEN,
      { cost: SCRYPT_COST, blockSize: SCRYPT_BLOCK, parallelization: SCRYPT_PARALLEL },
      (err, derivedKey) => {
        if (err) return resolve(false)
        resolve(safeCompare(derivedKey.toString('hex'), hash))
      }
    )
  })
}

/**
 * Thin POC Agent API authentication using proper one-way hashing.
 * Expects: Authorization: Bearer <plain_api_key>
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

  // For thin POC we scan agents (very small number expected).
  // In production we would add a keyPrefix column for O(1) lookup.
  const agents = await prisma.agent.findMany({
    select: { id: true, apiKeyHash: true, lastActiveAt: true },
  })

  let matchedAgent = null
  for (const a of agents) {
    if (a.apiKeyHash && (await verifyHashedKey(token, a.apiKeyHash))) {
      matchedAgent = a
      break
    }
  }

  if (!matchedAgent) {
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
      where: { id: matchedAgent.id },
      data: { lastActiveAt: new Date() },
    })
    .catch(() => {})

  // Re-fetch full agent for caller (lightweight)
  const agent = await prisma.agent.findUnique({ where: { id: matchedAgent.id } })
  return { agent, error: null }
}

/**
 * Generates a new API key for an agent (shown once).
 */
export function generateAgentApiKey(): string {
  return KEY_PREFIX + crypto.randomBytes(24).toString('hex')
}

/**
 * Hash + store ready value for the Agent.apiKeyHash column.
 * Call this in register route.
 */
export async function createHashedApiKeyForStorage(plainKey: string): Promise<string> {
  return hashApiKey(plainKey)
}
