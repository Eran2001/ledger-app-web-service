
import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  id,
  label,
  className,
  containerClassName,
  labelClassName,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  label?: React.ReactNode
  containerClassName?: string
  labelClassName?: string
}) {
  const generatedId = React.useId()
  const radioId = id ?? generatedId

  const radioControl = (
    <RadioGroupPrimitive.Item
      id={radioId}
      data-slot="radio-group-item"
      className={cn(
        'shrink-0 border-stroke cursor-pointer',
        'full-rounded radio-group-item',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="radio-group-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )

  if (!label) {
    return radioControl
  }

  return (
    <label
      htmlFor={radioId}
      className={cn('flex items-center gap-3 cursor-pointer', containerClassName)}
    >
      {radioControl}
      <span className={cn('t-label-md-bold text-main', labelClassName)}>
        {label}
      </span>
    </label>
  )
}

export { RadioGroup, RadioGroupItem }
