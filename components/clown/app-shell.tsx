import {
  ArrowLeftRight,
  Bell,
  Bot,
  CreditCard,
  LayoutDashboard,
  Link2,
  Search,
  Settings,
  ShieldAlert,
  Users,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ClownLogo } from './jester-logo'

const nav = [
  { label: 'Visão geral', icon: LayoutDashboard },
  { label: 'Transações', icon: ArrowLeftRight },
  { label: 'Clientes', icon: Users },
  { label: 'Cobranças e links', icon: Link2 },
  { label: 'Assinaturas', icon: CreditCard },
  { label: 'Financeiro', icon: Wallet },
  { label: 'Disputas', icon: ShieldAlert },
  { label: 'Bot Telegram', icon: Bot },
  { label: 'Configurações', icon: Settings },
]

export function Sidebar({ active = 'Visão geral' }: { active?: string }) {
  return (
    <aside aria-label="Navegação do painel" className="hidden w-60 shrink-0 flex-col gap-8 border-r border-sidebar-border bg-sidebar p-5 md:flex">
      <ClownLogo />
      <nav>
        <ul className="flex flex-col gap-1">
          {nav.map(({ label, icon: Icon }) => {
            const isActive = label === active
            return (
              <li key={label}>
                <a
                  href="#"
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
                  )}
                >
                  <Icon aria-hidden="true" className={cn('size-4', isActive && 'text-primary')} />
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border px-5 md:px-8">
      <h2 className="text-lg">{title}</h2>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="hidden items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          <Search aria-hidden="true" className="size-4" />
          Buscar
          <kbd className="rounded-md border border-border px-1.5 font-sans text-xs">⌘K</kbd>
        </button>
        <button
          type="button"
          aria-label="Notificações"
          className="relative flex size-10 items-center justify-center rounded-full border border-border text-foreground"
        >
          <Bell aria-hidden="true" className="size-4" />
          <span aria-hidden="true" className="absolute top-2 right-2.5 size-2 rounded-full bg-primary" />
        </button>
        <span className="flex size-10 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-foreground">
          EN
        </span>
      </div>
    </header>
  )
}
