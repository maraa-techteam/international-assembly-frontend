import {
  Icon,
  LinkComponent,
  RichTextPreview,
  Typography,
} from '@/common/components'
import { Grid, Section } from '@/common/layouts'
import { cn } from '@/common/utils/cn'
import { GroupSchedule, fetchGroup } from '@/features/groups'
import { Metadata } from 'next'
import Link from 'next/dist/client/link'

import { Gallery } from '../components/Gallery/Gallery'

export default async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const group = await fetchGroup(slug)
  return {
    title: group?.name,
    description: group?.description,
  }
}

export async function GroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const group = await fetchGroup(slug)

  return (
    <Section color='white' className='w-full lg:max-w-200'>
      <LinkComponent
        href='/groups'
        icon='arrow-left'
        text='Назад'
        color='foreground'
        className='self-start'
        variant='icon-left'
      />
      <Typography variant='h1'>{group?.name}</Typography>
      <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
        <Typography className='text-sm font-bold' variant='h2'>
          Описание группы
        </Typography>
        <RichTextPreview
          htmlContent={group?.description || 'Описание группы не найдено'}
        />
      </div>
      <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
        <Typography className='text-sm font-bold' variant='h2'>
          Место проведения
        </Typography>
        {group?.address && (
          <Typography variant='body'>{group?.address}</Typography>
        )}
        {group?.digital_address && (
          <Link
            href={group?.digital_address}
            target='_blank'
            className='text-primary flex items-center gap-4 break-all underline'
          >
            {group?.digital_address}
          </Link>
        )}
      </div>
      <Grid>
        <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
          <Typography className='text-sm font-bold' variant='h2'>
            Расписание группы
          </Typography>
          <GroupSchedule
            schedule={group?.schedule_slots || []}
            time_zone={group?.time_zone || 'Часовой пояс не указан'}
          />
        </div>
        {group?.contact && group.contact.length > 0 && (
          <div className='divide-primary border-primary flex flex-col gap-4 divide-y rounded-xl border-1 p-4'>
            {group?.contact?.map(
              (contactItem: { name: string; phone: string }, index: number) => {
                return (
                  <div
                    key={contactItem.phone + '_' + contactItem.name}
                    className={cn(
                      'flex flex-col gap-4 pb-4',
                      index === group.contact.length - 1 && 'pb-0',
                    )}
                  >
                    <div className='flex flex-row gap-4'>
                      <Icon className='text-primary' icon='person' />
                      <Typography variant='body'>{contactItem.name}</Typography>
                    </div>
                    <div className='flex flex-row gap-4'>
                      <Icon className='text-primary' icon='phone' />
                      <Typography variant='body'>
                        {contactItem.phone}
                      </Typography>
                    </div>
                  </div>
                )
              },
            )}
          </div>
        )}
      </Grid>
      {(group?.website || group?.youtube || group?.telegram) && (
        <div className='border-primary flex flex-col items-start gap-4 rounded-xl border-1 p-4'>
          <Typography className='text-[20px] font-bold' variant='h2'>
            Дополнительная информация
          </Typography>
          {group?.website && (
            <Link
              href={group?.website}
              target='_blank'
              className='text-primary flex items-center gap-4 break-all'
            >
              <Icon icon='website' />
              Веб-сайт
            </Link>
          )}
          {group?.youtube && (
            <Link
              href={group?.youtube}
              target='_blank'
              className='text-primary flex items-center gap-4 break-all'
            >
              <Icon icon='youtube' />
              YouTube
            </Link>
          )}
          {group?.telegram && (
            <Link
              href={group?.telegram}
              target='_blank'
              className='text-primary flex items-center gap-4 break-all'
            >
              <Icon icon='telegram' />
              Telegram
            </Link>
          )}
        </div>
      )}
      {group?.images && group.images.length > 0 && (
        <Gallery images={group.images} />
      )}
    </Section>
  )
}
