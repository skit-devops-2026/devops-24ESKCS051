import { cn } from '@/lib/utils'
import { RISK_META, riskLevelFromScore } from '@/lib/contracts'

export function RiskScore({
  score,
  size = 'lg',
  className,
}: {
  score: number
  size?: 'sm' | 'lg'
  className?: string
}) {
  const level = riskLevelFromScore(score)
  const meta = RISK_META[level]
  const r = size === 'lg' ? 84 : 30
  const stroke = size === 'lg' ? 12 : 6
  const box = (r + stroke) * 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (score / 100) * circumference

  const color =
    level === 'high'
      ? 'var(--risk-high)'
      : level === 'medium'
        ? 'var(--risk-medium)'
        : 'var(--risk-low)'

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={box / 2}
          cy={box / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-border"
        />
        <circle
          cx={box / 2}
          cy={box / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            'font-mono font-bold leading-none',
            size === 'lg' ? 'text-5xl' : 'text-lg',
          )}
        >
          {score}
        </span>
        {size === 'lg' && (
          <span className={cn('mt-1 text-xs font-semibold uppercase tracking-wide', meta.text)}>
            {meta.label}
          </span>
        )}
      </div>
    </div>
  )
}
