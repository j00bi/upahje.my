import assert from 'node:assert/strict'
import test from 'node:test'
import { isSameOrigin, previewDataEnabled } from '../lib/same-origin.ts'

test('same-origin allows matching host', () => {
  const req = new Request('http://localhost:3000/api/x', { headers: { origin: 'http://localhost:3000' } })
  assert.equal(isSameOrigin(req), true)
})
test('same-origin rejects foreign origin', () => {
  const req = new Request('http://localhost:3000/api/x', { headers: { origin: 'https://evil.example' } })
  assert.equal(isSameOrigin(req), false)
})
test('same-origin allows missing origin (curl)', () => {
  const req = new Request('http://localhost:3000/api/x')
  assert.equal(isSameOrigin(req), true)
})
test('same-origin rejects malformed origin', () => {
  const req = new Request('http://localhost:3000/api/x', { headers: { origin: 'not-a-url' } })
  assert.equal(isSameOrigin(req), false)
})
test('preview flag default off', () => {
  delete process.env.PREVIEW_DATA_ENABLED
  assert.equal(previewDataEnabled(), false)
})
test('preview flag on', () => {
  process.env.PREVIEW_DATA_ENABLED = 'true'
  assert.equal(previewDataEnabled(), true)
  delete process.env.PREVIEW_DATA_ENABLED
})
