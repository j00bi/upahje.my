import { prisma } from './prisma'

export interface EscrowTransaction {
  id: string
  jobId: string
  amount: number
  status: 'HELD' | 'RELEASED' | 'CANCELLED'
  createdAt: Date
  releasedAt?: Date | null
  cancelledAt?: Date | null
}

export async function holdPayment(jobId: string, amount: number): Promise<EscrowTransaction> {
  // Validate job exists and is in correct state
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { employer: true }
  })

  if (!job) {
    throw new Error('Job not found')
  }

  if (job.status !== 'MATCHED') {
    throw new Error(`Cannot hold payment for job in status: ${job.status}`)
  }

  // Create escrow transaction
  const escrow = await prisma.escrowTransaction.create({
    data: {
      jobId,
      amount,
      status: 'HELD',
      employerId: job.employerId,
      talentId: job.talentId!
    }
  })

  // Update job status to IN_PROGRESS
  await prisma.job.update({
    where: { id: jobId },
    data: { status: 'IN_PROGRESS' }
  })

  return escrow
}

export async function releasePayment(jobId: string): Promise<EscrowTransaction> {
  // Find the escrow transaction
  const escrow = await prisma.escrowTransaction.findFirst({
    where: { 
      jobId,
      status: 'HELD'
    }
  })

  if (!escrow) {
    throw new Error('No active escrow found for this job')
  }

  // Update escrow status
  const updatedEscrow = await prisma.escrowTransaction.update({
    where: { id: escrow.id },
    data: {
      status: 'RELEASED',
      releasedAt: new Date()
    }
  })

  // Update job status to COMPLETED
  await prisma.job.update({
    where: { id: jobId },
    data: { status: 'COMPLETED' }
  })

  return updatedEscrow
}

export async function cancelPayment(jobId: string): Promise<EscrowTransaction> {
  // Find the escrow transaction
  const escrow = await prisma.escrowTransaction.findFirst({
    where: { 
      jobId,
      status: 'HELD'
    }
  })

  if (!escrow) {
    throw new Error('No active escrow found for this job')
  }

  // Update escrow status
  const updatedEscrow = await prisma.escrowTransaction.update({
    where: { id: escrow.id },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date()
    }
  })

  // Update job status to CANCELLED
  await prisma.job.update({
    where: { id: jobId },
    data: { status: 'CANCELLED' }
  })

  return updatedEscrow
}

export async function getEscrowByJobId(jobId: string): Promise<EscrowTransaction | null> {
  return await prisma.escrowTransaction.findFirst({
    where: { jobId },
    orderBy: { createdAt: 'desc' }
  })
}
