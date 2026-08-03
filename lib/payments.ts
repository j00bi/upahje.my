import crypto from 'node:crypto'
import Billplz from 'billplz'

import { prisma } from './prisma'

export interface BillplzPayment {
  id: string
  amount: number
  status: string
  paid_at?: string
  reference?: string
}

export function getBillplzCollectionId(): string {
  const collectionId =
    process.env.BILLPLZ_COLLECTION_ID || process.env.BILLPLZ_COLLECTION

  if (!collectionId) {
    throw new Error('Missing BILLPLZ_COLLECTION_ID or BILLPLZ_COLLECTION')
  }

  return collectionId
}

function getBillplzApiKey(): string {
  const apiKey = process.env.BILLPLZ_API_KEY

  if (!apiKey) {
    throw new Error('Missing BILLPLZ_API_KEY')
  }

  return apiKey
}

function getBillplzXSignatureKey(): string {
  const xSignatureKey =
    process.env.BILLPLZ_X_SIGNATURE_KEY ?? process.env.BILLPLZ_X_SIGNATURE

  if (!xSignatureKey) {
    throw new Error('Missing BILLPLZ_X_SIGNATURE_KEY or BILLPLZ_X_SIGNATURE')
  }

  return xSignatureKey
}

function isBillplzSandbox(): boolean {
  return process.env.BILLPLZ_SANDBOX === 'true'
}

export function toBillplzAmount(amountInRinggit: number): number {
  return Math.round(amountInRinggit * 100)
}

function buildBillplzSignatureSource(params: Record<string, string>) {
  return Object.entries(params)
    .filter(([key]) => key !== 'x_signature' && key !== 'x-signature')
    .map(([key, value]) => `${key}${value ?? ''}`)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .join('|')
}

export function verifyBillplzSignature(
  params: Record<string, string>,
  signature: string
): boolean {
  if (!signature) {
    return false
  }

  const source = buildBillplzSignatureSource(params)
  const expected = crypto
    .createHmac('sha256', getBillplzXSignatureKey())
    .update(source)
    .digest('hex')

  if (expected.length !== signature.length) {
    return false
  }

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export async function createBillplzBill({
  collectionId,
  name,
  email,
  amount,
  amountInRinggit,
  callbackUrl,
  redirectUrl,
  description,
  reference1,
  reference2,
}: {
  collectionId: string
  name: string
  email: string
  amount: number
  amountInRinggit: number
  callbackUrl: string
  redirectUrl?: string
  description: string
  reference1: string
  reference2?: string
}): Promise<{ id: string; url: string }> {
  const billplz = new Billplz({
    key: getBillplzApiKey(),
    sandbox: isBillplzSandbox(),
  })

  const response = await new Promise<{
    id: string
    url: string
  }>((resolve, reject) => {
    billplz.create_bill(
      {
        collection_id: collectionId,
        description,
        email,
        mobile: 0,
        name,
        amount,
        callback_url: callbackUrl,
        ...(redirectUrl ? { redirect_url: redirectUrl } : {}),
        reference_1_label: 'Job ID',
        reference_1: reference1,
        ...(reference2 ? { reference_2_label: 'Reference' } : {}),
        ...(reference2 ? { reference_2: reference2 } : {}),
      },
      (error: unknown, result: { id?: string; url?: string }) => {
        if (error) {
          reject(error)
          return
        }

        if (!result?.id || !result?.url) {
          reject(new Error('Billplz did not return a bill id and url'))
          return
        }

        resolve({ id: result.id, url: result.url })
      }
    )
  })

  await prisma.payment.create({
    data: {
      id: response.id,
      jobId: reference1,
      amount: amountInRinggit,
      status: 'PENDING',
      employerEmail: email,
      talentEmail: '',
    },
  })

  return response
}

export async function handleBillplzWebhook(
  paymentId: string,
  status: string,
  paidAt?: string
): Promise<void> {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  })

  if (!payment) {
    return
  }

  const normalizedStatus = status.toUpperCase()
  const successfulStatuses = new Set(['SUCCESS', 'PAID'])
  const wasSuccessful = successfulStatuses.has(payment.status.toUpperCase())
  const isSuccessful = successfulStatuses.has(normalizedStatus)

  // Billplz may retry callbacks. Do not create a second escrow transaction for
  // an already-processed payment.
  if (wasSuccessful && isSuccessful) {
    return
  }

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: normalizedStatus,
      paidAt: paidAt ? new Date(paidAt) : undefined
    }
  })

  if (isSuccessful) {
    const { holdPayment } = await import('./escrow')
    await holdPayment(payment.jobId, payment.amount)
  }
}
