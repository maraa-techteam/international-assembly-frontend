import { FooterProps } from '@/types/components'
import { FooterNavItem, LinkComponent, Typography } from '@/ui/components'
import Image from 'next/image'
import Link from 'next/link'

export function Footer({ footerData, socials }: FooterProps) {
  const date = new Date()

  return (
    <footer className='bg-primary flex flex-col gap-4 p-4 lg:px-18 lg:py-12'>
      <div className='flex w-full flex-col gap-4 lg:flex-row lg:gap-32'>
        <div className='flex w-fit flex-col items-start gap-5'>
          <Link className='flex content-center items-center' href={'/'}>
            <Image
              src={'/logo.svg'}
              width={230}
              height={54}
              className='w-auto min-w-60'
              alt={
                'Логотип Международной Ассамблеи по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков'
              }
            />
          </Link>
          <ul className='flex flex-row items-center justify-center gap-4'>
            {socials.map((item) => {
              return (
                <li key={item.name}>
                  <LinkComponent
                    color={'contrast'}
                    icon={item.icon}
                    text={''}
                    href={item.href}
                    variant={'icon-only'}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <ul className='flex w-full flex-col gap-2 lg:flex-row lg:justify-between'>
          {footerData.map((item) => (
            <FooterNavItem
              key={item.name}
              name={item.name}
              subNav={item.subNav}
            />
          ))}
        </ul>
      </div>

      <div className='h-[1px] w-full bg-white opacity-40' />

      <Typography
        variant={'body'}
        className='text-contrast text-sm opacity-40'
        font={'roboto'}
      >
        {`© ${date.getFullYear()} Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков`}
      </Typography>
    </footer>
  )
}
