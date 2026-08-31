export type SearchBarType = {
  onSearch?: () => void
  onToggle?: (isActive: boolean) => void
  isExpanded: boolean
  placeholder?: string
  isReseted?: boolean
}
