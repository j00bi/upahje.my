#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex, and anything that reads it) about the sitemap.
 * The key file must stay at /<key>.txt in public/. Run after a deploy:
 *
 *   npm run indexnow
 */
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://upahje.my'
const keyFile = fs.readdirSync(path.join(process.cwd(), 'public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f))
if (!keyFile) {
  console.error('indexnow: no key file in public/ (expected a 32-char hex name)')
  process.exit(1)
}
const key = keyFile.replace(/\.txt$/, '')
const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text()
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
console.log(`indexnow: ${urlList.length} urls`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'upahje.my', key, keyLocation: `${SITE}/${keyFile}`, urlList }),
})
console.log(`indexnow: HTTP ${res.status} ${res.statusText}`)
process.exit(res.ok || res.status === 202 ? 0 : 1)
