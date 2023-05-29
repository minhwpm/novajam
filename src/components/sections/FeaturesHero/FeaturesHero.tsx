import Button from "@/components/elements/Button/Button"

interface Props {
  data?: {
    label: string
    title: string
    subtitle: string
    button: {
      text: string
      url: string
    }
    media: {
      type: string
      src: string
    }
  }
}

const dummyData = {
  label: "FEATURES",
  title: "Unlock the full potential of content management",
  subtitle: "Strapi is the leading open-source headless CMS. It’s 100% Javascript, fully customizable and developer-first.",
  button: {
    text: "Get started now",
    url: "/register"
  },
  media: {
    type: "image",
    src: "https://www.tidio.com/_next/image/?url=%2Fimages%2Fplaybooks%2Fprovide-in-store-shopping-experience%2Fhero%2Fhero-desktop.png&w=1920&q=75"
  }
}

const FeaturesHero = ({data = dummyData }: Props) => {
  const { label, title, subtitle, button, media } = data
  return (
    <section className="px-4 lg:px-32 flex flex-col-reverse lg:flex-row gap-5 items-center">
      <div className="lg:w-5/12">
        <p className="uppercase font-bold text-blue-600 tracking-widest invisible animate-animationA">
          {label}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold my-8 invisible animate-animationA">{title}</h1>
        <p className="md:text-lg mb-10 invisible animate-animationA">{subtitle}</p>
        
        <div className="invisible animate-animationA" style={{ animationDelay: '1.0s'}} >
          <Button variant="primary" url={button.url}>{button.text}</Button>
        </div>
      </div>
      <div className="lg:w-7/12">
        {/* @TODO optimize Image */}
        {media?.type === "image" && <img className="animate-animationA invisible" style={{ animationDelay: '1.0s'}} src={media.src} />} 
        {media?.type === "video" && <video src={media.src} />}
      </div>
    </section>
  )
}

export default FeaturesHero