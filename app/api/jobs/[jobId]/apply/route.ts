import { NextResponse } from 'next/server'
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
    const { proposal } = await req.json()

    if (!proposal || typeof proposal !== 'string' || proposal.trim().length < 10) {
      return NextResponse.json({ error: 'Proposal must be at least 10 characters.' }, { status: 400 })
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } })
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    if (job.status !== 'OPEN') {
      return NextResponse.json({ error: 'This job is no longer accepting applications.' }, { status: 400 })
    }

    if (!talent) {
      return NextResponse.json({ error: 'Talent profile not found. Please complete onboarding first.' }, { status: 400 })
    }

    if (talent.track === 'LABOUR' && (!profile || (profile.kycStatus !== 'VERIFIED' && profile.kycStatus !== 'SUBMITTED'))) {
      return NextResponse.json({
        error: 'KYC verification required before applying. Please upload your MyKad in your profile settings.',
        code: 'KYC_REQUIRED',
      }, { status: 403 })
    }

    const existing = await prisma.application.findUnique({
      where: { jobId_talentId: { jobId, talentId: talent.id } },
    })

    if (existing) {
      return NextResponse.json(
        {
          error: `You have already applied to this job. Current status: ${existing.status}.`,
          code: 'ALREADY_APPLIED',
        },
        { status: 409 }
      )
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        talentId: talent.id,
        proposal: proposal.trim(),
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully.',
    })
  } catch (error) {
    console.error('Apply error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
