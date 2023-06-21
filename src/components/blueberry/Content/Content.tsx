import Image from "next/image"
import classNames from "classnames"
import Section from "@/components/elements/Section/Section"

interface Props {
  data: {
    label?: string
    title: string
    subtitle?: string
    content: string
    media?: {
      type: string
      src: string
      altText?: string
    }
    url?: string
  }
  mediaAspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
}

const Content = ({ data, mediaAspectRatio }: Props) => {
  const { label, title, subtitle, content, media } = data
  return (
    <Section
      framed={false}
      // style={{ background: "linear-gradient('0deg, #EEF2FF 50%, #fff 50%')" }}
    >
      {media?.src && (
        <div className="w-full lg:w-11/12 px-4 pt-10 lg:px-32 lg:pt-20">
          <Image 
            className={classNames(
              { "aspect-video" : mediaAspectRatio === "video"},
              { "aspect-square" : mediaAspectRatio === "square"},
              { "aspect-3/4" : mediaAspectRatio === "3/4"},
              { "aspect-4/3" : mediaAspectRatio === "4/3"},
              { "aspect-3/2" : mediaAspectRatio === "3/2"},
              "w-full object-cover mb-20",
            )}
            src={media.src}
            width={500} 
            height={500} 
            alt={media.altText ?? title}
          />
          {label && (
            <p className="text-sm uppercase tracking-widest mb-3">
              {label}
            </p>
          )}
          <h2 className={classNames("text-6xl font-bold text-center text-indigo-400",
            { "mb-5": subtitle},
            { "mb-12": !subtitle}
          )}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm uppercase tracking-widest mb-12">
            {label}
            </p>
          )}
          <p>
            {content}
          </p>
        </div>
      )}
    </Section>
  )
}

export default Content