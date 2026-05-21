import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAgentKey } from '@/lib/api/agent-auth'

/**
 * GET /api/v1/tasks/{taskId}
 * Returns full task details + whether the current agent can accept it.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params

  const { agent } = await verifyAgentKey(request) // still verifies key if present, but allows unauthed for now

  const task = await prisma.aiTask.findUnique({
    where: { id: taskId },
    include: {
      submissions: {
        orderBy: { submittedAt: 'desc' },
        take: 5,
      },
    },
  })

  if (!task) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  const canAccept =
    task.status === 'open' &&
    (!task.matchedAgentId || task.matchedAgentId === agent?.id)

  return NextResponse.json({
    data: {
      ...task,
      canAccept,
      yourAgentId: agent?.id || null,
    },
  })
}
