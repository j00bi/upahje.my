import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { auth, ensureLocalUser } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const localUser = await ensureLocalUser(session.user)

    const profile = await prisma.profile.findUnique({
      where: { userId: localUser.id },
      select: { kycStatus: true, kycFileUrl: true },
    })

    return NextResponse.json({
      kycStatus: profile?.kycStatus ?? 'PENDING',
      hasUploaded: Boolean(profile?.kycFileUrl),
    })
  } catch (error) {
    console.error('KYC status error:', error)
    return NextResponse.json({ error: 'Failed to fetch KYC status' }, { status: 500 })
  }
}
