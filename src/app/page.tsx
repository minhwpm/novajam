'use client'
import FeatureRow from "@/components/sections/FeatureRow/FeatureRow"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import Hero from '@/components/sections/Hero/Hero'
import ExpandingCTA from "@/components/sections/ExpandingCTA/ExpandingCTA"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-20 py-24">
      <Hero />
      <FeatureRow />
      <Testimonials />
      <ExpandingCTA />
    </main>
  )
}
