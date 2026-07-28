import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getDashboardPath,
  normalizeInternalRedirect,
  normalizeRegistrationRole,
  toProfileRole,
} from '../lib/auth-redirect.ts'

test('normalizeInternalRedirect keeps internal paths and query strings', () => {
  assert.equal(
    normalizeInternalRedirect('/jobs/post?draft=1#details'),
    '/jobs/post?draft=1#details',
  )
})

test('normalizeInternalRedirect rejects absolute and protocol-relative URLs', () => {
  assert.equal(
    normalizeInternalRedirect('https://evil.example/steal', '/dashboard'),
    '/dashboard',
  )
  assert.equal(
    normalizeInternalRedirect('//evil.example/steal', '/dashboard'),
    '/dashboard',
  )
})

test('normalizeInternalRedirect rejects backslash-based cross-origin URLs', () => {
  assert.equal(
    normalizeInternalRedirect('/\\evil.example/steal', '/dashboard'),
    '/dashboard',
  )
  assert.equal(
    normalizeInternalRedirect('/%5Cevil.example/steal', '/dashboard'),
    '/%5Cevil.example/steal',
  )
})

test('registration roles never accept admin', () => {
  assert.equal(normalizeRegistrationRole('EMPLOYER'), 'employer')
  assert.equal(normalizeRegistrationRole('talent'), 'talent')
  assert.equal(normalizeRegistrationRole('ADMIN'), null)
  assert.equal(toProfileRole('ADMIN'), null)
})

test('dashboard paths are role-aware', () => {
  assert.equal(getDashboardPath('EMPLOYER'), '/dashboard/employer')
  assert.equal(getDashboardPath('TALENT'), '/dashboard/talent')
  assert.equal(getDashboardPath('ADMIN'), '/admin')
  assert.equal(getDashboardPath(null), '/dashboard')
})
