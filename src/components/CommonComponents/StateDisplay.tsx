import type { LucideIcon } from 'lucide-react'

interface StateDisplayProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  loading?: boolean
}

export default function StateDisplay({ icon: Icon, title, subtitle, loading = false }: StateDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      {loading ? (
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-muted border-t-theme animate-spin" />
          <Icon className="absolute inset-0 m-auto w-7 h-7 text-theme" />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Icon className="w-8 h-8 text-secondary" />
        </div>
      )}
      <p className="text-base font-semibold text-foreground">{title}</p>
      {subtitle && (
        <p className="text-sm text-secondary text-center max-w-xs">{subtitle}</p>
      )}
    </div>
  )
}
