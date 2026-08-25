export type SecondTierNavigationType = {
  name: string
  href: string
  description: string
  isFrequentlyVisited: boolean
}

export type NavigationType = {
  name: string
  href: string
  isActive: boolean
  subNav: SecondTierNavigationType[]
}

const aboutSubNav: SecondTierNavigationType[] = [
  {
    name: 'Что такое МА? ',
    href: '/about-international-assembly',
    description:
      'Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных  Алкоголиков – это самостоятельная структура обслуживания АА, состоящая из представителей отдельных групп АА и региональных комитетов совместно с постоянно  действующим комитетом (ПКМА',
    isFrequentlyVisited: false,
  },
  {
    name: 'Полезные ссылки',
    href: '/useful-links',
    description:
      'На этой странице собраны полезные ссылки для русскоязычного сообщества Анонимных Алкоголиков. Здесь вы найдете официальные ресурсы АА, сайты служб и комитетов, материалы о программе «Двенадцать Шагов» и «Двенадцать Традиций».',
    isFrequentlyVisited: false,
  },
  {
    name: 'Добровольное пожертвование',
    href: '/contributions',
    description:
      'Добровольные пожертвования являются важной частью поддержки служения в сообществе Анонимных Алкоголиков. Благодаря вкладам членов сообщества становится возможной работа служб, проведение мероприятий, поддержка информационных ресурсов и развития.',
    isFrequentlyVisited: false,
  },
  {
    name: 'Контакты',
    href: '/contacts',
    description:
      'На этой странице вы найдете контактную информацию Международной Ассамблеи по Общему Обслуживанию русскоязычных Анонимных Алкоголиков.',
    isFrequentlyVisited: true,
  },
  {
    name: 'Для профессионалов',
    href: '/to-professionals',
    description:
      'Этот раздел предназначен для специалистов, которые в своей профессиональной деятельности сталкиваются с проблемой алкоголизма и работают с людьми, нуждающимися в поддержке и выздоровлении.',
    isFrequentlyVisited: false,
  },
]

const newcomersSubNav: SecondTierNavigationType[] = [
  {
    name: 'Начать путь',
    href: '/start-the-journey',
    description: 'Ответы на самые частые вопросы новичков и членов АА.',
    isFrequentlyVisited: true,
  },
  {
    name: 'Что такое АА?',
    href: '/about-aa',
    description:
      'Анонимные Алкоголики® - это Содружество, объединяющее мужчин и женщин,  которые делятся друг с другом своим опытом, силами и надеждами с целью  помочь себе и другим избавиться от алкоголизма.',
    isFrequentlyVisited: true,
  },
  {
    name: '12 шагов и 12 традиций',
    href: '/12-steps-12-traditions',
    description:
      'Двенадцать Шагов — это программа выздоровления от алкоголизма, а Двенадцать Традиций — принципы, на которых строится единство групп Анонимных Алкоголиков.',
    isFrequentlyVisited: false,
  },
  {
    name: 'Ответы на вопросы',
    href: '/faq',
    description: 'Ответы на самые частые вопросы новичков и членов АА.',
    isFrequentlyVisited: false,
  },
  {
    name: 'Подходит ли мне АА?',
    href: '/is-aa-for-me',
    description:
      'Мы же пришли в АА потому что, в конце концов, отказались от попыток  контролировать свою выпивку. Нам очень не хотелось признать тот факт что мы никогда не сможем пить «нормально».',
    isFrequentlyVisited: true,
  },
]

export const headerNavigationData: NavigationType[] = [
  { name: 'О нас', href: '/', isActive: false, subNav: aboutSubNav },
  { name: 'Новичкам', href: '/', isActive: false, subNav: newcomersSubNav },
]

/**
 * Links surfaced in the "Все что вас интересует" guide on the home page.
 *
 * These used to come from the `sub_nav` collection in Directus, but navigation
 * is hardcoded here since the nav refactor and the collection no longer exists
 * in the CMS. Deriving the list from the same entries keeps the guide and the
 * menus from drifting apart.
 */
export const frequentlyVisitedLinks: SecondTierNavigationType[] = [
  ...aboutSubNav,
  ...newcomersSubNav,
].filter((link) => link.isFrequentlyVisited)

export const footerNavigationData: NavigationType[] = [
  { name: 'О нас', href: '/', isActive: false, subNav: aboutSubNav },
  { name: 'Новичкам', href: '/', isActive: false, subNav: newcomersSubNav },
  {
    name: 'Контакты',
    href: '/',
    isActive: false,
    subNav: [
      {
        name: 'Написать админу',
        href: '/contacts',
        description:
          'Здесь вы сможете оставить вопрос или предложение админу сайта.',
        isFrequentlyVisited: false,
      },
    ],
  },
]
