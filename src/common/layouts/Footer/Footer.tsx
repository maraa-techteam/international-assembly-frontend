import { Icon } from '@/common/components/Icon/Icon'
import { Typography } from '@/common/components/Typography/Typography'
import Image from 'next/image'
import Link from 'next/link'

import { FooterType } from './Footer.type'
import { FooterNavItem } from './components/FooterNavItem'

type FooterProps = FooterType

export function Footer({ footerData, socials }: FooterProps) {
  const date = new Date()

  return (
    <footer className='bg-primary flex flex-col gap-4 p-4 lg:px-18 lg:py-12'>
      <div className='flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-32'>
        <div className='flex w-fit flex-col items-start gap-5'>
          <Link className='flex content-center items-center' href='/'>
            <Image
              src='images/logo.svg'
              width={230}
              height={54}
              className='min-w-57.5 shrink-0'
              alt={
                'Логотип Международной Ассамблеи по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков'
              }
            />
          </Link>
          <nav aria-label='Социальные сети'>
            <ul className='flex flex-row items-center justify-center gap-4'>
              {socials.map((item) => {
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      target='_blank'
                      aria-label={item.name}
                      className='flex items-center gap-2 text-white'
                    >
                      <Icon icon={item.icon} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <nav className='w-full max-w-360' aria-label='Навигация'>
          <ul className='flex w-full flex-col gap-2 lg:flex-row lg:justify-between'>
            {footerData.map((item) => (
              <FooterNavItem
                key={item.name}
                name={item.name}
                subNav={item.subNav}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div className='h-[1px] w-full bg-white opacity-40' />

      <Typography
        variant='body'
        className='text-contrast text-sm opacity-40'
        font='roboto'
      >
        {`© ${date.getFullYear()} Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков`}
      </Typography>
    </footer>
  )
}
