'use client'

import Testimonials from '@/components/sections/Testimonials/Testimonials'
import ExpandingCTA from "@/components/sections/ExpandingCTA/ExpandingCTA"
import FeaturesHero from "@/components/sections/FeaturesHero/FeaturesHero"
import Timeline from "@/components/sections/Timeline/Timeline"

export default function Features() {
  return (
    <main className="flex flex-col min-h-screen gap-20 py-16">
      <FeaturesHero />
      <Timeline />
      <Testimonials />
      <ExpandingCTA />
    </main>
  )
}
