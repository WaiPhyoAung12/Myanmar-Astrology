import { useState } from 'react'
import { CompatibilityForm } from '../features/love-compatibility/CompatibilityForm'
import { CompatibilityResult } from '../features/love-compatibility/CompatibilityResult'
import type { LoveCompatibilityResult, PersonalInformation } from '../models'
import { calculateLoveCompatibility } from '../services'

export function LoveCompatibilityPage() {
  const [result, setResult] = useState<LoveCompatibilityResult | null>(null)

  function handleSubmit(person1: PersonalInformation, person2: PersonalInformation) {
    setResult(calculateLoveCompatibility(person1, person2))
    window.setTimeout(() => {
      document.getElementById('compatibility-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute left-1/2 top-16 h-64 w-64 -translate-x-[85%] rounded-full border border-maroon/10" />
      <div aria-hidden="true" className="absolute left-1/2 top-16 h-64 w-64 -translate-x-[15%] rounded-full border border-saffron/20" />

      <header className="relative mx-auto max-w-4xl px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">Two stories, one connection</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-6xl">Love Compatibility</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">Compare two Myanmar weekday astrology profiles using our transparent, source-limited compatibility model.</p>
      </header>

      <div className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <CompatibilityForm onSubmit={handleSubmit} />
        {result && <CompatibilityResult result={result} />}
      </div>
    </div>
  )
}
