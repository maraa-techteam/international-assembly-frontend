import { cn } from '@/lib/utils/cn'
import { TransformedSecondTierNavigationType } from '@/types/navigation'
import { Typography } from '@/ui/components'
import Link from 'next/link'

type DesktopSubMenuProps = {
  activeItems: TransformedSecondTierNavigationType
  subNav: {
    name: string
    href: string
    description: string
    isFrequentlyVisited: boolean
  }[]
  onMouseEnter: (index: number) => void
}

export function DesktopSubMenu({
  activeItems,
  subNav,
  onMouseEnter,
}: DesktopSubMenuProps) {
  return (
    <div className='absolute top-[52px] hidden w-dvw max-w-3xl grid-cols-2 gap-8 bg-white p-8 shadow lg:grid'>
      <nav className='hidden flex-col lg:flex'>
        {activeItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className={cn(
              'hover:bg-primary flex flex-col rounded-full px-3 py-4 whitespace-nowrap last:mb-0 hover:text-white',
              item.isActive ? 'bg-primary text-white' : 'text-inherit',
            )}
            onMouseEnter={() => onMouseEnter(i)}
          >
            <Typography
              variant='body'
              font='mono'
              className='font-normal text-inherit'
            >
              {item.name}
            </Typography>
          </Link>
        ))}
      </nav>
      <div className='hidden flex-col p-4 lg:flex'>
        {subNav.map((item, i) => {
          return (
            <Typography variant='body' font='mono' className='text-sm' key={i}>
              {activeItems[i].isActive && item.description}
            </Typography>
          )
        })}
      </div>
    </div>
  )
}
