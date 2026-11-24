#!/usr/bin/env node
/**
 * Send one draft-review ping to Telegram.
 *
 *   TELEGRAM_BOT_TOKEN=... node scripts/notify-review.mjs <lang> <slug>
 *
 * Run by hand when a draft is ready, never at build time. The token is read from
 * the environment and never printed.
 */
import { getArticle } from '../lib/articles.mjs'

const SITE = 'https://upahje.my'
const thesis = (description) => (description.split(/(?<=[.!?])\s+/)[0] || description).trim()

const CHAT_ID = '479984073'
const [lang, slug] = process.argv.slice(2)

if (!lang || !slug) {
  console.error('usage: node scripts/notify-review.mjs <en|ms> <slug>')
  process.exit(1)
}
const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) {
  console.error('notify-review: TELEGRAM_BOT_TOKEN is not set')
  process.exit(1)
}
const article = getArticle(lang, slug)
if (!article?.title) {
  console.error(`notify-review: no article ${lang}/${slug}`)
  process.exit(1)
}

const url = `${SITE}/${lang}/review/${slug}${process.env.REVIEW_TOKEN ? `?k=${process.env.REVIEW_TOKEN}` : ''}`
const text = `Draft ready for review\n\n${article.title}\n${thesis(article.description)}\n\n${url}`
const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ chat_id: CHAT_ID, text, disable_web_page_preview: true }),
})
const payload = await response.json().catch(() => ({}))
if (!response.ok || payload.ok !== true) {
  console.error(`notify-review: Telegram rejected the message (HTTP ${response.status})`)
  process.exit(1)
}
console.log('notify-review: sent')
console.log(JSON.stringify({ ok: payload.ok, chat: payload.result?.chat?.id, message_id: payload.result?.message_id }))
