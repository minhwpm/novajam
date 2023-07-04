import Section from "@/components/elements/Section/Section"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"

interface CTAProps {
  data: {
    title: string
    subtitle?: string
    button: {
      text: string
      url: string
      type: ButtonVariant
    }
  }
}
const CTA: React.FC<CTAProps> = ({data}) => {
  const { title, subtitle, button} = data
  return (
    <Section className="bg-primary-200">
      <div className="flex flex-wrap gap-10 justify-center items-center min-h-[200px]">
        <h3 className="text-4xl font-bold lg:text-5xl leading-snug lg:leading-snug text-center text-primary-500">
          {title}
        </h3>
        { subtitle && <p>{subtitle}</p> }
        <div>
          <Button size="lg" variant={button.type} url={button.url}>
            {button.text}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default CTA