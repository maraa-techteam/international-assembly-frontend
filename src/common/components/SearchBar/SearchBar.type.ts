export type SearchBarType = {
  onSearch?: (value: string) => void
  onToggle?: (isActive: boolean) => void
  isExpanded: boolean
  placeholder?: string
  isReseted?: boolean
}
