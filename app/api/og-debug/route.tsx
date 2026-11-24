import { NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
import { OG_FONTS } from '@/lib/og-fonts.generated.mjs'

export const dynamic = 'force-dynamic'

const buffer = (b64: string) => Uint8Array.from(Buffer.from(b64, 'base64')).buffer

/** Temporary: gated diagnostic for the social-card renderer. */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const DEBUG_KEY = 'dbg_7f2c1a9e4b6d'
  if (url.searchParams.get('k') !== DEBUG_KEY) {
    return new NextResponse('Not found', { status: 404 })
  }
  const withFonts = url.searchParams.get('fonts') === '1'
  try {
    const image = new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#FAF9F5', color: '#242824', fontSize: 64 }}>
          Diagnostic {withFonts ? 'with fonts' : 'without fonts'}
        </div>
      ),
      {
        width: 600,
        height: 315,
        ...(withFonts
          ? { fonts: [{ name: 'Inter', data: buffer(OG_FONTS.inter400), weight: 400 as const, style: 'normal' as const }] }
          : {}),
      },
    )
    return new NextResponse(String(image.headers.get('content-type')), { status: 200, headers: { 'x-og-ok': '1' } })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      withFonts,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? (error.stack || '').slice(0, 1500) : '',
    }, { status: 500 })
  }
}
