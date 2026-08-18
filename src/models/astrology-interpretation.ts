export type AstrologySignKey = 'sunday' | 'monday' | 'tuesday' | 'wednesdayMorning' | 'wednesdayRahu' | 'thursday' | 'friday' | 'saturday'
export type FocusPriority = 'high' | 'medium' | 'maintain'

export interface InterpretationItem { title: string; description: string }
export interface FutureFocus { career: FocusPriority; finance: FocusPriority; relationship: FocusPriority; personalGrowth: FocusPriority }

/** Editorial guidance created by this application; it is not a traditional rule set. */
export interface AstrologyInterpretation {
  classification: 'application-interpretive-guidance'
  personality: string
  strengths: readonly InterpretationItem[]
  challenges: readonly InterpretationItem[]
  love: string
  career: string
  money: string
  communication: string
  personalGrowth: readonly InterpretationItem[]
  shouldDo: readonly string[]
  shouldAvoid: readonly string[]
  futureFocus: FutureFocus
  generalGuidance: string
}
