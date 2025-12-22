import { fetchArticles } from '@/lib/api/fetchArticles'
import { getPageData } from '@/lib/api/fetchPage'
import { ArticleCard, Section } from '@/ui/components'
import { Grid } from '@/ui/components/Grid/Grid'
import { Metadata } from 'next'

import PageBuilder from '../pageBuilder'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData('news-and-events')
  return {
    title: pageData[0].meta_title,
    description: pageData[0].meta_description,
  }
}

export default async function NewsAndEventsPage() {
  const pageData = await getPageData('news-and-events')
  const articles = await fetchArticles()

  return (
    <>
      <PageBuilder pageData={pageData[0]} />
      <Section variant={'single-column'} color={'white'}>
        <Grid isScrollable={false} columns={2} gap={6}>
          {articles &&
            articles.map((card, i) => (
              <ArticleCard
                key={i}
                title={card.title}
                perex={card.perex}
                image={card.image}
                date_created={card.date_created}
              />
            ))}
        </Grid>
      </Section>
    </>
  )
}
