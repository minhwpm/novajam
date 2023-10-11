/* 
Created by minhwpm (minhhien134@gmail.com) 
Layout: Overlay
*/

import Image from "next/image"
import classNames from "classnames";
import Button from "@/components/elements/Button/Button";
import { HeroType } from "@/utils/types";
import RichText from "@/components/elements/RichText/RichText";

interface Props {
  data: HeroType
  textAlignment?: "center" | "left"
  textDarkBackground?: boolean
}

const HeroC = ({ data, textAlignment = "center", textDarkBackground }: Props ) => {
  const { label, heading, content, buttons, media, mediaForMobile } = data
  return (
    <section className={classNames("relative")}>
      {mediaForMobile.length > 0 && mediaForMobile.map(item => (
        <div key={item.title} className={classNames(
          "w-full h-screen lg:hidden",
        )}>
          {item.contentType.includes("image") && (
            <Image
              className={classNames("w-full h-full object-cover brightness-75")} 
              src={item.url}
              alt={item.title}
              width={item.width}
              height={item.height}
              priority={true}
            />
          )}
          {item.contentType.includes("video") && (
            <video
              className="w-full h-full object-cover"
              src={item.url} autoPlay loop muted
            >
              <track kind="captions" label={item.title} />
            </video>
          )}
        </div>
      ))}
      {media.length > 0 && media.map(item => (
        <div key={item.title} className={classNames(
          "w-full h-screen",
          {"hidden lg:block" : mediaForMobile.length > 0}
        )}>
          {item.contentType.includes("image") && (
            <Image
              className={classNames("w-full h-full object-cover brightness-75")} 
              src={item.url}
              alt={item.title}
              width={item.width}
              height={item.height}
              priority={true}
            />
          )}
          {item.contentType.includes("video") && (
            <video
              className="w-full h-full object-cover"
              src={item.url} autoPlay loop muted
            >
              <track kind="captions" label={item.title} />
            </video>
          )}
        </div>
      ))}
      
      <div className={classNames("absolute text-white px-8 py-12 drop-shadow-lg",
        { "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-2/3 flex flex-col justify-center text-center": textAlignment === "center" },
        { "top-1/2 left-4 md:left-32 -translate-y-1/2 w-1/2": textAlignment === "left" },
        { "bg-gray-800 bg-opacity-30" : textDarkBackground}
      )}>
        <p className="uppercase tracking-widest">
          {label}
        </p>
        <h1 className="text-5xl lg:text-6xl lg:leading-snug font-bold max-w-3xl mx-auto">
          <RichText htmlString={heading} />
        </h1>
        { content && (
          <div className="block text-lg lg:text-2xl font-semibold mt-5">
            <RichText htmlString={content} />
          </div>
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