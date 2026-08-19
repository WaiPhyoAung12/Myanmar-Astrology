import type { PersonalAstrologyResult } from './personal-astrology-result'
import type { PersonalInformation } from './personal-information'

/** A custom application score constrained at runtime to the inclusive 0–100 range. */
export type ApplicationCompatibilityScore = number

export type TraditionalCompatibilityEvidence =
  | 'documented-friendly'
  | 'documented-hostile'
  | 'undocumented'
  | 'wednesday-ambiguity'

export type CompatibilityDimension =
  | 'love'
  | 'communication'
  | 'understanding'
  | 'long-term-relationship'

export interface UnscoredCompatibilityDimension {
  dimension: CompatibilityDimension
  status: 'not-scored'
  score: null
  reason: string
}

export interface CompatibilityPersonResult {
  personalInformation: PersonalInformation
  astrology: PersonalAstrologyResult
}

/** A relationship result that keeps traditional evidence separate from custom scoring. */
export interface LoveCompatibilityResult {
  person1: CompatibilityPersonResult
  person2: CompatibilityPersonResult
  traditionalEvidence: TraditionalCompatibilityEvidence
  overallApplicationCompatibilityScore: ApplicationCompatibilityScore
  applicationCompatibilityLevel: string
  loveScore: UnscoredCompatibilityDimension
  communicationScore: UnscoredCompatibilityDimension
  understandingScore: UnscoredCompatibilityDimension
  longTermRelationshipScore: UnscoredCompatibilityDimension
  loveInterpretation: string
  communicationInterpretation: string
  emotionalUnderstandingInterpretation: string
  trustInterpretation: string
  affectionInterpretation: string
  conflictResolutionInterpretation: string
  longTermInterpretation: string
  relationshipOverview: readonly string[]
  compatibilityStrengths: readonly string[]
  potentialChallenges: readonly string[]
  recommendedActions: readonly string[]
  actionsToAvoid: readonly string[]
  burmeseExplanation: string
  scoreDisclosure: string
}
