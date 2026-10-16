'use client'

import { useActionState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { submitLead, type LeadState } from '@/app/actions/lead'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: LeadState = { status: 'idle' }

const fields = [
  { name: 'name', label: 'Nome', type: 'text', autoComplete: 'name', placeholder: 'Seu nome' },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', placeholder: 'voce@empresa.com' },
  { name: 'telegram', label: 'Telegram', type: 'text', autoComplete: 'off', placeholder: '@seuusuario' },
] as const

export function LeadForm() {
  const [state, action, pending] = useActionState(submitLead, initialState)

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/85 p-8 text-center backdrop-blur-md">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <p className="font-display text-xl font-bold text-foreground">Ingresso garantido.</p>
        <p className="text-sm">Nosso time fala com você pelo Telegram em até 1 dia útil.</p>
      </div>
    )
  }

  const fieldErrors = state.status === 'error' ? state.fieldErrors : undefined

  return (
    <form action={action} noValidate className="flex flex-col gap-5 rounded-2xl border border-border bg-card/85 p-6 text-left backdrop-blur-md md:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {fields.map((field) => {
          const error = fieldErrors?.[field.name]
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <Label htmlFor={`lead-${field.name}`} className="text-foreground">
                {field.label}
              </Label>
              <Input
                id={`lead-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `lead-${field.name}-error` : undefined}
              />
              {error ? (
                <p id={`lead-${field.name}-error`} className="text-xs text-primary">
                  {error}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs leading-relaxed">
          Ao enviar, você concorda com o tratamento dos dados para contato comercial (LGPD).
        </p>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
          {pending ? 'Enviando' : 'Abrir conta'}
          {pending ? null : <ArrowRight aria-hidden="true" />}
        </Button>
      </div>
      {state.status === 'error' ? (
        <p role="alert" className="text-sm text-primary">
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
