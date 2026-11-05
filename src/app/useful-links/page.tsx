import {
  ContentBody,
  ContentIntro,
} from '@/common/components/ContentPage/ContentPage'
import { Icon } from '@/common/components/Icon/Icon'
import { IconType } from '@/common/components/Icon/Icon.type'
import Typography from '@/common/components/Typography/Typography'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const dynamic = 'force-static'

export const metadata: Metadata = buildPageMetadata({ path: '/useful-links' })

type UsefulLink = {
  heading: string
  description?: string
  href: string
  label: string
  icon: IconType
}

const usefulLinks: UsefulLink[] = [
  {
    heading: 'ОАР - Окружная Ассамблея Русскоязычных Групп США и Канады',
    href: 'https://www.russianspeakingaa.org',
    label: 'www.russianspeakingaa.org',
    icon: 'website',
  },
  {
    heading: 'Youtube канал',
    description:
      'YouTube-канал МА, на котором вы можете найти опыт членов АА по различным темам, касающимся содружества АА, семинары по традициям, концепциям , служению, информационные встречи по вопросам структуры МА, материалы по прошедшим Международным конвенциям и много другой полезной информации.',
    href: 'https://www.youtube.com/channel/UCRclYOjYZyY8_s21ZJwrI2Q',
    label: '@МеждународнаяАссамблея',
    icon: 'youtube',
  },
  {
    heading: 'Семинары МАРАА',
    description:
      'Telegram-канал, на котором публикуется информация о мероприятиях, семинарах, спикерских, проводимых Комитетом по организации мероприятий МА в рамках тем сообщества АА.',
    href: 'https://t.me/+s9nGt4ZvHFo4ZjA8',
    label: 'Семинары МАРАА',
    icon: 'telegram',
  },
  {
    heading: 'Инфоканал МК',
    description:
      'Посвящен Международной Конвенции, которая проходит ежегодно в мае. Инфоканал начинает свою активную работу за 4 месяца до начала Конвенции и приглашает всех заинтересованных членов АА принять участие в организации и проведении мероприятия, служении, информировании.',
    href: 'https://t.me/+mPf_8cSCj0ZlZTZh',
    label: 'Инфоканал МК',
    icon: 'telegram',
  },
  {
    heading: 'Чат для одиночек',
    description:
      'Telegram-чат Комитета по работе с одиночками создан с целью объединения отдельных членов АА в странах, где пока нет русскоязычных групп АА («одиночки»). В Telegram-чат вы сможете получить поддержку русскоязычных анонимных алкоголиков, информацию о сообществе и группах в ваших странах. Вы не останетесь одни! В чат вас добавит Федор.',
    href: 'https://t.me/FjodorSuomi',
    label: 'Федор',
    icon: 'telegram',
  },
  {
    heading: 'Найди наставника',
    description:
      'Telegram-чат Комитета по работе с лечебными учреждениями МА создан с целью помочь русскоязычным онлайн группам нести наши идеи тем алкоголикам, которые ещё страдают. Приглашаем всех желающих членов АА к несению вести в реабилитационных центрах и больницах на платформах Zoom и Skype.',
    href: 'https://t.me/findsponsor',
    label: 'Найди наставника',
    icon: 'telegram',
  },
]

export default function UsefulLinks() {
  return (
    <>
      <ContentIntro>
        <Typography variant='h1'>Полезные ссылки</Typography>
        <div className='rte'>
          <p>
            Ссылки на проекты и партнеров Международной Ассамблеи по Общему
            Обслуживанию Русскоязычных Анонимных Алкоголиков (МА).
          </p>
        </div>
      </ContentIntro>
      <ContentBody>
        <div className='rte'>
          {usefulLinks.map((link) => (
            <Fragment key={link.heading}>
              <h2>{link.heading}</h2>
              {link.description && <p>{link.description}</p>}
              <p>
                <a href={link.href} target='_blank' rel='noopener noreferrer'>
                  <Icon icon={link.icon} className='rte-social-icon' />
                  {link.label}
                </a>
              </p>
            </Fragment>
          ))}
          <p>&nbsp;</p>
        </div>
      </ContentBody>
    </>
  )
}
