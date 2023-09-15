import Image from "next/image"
import classNames from "classnames"
import Section from "@/components/elements/Section/Section"
import { ButtonVariant } from "@/utils/types"

interface FeatureProps {
  data: {
    label?: string
    title: string
    subtitle?: string
    content?: string
    media?: {
      contentType: string
      url: string
      title: string
    }
    button?: {
      url: string
      text: string
      type: ButtonVariant
    }
  }
  mediaPosition?: "top" | "bottom"
  variant?: "standard" | "alternate" 
}

const FeatureA: React.FC<FeatureProps> = ({ data, mediaPosition }) => {
  const { label, title, subtitle, content, media } = data
  return (
    <Section>
      <div className={classNames("flex flex-col", { "flex-col-reverse": mediaPosition === "bottom"})}>
        <div className={classNames(
          "w-full lg:w-11/12 mx-auto",
          { "mb-12": mediaPosition === "top" }
        )}>
          {media?.url && media?.contentType === "image" && (
            <Image 
              className={classNames(
                "w-full object-cover mb-20",
              )}
              src={media.url}
              width={500} 
              height={500} 
              alt={media.title ?? title}
            />
          )}
          {media?.url && media?.contentType === "video" && (
            <video src={media?.url} autoPlay={true}>
              <track kind="captions" label={media.title} />
            </video>
          )}
        </div>
        <div className={classNames({"mb-12": mediaPosition === "bottom"})}>
          {label && (
            <p className="text-sm uppercase tracking-widest mb-3">
              {label}
            </p>
          )}
          <h2 className={classNames("text-6xl font-bold text-center text-primary-400",
            { "mb-5": subtitle},
            { "mb-12": !subtitle}
          )}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg leading-8 lg:text-xl lg:leading-10 font-medium text-center mb-12 max-w-4xl">
              {subtitle}
            </p>

          )}
          <p className="text-lg">
            {content}
          </p>
        </div>
      </div>
    </Section>
  )
}

export default FeatureA