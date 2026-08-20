'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Download, PenLine, RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type Analysis,
  type RiskLevel,
  RISK_META,
} from '@/lib/contracts'
import { RiskScore } from '@/components/risk-score'
import { ClauseCard } from '@/components/clause-card'

const FILTERS: { key: RiskLevel | 'all'; label: string }[] = [
  { key: 'all', label: 'All clauses' },
  { key: 'high', label: 'High risk' },
  { key: 'medium', label: 'Medium risk' },
  { key: 'low', label: 'Low risk' },
]

export function AnalysisReport({
  analysis,
  onReset,
}: {
  analysis: Analysis
  onReset: () => void
}) {
  const [eli18, setEli18] = useState(false)
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all')

  const counts = useMemo(() => {
    return analysis.clauses.reduce(
      (acc, c) => {
        acc[c.level] += 1
        return acc
      },
      { high: 0, medium: 0, low: 0 } as Record<RiskLevel, number>,
    )
  }, [analysis.clauses])

  const visible =
    filter === 'all'
      ? analysis.clauses
      : analysis.clauses.filter((c) => c.level === filter)

  return (
    <div className="space-y-8">
      {/* Summary header */}
      <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:grid-cols-[auto_1fr] md:p-8">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-secondary/60 p-6">
          <RiskScore score={analysis.score} />
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {analysis.contractType}
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {analysis.fileName}
              </h1>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <RotateCcw className="size-3.5" />
              New analysis
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(['high', 'medium', 'low'] as RiskLevel[]).map((lvl) => (
              <span
                key={lvl}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
                  RISK_META[lvl].soft,
                )}
              >
                <span className="font-mono font-bold">{counts[lvl]}</span>
                {RISK_META[lvl].label}
              </span>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="size-4 text-primary" />
              Plain-English summary
            </div>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {analysis.summary}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
            >
              <Download className="size-4" />
              Export PDF
            </button>
            <Link
              href="/negotiate"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:translate-y-px"
            >
              <PenLine className="size-4" />
              Generate negotiation letter
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                filter === f.key
                  ? 'bg-foreground text-background'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground">
          <span>ELI18 mode</span>
          <button
            type="button"
            role="switch"
            aria-checked={eli18}
            onClick={() => setEli18((v) => !v)}
            className={cn(
              'relative h-5 w-9 rounded-full transition-colors',
              eli18 ? 'bg-primary' : 'bg-border',
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 size-4 rounded-full bg-background shadow transition-transform',
                eli18 ? 'translate-x-4' : 'translate-x-0.5',
              )}
            />
          </button>
        </label>
      </div>

      {/* Clauses */}
      <div className="space-y-4">
        {visible.map((c) => (
          <ClauseCard key={c.id} clause={c} eli18={eli18} />
        ))}
      </div>
    </div>
  )
}
