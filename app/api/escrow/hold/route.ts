import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Direct escrow creation is disabled. Escrow is created only from a verified payment callback.',
    },
    { status: 410 }
  )
}
