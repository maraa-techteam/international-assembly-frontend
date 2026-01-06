import { Grid, Typography } from '@/ui/components'

export default function GroupsTable() {
  return (
    <div className='overflow-x-auto px-4 lg:px-0'>
      <div
        className={
          'border-primary flex min-w-300 flex-col overflow-hidden rounded-2xl border-2 lg:min-w-full'
        }
      >
        <div className='bg-primary grid grid-cols-[1fr_0.5fr_0.5fr_1.5fr] gap-4 px-4'>
          <Typography className='py-4' variant='caption'>
            Название группы
          </Typography>
          <Typography className='py-4' variant='caption'>
            Страна
          </Typography>
          <Typography className='py-4' variant='caption'>
            Присутствие
          </Typography>
          <Typography className='py-4' variant='caption'>
            Расписание
          </Typography>
        </div>
        <div className='flex flex-col divide-y divide-gray-300'>
          <div className='over:bg-light-blue grid grid-cols-[1fr_0.5fr_0.5fr_1.5fr] gap-4 px-4'>
            <Typography variant='body' className='truncate py-4'>
              International Assembly Group International Assembly Group
              International Assembly Group
            </Typography>
            <Typography variant='body' className='truncate py-4'>
              Болгария
            </Typography>
            <Typography variant='body' className='truncate py-4'>
              Онлайн
            </Typography>
            <div className='flex flex-col justify-center'>
              <div className='grid grid-cols-7'>
                <div className='flex flex-col items-center justify-center'>
                  <Typography variant='caption' className='text-xs'>
                    Пн
                  </Typography>
                  <Typography variant='caption' className='text-xs'>
                    19:00
                  </Typography>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Typography variant='caption' className='text-xs'>
                    Вт
                  </Typography>
                  <Typography variant='caption' className='text-xs'>
                    19:00
                  </Typography>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Typography variant='caption' className='text-xs'>
                    Ср
                  </Typography>
                  <Typography variant='caption' className='text-xs'>
                    19:00
                  </Typography>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Typography variant='caption' className='text-xs'>
                    Чт
                  </Typography>
                  {/* <Typography variant='caption' className='text-xs'>
                    19:00
                  </Typography> */}
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Typography variant='caption' className='text-xs'>
                    Пт
                  </Typography>
                  <Typography variant='caption' className='text-xs'>
                    19:00
                  </Typography>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Typography variant='caption' className='text-xs'>
                    Сб
                  </Typography>
                  {/* <Typography variant='caption' className='text-xs'>
                    19:00
                  </Typography> */}
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Typography variant='caption' className='text-xs'>
                    Вс
                  </Typography>
                  <Typography variant='caption' className='text-xs'>
                    19:00
                  </Typography>
                </div>
              </div>
              <Typography variant='caption' className='self-end text-xs'>
                Местное время
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
