import { cn } from '@/lib/utils'

export function Keyword({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>
}

type SectionHeadingProps = {
  eyebrow?: string
  children: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  children,
  description,
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-4xl text-balance md:text-section">
        {children}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
