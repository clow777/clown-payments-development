'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function loginErrorMessage(error: { code?: string; status?: number }) {
  if (error.code === 'email_not_confirmed') return 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.'
  if (error.code === 'over_request_rate_limit' || error.status === 429) return 'Muitas tentativas. Aguarde alguns minutos.'
  if (error.code === 'invalid_credentials') return 'E-mail ou senha inválidos.'
  return 'Não foi possível entrar agora. Tente novamente.'
}

export function LoginForm({ next, linkError }: { next: string; linkError: boolean }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(linkError ? 'Link expirado ou inválido. Entre com sua senha.' : null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: String(form.get('email') ?? '').trim().toLowerCase(),
        password: String(form.get('password') ?? ''),
      })
      if (error) {
        console.error('[auth/login] sign-in failed', { code: error.code, status: error.status })
        setError(loginErrorMessage(error))
        return
      }
      router.push(next)
      router.refresh()
    } catch {
      setError('Sem conexão com o servidor. Tente novamente.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="login-email" className="text-foreground">E-mail</Label>
        <Input id="login-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="login-password" className="text-foreground">Senha</Label>
        <Input id="login-password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {error ? (
        <p role="alert" className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-foreground">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
        {pending ? 'Entrando' : 'Entrar'}
        {pending ? null : <ArrowRight aria-hidden="true" />}
      </Button>
      <p className="text-center text-sm">
        Ainda não tem conta?{' '}
        <Link href="/auth/cadastro" className="text-foreground underline underline-offset-4 hover:text-primary">
          Abrir conta
        </Link>
      </p>
    </form>
  )
}
