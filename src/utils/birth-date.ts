import type { BirthWeekday, MyanmarWeekdaySign } from '../models/personal-astrology-result'
import type { ISODateString, LocalTimeString } from '../models/personal-information'

const WEEKDAYS: readonly BirthWeekday[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/
const LOCAL_TIME_PATTERN = /^(\d{2}):(\d{2})$/

/** Calculates a civil weekday without allowing the browser timezone to shift the date. */
export function calculateBirthWeekday(birthDate: ISODateString): BirthWeekday {
  const match = ISO_DATE_PATTERN.exec(birthDate)
  if (!match) throw new RangeError('Birth date must use the YYYY-MM-DD format.')

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(0, 0, 0, 0)

  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new RangeError('Birth date is not a valid Gregorian calendar date.')
  }

  return WEEKDAYS[date.getUTCDay()]
}

/** Resolves the traditional eight-sign weekday, using noon as the Wednesday boundary. */
export function resolveMyanmarWeekdaySign(weekday: BirthWeekday, birthTime?: LocalTimeString): MyanmarWeekdaySign | null {
  if (birthTime === undefined) return weekday === 'Wednesday' ? null : weekday

  const match = LOCAL_TIME_PATTERN.exec(birthTime)
  if (!match) throw new RangeError('Birth time must use the 24-hour HH:mm format.')

  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) throw new RangeError('Birth time is not a valid local time.')

  if (weekday !== 'Wednesday') return weekday
  return hours < 12 ? 'Wednesday Morning' : 'Wednesday Afternoon (Rahu)'
}
