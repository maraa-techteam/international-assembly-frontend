import { cn } from '@/lib/utils/cn'
import { FooterNavItemProps } from '@/types/components'
import { Icon, Typography } from '@/ui/components'
import Link from 'next/link'

export function FooterNavItem({
  name,
  subNav,
  isActive,
  toggleSelect,
}: FooterNavItemProps) {
  if (!subNav.length) {
    return null
  }

  return (
    <li className='flex w-full flex-col items-start gap-2 lg:w-fit'>
      <div
        onClick={toggleSelect}
        className='flex w-full cursor-pointer flex-row items-center justify-between lg:cursor-default'
      >
        <Typography
          variant={'body'}
          className='text-contrast text-sm font-bold'
          font={'mono'}
        >
          {name}
        </Typography>
        <Icon
          icon='chevron-down'
          className={cn(
            isActive ? 'scale-[-1]' : '',
            'text-contrast flex lg:hidden',
          )}
        />
      </div>

      <nav
        className={cn(
          'mb-2 flex flex-col gap-2 overflow-hidden transition-all',
          !isActive && 'hidden lg:flex',
        )}
      >
        {subNav.map((sub, i) => (
          <Link key={i} href={sub.href}>
            <Typography
              variant='body'
              className={'text-contrast text-sm text-nowrap'}
              font='mono'
            >
              {sub.name}
            </Typography>
          </Link>
        ))}
      </nav>
    </li>
  )
}
