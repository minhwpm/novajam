import SlidingText from "@/components/elements/SlidingText/SlidingText"
import FakeMessageBox from "@/components/elements/FakeMessageBox/FakeMessageBox"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"

const dummyData = {
  label: "",
  "title": "Turn your website visitors into customers with",
  "subtitle": "Bluebiz is a top-rated platform for small and medium businesses to grow sales through outstanding customer service.",
  "buttons": [
    {
      "text": "Get started for free",
      "url": "/register",
      "type": "secondary" as ButtonVariant,
    },
  ],
  "slidingTexts": [
    { text: "live chat"},
    { text: "chatbots"},
    { text: "ticketing"},
  ]
}

interface HeroProps {
  data?: {
    label?: string
    title: string
    subtitle?: string
    buttons?: Array<{
      text: string
      url?: string
      type: ButtonVariant
    }>
    slidingTexts?: Array<{
      text: string
    }>
  }
}

const Hero = ( { data = dummyData}: HeroProps) => {
  const { label, subtitle, title, buttons, slidingTexts } = data
  return (
    <section className="min-h-screen py-16 flex flex-col items-center justify-center bg-gradient-to-b from-blue-950 from-45% to-blue-700 to-100%">
      <div className="mb-10 flex flex-col items-center">
        <p className="uppercase tracking-widest mb-3 text-white">
          {label}
        </p>
        <h1 className="text-center font-semibold text-4xl leading-snug lg:text-5xl lg:leading-snug text-white max-w-screen-md px-5 mx-auto mb-8">
          {title}{" "}
          {slidingTexts && <SlidingText content={slidingTexts}/>}
        </h1>
        <p className="text-center lg:text-xl text-gray-300 leading-relaxed max-w-screen-md px-3 mx-auto mb-6">
          {subtitle}
        </p>
        <div className="flex flex-row flex-wrap gap-6">
          {buttons && buttons.length > 0 && buttons.map(button => (
            <Button key={button.text} variant={button.type} size="lg" url={button.url}>
              {button.text}
            </Button>
          ))}
        </div>
      </div>
      {/* <div className="w-full sm:w-[600px] h-[500px]">
        <FakeMessageBox />
      </div> */}
    </section>
  )
}

export default Hero