import type {
  AnimalSign,
  AstrologicalDirection,
  BirthWeekday,
  MyanmarWeekdaySign,
  PlanetaryRuler,
} from '../models/personal-astrology-result'

/** Burmese display labels only; calculation values remain unchanged in English. */
export const BURMESE_BIRTH_WEEKDAYS = {
  Sunday: 'တနင်္ဂနွေ',
  Monday: 'တနင်္လာ',
  Tuesday: 'အင်္ဂါ',
  Wednesday: 'ဗုဒ္ဓဟူး',
  Thursday: 'ကြာသပတေး',
  Friday: 'သောကြာ',
  Saturday: 'စနေ',
} as const satisfies Record<BirthWeekday, string>

export const BURMESE_WEEKDAY_SIGNS = {
  Sunday: 'တနင်္ဂနွေနံ',
  Monday: 'တနင်္လာနံ',
  Tuesday: 'အင်္ဂါနံ',
  'Wednesday Morning': 'ဗုဒ္ဓဟူး မနက်ပိုင်း',
  'Wednesday Afternoon (Rahu)': 'ရာဟု / ဗုဒ္ဓဟူး နေ့လယ်ပိုင်း',
  Thursday: 'ကြာသပတေးနံ',
  Friday: 'သောကြာနံ',
  Saturday: 'စနေနံ',
} as const satisfies Record<MyanmarWeekdaySign, string>

export const BURMESE_PLANETS = {
  Sun: 'နေဂြိုဟ်',
  Moon: 'လဂြိုဟ်',
  Mars: 'အင်္ဂါဂြိုဟ်',
  Mercury: 'ဗုဒ္ဓဟူးဂြိုဟ်',
  Rahu: 'ရာဟုဂြိုဟ်',
  Jupiter: 'ကြာသပတေးဂြိုဟ်',
  Venus: 'သောကြာဂြိုဟ်',
  Saturn: 'စနေဂြိုဟ်',
} as const satisfies Record<PlanetaryRuler, string>

export const BURMESE_ANIMAL_SIGNS = {
  Garuda: 'ဂဠုန်',
  Tiger: 'ကျား',
  'Chinthe (Lion)': 'ခြင်္သေ့',
  'Tusked Elephant': 'အစွယ်ပါဆင်',
  'Tuskless Elephant': 'အစွယ်မဲ့ဆင်',
  Rat: 'ကြွက်',
  'Guinea Pig': 'ပူး',
  Naga: 'နဂါး',
} as const satisfies Record<AnimalSign, string>

export const BURMESE_DIRECTIONS = {
  Northeast: 'အရှေ့မြောက်အရပ်',
  East: 'အရှေ့အရပ်',
  Southeast: 'အရှေ့တောင်အရပ်',
  South: 'တောင်အရပ်',
  Northwest: 'အနောက်မြောက်အရပ်',
  West: 'အနောက်အရပ်',
  North: 'မြောက်အရပ်',
  Southwest: 'အနောက်တောင်အရပ်',
} as const satisfies Record<AstrologicalDirection, string>
