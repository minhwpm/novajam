import HeroB from "@/components/sections/HeroB/HeroB"
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT"
import { ButtonVariant } from "@/components/elements/Button/Button"
import ContentB from "@/components/sections/ContentB/ContentB"
import ImageGalleryA from "@/components/sections/ImageGalleryA/ImageGalleryA"
import FeatureB from "@/components/sections/FeatureB/FeatureB"
import Section from "@/components/elements/Section/Section"
import Carousel from "@/components/elements/Carousel/Carousel"
import ProductPreview from "@/components/elements/ProductPreview/ProductPreview"

const defaultPageData = {
  sections: {
    hero: {
      title: "The best solution for moisturizing the skin",
      subtitle: "Only include the most potent active botanical ingredients. Nothing more.",
      buttons: [
        {
          text: "Shop Now",
          type: "black" as ButtonVariant,
          url: "/demos/aquarius/cart",
        }
      ],
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hero.webp"
      }
    },
    carouselSection: {
      title: "Popular Products",
      items: [
        {
          title: "Skin Defence Multi-Protection Lotion SPF 50+ PA++++ 60ML",
          url: "/demos/aquarius/cart",
          price: "$20",
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
            altText: ""
          },
        },
        {
          title: "Camomile Dissolve The Day Make-Up Cleansing Oil 160ML",
          url: "/demos/aquarius/cart",
          price: "$12",
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
            altText: ""
          },
        },
        {
          title: "Seaweed Oil-Control Gel Cream 50ML",
          url: "/demos/aquarius/cart",
          price: "$30",
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
            altText: ""
          },
        },
        {
          title: "Skin Defence Multi-Protection Lotion SPF 50+ PA++++ 60ML",
          url: "/demos/aquarius/cart",
          price: "$20",
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
            altText: ""
          },
        },
        {
          title: "Camomile Dissolve The Day Make-Up Cleansing Oil 160ML",
          url: "/demos/aquarius/cart",
          price: "$12",
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
            altText: ""
          },
        },
        {
          title: "Seaweed Oil-Control Gel Cream 50ML",
          url: "/demos/aquarius/cart",
          price: "$30",
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
            altText: ""
          },
        },
      ]
    },
    featureSection: {
      title: "Enhance Your Natural Hair with Our Premium Products",
      content: "Glow & Shine natural hair care products are made with natural, plant-based ingredients and do not contain harsh chemicals or synthetic additives.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
        altText: "Built for you"
      },
      button: {
        url: "",
        text: "Shop Now",
        type: "standard" as ButtonVariant

      }
    }
  }
}

export default function Home() {
  const { hero, featureSection, carouselSection } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <HeroB data={hero} />
      <Section title={carouselSection.title}>
        <Carousel
          slidesPerView={4}
          freeMode={true}
          pagination={false}
          slides={carouselSection.items.map((item, idx) => (
            <ProductPreview key={idx} data={item} imgAspectRatio="square" />
          ))} 
        />
      </Section>
      <FeatureB data={featureSection} variant="alternate"/>
    </main>
  )
}
