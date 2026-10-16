'use client'

import { useEffect, useMemo, useState } from 'react'
import { Lock } from 'lucide-react'
import { ClownLogo } from '@/components/clown/jester-logo'
import { Button } from '@/components/ui/button'
import { buildPixBrCode } from '@/lib/pix/brcode'
import { formatCents } from '@/lib/money'
import { PixAwaiting } from './pix-awaiting'
import { PaymentFailure, PaymentSuccess } from './payment-result'

type Phase = 'awaiting' | 'paid' | 'expired' | 'error'

const EXPIRES_IN_SECONDS = 15 * 60
const product = { name: 'Plano VIP mensal', merchant: 'Estúdio Noir', amountCents: 4990 }

export function CheckoutDemo() {
  const [phase, setPhase] = useState<Phase>('awaiting')
  const [attempt, setAttempt] = useState(1)
  const [secondsLeft, setSecondsLeft] = useState(EXPIRES_IN_SECONDS)

  const brCode = useMemo(
    () =>
      buildPixBrCode({
        pixKey: 'b3c1f2a0-7d4e-4a9b-9f1e-2c8d6e5a4b3c',
        amountCents: product.amountCents,
        merchantName: 'CLOWN PAYMENTS',
        merchantCity: 'SAO PAULO',
        txid: `CPTEST${attempt.toString().padStart(6, '0')}`,
      }),
    [attempt],
  )

  useEffect(() => {
    if (phase !== 'awaiting') return
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhase('expired')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase])

  function restart() {
    setAttempt((a) => a + 1)
    setSecondsLeft(EXPIRES_IN_SECONDS)
    setPhase('awaiting')
  }

  const amountLabel = formatCents(product.amountCents)

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/85 p-6 backdrop-blur-md md:p-8">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.15em]">{product.merchant}</p>
            <p className="font-display text-lg font-bold text-foreground">{product.name}</p>
          </div>
          <p className="font-display text-2xl font-bold tabular-nums text-foreground">{amountLabel}</p>
        </header>

        {phase === 'awaiting' ? <PixAwaiting brCode={brCode} secondsLeft={secondsLeft} /> : null}
        {phase === 'paid' ? <PaymentSuccess amountLabel={amountLabel} /> : null}
        {phase === 'expired' || phase === 'error' ? <PaymentFailure variant={phase} onRetry={restart} /> : null}

        <footer className="flex items-center justify-center gap-2 border-t border-border pt-5 text-xs">
          <Lock aria-hidden="true" className="size-3.5" />
          Pagamento processado com segurança por
          <ClownLogo className="scale-75" />
        </footer>
      </div>

      <section aria-label="Controles do sandbox" className="flex flex-col gap-3 rounded-2xl border border-dashed border-border p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-primary">Sandbox · sk_test_</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setPhase('paid')} disabled={phase !== 'awaiting'}>
            Simular pago
          </Button>
          <Button size="sm" variant="outline" onClick={() => setPhase('expired')} disabled={phase !== 'awaiting'}>
            Simular expirado
          </Button>
          <Button size="sm" variant="outline" onClick={() => setPhase('error')} disabled={phase !== 'awaiting'}>
            Simular falha
          </Button>
          <Button size="sm" variant="ghost" onClick={restart}>
            Reiniciar
          </Button>
        </div>
      </section>
    </div>
  )
}
