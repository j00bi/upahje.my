import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { createBillplzBill, getBillplzCollectionId } = await import('@/lib/payments')

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

    // Generate callback URL for webhook
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const callbackUrl = `${baseUrl}/api/payments/webhook`

    // Create Billplz bill
    const bill = await createBillplzBill({
      collectionId,
      name: customerName,
      email: customerEmail,
      amount: amount,
      callbackUrl: callbackUrl,
      description: `Payment for job: ${jobId}`,
      reference1: jobId,
      reference2: `upahje-${Date.now()}`,
    })

    // Return the payment URL for redirect
    return NextResponse.json({
      success: true,
      billId: bill.id,
      paymentUrl: bill.url,
      amount: amount,
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
