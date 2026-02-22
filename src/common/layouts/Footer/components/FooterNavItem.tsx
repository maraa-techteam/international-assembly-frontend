import { Icon, Typography } from '@/common/components'
import Link from 'next/link'

import { FooterNavItemType } from '../Footer.type'

type FooterNavItemProps = FooterNavItemType
export function FooterNavItem({ name, subNav }: FooterNavItemProps) {
  if (!subNav.length) {
    return null
  }

  return (
    <li role='none' className='flex flex-col gap-2'>
      <Typography
        variant='body'
        className='text-contrast hidden text-sm font-bold lg:inline-block'
        font='roboto'
      >
        {name}
      </Typography>
      <ul role='menubar' className='mb-2 hidden flex-col gap-1 lg:flex'>
        {subNav.map((sub) => (
          <li role='none' key={sub.name}>
            <Link role='menuitem' href={sub.href}>
              <Typography
                variant='body'
                className='text-contrast text-sm text-nowrap'
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
            variant='body'
            className='text-contrast text-sm font-bold'
            font='roboto'
          >
            {name}
          </Typography>
          <Icon
            icon='chevron-down'
            className='text-contrast flex group-open:scale-[-1]'
          />
        </summary>
        <ul role='menu' className='mb-2 flex flex-col gap-2'>
          {subNav.map((sub) => (
            <li role='none' key={sub.name}>
              <Link role='menuitem' href={sub.href}>
                <Typography
                  variant='body'
                  className='text-contrast text-sm text-nowrap'
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
