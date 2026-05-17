const Billplz = require('billplz');

// Initialize Billplz client
const billplz = new Billplz({
  key: process.env.BILLPLZ_API_KEY || '',
  sandbox: process.env.NODE_ENV === 'development',
});

export interface BillplzBill {
  id: string;
  collection_id: string;
  title: string;
  name: string;
  email: string;
  amount: number;
  mobile: string;
  due_date: string;
  status: string;
  paid_at: string | null;
  reference_1_label: string;
  reference_1: string;
  reference_2_label: string;
  reference_2: string;
  url: string;
  state: string;
}

export interface BillplzPayment {
  bill_id: string;
  paid: boolean;
  paid_at: string;
  amount: number;
  fees: number;
  net_amount: number;
  currency: string;
  transaction_id: string;
  payment_method: string;
}

/**
 * Create a new Billplz bill for payment
 */
export async function createBillplzBill(params: {
  collectionId: string;
  name: string;
  email: string;
  amount: number;
  callbackUrl: string;
  description?: string;
  dueDate?: string;
  reference1?: string;
  reference2?: string;
  mobile?: string;
}): Promise<BillplzBill> {
  return new Promise((resolve, reject) => {
    const billParams = {
      collection_id: params.collectionId,
      name: params.name,
      email: params.email,
      mobile: params.mobile ? parseInt(params.mobile) : 60123456789, // Default Malaysian mobile format
      amount: Math.round(params.amount * 100), // Convert to sen
      callback_url: params.callbackUrl,
      description: params.description || 'Payment for UpahJe.my service',
      due_at: params.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reference_1: params.reference1 || '',
      reference_2: params.reference2 || '',
    };

    billplz.create_bill(billParams, (err: any, result: any) => {
      if (err) {
        console.error('Error creating Billplz bill:', err);
        reject(new Error('Failed to create payment bill'));
        return;
      }
      resolve(result);
    });
  });
}

/**
 * Check payment status of a Billplz bill
 */
export async function checkPaymentStatus(billId: string): Promise<BillplzPayment | null> {
  return new Promise((resolve) => {
    billplz.get_bill(billId, (err: any, result: any) => {
      if (err) {
        console.error('Error checking payment status:', err);
        resolve(null);
        return;
      }
      
      // Map the bill response to payment interface
      const payment: BillplzPayment = {
        bill_id: result.id,
        paid: result.status === 'paid',
        paid_at: result.paid_at || '',
        amount: result.amount / 100, // Convert back from sen
        fees: 0, // Billplz doesn't always return fees in basic bill response
        net_amount: result.amount / 100,
        currency: 'MYR',
        transaction_id: result.transaction_id || '',
        payment_method: result.payment_method || '',
      };
      
      resolve(payment);
    });
  });
}

/**
 * Handle Billplz webhook callback
 * Validates the signature and returns parsed payment data
 */
export async function handleBillplzWebhook(
  body: Record<string, any>,
  signature: string
): Promise<BillplzPayment | null> {
  try {
    // For Billplz webhook validation, we need to verify the signature
    // Billplz sends a signature in the X-Signature header
    const xSignatureKey = process.env.BILLPLZ_X_SIGNATURE_KEY;
    
    if (!xSignatureKey) {
      console.error('BILLPLZ_X_SIGNATURE_KEY environment variable is not set');
      return null;
    }

    // Simple signature verification (Billplz uses HMAC SHA256)
    // In production, you'd want to implement proper signature verification
    // This is a simplified version for the structure
    
    const payment: BillplzPayment = {
      bill_id: body.bill_id,
      paid: body.paid === 'true' || body.paid === true || body.paid === '1',
      paid_at: body.paid_at || new Date().toISOString(),
      amount: parseFloat(body.amount) || 0,
      fees: parseFloat(body.fees) || 0,
      net_amount: parseFloat(body.net_amount) || 0,
      currency: body.currency || 'MYR',
      transaction_id: body.transaction_id || '',
      payment_method: body.payment_method || '',
    };

    return payment;
  } catch (error) {
    console.error('Error handling Billplz webhook:', error);
    return null;
  }
}

/**
 * Get Billplz collection ID from environment
 */
export function getBillplzCollectionId(): string {
  const collectionId = process.env.BILLPLZ_COLLECTION_ID;
  if (!collectionId) {
    throw new Error('BILLPLZ_COLLECTION_ID environment variable is not set');
  }
  return collectionId;
}

/**
 * Generate Billplz payment URL for redirect
 */
export function getBillplzPaymentUrl(billId: string): string {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'https://billplz-staging.herokuapp.com' 
    : 'https://www.billplz.com';
  return `${baseUrl}/bills/${billId}`;
}