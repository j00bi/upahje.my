import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { role: true },
    })

    if (profile?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { profileId } = await params
    const body = await req.json()
    const { action } = body // 'verify' | 'reject'

    if (!['verify', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Use "verify" or "reject".' }, { status: 400 })
    }

    const newStatus = action === 'verify' ? 'VERIFIED' : 'REJECTED'

    await prisma.profile.update({
      where: { id: profileId },
      data: { kycStatus: newStatus },
    })

    return NextResponse.json({ success: true, status: newStatus })
  } catch (error) {
    console.error('Admin KYC action error:', error)
    return NextResponse.json({ error: 'Failed to update KYC status' }, { status: 500 })
  }
}