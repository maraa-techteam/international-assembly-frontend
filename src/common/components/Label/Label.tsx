import { cn } from '@/common/utils/cn'

import { LabelType } from './Label.type'

type LabelPropsType = LabelType & { className?: string }

export function Label({ text, className }: LabelPropsType) {
  return (
    <span
      className={cn(
        'border-primary text-primary font-roboto inline-flex w-fit cursor-pointer items-center justify-center rounded-full border bg-transparent px-6 py-2 text-nowrap transition-colors',
        className,
      )}
    >
      {text}
    </span>
  )
}
