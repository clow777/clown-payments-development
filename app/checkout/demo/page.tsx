import type { Metadata } from 'next'
import { CheckoutDemo } from '@/components/checkout/checkout-demo'

export const metadata: Metadata = {
  title: 'Checkout PIX (sandbox)',
  description: 'Demonstração do checkout hospedado PIX da Clown Payments em modo sandbox.',
  robots: { index: false },
}

export default function CheckoutDemoPage() {
  return (
    <main className="cp-stage flex min-h-svh items-center justify-center px-5 py-12">
      <CheckoutDemo />
    </main>
  )
}
