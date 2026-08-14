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

export const footerNavigationData: NavigationType[] = [
  { name: 'О нас', href: '/', isActive: false, subNav: aboutSubNav },
  { name: 'Новичкам', href: '/', isActive: false, subNav: newcomersSubNav },
]
