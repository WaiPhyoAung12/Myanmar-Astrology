export interface BirthInformationFormValues {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
}

export interface BirthInformationFieldErrors {
  name?: string
  birthDate?: string
}

interface BirthInformationFieldsProps {
  idPrefix: string
  values: BirthInformationFormValues
  errors?: BirthInformationFieldErrors
  onChange: (field: keyof BirthInformationFormValues, value: string) => void
  showWednesdayHint?: boolean
}

const inputClassName =
  'mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-stone-400 focus:border-maroon focus:ring-2 focus:ring-maroon/15'

export function BirthInformationFields({
  idPrefix,
  values,
  errors = {},
  onChange,
  showWednesdayHint = false,
}: BirthInformationFieldsProps) {
  const nameErrorId = `${idPrefix}-name-error`
  const birthDateErrorId = `${idPrefix}-birth-date-error`

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold text-stone-700 sm:col-span-2">
        Name <span aria-hidden="true" className="text-maroon">*</span>
        <input
          name={`${idPrefix}-name`}
          autoComplete="name"
          className={inputClassName}
          value={values.name}
          onChange={(event) => onChange('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? nameErrorId : undefined}
          placeholder="Enter name"
        />
        {errors.name && <span id={nameErrorId} className="mt-2 block font-normal text-maroon">{errors.name}</span>}
      </label>

      <label className="text-sm font-semibold text-stone-700">
        Birth date <span aria-hidden="true" className="text-maroon">*</span>
        <input
          name={`${idPrefix}-birth-date`}
          type="date"
          className={inputClassName}
          value={values.birthDate}
          onChange={(event) => onChange('birthDate', event.target.value)}
          aria-invalid={Boolean(errors.birthDate)}
          aria-describedby={errors.birthDate ? birthDateErrorId : undefined}
        />
        {errors.birthDate && <span id={birthDateErrorId} className="mt-2 block font-normal text-maroon">{errors.birthDate}</span>}
      </label>

      <label className="text-sm font-semibold text-stone-700">
        Birth time <span className="font-normal text-stone-500">(optional)</span>
        <input
          name={`${idPrefix}-birth-time`}
          type="time"
          className={inputClassName}
          value={values.birthTime}
          onChange={(event) => onChange('birthTime', event.target.value)}
        />
        {showWednesdayHint && <span className="mt-2 block font-normal leading-5 text-stone-500">Needed to distinguish Wednesday morning from Rahu.</span>}
      </label>

      <label className="text-sm font-semibold text-stone-700 sm:col-span-2">
        Birth place <span className="font-normal text-stone-500">(optional)</span>
        <input
          name={`${idPrefix}-birth-place`}
          autoComplete="off"
          className={inputClassName}
          value={values.birthPlace}
          onChange={(event) => onChange('birthPlace', event.target.value)}
          placeholder="City, country"
        />
      </label>
    </div>
  )
}
