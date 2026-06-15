import { getSocials } from '@/common/api/fetchSocials'
import { Footer } from '@/common/components/Footer/Footer'
import { Header } from '@/common/components/Header/Header'
import {
  footerNavigationData,
  headerNavigationData,
} from '@/common/components/Header/data'
import { Layout } from '@/common/components/Layout/Layout'
import { cn } from '@/common/utils/cn'
import '@/globals.css'
import type { Metadata } from 'next'
import { Roboto, Roboto_Slab } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

const robotoSlab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin', 'cyrillic'],
})

const roboto = Roboto({
  variable: '--font-roboto-normal',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PRODUCTION_FRONTEND_URL || 'http://localhost:3000',
  ),
  title:
    'Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков',
  description:
    'Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков — самостоятельная структура обслуживания АА. В её состав входят представители отдельных групп АА, региональных комитетов и постоянно действующий комитет (ПКМА). Ассамблея руководствуется 12 Традициями АА и 12 Концепциями обслуживания, координирует деятельность с Офисом по Общему Обслуживанию АА США и Канады, а также сотрудничает без присоединения с заинтересованными организациями и региональными структурами. Заседания Ассамблеи проходят два раза в год.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const socials = await getSocials()
  return (
    <html lang='ru'>
      <body
        className={cn(
          robotoSlab.variable,
          roboto.variable,
          'overflow-x-hidden antialiased',
        )}
      >
        <NextTopLoader
          color='var(--primary)'
          shadow='none'
          height={4}
          initialPosition={0.08}
          showSpinner={false}
        />
        <Header headerData={headerNavigationData} />
        <Layout>{children}</Layout>
        <Footer footerData={footerNavigationData} socials={socials} />
      </body>
    </html>
  )
}
