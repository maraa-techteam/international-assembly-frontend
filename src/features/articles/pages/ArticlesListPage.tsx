import { Grid } from '@/common/components/Grid/Grid'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { fetchHighlightedArticle } from '@/features/articles/api/fetchHighlightedArticle'
import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard'

export async function ArticlesListPage() {
  // Picking a highlighted post is optional in the CMS, so the field is often
  // null. When it is unset the page just lists every article in the grid.
  const [highlightedPost, articles] = await Promise.all([
    fetchHighlightedArticle(),
    fetchArticles(),
  ])

  return (
    <>
      <Section color='white'>
        <Typography variant='h1'>Новости и события</Typography>
        <div className='rte'>
          <p>
            Все семинары можно посмотреть на нашем{' '}
            <a
              href='https://www.youtube.com/channel/UCRclYOjYZyY8_s21ZJwrI2Q'
              target='_blank'
              rel='noopener noreferrer'
            >
              ютуб канале.
            </a>
          </p>
        </div>
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
