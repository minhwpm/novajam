import Section from "@/components/elements/Section/Section"
import Card from "@/components/elements/Card/Card"
import classNames from "classnames"

interface CardProps {
  title: string
  label?: string
  content?: string
  media?: {
    type: string
    src: string
  }
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
      <div className="grid md:grid-cols-3 gap-9">
        {content.map((card) => (
          <Card key={card.title} data={card} textAlign="left" />
        ))}
      </div>
    </Section>
  )
}

export default CardList