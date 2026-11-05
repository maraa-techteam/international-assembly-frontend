import { Button } from '@/common/components/Button/Button'
import {
  ContentBody,
  ContentIntro,
} from '@/common/components/ContentPage/ContentPage'
import { Grid } from '@/common/components/Grid/Grid'
import { Icon } from '@/common/components/Icon/Icon'
import Typography from '@/common/components/Typography/Typography'
import { buildPageMetadata } from '@/config/seo'
import { TELEGRAM_HELP_URL } from '@/config/site'
import { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata: Metadata = buildPageMetadata({
  path: '/start-the-journey',
})

export default function StartTheJourney() {
  return (
    <>
      <ContentIntro
        image={{
          src: '/images/start-the-journey.jpg',
          alt: 'Начать путь',
          width: 1280,
          height: 720,
        }}
      >
        <Typography variant='h1'>Начать путь</Typography>
        <div className='rte'>
          <p>
            Начать путь можно с простого шага: узнать больше о программе или
            посетить встречу. Вы можете двигаться в своём темпе и решить сами,
            что подходит именно вам. Главное — помнить, что вам не обязательно
            проходить этот путь в одиночку.
          </p>
        </div>
        <Link
          href={TELEGRAM_HELP_URL}
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
            href='/literature'
          >
            Литература
          </Button>
          <Button
            variant='contained'
            size='lg'
            color='primary'
            as='link'
            href='/groups'
          >
            Найти группу
          </Button>
        </Grid>
      </ContentIntro>
      <ContentBody>
        <div className='rte'>
          <h2>С чего начать?</h2>
          <p>
            Сообщество АА предлагает поддержку от одного алкоголика другому.
            Именно поэтому первым шагом новичка это контактирование сообщества.
          </p>
          <p>
            Взаимопомощь это большая часть выздоровления и культуры АА. На наших
            телефонах и телеграмм каналах всегда дежурит кто-то из членов
            сообщества. Мы с удовольствием ответим на ваши вопросы или свяжем
            вас с тем, кто может на них ответить.
          </p>
          <h2>Ответы на вопросы новичков</h2>
          <p>
            Сколько стоит членство в АА? Является-ли АА религиозной сектой? Что
            происходит на собраниях?
          </p>
          <p>
            <Link href='/faq'>Ответы на вопросы</Link>
          </p>
          <p>
            На чем основывается АА? Что такое шаги и чем они отличаются от
            традиций?
          </p>
          <p>
            <Link href='/12-steps-12-traditions'>12 шагов и традиций</Link>
          </p>
          <h2>Что такое группы и как их найти?</h2>
          <p>
            Наверное каждому алкоголику в Содружестве было очень страшно впервые
            прийти на группу. Что там происходит? Примут ли меня? Может быть мне
            это не подходит? Тысяча сомнений может одолевать страдающего
            алкоголика.
          </p>
          <p>
            На собраниях групп АА доброжелательная атмосфера. Пришедшему даже не
            обязательно называть свое настоящее имя. Никто не будет вынуждать
            рассказывать о себе. Все по желанию и в комфортной обстановке. На
            многих группах АА есть чай, конфеты и угощения. Можно просто прийти
            и послушать опыт других алкоголиков, которым удается оставаться
            трезвыми продолжительное время.
          </p>
          <p>
            <Link href='/about-groups'>Подробнее о группах</Link>
          </p>
          <p>
            <Link href='/groups'>Найти группу</Link>
          </p>
        </div>
      </ContentBody>
    </>
  )
}
