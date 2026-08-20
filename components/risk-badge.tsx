import { cn } from '@/lib/utils'
import { RISK_META, type RiskLevel } from '@/lib/contracts'

export function RiskBadge({
  level,
  className,
}: {
  level: RiskLevel
  className?: string
}) {
  const meta = RISK_META[level]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide',
        meta.badge,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {meta.label}
    </span>
  )
}
