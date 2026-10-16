'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CircusState } from '@/components/clown/circus-state'
import { Keyword } from '@/components/clown/typography'
import { Button, buttonVariants } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(JSON.stringify({ event: 'ui.error', message: error.message, digest: error.digest }))
  }, [error])

  return (
    <CircusState
      code={error.digest ? `Erro 500 · ${error.digest}` : 'Erro 500'}
      title={
        <>
          A lona <Keyword>rasgou</Keyword>.
        </>
      }
      description="Algo deu errado nos bastidores. Nosso time já foi avisado — nenhum pagamento foi afetado."
      actions={
        <>
          <Button size="lg" onClick={reset}>
            Tentar novamente
          </Button>
          <Link href="/" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
            Ir para o início
          </Link>
        </>
      }
    />
  )
}
