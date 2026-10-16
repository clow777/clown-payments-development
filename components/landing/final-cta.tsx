import Link from 'next/link'
import { ClownLogo } from '@/components/clown/jester-logo'
import { Keyword } from '@/components/clown/typography'
import { LeadForm } from './lead-form'

export function FinalCta() {
  return (
    <section id="abrir-conta" aria-labelledby="cta-title" className="cp-stage scroll-mt-16 overflow-hidden border-t border-border py-24 md:py-36">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-5 text-center md:px-8">
        <div className="flex flex-col items-center gap-6">
          <h2 id="cta-title" className="text-5xl text-balance md:text-hero">
            O picadeiro é <Keyword>seu</Keyword>.
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed md:text-lg">
            Deixe seu contato e um especialista em alto risco ajuda a configurar sua conta, o checkout e o bot.
          </p>
        </div>
        <div className="relative w-full">
          <LeadForm />
        </div>
        <p
          aria-label="Assinatura ClownPay"
          className="-rotate-6 select-none font-script text-6xl text-foreground/90 [text-shadow:0_0_1px_var(--foreground),0_0_24px_color-mix(in_oklab,var(--foreground)_15%,transparent)] md:text-8xl"
        >
          ClownPay
        </p>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-col gap-3">
          <ClownLogo />
          <p className="max-w-sm text-xs leading-relaxed">
            Proibido para menores de 18 anos. Jogue com responsabilidade. Operações de apostas somente com licença válida.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <a href="#taxas" className="hover:text-foreground">Taxas</a>
          <a href="#seguranca" className="hover:text-foreground">Compliance</a>
          <Link href="/design-system" className="hover:text-foreground">Design system</Link>
          <Link href="/checkout/demo" className="hover:text-foreground">Checkout demo</Link>
          <Link href="/manutencao" className="hover:text-foreground">Status</Link>
        </nav>
        <p className="text-xs">© {new Date().getFullYear()} Clown Payments</p>
      </div>
    </footer>
  )
}
