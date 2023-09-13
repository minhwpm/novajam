import Section from "@/components/elements/Section/Section"
import SubscribeForm from "@/components/elements/SubscribeForm/SubscribeForm"
import classNames from "classnames"
import Image from "next/image"

interface SubscriptionProps {
  data: {
    title: string
    subtitle?: string
    emailPlaceholder?: string
    buttonText?: string
    backgroundImage?: {
      url: string
    }
  }
}

const Subscription: React.FC<SubscriptionProps> = ({data}) => {
  const { title, subtitle, emailPlaceholder, buttonText, backgroundImage } = data
  return (
    <Section framed={false}>
      <div
        className={classNames(
          "relative w-full bg-cover bg-center px-4",
          { "bg-slate-100" : !backgroundImage?.url}
        )}
        style={backgroundImage?.url ? {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundImage: `url(${backgroundImage.url})`,
          backgroundBlendMode: 'overlay'
        } : {} }
      >
        <div className="flex flex-col gap-8 justify-center items-center min-h-[32rem]">
          <h3 className="text-4xl font-bold lg:text-5xl leading-snug lg:leading-snug text-center text-primary-500 max-w-3xl">
            {title}
          </h3>
          {subtitle && 
            <p 
              className={classNames(
                "text-center max-w-lg",
                { "text-slate-200" : backgroundImage?.url},
                { "text-slate-700" : !backgroundImage?.url}
              )}
            >
              {subtitle}
            </p>
          }
          <div className="min-w-full md:min-w-min md:w-[32rem]">
            <SubscribeForm
              emailPlaceholder={emailPlaceholder}
              buttonText={buttonText}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Subscription