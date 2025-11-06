import { ButtonType } from '@/types/components'

export type ButtonGroupProps = {
  buttons: Array<ButtonType>
  orientation: 'horizontal' | 'vertical'
  alignment?: 'start' | 'center' | 'end'
  className?: string
}
