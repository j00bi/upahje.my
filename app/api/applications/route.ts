import { NextResponse } from 'next/server'
import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { user, employer, talent } = await getUserWithRole()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role') // 'talent' or 'employer'

    if (role === 'talent') {
      if (!talent) {
        return NextResponse.json({ applications: [] })
      }

      const applications = await prisma.application.findMany({
        where: { talentId: talent.id },
        include: {
          job: {
            include: {
              employer: { include: { user: { select: { name: true, email: true } } } },
              category: { select: { name: true, emoji: true } },
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
      })

      return NextResponse.json({ applications })
    }

    if (role === 'employer') {
      if (!employer) {
        return NextResponse.json({ applications: [] })
      }

      const applications = await prisma.application.findMany({
        where: { job: { employerId: employer.id } },
        include: {
          job: { select: { id: true, title: true, status: true, categoryId: true } },
          talent: {
            include: {
              user: { select: { name: true, email: true, image: true } },
              categories: { include: { category: { select: { name: true } } } },
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
      })

      return NextResponse.json({ applications })
    }

    return NextResponse.json({ error: 'Invalid role. Use ?role=talent or ?role=employer' }, { status: 400 })
  } catch (error) {
    console.error('Applications list error:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}
