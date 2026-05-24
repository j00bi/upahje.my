import { NextResponse } from 'next/server'
import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, employer, talent } = await getUserWithRole()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { action } = body // 'accept', 'reject', 'withdraw', 'review'

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: { select: { employerId: true, status: true } },
        talent: { select: { userId: true } },
      },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    switch (action) {
      case 'review': {
        if (!employer || application.job.employerId !== employer.id) {
          return NextResponse.json({ error: 'Only the job employer can review applications' }, { status: 403 })
        }
        const reviewed = await prisma.application.update({
          where: { id },
          data: { status: 'REVIEWED' },
        })
        return NextResponse.json({ success: true, application: reviewed })
      }

      case 'accept': {
        if (!employer || application.job.employerId !== employer.id) {
          return NextResponse.json({ error: 'Only the job employer can accept applications' }, { status: 403 })
        }
        if (application.job.status !== 'OPEN') {
          return NextResponse.json({ error: 'This job is no longer accepting applications' }, { status: 400 })
        }

        const [updatedApp] = await prisma.$transaction([
          prisma.application.update({
            where: { id },
            data: { status: 'ACCEPTED' },
          }),
          prisma.job.update({
            where: { id: application.jobId },
            data: {
              talentId: application.talentId,
              status: 'MATCHED',
            },
          }),
          // Reject all other pending applications for this job
          prisma.application.updateMany({
            where: {
              jobId: application.jobId,
              id: { not: id },
              status: { in: ['PENDING', 'REVIEWED'] },
            },
            data: { status: 'REJECTED' },
          }),
        ])

        return NextResponse.json({ success: true, application: updatedApp, matchConfirmed: true })
      }

      case 'reject': {
        if (!employer || application.job.employerId !== employer.id) {
          return NextResponse.json({ error: 'Only the job employer can reject applications' }, { status: 403 })
        }
        const rejected = await prisma.application.update({
          where: { id },
          data: { status: 'REJECTED' },
        })
        return NextResponse.json({ success: true, application: rejected })
      }

      case 'withdraw': {
        if (!talent || application.talentId !== talent.id) {
          return NextResponse.json({ error: 'You can only withdraw your own application' }, { status: 403 })
        }
        if (application.status === 'ACCEPTED') {
          return NextResponse.json({ error: 'Cannot withdraw an accepted application. Contact the employer.' }, { status: 400 })
        }
        const withdrawn = await prisma.application.update({
          where: { id },
          data: { status: 'WITHDRAWN' },
        })
        return NextResponse.json({ success: true, application: withdrawn })
      }

      default:
        return NextResponse.json({ error: 'Invalid action. Use: accept, reject, withdraw, review' }, { status: 400 })
    }
  } catch (error) {
    console.error('Application action error:', error)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}
