import type { Metadata } from 'next'
import ReviewDeck from '@/components/review/ReviewDeck'
import { requireReview } from '@/lib/review'
import { deckCards } from '@/lib/review-deck'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Review deck',
  robots: { index: false, follow: false },
}

export default function DeckPage({ params, searchParams }: { params: { lang: string }; searchParams: { k?: string } }) {
  requireReview(searchParams.k)
  const cards = deckCards()
  return (
    <div className="ui-canvas min-h-screen">
      <ReviewDeck cards={cards} token={searchParams.k!} />
      <noscript><p className="container-editorial type-body">The deck needs JavaScript; use the review list instead.</p></noscript>
    </div>
  )
}
