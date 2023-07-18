import ScrollingPT from "@/components/sections/ScrollingPT/ScrollingPT"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import CTAB from "@/components/sections/CTAB/CTAB"
import HeroB from "@/components/sections/HeroB/HeroB"
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT"
import { ButtonVariant } from "@/components/elements/Button/Button"
import ContentB from "@/components/sections/ContentB/ContentB"
import ImageGalleryA from "@/components/sections/ImageGalleryA/ImageGalleryA"
import FeatureB from "@/components/sections/FeatureB/FeatureB"
import Section from "@/components/elements/Section/Section"
import Table from "@/components/elements/Table/Table"
import Masonry from "@/components/elements/Masonry/Masonry"

const defaultPageData = {
  sections: {
    hero: {
      title: "We Style & You Smile Bright",
      subtitle: "",
      buttons: [
        {
          text: "Book Appointment",
          type: "black" as ButtonVariant,
          url: "/demos/sapphire/book-appointment",
        },
        {
          text: "See Pricing",
          type: "outline-black" as ButtonVariant,
          url: "/demos/sapphire/pricing",
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
      content: "Opened in 1992, our mission is to provide a friendly personalized service that allows customers to achieve their hair goals.",
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-care.webp",
        altText: "Hair Care"
      },
      button: {
        url: "",
        text: "Learn More",
        type: "outline-black" as ButtonVariant
      }
    },
    imageGallery: {
      title: "Bride Makeover On Sapphire",
      button: {
        url: "/demos/sapphire/book-appointment",
        text: "Book Appointment",
        type: "black" as ButtonVariant,
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
    imageGallery2: {
      label: "Hair Style | Services",
      title: "Your Hair Is In a Good Hand",
      subtitle: "We provide the best hair style services experience that guarantees to keep your hair healthy and make it look fabulous",
      button: {
        url: "/demos/sapphire/gallery",
        text: "See all",
        type: "outline-black" as ButtonVariant,
      },
      images: [
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-1.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-2.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-3.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-4.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-5.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-6.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-7.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-8.webp",
          altText: "Hair Style"
        },
      ]
    },
  }
}

export default function Home() {

  const { hero, contentSection, imageGallery, imageGallery2, featureSection, pricingSection } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <HeroB data={hero} />
      <ContentB data={contentSection} variant="alternate" />
      
      <FeatureB data={featureSection} />
      <Section
        label={imageGallery2.label}
        title={imageGallery2.title}
        subtitle={imageGallery2.subtitle}
      >
        <Masonry items={imageGallery2.images} />
      </Section>
      <ImageGalleryA data={imageGallery} />
    </main>
  )
}
