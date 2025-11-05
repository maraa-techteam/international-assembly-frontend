import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

export type ButtonType = {
  variant: 'contained' | 'outlined'
  type: 'button' | 'submit'
  size?: 'sm' | 'lg'
  as?: 'button' | 'link'
  href?: string
  color?: 'primary' | 'white' | 'secondary'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  children?: ReactNode
  label?: string
  disabled?: boolean
}

const Button: FC<ButtonType> = ({
  variant,
  as = 'button',
  className,
  type = 'button',
  onClick,
  color = 'primary',
  children,
  label,
  size = 'sm',
  href,
  disabled = false,
}) => {
  const getColorClasses = () => {
    if (variant === 'contained') {
      switch (color) {
        case 'primary':
          return 'bg-primary text-white'
        case 'white':
          return 'bg-white text-primary'
        case 'secondary':
          return 'bg-secondary text-foreground'
        default:
          return 'bg-primary text-white '
      }
    } else {
      switch (color) {
        case 'primary':
          return 'bg-transparent border border-primary text-primary'
        case 'white':
          return 'bg-transparent border border-white text-white'
        case 'secondary':
          return 'bg-transparent border border-secondary text-secondary'
        default:
          return 'bg-transparent border border-primary text-primary'
      }
    }
  }

  const baseClasses = cn(
    'inline-flex items-center whitespace-nowrap justify-center rounded-3xl cursor-pointer font-mono transition-colors px-4 py-3',
    size === 'lg' && 'lg:px-5 lg:py-[18px] w-full rounded-2xl lg:max-w-75',
    getColorClasses(),
    disabled && 'opacity-30 cursor-not-allowed',
    className,
  )

  if (as === 'link') {
    return (
      <Link href={href || '#'} className={baseClasses} aria-disabled={disabled}>
        {children || label}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      disabled={disabled}
    >
      {children || label}
    </button>
  )
}

export default Button
