'use client'

import { useState } from 'react'

/**
 * Copy and share controls. Clipboard writes can hang or be denied (permissions,
 * insecure context, headless), so the API write races a short timeout and falls
 * back to the selection-copy path. Either way the reader gets a visible status.
 */
export default function ShareControls({ title, url, labels }: { title: string; url: string; labels: { share: string; copy: string; copied: string; failed: string } }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const withTimeout = <T,>(promise: Promise<T>, ms: number) =>
    Promise.race([promise, new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))])

  const fallbackCopy = (text: string) => {
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.top = '-1000px'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(area)
      return ok
    } catch {
      return false
    }
  }

  const copy = async () => {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await withTimeout(navigator.clipboard.writeText(url), 700)
        ok = true
      }
    } catch {
      ok = false
    }
    if (!ok) ok = fallbackCopy(url)
    setStatus(ok ? 'copied' : 'failed')
    setTimeout(() => setStatus('idle'), 2500)
  }

  const share = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // cancelled or unsupported at call time: fall through to copy
      }
    }
    await copy()
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={copy} className="type-small share-button">{labels.copy}</button>
      <button type="button" onClick={share} className="type-small share-button">{labels.share}</button>
      <span role="status" aria-live="polite" className="type-small" style={{ color: 'var(--ui-muted)' }}>
        {status === 'copied' ? labels.copied : status === 'failed' ? labels.failed : ''}
      </span>
    </div>
  )
}
