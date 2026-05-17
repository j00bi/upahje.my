import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const {
      createBillplzBill,
      getBillplzCollectionId,
      toBillplzAmount,
    } = await import('@/lib/payments')

    const body = await request.json()
    const { jobId, amount, customerName, customerEmail } = body

    // Validate input
    if (!jobId || !amount || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: jobId, amount, customerName, customerEmail' },
        { status: 400 }
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
      name: customerName,
      email: customerEmail,
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
