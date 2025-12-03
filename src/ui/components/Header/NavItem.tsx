import { cn } from '@/lib/utils/cn'
import { Icon, Typography } from '@/ui/components'
import Link from 'next/link'

type NavItemProps = {
  name: string
  href: string
  toggleSelect: () => void
  isActive: boolean
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
}: NavItemProps) {
  return (
    <button
      onClick={toggleSelect}
      className='hover:bg-primary group z-10 flex w-full cursor-pointer flex-row items-center justify-between px-4 py-3 whitespace-nowrap lg:w-fit lg:justify-center lg:gap-1 lg:p-0 lg:hover:bg-transparent'
    >
      {subNav.length === 0 ? (
        <Link
          href={href}
          className='lg:group-hover:text-foreground font-medium group-hover:text-white lg:font-normal'
        >
          {name}
        </Link>
      ) : (
        <>
          <Typography
            variant='caption'
            className='lg:group-hover:text-foreground font-medium group-hover:text-white lg:font-normal'
            font='roboto'
          >
            {name}
          </Typography>
          <Icon
            color='foreground'
            icon={'chevron-down'}
            size={'md'}
            className={cn(
              isActive ? 'scale-[-1]' : '',
              'text-foreground hidden lg:flex',
            )}
          />
          <Icon
            color='foreground'
            icon={'chevron-right'}
            size={'md'}
            className={'text-foreground flex group-hover:text-white lg:hidden'}
          />
        </>
      )}
    </button>
  )
}
