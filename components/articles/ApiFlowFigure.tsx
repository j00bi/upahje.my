/**
 * The one explanatory figure on an API article: store to API to courier.
 * Inline SVG at a fixed 360 unit width, so the labels stay legible at 360px and
 * do not balloon on desktop. No image request, explicit dimensions, title/desc.
 */
export default function ApiFlowFigure() {
  return (
    <figure style={{ maxWidth: '360px', margin: '0 0 var(--space-section)' }}>
      <svg
        viewBox="0 0 360 120"
        width="360"
        height="120"
        role="img"
        aria-labelledby="api-flow-title api-flow-desc"
        className="h-auto w-full"
        style={{ display: 'block' }}
      >
        <title id="api-flow-title">How an API sits between your store and a courier</title>
        <desc id="api-flow-desc">
          Three boxes in a row: your store sends an order to the API, the API sends the same order to the
          courier, and the courier replies with a tracking number.
        </desc>
        <g fill="none" stroke="var(--ui-rule)" strokeWidth="1.5">
          <rect x="0.75" y="36" width="104" height="48" rx="8" />
          <rect x="127.75" y="36" width="104" height="48" rx="8" />
          <rect x="254.75" y="36" width="104" height="48" rx="8" />
        </g>
        <g stroke="var(--ui-muted)" strokeWidth="1.5" fill="none">
          <path d="M107 60 H124" />
          <path d="M124 60 l-5 -3 m5 3 l-5 3" />
          <path d="M234 60 H251" />
          <path d="M251 60 l-5 -3 m5 3 l-5 3" />
        </g>
        <g fill="var(--ui-ink)" fontSize="12" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" textAnchor="middle">
          <text x="52" y="65">your store</text>
          <text x="180" y="65">API</text>
          <text x="307" y="65">courier</text>
        </g>
        <g fill="var(--ui-muted)" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" textAnchor="middle">
          <text x="115" y="27">order</text>
          <text x="242" y="27">order</text>
        </g>
      </svg>
    </figure>
  )
}
