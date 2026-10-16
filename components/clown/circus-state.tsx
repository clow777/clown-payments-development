import { JesterMark } from './jester-logo'

type CircusStateProps = {
  code?: string
  title: React.ReactNode
  description: string
  actions?: React.ReactNode
}

export function CircusState({ code, title, description, actions }: CircusStateProps) {
  return (
    <main className="cp-stage flex min-h-svh flex-col items-center justify-center gap-8 px-5 py-16 text-center">
      <JesterMark className="size-16 text-foreground" strokeWidth={1.6} />
      {code ? (
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">{code}</p>
      ) : null}
      <h1 className="max-w-3xl text-5xl text-balance md:text-hero">{title}</h1>
      <p className="max-w-lg text-pretty leading-relaxed md:text-lg">{description}</p>
      {actions ? <div className="flex flex-col items-center gap-3 sm:flex-row">{actions}</div> : null}
    </main>
  )
}
