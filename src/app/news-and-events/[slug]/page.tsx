import { fetchArticle } from '@/lib/api/fetchArticle'
import { formatDate } from '@/lib/utils/dateFormatter'
import { getImageUrl } from '@/lib/utils/getImageUrl'
import { Article } from '@/types/base'
import {
  ArticleCard,
  Grid,
  Label,
  RichTextPreview,
  Section,
  Typography,
} from '@/ui/components'
import { Metadata } from 'next'
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchArticle(slug)
  return {
    title: article?.title,
    description: article?.perex,
  }
}

export default async function ArticleDetailPage({
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
      <Section color={'contrast'}>
        <Typography variant='h1'>{article?.title}</Typography>
        <Label text={formatDate(article?.date_created)} />
        <Grid align={'start'} justify={'center'} columns={2}>
          <RichTextPreview htmlContent={article?.content || ''} />
          {article?.image ? (
            <Image
              src={getImageUrl(article?.image)}
              alt={article?.title}
              width={600}
              height={280}
              className={
                'max-h-70 w-full max-w-150 rounded-lg object-cover object-top'
              }
              priority={false}
            />
          ) : (
            <div className='flex max-h-70 w-full max-w-150 items-center justify-center rounded-lg bg-[#f5f5f5]'>
              <span className='text-sm text-gray-400'>Картинка не найдена</span>
            </div>
          )}
        </Grid>
      </Section>
      {relatedArticles.length > 0 && (
        <Section alignment='center' color={'white'}>
          <Typography variant='h2' font='roboto'>
            Могло бы вас заинтересовать
          </Typography>
          <Grid isScrollable columns={2} gap={6}>
            {relatedArticles.map((card: Article) => {
              return (
                <ArticleCard
                  key={card.title}
                  title={card.title}
                  perex={card.perex}
                  image={card.image}
                  date_created={card.date_created}
                />
              )
            })}
          </Grid>
        </Section>
      )}
    </>
  )
}
