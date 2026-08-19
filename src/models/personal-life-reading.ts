/** A reusable narrative section for Burmese personal-life reading content. */
export interface ReadingSection {
  summary: string
  details: string[]
}

/** Structured content for a complete personal-life reading. */
export interface PersonalLifeReading {
  education: ReadingSection
  careerBusiness: ReadingSection
  social: ReadingSection
  love: ReadingSection
  future: ReadingSection
  shouldDo: string[]
  shouldAvoid: string[]
}
