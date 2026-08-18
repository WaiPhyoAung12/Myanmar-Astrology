import {
  BURMESE_ANIMAL_SIGNS,
  BURMESE_BIRTH_WEEKDAYS,
  BURMESE_DIRECTIONS,
  BURMESE_PLANETS,
  BURMESE_WEEKDAY_SIGNS,
} from '../../data'
import type { LoveCompatibilityResult, UnscoredCompatibilityDimension } from '../../models'
import { toBurmeseNumerals } from '../../utils'

interface CompatibilityResultProps { result: LoveCompatibilityResult }

const unsupportedDimensionReason = 'ဤအပိုင်းအတွက် သီးခြားရမှတ်တွက်ချက်နိုင်သော အတည်ပြုထားသည့် ရိုးရာစည်းမျဉ်း မရှိသေးပါ။'

function PersonAstrology({ person, label }: { person: LoveCompatibilityResult['person1']; label: string }) {
  const association = person.astrology.association
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-6">
      <p className="text-xs font-bold tracking-[0.12em] text-saffron">{label}</p>
      <h3 className="mt-2 text-xl font-semibold leading-8 text-ink">{person.personalInformation.name}</h3>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-stone-500">မွေးနေ့နံ</dt><dd className="text-right font-semibold text-ink">{BURMESE_BIRTH_WEEKDAYS[person.astrology.birthWeekday]}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-stone-500">မြန်မာဗေဒင်နေ့နံ</dt><dd className="text-right font-semibold text-ink">{association ? BURMESE_WEEKDAY_SIGNS[association.weekdaySign] : 'မွေးချိန် လိုအပ်ပါသည်'}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-stone-500">အုပ်စိုးသောဂြိုဟ်</dt><dd className="text-right font-semibold text-ink">{association ? BURMESE_PLANETS[association.planet] : 'မသတ်မှတ်နိုင်သေးပါ'}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-stone-500">နေ့နံသတ္တဝါ</dt><dd className="text-right font-semibold text-ink">{association ? BURMESE_ANIMAL_SIGNS[association.animalSign] : 'မသတ်မှတ်နိုင်သေးပါ'}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-stone-500">အရပ်မျက်နှာ</dt><dd className="text-right font-semibold text-ink">{association ? BURMESE_DIRECTIONS[association.direction] : 'မသတ်မှတ်နိုင်သေးပါ'}</dd></div>
      </dl>
    </article>
  )
}

function UnscoredCard({ title, symbol, dimension }: { title: string; symbol: string; dimension?: UnscoredCompatibilityDimension }) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-center gap-3"><span aria-hidden="true" className="text-xl text-maroon">{symbol}</span><h3 className="font-semibold leading-7 text-ink">{title}</h3></div>
      <p className="mt-5 text-lg font-semibold text-stone-500">မတွက်ချက်ထားပါ</p>
      <p className="mt-2 text-xs leading-6 text-stone-500">{dimension?.reason ?? unsupportedDimensionReason}</p>
    </article>
  )
}

export function CompatibilityResult({ result }: CompatibilityResultProps) {
  return (
    <section id="compatibility-result" lang="my" aria-live="polite" className="mt-12 font-sans">
      <div className="rounded-3xl bg-[#2f2421] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
        <p className="text-xs font-bold tracking-[0.16em] text-[#e8ad74]">💖 အက်ပ်ကတွက်ချက်သော စုစုပေါင်းလိုက်ဖက်မှုရမှတ်</p>
        <div className="mt-5 text-7xl font-semibold tracking-[-0.06em] sm:text-8xl">{toBurmeseNumerals(result.overallApplicationCompatibilityScore)}<span className="ml-1 text-3xl text-[#e8ad74]">%</span></div>
        <p className="mt-4 text-base font-semibold leading-8 text-[#f4d4b3]">{result.applicationCompatibilityLevel}</p>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-stone-300">{result.scoreDisclosure}</p>
      </div>

      <article className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold leading-8 text-ink">💗 နှစ်ဦးအချစ်ရေး အနှစ်ချုပ်</h2>
        <div className="mt-4 space-y-4 text-sm leading-8 text-stone-600 sm:text-base">
          {result.relationshipOverview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <PersonAstrology person={result.person1} label="💙 ပထမတစ်ဦး၏ ဗေဒင်အချက်အလက်" />
        <PersonAstrology person={result.person2} label="💜 ဒုတိယတစ်ဦး၏ ဗေဒင်အချက်အလက်" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UnscoredCard title="အချစ်ရေးလိုက်ဖက်မှု" symbol="♡" dimension={result.loveScore} />
        <UnscoredCard title="ပြောဆိုဆက်ဆံရေး" symbol="◌" dimension={result.communicationScore} />
        <UnscoredCard title="စိတ်ခံစားမှုနားလည်မှု" symbol="◇" dimension={result.understandingScore} />
        <UnscoredCard title="ယုံကြည်မှု" symbol="○" />
        <UnscoredCard title="ချစ်ခင်ကြင်နာမှု" symbol="♡" />
        <UnscoredCard title="ပြဿနာဖြေရှင်းနိုင်မှု" symbol="⚡" />
        <UnscoredCard title="ရေရှည်ဆက်ဆံရေး" symbol="○" dimension={result.longTermRelationshipScore} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="text-lg font-semibold leading-8 text-ink">✨ ရိုးရာရင်းမြစ်တွင် ဖော်ပြထားသော အားသာချက်များ</h3>
          {result.compatibilityStrengths.length > 0
            ? <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">{result.compatibilityStrengths.map((item) => <li key={item}>— {item}</li>)}</ul>
            : <p className="mt-4 text-sm leading-7 text-stone-500">ဤအတွဲအတွက် အတည်ပြုထားသော သီးခြားအားသာချက် မရှိသေးပါ။</p>}
        </article>
        <article className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="text-lg font-semibold leading-8 text-ink">⚠️ သတိထားသင့်သည့် အချက်များ</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">{result.potentialChallenges.map((item) => <li key={item}>— {item}</li>)}</ul>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-saffron/25 bg-[#fff9ef] p-6 sm:p-8">
        <h3 className="text-lg font-semibold leading-8 text-ink">🌙 နောက်ဆုံးရှင်းလင်းချက်</h3>
        <p className="mt-4 text-base leading-8 text-stone-700">{result.burmeseExplanation}</p>
      </article>

      <p className="mx-auto mt-6 max-w-4xl rounded-2xl border border-stone-200 bg-white px-5 py-5 text-center text-xs leading-7 text-stone-500 sm:px-8">
        ဤလိုက်ဖက်မှုဖတ်ချက်သည် ရိုးရာဗေဒင်ဆိုင်ရာ အဓိပ္ပာယ်ဖွင့်ဆိုချက်များနှင့် ဤ application ၏ compatibility model အပေါ် အခြေခံထားခြင်းဖြစ်ပါသည်။ Relationship တစ်ခု၏ အောင်မြင်မှုကို ဗေဒင်ရလဒ်တစ်ခုတည်းဖြင့် ဆုံးဖြတ်နိုင်ခြင်းမရှိပါ။ အပြန်အလှန်နားလည်မှု၊ ယုံကြည်မှု၊ ပြောဆိုဆက်ဆံမှုနှင့် နှစ်ဦးစလုံး၏ ကြိုးစားအားထုတ်မှုတို့သည် ပိုမိုအရေးကြီးပါသည်။
      </p>
    </section>
  )
}
