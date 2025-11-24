export type SearchBarProps = {
  onSearch?: (value: string) => void
  onToggle: (isActive: boolean) => void
  isExpanded: boolean
  className?: string
  placeholder?: string
}
