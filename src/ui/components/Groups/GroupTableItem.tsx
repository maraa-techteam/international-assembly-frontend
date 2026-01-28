import { transliterate } from '@/lib/utils/transliterate'
import { Typography } from '@/ui/components'

import GroupSchedule from './GroupSchedule'

export type TimeZones =
  | 'Европа/Лондон (UTC+0/+1)'
  | 'Европа/Берлин, Париж, Мадрид, Рим, Амстердам, Осло, Стокгольм, Копенгаген, Варшава, Прага, Вена, Будапешт (UTC+1/+2)'
  | 'Европа/Афины, Бухарест, Хельсинки (UTC+2/+3)'
  | 'Европа/Стамбул (UTC+3)'
  | 'Америка/Нью-Йорк, Торонто (UTC-5/-4)'
  | 'Америка/Чикаго (UTC-6/-5)'
  | 'Америка/Денвер (UTC-7/-6)'
  | 'Америка/Лос-Анджелес, Ванкувер (UTC-8/-7)'
  | 'Америка/Анкоридж (UTC-9/-8)'
  | 'Тихий океан/Гонолулу (UTC-10)'
  | 'Америка/Мехико, Гватемала, Коста-Рика (UTC-6/-5)'
  | 'Америка/Панама (UTC-5)'
  | 'Америка/Богота, Лима (UTC-5)'
  | 'Америка/Сантьяго (UTC-4/-3)'
  | 'Америка/Буэнос-Айрес, Сан-Паулу (UTC-3)'
  | 'Америка/Гавана, Порт-о-Пренс (UTC-5/-4)'
  | 'Америка/Санто-Доминго (UTC-4)'
  | 'Азия/Иерусалим (UTC+2/+3)'
  | 'Азия/Эр-Рияд, Багдад (UTC+3)'
  | 'Азия/Тегеран (UTC+3:30/+4:30)'
  | 'Азия/Дубай (UTC+4)'
  | 'Азия/Карачи (UTC+5)'
  | 'Азия/Дели, Калькутта (UTC+5:30)'
  | 'Азия/Катманду (UTC+5:45)'
  | 'Азия/Дакка (UTC+6)'
  | 'Азия/Бангкок, Джакарта, Хошимин (UTC+7)'
  | 'Азия/Сингапур, Манила, Гонконг, Шанхай, Тайбэй (UTC+8)'
  | 'Азия/Сеул, Токио (UTC+9)'
  | 'Африка/Касабланка (UTC+0/+1)'
  | 'Африка/Лагос (UTC+1)'
  | 'Африка/Каир, Йоханнесбург (UTC+2)'
  | 'Африка/Найроби (UTC+3)'
  | 'Австралия/Перт (UTC+8)'
  | 'Австралия/Аделаида (UTC+9:30/+10:30)'
  | 'Австралия/Сидней (UTC+10/+11)'
  | 'Тихий океан/Окленд, Фиджи (UTC+12/+13)'
  | 'Атлантика/Азорские острова (UTC-1/0)'
  | 'Атлантика/Рейкьявик (UTC+0)'

export type GroupType = {
  name: string
  description: string
  country: string
  presence: string
  digital_address: string
  address: string
  website: string
  youtube: string
  telegram: string
  contact: { name: string; phone: string; email: string }[]
  schedule_slots: { day: string; time: string }[]
  time_zone: TimeZones
}

type GroupTableItemProps = GroupType

export default function GroupTableItem({
  group,
}: {
  group: GroupTableItemProps
}) {
  const slug = transliterate(group.name).toLowerCase().replace(/\s+/g, '-')
  return (
    <a
      href={`/groups/${slug}`}
      className='hover:bg-light-blue flex cursor-pointer flex-col divide-y divide-gray-300'
    >
      <div className='over:bg-light-blue grid grid-cols-[1fr_0.5fr_0.5fr_1.5fr] gap-4 px-4'>
        <Typography variant='body' className='truncate py-4'>
          {group.name}
        </Typography>
        <Typography variant='body' className='truncate py-4'>
          {group.country}
        </Typography>
        <Typography variant='body' className='truncate py-4'>
          {group.presence}
        </Typography>
        <GroupSchedule
          schedule={group.schedule_slots}
          time_zone={group.time_zone}
        />
      </div>
    </a>
  )
}
