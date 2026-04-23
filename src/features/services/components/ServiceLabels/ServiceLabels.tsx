import { cn } from '@/common/utils/cn'
import { Label } from '@/ui'

import { ServiceType } from '../../types/Service.type'

type ServiceLabelsProps = {
  service: Pick<
    ServiceType,
    'category' | 'engagement' | 'required_sobriety_time'
  >
  className?: string
}

export function ServiceLabels({ service, className }: ServiceLabelsProps) {
  const labels = [
    ...service.category,
    ...service.engagement,
    ...(service.required_sobriety_time ? [service.required_sobriety_time] : []),
  ]

  if (labels.length === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {labels.map((label) => (
        <Label
          className='bg-white'
          key={label}
          icon={
            service.required_sobriety_time === label
              ? 'sobriety'
              : service.engagement.includes(label)
                ? 'clock'
                : service.category.includes(label)
                  ? 'service'
                  : undefined
          }
          text={label}
        />
      ))}
    </div>
  )
}
