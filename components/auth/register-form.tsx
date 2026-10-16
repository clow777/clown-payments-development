'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SEGMENTS, type RegisterInput, type RegisterResponse } from '@/lib/auth/register-schema'
import { cn } from '@/lib/utils'

type FieldErrors = Partial<Record<keyof RegisterInput, string>>

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-xs text-primary">
      {message}
    </p>
  )
}

export function RegisterForm() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<'pf' | 'pj'>('pf')
  const [segment, setSegment] = useState<string>('')
  const [pending, setPending] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setFormError(null)
    setFieldErrors({})

    const payload = {
      fullName: String(form.get('fullName') ?? ''),
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
      accountType,
      segment,
      telegram: String(form.get('telegram') ?? ''),
      acceptTerms: form.get('acceptTerms') === 'on',
      isAdult: form.get('isAdult') === 'on',
    }

    if (payload.password !== String(form.get('confirmPassword') ?? '')) {
      setFieldErrors({ password: 'As senhas não coincidem.' })
      setPending(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => null)) as RegisterResponse | null

      if (!data) {
        setFormError(`Resposta inesperada do servidor (HTTP ${res.status}).`)
        return
      }
      if (!data.ok) {
        setFieldErrors(data.fieldErrors ?? {})
        setFormError(data.message)
        return
      }
      router.replace(data.signedIn ? '/dashboard' : '/auth/confirmar')
      router.refresh()
    } catch {
      setFormError('Sem conexão com o servidor. Verifique sua internet e tente novamente.')
    } finally {
      setPending(false)
    }
  }

  const describe = (key: keyof RegisterInput) => (fieldErrors[key] ? `reg-${key}-error` : undefined)

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-foreground">Tipo de conta</legend>
        <div className="grid grid-cols-2 gap-2" role="radiogroup">
          {(['pf', 'pj'] as const).map((type) => (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={accountType === type}
              onClick={() => setAccountType(type)}
              className={cn(
                'rounded-xl border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                accountType === type
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {type === 'pf' ? 'Pessoa física' : 'Pessoa jurídica'}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor="reg-fullName" className="text-foreground">
          {accountType === 'pf' ? 'Nome completo' : 'Razão social'}
        </Label>
        <Input id="reg-fullName" name="fullName" autoComplete={accountType === 'pf' ? 'name' : 'organization'} required aria-invalid={!!fieldErrors.fullName || undefined} aria-describedby={describe('fullName')} />
        <FieldError id="reg-fullName-error" message={fieldErrors.fullName} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-email" className="text-foreground">E-mail</Label>
          <Input id="reg-email" name="email" type="email" autoComplete="email" required aria-invalid={!!fieldErrors.email || undefined} aria-describedby={describe('email')} />
          <FieldError id="reg-email-error" message={fieldErrors.email} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-telegram" className="text-foreground">
            Telegram <span className="text-muted-foreground">(opcional)</span>
          </Label>
          <Input id="reg-telegram" name="telegram" placeholder="@seuusuario" autoComplete="off" aria-invalid={!!fieldErrors.telegram || undefined} aria-describedby={describe('telegram')} />
          <FieldError id="reg-telegram-error" message={fieldErrors.telegram} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="reg-segment" className="text-foreground">Segmento</Label>
        <Select value={segment} onValueChange={(v) => setSegment(v ?? '')}>
          <SelectTrigger id="reg-segment" className="w-full" aria-invalid={!!fieldErrors.segment || undefined} aria-describedby={describe('segment')}>
            <SelectValue placeholder="Selecione seu nicho" />
          </SelectTrigger>
          <SelectContent>
            {SEGMENTS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError id="reg-segment-error" message={fieldErrors.segment ? 'Selecione um segmento.' : undefined} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-password" className="text-foreground">Senha</Label>
          <Input id="reg-password" name="password" type="password" autoComplete="new-password" required minLength={10} aria-invalid={!!fieldErrors.password || undefined} aria-describedby={fieldErrors.password ? 'reg-password-error' : 'reg-password-hint'} />
          {fieldErrors.password ? (
            <FieldError id="reg-password-error" message={fieldErrors.password} />
          ) : (
            <p id="reg-password-hint" className="text-xs">Mínimo 10 caracteres, com letra e número.</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reg-confirm" className="text-foreground">Confirmar senha</Label>
          <Input id="reg-confirm" name="confirmPassword" type="password" autoComplete="new-password" required />
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="isAdult" className="mt-1 size-4 accent-primary" aria-describedby={describe('isAdult')} />
          <span>Declaro que tenho 18 anos ou mais.</span>
        </label>
        <FieldError id="reg-isAdult-error" message={fieldErrors.isAdult} />
        <label className="flex items-start gap-3">
          <input type="checkbox" name="acceptTerms" className="mt-1 size-4 accent-primary" aria-describedby={describe('acceptTerms')} />
          <span>Aceito os termos de uso, a política de uso aceitável e a política de privacidade (LGPD).</span>
        </label>
        <FieldError id="reg-acceptTerms-error" message={fieldErrors.acceptTerms} />
      </div>

      {formError ? (
        <p role="alert" className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-foreground">
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
        {pending ? 'Criando conta' : 'Criar conta'}
        {pending ? null : <ArrowRight aria-hidden="true" />}
      </Button>

      <p className="text-center text-sm">
        Já tem conta?{' '}
        <Link href="/auth/login" className="text-foreground underline underline-offset-4 hover:text-primary">
          Entrar
        </Link>
      </p>
    </form>
  )
}
