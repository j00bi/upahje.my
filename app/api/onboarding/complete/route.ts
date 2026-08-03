import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth, ensureLocalUser } from '@/lib/auth'
import {
  LABOUR_CATEGORIES,
  TECHNICAL_CATEGORIES,
  TECHNICAL_RATE_TIERS,
} from '@/lib/domain'
import { z } from 'zod'
import type { Prisma, Track } from '@prisma/client'

const onboardingDataSchema = z.object({
  fullName: z.string().trim().min(2).max(100).optional(),
  contactName: z.string().trim().min(2).max(100).optional(),
  email: z.string().trim().email().max(254).optional(),
  phone: z.string().trim().min(7).max(30).optional(),
  location: z.string().trim().max(120).optional(),
  bio: z.string().trim().max(2000).optional(),
  rate: z.string().trim().max(100).optional(),
  rateTier: z.string().trim().max(40).optional(),
  availability: z.string().trim().max(120).optional(),
  categories: z.array(z.string().max(80)).max(20).optional(),
  labourCategories: z.array(z.string().max(80)).max(20).optional(),
  techCategories: z.array(z.string().max(80)).max(20).optional(),
  skills: z.array(z.string().max(80)).max(20).optional(),
  portfolioLinks: z.array(z.string().url().max(500)).max(20).optional(),
  certifications: z.array(z.string().max(120)).max(30).optional(),
  company: z.string().trim().min(2).max(160).optional(),
  quickStart: z.boolean().optional(),
}).passthrough()

const onboardingPayloadSchema = z.object({
  role: z.enum(['TALENT', 'EMPLOYER']),
  track: z.enum(['LABOUR', 'TECHNICAL']).optional(),
  data: onboardingDataSchema.default({}),
}).superRefine((payload, context) => {
  if (payload.role === 'EMPLOYER') {
    if (!payload.data.company) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['data', 'company'],
        message: 'Company name is required',
      })
    }

    if (!payload.data.contactName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['data', 'contactName'],
        message: 'Contact name is required',
      })
    }

    return
  }

  if (!payload.track) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['track'],
      message: 'Talent track is required',
    })
  }

  if (!payload.data.fullName || !payload.data.phone) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['data'],
      message: 'Full name and phone are required',
    })
  }

  const categoryIds = payload.track === 'LABOUR'
    ? payload.data.categories ?? payload.data.labourCategories ?? []
    : payload.data.skills ?? payload.data.categories ?? payload.data.techCategories ?? []

  if (categoryIds.length === 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['data', 'categories'],
      message: 'Choose at least one category',
    })
  }
})

type OnboardingPayload = z.infer<typeof onboardingPayloadSchema>

function resolveCategoryDefinitions(payload: OnboardingPayload['data'], track: Track) {
  const selected = payload?.categories ?? []
  const explicit =
    track === 'LABOUR'
      ? payload?.labourCategories ?? []
      : [...(payload?.techCategories ?? []), ...(payload?.skills ?? [])]

  const ids = [...new Set([...selected, ...explicit])]

  const source = track === 'LABOUR' ? LABOUR_CATEGORIES : TECHNICAL_CATEGORIES
  return ids
    .map((id) => source.find((category) => category.id === id))
    .filter((category): category is (typeof source)[number] => Boolean(category))
}

async function upsertCategories(
  tx: Prisma.TransactionClient,
  payload: OnboardingPayload['data'],
  track: Track,
) {
  const definitions = resolveCategoryDefinitions(payload, track)

  return Promise.all(definitions.map((category) => (
    tx.category.upsert({
      where: { name: category.name },
      update: {
        track,
        emoji: category.emoji,
      },
      create: {
        name: category.name,
        track,
        emoji: category.emoji,
      },
      select: { id: true },
    })
  )))
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const localUser = await ensureLocalUser(session.user)
    const parsedBody = onboardingPayloadSchema.safeParse(await req.json())

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: parsedBody.error.issues[0]?.message ?? 'Invalid onboarding details',
        },
        { status: 400 },
      )
    }

    const { role, data } = parsedBody.data
    const track = parsedBody.data.track ?? 'TECHNICAL'

    const profile = await prisma.$transaction(async (tx) => {
      const existingProfile = await tx.profile.findUnique({
        where: { userId: localUser.id },
      })
      const [existingEmployer, existingTalent] = await Promise.all([
        tx.employer.findUnique({
          where: { userId: localUser.id },
          select: { id: true },
        }),
        tx.talent.findUnique({
          where: { userId: localUser.id },
          select: { id: true },
        }),
      ])

      const hasCompletedDifferentRole =
        (role === 'TALENT' && Boolean(existingEmployer)) ||
        (role === 'EMPLOYER' && Boolean(existingTalent))

      if (
        hasCompletedDifferentRole ||
        (existingProfile &&
          existingProfile.role !== role &&
          (existingEmployer || existingTalent))
      ) {
        throw new Error('ROLE_CHANGE_NOT_ALLOWED')
      }

      const displayName = data.fullName ?? data.contactName
      if (displayName) {
        await tx.user.update({
          where: { id: localUser.id },
          data: { name: displayName },
        })
      }

      const savedProfile = await tx.profile.upsert({
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
        const rate = data.rate ??
          TECHNICAL_RATE_TIERS.find((tier) => tier.id === data.rateTier)?.range ??
          data.rateTier ??
          null
        const talent = await tx.talent.upsert({
          where: { userId: localUser.id },
          update: {
            track,
            bio: data.bio || null,
            rate,
            availability: data.availability || null,
          },
          create: {
            userId: localUser.id,
            track,
            bio: data.bio || null,
            rate,
            availability: data.availability || null,
          },
        })
        const categories = await upsertCategories(tx, data, track)

        await tx.talentCategory.deleteMany({
          where: { talentId: talent.id },
        })
        await tx.talentCategory.createMany({
          data: categories.map((category) => ({
            talentId: talent.id,
            categoryId: category.id,
          })),
          skipDuplicates: true,
        })
      } else {
        await tx.employer.upsert({
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

      return savedProfile
    })

    return NextResponse.json({
      success: true,
      profileId: profile.id,
      role,
      track,
    })
  } catch (error) {
    console.error('Onboarding complete error:', error)
    if (error instanceof Error && error.message === 'ROLE_CHANGE_NOT_ALLOWED') {
      return NextResponse.json(
        { error: 'This account has already completed a different role.' },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}
