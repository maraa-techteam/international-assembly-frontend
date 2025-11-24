import { IconType } from '@/types/components'

export type LinkComponentProps = {
  icon: IconType
  text: string
  href: string
  variant: 'icon-left' | 'icon-right' | 'icon-only'
  color?: 'text-primary' | 'text-contrast' | 'text-secondary'
  className?: string
  isUnderlined?: boolean
}
