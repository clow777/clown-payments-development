import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { clientIp, rateLimit } from '@/lib/rate-limit'
import { registerSchema, type RegisterInput, type RegisterResponse } from '@/lib/auth/register-schema'

function json(body: RegisterResponse, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

// Instant sign-up already reveals whether an e-mail is registered, so we say it plainly
// and point to login; the per-IP rate limit is what slows down enumeration.
function mapSignUpError(code: string | undefined, status: number | undefined): RegisterResponse & { ok: false } {
  switch (code) {
    case 'email_exists':
    case 'user_already_exists':
      return { ok: false, code: 'account_exists', message: 'Já existe uma conta com esse e-mail. Faça login para entrar.' }
    case 'weak_password':
      return { ok: false, code, message: 'Senha fraca. Escolha uma senha mais forte.' }
    case 'email_address_invalid':
      return { ok: false, code, message: 'Use um e-mail real — domínios de teste não são aceitos.' }
    case 'email_address_not_authorized':
      return { ok: false, code, message: 'Não conseguimos enviar e-mail para esse endereço. Use outro.' }
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return { ok: false, code, message: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' }
    case 'signup_disabled':
      return { ok: false, code, message: 'Cadastros estão temporariamente fechados.' }
    default:
      if (status === 429) {
        return { ok: false, code: 'rate_limited', message: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' }
      }
      return { ok: false, code: 'signup_failed', message: 'Não foi possível concluir o cadastro. Tente novamente.' }
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()

  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.error('[auth/register] missing Supabase env vars', { requestId })
      return json({ ok: false, code: 'misconfigured', message: 'Serviço de cadastro indisponível.' }, 503)
    }

    const ip = clientIp(request.headers)
    const limit = rateLimit(`register:${ip}`, 5, 10 * 60_000)
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, code: 'rate_limited', message: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' },
        { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': String(limit.retryAfterSec) } },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, code: 'invalid_json', message: 'Requisição inválida.' }, 400)
    }

    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof RegisterInput, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof RegisterInput
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
      }
      return json({ ok: false, code: 'validation_failed', message: 'Revise os campos destacados.', fieldErrors }, 422)
    }

    const { email, password, fullName, accountType, segment, telegram } = parsed.data

    const admin = createAdminClient()
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        account_type: accountType,
        segment,
        telegram: telegram ? telegram.replace(/^@?/, '@') : '',
        terms_accepted_at: new Date().toISOString(),
        adult_confirmed: true,
        signup_ip: ip,
      },
    })

    if (createError) {
      console.error('[auth/register] admin.createUser failed', {
        requestId,
        code: createError.code,
        status: createError.status,
        message: createError.message,
      })
      const mapped = mapSignUpError(createError.code, createError.status)
      const status =
        mapped.code === 'account_exists'
          ? 409
          : mapped.code === 'rate_limited' || mapped.code.startsWith('over_')
            ? 429
            : createError.status && createError.status < 500
              ? 400
              : 502
      return json(mapped, status)
    }

    const supabase = await createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      console.error('[auth/register] auto sign-in failed', {
        requestId,
        userId: created.user?.id,
        code: signInError.code,
        message: signInError.message,
      })
      return json({ ok: true, signedIn: false }, 201)
    }

    console.info('[auth/register] user registered and signed in', { requestId, userId: created.user?.id })
    return json({ ok: true, signedIn: true }, 201)
  } catch (err) {
    console.error('[auth/register] unexpected error', {
      requestId,
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    })
    return json({ ok: false, code: 'internal_error', message: `Erro inesperado. Código de suporte: ${requestId.slice(0, 8)}` }, 500)
  }
}
