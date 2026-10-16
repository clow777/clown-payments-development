import { z } from 'zod'

export const SEGMENTS = [
  { value: 'creator', label: 'Criador de conteúdo / assinaturas' },
  { value: 'casino', label: 'Cassino / bets' },
  { value: 'infoproduct', label: 'Infoproduto' },
  { value: 'other', label: 'Outros' },
] as const

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Informe seu nome.').max(120),
  email: z.string().trim().toLowerCase().email('E-mail inválido.').max(254),
  password: z
    .string()
    .min(10, 'Use pelo menos 10 caracteres.')
    .max(128)
    .regex(/[A-Za-z]/, 'Inclua ao menos uma letra.')
    .regex(/\d/, 'Inclua ao menos um número.'),
  accountType: z.enum(['pf', 'pj']),
  segment: z.enum(['creator', 'casino', 'infoproduct', 'other']),
  telegram: z
    .string()
    .trim()
    .max(33)
    .regex(/^(@?[A-Za-z0-9_]{5,32})?$/, 'Usuário do Telegram inválido.')
    .optional()
    .default(''),
  acceptTerms: z.literal(true, { error: 'Você precisa aceitar os termos.' }),
  isAdult: z.literal(true, { error: 'Confirme que você tem 18 anos ou mais.' }),
})

export type RegisterInput = z.infer<typeof registerSchema>

export type RegisterResponse =
  | { ok: true; signedIn: boolean }
  | { ok: false; code: string; message: string; fieldErrors?: Partial<Record<keyof RegisterInput, string>> }
