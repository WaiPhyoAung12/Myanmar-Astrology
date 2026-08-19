import { BURMESE_BIRTH_WEEKDAYS, BURMESE_PLANETS, BURMESE_WEEKDAY_SIGNS } from '../data'
import { MAHABOTE_RELATIONSHIP_PROFILES, WEEKDAY_RELATIONSHIP_PROFILES } from '../data/compatibility-interpretation-profiles'
import type { ApplicationCompatibilityScore, CompatibilityPersonResult, TraditionalCompatibilityEvidence } from '../models/love-compatibility'

export interface CompatibilityInterpretation {
  level: string
  overview: readonly string[]
  strengths: readonly string[]
  challenges: readonly string[]
  recommendedActions: readonly string[]
  actionsToAvoid: readonly string[]
  love: string
  communication: string
  emotionalUnderstanding: string
  trust: string
  affection: string
  conflictResolution: string
  longTerm: string
  burmeseExplanation: string
}

function scoreContext(evidence: TraditionalCompatibilityEvidence, score: ApplicationCompatibilityScore): string {
  if (evidence === 'documented-friendly') return `ရိုးရာနေ့နံမှတ်တမ်းတွင် သင့်မြတ်သောအတွဲဖြစ်ပြီး application ရမှတ် ${score} ရရှိထားပါသည်။`
  if (evidence === 'documented-hostile') return `ရိုးရာနေ့နံမှတ်တမ်းတွင် ပိုမိုညှိနှိုင်းရန်လိုသောအတွဲဖြစ်ပြီး application ရမှတ် ${score} ရရှိထားပါသည်။ ယင်းက ဆက်ဆံရေးရလဒ်ကို အတိအကျဆုံးဖြတ်ခြင်းမဟုတ်ပါ။`
  if (evidence === 'wednesday-ambiguity') return `ဗုဒ္ဓဟူးခွဲခြားချက်အတွက် အထောက်အထားမပြည့်စုံသဖြင့် application က ကြားနေ ${score} မှတ်သာထားပါသည်။`
  return `ဤနေ့နံအတွဲအတွက် ရိုးရာစည်းမျဉ်းမရှိသေးသဖြင့် application က ကြားနေ ${score} မှတ်သာထားပါသည်။`
}

