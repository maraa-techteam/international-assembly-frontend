import { toIanaTimeZone } from './toIanaTimeZone'

describe('toIanaTimeZone', () => {
  it('resolves a label whose first city is known', () => {
    expect(toIanaTimeZone('Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)')).toBe(
      'Europe/Athens',
    )
  })

  it('resolves a single-city label', () => {
    expect(toIanaTimeZone('Европа/Стамбул (UTC+3)')).toBe('Europe/Istanbul')
  })

  it('resolves a label the TimeZones union does not declare', () => {
    // The CMS holds this reworded variant on 44 of the 102 groups.
    expect(toIanaTimeZone('Европа/Париж, Прага, Будапешт (UTC+1/+2)')).toBe(
      'Europe/Paris',
    )
  })

  it('falls through to a later city when the first is unknown', () => {
    expect(toIanaTimeZone('Европа/Ниоткуда, Прага (UTC+1/+2)')).toBe(
      'Europe/Prague',
    )
  })

  it('handles a region containing a space', () => {
    expect(toIanaTimeZone('Тихий океан/Гонолулу (UTC-10)')).toBe(
      'Pacific/Honolulu',
    )
  })

  it('handles a multi-word city', () => {
    expect(toIanaTimeZone('Атлантика/Азорские острова (UTC-1/0)')).toBe(
      'Atlantic/Azores',
    )
  })

  it('returns undefined rather than guessing at an unknown label', () => {
    expect(toIanaTimeZone('Часовой пояс не указан')).toBeUndefined()
    expect(toIanaTimeZone('')).toBeUndefined()
    expect(toIanaTimeZone(null)).toBeUndefined()
  })

  it('resolves every zone the TimeZones union declares', () => {
    // Guards the map against a union entry that never got a city added.
    const unionLabels = [
      'Европа/Лондон (UTC+0/+1)',
      'Европа/Берлин, Париж, Мадрид, Рим, Амстердам, Осло, Стокгольм, Копенгаген, Варшава, Прага, Вена, Будапешт (UTC+1/+2)',
      'Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)',
      'Европа/Стамбул (UTC+3)',
      'Америка/Нью-Йорк, Торонто (UTC-5/-4)',
      'Америка/Чикаго (UTC-6/-5)',
      'Америка/Денвер (UTC-7/-6)',
      'Америка/Лос-Анджелес, Ванкувер (UTC-8/-7)',
      'Америка/Анкоридж (UTC-9/-8)',
      'Тихий океан/Гонолулу (UTC-10)',
      'Америка/Мехико, Гватемала, Коста-Рика (UTC-6/-5)',
      'Америка/Панама (UTC-5)',
      'Америка/Богота, Лима (UTC-5)',
      'Америка/Сантьяго (UTC-4/-3)',
      'Америка/Буэнос-Айрес, Сан-Паулу (UTC-3)',
      'Америка/Гавана, Порт-о-Пренс (UTC-5/-4)',
      'Америка/Санто-Доминго (UTC-4)',
      'Азия/Иерусалим (UTC+2/+3)',
      'Азия/Эр-Рияд, Багдад (UTC+3)',
      'Азия/Тегеран (UTC+3:30/+4:30)',
      'Азия/Дубай (UTC+4)',
      'Азия/Карачи (UTC+5)',
      'Азия/Дели, Калькутта (UTC+5:30)',
      'Азия/Катманду (UTC+5:45)',
      'Азия/Дакка (UTC+6)',
      'Азия/Бангкок, Джакарта, Хошимин (UTC+7)',
      'Азия/Сингапур, Манила, Гонконг, Шанхай, Тайбэй (UTC+8)',
      'Азия/Сеул, Токио (UTC+9)',
      'Африка/Касабланка (UTC+0/+1)',
      'Африка/Лагос (UTC+1)',
      'Африка/Каир, Йоханнесбург (UTC+2)',
      'Африка/Найроби (UTC+3)',
      'Австралия/Перт (UTC+8)',
      'Австралия/Аделаида (UTC+9:30/+10:30)',
      'Австралия/Сидней (UTC+10/+11)',
      'Тихий океан/Окленд, Фиджи (UTC+12/+13)',
      'Атлантика/Азорские острова (UTC-1/0)',
      'Атлантика/Рейкьявик (UTC+0)',
    ]

    const unresolved = unionLabels.filter((label) => !toIanaTimeZone(label))
    expect(unresolved).toEqual([])
  })

  it('maps to zones the runtime actually recognises', () => {
    const zones = [
      'Европа/Лондон (UTC+0/+1)',
      'Америка/Буэнос-Айрес, Сан-Паулу (UTC-3)',
      'Атлантика/Азорские острова (UTC-1/0)',
      'Азия/Катманду (UTC+5:45)',
    ].map((label) => toIanaTimeZone(label) as string)

    for (const zone of zones) {
      expect(() =>
        new Intl.DateTimeFormat('ru', { timeZone: zone }).format(new Date()),
      ).not.toThrow()
    }
  })
})

describe('toIanaTimeZone with a country', () => {
  const euLabel = 'Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)'

  it('picks the country’s own city out of a multi-city label', () => {
    expect(toIanaTimeZone(euLabel, 'Финляндия')).toBe('Europe/Helsinki')
    expect(toIanaTimeZone(euLabel, 'Румыния')).toBe('Europe/Bucharest')
    expect(toIanaTimeZone(euLabel, 'Греция')).toBe('Europe/Athens')
  })

  it('does not override a label that omits the country’s city', () => {
    // Egypt sits at UTC+2/+3 but changes DST on different dates than the EU.
    // The page displays this EU label, so the markup stays consistent with it
    // rather than quietly switching to Africa/Cairo.
    expect(toIanaTimeZone(euLabel, 'Египет')).toBe('Europe/Athens')
  })

  it('falls back to the first known city for an unmapped country', () => {
    expect(toIanaTimeZone(euLabel, 'Международная')).toBe('Europe/Athens')
    expect(toIanaTimeZone(euLabel, undefined)).toBe('Europe/Athens')
  })

  it('resolves the busiest label to each country that uses it', () => {
    const label = 'Европа/Париж, Прага, Будапешт (UTC+1/+2)'
    expect(toIanaTimeZone(label, 'Чехия')).toBe('Europe/Prague')
    expect(toIanaTimeZone(label, 'Франция')).toBe('Europe/Paris')
    // Germany, Spain and Sweden are not named in this label; they keep Paris,
    // which shares their offset and EU-wide DST dates.
    expect(toIanaTimeZone(label, 'Германия')).toBe('Europe/Paris')
  })

  it('never returns a zone the runtime rejects', () => {
    const countries = [
      'Финляндия',
      'Румыния',
      'Чехия',
      'Франция',
      'Таиланд',
      'Турция',
    ]
    for (const country of countries) {
      const zone = toIanaTimeZone(
        'Европа/Афины, Бухарест, Хельсинки, Париж, Прага, Бангкок, Стамбул (UTC+2)',
        country,
      ) as string
      expect(() =>
        new Intl.DateTimeFormat('ru', { timeZone: zone }).format(new Date()),
      ).not.toThrow()
    }
  })
})
