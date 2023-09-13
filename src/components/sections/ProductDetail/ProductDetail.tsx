'use client'
import Button from "@/components/elements/Button/Button"
import Counter from "@/components/elements/Counter/Counter"
import ImageCarousel from "@/components/elements/ImageCarousel/ImageCarousel"
import Section from "@/components/elements/Section/Section"
import { useRef } from "react"
import { cartActions } from "@/redux/cartSlice";
import { useAppDispatch } from "@/redux/hooks"
import RichText from "@/components/elements/RichText/RichText"
import { ProductType } from "@/utils/types"

const ProductDetail: React.FC<{data: ProductType}> = ({ data }) => {
  const { id, title, categories, inStock, price, summary, media, content } = data
  const countRef = useRef<HTMLSpanElement>(null)
  const dispatch = useAppDispatch()
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-10">
        <ImageCarousel
          images={media}
          thumbsEnable={true}
        />
        <div>
          <div className="mb-1">
            {categories}
          </div>
          <h2 className="font-heading text-4xl font-semibold mb-3">
            {title}
          </h2>
          <div className="text-2xl mb-5">
            ${price}
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
          <div className="text-lg text-slate-700">
            <RichText htmlString={summary} />
          </div>
          <div>
            {content}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ProductDetail