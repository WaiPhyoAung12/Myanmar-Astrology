import type { ISODateString } from '../models/personal-information'

export interface MyanmarCalendarDate {
  year: number
}

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

// Constants from Dr. Yan Naing Aye's Myanmar calendar algorithm:
// https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
const MYANMAR_SOLAR_YEAR = 1577917828 / 4320000
const MYANMAR_EPOCH = 1954168.050623

/** Converts a proleptic Gregorian civil date to its corresponding Myanmar year. */
export function convertGregorianToMyanmarCalendar(birthDate: ISODateString): MyanmarCalendarDate {
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

  const julianDayNumber = gregorianToJulianDayNumber(year, month, day)
  const myanmarYear = Math.floor((julianDayNumber - 0.5 - MYANMAR_EPOCH) / MYANMAR_SOLAR_YEAR)

  return { year: myanmarYear }
}

function gregorianToJulianDayNumber(year: number, month: number, day: number): number {
  const januaryOrFebruary = Math.floor((14 - month) / 12)
  const adjustedYear = year + 4800 - januaryOrFebruary
  const adjustedMonth = month + 12 * januaryOrFebruary - 3

  return day
    + Math.floor((153 * adjustedMonth + 2) / 5)
    + 365 * adjustedYear
    + Math.floor(adjustedYear / 4)
    - Math.floor(adjustedYear / 100)
    + Math.floor(adjustedYear / 400)
    - 32045
}
