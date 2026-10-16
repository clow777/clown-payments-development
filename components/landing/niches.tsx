import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { Keyword, SectionHeading } from '@/components/clown/typography'

const niches = [
  {
    title: 'Criadores e Assinaturas',
    image: '/images/niche-creators.png',
    alt: 'Smartphone em tripé diante de um ring light com luz vermelha',
    points: ['Assinaturas recorrentes via PIX', 'Liberação automática de grupos VIP', 'Split entre criadores e agências'],
    compliance: 'Verificação 18+ e consentimento de todos os envolvidos',
  },
  {
    title: 'Cassino e Bets',
    image: '/images/niche-casino.png',
    alt: 'Fichas de cassino pretas e vermelhas com um dado sobre feltro escuro',
    points: ['Depósito rápido com valores sugeridos', 'Crédito instantâneo por webhook', 'Limites de depósito e autoexclusão'],
    compliance: 'Somente operadores com licença válida no mercado em que atuam',
  },
  {
    title: 'Infoprodutos',
    image: '/images/niche-info.png',
    alt: 'Notebook aberto com brilho vermelho sobre uma mesa escura',
    points: ['Checkout com order bump e upsell', 'Links de pagamento e cupons', 'Comissões de afiliados automáticas'],
    compliance: 'Política de uso aceitável e reembolso transparente',
  },
]

export function Niches() {
  return (
    <section id="nichos" aria-labelledby="nichos-title" className="bg-background py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 md:px-8">
        <SectionHeading
          id="nichos-title"
          eyebrow="Nichos"
          description="Feita para quem os bancos tradicionais recusam — com as regras certas para cada operação."
        >
          Onde os outros dizem <Keyword>não</Keyword>.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {niches.map((niche) => (
            <article
              key={niche.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/85 backdrop-blur-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={niche.image || '/placeholder.svg'}
                  alt={niche.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="flex flex-1 flex-col gap-5 p-7">
                <h3 className="text-2xl">{niche.title}</h3>
                <ul className="flex flex-col gap-2 text-sm">
                  {niche.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto flex items-start gap-2 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-foreground" />
                  {niche.compliance}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
