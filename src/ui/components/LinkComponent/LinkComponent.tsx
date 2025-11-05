import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { FC } from 'react'

import Icon from '../Icon/Icon'
import Typography from '../Typography/Typography'

type LinkComponentProps = {
  icon:
    | 'search'
    | 'arrow-right'
    | 'chevron-down'
    | 'close'
    | 'hamburger'
    | 'chevron-right'
    | 'arrow-left'
    | 'youtube'
    | 'telegram'
  text: string
  href: string
  variant: 'icon-left' | 'icon-right' | 'icon-only'
  color?: 'text-primary' | 'text-contrast' | 'text-secondary'
  className?: string
  isUnderlined?: boolean
}

const LinkComponent: FC<LinkComponentProps> = ({
  icon,
  text,
  href,
  variant,
  className,
  color,
  isUnderlined = false,
}) => {
  return (
    <Link
      className={cn(
        'text-contrast flex flex-row items-center justify-center gap-4',
        className,
        isUnderlined && 'underline',
        color,
      )}
      href={href}
    >
      {variant === 'icon-left' && <Icon icon={icon} />}
      {variant === 'icon-only' ? (
        <Icon icon={icon} />
      ) : (
        <Typography font='mono' className={cn(color)} variant='caption'>
          {text}
        </Typography>
      )}
      {variant === 'icon-right' && <Icon icon={icon} />}
    </Link>
  )
}

export default LinkComponent
