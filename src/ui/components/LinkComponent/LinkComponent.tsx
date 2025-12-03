import { cn } from '@/lib/utils/cn'
import { LinkComponentProps } from '@/types/components'
import { Icon } from '@/ui/components'
import { type VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'

const linkVariants = cva('flex flex-row items-center justify-center gap-4', {
  variants: {
    color: {
      white: 'text-white',
      primary: 'text-primary',
      secondary: 'text-secondary',
      foreground: 'text-foreground',
      contrast: 'text-contrast',
    },
    isUnderlined: {
      true: 'underline',
      false: '',
    },
  },
  defaultVariants: {
    color: 'contrast',
    isUnderlined: false,
  },
})

export type LinkVariantProps = VariantProps<typeof linkVariants>

export function LinkComponent({
  icon,
  text,
  href,
  variant,
  className,
  color = 'primary',
  isUnderlined = false,
}: LinkComponentProps) {
  return (
    <Link
      aria-label={variant === 'icon-only' ? icon : text}
      className={cn(linkVariants({ color, isUnderlined }), className)}
      href={href}
    >
      {variant === 'icon-left' && icon && <Icon color={color} icon={icon} />}
      {variant === 'icon-only' && icon ? (
        <Icon color={color} icon={icon} />
      ) : (
        text
      )}
      {variant === 'icon-right' && icon && <Icon color={color} icon={icon} />}
    </Link>
  )
}

export default LinkComponent
