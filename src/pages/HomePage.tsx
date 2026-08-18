import { Link } from 'react-router-dom'

const options = [
  {
    number: '၀၁', symbol: '🔮', title: 'ကိုယ့်အကြောင်း မေးမယ်',
    description: 'မွေးဖွားမှုအချက်အလက်များအပေါ် အခြေခံ၍ ကိုယ်ရေးဗေဒင် ဖတ်ရှုရန်။',
    action: 'ဗေဒင်မေးမည်', to: '/personal-reading', accentClass: 'bg-maroon/10 text-maroon',
  },
  {
    number: '၀၂', symbol: '❤️', title: 'နှစ်ဦးအချစ်ရေး မေးမယ်',
    description: 'သင်နှင့် အခြားတစ်ဦး၏ မွေးဖွားမှုအချက်အလက်များအပေါ် အခြေခံ၍ အချစ်ရေးလိုက်ဖက်မှုကို ကြည့်ရှုရန်။',
    action: 'ဖူးစာစစ်မည်', to: '/love-compatibility', accentClass: 'bg-saffron/10 text-saffron',
  },
]

export function HomePage() {
  return (
    <div className="relative overflow-hidden" lang="my">
      <div aria-hidden="true" className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full border border-saffron/15 sm:h-80 sm:w-80" />
      <div aria-hidden="true" className="absolute left-1/2 top-20 h-36 w-36 -translate-x-1/2 rounded-full border border-maroon/10 sm:h-52 sm:w-52" />

      <section className="relative mx-auto max-w-4xl px-5 pb-12 pt-16 text-center sm:px-6 sm:pb-16 sm:pt-24 lg:pt-28">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-saffron">Myanmar Astrology</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.45] tracking-tight text-ink sm:text-5xl lg:text-6xl">မြန်မာ့ရိုးရာဗေဒင်</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg sm:leading-9">သင့်မွေးနေ့နံနှင့် မြန်မာ့ရိုးရာဗေဒင်ဆိုင်ရာ အချက်အလက်များကို ရိုးရှင်းစွာ လေ့လာကြည့်ရှုပါ။</p>
      </section>

      <section aria-label="ဗေဒင်အမျိုးအစား ရွေးချယ်ရန်" className="relative mx-auto grid max-w-6xl gap-5 px-4 pb-20 sm:gap-6 sm:px-6 sm:pb-28 lg:grid-cols-2">
        {options.map((option) => (
          <article key={option.to} className="home-option-card group flex min-h-[360px] flex-col rounded-[2rem] border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-stone-300 sm:min-h-[390px] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <span aria-hidden="true" className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${option.accentClass}`}>{option.symbol}</span>
              <span className="text-sm font-semibold text-stone-300">{option.number}</span>
            </div>
            <div className="mt-9 flex flex-1 flex-col sm:mt-12">
              <h2 className="text-2xl font-semibold leading-[1.6] tracking-tight text-ink sm:text-3xl">{option.title}</h2>
              <p className="mt-4 text-base leading-8 text-stone-600 sm:text-lg sm:leading-9">{option.description}</p>
              <div className="mt-auto pt-8">
                <Link to={option.to} className="inline-flex w-full items-center justify-center rounded-full bg-maroon px-6 py-3.5 text-base font-semibold text-white transition duration-200 hover:bg-[#5e252d] focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 sm:w-auto">
                  {option.action}<span aria-hidden="true" className="ml-3 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
