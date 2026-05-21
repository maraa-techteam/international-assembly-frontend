import { Icon } from '@/common/components/Icon/Icon'
import { cn } from '@/common/utils/cn'

import { LabelType } from './Label.type'

type LabelPropsType = LabelType & { className?: string }

export function Label({ icon, text, className }: LabelPropsType) {
  return (
    <span
      className={cn(
        'border-primary text-primary inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full border bg-transparent px-4 py-2 text-nowrap transition-colors',
        className,
      )}
    >
      {icon && <Icon icon={icon} />}

      {text}
    </span>
  )
}
