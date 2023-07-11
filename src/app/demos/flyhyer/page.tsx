import HeroC from "@/components/sections/HeroC/HeroC"
import TabPT from "@/components/sections/TabPT/TabPT"
import CTA from "@/components/sections/CTA/CTA"
import { ButtonVariant } from "@/components/elements/Button/Button"
import ContentB from "@/components/sections/ContentB/ContentB"
import Feature from "@/components/sections/FeatureB/FeatureB"

const defaultPageData = {
  sections: {
    heroSection: {
      label: "Welcome to Fly Hyer",
      title: "Personalised Aviation",
      subtitle: "More flexibility, freedom and choice!",
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/flyhyper/1612349563-woman-on-a-business-jet-b.jpg",
      },
      buttons: [
        {
          text: "Book an Aircraft",
          type: "standard" as ButtonVariant
        },
        {
          text: "Book an Shared Flight",
          type: "alternate" as ButtonVariant
        },
      ],
    },
    presentationSection1: {
      label: "Flexible Services",
      title: "Smart solutions for all your charter requirements",
      subtitle: "",
      sections: [
        {
          title: "On-Demand",
          content: "Book your aircraft. Customize all aspects of your journey. Fly on your terms. When you want, where you want. Flying On-Demand gives you the total control of your flight and an unbeatable level of service at competitive rates. No hidden fees, no upfront investment or jet card payments.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/flyhyper/1611761434-perseat2.jpg",
          },
          link: {
            text: "Learn more",
            url: "/solutions/on-demand"
          }
        },
        {
          title: "Shared Flights",
          subtitle: "",
          content: "Fly on Hyer® exclusive routes booking a seat. Flying on a shared flight with like-minded people gives you the convenience and comfort that only private aviation can provide, for a fraction of the price.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/flyhyper/1622551830-picture-phenon-300-interior-by-hyer-aviation.jpeg",
          },
          link: {
            text: "Learn more",
            url: "/solutions/shared"
          }
        },
        {
          title: "Memberships",
          subtitle: "",
          content: "Our membership program is innovative, bold and offers even more personalisation and flexibility. You will start enjoying the benefits straight away.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/flyhyper/1611670107-hyer-pay-as-you-go.avif",
          },
          link: {
            text: "Learn more",
            url: ""
          }
        }

      ]
    },
    featureSection: {
      title: "Flight Manager",
      content: "All of our flights come with complimentary Flight Manager Service. Your dedicated Flight Manager ensures that every detail of your flight is taken care of and you get the most competitive tailor-made offers. Speak with your Flight Manager in English 🇬🇧, Dutch 🇳🇱, German 🇩🇪, Spanish 🇪🇸 or Portuguese 🇵🇹.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/flyhyper/1611581927-hyer-personal-flight-manager.avif",
        altText: "Flight Manager"
      }
    },
    contentSection: {
      title: "We believe that in a world where passengers have become numbers, a personal approach is key to ensure you get the most out of your flying experience.",
      sections: [
        {
          title: "Flexible Solutions",
          content: "Stop depending on airlines. Fly on your own terms or join our exclusive shared flights.",
        },
        {
          title: "Smart Quotes",
          content: "Know what you are paying for. No hidden fees. No overpromises. Flights suitable for your needs.",
        },
        {
          title: "Fully Customizable",
          content: "Control all aspects of your journey. Easily upgrade services with our add-ons.",
        },
        {
          title: "Personalization",
          content: "Receive full support of our Flight Management service. We have you covered, anywhere.",
        },
      ]
    },
    contentSection2: {
      title: "Hyer® Experience",
      subtitle: "At Hyer® we are bold. The aircraft is just a tool we use to get you where you want to be. Our clients enjoy much more value for their investment, accessing unparalleled personalisation when flying private. We offer personalised experiences with our on-demand charters and personalised flexibility with our exclusive shared flight.  We upgrade the way you fly.",
      sections: [
        {
          title: "Rewarding Membership",
          content: "Our membership blends the advantage of a jet card with the easiness of a loyalty program. Get access to services not available anywhere without hefty fees.",
        },
        {
          title: "Exclusive Shared Flights",
          content: "Clients can book a seat on selected routes, sharing the costs with like-minded people. Experience the benefits of flying private for a fraction of the price.",
        },
        {
          title: "CO2 Neutral Flights",
          content: "We play our part to ensure a more sustainable future. Via Hyer® CO2 offset program, clients can offset the entire emission of their flights.",
        },
        {
          title: "Digital Care",
          content: "We don't do business as if it was the 80's. Receive instant estimates online. Get a quote with one click. Book your aircraft via a seamless process.",
        },
        {
          title: "Service Add-ons",
          content: "Avoid hidden fees and pay only for the service that you need. Upgrade your flight with multiple add-ons. Shape your trip to meet your requirements.",
        },
        {
          title: "Personal Flight Manager",
          content: "Our experts can support any trip and request, 24/07. From short business trips to large groups crossing the globe for leisure. Enjoy a stress-free booking process.",
        }
      ]
    },
    cta: {
      title: "What are you waiting for?",
      button: {
        text: "Book a flight",
        url: "/contact",
        type: "outline" as ButtonVariant,
      }
    }
  }
}

export default function Home() {
  const { heroSection, presentationSection1, featureSection, contentSection, contentSection2, cta } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <HeroC data={heroSection} />
      <ContentB data={contentSection} />
      <TabPT data={presentationSection1} />
      <Feature data={featureSection} />
      <ContentB data={contentSection2} />
      <CTA data={cta} />
    </main>
  )
}
