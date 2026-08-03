import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth, ensureLocalUser } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { assertSameOrigin } from '@/lib/security'

const KYC_BUCKET = 'kyc-documents'
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
}
const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(req: Request) {
  const originGuard = assertSameOrigin(req)
  if (originGuard) return originGuard

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

    const extension = ALLOWED_TYPES[file.type]
    if (!extension) {
      return NextResponse.json({ error: 'Invalid file type. Upload JPEG, PNG, WebP or PDF.' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const randomId = crypto.randomUUID()
    const objectPath = `${localUser.id}/${randomId}.${extension}`

    const supabase = createAdminClient()
    const { error: uploadError } = await supabase.storage
      .from(KYC_BUCKET)
      .upload(objectPath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('KYC storage upload error:', uploadError)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    // Store the object path for compatibility. Never expose it as a public URL.
    await prisma.profile.upsert({
      where: { userId: localUser.id },
      create: {
        userId: localUser.id,
        role: 'TALENT',
        kycFileUrl: objectPath,
        kycStatus: 'SUBMITTED',
      },
      update: {
        kycFileUrl: objectPath,
        kycStatus: 'SUBMITTED',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('KYC upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
