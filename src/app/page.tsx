import { fetchHomePage } from '@/common/api/fetchHomePage'
import { Button } from '@/common/components/Button/Button'
import { ContentGuide } from '@/common/components/ContentGuide/ContentGuide'
import { Grid } from '@/common/components/Grid/Grid'
import { frequentlyVisitedLinks } from '@/common/components/Header/data'
import { Icon } from '@/common/components/Icon/Icon'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { buildPageMetadata } from '@/config/seo'
import { fetchGroupCountries } from '@/features/groups/api/fetchGroupCountries'
import { GroupSearchWidget } from '@/features/groups/components/GroupSearchWidget/GroupSearchWidget'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchHomePage()
  const page = pageData[0]
  return buildPageMetadata({
    title: page?.meta_title,
    description: page?.meta_description,
    path: '/',
    fallbackTitle: 'Проблемы с алкоголем? Есть решение',
  })
}

export default async function Home() {
  const countries = await fetchGroupCountries()
  const presence = ['Онлайн', 'Офлайн', 'Гибрид']

  return (
    <>
      <Section
        color='white'
        className='mx-auto gap-8 py-10 text-center lg:gap-15 lg:py-39'
      >
        <Typography variant='h1' className='lg:text-5xl'>
          Проблемы с алкоголем?
          <span className='text-primary'> Есть решение.</span>
        </Typography>
        <Grid as='nav' className='lg:flex lg:flex-row lg:justify-center'>
          <Button
            variant='outlined'
            size='lg'
            color='primary'
            as='link'
            href='/start-the-journey'
          >
            Начать путь
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
      <div className='bg-primary'>
        <Section
          color='primary'
          className='mx-auto w-full items-start overflow-x-hidden lg:py-12'
        >
          <Typography variant='h2'>Все что вас интересует</Typography>
          {!!frequentlyVisitedLinks.length && (
            <ContentGuide data={frequentlyVisitedLinks} />
          )}
        </Section>
      </div>

      <Section
        className='mx-auto flex flex-col lg:grid lg:grid-cols-[1fr_0.5fr] lg:py-12'
        alignment='start'
        color='white'
      >
        <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
          <div className='flex flex-col gap-2'>
            <Typography variant='h2'>Нужна помощь?</Typography>
            <Typography variant='body'>
              В Анонимных Алкоголиках мы всегда рады прийти на помощь любому
              алкоголику, который к нам обратится. Прямо сейчас вы можете
              позвонить по номеру нашей круглосуточной горячей линии или
              связаться с нами в социальных сетях. В АА Вы всегда найдёте
              поддержку и понимание!
            </Typography>
            <Typography className='font-bold' variant='body'>
              «Если где-то кто-то в беде, и ему нужна наша помощь, АА всегда
              будет рядом. И я отвечаю за это». («Декларация ответственности
              АА», 1965 г.)
            </Typography>
          </div>
          <Link
            href='https://t.me/@QSAAbot'
            className='text-primary flex flex-row items-center gap-4 underline'
          >
            <Icon icon='telegram' />
            Связаться с сообществом
          </Link>
          <Grid as='nav' className='lg:flex lg:flex-row'>
            <Button
              variant='outlined'
              size='lg'
              color='primary'
              as='link'
              href='/is-aa-for-me'
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
            src='/images/need-help.png'
            alt='Нужна помощь?'
            width={1280}
            height={720}
            sizes='(max-width: 640px) 100vw, 600px'
            className='w-full max-w-md rounded-lg object-contain object-top'
            priority={false}
          />
        </div>
      </Section>
      <div className='bg-primary'>
        <Section className='mx-auto min-h-100 justify-center' color='primary'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <Typography variant='h2'>Поиск русскоязычных групп</Typography>
              <Typography variant='body'>
                Найдите русскоязычные группы Анонимных Алкоголиков в вашем
                городе или онлайн.
              </Typography>
            </div>
            <Suspense>
              <GroupSearchWidget
                dropdownOptions={{
                  country: countries,
                  presence: presence,
                }}
                className='bg-primary max-w-200 p-0'
              />
            </Suspense>
          </div>
        </Section>
      </div>
    </>
  )
}
