'use client'

import ExpandingCTA from "@/components/sections/ExpandingCTA/ExpandingCTA"
import FeaturesHero from "@/components/sections/FeaturesHero/FeaturesHero"
import Accordion from "@/components/elements/Accordion/Accordion"
import Card from "@/components/elements/Card/Card"
import FlexBox from "@/components/elements/FlexBox/FlexBox"
import GridBox from "@/components/elements/GridBox/GridBox"

const dummyData = {
  sections: {
    featuresSection: {
      title: "Great live chat features at a great price",
      subtitle: "No credit card required",
      sections: [
        {
          title: "Viewed pages",
          content: "Track your visitors. See which pages of your website they browse and personalize your communication.",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/hero.webp",
            altText: "",
          },
          url: "/feature"
        },
        {
          title: "Live Visitors List",
          content: "Get a real-time overview of all the visitors on your website or store. See what they are interested in."
        },
        {
          title: "Live typing",
          content: "See what your customers are typing in real time and have your replies ready to send."
        },
        {
          title: "Live typing 2",
          content: "See what your customers are typing in real time and have your replies ready to send."
        },
        {
          title: "Live typing 3",
          content: "See what your customers are typing in real time and have your replies ready to send."
        },
        {
          title: "Live typing 4",
          content: "See what your customers are typing in real time and have your replies ready to send."
        },
        {
          title: "Live typing 5",
          content: "See what your customers are typing in real time and have your replies ready to send."
        },
      ]
    }
  }
}

export default function Features( { data = dummyData }) {
  const { featuresSection } = data.sections
  return (
    <main className="flex flex-col min-h-screen gap-20 py-16">
      <FeaturesHero />
      <section className="">
        <h2 className="text-4xl leading-snug lg:text-5xl lg:leading-snug font-semibold text-center">
          {featuresSection.title}
        </h2>
        <p className="text-lg lg:text-xl font-medium text-center">
          {featuresSection.subtitle}
        </p>
        <FlexBox className="px-4 lg:px-32" gap={9} horizontalScrollable>
          {featuresSection.sections.map(section => (
            <Card key={section.title} data={section} aspectRatio="video" rounded shadow imagePosition="overlay" />
          ))}
        </FlexBox>
      </section>

      <section className="px-4 lg:px-32">
        <h2 className="text-4xl leading-snug lg:text-5xl lg:leading-snug font-semibold text-center">
          {featuresSection.title}
        </h2>
        <p className="text-lg lg:text-xl font-medium text-center">
          {featuresSection.subtitle}
        </p>
        <GridBox gap={9} columns={3} >
          {featuresSection.sections.map(section => (
            <Card key={section.title} data={section} aspectRatio="3/2" border rounded imagePosition="top" />
          ))}
        </GridBox>
      </section>

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
