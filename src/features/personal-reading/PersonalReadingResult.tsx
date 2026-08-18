import {
  BURMESE_ANIMAL_SIGNS,
  BURMESE_BIRTH_WEEKDAYS,
  BURMESE_DIRECTIONS,
  BURMESE_PLANETS,
  BURMESE_WEEKDAY_SIGNS,
} from '../../data'
import type { PersonalAstrologyResult, PersonalInformation } from '../../models'
import { formatBurmeseDate } from '../../utils'

interface PersonalReadingResultProps {
  information: PersonalInformation
  result: PersonalAstrologyResult
}

const focusLabels = { high: 'အထူးအာရုံစိုက်သင့်', medium: 'အာရုံစိုက်သင့်', maintain: 'ပုံမှန်ထိန်းသိမ်းရန်' } as const
const focusNames = { career: 'အလုပ်အကိုင်', finance: 'ငွေကြေးစီမံခန့်ခွဲမှု', relationship: 'အချစ်ရေးနှင့် ဆက်ဆံရေး', personalGrowth: 'ကိုယ်တိုင်တိုးတက်မှု' } as const

export function PersonalReadingResult({ information, result }: PersonalReadingResultProps) {
  const association = result.association
  const interpretation = result.interpretation
  const unresolvedLabel = 'မွေးချိန် လိုအပ်ပါသည်'

  const details = [
    { label: 'မွေးနေ့နံ', value: BURMESE_BIRTH_WEEKDAYS[result.birthWeekday] },
    { label: 'မြန်မာဗေဒင်နေ့နံ', value: association ? BURMESE_WEEKDAY_SIGNS[association.weekdaySign] : unresolvedLabel },
    { label: 'အုပ်စိုးသောဂြိုဟ်', value: association ? BURMESE_PLANETS[association.planet] : unresolvedLabel },
    { label: 'နေ့နံသတ္တဝါ', value: association ? BURMESE_ANIMAL_SIGNS[association.animalSign] : unresolvedLabel },
    { label: 'အရပ်မျက်နှာ', value: association ? BURMESE_DIRECTIONS[association.direction] : unresolvedLabel },
  ]

  return (
    <section id="personal-reading-result" lang="my" aria-live="polite" className="mt-10 overflow-hidden rounded-3xl border border-stone-200 bg-[#2f2421] font-sans text-white">
      <div className="border-b border-white/10 px-6 py-8 sm:px-9">
        <p className="text-xs font-bold tracking-[0.12em] text-[#e8ad74]">ကိုယ်ရေးဗေဒင်ဖတ်ချက်</p>
        <h2 className="mt-3 text-3xl font-semibold leading-relaxed tracking-tight">{information.name}</h2>
        <p className="mt-2 text-sm leading-7 text-stone-300">
          မွေးသက္ကရာဇ် — {formatBurmeseDate(information.birthDate)}
          {information.birthPlace ? ` · မွေးရပ်ဒေသ — ${information.birthPlace}` : ''}
        </p>
      </div>

      <dl className="grid sm:grid-cols-2 lg:grid-cols-5">
        {details.map((detail) => (
          <div key={detail.label} className="border-b border-white/10 px-6 py-6 sm:border-r lg:border-b-0 last:border-r-0">
            <dt className="text-xs tracking-wide text-stone-400">{detail.label}</dt>
            <dd className="mt-2 text-base font-semibold leading-7">{detail.value}</dd>
          </div>
        ))}
      </dl>

      {result.resolution === 'birth-time-required' && (
        <div className="border-t border-white/10 bg-white/5 px-6 py-5 text-sm leading-7 text-stone-200 sm:px-9">
          ဗုဒ္ဓဟူးနေ့ မွေးဖွားသူကို မနက်ပိုင်း ဗုဒ္ဓဟူးနံ သို့မဟုတ် နေ့လယ်ပိုင်း ရာဟုနံဟု သတ်မှတ်ရန် မွေးချိန်လိုအပ်ပါသည်။ အပေါ်ရှိ မွေးချိန်အကွက်ကို ဖြည့်ပြီး ထပ်မံတွက်ချက်နိုင်ပါသည်။
        </div>
      )}

      <div className="border-t border-white/10 bg-cream px-4 py-8 text-ink sm:px-8 sm:py-10">
        {interpretation ? (
          <div className="space-y-5">
            <p className="rounded-2xl border border-saffron/20 bg-[#fff9ef] px-5 py-4 text-xs leading-7 text-stone-600">အောက်ပါအပိုင်းများသည် ရိုးရာနေ့နံအချက်အလက်မဟုတ်ဘဲ application မှ ဖန်တီးထားသော ကိုယ်တိုင်ဆင်ခြင်သုံးသပ်နိုင်ရန် လမ်းညွှန်ချက်များဖြစ်ပါသည်။</p>
            <article className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"><h3 className="text-xl font-semibold">🌟 ကိုယ်ရည်ကိုယ်သွေး</h3><p className="mt-4 whitespace-pre-line text-sm leading-8 text-stone-600 sm:text-base">{interpretation.personality}</p></article>
            <div className="grid gap-5 lg:grid-cols-2">
              <ItemSection title="💪 အားသာချက်များ" items={interpretation.strengths} />
              <ItemSection title="⚠️ သတိထားသင့်သောအချက်များ" items={interpretation.challenges} />
            </div>
            <LongSection title="❤️ အချစ်ရေးနှင့် ဆက်ဆံရေး" content={interpretation.love} />
            <LongSection title="💼 အလုပ်အကိုင်နှင့် အသက်မွေးဝမ်းကြောင်း" content={interpretation.career} />
            <div className="grid gap-5 lg:grid-cols-2"><LongSection title="💰 ငွေကြေးနှင့် စီးပွားရေး" content={interpretation.money} /><LongSection title="💬 ပြောဆိုဆက်ဆံရေး" content={interpretation.communication} /></div>
            <ItemSection title="🌱 ကိုယ်တိုင်တိုးတက်ရန်" items={interpretation.personalGrowth} />
            <div className="grid gap-5 lg:grid-cols-2"><ListSection title="📈 ရှေ့ဆက်လုပ်ဆောင်သင့်သည့်အရာများ" items={interpretation.shouldDo} /><ListSection title="🚫 ရှောင်ကြဉ်သင့်သည့်အရာများ" items={interpretation.shouldAvoid} /></div>
            <article className="rounded-2xl border border-stone-200 bg-white p-6"><h3 className="text-lg font-semibold">🔮 ရှေ့ဆက်အာရုံစိုက်သင့်သောအရာများ</h3><dl className="mt-5 grid gap-4 sm:grid-cols-2">{(Object.entries(interpretation.futureFocus) as [keyof typeof focusNames, keyof typeof focusLabels][]).map(([key,value]) => <div key={key} className="rounded-xl bg-stone-50 p-4"><dt className="text-sm text-stone-500">{focusNames[key]}</dt><dd className="mt-2 font-semibold text-maroon">{focusLabels[value]}</dd></div>)}</dl></article>
            <LongSection title="🌙 အထွေထွေအကြံပြုချက်" content={interpretation.generalGuidance} />
          </div>
        ) : result.resolution !== 'birth-time-required' ? (
          <p role="alert" className="rounded-2xl bg-red-50 p-5 text-sm text-maroon">ဖတ်ချက်အချက်အလက်ကို မရယူနိုင်ပါ။ စာမျက်နှာကို ပြန်ဖွင့်ပြီး ထပ်မံကြိုးစားပါ။</p>
        ) : null}

        <p className="mt-8 rounded-2xl border border-saffron/20 bg-[#fff9ef] px-5 py-5 text-sm leading-8 text-stone-700 sm:px-7">
          ဤဖတ်ချက်တွင် ရိုးရာဗေဒင်ဆိုင်ရာ အချက်အလက်များနှင့် application မှ ဖန်တီးထားသော ကိုယ်တိုင်ဆင်ခြင်သုံးသပ်နိုင်ရန် အကြံပြုချက်များ ပါဝင်ပါသည်။ ဖတ်ချက်များကို အတိအကျဖြစ်မည့် အနာဂတ်ခန့်မှန်းချက်အဖြစ် မယူဆသင့်ပါ။
        </p>
      </div>
    </section>
  )
}

function LongSection({ title, content }: { title: string; content: string }) {
  return <article className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"><h3 className="text-xl font-semibold leading-8">{title}</h3><p className="mt-4 whitespace-pre-line text-sm leading-8 text-stone-600 sm:text-base">{content}</p></article>
}

function ItemSection({ title, items }: { title: string; items: readonly { title: string; description: string }[] }) {
  return <article className="rounded-2xl border border-stone-200 bg-white p-6"><h3 className="text-lg font-semibold leading-8">{title}</h3><div className="mt-5 space-y-4">{items.map((item) => <div key={item.title}><h4 className="font-semibold text-ink">{item.title}</h4><p className="mt-1 text-sm leading-7 text-stone-600">{item.description}</p></div>)}</div></article>
}

function ListSection({ title, items }: { title: string; items: readonly string[] }) {
  return <article className="rounded-2xl border border-stone-200 bg-white p-6"><h3 className="text-lg font-semibold leading-8">{title}</h3><ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600">{items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-saffron">•</span><span>{item}</span></li>)}</ul></article>
}
