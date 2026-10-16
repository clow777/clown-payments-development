import { JesterMark } from '@/components/clown/jester-logo'
import { Keyword } from '@/components/clown/typography'

const rows = [
  { segment: 'Criadores e Assinaturas', fee: '4,99% + R$ 0,99', release: 'D+1', reserve: '5% por 30 dias' },
  { segment: 'Cassino e Bets (licenciado)', fee: '3,99% + R$ 0,49', release: 'D+0', reserve: '10% por 60 dias' },
  { segment: 'Infoprodutos', fee: '3,49% + R$ 0,99', release: 'D+1', reserve: '5% por 30 dias' },
  { segment: 'Outros (sob análise)', fee: 'Sob consulta', release: 'D+2', reserve: 'Conforme risco' },
]

const tiers = [
  { name: 'Bronze', volume: 'até R$ 50 mil/mês', discount: 'Tabela padrão' },
  { name: 'Prata', volume: 'R$ 50–250 mil/mês', discount: '−0,30 p.p.' },
  { name: 'Ouro', volume: 'R$ 250 mil–1 mi/mês', discount: '−0,60 p.p.' },
  { name: 'Black', volume: 'acima de R$ 1 mi/mês', discount: 'Negociada' },
]

export function Pricing() {
  return (
    <section id="taxas" aria-labelledby="taxas-title" className="theme-bone py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-3xl flex-col gap-5">
            <JesterMark className="size-10 text-primary" />
            <h2 id="taxas-title" className="text-4xl text-balance md:text-section">
              Taxas sem <Keyword>truque</Keyword>.
            </h2>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
              Percentual + fixo por transação PIX paga. Sem mensalidade, sem taxa de setup, sem
              cobrança por cobrança expirada.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Saque PIX: R$ 2,90 · Estorno: grátis</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Taxas por segmento</caption>
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <th scope="col" className="px-6 py-4 font-medium">Segmento</th>
                <th scope="col" className="px-6 py-4 font-medium">Taxa PIX</th>
                <th scope="col" className="px-6 py-4 font-medium">Liberação</th>
                <th scope="col" className="px-6 py-4 font-medium">Reserva de risco</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.segment} className="border-b border-border last:border-0">
                  <th scope="row" className="px-6 py-5 font-display text-base font-bold text-foreground">
                    {row.segment}
                  </th>
                  <td className="px-6 py-5 font-medium tabular-nums text-foreground">{row.fee}</td>
                  <td className="px-6 py-5 text-muted-foreground">{row.release}</td>
                  <td className="px-6 py-5 text-muted-foreground">{row.reserve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Níveis por volume</h3>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {tiers.map((tier) => (
              <li key={tier.name} className="flex flex-col gap-1 rounded-2xl border border-border p-5">
                <p className="font-display text-lg font-bold text-foreground">{tier.name}</p>
                <p className="text-sm text-muted-foreground">{tier.volume}</p>
                <p className="pt-2 text-sm font-medium text-primary">{tier.discount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
