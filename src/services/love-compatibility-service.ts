import {
  APPLICATION_SCORE_DISCLOSURE,
  UNSCORED_DIMENSION_REASON,
} from '../data/compatibility-scoring'
import {
  DOCUMENTED_FRIENDLY_WEEKDAY_PAIRS,
  DOCUMENTED_HOSTILE_WEEKDAY_PAIRS,
  type WeekdayPair,
} from '../data/traditional-compatibility-rules'
import type {
  CompatibilityDimension,
  LoveCompatibilityResult,
  TraditionalCompatibilityEvidence,
  UnscoredCompatibilityDimension,
} from '../models/love-compatibility'
import type { BirthWeekday } from '../models/personal-astrology-result'
import type { PersonalInformation } from '../models/personal-information'
import { calculateApplicationCompatibilityScore } from './application-compatibility-scoring'
import { createCompatibilityInterpretation } from './compatibility-interpretation-service'
import { calculatePersonalAstrology } from './personal-astrology-service'

function pairMatches(pair: WeekdayPair, first: BirthWeekday, second: BirthWeekday): boolean {
  return (pair[0] === first && pair[1] === second) || (pair[0] === second && pair[1] === first)
}

export function classifyTraditionalCompatibility(
  first: BirthWeekday,
  second: BirthWeekday,
): TraditionalCompatibilityEvidence {
  if (first === 'Wednesday' || second === 'Wednesday') return 'wednesday-ambiguity'
  if (DOCUMENTED_FRIENDLY_WEEKDAY_PAIRS.some((pair) => pairMatches(pair, first, second))) return 'documented-friendly'
  if (DOCUMENTED_HOSTILE_WEEKDAY_PAIRS.some((pair) => pairMatches(pair, first, second))) return 'documented-hostile'
  return 'undocumented'
}

function unscoredDimension(dimension: CompatibilityDimension): UnscoredCompatibilityDimension {
  return { dimension, status: 'not-scored', score: null, reason: UNSCORED_DIMENSION_REASON }
}

export function calculateLoveCompatibility(
  firstPerson: PersonalInformation,
  secondPerson: PersonalInformation,
): LoveCompatibilityResult {
  const firstAstrology = calculatePersonalAstrology(firstPerson)
  const secondAstrology = calculatePersonalAstrology(secondPerson)
  const traditionalEvidence = classifyTraditionalCompatibility(
    firstAstrology.birthWeekday,
    secondAstrology.birthWeekday,
  )
  const overallApplicationCompatibilityScore = calculateApplicationCompatibilityScore(traditionalEvidence)
  const person1 = { personalInformation: firstPerson, astrology: firstAstrology }
  const person2 = { personalInformation: secondPerson, astrology: secondAstrology }
  const content = createCompatibilityInterpretation(person1, person2, traditionalEvidence, overallApplicationCompatibilityScore)

  return {
    person1,
    person2,
    traditionalEvidence,
    overallApplicationCompatibilityScore,
    applicationCompatibilityLevel: content.level,
    loveScore: unscoredDimension('love'),
    communicationScore: unscoredDimension('communication'),
    understandingScore: unscoredDimension('understanding'),
    longTermRelationshipScore: unscoredDimension('long-term-relationship'),
    loveInterpretation: content.love,
    communicationInterpretation: content.communication,
    emotionalUnderstandingInterpretation: content.emotionalUnderstanding,
    trustInterpretation: content.trust,
    affectionInterpretation: content.affection,
    conflictResolutionInterpretation: content.conflictResolution,
    longTermInterpretation: content.longTerm,
    relationshipOverview: content.overview,
    compatibilityStrengths: content.strengths,
    potentialChallenges: content.challenges,
    recommendedActions: content.recommendedActions,
    actionsToAvoid: content.actionsToAvoid,
    burmeseExplanation: content.burmeseExplanation,
    scoreDisclosure: APPLICATION_SCORE_DISCLOSURE,
  }
}
