import { prisma } from './prisma'

export interface BillplzPayment {
  id: string
  amount: number
  status: string
  paid_at?: string
  reference?: string
}

export function getBillplzCollectionId(): string {
  return process.env.BILLPLZ_COLLECTION_ID || process.env.BILLPLZ_COLLECTION || 'demo-collection'
}

export async function createBillplzBill({
  collectionId,
  name,
  email,
  amount,
  callbackUrl,
  description,
  reference1,
  reference2,
}: {
  collectionId: string
  name: string
  email: string
  amount: number
  callbackUrl: string
  description: string
  reference1: string
  reference2?: string
}): Promise<{ id: string; url: string }> {
  const payment = await createBillplzPayment(reference1, amount, email, email)
  const query = new URLSearchParams({
    collectionId,
    name,
    email,
    amount: String(amount),
    description,
    reference1,
    ...(reference2 ? { reference2 } : {}),
  })

  return {
    id: payment.id,
    url: `${callbackUrl}?${query.toString()}`,
  }
}

export async function createBillplzPayment(
  jobId: string,
  amount: number,
  employerEmail: string,
  talentEmail: string
): Promise<BillplzPayment> {
  // In a real implementation, this would call the Billplz API
  // For now, we'll simulate a payment creation
  
  const paymentId = `billplz_${Date.now()}_${jobId}`
  
  // Store the payment reference
  await prisma.payment.create({
    data: {
      id: paymentId,
      jobId,
      amount,
      status: 'PENDING',
      employerEmail,
      talentEmail
    }
  })
  
  return {
    id: paymentId,
    amount,
    status: 'PENDING'
  }
}

export async function handleBillplzWebhook(
  paymentId: string,
  status: string,
  paidAt?: string
): Promise<void> {
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
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId }
    })
    
    if (payment) {
      // Import escrow functions dynamically to avoid circular dependency
      const { holdPayment } = await import('./escrow')
      await holdPayment(payment.jobId, payment.amount)
    }
  }
}
