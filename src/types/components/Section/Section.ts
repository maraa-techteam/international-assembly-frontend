import { Color } from '@/types/base'

export type SectionProps = {
  children?: React.ReactNode
  className?: string
  alignment?: 'start' | 'center' | 'end'
  variant: 'single-column' | 'double-column'
  color: Color
  leftColumn?: React.ReactNode
  rightColumn?: React.ReactNode
}
