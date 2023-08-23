import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import Button from "../Button/Button"
import { ButtonVariant } from "@/utils/types"
import RichText from "../RichText/RichText"

interface CardProps {
  data: {
    id: string
    title: string
    subtitle?: string
    content?: string
    media?: {
      url: string
      title?: string
      width: number
      height: number
    }
    buttons?: Array<{
      id: string
      url: string
      text: string
    }>
  }
}

const FeatureCard: React.FC<CardProps> = ({
  data,
}) => {
  const { title, subtitle, content, media, buttons } = data
  return (
    <div className={classNames(
      "basis-[30%] px-4 flex flex-col shrink-0 grow",
    )}>
      {media?.url && (
        <Image 
          className={classNames(
            { "aspect-3/2 object-cover w-full": (media.width >= 160)},
            { "w-20 object-contain": (media.width < 160)},
          )}
          src={media.url}
          width={media.width} 
          height={media.height} 
          alt={media.title ?? title}
        />
      )}
      <div className={classNames(
        "pt-5 flex flex-col grow",
      )}>
        <h4 className="text-lg lg:text-xl font-semibold mt-1">
          {title}
        </h4>
        {subtitle && 
          <p className="text-slate-600 lg:text-lg block mt-2">
            {subtitle}
          </p>
        }
        {content && 
          <div className="text-slate-600 lg:text-lg block mt-2">
            <RichText htmlString={content} />
          </div>
        }
        {buttons && (
          <div className="mt-auto">
            {buttons.map(button => (
              <Button key={button.text} variant={button.type ?? "alternate"} url={button.url}>
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FeatureCard