'use client'

import Section from "@/components/elements/Section/Section"
import BlogPreview from "@/components/elements/BlogPreview/BlogPreview"
import classNames from "classnames"
import ProductPreview from "@/components/elements/ProductPreview/ProductPreview"
import FeaturePreview from "@/components/elements/FeaturePreview/FeaturePreview"
import { BlogType, CardType, FeatureType, ProductType } from "@/utils/types"
import PagePreview from "../PagePreview/PagePreview"

interface CardListProps {
  data: {
    title: string
    label?: string
    subtitle?: string
    content: Array<CardType>
    link: {
      url: string
      text: string
    }
  }
  variant?: "standard" | "alternate"
  layout?: "flex" | "grid"
}

const CardList: React.FC<CardListProps> = ({ data, variant = "standard" }) => {
  const { title, label, subtitle, content } = data

  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
      className={classNames({"bg-secondary-50": variant === "alternate"})}
    >
      <div className={classNames(
        "w-full flex gap-6 lg:gap-10 py-5", 
        { "overflow-x-scroll" : content.length >= 3},
        {"justify-center": content.length < 3}
      )}>
        {content.map((card) => (
          <div key={card.id} className={classNames("basis-[80%] md:basis-[40%] lg:basis-[28%] shrink-0 grow")}>
            {
              card.contentType === "product" &&
              <ProductPreview key={card.id} data={card as ProductType} />
            }
            {
              card.contentType === "feature" &&
              <FeaturePreview key={card.id} data={card as FeatureType} />
            }
            {
              card.contentType === "blog" &&
              <BlogPreview key={card.id} data={card as BlogType} />
            }
            {
              card.contentType === "page" && 
              <PagePreview key={card.id} data={card} />
            }
            {/* @TODO render Service Card */}
          </div>
        ))}
      </div>
    </Section>
  )
}

export default CardList