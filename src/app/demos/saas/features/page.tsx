'use client'

import ExpandingCTA from "@/components/sections/ExpandingCTA/ExpandingCTA"
import FeaturesHero from "@/components/sections/FeaturesHero/FeaturesHero"
import Timeline from "@/components/sections/Timeline/Timeline"
import Accordion from "@/components/elements/Accordion/Accordion"

export default function Features() {
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24">
      <FeaturesHero />
      <Timeline />
      <section className="px-4 lg:px-32 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-semibold mb-10 text-center">
            Frequently asked questions
          </h2>
          <Accordion />
        </div>
      </section>
      <ExpandingCTA />
    </main>
  )
}
