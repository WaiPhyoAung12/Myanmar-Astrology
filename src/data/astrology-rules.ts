import type { AstrologyAssociation, MyanmarWeekdaySign } from '../models/personal-astrology-result'

/** Documented traditional planetary-post associations approved for V1. */
export const ASTROLOGY_ASSOCIATIONS = {
  Sunday: { weekdaySign: 'Sunday', planet: 'Sun', animalSign: 'Garuda', direction: 'Northeast' },
  Monday: { weekdaySign: 'Monday', planet: 'Moon', animalSign: 'Tiger', direction: 'East' },
  Tuesday: { weekdaySign: 'Tuesday', planet: 'Mars', animalSign: 'Chinthe (Lion)', direction: 'Southeast' },
  'Wednesday Morning': { weekdaySign: 'Wednesday Morning', planet: 'Mercury', animalSign: 'Tusked Elephant', direction: 'South' },
  'Wednesday Afternoon (Rahu)': { weekdaySign: 'Wednesday Afternoon (Rahu)', planet: 'Rahu', animalSign: 'Tuskless Elephant', direction: 'Northwest' },
  Thursday: { weekdaySign: 'Thursday', planet: 'Jupiter', animalSign: 'Rat', direction: 'West' },
  Friday: { weekdaySign: 'Friday', planet: 'Venus', animalSign: 'Guinea Pig', direction: 'North' },
  Saturday: { weekdaySign: 'Saturday', planet: 'Saturn', animalSign: 'Naga', direction: 'Southwest' },
} as const satisfies Record<MyanmarWeekdaySign, AstrologyAssociation>

export const INTERPRETATION_UNAVAILABLE_REASON =
  'Personality traits and general readings are not included because no authoritative interpretation corpus has been approved.'

