import React from 'react'
import { Button } from '@/components/ui/button'

interface FlightSectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  actionLabel?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  eyebrowClassName?: string
}

const FlightSectionHeader = ({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  eyebrowClassName = '',
}: FlightSectionHeaderProps) => {
  return (
    <div className={`flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-4xl">
        {eyebrow ? (
          <p className={`text-sm md:text-base font-semibold uppercase tracking-wider text-theme ${eyebrowClassName}`}>{eyebrow}</p>
        ) : null}
        <h2 className={`mt-1 text-2xl font-extrabold tracking-tight text-primary sm:text-[28px] md:text-[32px] ${titleClassName}`}>
          {title}
        </h2>
        {subtitle ? (
          <p className={`mt-1 max-w-4xl text-sm leading-6 text-tertiary  md:text-base ${subtitleClassName}`}>
            {subtitle}
          </p>
        ) : null}
      </div>

      {actionLabel ? (
        <Button
          type="button"
          className="h-11 w-full rounded-sm border border-theme bg-white px-8 text-base font-semibold text-theme shadow-none transition-colors hover:bg-theme hover:text-white sm:w-auto md:min-w-48"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

export default FlightSectionHeader