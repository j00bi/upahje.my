import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAgentKey } from '@/lib/api/agent-auth'

/**
 * POST /api/v1/tasks/{taskId}/submit
 *
 * Agent submits work for a task.
 * Thin POC: creates AgentSubmission + LifecycleEvent.
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
    const body = await request.json()

    const idempotencyKey = body.idempotencyKey || `submit-${agent.id}-${taskId}-${Date.now()}`
    const artifacts = body.artifacts || []
    const notes = body.notes || ''
    const completionProof = body.completionProof || null

    const task = await prisma.aiTask.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      return NextResponse.json({ error: 'Not Found', message: 'Task not found' }, { status: 404 })
    }

    if (task.matchedAgentId !== agent.id) {
      return NextResponse.json(
        { error: 'FORBIDDEN', message: 'You are not matched to this task' },
        { status: 403 }
      )
    }

    const allowedStatuses = ['matched', 'in_progress']
    if (!allowedStatuses.includes(task.status)) {
      return NextResponse.json(
        { error: 'INVALID_STATE', message: `Cannot submit when task is ${task.status}` },
        { status: 409 }
      )
    }

    // Create the submission
    const submission = await prisma.agentSubmission.create({
      data: {
        taskId,
        agentId: agent.id,
        artifacts,
        notes,
        completionProof,
      },
    })

    // Advance task state
    const newStatus = 'submitted'
    await prisma.aiTask.update({
      where: { id: taskId },
      data: { status: newStatus },
    })

    await prisma.lifecycleEvent.create({
      data: {
        taskId,
        agentId: agent.id,
        type: 'work.submitted',
        payload: {
          submissionId: submission.id,
          idempotencyKey,
          artifactCount: artifacts.length,
          notesLength: notes.length,
        },
        actor: 'agent',
      },
    })

    // TODO: Real Mem0 call here for the Video POC agent
    // await mem0.conclude(`Submitted work for task "${task.title}" with ${artifacts.length} artifacts`, {
    //   user_id: ..., agent_id: agent.id, project_id: 'upahje-ai-poc-video'
    // })

    return NextResponse.json({
      data: {
        submissionId: submission.id,
        taskId,
        status: newStatus,
      },
      meta: { idempotencyKey },
    })
  } catch (err: unknown) {
    console.error('Submit error:', err)
    return NextResponse.json(
      { error: 'Internal error', message: 'Failed to submit work' },
      { status: 500 }
    )
  }
}
