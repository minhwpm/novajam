'use client'

import ScrollingPresentation from "@/components/sections/ScrollingPresentation/ScrollingPresentation"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import ExpandingCTA from "@/components/sections/ExpandingCTA/ExpandingCTA"
import FeaturesHero from "@/components/sections/FeatureHero/FeatureHero"
import AccordionPT from "@/components/celestial/AccordionPT/AccordionPT"
import Timeline from "@/components/sections/Timeline/Timeline"
import Section from "@/components/elements/Section/Section"
import Accordion from "@/components/elements/Accordion/Accordion"

const defaultPageData = {
  sections: {
    presentationSection: {
      label: "",
      title: "Chatbots can reduce your customer support team’s workload",
      subtitle: "Reduce your customer support team’s duties, so your agents can focus on more complex issues.",
      slides: [
        {
          label: "",
          title: "Automate answers to repetitive questions",
          subtitle: "",
          content: "Include chatbots in your conversation to step in and handle the most repetitive actions like checking order status and processing returns.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/feature1.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "Easily segment users",
          subtitle: "",
          content: "Easily group website visitors and customers based on their behavior to send them personalized messages.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/feature2.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "Notify operators about specific actions",
          subtitle: "",
          content: "Notify operators when the customer closes the chat window, wants to leave the website, or wants to set up a conversation with a human agent.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/feature3.webp",
          },
          url: ""
        }

      ]
    }
  }
}

export default function Home() {

  const { presentationSection } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24">
      <FeaturesHero />
      <Timeline />
      <Section
        title={presentationSection.title}
        subtitle={presentationSection.subtitle}
      >
        <AccordionPT data={presentationSection.slides} />
      </Section>
      <ScrollingPresentation />
      <Testimonials />
      <ExpandingCTA />
    </main>
  )
}
