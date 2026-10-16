'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { JesterMark } from '@/components/clown/jester-logo'
import { Keyword } from '@/components/clown/typography'
import { buttonVariants } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=90%',
            scrub: 0.6,
            pin: true,
          },
        })
        tl.fromTo('[data-hero-mark]', { scale: 0.8 }, { scale: 1.2, ease: 'none' }, 0)
          .to('[data-hero-copy]', { yPercent: -18, autoAlpha: 0.15, ease: 'none' }, 0)
          .to('[data-hero-bg]', { yPercent: 18, ease: 'none' }, 0)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-16"
    >
      <div aria-hidden="true" data-hero-bg className="absolute -inset-y-[20%] inset-x-0 -z-20">
        <div className="h-full w-full bg-[url('/images/damask.png')] bg-[length:520px_520px] opacity-15" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,color-mix(in_oklab,var(--background)_75%,transparent)_55%,var(--background)_100%)]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-5 py-16 text-center md:px-8">
        <div data-hero-mark className="text-foreground will-change-transform" style={{ transform: 'scale(0.8)' }}>
          <JesterMark className="size-28 md:size-40" strokeWidth={1.4} />
        </div>

        <div data-hero-copy className="flex flex-col items-center gap-8">
          <p className="rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-md">
            PIX · Alto risco · Brasil
          </p>
          <h1 id="hero-title" className="max-w-4xl text-5xl text-balance sm:text-6xl md:text-hero">
            Receba sem <Keyword>limites</Keyword>.
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg animate-in fade-in slide-in-from-bottom-3 duration-700">
            A gateway PIX para criadores, assinaturas, bots e iGaming licenciado. Aprovação alta,
            saque D+0 e integração em minutos — com compliance de verdade.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 fill-mode-both">
            <a href="/auth/cadastro" className={buttonVariants({ size: 'lg' })}>
              Abrir conta
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="#api" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Ver documentação
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Sem mensalidade · KYC em até 24h · Confirmação PIX em segundos
          </p>
        </div>
      </div>
    </section>
  )
}
