import ScrollingPT from "@/components/sections/ScrollingPT/ScrollingPT"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import CTAB from "@/components/sections/CTAB/CTAB"
import HeroB from "@/components/sections/HeroB/HeroB"
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT"
import { ButtonVariant } from "@/components/elements/Button/Button"
import ContentB from "@/components/sections/ContentB/ContentB"
import ImageGalleryA from "@/components/sections/ImageGalleryA/ImageGalleryA"
import Feature from "@/components/sections/FeatureB/FeatureB"
import Section from "@/components/elements/Section/Section"
import Table from "@/components/elements/Table/Table"

const defaultPageData = {
  sections: {
    hero: {
      title: "We Style & You Smile Bright",
      subtitle: "",
      buttons: [
        {
          text: "Book Appointment",
          type: "black" as ButtonVariant
        },
      ],
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hero.webp"
      }
    },
    contentSection: {
      title: "Choose Your Salon Care",
      sections: [
        {
          title: "Hair Style",
          url: "/demos/sapphire/services/nail-treatment",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/icon-hair-style.png"
          },
        },
        {
          title: "Nail Treatment",
          url: "/demos/sapphire/services/nail-treatment",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/icon-nail-treatment.png"
          },
        },
        {
          title: "Facial Care",
          url: "/demos/sapphire/services/nail-treatment",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/icon-facial-care.png"
          },
        },
        {
          title: "Skin Care",
          url: "/demos/sapphire/services/nail-treatment",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/icon-skincare.png"
          },
        },
        {
          title: "Tanning",
          url: "/demos/sapphire/services/nail-treatment",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/icon-tanning.png"
          },
        },
        {
          title: "Auroma Therapy",
          url: "/demos/sapphire/services/nail-treatment",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/icon-auroma-therapy.png"
          },
        },
      ]
    },
    
    featureSection: {
      title: "Services to Make You Revived",
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-care.webp",
        altText: "Hair Care"
      },
      button: {
        url: "",
        text: "Learn More",
        type: "link-btn" as ButtonVariant
      }
    },
    imageGallery: {
      title: "Bride Makeover On Sapphire",
      button: {
        url: "/demos/sapphire/book-appointment",
        text: "Book Appointment",
        type: "standard" as ButtonVariant,
      },
      images: [
        {
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/bride-makeover-1.webp",
          altText: "Bride Makeup"
        },
        {
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/bride-makeover-2.webp",
          altText: "Bride Makeup"
        },
        {
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/bride-3.webp",
          altText: "Bride Makeup"
        },
        {
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/bride-4.webp",
          altText: "Bride Makeup"
        },
      ]
    },
    pricingSection: {
      title: "Comparatively The Best Service Pricing",
      table: {
        columns: ["SL", "Service Name", "Pricing"],
        rows: [
          ["HS01", "Hair Style", "$50"],
          ["NT01", "Nail Treatment", "$80"],
          ["FC01", "Facial Care", "$140"],
          ["SC01", "Skin Care", "$30"],
          ["TN01", "Tanning", "$190"],
          ["AT01", "Auroma Therapy", "$90"],
        ]
      }
    },
    cta: {
      title: "Grab the top 5k gift pack on summer",
      button: {
        text: "Shop now",
        url: "/shop",
        type: "standard" as ButtonVariant
      }
    }
  }
}

export default function Home() {

  const { hero, contentSection, imageGallery, featureSection, pricingSection, cta } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <HeroB data={hero} />
      <ContentB data={contentSection} variant="alternate" />
      <Feature data={featureSection} />
      <ImageGalleryA data={imageGallery} />
      <CTAB data={cta}/>
    </main>
  )
}
