'use server'

import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome').max(120),
  email: z.string().trim().toLowerCase().email('E-mail inválido').max(254),
  telegram: z
    .string()
    .trim()
    .transform((v) => v.replace(/^@/, ''))
    .pipe(z.string().regex(/^[a-zA-Z0-9_]{5,32}$/, 'Usuário do Telegram inválido')),
  website: z.string().max(0).optional(),
})

export type LeadState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string; fieldErrors?: Partial<Record<'name' | 'email' | 'telegram', string>> }

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = leadSchema.safeParse({
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    telegram: formData.get('telegram') ?? '',
    website: formData.get('website') ?? '',
  })

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors
    if (flat.website) return { status: 'success' }
    return {
      status: 'error',
      message: 'Revise os campos destacados.',
      fieldErrors: {
        name: flat.name?.[0],
        email: flat.email?.[0],
        telegram: flat.telegram?.[0],
      },
    }
  }

  const { name, email, telegram } = parsed.data
  console.info(
    JSON.stringify({
      event: 'lead.created',
      at: new Date().toISOString(),
      name,
      email,
      telegram: `@${telegram}`,
    }),
  )

  return { status: 'success' }
}
