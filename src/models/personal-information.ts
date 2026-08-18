/** A calendar date formatted as YYYY-MM-DD. */
export type ISODateString = string

/** A local time formatted as HH:mm using the 24-hour clock. */
export type LocalTimeString = string

/** Birth details collected for an astrology reading. */
export interface PersonalInformation {
  name: string
  birthDate: ISODateString
  birthTime?: LocalTimeString
  birthPlace?: string
}
