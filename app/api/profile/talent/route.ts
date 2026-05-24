import { NextResponse } from 'next/server'
import { auth, ensureLocalUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LABOUR_CATEGORIES } from '@/lib/domain'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const localUser = await ensureLocalUser(session.user)

    const user = await prisma.user.findUnique({
      where: { id: localUser.id },
      include: {
        profile: true,
        talent: {
          include: {
            categories: {
              include: { category: true },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      fullName: user.name || '',
      phone: user.profile?.phone || '',
      location: user.profile?.area || '',
      categories: (user.talent?.categories || []).map(tc => {
        const found = LABOUR_CATEGORIES.find(c => c.name === tc.category.name)
        return found?.id || tc.category.id
      }),
      rate: user.talent?.rate || '',
      availability: user.talent?.availability || '',
      bio: user.talent?.bio || '',
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const localUser = await ensureLocalUser(session.user)
    const body = await req.json()
    const { fullName, phone, location, categories, rate, availability, bio } = body

    // Update user name
    if (fullName) {
      await prisma.user.update({
        where: { id: localUser.id },
        data: { name: fullName },
      })
    }

    // Update profile
    await prisma.profile.upsert({
      where: { userId: localUser.id },
      update: {
        phone: phone || null,
        state: location || null,
        area: location || null,
      },
      create: {
        userId: localUser.id,
        phone: phone || null,
        state: location || null,
        area: location || null,
      },
    })

    // Update talent record
    const talent = await prisma.talent.upsert({
      where: { userId: localUser.id },
      update: {
        bio: bio || null,
        rate: rate || null,
        availability: availability || null,
      },
      create: {
        userId: localUser.id,
        track: 'LABOUR',
        bio: bio || null,
        rate: rate || null,
        availability: availability || null,
      },
    })

    // Update categories
    if (categories && Array.isArray(categories)) {
      const categoryNames = categories
        .map((id: string) => LABOUR_CATEGORIES.find(c => c.id === id)?.name)
        .filter(Boolean) as string[]

      if (categoryNames.length > 0) {
        const categoryRecords = await prisma.category.findMany({
          where: {
            track: 'LABOUR',
            name: { in: categoryNames },
          },
          select: { id: true },
        })

        await prisma.talentCategory.deleteMany({
          where: { talentId: talent.id },
        })

        await prisma.talentCategory.createMany({
          data: categoryRecords.map(cat => ({
            talentId: talent.id,
            categoryId: cat.id,
          })),
          skipDuplicates: true,
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
