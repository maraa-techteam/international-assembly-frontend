import { ColorType } from '@/common/types/Color'

export type SectionType = {
  children?: React.ReactNode
  alignment?: 'start' | 'center' | 'end'
  color: ColorType
}
