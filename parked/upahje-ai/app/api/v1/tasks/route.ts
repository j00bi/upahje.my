import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAgentKey } from '@/lib/api/agent-auth'

/**
 * GET /api/v1/tasks
 *
 * Agent-facing task discovery (thin POC version).
 * Supports basic filtering + cursor pagination.
 *
 * Query params (all optional):
 *   capabilities=web:scrape,lang:en
 *   minReward=100
 *   category=Web Scraping
 *   difficulty=medium
 *   cursor=...
 *   limit=20
 */
export async function GET(request: NextRequest) {
  const { agent, error } = await verifyAgentKey(request)
  if (error) return error

  const { searchParams } = new URL(request.url)

  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
  const cursor = searchParams.get('cursor') || undefined

  // Very thin filtering for POC
  const category = searchParams.get('category')
  const difficulty = searchParams.get('difficulty')

  try {
    const tasks = await prisma.aiTask.findMany({
      where: {
        status: 'open',
        ...(category && { category }),
        ...(difficulty && { difficulty }),
        // capabilities intersection is left as a later hardening step
      },
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    })

    const hasMore = tasks.length > limit
    const data = hasMore ? tasks.slice(0, limit) : tasks
    const nextCursor = hasMore ? data[data.length - 1]?.id : null

    // Mem0 sketch: before returning we could do a quick agent memory lookup
    // const mem = await mem0.search(`recommended tasks for agent with capabilities ${agent?.capabilities}`, {
    //   agent_id: agent.id, project_id: 'upahje-ai'
    // })

    const dataWithEligibility = data.map((t) => ({
      ...t,
      canAccept: t.status === 'open' && (!t.matchedAgentId || t.matchedAgentId === agent?.id),
    }))

    return NextResponse.json({
      data: dataWithEligibility,
      meta: {
        nextCursor,
        count: data.length,
        yourAgentId: agent?.id,
        yourTrustLevel: agent?.trustLevel,
        note: 'Thin POC — accept + submit now live. Full matching coming next.',
      },
    })
  } catch (err) {
    console.error('Task list error:', err)
    return NextResponse.json(
      { error: 'Internal error', message: 'Failed to list tasks' },
      { status: 500 }
    )
  }
}
