/* 
Created by minhwpm (minhhien134@gmail.com) 
Single Media (Video or Image) Hero section 
*/

import Image from "next/image"
import classNames from "classnames";
import Button , { ButtonVariant } from "@/components/elements/Button/Button";

interface Props {
  data: {
    label?: string
    title: string
    subtitle?: string
    buttons?: Array<{
      text: string
      url?: string
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

const HeroC = ( { data, aspectRatio = "video", textAlignment = "center", textDarkBackground}: Props ) => {
  const { label, title, subtitle, buttons, media } = data
  return (
    <section className={classNames("relative lg:min-h-screen")}>
      {media.type === "image" && (
        <Image
          className={classNames("w-full object-cover brightness-75",
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
      <div className={classNames("absolute text-white px-8 py-12 drop-shadow-lg",
        { "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full": textAlignment === "center" },
        { "top-1/2 left-4 md:left-32 -translate-y-1/2 w-1/2": textAlignment === "left" },
        { "bg-gray-800 bg-opacity-30" : textDarkBackground}
      )}>
        <p className="uppercase tracking-widest">
          {label}
        </p>
        <h1 className="text-4xl lg:text-6xl lg:leading-snug font-bold">
          {title}
        </h1>
        { subtitle && (
          <p className="block text-lg lg:text-2xl font-semibold mt-5">
            {subtitle}
          </p>
        )}
        <div className={classNames("flex flex-row flex-wrap gap-6 mt-12",
          {"justify-center": textAlignment === "center"}
        )}>
          {buttons && buttons.length > 0 && buttons.map(button => (
            <Button key={button.text} variant={button.type} size="lg" url={button.url}>
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroC