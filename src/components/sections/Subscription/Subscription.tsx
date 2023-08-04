import Section from "@/components/elements/Section/Section"
import SubscribeForm from "@/components/elements/SubscribeForm/SubscribeForm"
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
  const { title, subtitle, emailPlaceholder, buttonText, backgroundImage = { url: 'https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/woman-using-laptop.webp'}} = data
  return (
    <Section framed={false}>
      <div className="relative w-full">
        <Image
          className="w-full h-[32rem] lg:h-auto lg:max-h-[32rem] object-cover brightness-50"
          src={backgroundImage.url}
          width={500}
          height={500}
          alt=""
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-8 justify-center items-center min-h-[32rem]">
          <h3 className="text-4xl font-bold lg:text-5xl leading-snug lg:leading-snug text-center text-primary-500 max-w-3xl">
            {title}
          </h3>
          {subtitle && 
            <p className="text-slate-200 text-center max-w-lg">
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