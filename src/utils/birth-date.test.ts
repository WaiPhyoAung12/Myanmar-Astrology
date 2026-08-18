import { describe, expect, it } from 'vitest'
import { calculateBirthWeekday, resolveMyanmarWeekdaySign } from './birth-date'

describe('calculateBirthWeekday', () => {
  it.each([
    ['2024-01-07', 'Sunday'], ['2024-01-08', 'Monday'], ['2024-01-09', 'Tuesday'],
    ['2024-01-10', 'Wednesday'], ['2024-01-11', 'Thursday'], ['2024-01-12', 'Friday'],
    ['2024-01-13', 'Saturday'], ['2000-02-29', 'Tuesday'],
  ] as const)('maps %s to %s', (date, expected) => {
    expect(calculateBirthWeekday(date)).toBe(expected)
  })

  it.each(['2023-02-29', '2024-13-01', 'not-a-date'])('rejects invalid date %s', (date) => {
    expect(() => calculateBirthWeekday(date)).toThrow(RangeError)
  })
})

describe('resolveMyanmarWeekdaySign', () => {
  it('does not require a time for non-Wednesday births', () => {
    expect(resolveMyanmarWeekdaySign('Monday')).toBe('Monday')
  })

  it('validates a supplied time even when the birth is not on Wednesday', () => {
    expect(() => resolveMyanmarWeekdaySign('Monday', '25:00')).toThrow(RangeError)
  })

  it('keeps a Wednesday without time unresolved', () => {
    expect(resolveMyanmarWeekdaySign('Wednesday')).toBeNull()
  })

  it.each([
    ['00:00', 'Wednesday Morning'], ['11:59', 'Wednesday Morning'],
    ['12:00', 'Wednesday Afternoon (Rahu)'], ['23:59', 'Wednesday Afternoon (Rahu)'],
  ] as const)('resolves %s as %s', (time, expected) => {
    expect(resolveMyanmarWeekdaySign('Wednesday', time)).toBe(expected)
  })

  it.each(['24:00', '12:60', 'noon'])('rejects invalid time %s', (time) => {
    expect(() => resolveMyanmarWeekdaySign('Wednesday', time)).toThrow(RangeError)
  })
})
