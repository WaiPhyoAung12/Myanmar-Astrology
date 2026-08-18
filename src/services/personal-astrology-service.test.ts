import { describe, expect, it } from 'vitest'
import { calculatePersonalAstrology } from './personal-astrology-service'

describe('calculatePersonalAstrology', () => {
  it('returns the approved association for a non-Wednesday birth', () => {
    const result = calculatePersonalAstrology({ name: 'Test', birthDate: '2024-01-08' })
    expect(result.association).toEqual({ weekdaySign: 'Monday', planet: 'Moon', animalSign: 'Tiger', direction: 'East' })
    expect(result.resolution).toBe('resolved')
  })

  it('resolves Wednesday at noon as Rahu', () => {
    const result = calculatePersonalAstrology({ name: 'Test', birthDate: '2024-01-10', birthTime: '12:00' })
    expect(result.association?.planet).toBe('Rahu')
    expect(result.association?.animalSign).toBe('Tuskless Elephant')
    expect(result.association?.direction).toBe('Northwest')
  })

  it('does not invent a Wednesday sign or interpretation when data is insufficient', () => {
    const result = calculatePersonalAstrology({ name: 'Test', birthDate: '2024-01-10' })
    expect(result.association).toBeNull()
    expect(result.resolution).toBe('birth-time-required')
    expect(result.signKey).toBeNull()
    expect(result.interpretation).toBeNull()
    expect(result.mahabote.status).toBe('not-calculated')
  })

  it('selects the normalized interpretation key for Tuesday', () => {
    const result = calculatePersonalAstrology({ name: 'Test', birthDate: '2024-01-09' })
    expect(result.signKey).toBe('tuesday')
    expect(result.interpretation?.classification).toBe('application-interpretive-guidance')
  })
})
