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
    expect(result.mahabote).toEqual({ myanmarYear: 1385, remainder: 2, houseKey: 'yaza', houseName: 'ရာဇ' })
  })

  it('selects the normalized interpretation key for Tuesday', () => {
    const result = calculatePersonalAstrology({ name: 'Test', birthDate: '2024-01-09' })
    expect(result.signKey).toBe('tuesday')
    expect(result.interpretation?.classification).toBe('application-interpretive-guidance')
  })

  it('calculates Mahabote independently of the Wednesday morning/Rahu split', () => {
    const morning = calculatePersonalAstrology({ name: 'Test', birthDate: '2024-01-10', birthTime: '08:00' })
    const rahu = calculatePersonalAstrology({ name: 'Test', birthDate: '2024-01-10', birthTime: '18:00' })

    expect(morning.association?.weekdaySign).toBe('Wednesday Morning')
    expect(rahu.association?.weekdaySign).toBe('Wednesday Afternoon (Rahu)')
    expect(morning.mahabote).toEqual(rahu.mahabote)
  })
})
