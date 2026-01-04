export type SelectProps = {
  label: string
  options: string[]
  textColor?: 'text-primary' | 'text-foreground' | 'text-secondary'
  onChange: (value: string) => void
  className?: string
}
