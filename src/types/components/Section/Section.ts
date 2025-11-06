export type SectionProps = {
  children?: React.ReactNode
  className?: string
  alignment?: 'start' | 'center' | 'end'
  variant: 'single-column' | 'double-column'
  color: 'primary' | 'white' | 'secondary'
  leftColumn?: React.ReactNode
  rightColumn?: React.ReactNode
}
