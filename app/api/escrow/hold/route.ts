import { NextResponse } from 'next/server'
import { holdPayment } from '@/lib/escrow'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { jobId, amount, billplzTransactionId } = await request.json()

    if (!jobId || !amount) {
      return NextResponse.json(
        { error: 'Job ID and amount are required' },
        { status: 400 }
      )
    }

    // Verify the job exists and is in MATCHED status
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { employer: true, talent: true }
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    if (job.status !== 'MATCHED') {
      return NextResponse.json(
        { error: `Cannot hold payment for job in status: ${job.status}` },
        { status: 400 }
      )
    }

    // Create escrow transaction
    const escrow = await holdPayment(jobId, amount)

    // Store Billplz transaction reference if provided
    if (billplzTransactionId) {
      await prisma.escrowTransaction.update({
        where: { id: escrow.id },
        data: { billplzTransactionId }
      })
    }

    return NextResponse.json({
      success: true,
      escrow,
      job: {
        id: job.id,
        title: job.title,
        status: job.status
      }
    })
  } catch (error) {
    console.error('Error holding payment:', error)
    return NextResponse.json(
      { error: 'Failed to hold payment' },
      { status: 500 }
    )
  }
}