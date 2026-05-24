import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth, ensureLocalUser } from '@/lib/auth'
import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'
import type { Track } from '@prisma/client'

type OnboardingPayload = {
  role?: 'TALENT' | 'EMPLOYER'
  track?: Track
  data?: {
    fullName?: string
    phone?: string
    location?: string
    bio?: string
    rate?: string
    availability?: string
    categories?: string[]
    labourCategories?: string[]
    techCategories?: string[]
    company?: string
    contactName?: string
    industry?: string
    companySize?: string
    quickStart?: boolean
  }
}

function resolveCategoryNames(payload: OnboardingPayload['data'], track: Track) {
  const selected = payload?.categories ?? []
  const explicit =
    track === 'LABOUR'
      ? payload?.labourCategories ?? []
      : payload?.techCategories ?? []

  const ids = [...new Set([...selected, ...explicit])]

  const source = track === 'LABOUR' ? LABOUR_CATEGORIES : TECHNICAL_CATEGORIES
  return ids
    .map((id) => source.find((category) => category.id === id))
    .filter((category): category is (typeof source)[number] => Boolean(category))
    .map((category) => category.name)
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const localUser = await ensureLocalUser(session.user)
    const body = (await req.json()) as OnboardingPayload
    const role = body.role ?? 'TALENT'
    const track = body.track ?? 'TECHNICAL'
    const data = body.data ?? {}

    const profile = await prisma.profile.upsert({
      where: { userId: localUser.id },
      update: {
        role,
        phone: data.phone || null,
        state: data.location || null,
        area: data.location || null,
      },
      create: {
        userId: localUser.id,
        role,
        phone: data.phone || null,
        state: data.location || null,
        area: data.location || null,
      },
    })

    if (role === 'TALENT') {
      const talent = await prisma.talent.upsert({
        where: { userId: localUser.id },
        update: {
          track,
          bio: data.bio || null,
          rate: data.rate || null,
          availability: data.availability || null,
        },
        create: {
          userId: localUser.id,
          track,
          bio: data.bio || null,
          rate: data.rate || null,
          availability: data.availability || null,
        },
      })

      const categoryNames = resolveCategoryNames(data, track)
      if (categoryNames.length > 0) {
        const categories = await prisma.category.findMany({
          where: {
            track,
            name: { in: categoryNames },
          },
          select: { id: true },
        })

        await prisma.talentCategory.deleteMany({
          where: { talentId: talent.id },
        })

        await prisma.talentCategory.createMany({
          data: categories.map((category) => ({
            talentId: talent.id,
            categoryId: category.id,
          })),
          skipDuplicates: true,
        })
      }
    } else if (role === 'EMPLOYER') {
      await prisma.employer.upsert({
        where: { userId: localUser.id },
        update: {
          company: data.company || null,
        },
        create: {
          userId: localUser.id,
          company: data.company || null,
        },
      })
    }

    return NextResponse.json({
      success: true,
      profileId: profile.id,
      role,
      track,
    })
  } catch (error) {
    console.error('Onboarding complete error:', error)
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}
