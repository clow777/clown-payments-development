'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { AlertTriangle, Clock3, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Confetti() {
  const reduce = useReducedMotion()
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: (i / 18) * 100 + ((i * 37) % 7) - 3,
        delay: (i % 6) * 0.06,
        rotate: (i * 47) % 360,
        drift: ((i * 13) % 40) - 20,
        tone: i % 3 === 0 ? 'bg-foreground' : 'bg-primary',
      })),
    [],
  )
  if (reduce) return null
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute top-0 h-2.5 w-1.5 rounded-sm ${p.tone}`}
          style={{ left: `${p.x}%` }}
          initial={{ y: -20, opacity: 0, rotate: p.rotate }}
          animate={{ y: 320, x: p.drift, opacity: [0, 1, 1, 0], rotate: p.rotate + 260 }}
          transition={{ duration: 1.8, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export function PaymentSuccess({ amountLabel, onContinue }: { amountLabel: string; onContinue?: () => void }) {
  return (
    <div role="status" className="relative flex flex-col items-center gap-6 py-6 text-center">
      <Confetti />
      <svg viewBox="0 0 64 64" className="cp-draw size-20 text-primary" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle pathLength={1} cx="32" cy="32" r="28" />
        <path pathLength={1} d="M20 33l8 8 16-17" style={{ animationDelay: '0.5s' }} />
      </svg>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl">
          Pagamento <span className="text-primary">confirmado</span>.
        </h2>
        <p className="text-sm">{amountLabel} recebidos. O acesso foi liberado e o comprovante enviado por e-mail.</p>
      </div>
      {onContinue ? (
        <Button size="lg" onClick={onContinue}>
          Continuar
        </Button>
      ) : null}
    </div>
  )
}

type PaymentFailureProps = {
  variant: 'error' | 'expired'
  onRetry: () => void
}

export function PaymentFailure({ variant, onRetry }: PaymentFailureProps) {
  const expired = variant === 'expired'
  const Icon = expired ? Clock3 : AlertTriangle
  return (
    <div role="alert" className="flex flex-col items-center gap-6 py-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full border border-border bg-background">
        <Icon aria-hidden="true" className="size-7 text-primary" />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl">
          {expired ? (
            <>
              O tempo <span className="text-primary">acabou</span>.
            </>
          ) : (
            <>
              A lona <span className="text-primary">rasgou</span>.
            </>
          )}
        </h2>
        <p className="text-sm">
          {expired
            ? 'Este QR Code expirou e não pode mais ser pago. Gere um novo para continuar.'
            : 'Não conseguimos gerar sua cobrança agora. Nenhum valor foi debitado.'}
        </p>
      </div>
      <Button size="lg" onClick={onRetry}>
        <RotateCcw aria-hidden="true" />
        {expired ? 'Gerar novo PIX' : 'Tentar novamente'}
      </Button>
    </div>
  )
}
