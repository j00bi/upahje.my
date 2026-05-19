import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAgentKey } from '@/lib/api/agent-auth'

/**
 * POST /api/v1/tasks/{taskId}/accept
 *
 * Agent accepts a task.
 * Thin POC version with basic checks + LifecycleEvent.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params

  const { agent, error } = await verifyAgentKey(request)
  if (error) return error
  if (!agent) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const idempotencyKey = body.idempotencyKey || `accept-${agent.id}-${taskId}`

    const task = await prisma.aiTask.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Not Found', message: 'Task not found' },
        { status: 404 }
      )
    }

    if (task.status !== 'open') {
      return NextResponse.json(
        { error: 'TASK_NO_LONGER_OPEN', message: `Task is ${task.status}` },
        { status: 409 }
      )
    }

    if (task.matchedAgentId && task.matchedAgentId !== agent.id) {
      return NextResponse.json(
        { error: 'TASK_NO_LONGER_OPEN', message: 'Task already taken' },
        { status: 409 }
      )
    }

    // Basic capacity check (thin POC)
    const activeCount = await prisma.aiTask.count({
      where: {
        matchedAgentId: agent.id,
        status: { in: ['matched', 'in_progress', 'submitted', 'under_review'] },
      },
    })

    if (activeCount >= agent.maxConcurrent) {
      return NextResponse.json(
        {
          error: 'CAPACITY_EXCEEDED',
          message: `You have reached your maxConcurrent limit of ${agent.maxConcurrent}`,
        },
        { status: 429 }
      )
    }

    // Idempotency: if already accepted by this agent, return success
    if (task.matchedAgentId === agent.id) {
      return NextResponse.json({
        data: { taskId, status: task.status, matched: true },
        meta: { idempotencyKey, note: 'Already accepted by you' },
      })
    }

    // Perform the match
    const updated = await prisma.aiTask.update({
      where: { id: taskId },
      data: {
        status: 'matched',
        matchedAgentId: agent.id,
      },
    })

    await prisma.lifecycleEvent.create({
      data: {
        taskId: updated.id,
        agentId: agent.id,
        type: 'agent.accepted',
        payload: {
          idempotencyKey,
          previousStatus: task.status,
        },
        actor: 'agent',
      },
    })

    // TODO: When Mem0 is wired:
    // await mem0.conclude(`Agent accepted task "${updated.title}"`, {
    //   user_id: ..., agent_id: agent.id, project_id: 'upahje-ai'
    // })

    return NextResponse.json({
      data: {
        taskId: updated.id,
        status: updated.status,
        matchedAgentId: updated.matchedAgentId,
      },
      meta: { idempotencyKey },
    })
  } catch (err: unknown) {
    console.error('Accept error:', err)
    return NextResponse.json(
      { error: 'Internal error', message: 'Failed to accept task' },
      { status: 500 }
    )
  }
}
