import { Button } from '@/common/components/Button/Button'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = buildPageMetadata({ path: '/contributions' })

type ContributionsProvider = {
  name: string
  url?: string
  description?: string
  account?: string
}

const providers: ContributionsProvider[] = [
  { name: 'PayPal', url: 'https://paypal.me/ArturasBT' },
  {
    name: 'SEB Banka',
    description:
      'Карта банка литовского банка. Имя организации - Biedriba MAPAA.',
    account: 'LV02UNLA0055005426922',
  },
  { name: 'Revolut', url: 'http://revolut.me/arturaqm2a' },
  {
    name: 'Карта Сбербанк',
    description: 'Оксана Сергеевна Л. (не писать смс внутри банка)',
    account: '5336 6901 9177 3060',
  },
]

export default function Contributions() {
  return (
    <>
      <Section alignment='start' className='lg:pb-12' color='white'>
        <Typography variant='h1'>Добровольные пожертвования</Typography>
        <div className='rte'>
          <p>
            <em>
              «Когда же мы выказываем щедрость, опуская деньги в шляпу, это
              служит признаком нашей благодарности за проявленное к нам
              милосердие и свидетельством острого желания поделиться тем, что мы
              обрели, со все ещё страдающими алкоголиками».
            </em>
          </p>
          <p>«Язык сердца», стр.221</p>
        </div>
        <div className='flex flex-col gap-4 lg:flex-row'>
          {providers.map((provider) => (
            <div
              key={provider.name}
              className='bg-primary flex min-h-45 max-w-85 flex-col gap-2 rounded-lg p-4 lg:p-6'
            >
              <Typography variant='h3' className='text-white'>
                {provider.name}
              </Typography>
              {provider.description && (
                <Typography variant='body' className='text-white'>
                  {provider.description}
                </Typography>
              )}
              {provider.account && (
                <Typography variant='body' className='text-white'>
                  {provider.account}
                </Typography>
              )}
              {provider.url && (
                <>
                  <a
                    href={provider.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white underline'
                  >
                    {provider.url}
                  </a>
                  <Button
                    as='link'
                    href={provider.url}
                    variant='contained'
                    className='mt-2'
                    size={'lg'}
                    color={'white'}
                  >
                    Внести пожертвование
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