/** Deterministic pair composer. Mahabote supplies application context but never alters scoring. */
export function createCompatibilityInterpretation(first: CompatibilityPersonResult, second: CompatibilityPersonResult, evidence: TraditionalCompatibilityEvidence, score: ApplicationCompatibilityScore): CompatibilityInterpretation {
  const w1 = WEEKDAY_RELATIONSHIP_PROFILES[first.astrology.birthWeekday]
  const w2 = WEEKDAY_RELATIONSHIP_PROFILES[second.astrology.birthWeekday]
  const h1 = MAHABOTE_RELATIONSHIP_PROFILES[first.astrology.mahabote.houseKey]
  const h2 = MAHABOTE_RELATIONSHIP_PROFILES[second.astrology.mahabote.houseKey]
  const n1 = first.personalInformation.name
  const n2 = second.personalInformation.name
  const context = scoreContext(evidence, score)
  const sign1 = first.astrology.association ? BURMESE_WEEKDAY_SIGNS[first.astrology.association.weekdaySign] : BURMESE_BIRTH_WEEKDAYS[first.astrology.birthWeekday]
  const sign2 = second.astrology.association ? BURMESE_WEEKDAY_SIGNS[second.astrology.association.weekdaySign] : BURMESE_BIRTH_WEEKDAYS[second.astrology.birthWeekday]
  const planet1 = first.astrology.association ? BURMESE_PLANETS[first.astrology.association.planet] : 'ဂြိုဟ်မသတ်မှတ်ရသေး'
  const planet2 = second.astrology.association ? BURMESE_PLANETS[second.astrology.association.planet] : 'ဂြိုဟ်မသတ်မှတ်ရသေး'
  return {
    level: evidence === 'documented-friendly' ? 'ရိုးရာအရ သင့်မြတ်မှုရှိသောအတွဲ' : evidence === 'documented-hostile' ? 'ပိုမိုညှိနှိုင်းရန်လိုသောအတွဲ' : 'အပြန်အလှန်နားလည်မှုဖြင့် တည်ဆောက်ရမည့်အတွဲ',
    overview: [`${n1} (${sign1}၊ ${planet1}၊ မဟာဘုတ် ${first.astrology.mahabote.houseName}) နှင့် ${n2} (${sign2}၊ ${planet2}၊ မဟာဘုတ် ${second.astrology.mahabote.houseName}) တို့ကို တွဲဖက်ကြည့်ထားပါသည်။ ${context}`, `${n1} ဘက်တွင် ${w1.tendency} ${n2} ဘက်တွင် ${w2.tendency} ကွာခြားမှုကို အားဖြည့်နိုင်သည့်ပုံစံအဖြစ် သုံးနိုင်ပါက ဆက်ဆံရေးပိုကောင်းလာနိုင်ပါသည်။`],
    love: `${n1} သည် ${w1.tendency} ${n2} သည် ${w2.tendency} ချစ်ခင်မှုဖော်ပြပုံ မတူနိုင်သော်လည်း နှစ်ဦးလိုအပ်ချက်ကို တိတိကျကျပြောနိုင်ပါက ပိုမိုနီးကပ်လာနိုင်ပါသည်။`,
    communication: `${n1} ဘက်တွင် ${w1.communication} ${n2} ဘက်တွင် ${w2.communication} နားလည်မှုလွဲနိုင်သဖြင့် တစ်ဖက်၏အဓိပ္ပာယ်ကို ပြန်အနှစ်ချုပ်မေးပြီးမှ တုံ့ပြန်သင့်ပါသည်။`,
    emotionalUnderstanding: `${n1} ၏ မဟာဘုတ် ${first.astrology.mahabote.houseName} အရ ${h1.tendency} ${n2} ၏ မဟာဘုတ် ${second.astrology.mahabote.houseName} အရ ${h2.tendency} ခံစားချက်ကို ခန့်မှန်းမနေဘဲ မေးမြန်းနားထောင်ပေးနိုင်ပါက နားလည်မှုတိုးနိုင်ပါသည်။`,
    trust: `${n1} အတွက် ${h1.tendency} ${n2} အတွက် ${h2.tendency} ကတိအသေးများကိုတည်ခြင်းနှင့် ကိုယ်ပိုင်နယ်နိမိတ်ကို လေးစားခြင်းက ယုံကြည်မှုတည်ဆောက်ရန် အရေးကြီးနိုင်ပါသည်။`,
    affection: `${n1} နှင့် ${n2} တို့၏ နေ့နံစိတ်နေသဘောထားကြောင့် ကြင်နာမှုဖော်ပြပုံ ကွာနိုင်ပါသည်။ တစ်ဦးက လုပ်ရပ်ဖြင့်၊ တစ်ဦးက စကား သို့မဟုတ် အတူရှိချိန်ဖြင့် တန်ဖိုးထားနိုင်သဖြင့် နှစ်သက်သောပုံစံကို ပြောပြသင့်ပါသည်။`,
    conflictResolution: `ပြဿနာဖြစ်ချိန်တွင် ${n1} ၏ “${w1.challenge}” နှင့် ${n2} ၏ “${w2.challenge}” တို့က အခြေအနေကို ပိုကြီးစေနိုင်ပါသည်။ ခဏနားပြီး လူကိုမဝေဖန်ဘဲ ဖြစ်ရပ်၊ ခံစားချက်နှင့် လိုအပ်ချက်ကို တစ်ခုစီပြောသင့်ပါသည်။`,
    longTerm: `${context} ရေရှည်တွင် ${n1} ၏ ${h1.strength} နှင့် ${n2} ၏ ${h2.strength} ကို ပေါင်းစပ်နိုင်ခြင်းက အားသာချက်ဖြစ်နိုင်ပါသည်။ ပူးတွဲရည်မှန်းချက်နှင့် နယ်နိမိတ်တို့ကို ပုံမှန်ပြန်ညှိသင့်ပါသည်။`,
    strengths: [`${n1} ၏ ${w1.strength} နှင့် ${n2} ၏ ${w2.strength} တို့ကို အပြန်အလှန်အားဖြည့်နိုင်ပါသည်။`, `${h1.strength} နှင့် ${h2.strength} တို့က ပူးတွဲတာဝန်များတွင် အသုံးဝင်နိုင်ပါသည်။`],
    challenges: [`${n1} ၏ ${w1.challenge} နှင့် ${n2} ၏ ${w2.challenge} တို့ တိုက်ဆိုင်ချိန်တွင် သတိထားသင့်ပါသည်။`, `${h1.challenge} နှင့် ${h2.challenge} တို့ကြောင့် လိုအပ်ချက်ကို မပြောဘဲယူဆမိခြင်းကို ရှောင်သင့်ပါသည်။`],
    recommendedActions: [`အပတ်စဉ်တစ်ကြိမ် ${n1} နှင့် ${n2} တို့၏ ခံစားချက်နှင့် လိုအပ်ချက်ကို အလှည့်ကျနားထောင်ပါ။`, `${h1.strength} နှင့် ${h2.strength} ကို အသုံးချပြီး ပူးတွဲရည်မှန်းချက်သေးသေးတစ်ခု သတ်မှတ်ပါ။`],
    actionsToAvoid: [`${n1} ၏ ${w1.challenge} ကို ${n2} ၏ အကျင့်စာရိတ္တအဖြစ် တံဆိပ်မကပ်ပါနှင့်။`, `စိတ်တိုချိန်တွင် ${n2} ၏ ${w2.challenge} ကို ပြန်လည်တိုက်ခိုက်ရန် မသုံးပါနှင့်။`],
    burmeseExplanation: 'ရိုးရာနေ့နံအထောက်အထားကို application scoring အတွက်သာသုံးပြီး မဟာဘုတ်အိမ်ကို application အဓိပ္ပာယ်ဖွင့်ဆိုမှုအဖြစ်သာ ထည့်ထားပါသည်။ မဟာဘုတ်သည် ရမှတ်ကို မပြောင်းလဲပါ။',
  }
}
