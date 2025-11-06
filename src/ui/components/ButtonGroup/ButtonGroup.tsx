import { cn } from '@/lib/utils/cn'
import { ButtonGroupProps } from '@/types/components'
import { Button } from '@/ui/components'

export function ButtonGroup({
  buttons,
  orientation,
  className,
  alignment = 'center',
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'flex w-full gap-4',
        orientation === 'horizontal' ? 'flex-col lg:flex-row' : 'flex-col',
        orientation === 'horizontal'
          ? alignment === 'start'
            ? 'justify-start'
            : alignment === 'center'
              ? 'justify-center'
              : 'justify-end'
          : alignment === 'start'
            ? 'items-start'
            : alignment === 'center'
              ? 'items-center'
              : 'items-end',
        className,
      )}
    >
      {buttons.map((button, i) => (
        <Button
          key={i}
          size={button.size}
          variant={button.variant}
          as={button.as}
          href={button.href}
          className={button.className}
          color={button.color}
          label={button.label}
          type={'button'}
        />
      ))}
    </div>
  )
}
