import { fetchArticles } from '@/lib/api/fetchArticles'
import { fetchNewsAndEventsPage } from '@/lib/api/fetchNewsAndEventsPage'
import {
  ArticleCard,
  RichTextPreview,
  Section,
  Typography,
} from '@/ui/components'
import { Grid } from '@/ui/components/Grid/Grid'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchNewsAndEventsPage()
  return {
    title: pageData[0].meta_title,
    description: pageData[0].meta_description,
  }
}

export default async function NewsAndEventsPage() {
  const pageData = await fetchNewsAndEventsPage()
  const articles = await fetchArticles()
  const page = pageData[0]

  return (
    <>
      <Section color={'white'}>
        <Typography variant={'h1'} font='roboto'>
          {page.title}
        </Typography>
        <RichTextPreview htmlContent={page.text} />
        <ArticleCard
          isHighlighted
          className='max-w-full'
          {...page.highlighted_post}
        />
      </Section>
      <Section color={'white'}>
        <Grid isScrollable={false} columns={2} gap={6}>
          {articles &&
            articles.map((article) =>
              article.title === page.highlighted_post.title ? null : (
                <ArticleCard
                  key={article.title}
                  title={article.title}
                  perex={article.perex}
                  image={article.image}
                  date_created={article.date_created}
                />
              ),
            )}
        </Grid>
      </Section>
    </>
  )
}
