const BURMESE_DIGITS: Record<string, string> = {
  '0': '၀', '1': '၁', '2': '၂', '3': '၃', '4': '၄',
  '5': '၅', '6': '၆', '7': '၇', '8': '၈', '9': '၉',
}

const BURMESE_MONTHS = [
  'ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်',
  'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ',
] as const

export function toBurmeseNumerals(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => BURMESE_DIGITS[digit])
}

/** Formats an ISO date for display without changing or reparsing its underlying value. */
export function formatBurmeseDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate)
  if (!match) return toBurmeseNumerals(isoDate)

  const monthIndex = Number(match[2]) - 1
  const month = BURMESE_MONTHS[monthIndex]
  if (!month) return toBurmeseNumerals(isoDate)

  return `${toBurmeseNumerals(Number(match[3]))} ${month} ${toBurmeseNumerals(match[1])}`
}
