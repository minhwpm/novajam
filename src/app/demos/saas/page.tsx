import ScrollingPresentation from "@/components/sections/ScrollingPresentation/ScrollingPresentation"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import Hero from '@/components/sections/Hero/Hero'
import ExpandingCTA from "@/components/sections/ExpandingCTA/ExpandingCTA"
import FeaturesHero from "@/components/sections/FeaturesHero/FeaturesHero"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24">
      <Hero />
      <ScrollingPresentation />
      <Testimonials />
      <ExpandingCTA />
    </main>
  )
}
