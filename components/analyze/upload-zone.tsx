'use client'

import { useRef, useState } from 'react'
import { UploadCloud, FileText, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UploadZone({
  onAnalyze,
  analyzing,
}: {
  onAnalyze: (fileName: string) => void
  analyzing: boolean
}) {
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const pick = (name: string) => setFileName(name)

  return (
    <div className="mx-auto max-w-2xl">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const f = e.dataTransfer.files?.[0]
          if (f) pick(f.name)
        }}
        className={cn(
          'flex flex-col items-center rounded-3xl border-2 border-dashed bg-card px-6 py-14 text-center transition-colors',
          dragging ? 'border-primary bg-primary/5' : 'border-border',
        )}
      >
        <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UploadCloud className="size-8" />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-foreground">
          Upload your contract
        </h2>
        <p className="mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
          Drag and drop a PDF here, or browse your files. Your document is
          analyzed securely and never shared.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) pick(f.name)
          }}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
        >
          Browse files
        </button>
      </div>

      {fileName && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">{fileName}</p>
            <p className="text-sm text-muted-foreground">Ready to analyze</p>
          </div>
          <button
            type="button"
            disabled={analyzing}
            onClick={() => onAnalyze(fileName)}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:translate-y-px disabled:opacity-70"
          >
            {analyzing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              'Analyze contract'
            )}
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have a file handy?{' '}
        <button
          type="button"
          disabled={analyzing}
          onClick={() => onAnalyze('Master_Services_Agreement.pdf')}
          className="font-semibold text-primary underline-offset-4 hover:underline disabled:opacity-70"
        >
          Try the sample contract
        </button>
      </p>
    </div>
  )
}
