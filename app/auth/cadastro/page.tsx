import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Abrir conta — Clown Payments',
  description: 'Crie sua conta na Clown Payments e comece a receber via PIX.',
}

export default function CadastroPage() {
  return (
    <AuthShell title="Abra sua" keyword="conta." description="Cadastro em 2 minutos. A verificação KYC vem logo depois.">
      <RegisterForm />
    </AuthShell>
  )
}
