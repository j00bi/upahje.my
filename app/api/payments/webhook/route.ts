import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text()
    
    // Parse the webhook data
    const webhookData = JSON.parse(rawBody)
    
    // Extract payment information from Billplz webhook
    // Billplz webhook structure typically includes:
    // - id: payment ID
    // - status: payment status (paid, failed, etc.)
    // - paid_at: timestamp when payment was completed
    const { id: paymentId, status, paid_at: paidAt } = webhookData
    
    if (!paymentId || !status) {
      return NextResponse.json(
        { error: 'Invalid webhook data' },
        { status: 400 }
      )
    }
    
    // Find the payment in our database
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId }
    })
    
    if (!payment) {
      // Payment not found in our system, but we should still acknowledge the webhook
      console.log(`Payment ${paymentId} not found in local database`)
      return NextResponse.json({ received: true })
    }
    
    // Update payment status
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: status.toUpperCase(),
        paidAt: paidAt ? new Date(paidAt) : undefined
      }
    })
    
    // If payment is successful, trigger escrow hold
    if (status.toUpperCase() === 'SUCCESS' || status.toUpperCase() === 'PAID') {
      // Check if escrow already exists for this job
      const existingEscrow = await prisma.escrowTransaction.findFirst({
        where: { 
          jobId: payment.jobId,
          status: 'HELD'
        }
      })
      
      if (!existingEscrow) {
        // Get job details to find employer and talent IDs
        const job = await prisma.job.findUnique({
          where: { id: payment.jobId },
          include: {
            employer: true,
            talent: true
          }
        })
        
        if (job && job.talentId) {
          // Create escrow transaction
          await prisma.escrowTransaction.create({
            data: {
              jobId: payment.jobId,
              amount: payment.amount,
              status: 'HELD',
              employerId: job.employerId,
              talentId: job.talentId,
              billplzTransactionId: paymentId
            }
          })
          
          // Update job status to IN_PROGRESS
          await prisma.job.update({
            where: { id: payment.jobId },
            data: { status: 'IN_PROGRESS' }
          })
        }
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing Billplz webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}
