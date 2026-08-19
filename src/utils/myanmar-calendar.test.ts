import { describe, expect, it } from 'vitest'
import { convertGregorianToMyanmarCalendar } from './myanmar-calendar'

describe('convertGregorianToMyanmarCalendar', () => {
  it.each([
    ['2024-04-16', 1385],
    ['2024-04-17', 1386],
    ['2023-04-16', 1384],
    ['2023-04-17', 1385],
  ] as const)('converts %s across the Myanmar New Year boundary to %i ME', (date, expectedYear) => {
    expect(convertGregorianToMyanmarCalendar(date)).toEqual({ year: expectedYear })
  })

  it('matches the published reference conversion for 2000-01-01', () => {
    expect(convertGregorianToMyanmarCalendar('2000-01-01')).toEqual({ year: 1361 })
  })

  it.each(['2023-02-29', '2024-13-01', 'not-a-date'])('rejects invalid date %s', (date) => {
    expect(() => convertGregorianToMyanmarCalendar(date)).toThrow(RangeError)
  })
})
