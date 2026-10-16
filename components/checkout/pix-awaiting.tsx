'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Check, Copy, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCountdown } from '@/lib/money'

type PixAwaitingProps = {
  brCode: string
  secondsLeft: number
}

export function PixAwaiting({ brCode, secondsLeft }: PixAwaitingProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(brCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const urgent = secondsLeft <= 60

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-2xl bg-foreground p-4">
        <QRCodeSVG
          value={brCode}
          size={208}
          level="M"
          bgColor="#FFFFFF"
          fgColor="#080808"
          title="QR Code PIX para pagamento"
        />
      </div>

      <div className="flex items-center gap-3" role="status" aria-live="polite">
        <span
          aria-hidden="true"
          className="size-5 animate-spin rounded-full border-2 border-border border-t-primary"
        />
        <p className="text-sm font-medium text-foreground">Aguardando seu PIX</p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="pix-copia-cola" className="text-xs uppercase tracking-[0.15em]">
          PIX copia e cola
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 p-1.5 pl-4">
          <input
            id="pix-copia-cola"
            readOnly
            value={brCode}
            onFocus={(e) => e.currentTarget.select()}
            className="min-w-0 flex-1 truncate bg-transparent font-mono text-xs text-foreground outline-none"
          />
          <Button size="sm" onClick={copy} aria-label={copied ? 'Código copiado' : 'Copiar código PIX'}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
        </div>
      </div>

      <p className={`flex items-center gap-2 text-sm tabular-nums ${urgent ? 'text-primary' : ''}`}>
        <Timer aria-hidden="true" className="size-4" />
        Expira em <span className="font-medium">{formatCountdown(secondsLeft)}</span>
      </p>
    </div>
  )
}
