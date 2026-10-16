import { SiteHeader } from '@/components/landing/site-header'
import { Hero } from '@/components/landing/hero'
import { ProofStrip } from '@/components/landing/proof-strip'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Features } from '@/components/landing/features'
import { Niches } from '@/components/landing/niches'
import { Pricing } from '@/components/landing/pricing'
import { Security } from '@/components/landing/security'
import { Faq, Testimonials } from '@/components/landing/testimonials-faq'
import { FinalCta, SiteFooter } from '@/components/landing/final-cta'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProofStrip />
        <HowItWorks />
        <Features />
        <Niches />
        <Pricing />
        <Security />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
