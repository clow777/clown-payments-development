import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Entrar — Clown Payments',
  description: 'Acesse o painel da Clown Payments.',
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; erro?: string }> }) {
  const { next, erro } = await searchParams
  const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard'

  return (
    <AuthShell title="Bem-vindo de" keyword="volta." description="Entre para acompanhar suas vendas e saques.">
      <LoginForm next={safeNext} linkError={erro === 'link'} />
    </AuthShell>
  )
}
