import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const [{ handleBillplzWebhook, verifyBillplzSignature }, { prisma }] =
      await Promise.all([import('@/lib/payments'), import('@/lib/prisma')])

    const contentType = request.headers.get('content-type') ?? ''
    let webhookData: Record<string, string> = {}

    if (contentType.includes('application/json')) {
      const json = await request.json()
      webhookData = Object.fromEntries(
        Object.entries(json as Record<string, unknown>).map(([key, value]) => [
          key,
          value === null || value === undefined ? '' : String(value),
        ])
      )
    } else {
      const formData = await request.formData()
      webhookData = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
      )
    }

    const paymentId = webhookData.id
    const status = webhookData.state ?? webhookData.status
    const paidAt = webhookData.paid_at
    const signature = webhookData.x_signature

    if (!paymentId || !status) {
      return NextResponse.json(
        { error: 'Invalid webhook data' },
        { status: 400 }
      )
    }

    if (!verifyBillplzSignature(webhookData, signature ?? '')) {
      return NextResponse.json(
        { error: 'Invalid Billplz signature' },
        { status: 401 }
      )
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    })

    if (!payment) {
      console.log(`Payment ${paymentId} not found in local database`)
      return NextResponse.json({ received: true })
    }

    await handleBillplzWebhook(paymentId, status, paidAt)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing Billplz webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}
