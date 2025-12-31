export type SelectProps = {
  label: string
  options: string[]
  value: string
  textColor?: 'text-primary' | 'text-foreground' | 'text-secondary'
  onChange: (value: string) => void
  className?: string
  customDropdown?: boolean
}
