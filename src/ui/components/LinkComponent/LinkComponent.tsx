import { cn } from '@/lib/utils/cn'
import { LinkComponentProps } from '@/types/components'
import { Icon } from '@/ui/components'
import Link from 'next/link'

export function LinkComponent({
  icon,
  text,
  href,
  variant,
  className,
  color,
  isUnderlined,
}: LinkComponentProps) {
  return (
    <Link
      aria-label={variant === 'icon-only' ? icon : text}
      className={cn(
        'text-contrast flex flex-row items-center justify-center gap-4',
        className,
        isUnderlined && 'underline',
        color,
      )}
      href={href}
    >
      {variant === 'icon-left' && <Icon className={cn(color)} icon={icon} />}
      {variant === 'icon-only' ? (
        <Icon className={cn(`text-${color}`)} icon={icon} />
      ) : (
        text
      )}
      {variant === 'icon-right' && <Icon icon={icon} />}
    </Link>
  )
}

export default LinkComponent
