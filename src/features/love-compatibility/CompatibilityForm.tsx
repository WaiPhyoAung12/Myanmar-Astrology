import { useState, type FormEvent } from 'react'
import {
  BirthInformationFields,
  type BirthInformationFieldErrors,
  type BirthInformationFormValues,
} from '../../components/forms/BirthInformationFields'
import type { PersonalInformation } from '../../models'

interface CompatibilityFormProps {
  onSubmit: (person1: PersonalInformation, person2: PersonalInformation) => void
}

type PersonKey = 'person1' | 'person2'
type RequiredFieldKey = `${PersonKey}.name` | `${PersonKey}.birthDate`
const emptyPerson: BirthInformationFormValues = { name: '', birthDate: '', birthTime: '', birthPlace: '' }

interface PersonSectionProps {
  id: PersonKey
  title: string
  subtitle: string
  values: BirthInformationFormValues
  errors: BirthInformationFieldErrors
  onChange: (field: keyof BirthInformationFormValues, value: string) => void
}

function PersonSection({ id, title, subtitle, values, errors, onChange }: PersonSectionProps) {
  return (
    <fieldset className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-7 flex items-center gap-4">
        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon text-sm font-semibold text-white">{id === 'person1' ? '01' : '02'}</span>
        <div><h2 className="text-xl font-semibold text-ink">{title}</h2><p className="mt-1 text-sm text-stone-500">{subtitle}</p></div>
      </div>
      <BirthInformationFields idPrefix={id} values={values} errors={errors} onChange={onChange} />
    </fieldset>
  )
}

function toPersonalInformation(values: BirthInformationFormValues): PersonalInformation {
  return {
    name: values.name.trim(),
    birthDate: values.birthDate,
    ...(values.birthTime ? { birthTime: values.birthTime } : {}),
    ...(values.birthPlace.trim() ? { birthPlace: values.birthPlace.trim() } : {}),
  }
}

export function CompatibilityForm({ onSubmit }: CompatibilityFormProps) {
  const [person1, setPerson1] = useState({ ...emptyPerson })
  const [person2, setPerson2] = useState({ ...emptyPerson })
  const [errors, setErrors] = useState<Partial<Record<RequiredFieldKey | 'form', string>>>({})

  function updatePerson(person: PersonKey, field: keyof BirthInformationFormValues, value: string) {
    const setter = person === 'person1' ? setPerson1 : setPerson2
    setter((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [`${person}.${field}`]: undefined, form: undefined }))
  }

  function personErrors(person: PersonKey): BirthInformationFieldErrors {
    return { name: errors[`${person}.name`], birthDate: errors[`${person}.birthDate`] }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Partial<Record<RequiredFieldKey, string>> = {}
    if (!person1.name.trim()) nextErrors['person1.name'] = 'Please enter Person 1’s name.'
    if (!person1.birthDate) nextErrors['person1.birthDate'] = 'Please enter Person 1’s birth date.'
    if (!person2.name.trim()) nextErrors['person2.name'] = 'Please enter Person 2’s name.'
    if (!person2.birthDate) nextErrors['person2.birthDate'] = 'Please enter Person 2’s birth date.'
    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return }

    try {
      onSubmit(toPersonalInformation(person1), toPersonalInformation(person2))
      setErrors({})
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Unable to calculate compatibility.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 lg:grid-cols-2">
        <PersonSection id="person1" title="Person 1" subtitle="Your birth details" values={person1} errors={personErrors('person1')} onChange={(field, value) => updatePerson('person1', field, value)} />
        <PersonSection id="person2" title="Person 2" subtitle="The other person’s birth details" values={person2} errors={personErrors('person2')} onChange={(field, value) => updatePerson('person2', field, value)} />
      </div>
      {errors.form && <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-maroon">{errors.form}</p>}
      <div className="mt-8 text-center"><button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-maroon px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#5e252d] focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 sm:w-auto">Calculate compatibility</button></div>
    </form>
  )
}
