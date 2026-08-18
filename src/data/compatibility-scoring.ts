/**
 * Application-defined scoring constants. These numbers are not traditional
 * Myanmar astrology percentages.
 */
export const APPLICATION_COMPATIBILITY_SCORING = {
  neutralBaseline: 50,
  friendlyAdjustment: 25,
  hostileAdjustment: -25,
  minimum: 0,
  maximum: 100,
} as const

export const APPLICATION_SCORE_DISCLOSURE =
  'ဤ Application Compatibility Score သည် မှတ်တမ်းတင်ထားသော မွေးနေ့နံအတွဲစည်းမျဉ်းအနည်းငယ်ကို application က အနှစ်ချုပ်တွက်ချက်ထားခြင်းဖြစ်ပြီး ရိုးရာမြန်မာဗေဒင်ရာခိုင်နှုန်း မဟုတ်ပါ။'

export const UNSCORED_DIMENSION_REASON =
  'ဤအပိုင်းအတွက် သီးခြားရမှတ်တွက်ချက်နိုင်သော အတည်ပြုထားသည့် ရိုးရာစည်းမျဉ်း မရှိသေးပါ။'
