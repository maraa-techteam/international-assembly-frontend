'use client'

import { cn } from '@/lib/utils/cn'
import { TransformedNavigationType } from '@/types/Navigation'
import { Socials } from '@/types/Socials'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import Icon from '../Icon/Icon'
import LinkComponent from '../LinkComponent/LinkComponent'
import Typography from '../Typography/Typography'

type FooterProps = {
  footerData: TransformedNavigationType[]
  socials: Socials[]
}

const Footer: FC<FooterProps> = ({ footerData, socials }) => {
  const [navigation, setNavigation] =
    useState<TransformedNavigationType[]>(footerData)

  const toggleSelect = (index: number) => {
    setNavigation((prevItems) => {
      return prevItems.map((item, i) => {
        return { ...item, isActive: i === index ? !item.isActive : false }
      })
    })
  }

  const date = new Date()

  return (
    <footer className='bg-primary flex flex-col gap-4 p-4 lg:px-18 lg:py-12'>
      <div className='flex w-full flex-col gap-4 lg:grid lg:grid-cols-5 lg:gap-8'>
        <div className='flex w-fit flex-col items-start gap-5'>
          <Link className='flex content-center items-center' href={'/'}>
            <Image
              src={'/logo.svg'}
              width={230}
              height={54}
              className='w-auto shrink-0'
              alt={'logo'}
            />
          </Link>
          <div className='flex flex-row items-center justify-center gap-4'>
            {socials.map((item, i) => {
              return (
                <LinkComponent
                  key={i}
                  icon={item.icon}
                  text={''}
                  href={item.href}
                  variant={'icon-only'}
                />
              )
            })}
          </div>
        </div>

        {navigation.map((item, i) => {
          if (item.subNav.length) {
            return (
              <div key={i} className='flex w-full flex-col items-start gap-2'>
                <div
                  onClick={() => toggleSelect(i)}
                  className='flex w-full flex-row items-center justify-between'
                >
                  <Typography
                    variant={'body'}
                    className='text-contrast text-sm font-bold'
                    font={'mono'}
                  >
                    {item.name}
                  </Typography>
                  <Icon
                    icon='chevron-down'
                    className={cn(
                      item.isActive ? 'scale-[-1]' : '',
                      'text-contrast flex lg:hidden',
                    )}
                  />
                </div>

                <nav
                  className={cn(
                    'flex flex-col gap-2 overflow-hidden transition-all duration-300',
                    item.isActive ? 'max-h-96' : 'max-h-0 lg:max-h-96',
                  )}
                >
                  {item.subNav.map((sub, i) => (
                    <Link key={i} href='#'>
                      <Typography
                        variant='body'
                        className='text-contrast text-sm'
                        font='mono'
                      >
                        {sub.name}
                      </Typography>
                    </Link>
                  ))}
                </nav>
              </div>
            )
          }
          return null
        })}
      </div>

      <div className='h-[1px] w-full bg-white opacity-40' />

      <Typography
        variant={'body'}
        className='text-contrast text-sm opacity-40'
        font={'mono'}
      >
        {`
        © ${date.getFullYear()} Международная Ассамблея по Общему Обслуживанию Русскоязычных
        Анонимных Алкоголиков`}
      </Typography>
    </footer>
  )
}

export default Footer
