import { FooterNavItemProps } from '@/types/components'
import { Icon, Typography } from '@/ui/components'
import Link from 'next/link'

export function FooterNavItem({ name, subNav }: FooterNavItemProps) {
  if (!subNav.length) {
    return null
  }

  return (
    <li className='flex flex-col gap-2'>
      <Typography
        variant={'body'}
        className='text-contrast hidden text-sm font-bold lg:inline-block'
        font={'roboto'}
      >
        {name}
      </Typography>
      <ul className={'mb-2 hidden flex-col gap-1 lg:flex'}>
        {subNav.map((sub) => (
          <li key={sub.name}>
            <Link href={sub.href}>
              <Typography
                variant='body'
                className={'text-contrast text-sm text-nowrap'}
                font='roboto'
              >
                {sub.name}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>

      <details
        role='group'
        className='group flex flex-col gap-2 lg:invisible lg:hidden'
      >
        <summary className='flex w-full cursor-pointer flex-row items-center justify-between'>
          <Typography
            variant={'body'}
            className='text-contrast text-sm font-bold'
            font={'roboto'}
          >
            {name}
          </Typography>
          <Icon
            color={'contrast'}
            icon='chevron-down'
            className={'text-contrast flex group-open:scale-[-1]'}
          />
        </summary>
        <ul className='mb-2 flex flex-col gap-2'>
          {subNav.map((sub) => (
            <li key={sub.name}>
              <Link href={sub.href}>
                <Typography
                  variant='body'
                  className={'text-contrast text-sm text-nowrap'}
                  font='roboto'
                >
                  {sub.name}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  )
}
