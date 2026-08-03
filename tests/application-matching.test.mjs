import assert from 'node:assert/strict'
import test from 'node:test'
import {
  parseApplicationAction,
  scoreApplicationMatch,
} from '../lib/application-matching.ts'

test('fit signal combines track, category, location, and verified KYC', () => {
  assert.deepEqual(
    scoreApplicationMatch({
      jobTrack: 'LABOUR',
      talentTrack: 'LABOUR',
      jobCategoryId: 'cleaning',
      talentCategoryIds: ['cleaning'],
      jobLocation: 'Shah Alam, Selangor',
      talentState: 'Selangor',
      talentArea: 'Shah Alam',
      kycStatus: 'VERIFIED',
    }),
    {
      score: 100,
      reasons: [
        'Track matches',
        'Category matches',
        'Location aligns',
        'MyKad verified',
      ],
    },
  )
})

test('submitted KYC earns a smaller trust signal', () => {
  const result = scoreApplicationMatch({
    jobTrack: 'TECHNICAL',
    talentTrack: 'TECHNICAL',
    jobCategoryId: 'web',
    talentCategoryIds: [],
    kycStatus: 'SUBMITTED',
  })

  assert.equal(result.score, 43)
  assert.deepEqual(result.reasons, ['Track matches', 'MyKad submitted'])
})

test('application actions reject unknown state changes', () => {
  assert.equal(parseApplicationAction('ACCEPT'), 'ACCEPT')
  assert.equal(parseApplicationAction('REJECT'), 'REJECT')
  assert.equal(parseApplicationAction('WITHDRAW'), 'WITHDRAW')
  assert.equal(parseApplicationAction('APPROVE'), null)
  assert.equal(parseApplicationAction(null), null)
})
