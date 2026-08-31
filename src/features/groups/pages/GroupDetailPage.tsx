import { BackButton } from '@/common/components/BackButton/BackButton'
import { Grid } from '@/common/components/Grid/Grid'
import { Icon } from '@/common/components/Icon/Icon'
import { JsonLd } from '@/common/components/JsonLd/JsonLd'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import { breadcrumbSchema, groupEventSchema } from '@/config/schema'
import { fetchGroup } from '@/features/groups/api/fetchGroup'
import { Gallery } from '@/features/groups/components/Gallery/Gallery'
import { GroupSchedule } from '@/features/groups/components/GroupSchedule/GroupSchedule'
import type { GroupContact } from '@/features/groups/types/Group.type'
import Link from 'next/link'

export async function GroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const group = await fetchGroup(slug)
  const path = `/groups/${slug}`

  return (
    <Section color='white' className='w-full lg:max-w-200'>
      {group && (
        <>
          <JsonLd schema={groupEventSchema(group, path)} />
          <JsonLd
            schema={breadcrumbSchema([
              { name: 'Главная', path: '/' },
              { name: 'Группы АА', path: '/groups' },
              { name: group.name as string, path },
            ])}
          />
        </>
      )}
      <BackButton className='self-start' />
      <Typography variant='h1'>{group?.name}</Typography>
      <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
        <Typography className='font-bold lg:text-[16px]' variant='h2'>
          Описание группы
        </Typography>
        <RichTextPreview
          htmlContent={group?.description || 'Описание группы не найдено'}
        />
      </div>
      <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
        <Typography className='font-bold lg:text-[16px]' variant='h2'>
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
          <Typography className='font-bold lg:text-[16px]' variant='h2'>
            Расписание группы
          </Typography>
          <GroupSchedule
            schedule={group?.schedule_slots || []}
            time_zone={group?.time_zone || 'Часовой пояс не указан'}
          />
        </div>
        {group?.contact && group.contact.length > 0 && (
          <div className='border-primary flex flex-col gap-4 rounded-xl border-1 p-4'>
            <Typography className='font-bold lg:text-[16px]' variant='h2'>
              Контакты
            </Typography>
            <div className='divide-primary divide-y'>
              {group?.contact?.map(
                (contactItem: GroupContact, index: number) => {
                  return (
                    <div
                      key={contactItem.phone + '_' + contactItem.name}
                      className={cn(
                        'flex flex-col gap-4 pb-4',
                        index > 0 && 'mt-4',
                        index === group.contact.length - 1 && 'pb-0',
                      )}
                    >
                      <div className='flex flex-row gap-4'>
                        <Icon className='text-primary' icon='person' />
                        <Typography variant='body'>
                          {contactItem.name}
                        </Typography>
                      </div>
                      {contactItem.phone && (
                        <div className='flex flex-row gap-4'>
                          <Icon className='text-primary' icon='phone' />
                          <Typography variant='body'>
                            {contactItem.phone}
                          </Typography>
                        </div>
                      )}
                      {contactItem.email && (
                        <Link
                          href={`mailto:${contactItem.email}`}
                          className='text-primary flex flex-row gap-4 break-all'
                        >
                          <Icon className='text-primary' icon='email' />
                          <Typography variant='body'>
                            {contactItem.email}
                          </Typography>
                        </Link>
                      )}
                      {contactItem.telegram && (
                        <div className='flex flex-row gap-4'>
                          <Icon className='text-primary' icon='telegram' />
                          <Typography variant='body'>
                            {contactItem.telegram}
                          </Typography>
                        </div>
                      )}
                    </div>
                  )
                },
              )}
            </div>
          </div>
        )}
      </Grid>
      {(group?.website ||
        group?.youtube ||
        group?.telegram ||
        group?.whatsapp) && (
        <div className='border-primary flex flex-col items-start gap-4 rounded-xl border-1 p-4'>
          <Typography className='font-bold lg:text-[16px]' variant='h2'>
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
          {group?.whatsapp && (
            <Link
              href={group?.whatsapp}
              target='_blank'
              className='text-primary flex items-center gap-4 break-all'
            >
              <Icon icon='whatsapp' />
              WhatsApp
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
