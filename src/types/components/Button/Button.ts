import { ReactNode } from 'react'

export type ButtonType = {
  variant: 'contained' | 'outlined'
  type?: 'button' | 'submit'
  size: 'sm' | 'lg'
  as?: 'button' | 'link'
  href?: string
  color: 'primary' | 'white' | 'secondary'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  children?: ReactNode
  label?: string
  disabled?: boolean
}
