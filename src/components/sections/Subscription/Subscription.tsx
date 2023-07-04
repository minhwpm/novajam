import Section from "@/components/elements/Section/Section"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"

interface SubscriptionProps {
  data: {
    title: string
    subtitle?: string
    emailPlaceholder?: string
    button: {
      text: string
      url: string
      type: ButtonVariant
    }
  }
}

const Subscription: React.FC<SubscriptionProps> = ({data}) => {
  const { title, subtitle, emailPlaceholder, button } = data
  return (
    <Section className="bg-primary-200">
      <div className="flex flex-col gap-8 justify-center min-h-[300px]">
        <h3 className="text-4xl font-bold lg:text-5xl leading-snug lg:leading-snug text-center text-primary-500">
          {title}
        </h3>
        {subtitle && <p>{subtitle}</p>}
        {/* @TODO onSubmint handler */}
        <form className="flex flex-col items-center justify-center lg:flex-row gap-6 ">
          <input
            className="px-4 py-3 text-lg min-w-[450px] bg-white rounded"
            type="email"
            name="email"
            placeholder={emailPlaceholder ?? "Enter your email"}
          />
          <div>
            <Button size="lg" variant={button.type} url={button.url}>
              {button.text}
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
}

export default Subscription