import type { Metadata } from 'next'
import Link from 'next/link'
import { Inbox } from 'lucide-react'
import { ClownLogo, JesterMark } from '@/components/clown/jester-logo'
import { Keyword } from '@/components/clown/typography'
import { Sidebar, Topbar } from '@/components/clown/app-shell'
import { RevenueChart, type RevenuePoint } from '@/components/clown/revenue-chart'
import { CardSkeleton, ChartSkeleton, TableSkeleton } from '@/components/clown/skeletons'
import { FormControlsDemo, OverlaysDemo, TabsDemo } from '@/components/design-system/interactive-demo'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCents } from '@/lib/money'

export const metadata: Metadata = {
  title: 'Design system',
  description: 'ClownPay Premium — tokens, tipografia e componentes.',
  robots: { index: false },
}

const palette = [
  { name: 'bg-primary', hex: '#080808', className: 'bg-background' },
  { name: 'bg-card', hex: '#151515', className: 'bg-card' },
  { name: 'border', hex: '#222222', className: 'bg-border' },
  { name: 'accent', hex: '#E11D1D', className: 'bg-primary' },
  { name: 'damask', hex: '#4A0F0F', className: 'bg-damask' },
  { name: 'bg-secondary', hex: '#F5F1EB', className: 'bg-bone' },
  { name: 'text-primary', hex: '#FFFFFF', className: 'bg-foreground' },
  { name: 'text-secondary', hex: '#A1A1A1', className: 'bg-muted-foreground' },
]

const revenue: RevenuePoint[] = [
  ['Seg', 1840000, 1520000],
  ['Ter', 2210000, 1690000],
  ['Qua', 1980000, 1810000],
  ['Qui', 2640000, 2020000],
  ['Sex', 3120000, 2380000],
  ['Sáb', 3480000, 2710000],
  ['Dom', 2950000, 2490000],
].map(([label, revenueCents, previousCents]) => ({
  label: label as string,
  revenueCents: revenueCents as number,
  previousCents: previousCents as number,
}))

const transactions = [
  { id: 'ch_9f2a1c', customer: 'joao.v@mail.com', amount: 4990, status: 'paga' },
  { id: 'ch_9f2a1b', customer: 'player_88213', amount: 20000, status: 'pendente' },
  { id: 'ch_9f2a1a', customer: 'ana.r@mail.com', amount: 9700, status: 'expirada' },
  { id: 'ch_9f2a19', customer: 'm.costa@mail.com', amount: 14900, status: 'estornada' },
] as const

const statusVariant = {
  paga: 'default',
  pendente: 'outline',
  expirada: 'secondary',
  estornada: 'destructive',
} as const

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`ds-${title}`} className="flex flex-col gap-6 border-t border-border py-14">
      <h2 id={`ds-${title}`} className="text-2xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  return (
    <main className="cp-stage min-h-svh">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <header className="flex flex-col gap-6 pb-14">
          <Link href="/" aria-label="Voltar para o início">
            <ClownLogo />
          </Link>
          <h1 className="text-5xl text-balance md:text-hero">
            ClownPay <Keyword>Premium</Keyword>.
          </h1>
          <p className="max-w-xl leading-relaxed md:text-lg">
            Tokens, tipografia e componentes. Escuro, cinematográfico e assustadoramente elegante.
          </p>
        </header>

        <Block title="Cores">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {palette.map((c) => (
              <li key={c.name} className="flex flex-col gap-3">
                <span className={`h-20 rounded-2xl border border-border ${c.className}`} />
                <span className="flex flex-col text-xs">
                  <span className="font-medium text-foreground">{c.name}</span>
                  <span className="font-mono">{c.hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Tipografia">
          <div className="flex flex-col gap-6">
            <p className="font-display text-5xl font-bold tracking-tight text-foreground md:text-hero">
              Receba sem <Keyword>limites</Keyword>.
            </p>
            <p className="font-display text-3xl font-bold tracking-tight text-foreground md:text-section">
              Taxas sem <Keyword>truque</Keyword>.
            </p>
            <p className="max-w-xl leading-relaxed">
              Body em Inter 400, 16px, line-height 1.6, cor #A1A1A1. Usado em parágrafos, descrições e tabelas.
            </p>
            <p className="font-script text-5xl text-foreground">ClownPay</p>
          </div>
        </Block>

        <Block title="Logo">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex h-40 items-center justify-center rounded-2xl border border-border bg-background">
              <JesterMark className="size-20 text-foreground" title="Logo Clown Payments" />
            </div>
            <div className="theme-bone flex h-40 items-center justify-center rounded-2xl">
              <JesterMark className="size-20 text-primary" title="Logo Clown Payments sobre bege" />
            </div>
          </div>
        </Block>

        <Block title="Botões e badges">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Abrir conta</Button>
            <Button>Primário</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button disabled>Desabilitado</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Paga</Badge>
            <Badge variant="outline">Pendente</Badge>
            <Badge variant="secondary">Expirada</Badge>
            <Badge variant="destructive">Estornada</Badge>
          </div>
        </Block>

        <Block title="Formulários">
          <FormControlsDemo />
        </Block>

        <Block title="Modal, toast e tabs">
          <OverlaysDemo />
          <TabsDemo />
        </Block>

        <Block title="Cards e gráfico">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { title: 'Saldo disponível', value: 1248000, hint: 'Liberado para saque' },
              { title: 'A liberar', value: 382050, hint: 'Próxima liberação amanhã' },
              { title: 'Vendas hoje', value: 638720, hint: '+18% vs. ontem' },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardHeader>
                  <CardDescription>{stat.title}</CardDescription>
                  <CardTitle className="font-display text-3xl font-bold tabular-nums">{formatCents(stat.value)}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs">{stat.hint}</CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg font-bold">Receita · últimos 7 dias</CardTitle>
              <CardDescription>Linha tracejada: período anterior</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart data={revenue} />
            </CardContent>
          </Card>
        </Block>

        <Block title="Tabela">
          <div className="overflow-hidden rounded-2xl border border-border bg-card/85">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-5">Cobrança</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="px-5 text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="px-5 font-mono text-xs text-foreground">{t.id}</TableCell>
                    <TableCell>{t.customer}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[t.status]} className="capitalize">
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 text-right tabular-nums text-foreground">{formatCents(t.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Block>

        <Block title="Skeletons e estado vazio">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TableSkeleton rows={4} />
            <ChartSkeleton />
          </div>
          <Empty className="rounded-2xl border border-dashed border-border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Inbox aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle className="font-display text-lg font-bold text-foreground">Picadeiro vazio</EmptyTitle>
              <EmptyDescription>Nenhuma transação ainda. Crie sua primeira cobrança PIX para abrir o espetáculo.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href="/checkout/demo" className={buttonVariants()}>
                Criar cobrança
              </Link>
            </EmptyContent>
          </Empty>
        </Block>

        <Block title="Sidebar e topbar">
          <div className="flex h-96 overflow-hidden rounded-2xl border border-border bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Topbar title="Visão geral" />
              <div className="grid flex-1 grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </div>
        </Block>
      </div>
    </main>
  )
}
