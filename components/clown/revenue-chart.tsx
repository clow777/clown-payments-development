'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { formatCents } from '@/lib/money'

export type RevenuePoint = { label: string; revenueCents: number; previousCents: number }

const config = {
  revenueCents: { label: 'Receita', color: 'var(--chart-1)' },
  previousCents: { label: 'Período anterior', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full">
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fill-revenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-revenueCents)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-revenueCents)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={64}
          tickFormatter={(v: number) => `R$ ${Math.round(v / 100000)}k`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full justify-between gap-4">
                  <span>{config[name as keyof typeof config]?.label}</span>
                  <span className="font-medium tabular-nums text-foreground">{formatCents(Number(value))}</span>
                </div>
              )}
            />
          }
        />
        <Area
          dataKey="previousCents"
          type="monotone"
          stroke="var(--color-previousCents)"
          strokeDasharray="4 4"
          fill="transparent"
          strokeWidth={1.5}
        />
        <Area
          dataKey="revenueCents"
          type="monotone"
          stroke="var(--color-revenueCents)"
          fill="url(#fill-revenue)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
