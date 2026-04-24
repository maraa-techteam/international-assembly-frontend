import { Icon, Typography } from '@/common/components'
import Link from 'next/link'

import { ServiceType } from '../../types/Service.type'
import { ServiceLabels } from '../ServiceLabels/ServiceLabels'

type ServiceCardProps = Pick<
  ServiceType,
  'slug' | 'name' | 'category' | 'engagement' | 'required_sobriety_time'
>

export function ServiceCard({
  slug,
  name,
  category,
  engagement,
  required_sobriety_time,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className='bg-light-blue hover:bg-light-blue/80 flex w-full flex-col gap-4 rounded-2xl p-4 transition-colors lg:p-6'
    >
      <Typography variant='h3' font='roboto'>
        {name}
      </Typography>
      <div className='flex items-end justify-between'>
        <ServiceLabels
          service={{
            category,
            engagement,
            required_sobriety_time,
          }}
        />
        <Icon icon='arrow-right' className='text-primary' />
      </div>
    </Link>
  )
}
