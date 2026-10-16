import Link from 'next/link'
import { ClownLogo } from '@/components/clown/jester-logo'

export function AuthShell({
  title,
  keyword,
  description,
  children,
}: {
  title: string
  keyword: string
  description: string
  children: React.ReactNode
}) {
  return (
    <main className="cp-stage flex min-h-svh items-center justify-center px-4 py-12">
      <div className="relative z-10 flex w-full max-w-lg flex-col gap-8">
        <Link href="/" aria-label="Clown Payments — início" className="self-center">
          <ClownLogo />
        </Link>
        <div className="flex flex-col gap-3 text-center">
          <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-foreground text-balance md:text-5xl">
            {title} <span className="text-primary">{keyword}</span>
          </h1>
          <p className="text-pretty">{description}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/90 p-6 backdrop-blur-md md:p-8">{children}</div>
      </div>
    </main>
  )
}
