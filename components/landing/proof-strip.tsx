const stats = [
  { value: 'R$ 1,8 bi', label: 'processados nos últimos 12 meses' },
  { value: '98,7%', label: 'de aprovação em cobranças PIX' },
  { value: '4 min', label: 'tempo médio de repasse D+0' },
]

export function ProofStrip() {
  return (
    <section aria-label="Números da plataforma" className="relative z-10 border-y border-border bg-background">
      <dl className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 py-8 sm:px-8 sm:first:pl-0">
            <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="order-1 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
