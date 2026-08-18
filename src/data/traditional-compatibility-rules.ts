import type { BirthWeekday } from '../models/personal-astrology-result'

export type WeekdayPair = readonly [BirthWeekday, BirthWeekday]

/** Unambiguous friendly pairs documented by the approved traditional source. */
export const DOCUMENTED_FRIENDLY_WEEKDAY_PAIRS: readonly WeekdayPair[] = [
  ['Sunday', 'Friday'],
  ['Tuesday', 'Thursday'],
]

/** Unambiguous hostile pairs documented by the approved traditional source. */
export const DOCUMENTED_HOSTILE_WEEKDAY_PAIRS: readonly WeekdayPair[] = [
  ['Saturday', 'Thursday'],
  ['Friday', 'Monday'],
]

// TODO: Wednesday pairs remain unsupported until a source distinguishes
// Wednesday Morning (Mercury) from Wednesday Afternoon (Rahu).
