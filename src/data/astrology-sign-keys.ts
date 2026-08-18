import type { AstrologySignKey } from '../models/astrology-interpretation'
import type { MyanmarWeekdaySign } from '../models/personal-astrology-result'

export const ASTROLOGY_SIGN_KEYS = {
  Sunday: 'sunday', Monday: 'monday', Tuesday: 'tuesday',
  'Wednesday Morning': 'wednesdayMorning',
  'Wednesday Afternoon (Rahu)': 'wednesdayRahu',
  Thursday: 'thursday', Friday: 'friday', Saturday: 'saturday',
} as const satisfies Record<MyanmarWeekdaySign, AstrologySignKey>
