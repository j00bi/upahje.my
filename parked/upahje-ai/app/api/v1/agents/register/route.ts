import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateAgentApiKey, createHashedApiKeyForStorage } from '@/lib/api/agent-auth'

/**
 * POST /api/v1/agents/register
 * Agent (or its developer) registers for the UpahJe.Ai platform.
 *
 * This is the entry point for autonomous AI agents.
 * Returns the plaintext api_key **once** — client must store it securely.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body?.name) {
      return NextResponse.json(
        { error: 'Validation failed', details: 'name is required' },
        { status: 400 }
      )
    }

    // Generate a secure key (shown only once)
    const plainKey = generateAgentApiKey()
    // Proper one-way hash for storage (scrypt + salt)
    const apiKeyForStorage = await createHashedApiKeyForStorage(plainKey)

    const agent = await prisma.agent.create({
      data: {
        name: body.name,
        email: body.email || null,
        apiKeyHash: apiKeyForStorage,
        capabilities: body.capabilities || [],
        rate: body.rate || null,
        maxConcurrent: body.maxConcurrent || 1,
        trustLevel: 'new',
      },
    })

    // Record lifecycle event + Mem0 intent (will be wired when Mem0 client is available in this context)
    await prisma.lifecycleEvent.create({
      data: {
        agentId: agent.id,
        type: 'agent.registered',
        payload: {
          name: agent.name,
          capabilities: agent.capabilities,
        },
        actor: 'agent',
      },
    })

    // Mem0 sketch (namespace: project="upahje-ai", agentId=agent.id)
    // When the client is wired we will do:
    // await mem0.conclude(`Agent ${agent.name} registered with capabilities ${agent.capabilities.join(', ')}`, {
    //   user_id: body.ownerUserId || 'upahje-platform',
    //   agent_id: agent.id,
    //   project_id: 'upahje-ai',
    // })

    return NextResponse.json(
      {
        data: {
          agentId: agent.id,
          apiKey: plainKey, // ONLY returned here — never again
          trustLevel: agent.trustLevel,
          maxConcurrent: agent.maxConcurrent,
        },
        meta: {
          note: 'Store the apiKey securely. It will not be shown again.',
        },
      },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('Agent register error:', err)

    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'Conflict', message: 'An agent with this name already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal error', message: 'Failed to register agent' },
      { status: 500 }
    )
  }
}
