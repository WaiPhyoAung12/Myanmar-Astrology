import { describe, expect, it } from 'vitest'
import { calculateApplicationCompatibilityScore, clampCompatibilityScore } from './application-compatibility-scoring'

describe('calculateApplicationCompatibilityScore', () => {
  it.each([
    ['documented-friendly', 75],
    ['documented-hostile', 25],
    ['undocumented', 50],
    ['wednesday-ambiguity', 50],
  ] as const)('scores %s as %i', (evidence, expected) => {
    expect(calculateApplicationCompatibilityScore(evidence)).toBe(expected)
  })
})

describe('clampCompatibilityScore', () => {
  it.each([[-20, 0], [0, 0], [42, 42], [100, 100], [140, 100]] as const)(
    'clamps %i to %i',
    (score, expected) => expect(clampCompatibilityScore(score)).toBe(expected),
  )
})
