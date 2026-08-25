import { Grid } from '@/common/components/Grid/Grid'
import { Label } from '@/common/components/Label/Label'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { formatDate } from '@/common/utils/dateFormatter'
import { getImageUrl } from '@/common/utils/getImageUrl'
import { fetchArticle } from '@/features/articles/api/fetchArticle'
import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard'
import { Article } from '@/features/articles/types/Article.type'
import Image from 'next/image'

type RelatedArticleJunction = {
  id: number
  article_id: string
  related_article_id: RelatedArticleData
}

type RelatedArticleData = {
  id: string
  sort: number
  user_created: string
  date_created: string
  date_updated: string
  title: string
  image: string
  content: string
  perex: string
  related_articles: number[]
}

export async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await fetchArticle(slug)

  // Transform related articles from junction table format to flat article format
  const relatedArticles =
    article?.related_articles?.map(
      (junction: RelatedArticleJunction) => junction.related_article_id,
    ) || []

  return (
    <>
      <Section color='contrast' className='w-full lg:max-w-200'>
        <Typography variant='h1'>{article?.title}</Typography>
        <Label text={formatDate(article?.date_created)} />
        <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-[#f5f5f5]'>
          {article?.image ? (
            <Image
              src={getImageUrl(article.image)}
              alt={article.title}
              fill
              sizes='(min-width: 1024px) 656px, 100vw'
              className='object-cover object-top'
              priority
            />
          ) : (
            <span className='absolute inset-0 flex items-center justify-center text-sm text-gray-400'>
              Картинка не найдена
            </span>
          )}
        </div>
        <RichTextPreview htmlContent={article?.content || ''} />
      </Section>
      {relatedArticles.length > 0 && (
        <Section alignment='center' color='white'>
          <Typography variant='h2'>Могло бы вас заинтересовать</Typography>
          <Grid isScrollable columns={2} gap={6}>
            {relatedArticles.map((card: Article) => {
              return (
                <ArticleCard
                  key={card.id}
                  slug={card.slug}
                  title={card.title}
                  perex={card.perex}
                  image={card.image}
                  date_created={card.date_created}
                  id={card.id}
                />
              )
            })}
          </Grid>
        </Section>
      )}
    </>
  )
}
