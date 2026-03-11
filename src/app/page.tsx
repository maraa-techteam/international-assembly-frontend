import { getFrequentlyVisitedLinks } from '@/common/api/fetchFrequentlyVisitedLinks'
import { fetchHomePage } from '@/common/api/fetchHomePage'
import { Button, LinkComponent, Typography } from '@/common/components'
import { ContentGuide, Grid, Section } from '@/common/layouts'
import { getImageUrl } from '@/common/utils/getImageUrl'
import { ArticleCard } from '@/features/articles'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { GroupsFilterDashboard, fetchGroupCountries } from '@/features/groups'
import { fetchGroups } from '@/features/groups/api/fetchGroups'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchHomePage()
  const page = pageData[0]
  return {
    title: page.meta_title,
    description: page.meta_description,
  }
}

export default async function Home() {
  const frequentlyVisitedLinks = await getFrequentlyVisitedLinks()
  const article_cards = await fetchArticles()
  const { data: groups } = await fetchGroups()

  const countries = await fetchGroupCountries()
  const presence = ['Онлайн', 'Офлайн', 'Гибрид']
  const schedule = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ]
  return (
    <>
      <Section
        color='white'
        className='gap-8 py-10 text-center lg:gap-15 lg:py-39'
      >
        <Typography variant='h1' className='lg:text-5xl' font='roboto'>
          Проблемы с алкоголем?
          <span className='text-primary'> Есть решение.</span>
        </Typography>
        <Grid as='nav' className='lg:flex lg:flex-row lg:justify-center'>
          <Button
            variant='outlined'
            size='lg'
            color='primary'
            as='link'
            href='/groups'
          >
            Найти группу
          </Button>
          <Button
            variant='contained'
            size='lg'
            color='primary'
            href='/about-aa'
            as='link'
          >
            Я здесь впервые
          </Button>
        </Grid>
      </Section>
      <Section color='primary' className='items-start overflow-x-hidden'>
        <Typography variant='h2' font='roboto'>
          Все что вас интересует
        </Typography>
        {!!frequentlyVisitedLinks.length && (
          <ContentGuide data={frequentlyVisitedLinks} />
        )}
      </Section>
      <Section
        className='flex flex-col lg:grid lg:grid-cols-[1fr_0.5fr]'
        alignment='start'
        color='white'
      >
        <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
          <div className='flex flex-col gap-2'>
            <Typography variant='h2' font='roboto'>
              Нужна помощь?
            </Typography>
            <Typography variant='body'>
              А.А. уже более 80 лет помогает алкоголикам выздороветь. Программа
              выздоровления АА построена на простом принципе: один алкоголик
              делится с другим. Если ваше пьянство выходит из-под контроля, АА
              может помочь.
            </Typography>
          </div>
          <LinkComponent
            icon='telegram'
            isUnderlined
            color='primary'
            text='Связаться с сообществом'
            href='https://t.me/@QSAAbot'
            variant='icon-left'
          />
          <Grid as='nav' className='lg:flex lg:flex-row'>
            <Button
              variant='outlined'
              size='lg'
              color='primary'
              as='link'
              href='/about-aa'
            >
              Подходит ли мне АА?
            </Button>
            <Button
              variant='contained'
              size='lg'
              color='primary'
              as='link'
              href='/start-the-journey'
            >
              Начать путь
            </Button>
          </Grid>
        </div>
        <div className='flex h-fit w-full justify-end lg:w-auto'>
          <Image
            src={getImageUrl('76877722-f746-4213-a78e-020d5f72fb49')}
            alt='Нужна помощь?'
            width={500}
            height={400}
            sizes='(max-width: 640px) 100vw, 600px'
            className='w-full max-w-md rounded-lg object-contain object-top'
            priority={false}
          />
        </div>
      </Section>
      <Section color='primary'>
        <div className='flex flex-col gap-2'>
          <Typography variant='h2' font='roboto'>
            Поиск русскоязычных групп
          </Typography>
          <Typography variant='body'>
            Найдите русскоязычные группы Анонимных Алкоголиков в вашем городе
            или онлайн.
          </Typography>
        </div>
        <Suspense fallback={null}>
          <GroupsFilterDashboard
            dropdownOptions={{
              country: countries,
              presence: presence,
              schedule: schedule,
            }}
            variant='widget'
            className='bg-primary max-w-200 p-0'
          />
        </Suspense>
      </Section>
      <Section alignment='center' color='white'>
        <Typography variant='h2' font='roboto'>
          Новости и события
        </Typography>
        <Grid isScrollable columns={2} gap={6}>
          {article_cards.slice(0, 2).map((card) => {
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
    </>
  )
}
