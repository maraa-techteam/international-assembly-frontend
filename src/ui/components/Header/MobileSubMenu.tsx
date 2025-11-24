import { cn } from '@/lib/utils/cn'
import { TransformedSecondTierNavigationType } from '@/types/navigation'
import { Icon, Typography } from '@/ui/components'
import Link from 'next/link'

type MobileSubMenuProps = {
  isActive: boolean
  activeItems: TransformedSecondTierNavigationType
  toggleSelect: () => void
}

export function MobileSubMenu({
  isActive,
  activeItems,
  toggleSelect,
}: MobileSubMenuProps) {
  return (
    <div
      className={cn(
        'mobile-submenu fixed top-0 z-10 flex h-dvh w-full transform flex-col bg-white transition-transform duration-300 lg:hidden',
        isActive ? 'translate-x-[0]' : 'translate-x-full',
      )}
    >
      <button
        onClick={() => toggleSelect()}
        className='flex w-full cursor-pointer flex-row items-center gap-4 px-4 py-3 whitespace-nowrap hover:text-white lg:hidden lg:w-fit lg:justify-center lg:gap-1 lg:p-0'
      >
        <Icon
          icon={'arrow-left'}
          size={'md'}
          className={'text-foreground flex lg:hidden'}
        />
        <Typography variant='caption' className='font-normal' font='mono'>
          Назад
        </Typography>
      </button>
      {activeItems.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className={cn(
            'hover:bg-primary group flex flex-row justify-between px-3 py-4 whitespace-nowrap last:mb-0',
          )}
        >
          <Typography
            className='group-hover:text-white'
            variant='caption'
            font='mono'
          >
            {item.name}
          </Typography>
          <Icon
            icon={'chevron-right'}
            size={'md'}
            className={'text-foreground flex group-hover:text-white lg:hidden'}
          />
        </Link>
      ))}
    </div>
  )
}
