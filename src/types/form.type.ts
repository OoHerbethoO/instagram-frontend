export interface Form {
  name: string
  placeholder: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'date'
  value: string
  variant?: 'primary' | 'neobrutalism'
  validation?: (value: string) => string
}
