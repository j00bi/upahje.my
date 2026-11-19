import type { ArticleFaq } from '@/lib/types'

/**
 * FAQ rendered as visible text (not <details>) so the same questions exist in
 * the HTML as in the FAQPage JSON-LD. Hairline between pairs, nothing between a
 * question and its answer.
 */
export default function FaqList({ items }: { items: ArticleFaq[] }) {
  if (!items.length) return null
  return (
    <section aria-labelledby="faq" className="mt-14">
      <h2 id="faq" className="ui-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ui-muted)' }}>
        FAQ
      </h2>
      <div className="mt-4">
        {items.map((item, index) => (
          <div
            key={item.question}
            className={index === 0 ? 'pt-4' : 'mt-6 border-t pt-6'}
            style={{ borderColor: 'var(--ui-rule)' }}
          >
            <h3 className="text-[16px] font-semibold leading-6" style={{ color: 'var(--ui-ink)' }}>
              {item.question}
            </h3>
            <p className="mt-2 text-[17px] leading-[1.7]" style={{ color: 'var(--ui-body)' }}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
