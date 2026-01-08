import { Color } from '@/types/base'

export type SectionProps = {
  children?: React.ReactNode
  className?: string
  alignment?: 'start' | 'center' | 'end'
  color: Color
}
