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
 * Title and description of every fixed-path route, and the only place they are
 * written: a route publishes them with `buildPageMetadata({ path })`. The CMS no
 * longer holds this copy, so changing it means a deploy.
 *
 * Titles are budgeted against the ` | ${SITE_NAME}` suffix `buildPageMetadata`
 * appends — roughly 30 characters for the page's own half. `seo.test.ts` fails on
 * anything search results would cut off, so these limits cover what is published.
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
    title: 'Для профессионалов',
    description:
      'Информация для врачей, психологов, соцработников и духовенства о сотрудничестве с Анонимными Алкоголиками и о направлении людей с зависимостью.',
  },
  '/start-the-journey': {
    title: 'Начать путь',
    description:
      'Начните путь к трезвости вместе с Анонимными Алкоголиками. Узнайте о программе, поддержке сообщества и анонимных встречах рядом с вами.',
  },
  '/faq': {
    title: 'Ответы на вопросы',
    description:
      'Ответы на самые частые вопросы для тех, кто впервые обращается к Анонимным Алкоголикам (АА). Узнайте, как работает сообщество и чего ожидать новым участникам.',
  },
  '/is-aa-for-me': {
    title: 'Подходит ли мне АА?',
    description:
      'Подходит ли мне АА? Узнайте, как понять, нужно ли вам сообщество Анонимных Алкоголиков, и какие признаки могут на это указывать.',
  },
  '/12-steps-12-traditions': {
    title: '12 шагов и традиций',
    description:
      'Двенадцать Шагов и Двенадцать Традиций Анонимных Алкоголиков — основа программы выздоровления от алкоголизма и единства сообщества.',
  },
  '/contacts': {
    title: 'Контакты',
    description:
      'Свяжитесь с Международной Ассамблеей Общего Обслуживания Русскоязычных АА: обратная связь, вопросы, контакты комитетов и администратора.',
  },
  '/useful-links': {
    title: 'Полезные ссылки',
    description:
      'Ссылки на проекты и партнеров Международной Ассамблеи по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков (МА)',
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
      'Литература АА: список книг и материалов сообщества Анонимных Алкоголиков. Основные тексты, брошюры и руководство для участников.',
  },
  '/privacy': {
    title: 'Конфиденциальность данных',
    description:
      'Какие данные сайт Международной Ассамблеи русскоязычных АА получает через формы, зачем они нужны, кому передаются и как их удалить. Cookie не используются.',
  },
  '/services': {
    title: 'Служения в сообществе АА',
    description:
      'Узнайте о служениях в АА: полный список ролей, их описание и обязанности в Международной Ассамблее Анонимных Алкоголиков.',
  },
}

type PageMetadataInput = {
  /** A detail page's own title, e.g. a group's name. Defaults to `path`'s entry. */
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
