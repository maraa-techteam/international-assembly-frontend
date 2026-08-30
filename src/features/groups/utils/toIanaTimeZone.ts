/**
 * IANA zone for each city the CMS time-zone labels mention.
 *
 * Cities sharing an offset still get their own zone: DST rules diverge inside a
 * single offset — Casablanca and London both sit at UTC+0 in winter but shift on
 * different dates — and a group's weekly time has to survive those transitions.
 */
const IANA_BY_CITY: Record<string, string> = {
  Лондон: 'Europe/London',
  Берлин: 'Europe/Berlin',
  Париж: 'Europe/Paris',
  Мадрид: 'Europe/Madrid',
  Рим: 'Europe/Rome',
  Амстердам: 'Europe/Amsterdam',
  Осло: 'Europe/Oslo',
  Стокгольм: 'Europe/Stockholm',
  Копенгаген: 'Europe/Copenhagen',
  Варшава: 'Europe/Warsaw',
  Прага: 'Europe/Prague',
  Вена: 'Europe/Vienna',
  Будапешт: 'Europe/Budapest',
  Афины: 'Europe/Athens',
  Бухарест: 'Europe/Bucharest',
  Хельсинки: 'Europe/Helsinki',
  Стамбул: 'Europe/Istanbul',
  'Нью-Йорк': 'America/New_York',
  Торонто: 'America/Toronto',
  Чикаго: 'America/Chicago',
  Денвер: 'America/Denver',
  'Лос-Анджелес': 'America/Los_Angeles',
  Ванкувер: 'America/Vancouver',
  Анкоридж: 'America/Anchorage',
  Гонолулу: 'Pacific/Honolulu',
  Мехико: 'America/Mexico_City',
  Гватемала: 'America/Guatemala',
  'Коста-Рика': 'America/Costa_Rica',
  Панама: 'America/Panama',
  Богота: 'America/Bogota',
  Лима: 'America/Lima',
  Сантьяго: 'America/Santiago',
  'Буэнос-Айрес': 'America/Argentina/Buenos_Aires',
  'Сан-Паулу': 'America/Sao_Paulo',
  Гавана: 'America/Havana',
  'Порт-о-Пренс': 'America/Port-au-Prince',
  'Санто-Доминго': 'America/Santo_Domingo',
  Иерусалим: 'Asia/Jerusalem',
  'Эр-Рияд': 'Asia/Riyadh',
  Багдад: 'Asia/Baghdad',
  Тегеран: 'Asia/Tehran',
  Дубай: 'Asia/Dubai',
  Карачи: 'Asia/Karachi',
  Дели: 'Asia/Kolkata',
  Калькутта: 'Asia/Kolkata',
  Катманду: 'Asia/Kathmandu',
  Дакка: 'Asia/Dhaka',
  Бангкок: 'Asia/Bangkok',
  Джакарта: 'Asia/Jakarta',
  Хошимин: 'Asia/Ho_Chi_Minh',
  Сингапур: 'Asia/Singapore',
  Манила: 'Asia/Manila',
  Гонконг: 'Asia/Hong_Kong',
  Шанхай: 'Asia/Shanghai',
  Тайбэй: 'Asia/Taipei',
  Сеул: 'Asia/Seoul',
  Токио: 'Asia/Tokyo',
  Касабланка: 'Africa/Casablanca',
  Лагос: 'Africa/Lagos',
  Каир: 'Africa/Cairo',
  Йоханнесбург: 'Africa/Johannesburg',
  Найроби: 'Africa/Nairobi',
  Перт: 'Australia/Perth',
  Аделаида: 'Australia/Adelaide',
  Сидней: 'Australia/Sydney',
  Окленд: 'Pacific/Auckland',
  Фиджи: 'Pacific/Fiji',
  'Азорские острова': 'Atlantic/Azores',
  Рейкьявик: 'Atlantic/Reykjavik',
}

/**
 * The city a country's groups belong to, for labels listing several.
 *
 * Only used to choose between cities the label already names — never to
 * override it. The label is what the page displays, and structured data that
 * contradicts the visible page is worse than data that is merely coarse. So a
 * Finnish group on the `Афины, Бухарест, Хельсинки` label resolves to Helsinki,
 * while an Egyptian group on that same label stays on Athens rather than
 * silently becoming Africa/Cairo, whose DST dates differ.
 */
const CITY_BY_COUNTRY: Record<string, string> = {
  Австрия: 'Вена',
  Бельгия: 'Париж',
  Болгария: 'Бухарест',
  Великобритания: 'Лондон',
  Венгрия: 'Будапешт',
  Вьетнам: 'Хошимин',
  Германия: 'Берлин',
  Греция: 'Афины',
  Дания: 'Копенгаген',
  Индонезия: 'Джакарта',
  Испания: 'Мадрид',
  Италия: 'Рим',
  Канада: 'Торонто',
  Нидерланды: 'Амстердам',
  Норвегия: 'Осло',
  Польша: 'Варшава',
  Румыния: 'Бухарест',
  Таиланд: 'Бангкок',
  Турция: 'Стамбул',
  Финляндия: 'Хельсинки',
  Франция: 'Париж',
  Чехия: 'Прага',
  Швеция: 'Стокгольм',
}

/**
 * Resolves a CMS time-zone label to an IANA zone name.
 *
 * The CMS stores the zone for display — a region, a list of cities and the
 * offset range, e.g. `Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)`. JSON-LD's
 * `scheduleTimezone` needs an IANA name instead, and the label's offset spans a
 * DST range (`+2/+3`), so it cannot stand in for one.
 *
 * Matching city by city rather than on the whole label keeps this working as
 * editors reword the lists: the CMS already holds labels the `TimeZones` union
 * never declared, such as `Европа/Париж, Прага, Будапешт (UTC+1/+2)`. An
 * unrecognised label returns undefined so callers omit the zone instead of
 * publishing a guess.
 *
 * Passing the group's `country` picks that country's city out of a label
 * listing several, so a Helsinki group reads as `Europe/Helsinki` rather than
 * as whichever city the editor happened to list first.
 */
export function toIanaTimeZone(
  label?: string | null,
  country?: string | null,
): string | undefined {
  if (!label) return undefined

  const cities = label
    .slice(label.indexOf('/') + 1)
    .split('(')[0]
    .split(',')
    .map((city) => city.trim())

  const preferred = country ? CITY_BY_COUNTRY[country.trim()] : undefined
  if (preferred && cities.includes(preferred)) {
    const zone = IANA_BY_CITY[preferred]
    if (zone) return zone
  }

  for (const city of cities) {
    const zone = IANA_BY_CITY[city]
    if (zone) return zone
  }

  return undefined
}
