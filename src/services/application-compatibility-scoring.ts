import { APPLICATION_COMPATIBILITY_SCORING } from '../data/compatibility-scoring'
import type { ApplicationCompatibilityScore, TraditionalCompatibilityEvidence } from '../models/love-compatibility'

export function clampCompatibilityScore(score: number): ApplicationCompatibilityScore {
  const { minimum, maximum } = APPLICATION_COMPATIBILITY_SCORING
  return Math.min(maximum, Math.max(minimum, score))
}

/** Calculates the explicitly custom, non-traditional application score. */
export function calculateApplicationCompatibilityScore(
  evidence: TraditionalCompatibilityEvidence,
): ApplicationCompatibilityScore {
  const { neutralBaseline, friendlyAdjustment, hostileAdjustment } = APPLICATION_COMPATIBILITY_SCORING

  const adjustment = evidence === 'documented-friendly'
    ? friendlyAdjustment
    : evidence === 'documented-hostile'
      ? hostileAdjustment
      : 0

  return clampCompatibilityScore(neutralBaseline + adjustment)
}
