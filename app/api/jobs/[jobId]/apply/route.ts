import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { user, talent, profile } = await getUserWithRole()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId } = await params
    const body = await req.json()
    const { proposal } = body

    if (!proposal || typeof proposal !== 'string' || proposal.trim().length < 10) {
      return NextResponse.json({ error: 'Proposal must be at least 10 characters.' }, { status: 400 })
    }

    // Get the job
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        status: true,
        employer: { select: { userId: true } },
      },
    })
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }
    if (job.status !== 'OPEN') {
      return NextResponse.json({ error: 'This job is no longer accepting applications.' }, { status: 400 })
    }

    if (!talent) {
      return NextResponse.json({ error: 'Talent profile not found. Please complete onboarding first.' }, { status: 400 })
    }
    if (job.employer.userId === user.id) {
      return NextResponse.json({ error: 'You cannot apply to your own job.' }, { status: 403 })
    }

    // Check KYC status — talent must be verified or at least submitted
    if (!profile || (profile.kycStatus !== 'VERIFIED' && profile.kycStatus !== 'SUBMITTED')) {
      return NextResponse.json({
        error: 'KYC verification required before applying. Please upload your MyKad in your profile settings.',
        code: 'KYC_REQUIRED',
      }, { status: 403 })
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId: user.id,
        message: proposal.trim(),
      },
      select: { id: true, status: true },
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted for employer review.',
      application,
    }, { status: 201 })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'You have already applied for this job.' },
        { status: 409 },
      )
    }

    console.error('Apply error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
