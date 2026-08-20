'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { UploadZone } from '@/components/analyze/upload-zone'
import { AnalysisReport } from '@/components/analyze/analysis-report'
import { SAMPLE_ANALYSIS, type Analysis } from '@/lib/contracts'

export default function AnalyzePage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<Analysis | null>(null)

  const handleAnalyze = (fileName: string) => {
    setAnalyzing(true)
    setTimeout(() => {
      setResult({ ...SAMPLE_ANALYSIS, fileName })
      setAnalyzing(false)
    }, 1400)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-5 py-14 md:py-20">
          {!result ? (
            <>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Contract analysis
                </span>
                <h1 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Get your risk report in seconds
                </h1>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                  Upload a contract and Clarifai will score the risk, flag every
                  concerning clause, and explain it in plain English.
                </p>
              </div>
              <div className="mt-10">
                <UploadZone onAnalyze={handleAnalyze} analyzing={analyzing} />
              </div>
            </>
          ) : (
            <AnalysisReport analysis={result} onReset={() => setResult(null)} />
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
