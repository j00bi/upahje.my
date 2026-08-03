import { NextResponse } from 'next/server'
import { getUserWithRole } from '@/lib/auth'
import { parseApplicationAction } from '@/lib/application-matching'
import { prisma } from '@/lib/prisma'
import { assertSameOrigin } from '@/lib/security'

class ApplicationConflictError extends Error {}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ applicationId: string }> },
) {
  const originGuard = assertSameOrigin(request)
  if (originGuard) return originGuard

  try {
    const { user } = await getUserWithRole()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { applicationId } = await params

    let body: { action?: unknown }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload.' }, { status: 400 })
    }

    const action = parseApplicationAction(body.action)

    if (!action) {
      return NextResponse.json(
        { error: 'Action must be ACCEPT, REJECT, or WITHDRAW.' },
        { status: 400 },
      )
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        applicant: { include: { talent: true } },
        job: { include: { employer: true } },
      },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 })
    }

    if (action === 'WITHDRAW') {
      if (application.applicantId !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      if (application.status !== 'PENDING') {
        return NextResponse.json(
          { error: 'Only pending applications can be withdrawn.' },
          { status: 409 },
        )
      }

      const changed = await prisma.application.updateMany({
        where: { id: application.id, status: 'PENDING' },
        data: { status: 'WITHDRAWN' },
      })

      if (changed.count !== 1) {
        return NextResponse.json(
          { error: 'Only pending applications can be withdrawn.' },
          { status: 409 },
        )
      }

      return NextResponse.json({ success: true, status: 'WITHDRAWN' })
    }

    if (application.job.employer.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    if (application.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'This application has already been decided.' },
        { status: 409 },
      )
    }

    if (action === 'REJECT') {
      const changed = await prisma.application.updateMany({
        where: { id: application.id, status: 'PENDING' },
        data: { status: 'REJECTED' },
      })

      if (changed.count !== 1) {
        return NextResponse.json(
          { error: 'This application has already been decided.' },
          { status: 409 },
        )
      }

      return NextResponse.json({ success: true, status: 'REJECTED' })
    }

    const talent = application.applicant.talent
    if (!talent) {
      return NextResponse.json(
        { error: 'The applicant no longer has a talent profile.' },
        { status: 409 },
      )
    }

    await prisma.$transaction(async (tx) => {
      const claimedJob = await tx.job.updateMany({
        where: {
          id: application.jobId,
          status: 'OPEN',
          talentId: null,
        },
        data: {
          status: 'MATCHED',
          talentId: talent.id,
        },
      })

      if (claimedJob.count !== 1) {
        throw new ApplicationConflictError('The job has already been matched.')
      }

      const accepted = await tx.application.updateMany({
        where: { id: application.id, status: 'PENDING' },
        data: { status: 'ACCEPTED' },
      })

      if (accepted.count !== 1) {
        throw new ApplicationConflictError('This application has already been decided.')
      }

      await tx.application.updateMany({
        where: {
          jobId: application.jobId,
          id: { not: application.id },
          status: 'PENDING',
        },
        data: { status: 'REJECTED' },
      })
    })

    return NextResponse.json({
      success: true,
      status: 'ACCEPTED',
      jobStatus: 'MATCHED',
    })
  } catch (error) {
    if (error instanceof ApplicationConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }

    console.error('Application decision error:', error)
    return NextResponse.json(
      { error: 'Failed to update application.' },
      { status: 500 },
    )
  }
}
