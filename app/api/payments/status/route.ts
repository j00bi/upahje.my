import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const [{ auth }, { prisma }] = await Promise.all([
      import('@/lib/auth'),
      import('@/lib/prisma'),
    ])
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const billId = request.nextUrl.searchParams.get('billId')
    if (!billId) {
      return NextResponse.json({ error: 'A bill ID is required.' }, { status: 400 })
    }

    const payment = await prisma.payment.findFirst({
      where: {
        id: billId,
        employerEmail: session.user.email,
      },
      select: {
        id: true,
        jobId: true,
        amount: true,
        status: true,
        paidAt: true,
      },
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found for this account.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ payment })
  } catch (error) {
    console.error('Error checking payment status:', error)
    return NextResponse.json(
      { error: 'Payment status is temporarily unavailable.' },
      { status: 500 }
    )
  }
}
