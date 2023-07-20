import CTAB from "@/components/sections/CTAB/CTAB"
import Hero from "@/components/sections/Hero/Hero"
import { ButtonVariant } from "@/components/elements/Button/Button"
import Section from "@/components/elements/Section/Section"
import ContentPreview from "@/components/elements/ContentPreview/ContentPreview"

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
          type: "standard" as ButtonVariant
        },
        {
          text: "Live Demo",
          url: "#demos",
          type: "alternate" as ButtonVariant
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
          label: "SaaS",
          title: "Celestial",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/thumbnail_celestial.webp",
            altText: "Celestial"
          },
          url: "/demos/saas/"
        },
        {
          label: "Education",
          title: "Blueberry",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/thumbnail_blueberry.webp",
            altText: "Blueberry"
          },
          url: "/demos/blueberry/"
        },
        {
          label: "Health Care",
          title: "Nova",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/thumbnail_nova.webp",
            altText: "Nova",
          },
          url: "/demos/nova/"
        },
        {
          label: "Beauty Salon",
          title: "Sapphire",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/thumbnail_sapphire.webp",
            altText: "Sapphire"
          },
          url: "/demos/sapphire/"
        },
      ]
    },
    cta: {
      title: "Grow your business plan with Bluebiz",
      subtitle: "Easy-to-setup > Easy-to-use > Easy-to-scale with 6-month support services.",
      button: {
        text: "Buy now",
        type: "standard" as ButtonVariant
      }
    }
  }
}
export default function Home() {
  const { hero, features, cta} = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24 bg-slate-50">
      <Hero data={hero} />
      <Section
        label={features.label}
        title={features.title}
        id="demos"
        
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.sections.map(section => (
            <ContentPreview key={section.title} data={section} aspectRatio="4/3" mediaPosition="top" />
          ))}
        </div>
      </Section>
      <CTAB data={cta} />
    </main>
  )
}
