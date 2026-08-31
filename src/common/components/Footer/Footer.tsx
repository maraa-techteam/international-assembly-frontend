import { Icon } from '@/common/components/Icon/Icon'
import { Typography } from '@/common/components/Typography/Typography'
import {
  LEGAL_ENTITY_NAME,
  POSTAL_ADDRESS,
  REGISTRATION,
  SITE_NAME_FULL,
} from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'

import { FooterType } from './Footer.type'
import { FooterNavItem } from './components/FooterNavItem'

type FooterProps = FooterType

export function Footer({ footerData }: FooterProps) {
  const date = new Date()

  return (
    <footer className='bg-primary flex flex-col gap-4 p-4 lg:px-18 lg:py-12'>
      <div className='flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-32'>
        <div className='flex w-fit flex-col items-start gap-5'>
          <Link className='flex content-center items-center' href='/'>
            <Image
              src='/images/logo.svg'
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
              <li>
                <Link
                  href={'https://www.youtube.com/@МеждународнаяАссамблея'}
                  target='_blank'
                  aria-label={'youtube'}
                  className='flex items-center gap-2 text-white'
                >
                  <Icon icon={'youtube'} />
                </Link>
              </li>
              <li>
                <Link
                  href={'https://t.me/QSAAbot'}
                  target='_blank'
                  aria-label={'telegram'}
                  className='flex items-center gap-2 text-white'
                >
                  <Icon icon={'telegram'} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <nav className='w-full max-w-360' aria-label='Навигация'>
          <ul className='flex w-full flex-col gap-2 lg:flex-row lg:justify-end lg:gap-8'>
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
      <div className='flex flex-col gap-1'>
        <Typography variant='body' className='text-contrast text-sm opacity-40'>
          {`© ${date.getFullYear()} ${SITE_NAME_FULL}`}
        </Typography>
        <Typography variant='body' className='text-contrast text-sm opacity-40'>
          {`${LEGAL_ENTITY_NAME}, Charity ID: ${REGISTRATION.number}`}
        </Typography>
        <Typography variant='body' className='text-contrast text-sm opacity-40'>
          {POSTAL_ADDRESS}
        </Typography>
        {/*
          Art. 13 GDPR is a duty to inform, which only works if the notice is
          reachable from every page — hence here rather than only in the nav
          column above, which collapses behind a summary on mobile.
        */}
        <Link href='/privacy' className='w-fit'>
          <Typography
            variant='body'
            className='text-contrast text-sm underline opacity-60 transition-opacity hover:opacity-100'
          >
            Уведомление о конфиденциальности
          </Typography>
        </Link>
      </div>
    </footer>
  )
}
