'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { DeckCard } from '@/lib/review-deck'

type Action = 'approve' | 'reject' | 'needs-work'
type Pending = { action: Action; reason?: string; note?: string; until: number }

const REASONS = [
  { id: 'off-topic', label: 'Off-topic' },
  { id: 'not-sourced', label: 'Not sourced' },
  { id: 'weak-hook', label: 'Weak hook' },
  { id: 'wrong-audience', label: 'Wrong audience' },
  { id: 'other', label: 'Other' },
]

export default function ReviewDeck({ cards, token }: { cards: DeckCard[]; token: string }) {
  const [index, setIndex] = useState(0)
  const [pending, setPending] = useState<Pending | null>(null)
  const [choosing, setChoosing] = useState<Action | null>(null)
  const [reason, setReason] = useState('off-topic')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const body = useRef<HTMLDivElement | null>(null)
  const card = cards[index]

  const commit = useCallback(async (action: Action, why?: string, text?: string) => {
    if (!card) return
    setBusy(true)
    setStatus('')
    try {
      const response = await fetch('/api/review/decision', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ k: token, lang: card.lang, slug: card.slug, action, reason: why, note: text }),
      })
      const json = await response.json()
      if (!json.ok) {
        setStatus(json.error || json.message || 'decision not recorded')
        return
      }
      setStatus(action === 'approve' ? 'Approved and queued for publish' : action === 'reject' ? 'Rejected, stays a draft' : 'Marked needs work')
      setIndex((i) => Math.min(i + 1, cards.length - 1))
      body.current?.scrollTo({ top: 0 })
    } catch {
      setStatus('decision failed: network error')
    } finally {
      setBusy(false)
      setPending(null)
      setChoosing(null)
    }
  }, [card, cards.length, token])

  const schedule = (action: Action, why?: string, text?: string) => {
    if (!card) return
    setPending({ action, reason: why, note: text, until: Date.now() + 5000 })
  }

  useEffect(() => {
    if (!pending) return
    const timer = setTimeout(() => commit(pending.action, pending.reason, pending.note), Math.max(0, pending.until - Date.now()))
    return () => clearTimeout(timer)
  }, [pending, commit])

  const go = useCallback((delta: number) => {
    setIndex((i) => Math.max(0, Math.min(cards.length - 1, i + delta)))
    body.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [cards.length])

  const scrollBy = useCallback((dy: number) => {
    body.current?.scrollBy({ top: dy, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (pending || choosing) return
      const key = event.key
      if (key === 'ArrowRight') { event.preventDefault(); go(1) }
      else if (key === 'ArrowLeft') { event.preventDefault(); go(-1) }
      else if (key === 'ArrowDown') { event.preventDefault(); scrollBy(280) }
      else if (key === 'ArrowUp') { event.preventDefault(); scrollBy(-280) }
      else if (key.toLowerCase() === 'a') schedule('approve')
      else if (key.toLowerCase() === 'r') setChoosing('reject')
      else if (key.toLowerCase() === 'n') setChoosing('needs-work')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!card) {
    return (
      <div className="ui-canvas min-h-screen flex items-center justify-center">
        <p className="type-body" style={{ color: 'var(--ui-ink)' }}>{status || 'No drafts left in the deck.'}</p>
      </div>
    )
  }

  return (
    <div className="ui-canvas" style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', flexDirection: 'column' }}>
      <div className="container-editorial flex items-center justify-between" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-3)', gap: 8 }}>
        <button
          type="button"
          className="share-button type-small"
          disabled={index === 0}
          onClick={() => go(-1)}
          style={{ opacity: index === 0 ? 0.4 : 1 }}
        >
          ← Previous card
        </button>
        <span className="type-small" style={{ color: 'var(--ui-muted)' }}>{index + 1} of {cards.length}</span>
        <button
          type="button"
          className="share-button type-small"
          disabled={index === cards.length - 1}
          onClick={() => go(1)}
          style={{ opacity: index === cards.length - 1 ? 0.4 : 1 }}
        >
          Next card →
        </button>
      </div>

      <div className="container-editorial" style={{ flex: 1, display: 'flex', alignItems: 'stretch', paddingBottom: 'var(--space-3)', minHeight: 0 }}>
        <article
          style={{
            flex: 1,
            maxWidth: 'var(--measure)',
            margin: '0 auto',
            border: '1px solid var(--ui-rule)',
            background: 'var(--ui-surface)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <div ref={body} style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: 'var(--space-6)', flex: 1, minHeight: 0 }}>
            <div className="flex items-center justify-between">
              <span className="type-label" style={{ color: 'var(--ui-accent)' }}>{card.lang.toUpperCase()} · {card.verify ? 'BLOCKED' : 'draft'}</span>
              <span className="type-small" style={{ color: 'var(--ui-muted)' }}>{card.words} words · {card.sources} sources · {card.gaps} gaps</span>
            </div>
            <h1 className="type-h2 mt-3" style={{ color: 'var(--ui-ink)' }}>{card.title}</h1>
            <p className="type-small mt-2" style={{ color: 'var(--ui-body)' }}>{card.standfirst}</p>
            <p className="type-body mt-4" style={{ color: 'var(--ui-body)', whiteSpace: 'pre-wrap' }}>{card.excerpt}…</p>
            <a
              href={`/${card.lang}/review/${card.slug}?k=${encodeURIComponent(token)}`}
              className="share-button type-small mt-4"
              style={{ display: 'inline-block' }}
            >
              Read the full draft →
            </a>
            {card.verify && (
              <p className="type-small mt-4" style={{ color: '#a33127', fontWeight: 600 }}>Approve blocked: unresolved {card.verify}</p>
            )}
          </div>

          <div
            className="flex items-center justify-center gap-2"
            style={{ borderTop: '1px solid var(--ui-rule)', padding: 'var(--space-2)' }}
          >
            <button type="button" className="share-button type-small" onClick={() => scrollBy(-300)}>↑ Scroll up</button>
            <button type="button" className="share-button type-small" onClick={() => scrollBy(300)}>↓ Scroll down</button>
          </div>
        </article>
      </div>

      <div className="container-editorial" style={{ paddingBottom: 'var(--space-5)' }}>
        {pending ? (
          <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-3)' }}>
            <span className="type-small" style={{ color: 'var(--ui-body)' }}>{pending.action} queued. Undo available for 5 seconds.</span>
            <button type="button" className="share-button type-small" onClick={() => setPending(null)}>Undo</button>
          </div>
        ) : choosing === 'reject' ? (
          <div className="flex flex-wrap items-center gap-2" style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-3)' }}>
            {REASONS.map((option) => (
              <button key={option.id} type="button" className="share-button type-small" onClick={() => { setReason(option.id); schedule('reject', option.id) }}>
                {option.label}
              </button>
            ))}
            <button type="button" className="share-button type-small" onClick={() => setChoosing(null)}>Cancel</button>
          </div>
        ) : choosing === 'needs-work' ? (
          <div style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-3)' }}>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className="type-small" style={{ width: '100%', border: '1px solid var(--ui-rule)', padding: 8, background: 'var(--ui-surface)', color: 'var(--ui-ink)' }} placeholder="What needs work?" />
            <div className="mt-2 flex gap-2">
              <button type="button" className="share-button type-small" onClick={() => schedule('needs-work', undefined, note)}>Send</button>
              <button type="button" className="share-button type-small" onClick={() => setChoosing(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div style={{ borderTop: '1px solid var(--ui-rule)', paddingTop: 'var(--space-3)' }}>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="share-button type-small" disabled={busy} onClick={() => schedule('approve')}>Approve</button>
              <button type="button" className="share-button type-small" disabled={busy} onClick={() => setChoosing('reject')}>Reject</button>
              <button type="button" className="share-button type-small" disabled={busy} onClick={() => setChoosing('needs-work')}>Needs work</button>
            </div>
            <p className="type-small mt-2" style={{ color: 'var(--ui-muted)' }}>
              Keys: ← → move between cards · ↑ ↓ scroll the draft · A approve · R reject · N needs work
            </p>
          </div>
        )}
        {status && <p className="type-small mt-2" role="status" style={{ color: 'var(--ui-muted)' }}>{status}</p>}
      </div>
    </div>
  )
}
