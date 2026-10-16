import Link from 'next/link'
import { ClownLogo } from '@/components/clown/jester-logo'
import { buttonVariants } from '@/components/ui/button'

const navItems = [
  { href: '#recursos', label: 'Recursos' },
  { href: '#nichos', label: 'Nichos' },
  { href: '#taxas', label: 'Taxas' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#faq', label: 'FAQ' },
]

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Clown Payments — início">
          <ClownLogo />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#api" className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'hidden sm:inline-flex' })}>
            Documentação
          </a>
          <Link href="/auth/login" className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'hidden sm:inline-flex' })}>
            Entrar
          </Link>
          <a href="/auth/cadastro" className={buttonVariants({ size: 'sm' })}>
            Abrir conta
          </a>
        </div>
      </div>
    </header>
  )
}
