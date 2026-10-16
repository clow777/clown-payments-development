import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Rock_Salt } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/sonner'
import { Splash, splashBootScript } from '@/components/clown/splash'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-satoshi',
  fallback: ['Inter', 'system-ui', 'sans-serif'],
})

const chalk = Rock_Salt({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
  variable: '--font-chalk',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clownpayments.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Clown Payments — Receba sem limites via PIX',
    template: '%s · Clown Payments',
  },
  description:
    'Gateway de pagamentos PIX para criadores de conteúdo, assinaturas, bots do Telegram e iGaming licenciado. Checkout de alta conversão, saque D+0, API e webhooks.',
  keywords: [
    'gateway de pagamento',
    'PIX',
    'alto risco',
    'iGaming',
    'criadores de conteúdo',
    'assinaturas',
    'bot Telegram',
    'checkout PIX',
  ],
  applicationName: 'Clown Payments',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Clown Payments',
    title: 'Clown Payments — Receba sem limites via PIX',
    description:
      'PIX instantâneo, checkout de alta conversão, bot do Telegram e saque D+0. Integre em minutos.',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'Clown Payments' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clown Payments — Receba sem limites via PIX',
    description: 'PIX instantâneo, checkout de alta conversão e saque D+0.',
    images: ['/images/og.png'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${satoshi.variable} ${chalk.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />
      </head>
      <body>
        <Splash />
        {children}
        <Toaster position="bottom-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
