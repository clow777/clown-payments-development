import { Plus } from 'lucide-react'
import { Keyword, SectionHeading } from '@/components/clown/typography'

const testimonials = [
  {
    quote: 'Saí de três gateways que bloqueavam minha conta todo mês. Aqui o saque cai no mesmo dia e o bot libera o grupo sozinho.',
    name: 'Marina S.',
    role: 'Criadora · 12 mil assinantes',
  },
  {
    quote: 'O roteamento entre PSPs salvou uma sexta-feira inteira de depósitos quando nosso provedor antigo caiu.',
    name: 'Rafael M.',
    role: 'Head de pagamentos · operador licenciado',
  },
  {
    quote: 'Integrei a API numa tarde. Idempotência e webhooks assinados do jeito que deveria ser em todo lugar.',
    name: 'Lucas T.',
    role: 'CTO · plataforma de cursos',
  },
]

const faqs = [
  {
    q: 'Quais nichos a Clown Payments aceita?',
    a: 'Criadores de conteúdo adulto (somente maiores de 18 anos e com consentimento de todos os envolvidos), assinaturas, bots do Telegram, infoprodutos e operadores de apostas com licença válida. Conteúdo ilegal e atividades da lista proibida são bloqueados.',
  },
  {
    q: 'Em quanto tempo minha conta é aprovada?',
    a: 'A análise de KYC/KYB leva até 24h úteis com a documentação completa. Operadores de apostas só são liberados após a comprovação da licença.',
  },
  {
    q: 'Quando recebo o dinheiro das vendas?',
    a: 'Entre D+0 e D+2, conforme seu perfil de risco. Parte do saldo pode ficar em reserva rotativa, sempre com regra e prazo visíveis no seu extrato.',
  },
  {
    q: 'Como funciona o MED do PIX?',
    a: 'Quando um pagador abre uma contestação, o valor é bloqueado e você recebe o alerta no painel e no Telegram, com prazo para enviar evidências.',
  },
  {
    q: 'Posso testar antes de ir para produção?',
    a: 'Sim. O sandbox é idêntico à produção e permite simular pagamento, expiração e estorno com chaves sk_test_.',
  },
  {
    q: 'O nome Clown Payments aparece no extrato do cliente?',
    a: 'Você configura um descritor discreto dentro das regras do arranjo PIX.',
  },
]

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading id="depoimentos-title" eyebrow="Depoimentos">
          Quem já está no <Keyword>picadeiro</Keyword>.
        </SectionHeading>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-card/85 p-7 backdrop-blur-md">
                <blockquote className="text-pretty text-lg leading-relaxed text-foreground">
                  {'“'}
                  {t.quote}
                  {'”'}
                </blockquote>
                <figcaption className="flex flex-col text-sm">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ">
            Perguntas <Keyword>frequentes</Keyword>.
          </SectionHeading>
        </div>
        <div className="flex flex-col md:col-span-8">
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-border py-6 first:pt-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-bold text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pt-4 text-pretty leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
