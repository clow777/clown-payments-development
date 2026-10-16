import { cn } from '@/lib/utils'

type JesterMarkProps = {
  className?: string
  draw?: boolean
  title?: string
  strokeWidth?: number
}

export function JesterMark({ className, draw = false, title, strokeWidth = 2.4 }: JesterMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(draw && 'cp-draw', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path pathLength={1} d="M13 50c6-3 12.5-4.5 19-4.5S45 47 51 50" />
      <path pathLength={1} d="M14 55.5c5.6-2.6 11.6-3.9 18-3.9s12.4 1.3 18 3.9" />
      <path pathLength={1} d="M16 48.5C15 35 10 25 3.5 29c5.5-9 18-6.5 22.5 11.5" />
      <path pathLength={1} d="M26 40.5C26.5 26 30 13 39 9.5c-5 7-2.5 19-1 31" />
      <path pathLength={1} d="M38 40.5C42.5 22.5 55 20 60.5 29 54 25 49 35 48 48.5" />
      <circle pathLength={1} cx="3.5" cy="33" r="2.6" />
      <circle pathLength={1} cx="42.2" cy="10.4" r="2.6" />
      <circle pathLength={1} cx="60.5" cy="33" r="2.6" />
    </svg>
  )
}

type LogoProps = {
  className?: string
  tone?: 'dark' | 'bone'
}

export function ClownLogo({ className, tone = 'dark' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <JesterMark className={cn('size-7', tone === 'bone' ? 'text-primary' : 'text-foreground')} />
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Clown<span className="text-primary">Pay</span>
      </span>
    </span>
  )
}
