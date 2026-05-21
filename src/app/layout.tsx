import { getNavigationData } from '@/common/api/fetchNavigation'
import { getSocials } from '@/common/api/fetchSocials'
import { Footer } from '@/common/layouts/Footer/Footer'
import { Header } from '@/common/layouts/Header/Header'
import { Layout } from '@/common/layouts/Layout/Layout'
import { cn } from '@/common/utils/cn'
import type { Metadata } from 'next'
import { Roboto, Roboto_Slab } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import '../globals.css'

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
  const navigationData = await getNavigationData()
  const socials = await getSocials()
  const transformedNavigationData = navigationData.map((item) => {
    return {
      ...item,
      isActive: false,
    }
  })

  const headerData = transformedNavigationData.filter(
    (item) => item.showInHeader,
  )
  const footerData = transformedNavigationData.filter(
    (item) => item.showInFooter,
  )
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
        <Header headerData={headerData} />
        <Layout>{children}</Layout>
        <Footer footerData={footerData} socials={socials} />
      </body>
    </html>
  )
}
