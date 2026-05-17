import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const [{ cancelPayment }, { prisma }, { auth }] = await Promise.all([
      import('@/lib/escrow'),
      import('@/lib/prisma'),
      import('@/lib/auth'),
    ])

    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { jobId } = await request.json()

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      )
    }

    // Verify the job exists and user is the employer
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { 
        employer: {
          include: { user: true }
        },
        talent: {
          include: { user: true }
        }
      }
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Check if user is the employer
    if (job.employer.user.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Only the employer can cancel payment' },
        { status: 403 }
      )
    }

    // Check if job is in correct status
    if (job.status !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: `Cannot cancel payment for job in status: ${job.status}` },
        { status: 400 }
      )
    }

    // Cancel payment
    const escrow = await cancelPayment(jobId)

    return NextResponse.json({
      success: true,
      escrow,
      job: {
        id: job.id,
        title: job.title,
        status: 'CANCELLED'
      }
    })
  } catch (error) {
    console.error('Error cancelling payment:', error)
    return NextResponse.json(
      { error: 'Failed to cancel payment' },
      { status: 500 }
    )
  }
}
