import { Fingerprint, LockKeyhole, ScrollText, UserCheck } from 'lucide-react'
import { Keyword, SectionHeading } from '@/components/clown/typography'

const items = [
  {
    icon: UserCheck,
    title: 'KYC e KYB',
    body: 'Liveness, documentos, beneficiário final e consulta a listas de sanções e PEP antes de qualquer centavo.',
  },
  {
    icon: LockKeyhole,
    title: 'Criptografia',
    body: 'TLS 1.3 em trânsito, AES-256 em repouso com KMS, segredos em vault e senhas com Argon2id.',
  },
  {
    icon: ScrollText,
    title: 'Auditoria imutável',
    body: 'Toda ação registra ator, IP, device e horário. Ledger de dupla entrada: saldo nunca é editado, só derivado.',
  },
  {
    icon: Fingerprint,
    title: 'LGPD',
    body: 'Base legal documentada, portal do titular para exportar e excluir dados e retenção conforme a lei.',
  },
]

export function Security() {
  return (
    <section id="seguranca" aria-labelledby="seguranca-title" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <SectionHeading
            id="seguranca-title"
            eyebrow="Segurança e compliance"
            description="Alto risco não é terra sem lei. É exatamente onde controle sério separa quem fica de quem é bloqueado."
          >
            Elegante por fora. <Keyword>Blindada</Keyword> por dentro.
          </SectionHeading>
        </div>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 md:col-span-7">
          {items.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-3 bg-card p-7">
              <Icon aria-hidden="true" className="size-6 text-primary" />
              <h3 className="text-lg">{title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
