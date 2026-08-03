import { NextResponse } from 'next/server'
import { isSameOrigin, previewDataEnabled } from './same-origin'

export { isSameOrigin, previewDataEnabled }

export function assertSameOrigin(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return null
}
