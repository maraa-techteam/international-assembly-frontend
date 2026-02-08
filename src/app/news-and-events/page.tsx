import { fetchNewsAndEventsPage } from '@/api/fetchNewsAndEventsPage'
import { RichTextPreview, Typography } from '@/components'
import { ArticleCard, fetchArticles } from '@/features/articles'
import { Section } from '@/layouts'
import { Grid } from '@/layouts/Grid/Grid'
import { Metadata } from 'next'

const pageData = await fetchNewsAndEventsPage()

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageData[0].meta_title,
    description: pageData[0].meta_description,
  }
}

export default async function NewsAndEventsPage() {
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
                  key={article.id}
                  slug={article.slug}
                  title={article.title}
                  perex={article.perex}
                  image={article.image}
                  date_created={article.date_created}
                  id={article.id}
                />
              ),
            )}
        </Grid>
      </Section>
    </>
  )
}
