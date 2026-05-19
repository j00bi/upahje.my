import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
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

    const {
      jobId,
      amount,
      customerName,
      customerEmail,
    } = await request.json()

    // Validate input
    if (!jobId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: jobId, amount' },
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

    // Get Billplz collection ID
    const collectionId = getBillplzCollectionId()
    const amountInSen = toBillplzAmount(Number(amount))

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
      name: customerName || session.user.email,
      email: customerEmail || session.user.email,
      amount: amountInSen,
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
      amount: amountInSen,
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
