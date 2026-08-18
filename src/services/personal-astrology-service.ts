import { ASTROLOGY_ASSOCIATIONS, MAHABOTE_NOT_CALCULATED_REASON } from '../data/astrology-rules'
import { astrologyInterpretations } from '../data/astrologyInterpretations'
import { ASTROLOGY_SIGN_KEYS } from '../data/astrology-sign-keys'
import type { PersonalAstrologyResult } from '../models/personal-astrology-result'
import type { PersonalInformation } from '../models/personal-information'
import { calculateBirthWeekday, resolveMyanmarWeekdaySign } from '../utils/birth-date'

/** Produces the complete structured result supported by the approved V1 rules. */
export function calculatePersonalAstrology(personalInformation: PersonalInformation): PersonalAstrologyResult {
  const birthWeekday = calculateBirthWeekday(personalInformation.birthDate)
  const weekdaySign = resolveMyanmarWeekdaySign(birthWeekday, personalInformation.birthTime)
  const signKey = weekdaySign === null ? null : ASTROLOGY_SIGN_KEYS[weekdaySign]

  return {
    birthWeekday,
    signKey,
    association: weekdaySign === null ? null : ASTROLOGY_ASSOCIATIONS[weekdaySign],
    resolution: weekdaySign === null ? 'birth-time-required' : 'resolved',
    interpretation: signKey === null ? null : astrologyInterpretations[signKey],
    mahabote: {
      status: 'not-calculated',
      value: null,
      reason: MAHABOTE_NOT_CALCULATED_REASON,
    },
  }
}
