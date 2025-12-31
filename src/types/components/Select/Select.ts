export type SelectProps = {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
  isMultiSelect?: boolean
}
