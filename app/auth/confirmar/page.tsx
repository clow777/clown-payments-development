import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Conta criada — Clown Payments',
}

export default function ContaCriadaPage() {
  return (
    <AuthShell title="Conta criada com" keyword="sucesso." description="Seu lugar no picadeiro está garantido.">
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <p className="text-pretty">Sua conta já está ativa. Entre no painel para começar a receber.</p>
        <Link href="/dashboard" className={buttonVariants({ size: 'lg' })}>
          Ir para o dashboard
        </Link>
      </div>
    </AuthShell>
  )
}
