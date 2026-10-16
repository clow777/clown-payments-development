import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { ClownLogo } from '@/components/clown/jester-logo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCents as formatBRL } from '@/lib/money'

export const metadata: Metadata = { title: 'Painel — Clown Payments' }

const KYC_LABEL: Record<string, string> = {
  pending: 'KYC pendente',
  in_review: 'Em análise',
  approved: 'Aprovado',
  rejected: 'Reprovado',
  suspended: 'Suspenso',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [{ data: profile }, { data: transactions }] = await Promise.all([
    supabase.from('profiles').select('full_name, kyc_status, segment, account_type').eq('id', user.id).maybeSingle(),
    supabase.from('transactions').select('id, amount_cents, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ])

  const paidCents = (transactions ?? []).filter((t) => t.status === 'paid').reduce((sum, t) => sum + Number(t.amount_cents), 0)

  return (
    <main className="cp-stage min-h-svh">
      <header className="relative z-10 flex items-center justify-between border-b border-border px-6 py-4">
        <ClownLogo />
        <form action={signOut}>
          <Button type="submit" variant="ghost" size="sm">
            <LogOut aria-hidden="true" /> Sair
          </Button>
        </form>
      </header>
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit">{KYC_LABEL[profile?.kyc_status ?? 'pending']}</Badge>
          <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-foreground md:text-5xl">
            Olá, <span className="text-primary">{profile?.full_name?.split(' ')[0] ?? 'artista'}</span>.
          </h1>
          <p>Sua conta foi criada. Complete a verificação para liberar cobranças PIX.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: 'Recebido', value: formatBRL(paidCents) },
            { label: 'Transações', value: String(transactions?.length ?? 0) },
            { label: 'Nível de verificação', value: '0 de 3' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card/90 p-6 backdrop-blur-md">
              <p className="text-sm">{stat.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
