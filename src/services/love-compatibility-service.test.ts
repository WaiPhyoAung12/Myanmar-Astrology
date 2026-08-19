import { describe, expect, it } from 'vitest'
import { calculateLoveCompatibility, classifyTraditionalCompatibility } from './love-compatibility-service'

describe('classifyTraditionalCompatibility', () => {
  it.each([
    ['Sunday', 'Friday', 'documented-friendly'],
    ['Friday', 'Sunday', 'documented-friendly'],
    ['Tuesday', 'Thursday', 'documented-friendly'],
    ['Saturday', 'Thursday', 'documented-hostile'],
    ['Monday', 'Friday', 'documented-hostile'],
    ['Sunday', 'Monday', 'undocumented'],
    ['Wednesday', 'Monday', 'wednesday-ambiguity'],
  ] as const)('classifies %s and %s as %s', (first, second, expected) => {
    expect(classifyTraditionalCompatibility(first, second)).toBe(expected)
  })
})

describe('calculateLoveCompatibility', () => {
  it('reuses personal astrology and returns a documented friendly result', () => {
    const result = calculateLoveCompatibility(
      { name: 'Sunday person', birthDate: '2024-01-07' },
      { name: 'Friday person', birthDate: '2024-01-12' },
    )

    expect(result.person1.astrology.birthWeekday).toBe('Sunday')
    expect(result.person2.astrology.birthWeekday).toBe('Friday')
    expect(result.traditionalEvidence).toBe('documented-friendly')
    expect(result.overallApplicationCompatibilityScore).toBe(75)
    expect(result.compatibilityStrengths.length).toBeGreaterThan(0)
  })

  it('leaves unsupported relationship dimensions unscored', () => {
    const result = calculateLoveCompatibility(
      { name: 'One', birthDate: '2024-01-08' },
      { name: 'Two', birthDate: '2024-01-09' },
    )

    expect(result.loveScore.score).toBeNull()
    expect(result.communicationScore.status).toBe('not-scored')
    expect(result.understandingScore.status).toBe('not-scored')
    expect(result.longTermRelationshipScore.status).toBe('not-scored')
    expect(result.overallApplicationCompatibilityScore).toBe(50)
  })

  it('produces different evidence content for Tuesday-Saturday and Tuesday-Thursday', () => {
    const tuesdaySaturday = calculateLoveCompatibility(
      { name: 'Tuesday', birthDate: '2024-01-09' },
      { name: 'Saturday', birthDate: '2024-01-13' },
    )
    const tuesdayThursday = calculateLoveCompatibility(
      { name: 'Tuesday', birthDate: '2024-01-09' },
      { name: 'Thursday', birthDate: '2024-01-11' },
    )

    expect(tuesdaySaturday.traditionalEvidence).toBe('undocumented')
    expect(tuesdaySaturday.overallApplicationCompatibilityScore).toBe(50)
    expect(tuesdayThursday.traditionalEvidence).toBe('documented-friendly')
    expect(tuesdayThursday.overallApplicationCompatibilityScore).toBe(75)
    expect(tuesdaySaturday.relationshipOverview).not.toEqual(tuesdayThursday.relationshipOverview)
    expect(tuesdaySaturday.communicationInterpretation).not.toBe(tuesdayThursday.communicationInterpretation)
    expect(tuesdaySaturday.loveInterpretation).not.toBe(tuesdaySaturday.communicationInterpretation)
  })

  it('keeps approved scores and distinct readings for the requested pair types', () => {
    const pairs = [
      calculateLoveCompatibility({ name: 'Tuesday', birthDate: '2024-01-09' }, { name: 'Saturday', birthDate: '2024-01-13' }),
      calculateLoveCompatibility({ name: 'Tuesday', birthDate: '2024-01-09' }, { name: 'Thursday', birthDate: '2024-01-11' }),
      calculateLoveCompatibility({ name: 'Monday', birthDate: '2024-01-08' }, { name: 'Friday', birthDate: '2024-01-12' }),
    ]
    expect(pairs.map((result) => result.overallApplicationCompatibilityScore)).toEqual([50, 75, 25])
    expect(new Set(pairs.map((result) => result.communicationInterpretation)).size).toBe(3)
    for (const result of pairs) expect(result.loveInterpretation).not.toContain('ဤအပိုင်းအတွက် သီးခြားရမှတ်')
  })
})
