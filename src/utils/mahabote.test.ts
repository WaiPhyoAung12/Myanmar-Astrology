import { describe, expect, it } from 'vitest'
import { calculateMahabote } from './mahabote'

describe('calculateMahabote', () => {
  it.each([
    ['2001-12-11', { myanmarYear: 1363, remainder: 2, houseKey: 'yaza', houseName: 'ရာဇ' }],
    ['2000-01-01', { myanmarYear: 1361, remainder: 3, houseKey: 'adhipati', houseName: 'အဓိပတိ' }],
    ['1948-01-04', { myanmarYear: 1309, remainder: 6, houseKey: 'puti', houseName: 'ပုတိ' }],
    ['2012-05-23', { myanmarYear: 1374, remainder: 5, houseKey: 'thike', houseName: 'သိုက်' }],
  ] as const)('calculates the traditional house for %s', (birthDate, expected) => {
    expect(calculateMahabote(birthDate)).toEqual(expected)
  })

  it('uses one Wednesday value regardless of the eight-post birth-time split', () => {
    expect(calculateMahabote('2024-01-10')).toEqual({
      myanmarYear: 1385,
      remainder: 2,
      houseKey: 'yaza',
      houseName: 'ရာဇ',
    })
  })
})
