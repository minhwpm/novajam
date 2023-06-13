import ExpandingCTA from "@/components/sections/ExpandingCTA/ExpandingCTA"
import Hero from "@/components/sections/Hero/Hero"
import { ButtonVariant } from "@/components/elements/Button/Button"
import GridBox from "@/components/elements/GridBox/GridBox"
import Section from "@/components/elements/Section/Section"
import Card from "@/components/elements/Card/Card"

const defaultPageData = {
  sections: {
    hero: {
      label: "WELCOME TO BLUEBIZ",
      title: "Make your website come true with",
      subtitle:
        "Bluebiz is a Multipurpose Modular Theme for small and medium businesses with high performance React - NextJS technology.",
      buttons: [
        {
          text: "Buy now",
          type: "primary" as ButtonVariant
        },
        {
          text: "Live Demo",
          url: "#demos",
          type: "secondary" as ButtonVariant
        },
      ],
      slidingTexts: [
        { text: "Manifold Theme"},
        { text: "Modular UI"},
        { text: "Custom Pages"},
      ]
    },
    features: {
      label: "Eye-Catching Demos",
      title: "Explore our Pre-Designed Pages",
      sections: [
        
        {
          label: "Esmeralda",
          title: "University",
          image: {
            src: "",
            altText: ""
          },
          url: "/demos/education/"
        },
        {
          label: "Celestial",
          title: "Saas",
          image: {
            src: "",
            altText: ""
          },
          url: "/demos/saas/"
        },
        {
          label: "Aquarium",
          title: "Health Care",
          image: {
            src: "",
            altText: ""
          },
          url: "/demos/health-care/"
        },
      ]
    },
    cta: {
      title: "Grow your business plan with Bluebiz",
      subtitle: "Easy-to-setup > Easy-to-use > Easy-to-scale with 6-month support services.",
      button: {
        text: "Buy now",
      }
    }
  }
}
export default function Home() {
  const { hero, features, cta} = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24">
      <Hero data={hero} />
      <Section
        label={features.label}
        title={features.title}
        id="demos"
      >
        <GridBox gap={9} columns={3} >
          {features.sections.map(section => (
            <Card key={section.title} data={section} aspectRatio="4/3" imagePosition="top" />
          ))}
        </GridBox>
      </Section>
      <ExpandingCTA data={cta} />
    </main>
  )
}
