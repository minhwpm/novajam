'use client'

import ExpandingCTA from "@/components/celestial/ExpandingCTA/ExpandingCTA"
import Accordion from "@/components/elements/Accordion/Accordion"

const defaultPageData = {
  sections: {
    
    cta: {
      title: "Grow your business plan with Bluebiz",
      subtitle: "Easy-to-setup > Easy-to-use > Easy-to-scale with 6-month support services.",
      button: {
        text: "Buy now",
      }
    }
  }
}

export default function Features() {
  const { cta } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24">
      <section className="px-4 lg:px-32 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-semibold mb-10 text-center">
            Frequently asked questions
          </h2>
          <Accordion />
        </div>
      </section>
      <ExpandingCTA data={cta} />
    </main>
  )
}
