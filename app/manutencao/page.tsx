import type { Metadata } from 'next'
import { CircusState } from '@/components/clown/circus-state'
import { Keyword } from '@/components/clown/typography'

export const metadata: Metadata = {
  title: 'Manutenção programada',
  robots: { index: false },
}

export default function MaintenancePage() {
  return (
    <CircusState
      code="Intervalo"
      title={
        <>
          Trocando o <Keyword>cenário</Keyword>.
        </>
      }
      description="Estamos em manutenção programada para deixar o próximo ato ainda melhor. Cobranças PIX já emitidas continuam sendo confirmadas normalmente."
      actions={
        <p className="rounded-full border border-border bg-card/60 px-5 py-2 text-sm text-foreground backdrop-blur-md">
          Previsão de retorno: hoje, 04h00 (BRT)
        </p>
      }
    />
  )
}
