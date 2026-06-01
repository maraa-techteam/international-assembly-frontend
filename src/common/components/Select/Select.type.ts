export type SelectType = {
  label: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  textColor?: string
}
