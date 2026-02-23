import { Icon, Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'
import Link from 'next/link'

type NavItemProps = {
  name: string
  href: string
  toggleSelect: () => void
  isActive: boolean
  isFocusable?: boolean
  onClick?: () => void
  subNav: {
    name: string
    href: string
    description: string
    isFrequentlyVisited: boolean
  }[]
}

export function NavItem({
  name,
  href,
  subNav,
  toggleSelect,
  isActive,
  isFocusable = false,
  onClick,
}: NavItemProps) {
  const baseClasses =
    'hover:bg-primary flex w-full cursor-pointer flex-row items-center justify-between px-4 py-3 whitespace-nowrap lg:w-fit lg:justify-center lg:gap-1 lg:p-0 lg:hover:bg-transparent'
  if (subNav.length === 0) {
    return (
      <Link
        onClick={onClick}
        role='menuitem'
        href={href}
        className={cn(baseClasses)}
        tabIndex={isFocusable ? 0 : -1}
      >
        {name}
      </Link>
    )
  }
  return (
    <button
      aria-haspopup
      aria-expanded={isActive}
      role='menuitem'
      tabIndex={isFocusable ? 0 : -1}
      onClick={() => {
        toggleSelect()
        if (onClick) onClick()
      }}
      className={cn(baseClasses)}
    >
      <Typography
        variant='caption'
        className='lg:group-hover:text-foreground font-medium group-hover:text-white lg:font-normal'
        font='roboto'
      >
        {name}
      </Typography>
      <Icon
        icon='chevron-down'
        size='md'
        className={cn(
          isActive ? 'scale-[-1]' : '',
          'text-foreground hidden lg:flex',
        )}
      />
      <Icon
        icon='chevron-right'
        size='md'
        className='text-foreground flex group-hover:text-white lg:hidden'
      />
    </button>
  )
}
