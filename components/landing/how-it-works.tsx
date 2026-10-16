'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CheckCircle2 } from 'lucide-react'
import { Keyword } from '@/components/clown/typography'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  {
    title: 'Crie a conta',
    body: 'Cadastro PF ou PJ, 2FA obrigatório e KYC com liveness. Análise em até 24h, com limites que crescem junto com você.',
    visual: (
      <ul className="flex flex-col gap-3 text-sm">
        {['Dados e documento', 'Selfie com liveness', 'Segmento e site/bot', 'Termos do nicho'].map((item, i) => (
          <li key={item} className="flex items-center gap-3">
            <CheckCircle2 aria-hidden="true" className={cn('size-4', i < 3 ? 'text-primary' : 'text-muted-foreground')} />
            <span className={i < 3 ? 'text-foreground' : 'text-muted-foreground'}>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Integre',
    body: 'API REST com idempotência, SDKs, checkout hospedado, links de pagamento ou bot do Telegram. Sandbox idêntico à produção.',
    visual: (
      <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-muted-foreground">
        <code>
          <span className="text-foreground">POST</span> /v1/charges{'\n'}
          Idempotency-Key: <span className="text-primary">ord_8f2a</span>
          {'\n\n'}
          {'{ "amount": 4990, "method": "pix" }'}
        </code>
      </pre>
    ),
  },
  {
    title: 'Receba',
    body: 'Confirmação em segundos via webhook assinado, notificação no Telegram e saldo liberado em D+0 conforme seu perfil de risco.',
    visual: (
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Venda paga</p>
        <p className="font-display text-3xl font-bold text-foreground">R$ 49,90</p>
        <p className="text-sm text-muted-foreground">Plano VIP mensal · há 2s</p>
      </div>
    ),
  },
]

export function HowItWorks() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-step-panel]')
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-steps-pin]',
            start: 'top top',
            end: `+=${panels.length * 70}%`,
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              setActive(Math.min(panels.length - 1, Math.floor(self.progress * panels.length)))
            },
          },
        })
        panels.forEach((panel, i) => {
          if (i === 0) return
          tl.to(panels[i - 1], { autoAlpha: 0, y: -40, duration: 0.45 }, i)
          tl.fromTo(panel, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.45 }, i + 0.5)
        })
        tl.to({}, { duration: 0.6 })
        return () => setActive(0)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="como-funciona" aria-labelledby="como-funciona-title" className="bg-background">
      <div data-steps-pin className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center gap-12 px-5 py-24 md:flex-row md:items-center md:gap-16 md:px-8">
        <div className="flex flex-col gap-8 md:w-5/12">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">Como funciona</p>
            <h2 id="como-funciona-title" className="text-4xl text-balance md:text-section">
              Três atos. Um <Keyword>espetáculo</Keyword>.
            </h2>
          </div>
          <ol className="hidden flex-col gap-1 motion-safe:md:flex" aria-label="Etapas">
            {steps.map((step, i) => (
              <li
                key={step.title}
                aria-current={active === i ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-4 border-l-2 py-3 pl-5 font-display text-xl font-bold transition-colors duration-300',
                  active === i ? 'border-primary text-foreground' : 'border-border text-muted-foreground',
                )}
              >
                <span className="font-sans text-sm font-medium tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {step.title}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid flex-1 gap-6">
          {steps.map((step, i) => (
            <article
              key={step.title}
              data-step-panel
              className={cn(
                'flex flex-col gap-8 rounded-2xl border border-border bg-card p-8 md:p-10 motion-safe:md:[grid-area:1/1]',
                i > 0 && 'motion-safe:md:invisible motion-safe:md:opacity-0',
              )}
            >
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium tabular-nums text-primary">
                  {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-4xl">{step.title}</h3>
                <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
              <div className="rounded-xl border border-border bg-background/60 p-6">{step.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
