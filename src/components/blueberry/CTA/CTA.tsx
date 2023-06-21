import Section from "@/components/elements/Section/Section"
import Button, { ButtonVariant } from "../Button/Button"

interface CTAProps {
  data: {
    title: string
    button: {
      text: string
      url: string
      variant: ButtonVariant
    }
  }
}
const CTA: React.FC<CTAProps> = ({data}) => {
  const { title, button} = data
  return (
    <Section className="bg-indigo-200 py-20 lg:py-32">
      <div className="flex flex-wrap gap-10 justify-center items-center">
        <h3 className="text-4xl font-bold lg:text-5xl leading-snug lg:leading-snug text-center text-indigo-500">
          {title}
        </h3>
        <div>
          <Button size="lg" variant="outline" url={button.url}>
            {button.text}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default CTA