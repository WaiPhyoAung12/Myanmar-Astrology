import type { BirthWeekday } from '../models/personal-astrology-result'
import type { ISODateString } from '../models/personal-information'
import type { MahaboteHouseKey, MahaboteHouseName, MahaboteResult } from '../models/mahabote'
import { calculateBirthWeekday } from './birth-date'
import { convertGregorianToMyanmarCalendar } from './myanmar-calendar'

interface MahaboteHouse {
  key: MahaboteHouseKey
  name: MahaboteHouseName
}

// Mahabote uses the traditional seven-day sequence, not the eight planetary posts.
const MAHABOTE_WEEKDAY_NUMBERS = {
  Saturday: 0,
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
} as const satisfies Record<BirthWeekday, number>

const MAHABOTE_HOUSES: readonly MahaboteHouse[] = [
  { key: 'binga', name: 'ဘင်္ဂ' },
  { key: 'atuna', name: 'အထွန်း' },
  { key: 'yaza', name: 'ရာဇ' },
  { key: 'adhipati', name: 'အဓိပတိ' },
  { key: 'marana', name: 'မရဏ' },
  { key: 'thike', name: 'သိုက်' },
  { key: 'puti', name: 'ပုတိ' },
]

/** Calculates a Mahabote house from the Myanmar year and seven-day birth weekday. */
export function calculateMahabote(birthDate: ISODateString): MahaboteResult {
  const { year: myanmarYear } = convertGregorianToMyanmarCalendar(birthDate)
  const birthWeekday = calculateBirthWeekday(birthDate)
  const weekdayNumber = MAHABOTE_WEEKDAY_NUMBERS[birthWeekday]
  const remainder = ((myanmarYear - weekdayNumber) % 7 + 7) % 7
  const house = MAHABOTE_HOUSES[remainder]

  return {
    myanmarYear,
    remainder,
    houseKey: house.key,
    houseName: house.name,
  }
}
