import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId } = await params
    const body = await req.json()
    const { proposal } = body

    if (!proposal || typeof proposal !== 'string' || proposal.trim().length < 10) {
      return NextResponse.json({ error: 'Proposal must be at least 10 characters.' }, { status: 400 })
    }

    // Get the job
    const job = await prisma.job.findUnique({ where: { id: jobId } })
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }
    if (job.status !== 'OPEN') {
      return NextResponse.json({ error: 'This job is no longer accepting applications.' }, { status: 400 })
    }

    // Get the talent profile
    const talent = await prisma.talent.findUnique({ where: { userId: session.user.id } })
    if (!talent) {
      return NextResponse.json({ error: 'Talent profile not found. Please complete onboarding first.' }, { status: 400 })
    }

    // Check KYC status — talent must be verified or at least submitted
    const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
    if (!profile || (profile.kycStatus !== 'VERIFIED' && profile.kycStatus !== 'SUBMITTED')) {
      return NextResponse.json({
        error: 'KYC verification required before applying. Please upload your MyKad in your profile settings.',
        code: 'KYC_REQUIRED',
      }, { status: 403 })
    }

    // Update job with talent (mark as matched)
    await prisma.job.update({
      where: { id: jobId },
      data: {
        talentId: talent.id,
        status: 'MATCHED',
      },
    })

    return NextResponse.json({ success: true, message: 'Application submitted successfully.' })
  } catch (error) {
    console.error('Apply error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}