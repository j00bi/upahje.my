import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { user, role } = await getUserWithRole()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const submissions = await prisma.profile.findMany({
      where: {
        kycStatus: { in: ['SUBMITTED', 'VERIFIED', 'REJECTED'] },
      },
      select: {
        id: true,
        userId: true,
        kycStatus: true,
        kycFileUrl: true,
        state: true,
        area: true,
        user: {
          select: {
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    // kycFileUrl is a private storage object path. Do not expose a permanent
    // URL. The admin UI must call the signed-URL endpoint to view a document.
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Admin KYC list error:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}
