import { Bot, Code2, GitFork, ScanLine, ShieldAlert, Wallet, Zap } from 'lucide-react'
import { Keyword, SectionHeading } from '@/components/clown/typography'
import { cn } from '@/lib/utils'

type Feature = {
  id?: string
  icon: typeof Zap
  title: string
  body: string
  className: string
  extra?: React.ReactNode
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'PIX instantâneo',
    body: 'QR Code dinâmico e copia-e-cola, roteamento entre múltiplos PSPs com fallback automático e circuit breaker. Se um cai, o próximo assume.',
    className: 'md:col-span-4',
    extra: (
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {['PSP A · 99,4%', 'PSP B · 98,9%', 'PSP C · standby'].map((psp, i) => (
          <span
            key={psp}
            className={cn(
              'rounded-full border px-3 py-1 text-xs',
              i === 0 ? 'border-primary/50 text-foreground' : 'border-border text-muted-foreground',
            )}
          >
            {psp}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Bot,
    title: 'Bot do Telegram',
    body: 'Venda, cobre e libere acesso a grupos VIP sem sair do Telegram. Notificação de cada venda em tempo real.',
    className: 'md:col-span-2',
    extra: (
      <div className="mt-auto pt-6">
        <div className="rounded-xl rounded-bl-sm border border-border bg-background/70 p-3 text-xs">
          <p className="text-primary">Venda paga · R$ 49,90</p>
          <p className="text-muted-foreground">Plano VIP mensal · @joao_v</p>
        </div>
      </div>
    ),
  },
  {
    icon: ScanLine,
    title: 'Checkout de alta conversão',
    body: 'Uma tela, carregamento abaixo de 1s, order bump, upsell e pixels de conversão.',
    className: 'md:col-span-2',
  },
  {
    icon: GitFork,
    title: 'Split de pagamentos',
    body: 'Divida cada venda entre criadores, afiliados e parceiros por percentual ou valor fixo.',
    className: 'md:col-span-2',
  },
  {
    icon: Wallet,
    title: 'Saque D+0',
    body: 'Saldo liberado no mesmo dia para chaves PIX validadas em nome do titular.',
    className: 'md:col-span-2',
  },
  {
    icon: ShieldAlert,
    title: 'Antifraude nativo',
    body: 'Velocidade por CPF, IP e device, fingerprint, listas de bloqueio e score por transação. Monitoramento de MED com alertas.',
    className: 'md:col-span-3',
  },
  {
    id: 'api',
    icon: Code2,
    title: 'API e webhooks',
    body: 'REST v1 com chaves sk_live_ / sk_test_, Idempotency-Key, paginação por cursor e webhooks HMAC com retry por 24h.',
    className: 'md:col-span-3',
    extra: (
      <pre className="mt-auto overflow-x-auto rounded-xl border border-border bg-background/70 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>
          <span className="text-foreground">curl</span> https://api.clownpay.com.br/v1/charges \{'\n'}
          {'  '}-H <span className="text-primary">{'"Authorization: Bearer sk_test_..."'}</span> \{'\n'}
          {'  '}-H <span className="text-primary">{'"Idempotency-Key: ord_8f2a"'}</span> \{'\n'}
          {'  '}-d amount=4990 -d method=pix
        </code>
      </pre>
    ),
  },
]

export function Features() {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className="bg-background py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading
          id="recursos-title"
          eyebrow="Recursos"
          description="Tudo que um lojista de alto risco precisa para vender, sem remendo e sem conta bloqueada do nada."
        >
          O arsenal <Keyword>completo</Keyword>.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {features.map(({ id, icon: Icon, title, body, className, extra }) => (
            <article
              key={title}
              id={id}
              className={cn(
                'flex scroll-mt-24 flex-col gap-4 rounded-2xl border border-border bg-card/85 p-7 backdrop-blur-md',
                className,
              )}
            >
              <Icon aria-hidden="true" className="size-6 text-primary" />
              <h3 className="text-xl">{title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{body}</p>
              {extra}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
