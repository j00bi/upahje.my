import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    if (process.env.PAYMENTS_ENABLED !== 'true') {
      return NextResponse.json(
        {
          error:
            'Payments are not enabled. No charge was created.',
        },
        { status: 503 }
      )
    }

    const [{ auth }, { prisma }, { createBillplzBill, getBillplzCollectionId, toBillplzAmount }] =
      await Promise.all([
        import('@/lib/auth'),
        import('@/lib/prisma'),
        import('@/lib/payments'),
      ])

    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId } = await request.json()

    if (!jobId || typeof jobId !== 'string') {
      return NextResponse.json(
        { error: 'A valid job ID is required.' },
        { status: 400 }
      )
    }

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        employer: {
          user: {
            email: session.user.email,
          },
        },
      },
      include: {
        employer: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found or not owned by current user' },
        { status: 404 }
      )
    }

    if (job.status !== 'MATCHED' || !job.talentId) {
      return NextResponse.json(
        { error: 'Payment is only available after a talent has been matched.' },
        { status: 409 }
      )
    }

    // A range or day rate is not an agreed total. Only a single, server-owned
    // Ringgit value can be charged until an explicit agreement model exists.
    const rateMatch = job.rate?.match(/^\s*(?:RM\s*)?(\d+(?:\.\d{1,2})?)\s*$/i)
    const agreedAmount = rateMatch ? Number(rateMatch[1]) : Number.NaN
    if (!Number.isFinite(agreedAmount) || agreedAmount < 1 || agreedAmount > 100_000) {
      return NextResponse.json(
        {
          error:
            'A final agreed amount has not been recorded for this job. No payment was created.',
        },
        { status: 409 }
      )
    }

    const existingPayment = await prisma.payment.findFirst({
      where: {
        jobId,
        status: { in: ['PENDING', 'SUCCESS', 'PAID'] },
      },
      select: { id: true, status: true },
    })
    if (existingPayment) {
      return NextResponse.json(
        {
          error: `A ${existingPayment.status.toLowerCase()} payment already exists for this job.`,
        },
        { status: 409 }
      )
    }

    const collectionId = getBillplzCollectionId()
    const amountInSen = toBillplzAmount(agreedAmount)

    // Generate callback URL for webhook
    const baseUrl = process.env.NEXTAUTH_URL
    if (!baseUrl) {
      return NextResponse.json(
        { error: 'Missing NEXTAUTH_URL environment variable' },
        { status: 500 }
      )
    }
    const callbackUrl = `${baseUrl}/api/payments/webhook`
    const redirectUrl = `${baseUrl}/payment/status`

    // Create Billplz bill
    const bill = await createBillplzBill({
      collectionId,
      name: session.user.email,
      email: session.user.email,
      amount: amountInSen,
      amountInRinggit: agreedAmount,
      callbackUrl,
      redirectUrl,
      description: `Payment for job: ${jobId}`,
      reference1: jobId,
      reference2: `upahje-${Date.now()}`,
    })

    // Return the payment URL for redirect
    return NextResponse.json({
      success: true,
      billId: bill.id,
      paymentUrl: bill.url,
      amount: agreedAmount,
      currency: 'MYR',
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
