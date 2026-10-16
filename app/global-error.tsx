'use client'

import './globals.css'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body>
        <main className="cp-stage flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Erro 500</p>
          <h1 className="text-5xl text-balance">
            O circo <span className="text-primary">parou</span>.
          </h1>
          <p className="max-w-md leading-relaxed">Uma falha crítica interrompeu o espetáculo. Tente recarregar.</p>
          <button
            type="button"
            onClick={reset}
            className="h-12 rounded-full bg-primary px-7 font-medium text-primary-foreground transition-transform duration-200 hover:scale-105"
          >
            Recarregar
          </button>
        </main>
      </body>
    </html>
  )
}
