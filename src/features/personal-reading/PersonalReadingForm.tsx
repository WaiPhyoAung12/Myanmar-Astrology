import { useState, type FormEvent } from 'react'
import {
  BirthInformationFields,
  type BirthInformationFieldErrors,
  type BirthInformationFormValues,
} from '../../components/forms/BirthInformationFields'
import type { PersonalInformation } from '../../models'

interface PersonalReadingFormProps {
  onSubmit: (information: PersonalInformation) => void
}

const initialValues: BirthInformationFormValues = {
  name: '', birthDate: '', birthTime: '', birthPlace: '',
}

export function PersonalReadingForm({ onSubmit }: PersonalReadingFormProps) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<BirthInformationFieldErrors & { form?: string }>({})

  function updateField(field: keyof BirthInformationFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: BirthInformationFieldErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!values.birthDate) nextErrors.birthDate = 'Please enter your birth date.'

    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return }

    try {
      onSubmit({
        name: values.name.trim(),
        birthDate: values.birthDate,
        ...(values.birthTime ? { birthTime: values.birthTime } : {}),
        ...(values.birthPlace.trim() ? { birthPlace: values.birthPlace.trim() } : {}),
      })
      setErrors({})
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Unable to calculate this reading.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-9">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">Birth details</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Tell us about yourself</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">Required fields are marked with an asterisk. Your information stays in this browser.</p>
      </div>
      <BirthInformationFields idPrefix="personal" values={values} errors={errors} onChange={updateField} showWednesdayHint />
      {errors.form && <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-maroon">{errors.form}</p>}
      <button type="submit" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5e252d] focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 sm:w-auto">Calculate my reading</button>
    </form>
  )
}
