import { cn } from '@/lib/utils/cn'
import { ButtonType } from '@/types/components'
import { type VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'

const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'whitespace-nowrap',
    'justify-center',
    'rounded-3xl',
    'cursor-pointer',
    'font-roboto',
    'transition-colors',
    'px-4',
    'py-3',
  ],
  {
    variants: {
      variant: {
        contained: '',
        outlined: 'bg-transparent border',
      },
      color: {
        primary: '',
        secondary: '',
        white: '',
      },
      size: {
        sm: 'px-4 py-3 text-sm',
        lg: 'px-5 lg:max-w-75 w-full py-4 text-lg',
      },
    },
    compoundVariants: [
      // Contained + Primary
      {
        variant: 'contained',
        color: 'primary',
        className: 'bg-primary text-white hover:bg-primary/90',
      },
      // Contained + Secondary
      {
        variant: 'contained',
        color: 'secondary',
        className: 'bg-secondary text-foreground hover:bg-secondary/90',
      },
      // Contained + White
      {
        variant: 'contained',
        color: 'white',
        className: 'bg-white text-primary hover:bg-white/90',
      },
      // Outlined + Primary
      {
        variant: 'outlined',
        color: 'primary',
        className: 'border-primary text-primary hover:bg-primary/10',
      },
      // Outlined + Secondary
      {
        variant: 'outlined',
        color: 'secondary',
        className: 'border-secondary text-secondary hover:bg-secondary/10',
      },
      // Outlined + White
      {
        variant: 'outlined',
        color: 'white',
        className: 'border-white text-white hover:bg-white/10',
      },
    ],
    defaultVariants: {
      variant: 'contained',
      color: 'primary',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

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
  const baseClasses = cn(
    buttonVariants({ variant, size, color }),
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
