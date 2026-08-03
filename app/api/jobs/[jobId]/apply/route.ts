import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { assertSameOrigin } from '@/lib/security'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const originGuard = assertSameOrigin(req)
  if (originGuard) return originGuard

  try {
    const { user, talent, profile, role } = await getUserWithRole()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (role === 'EMPLOYER') {
      return NextResponse.json({ error: 'Employers cannot apply to jobs.' }, { status: 403 })
    }

    const { jobId } = await params

    let body: { proposal?: unknown }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload.' }, { status: 400 })
    }

    const proposal = typeof body.proposal === 'string' ? body.proposal.trim() : ''

    if (proposal.length < 10) {
      return NextResponse.json({ error: 'Proposal must be at least 10 characters.' }, { status: 400 })
    }

    if (proposal.length > 5000) {
      return NextResponse.json({ error: 'Proposal must be 5,000 characters or fewer.' }, { status: 400 })
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
        message: proposal,
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
