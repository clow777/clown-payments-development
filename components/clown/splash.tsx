'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { JesterMark } from './jester-logo'

const SESSION_KEY = 'cp_splash_seen'
const MAX_WAIT_MS = 4000
const CURTAIN_MS = 800

export const splashBootScript = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem('${SESSION_KEY}')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-splash','off')}}catch(e){}})();`

type Phase = 'loading' | 'exiting' | 'done'

function whenWindowLoaded() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }))
}

export function Splash() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0.4)

  useEffect(() => {
    const html = document.documentElement
    if (html.getAttribute('data-splash') === 'off') {
      setPhase('done')
      return
    }

    let cancelled = false
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(() => {
      if (!cancelled) setProgress((p) => Math.max(p, 0.75))
    })

    const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS))
    Promise.race([Promise.all([fontsReady, whenWindowLoaded()]), timeout]).then(() => {
      if (cancelled) return
      setProgress(1)
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {}
      setPhase('exiting')
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (phase !== 'exiting') return
    const id = setTimeout(() => {
      document.documentElement.setAttribute('data-splash', 'off')
      setPhase('done')
    }, CURTAIN_MS)
    return () => clearTimeout(id)
  }, [phase])

  if (phase === 'done') return null

  const exiting = phase === 'exiting'
  const curtainBase =
    'cp-stage absolute inset-0 bg-background transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]'

  return (
    <div
      data-splash-root
      role="status"
      aria-live="polite"
      aria-label="Carregando Clown Payments"
      className={cn('fixed inset-0 z-[100]', exiting && 'pointer-events-none')}
    >
      <div
        className={curtainBase}
        style={{ clipPath: exiting ? 'inset(0 100% 0 0)' : 'inset(0 50% 0 0)' }}
      />
      <div
        className={curtainBase}
        style={{ clipPath: exiting ? 'inset(0 0 0 100%)' : 'inset(0 0 0 50%)' }}
      />

      <div
        className={cn(
          'relative flex h-full flex-col items-center justify-center gap-6 transition-opacity duration-300',
          exiting && 'opacity-0',
        )}
      >
        <div className="text-foreground [animation:cp-blood-pulse_1.6s_ease-in-out_1.2s_infinite]">
          <JesterMark draw className="size-24 md:size-28" strokeWidth={1.6} />
        </div>
        <p className="text-sm tracking-wide text-muted-foreground">Preparando o espetáculo</p>
      </div>

      <div className={cn('absolute inset-x-0 bottom-0 h-0.5 bg-border', exiting && 'opacity-0')}>
        <div
          className="h-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  )
}
