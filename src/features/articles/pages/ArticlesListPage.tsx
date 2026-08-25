import { fetchNewsAndEventsPage } from '@/common/api/fetchNewsAndEventsPage'
import { Grid } from '@/common/components/Grid/Grid'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard'

export async function ArticlesListPage() {
  const pageData = await fetchNewsAndEventsPage()
  const articles = await fetchArticles()
  const page = pageData[0]

  // Picking a highlighted post is optional in the CMS, so the field is often
  // null. When it is unset the page just lists every article in the grid.
  const highlightedPost = page?.highlighted_post ?? null

  return (
    <>
      <Section color='white'>
        <Typography variant='h1'>{page?.title}</Typography>
        {page?.text && <RichTextPreview htmlContent={page.text} />}
        {highlightedPost && (
          <ArticleCard
            isHighlighted
            className='max-w-full'
            {...highlightedPost}
          />
        )}
      </Section>
      <Section color='white'>
        <Grid isScrollable={false} columns={2} gap={6}>
          {articles &&
            articles.map((article) =>
              article.title === highlightedPost?.title ? null : (
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
