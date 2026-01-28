import { fetchGroup } from '@/lib/api/fetchGroup'
import { cn } from '@/lib/utils/cn'
import {
  Grid,
  Icon,
  LinkComponent,
  RichTextPreview,
  Section,
  Typography,
} from '@/ui/components'
import GroupSchedule from '@/ui/components/Groups/GroupSchedule'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchGroup(slug)
  return {
    title: article?.title,
    description: article?.perex,
  }
}

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const group = await fetchGroup(slug)

  return (
    <Section color={'white'} className='w-full lg:max-w-200'>
      <LinkComponent
        href='/groups'
        icon='arrow-left'
        text={'Назад'}
        color='foreground'
        className='self-start'
        variant={'icon-left'}
      />
      <Typography variant='h1'>{group?.name}</Typography>
      <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
        <Typography className='font-bold' variant='h3'>
          Описание группы
        </Typography>
        <RichTextPreview
          htmlContent={group?.description || 'Описание группы не найдено'}
        />
      </div>
      <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
        <Typography className='font-bold' variant='h3'>
          Место проведения
        </Typography>
        {group?.address && (
          <Typography variant='body'>{group?.address}</Typography>
        )}
        {group?.digital_address && (
          <Typography variant='body'>{group?.digital_address}</Typography>
        )}
      </div>
      <Grid>
        <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
          <Typography className='font-bold' variant='h3'>
            Расписание группы
          </Typography>
          <GroupSchedule
            schedule={group?.schedule_slots || []}
            time_zone={group?.time_zone || 'Часовой пояс не указан'}
          />
        </div>
        <div className='divide-primary border-primary flex flex-col gap-4 divide-y rounded-xl border-1 p-4'>
          {group?.contact.map(
            (contactItem: { name: string; phone: string }, index: number) => {
              return (
                <div
                  key={contactItem.name}
                  className={cn(
                    'flex flex-col gap-4 pb-4',
                    index === group.contact.length - 1 && 'pb-0',
                  )}
                >
                  <div className='flex flex-row gap-4'>
                    <Icon icon={'person'} />
                    <Typography variant='body'>{contactItem.name}</Typography>
                  </div>
                  <div className='flex flex-row gap-4'>
                    <Icon icon={'phone'} />
                    <Typography variant='body'>{contactItem.phone}</Typography>
                  </div>
                </div>
              )
            },
          )}
        </div>
      </Grid>
      {(group?.website || group?.youtube || group?.telegram) && (
        <div className='border-primary flex flex-col items-start gap-4 rounded-xl border-1 p-4'>
          <Typography className='font-bold' variant='h3'>
            Дополнительная информация
          </Typography>
          {group?.website && (
            <LinkComponent
              href={group?.website}
              text='Веб-сайт'
              icon='website'
              color='primary'
              variant='icon-left'
            />
          )}
          {group?.youtube && (
            <LinkComponent
              href='https://www.youtube.com/@internationalassembly'
              text='Youtube'
              icon='youtube'
              color='primary'
              variant='icon-left'
            />
          )}
          {group?.telegram && (
            <LinkComponent
              href='https://www.telegram.me/ia_berlin'
              text='Telegram'
              icon='telegram'
              color='primary'
              variant='icon-left'
            />
          )}
        </div>
      )}
    </Section>
  )
}
