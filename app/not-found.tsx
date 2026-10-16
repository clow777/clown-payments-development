import Link from 'next/link'
import { CircusState } from '@/components/clown/circus-state'
import { Keyword } from '@/components/clown/typography'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <CircusState
      code="Erro 404"
      title={
        <>
          Este número saiu do <Keyword>programa</Keyword>.
        </>
      }
      description="A página que você procura sumiu como num truque de mágica. Talvez nunca tenha existido."
      actions={
        <Link href="/" className={buttonVariants({ size: 'lg' })}>
          Voltar ao picadeiro
        </Link>
      }
    />
  )
}
