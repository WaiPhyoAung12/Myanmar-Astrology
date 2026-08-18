import { useState } from 'react'
import { PersonalReadingForm } from '../features/personal-reading/PersonalReadingForm'
import { PersonalReadingResult } from '../features/personal-reading/PersonalReadingResult'
import type { PersonalAstrologyResult, PersonalInformation } from '../models'
import { calculatePersonalAstrology } from '../services'

interface CompletedReading {
  information: PersonalInformation
  result: PersonalAstrologyResult
}

export function PersonalReadingPage() {
  const [reading, setReading] = useState<CompletedReading | null>(null)

  function handleSubmit(information: PersonalInformation) {
    const result = calculatePersonalAstrology(information)
    setReading({ information, result })

    window.setTimeout(() => {
      document.getElementById('personal-reading-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute -right-32 top-20 h-72 w-72 rounded-full border border-saffron/20" />
      <div aria-hidden="true" className="absolute -right-20 top-32 h-48 w-48 rounded-full border border-saffron/20" />

      <header className="relative mx-auto max-w-4xl px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">Your birth profile</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-6xl">Personal Astrology Reading</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">Discover your traditional Myanmar weekday sign, planetary ruler, guardian animal, and direction.</p>
      </header>

      <div className="relative mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <PersonalReadingForm onSubmit={handleSubmit} />
        {reading && <PersonalReadingResult information={reading.information} result={reading.result} />}
      </div>
    </div>
  )
}
