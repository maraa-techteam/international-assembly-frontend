import {
  ORGANIZATION_ID,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  groupEventSchema,
  organizationSchema,
  siteSchema,
} from './schema'

describe('organizationSchema', () => {
  it('is typed as a non-profit', () => {
    expect(organizationSchema()['@type']).toBe('NGO')
  })

  it('does not assert a legal non-profit status it cannot verify', () => {
    // `nonprofitStatus` enumerates US, Dutch and UK legal forms only; there is
    // no valid value in it for a Latvian registration.
    expect(organizationSchema()).not.toHaveProperty('nonprofitStatus')
  })

  it('carries the registry number as a checkable identifier', () => {
    expect(organizationSchema().identifier).toEqual({
      '@type': 'PropertyValue',
      propertyID: 'Latvijas Republikas Uzņēmumu reģistrs',
      value: '50008348781',
    })
  })

  it('claims only absolute profiles the site itself links to', () => {
    // `sameAs` asserts the target profile *is* this organisation, so every
    // entry has to be an absolute URL the footer actually renders.
    const sameAs = organizationSchema().sameAs as string[]
    expect(sameAs.length).toBeGreaterThan(0)
    for (const href of sameAs) {
      expect(href).toMatch(/^https:\/\//)
    }
  })
})

describe('siteSchema', () => {
  const website = () => {
    const graph = siteSchema() as { '@graph': Record<string, unknown>[] }
    return graph['@graph'].find((n) => n['@type'] === 'WebSite')
  }

  it('emits one graph whose website points at the organisation node', () => {
    expect(website()?.publisher).toEqual({ '@id': ORGANIZATION_ID })
  })

  it('declares the internal search as a resolvable SearchAction', () => {
    // The placeholder named by `query-input` has to be the one that actually
    // appears in `urlTemplate`, or a consumer cannot build a query URL.
    const action = website()?.potentialAction as {
      'query-input': string
      target: { urlTemplate: string }
    }
    expect(action['query-input']).toBe('required name=search_term_string')
    expect(action.target.urlTemplate).toContain('{search_term_string}')
  })

  it('points the search template at the param /search actually reads', () => {
    const action = website()?.potentialAction as {
      target: { urlTemplate: string }
    }
    expect(action.target.urlTemplate).toContain(
      '/search?search={search_term_string}',
    )
  })
})

describe('groupEventSchema', () => {
  const offlineGroup = {
    name: 'Контакт (г. Хельсинки)',
    description: '<p>Группа <strong>АА</strong> в Хельсинки.</p>',
    presence: 'Офлайн',
    address: 'Kastelholmantie 1, 00900 Helsinki, Finland',
    digital_address: 'https://maps.app.goo.gl/x',
    time_zone: 'Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)',
    schedule_slots: [
      { day: 'Пятница', time: '18:30:00' },
      { day: 'Вторник', time: '18:30:00' },
    ],
  }

  it('describes the weekly slots as Schedule nodes', () => {
    const schema = groupEventSchema(offlineGroup, '/groups/kontakt')
    expect(schema.eventSchedule).toEqual([
      {
        '@type': 'Schedule',
        byDay: 'https://schema.org/Friday',
        startTime: '18:30',
        scheduleTimezone: 'Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)',
        repeatFrequency: 'P1W',
      },
      {
        '@type': 'Schedule',
        byDay: 'https://schema.org/Tuesday',
        startTime: '18:30',
        scheduleTimezone: 'Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)',
        repeatFrequency: 'P1W',
      },
    ])
  })

  it('publishes the CMS time-zone label as stored', () => {
    // The label is a city list with an offset range, not the IANA name
    // schema.org asks for. It ships unprocessed so the markup agrees with what
    // the page displays.
    const schema = groupEventSchema(offlineGroup, '/groups/kontakt')
    const [first] = schema.eventSchedule as Record<string, unknown>[]
    expect(first.scheduleTimezone).toBe(offlineGroup.time_zone)
  })

  it('omits the timezone when the CMS field is empty', () => {
    const schema = groupEventSchema(
      { ...offlineGroup, time_zone: null },
      '/groups/kontakt',
    )
    const [first] = schema.eventSchedule as Record<string, unknown>[]
    expect(first).not.toHaveProperty('scheduleTimezone')
    expect(first.byDay).toBe('https://schema.org/Friday')
  })

  it('drops a slot whose day is not a recognised weekday', () => {
    const schema = groupEventSchema(
      {
        ...offlineGroup,
        schedule_slots: [{ day: 'Каждый день', time: '10:00:00' }],
      },
      '/groups/x',
    )
    expect(schema).not.toHaveProperty('eventSchedule')
  })

  it('gives an offline group a Place with its address and map link', () => {
    const schema = groupEventSchema(offlineGroup, '/groups/kontakt')
    expect(schema.location).toEqual({
      '@type': 'Place',
      name: 'Контакт (г. Хельсинки)',
      address: 'Kastelholmantie 1, 00900 Helsinki, Finland',
      hasMap: 'https://maps.app.goo.gl/x',
    })
    expect(schema.eventAttendanceMode).toBe(
      'https://schema.org/OfflineEventAttendanceMode',
    )
  })

  it('gives an online group a VirtualLocation, falling back to its website', () => {
    const schema = groupEventSchema(
      {
        name: 'Онлайн группа',
        presence: 'Онлайн',
        website: 'https://example.org/zoom',
      },
      '/groups/online',
    )
    expect(schema.location).toEqual({
      '@type': 'VirtualLocation',
      url: 'https://example.org/zoom',
    })
    expect(schema.eventAttendanceMode).toBe(
      'https://schema.org/OnlineEventAttendanceMode',
    )
  })

  it('gives a hybrid group both locations', () => {
    const schema = groupEventSchema(
      { ...offlineGroup, presence: 'Гибрид' },
      '/groups/hybrid',
    )
    expect(schema.location).toHaveLength(2)
    expect(schema.eventAttendanceMode).toBe(
      'https://schema.org/MixedEventAttendanceMode',
    )
  })

  it('flattens the rich-text description', () => {
    const schema = groupEventSchema(offlineGroup, '/groups/kontakt')
    expect(schema.description).toBe('Группа АА в Хельсинки.')
  })

  it('does not name the Assembly as organizer of an autonomous group', () => {
    // Tradition 4: each group is autonomous, so the Assembly does not convene
    // its meetings and must not claim to.
    expect(groupEventSchema(offlineGroup, '/groups/x')).not.toHaveProperty(
      'organizer',
    )
  })

  it('resolves the page path to an absolute url', () => {
    const schema = groupEventSchema(offlineGroup, '/groups/kontakt')
    expect(schema.url).toMatch(/^https?:\/\/.+\/groups\/kontakt$/)
  })
})

describe('articleSchema', () => {
  it('carries the publication dates and credits the organisation', () => {
    const schema = articleSchema(
      {
        title: 'Новость',
        perex: 'Кратко',
        date_created: '2026-01-01T00:00:00Z',
        date_updated: '2026-02-01T00:00:00Z',
      },
      '/news-and-events/novost',
      'https://cms.example/assets/img',
    )
    expect(schema).toMatchObject({
      '@type': 'Article',
      headline: 'Новость',
      description: 'Кратко',
      datePublished: '2026-01-01T00:00:00Z',
      dateModified: '2026-02-01T00:00:00Z',
      image: 'https://cms.example/assets/img',
      publisher: { '@id': ORGANIZATION_ID },
    })
  })

  it('falls back to the creation date when an article was never edited', () => {
    const schema = articleSchema(
      { title: 'Новость', date_created: '2026-01-01T00:00:00Z' },
      '/news-and-events/novost',
    )
    expect(schema.dateModified).toBe('2026-01-01T00:00:00Z')
    expect(schema).not.toHaveProperty('image')
  })
})

describe('faqSchema', () => {
  it('turns the CMS repeater into questions with plain-text answers', () => {
    const schema = faqSchema([
      { title: 'Вопрос?', text: '<p>Ответ &mdash; вот такой.</p>' },
    ])
    expect(schema?.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'Вопрос?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ответ — вот такой.' },
      },
    ])
  })

  it('skips incomplete entries and emits nothing when none remain', () => {
    expect(
      faqSchema([{ title: 'Вопрос?' }, { text: '<p>Ответ</p>' }]),
    ).toBeUndefined()
    expect(faqSchema([])).toBeUndefined()
  })
})

describe('breadcrumbSchema', () => {
  it('numbers the trail from one and resolves absolute items', () => {
    const schema = breadcrumbSchema([
      { name: 'Главная', path: '/' },
      { name: 'Группы АА', path: '/groups' },
    ])
    const items = schema.itemListElement as Record<string, unknown>[]
    expect(items.map((i) => i.position)).toEqual([1, 2])
    expect(items[1].item).toMatch(/\/groups$/)
  })
})
