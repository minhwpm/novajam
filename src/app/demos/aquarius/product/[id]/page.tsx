'use client'
import HeroD from "@/components/sections/HeroD/HeroD"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import FeatureB from "@/components/sections/FeatureB/FeatureB"
import Section from "@/components/elements/Section/Section"
import Carousel from "@/components/elements/Carousel/Carousel"
import ProductPreview from "@/components/elements/ProductPreview/ProductPreview"
import ImageCarousel from "@/components/elements/ImageCarousel/ImageCarousel"
import Counter from "@/components/elements/Counter/Counter"
import { useRef } from "react"
import { cartActions } from "@/redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from "@/redux/hooks"

const defaultPageData = {
  id: "skin-defence-multi-protection-lotion",
  title: "Skin Defence Multi-Protection Lotion SPF 50+ PA++++ 60ml",
  category: "Lotion",
  price: 20,
  summary: "With its lightweight texture, the serum helps to firm and reduce wrinkles, leaving skin smoother and firmer. Inspired by nature, the formula is infused with three root extracts, including ginger from Madagascar, which help smooth wrinkles, make them appear less, and reverse signs of aging. Use daily as part of your three-step Roots of Strength™ skincare routine.",
  description: "",
  images: [
    {
      src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/lotion-1.webp",
      altText: ""
    },
    {
      src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/using-serum-woman.webp",
      altText: ""
    },
    {
      src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/serum-drops.webp",
      altText: ""
    },
  ],
}

export default function ProductDetail() {
  const { id, title, category, price, summary, description, images } = defaultPageData
  const countRef = useRef<HTMLSpanElement>(null)
  const dispatch = useAppDispatch()

  return (
    <main className="flex flex-col min-h-screen pb-24">
      <Section>
        <div className="grid lg:grid-cols-2 gap-10">
          <ImageCarousel
            images={images}
            thumbsEnable={true}
          />
          <div>
            <div className="mb-1">
              {category}
            </div>
            <h2 className="font-heading text-4xl font-semibold mb-3">
              {title}
            </h2>
            <div className="text-2xl mb-5">
              {price}
            </div>
            <div className="flex gap-5 mb-5">
              <Counter ref={countRef} />
              <Button
                onClick={() =>{
                  console.log("Add to Cart", countRef.current?.innerText)
                  dispatch(cartActions.addToCart({
                    id,
                    name: title,
                    price,
                    quantity: parseInt(countRef.current?.innerText ?? '0')
                  }))
                }}
              >
                ADD TO CART
              </Button>
            </div>
            <div className="text-lg text-slate-600">
              {summary}
            </div>
            <div>
              {description}
            </div>
          </div>
        </div>
        
      </Section> 
    </main>
  )
}
