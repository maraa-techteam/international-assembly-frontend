import { fetchNewsAndEventsPage } from '@/common/api/fetchNewsAndEventsPage'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Typography } from '@/common/components/Typography/Typography'
import { Grid } from '@/common/layouts/Grid/Grid'
import { Section } from '@/common/layouts/Section/Section'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard'

export async function ArticlesListPage() {
  const pageData = await fetchNewsAndEventsPage()
  const articles = await fetchArticles()
  const page = pageData[0]

  return (
    <>
      <Section color='white'>
        <Typography variant='h1' font='roboto'>
          {page.title}
        </Typography>
        <RichTextPreview htmlContent={page.text} />
        <ArticleCard
          isHighlighted
          className='max-w-full'
          {...page.highlighted_post}
        />
      </Section>
      <Section color='white'>
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
