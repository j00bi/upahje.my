import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth, ensureLocalUser } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const localUser = await ensureLocalUser(session.user)

    const formData = await req.formData()
    const file = formData.get('mykad') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Upload JPEG, PNG, WebP or PDF.' }, { status: 400 })
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'mykad')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const extensionByType: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'application/pdf': 'pdf',
    }
    const fileName = `${localUser.id}-${Date.now()}.${extensionByType[file.type]}`
    const filePath = join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    const fileUrl = `/uploads/mykad/${fileName}`

    // Update profile with KYC file and set status to SUBMITTED
    await prisma.profile.upsert({
      where: { userId: localUser.id },
      create: {
        userId: localUser.id,
        role: 'TALENT',
        kycFileUrl: fileUrl,
        kycStatus: 'SUBMITTED',
      },
      update: {
        kycFileUrl: fileUrl,
        kycStatus: 'SUBMITTED',
      },
    })

    return NextResponse.json({ success: true, fileUrl })
  } catch (error) {
    console.error('KYC upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
