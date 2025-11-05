import { cn } from '@/lib/utils/cn'
import { CardGroupProps } from '@/types/Components'
import { FC } from 'react'

import ArticleCard from '../ArticleCard/ArticleCard'

const CardGroup: FC<CardGroupProps> = ({
  cards,
  isScrollable,
  columns,
  type,
}) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-center gap-6 lg:grid',
        columns === 2
          ? 'lg:grid-cols-2'
          : columns === 3
            ? 'lg:grid-cols-3'
            : 'lg:grid-cols-4',
        isScrollable && 'overflow-x-auto',
      )}
    >
      {type === 'article' ? (
        cards.map((card) => (
          <ArticleCard
            key={card.href}
            title={card.title}
            text={card.text}
            image={card.image}
            href={card.href}
            publishedAt={card.publishedAt}
          />
        ))
      ) : type === 'book' ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  )
}

export default CardGroup
