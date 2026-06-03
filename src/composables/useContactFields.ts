export type BasicContactField = "firstName" | "lastName" | "email"
export type BasicContactFields = Record<BasicContactField, string>

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function hasRequiredContactFields(fields: BasicContactFields) {
  return (
    fields.firstName.trim().length > 1 &&
    fields.lastName.trim().length > 1 &&
    isValidEmail(fields.email)
  )
}

export function updateTextField<T extends Record<string, string>, Field extends keyof T>(
  fields: T,
  field: Field,
  event: Event,
) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  fields[field] = target.value as T[Field]
}
