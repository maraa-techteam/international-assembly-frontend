import { Footer } from '@/common/components/Footer/Footer'
import { Header } from '@/common/components/Header/Header'
import {
  footerNavigationData,
  headerNavigationData,
} from '@/common/components/Header/data'
import { Layout } from '@/common/components/Layout/Layout'
import { cn } from '@/common/utils/cn'
import { OG_IMAGE, SITE_NAME_FULL, SITE_URL } from '@/config/site'
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

const siteDescription =
  'Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков — самостоятельная структура обслуживания АА. В её состав входят представители отдельных групп АА, региональных комитетов и постоянно действующий комитет (ПКМА). Ассамблея руководствуется 12 Традициями АА и 12 Концепциями обслуживания, координирует деятельность с Офисом по Общему Обслуживанию АА США и Канады, а также сотрудничает без присоединения с заинтересованными организациями и региональными структурами. Заседания Ассамблеи проходят два раза в год.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME_FULL,
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME_FULL,
    title: SITE_NAME_FULL,
    description: siteDescription,
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary',
    title: SITE_NAME_FULL,
    description: siteDescription,
    images: [OG_IMAGE.url],
  },
}

/**
 * ISR window for the whole site: every route below this layout is prerendered
 * and regenerated in the background at most once a minute, so CMS edits go live
 * without a redeploy. The lowest `revalidate` in a route's segment tree wins, so
 * an individual page can opt into a shorter window, never a longer one.
 *
 * Next requires this to be a statically analyzable literal — it cannot import
 * CMS_REVALIDATE_SECONDS from src/config/isr.ts. Keep the two in sync.
 */
export const revalidate = 60

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        <Footer footerData={footerNavigationData} />
      </body>
    </html>
  )
}
