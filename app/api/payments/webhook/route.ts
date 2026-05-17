import { NextRequest, NextResponse } from 'next/server'
import { handleBillplzWebhook } from '@/lib/payments'

export async function POST(request: NextRequest) {
  try {
    // Get the signature from headers
    const signature = request.headers.get('X-Signature') || ''
    
    // Get the raw body for verification
    const body = await request.json()

    // Handle the webhook
    const payment = await handleBillplzWebhook(body, signature)

    if (!payment) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    // Process the payment status
    console.log('Billplz Webhook Received:', {
      billId: payment.bill_id,
      paid: payment.paid,
      amount: payment.amount,
      paidAt: payment.paid_at,
    })

    // TODO: Update your database with payment status
    // - Update job status if payment is successful
    // - Send confirmation emails
    // - Notify relevant parties

    // Return success response to Billplz
    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}