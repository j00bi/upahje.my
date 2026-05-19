import { NextRequest, NextResponse } from 'next/server'
import { Role, Track } from '@prisma/client'
import { auth, ensureLocalUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type OnboardingRole = 'TALENT' | 'EMPLOYER'

interface OnboardingPayload {
  role: OnboardingRole
  track?: Track | 'LABOUR' | 'TECHNICAL' | string
  variant?: string | null
  data?: {
    fullName?: string
    phone?: string
    location?: string
    bio?: string
    rate?: string
    availability?: string
    categories?: string[]
    skills?: string[]
    portfolioLinks?: string[]
    certifications?: string[]
    company?: string
    contactName?: string
    contact?: string
    email?: string
  }
}

function normalizeRole(role: unknown): OnboardingRole | null {
  if (role === 'EMPLOYER' || role === 'TALENT') {
    return role
  }

  if (role === 'employer') return 'EMPLOYER'
  if (role === 'talent') return 'TALENT'

  return null
}

function normalizeTrack(track: unknown): Track {
  return track === 'TECHNICAL' ? 'TECHNICAL' : 'LABOUR'
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const localUser = await ensureLocalUser(session.user)

    const body = (await request.json()) as Partial<OnboardingPayload>
    const role = normalizeRole(body.role)

    if (!role) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      )
    }

    const data = body.data ?? {}
    const track = normalizeTrack(body.track)

    const profile = await prisma.$transaction(async (tx) => {
      const updatedProfile = await tx.profile.upsert({
        where: { userId: localUser.id },
        create: {
          userId: localUser.id,
          role: role === 'EMPLOYER' ? Role.EMPLOYER : Role.TALENT,
          phone: data.phone?.trim() || null,
          area: data.location?.trim() || null,
          state: data.location?.trim() || null,
        },
        update: {
          role: role === 'EMPLOYER' ? Role.EMPLOYER : Role.TALENT,
          phone: data.phone?.trim() || null,
          area: data.location?.trim() || null,
          state: data.location?.trim() || null,
        },
      })

      if (role === 'TALENT') {
        const talent = await tx.talent.upsert({
          where: { userId: localUser.id },
          create: {
            userId: localUser.id,
            track,
            bio: data.bio?.trim() || null,
            rate: data.rate?.trim() || null,
            availability: data.availability?.trim() || null,
          },
          update: {
            track,
            bio: data.bio?.trim() || null,
            rate: data.rate?.trim() || null,
            availability: data.availability?.trim() || null,
          },
        })

        if (Array.isArray(data.categories) && data.categories.length > 0) {
          const validCategories = await tx.category.findMany({
            where: {
              id: { in: data.categories },
              track,
            },
            select: { id: true },
          })

          await tx.talentCategory.deleteMany({
            where: { talentId: talent.id },
          })

          if (validCategories.length > 0) {
            await tx.talentCategory.createMany({
              data: validCategories.map((category) => ({
                talentId: talent.id,
                categoryId: category.id,
              })),
              skipDuplicates: true,
            })
          }
        }
      }

      if (role === 'EMPLOYER') {
        await tx.employer.upsert({
          where: { userId: localUser.id },
          create: {
            userId: localUser.id,
            company: data.company?.trim() || data.contactName?.trim() || data.contact?.trim() || null,
          },
          update: {
            company: data.company?.trim() || data.contactName?.trim() || data.contact?.trim() || null,
          },
        })
      }

      return updatedProfile
    })

    return NextResponse.json(
      { success: true, role, profileId: profile.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Onboarding completion error:', error)
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    )
  }
}
