import Image from "next/image"
import classNames from "classnames";
import Button , { ButtonVariant } from "@/components/elements/Button/Button";

interface Props {
  data: {
    label: string
    title: string
    subtitle: string
    buttons?: Array<{
      text: string
      url: string
      type: ButtonVariant
    }>
    media: {
      type: string
      src: string
    };
  }
  aspectRatio?: "video" | "5/2"
  textAlignment?: "center" | "left"
  textDarkBackground?: boolean
}



const dummyData = {
  label: "FEATURES",
  title: "Unlock the full potential of a business platform",
  subtitle:
    "Bluebiz is a top-rated platform for small and medium businesses to grow sales through outstanding customer service.",
  buttons: [
    {
      text: "Get started now",
      url: "/register",
      type: "standard" as ButtonVariant
    },
  ],
  media: {
    type: "image",
    src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/hero.webp",
  },
};

const HeroC = ( { data = dummyData, aspectRatio = "video", textAlignment = "center", textDarkBackground}: Props ) => {
  const { label, title, subtitle, buttons, media } = data
  return (
    <div className="relative min-h-screen">
      {media.type === "image" && (
        <Image
          className={classNames("w-full object-cover",
            { "aspect-5/2": aspectRatio === "5/2" },
            { "aspect-video": aspectRatio === "video" },
          )} 
          src={media.src}
          alt={title}
          width={500}
          height={400}
          priority={true}
        />
      )}

      {media.type === "video" && (
        <video src={media.src} autoPlay={true} loop />
      )}
      <div className={classNames("absolute text-white px-8 py-12",
        { "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full": textAlignment === "center" },
        { "top-1/2 left-4 md:left-32 -translate-y-1/2 w-1/2": textAlignment === "left" },
        { "bg-gray-800 bg-opacity-30" : textDarkBackground}
      )}>
        <p className="uppercase tracking-widest mb-3">
          {label}
        </p>
        <h1 className="text-4xl lg:text-6xl lg:leading-snug font-bold mb-5">
          {title}
        </h1>
        <p className="text-lg lg:text-2xl font-semibold mb-10">
          {subtitle}
        </p>
        <div className={classNames("flex flex-row flex-wrap gap-6",
          {"justify-center": textAlignment === "center"}
        )}>
        {buttons && buttons.length > 0 && buttons.map(button => (
          <Button key={button.text} variant={button.type} size="lg" url={button.url}>
            {button.text}
          </Button>
        ))}
        </div>
      </div>
    </div>
  )
}

export default HeroC