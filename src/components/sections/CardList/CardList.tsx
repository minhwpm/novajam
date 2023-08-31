import Section from "@/components/elements/Section/Section"
import Card from "@/components/elements/Card/Card"
import classNames from "classnames"
import ProductCard from "@/components/elements/ProductCard/ProductCard"
import FeatureCard from "@/components/elements/FeatureCard/FeatureCard"

interface CardProps {
  id: string
  title: string
  label?: string
  content?: string
  media?: {
    type: string
    src: string
  }
  contentType?: string
}

interface CardListProps {
  data: {
    title: string
    label?: string
    subtitle?: string
    content: Array<CardProps>
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
        "-mx-4 flex ", 
        { "overflow-x-scroll" : content.length >= 3},
        {"justify-center": content.length < 3}
      )}>
        {content.map((card) => (
          <>
            { card.contentType === "product" && 
              <ProductCard key={card.id} data={card} />
            }
            {
              (card.contentType === "feature" || card.contentType === "service" ) &&
              <FeatureCard key={card.id} data={card} />
            }
            {
              card.contentType === "article" &&
              <Card key={card.id} data={card} textAlign="left" />
            }
          </>
        ))}
      </div>
    </Section>
  )
}

export default CardList