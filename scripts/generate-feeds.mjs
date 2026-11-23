#!/usr/bin/env node
/**
 * Writes one RSS 2.0 feed per language, so aggregators, newsletters and
 * reader apps can pick the site up without an account anywhere.
 *
 *   /feed.xml     English
 *   /ms/feed.xml  Bahasa Melayu
 *
 * Runs on prebuild alongside llms.txt.
 */
import fs from 'node:fs'
import path from 'node:path'
import { LANGUAGES, publishedArticles } from '../lib/articles.mjs'

const SITE = 'https://upahje.my'
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const rfc822 = (iso) => new Date(`${iso}T00:00:00+08:00`).toUTCString()

for (const language of LANGUAGES) {
  const articles = publishedArticles(language.code).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)))
  const items = articles.map((a) => [
    '    <item>',
    `      <title>${esc(a.title)}</title>`,
    `      <link>${SITE}/${language.code}/articles/${a.slug}</link>`,
    `      <guid isPermaLink="true">${SITE}/${language.code}/articles/${a.slug}</guid>`,
    `      <pubDate>${rfc822(a.date)}</pubDate>`,
    `      <description>${esc(a.description)}</description>`,
    '    </item>',
  ].join('\n'))
  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${esc(language.native)} — UpahJe.my</title>`,
    `    <link>${SITE}/${language.code}</link>`,
    `    <description>${esc('Plain, sourced answers about technology for Malaysian small businesses.')}</description>`,
    `    <language>${language.code === 'ms' ? 'ms-MY' : 'en-MY'}</language>`,
    `    <atom:link href="${SITE}/${language.code === 'ms' ? 'ms/' : ''}feed.xml" rel="self" type="application/rss+xml"/>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
  const out = language.code === 'ms'
    ? path.join(process.cwd(), 'public', 'ms', 'feed.xml')
    : path.join(process.cwd(), 'public', 'feed.xml')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, feed)
  console.log(`feed.xml: ${out} (${articles.length} items)`)
}
