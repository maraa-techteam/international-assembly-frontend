import type { Metadata } from 'next'

import { STATIC_ROUTES } from './routes'
import { OG_IMAGE, SITE_NAME, SITE_NAME_FULL, SITE_URL } from './site'

type PageSeo = {
  title: string
  description: string
  /**
   * Set on pages whose title already carries the brand, so the ` | <site name>`
   * suffix does not spend 28 of the ~60 characters search results show.
   */
  standaloneTitle?: boolean
}

/**
 * Default title and description for every static route.
 *
 * These are fallbacks: the CMS value wins whenever an editor has set one, and
 * for most pages they have. Keeping the copy here anyway means a cleared or
 * newly added CMS record degrades to something written for search rather than
 * to a placeholder, and gives one place to review the wording against what is
 * actually published.
 *
 * Titles are budgeted against the ` | ${SITE_NAME}` suffix `buildPageMetadata`
 * appends — roughly 30 characters for the page's own half.
 */
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Анонимные Алкоголики на русском языке',
    description:
      'Русскоязычные группы Анонимных Алкоголиков по всему миру. Найдите собрание АА онлайн или рядом с вами и получите помощь, если хотите бросить пить.',
    standaloneTitle: true,
  },
  '/about-aa': {
    title: 'Что такое Анонимные Алкоголики',
    description:
      'Анонимные Алкоголики — сообщество мужчин и женщин, которые делятся опытом, силой и надеждой, чтобы решить общую проблему и помочь другим выздороветь.',
  },
  '/about-international-assembly': {
    title: 'О Международной Ассамблее АА',
    description:
      'Международная Ассамблея по Общему Обслуживанию русскоязычных АА: структура, задачи и обслуживание групп в странах, где русский язык не государственный.',
  },
  '/to-professionals': {
    title: 'АА для специалистов',
    description:
      'Информация для врачей, психологов, соцработников и духовенства о сотрудничестве с Анонимными Алкоголиками и о направлении людей с зависимостью.',
  },
  '/start-the-journey': {
    title: 'Как начать путь к трезвости',
    description:
      'С чего начать в Анонимных Алкоголиках: первое собрание, наставник и программа 12 шагов. Первый шаг к трезвости можно сделать уже сегодня.',
  },
  '/faq': {
    title: 'Вопросы и ответы об АА',
    description:
      'Ответы на частые вопросы о сообществе Анонимных Алкоголиков: как проходят собрания, нужно ли платить, что такое анонимность и с чего начать новичку.',
  },
  '/is-aa-for-me': {
    title: 'Подходит ли мне АА?',
    description:
      'Несколько вопросов, которые помогут понять, есть ли у вас проблема с алкоголем и может ли помочь сообщество Анонимных Алкоголиков.',
  },
  '/12-steps-12-traditions': {
    title: '12 шагов и 12 традиций АА',
    description:
      'Двенадцать Шагов и Двенадцать Традиций Анонимных Алкоголиков — основа программы выздоровления от алкоголизма и единства сообщества.',
  },
  '/contacts': {
    title: 'Контакты и обратная связь',
    description:
      'Свяжитесь с Международной Ассамблеей русскоязычных АА: анонимный чат-бот в Telegram, контакты комитетов и форма обратной связи.',
  },
  '/useful-links': {
    title: 'Полезные ссылки и ресурсы АА',
    description:
      'Сайты структур Анонимных Алкоголиков, литература и проекты партнёров Международной Ассамблеи русскоязычных АА.',
  },
  '/contributions': {
    title: 'Добровольные пожертвования',
    description:
      'Как поддержать обслуживание русскоязычных АА добровольным пожертвованием. Седьмая традиция: сообщество полностью само себя обеспечивает.',
  },
  '/groups': {
    title: 'Группы и расписание собраний АА',
    description:
      'Поиск русскоязычных групп Анонимных Алкоголиков: фильтры по стране, формату — онлайн, офлайн, гибрид — и дню недели. Актуальное расписание собраний.',
  },
  '/about-groups': {
    title: 'Как проходят собрания АА',
    description:
      'Как устроены группы Анонимных Алкоголиков и что происходит на собрании: форматы встреч, открытые и закрытые собрания, чего ждать новичку.',
  },
  '/news-and-events': {
    title: 'Новости и события АА',
    description:
      'Новости Международной Ассамблеи русскоязычных Анонимных Алкоголиков, анонсы собраний, конференций и событий сообщества.',
  },
  '/literature': {
    title: 'Литература АА на русском',
    description:
      'Книги, брошюры, буклеты и рабочие тетради Анонимных Алкоголиков на русском языке, включая издания, одобренные конференцией.',
  },
  '/services': {
    title: 'Служения в сообществе АА',
    description:
      'Служения Международной Ассамблеи русскоязычных АА: чем можно помочь сообществу, какие условия есть у каждого служения и как подать заявку.',
  },
}

type PageMetadataInput = {
  /** Title from the CMS. Falls back to the entry for `path`. */
  title?: string | null
  description?: string | null
  /** Root-relative path of the page, e.g. `/about-aa`. */
  path: string
  /** Fallback for routes with no `PAGE_SEO` entry, i.e. the detail pages. */
  fallbackTitle?: string
  fallbackDescription?: string
}

/**
 * Builds the metadata for a page: title, description, canonical URL and the
 * Open Graph / Twitter tags.
 *
 * Next.js does not deep-merge `openGraph` from the root layout into a page, so
 * every page that defines its own metadata has to emit the full object. Going
 * through this helper keeps the tags consistent and stops a page from silently
 * shipping without social tags or with an `undefined` title when the CMS
 * returns an empty record.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  fallbackTitle,
  fallbackDescription,
}: PageMetadataInput): Metadata {
  const defaults = PAGE_SEO[path]

  const pageTitle = title?.trim() || fallbackTitle || defaults?.title
  // A page that supplied no title at all is left as the bare site name rather
  // than `Международная Ассамблея АА | Международная Ассамблея АА`.
  const fullTitle =
    !pageTitle || defaults?.standaloneTitle
      ? (pageTitle ?? SITE_NAME)
      : `${pageTitle} | ${SITE_NAME}`
  const pageDescription =
    description?.trim() || fallbackDescription || defaults?.description
  const url = new URL(path, SITE_URL).toString()

  return {
    title: fullTitle,
    description: pageDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: SITE_NAME_FULL,
      title: fullTitle,
      description: pageDescription,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description: pageDescription,
      images: [OG_IMAGE.url],
    },
  }
}

/** Static routes that ship without default copy. Exported for the test. */
export function routesMissingSeo(): string[] {
  return STATIC_ROUTES.filter((path) => !PAGE_SEO[path])
}
