import Section from "@/components/elements/Section/Section"
import Card from "@/components/elements/Card/Card"
import classNames from "classnames"
import ProductCard from "@/components/elements/ProductCard/ProductCard"
import FeatureCard from "@/components/elements/FeatureCard/FeatureCard"
import { ArticleType, CardType, FeatureType, ProductType } from "@/utils/types"

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
        "w-full -mx-4 flex", 
        { "overflow-x-scroll" : content.length >= 3},
        {"justify-center": content.length < 3}
      )}>
        {content.map((card) => (
          <>
            {
              card.contentType === "product" &&
              <ProductCard key={card.id} data={card as ProductType} />
            }
            {
              card.contentType === "feature" &&
              <FeatureCard key={card.id} data={card as FeatureType} />
            }
            {
              card.contentType === "article" &&
              <Card key={card.id} data={card as ArticleType} textAlign="left" />
            }
            {/* @TODO render Page and Service Card */}
          </>
        ))}
      </div>
    </Section>
  )
}

export default CardList