import { Skeleton } from '@/components/ui/skeleton'

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/85 p-6">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/85">
      <div className="flex gap-6 border-b border-border p-5">
        {[28, 20, 16, 24].map((w) => (
          <Skeleton key={w} className="h-3" style={{ width: `${w}%` }} />
        ))}
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-6 border-b border-border p-5 last:border-0">
          <Skeleton className="h-4 w-[28%]" />
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-5 w-[16%] rounded-full" />
          <Skeleton className="h-4 w-[24%]" />
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  const bars = [40, 65, 50, 80, 55, 90, 70, 60, 85, 75, 95, 68]
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card/85 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>
      <div className="flex h-48 items-end gap-2">
        {bars.map((h, i) => (
          <Skeleton key={i} className="flex-1 rounded-md" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}
