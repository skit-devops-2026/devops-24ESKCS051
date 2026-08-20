'use client'

import { useState } from 'react'
import { ChevronDown, AlertOctagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RISK_META, type Clause } from '@/lib/contracts'
import { RiskBadge } from '@/components/risk-badge'

export function ClauseCard({
  clause,
  eli18,
}: {
  clause: Clause
  eli18: boolean
}) {
  const [open, setOpen] = useState(false)
  const meta = RISK_META[clause.level]

  return (
    <div className="flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <span className={cn('w-1.5 shrink-0', meta.bar)} aria-hidden="true" />
      <div className="min-w-0 flex-1 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {clause.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              {clause.title}
            </h3>
          </div>
          <RiskBadge level={clause.level} />
        </div>

        <p className="mt-3 leading-relaxed text-muted-foreground">
          {eli18 ? clause.eli18 : clause.summary}
        </p>

        {clause.penalty && (
          <div className={cn('mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium', meta.soft)}>
            <AlertOctagon className="size-4" />
            {clause.penalty}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:brightness-90"
          aria-expanded={open}
        >
          {open ? 'Hide original clause' : 'View original clause'}
          <ChevronDown
            className={cn('size-4 transition-transform', open && 'rotate-180')}
          />
        </button>

        {open && (
          <blockquote className="mt-3 rounded-xl border border-border bg-secondary/50 p-4 font-mono text-sm leading-relaxed text-foreground/80">
            {clause.original}
          </blockquote>
        )}
      </div>
    </div>
  )
}
