import HeroD from "@/components/sections/HeroD/HeroD"
import { ButtonVariant } from "@/components/elements/Button/Button"
import FeatureB from "@/components/sections/FeatureB/FeatureB"
import Section from "@/components/elements/Section/Section"
import Carousel from "@/components/elements/Carousel/Carousel"
import ProductPreview from "@/components/elements/ProductPreview/ProductPreview"

const defaultPageData = {
  sections: {
    hero: {
      images: [
        {
          src: {
            default: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
          },
          altText: "Locust Extract Hair Conditioner",
          url: "/demos/aquarius/feature/locust-extract-hair-conditioner"
        },
        {
          src: {
            default: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-2.webp",
          },
          altText: "TENDER skincare line",
          url: "/demos/aquarius/feature/tender-skincare-line"
        },
      ]
    },
    carouselSection: {
      title: "Popular Products",
      items: [
        {
          title: "Skin Defence Multi-Protection Lotion SPF 50+ PA++++ 60ml",
          url: "/demos/aquarius/product/skin-defence-serum",
          price: 20,
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/lotion-1.webp",
            altText: ""
          },
        },
        {
          title: "Camomile Lotion 60ml",
          url: "/demos/aquarius/product/skin-defence-serum",
          price: 12,
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/serum-1.webp",
            altText: ""
          },
        },
        {
          title: "Seaweed Oil-Control Gel Cream 50ml",
          url: "/demos/aquarius/product/skin-defence-serum",
          price: 30,
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/cream-1.webp",
            altText: ""
          },
        },
        {
          title: "Retinol Serum 50ml",
          url: "/demos/aquarius/product/skin-defence-serum",
          price: 22,
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/serum-2.webp",
            altText: ""
          },
        },
        {
          title: "Milaganics Serum 100ml",
          url: "/demos/aquarius/product/skin-defence-serum",
          price: 15,
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/serum-3.webp",
            altText: ""
          },
        },
        {
          title: "Extra Booster Mosturizer 50ml",
          url: "/demos/aquarius/product/skin-defence-serum",
          price: 33,
          image: {
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/cream-2.webp",
            altText: ""
          },
        },
      ]
    },
    featureSection: {
      title: "Enhance Your Natural Hair with Our Premium Products with Locust Extract",
      content: "Glow & Shine natural hair care products are made with natural, plant-based ingredients and do not contain harsh chemicals or synthetic additives.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-1.webp",
        altText: "Locust Extract Hair Conditioner"
      },
      button: {
        url: "",
        text: "Shop Now",
        type: "black" as ButtonVariant

      }
    },
    featureSection2: {
      title: "Improve 5 signs of your skin",
      content: "Our best-selling skincare line TENDER is back and better with an upgraded version. Double supplemented with Snow Velvet flower essence, the new TENDER skincare line will bring a nourishing process from deep within, making the skin more healthy, smooth, shiny, youthful and elastic.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/product-set-2.webp",
        altText: "TENDER skincare line"
      },
      button: {
        url: "",
        text: "Shop Now",
        type: "black" as ButtonVariant

      }
    }
  }
}

export default function Home() {
  const { hero, featureSection, featureSection2, carouselSection } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      {/* <HeroB data={hero} /> */}
      <HeroD data={hero} />
      <Section title={carouselSection.title}>
        <Carousel
          slidesPerView={5}
          pagination={true}
          slides={carouselSection.items.map((item, idx) => (
            <ProductPreview key={idx} data={item} imgAspectRatio="square" />
          ))} 
        />
      </Section>
      <FeatureB data={featureSection} variant="alternate" />
      <FeatureB data={featureSection2} mediaPosition="right" />
    </main>
  )
}
