import { describe, expect, it } from 'vitest'
import { formatBurmeseDate, toBurmeseNumerals } from './burmese-display'

describe('Burmese display formatting', () => {
  it('converts Western digits to Burmese numerals', () => {
    expect(toBurmeseNumerals('2004')).toBe('၂၀၀၄')
  })

  it('formats an ISO date without changing its date components', () => {
    expect(formatBurmeseDate('2004-02-10')).toBe('၁၀ ဖေဖော်ဝါရီ ၂၀၀၄')
  })
})
