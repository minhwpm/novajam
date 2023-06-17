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
    },
    presentationSection2: {
      label: "",
      title: "Make customer experience your competitive advantage",
      subtitle: "",
      slides: [
        {
          label: "",
          title: "Start conversations, win loyal customers",
          subtitle: "",
          content:
          "Chat with customers. Solve their problems in real time. Offer custom discounts based on browsing history. And make product recommendations based on their behavior.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f1.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "Automate answers and workflows in minutes",
          subtitle: "",
          content:
          "Automate up to 47% of repetitive answers about shipping, order status, or product availability so your agents can advise on complex topics.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f2.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "Turn visitors into paying customers",
          subtitle: "",
          content:
          "Make the most of your website traffic with sales chatbots designed to boost your revenue by 10-25%.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f3.webp",
          },
          url: ""
        },
      ]
    }
  }
}

export default function Home() {

  const { presentationSection, presentationSection2 } = defaultPageData.sections
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
      <Section title={presentationSection2.title}>
        <ScrollingPresentation />
      </Section>
      <Testimonials />
      <ExpandingCTA />
    </main>
  )
}
