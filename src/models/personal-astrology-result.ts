import type { AstrologyInterpretation, AstrologySignKey } from './astrology-interpretation'

/** Civil weekdays used by the personal astrology result. */
export type BirthWeekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export type MyanmarWeekdaySign = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday Morning' | 'Wednesday Afternoon (Rahu)' | 'Thursday' | 'Friday' | 'Saturday'
export type PlanetaryRuler = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Rahu' | 'Jupiter' | 'Venus' | 'Saturn'
export type AnimalSign = 'Garuda' | 'Tiger' | 'Chinthe (Lion)' | 'Tusked Elephant' | 'Tuskless Elephant' | 'Rat' | 'Guinea Pig' | 'Naga'
export type AstrologicalDirection = 'Northeast' | 'East' | 'Southeast' | 'South' | 'Northwest' | 'West' | 'North' | 'Southwest'

export interface AstrologyAssociation {
  weekdaySign: MyanmarWeekdaySign
  planet: PlanetaryRuler
  animalSign: AnimalSign
  direction: AstrologicalDirection
}

export interface UnavailableMahabote {
  status: 'not-calculated'
  value: null
  reason: string
}

/** The deterministic astrology details supported by the approved V1 rules. */
export interface PersonalAstrologyResult {
  birthWeekday: BirthWeekday
  signKey: AstrologySignKey | null
  association: AstrologyAssociation | null
  resolution: 'resolved' | 'birth-time-required'
  interpretation: AstrologyInterpretation | null
  mahabote: UnavailableMahabote
}
