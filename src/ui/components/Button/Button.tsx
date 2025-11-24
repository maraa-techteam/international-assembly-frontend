import { cn } from '@/lib/utils/cn'
import { ButtonType } from '@/types/components'
import Link from 'next/link'

export function Button({
  variant,
  as = 'button',
  className,
  type = 'button',
  onClick,
  color,
  children,
  label,
  size,
  href,
  disabled = false,
}: ButtonType) {
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
