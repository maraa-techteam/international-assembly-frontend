export type SelectType = {
  label: string
  displayLabel?: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  textColor?: string
}
